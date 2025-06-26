const https = require('https');
const { URL } = require('url');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    console.log('🚀 Magic Patterns proxy function called');
    
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    const { imageData, filename, prompt } = body;

    if (!imageData) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Image data is required' }),
      };
    }

    // Convert base64 image data back to buffer
    const imageBuffer = Buffer.from(imageData, 'base64');
    
    console.log('📡 Preparing to call Magic Patterns API...');

    // Create multipart form data manually
    const boundary = '----formdata-' + Math.random().toString(36);
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    let body_data = '';
    
    // Add mode field
    body_data += delimiter;
    body_data += 'Content-Disposition: form-data; name="mode"\r\n\r\n';
    body_data += 'fast';
    
    // Add prompt field
    body_data += delimiter;
    body_data += 'Content-Disposition: form-data; name="prompt"\r\n\r\n';
    body_data += (prompt || 'Please look at the attached image and recreate');
    
    // Add image field
    body_data += delimiter;
    body_data += `Content-Disposition: form-data; name="images"; filename="${filename || 'image.png'}"\r\n`;
    body_data += 'Content-Type: image/png\r\n\r\n';
    
    const body_end = closeDelimiter;
    
    // Combine text parts with binary image data
    const textStart = Buffer.from(body_data, 'utf8');
    const textEnd = Buffer.from(body_end, 'utf8');
    const fullBody = Buffer.concat([textStart, imageBuffer, textEnd]);

    // Make the API call using built-in https module
    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.magicpatterns.com',
        port: 443,
        path: '/api/v2/pattern',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': fullBody.length,
          'x-mp-api-key': process.env.MAGIC_PATTERNS_API_KEY || 'mp_live_3ZPksZsusmURokxEVKQ1J6Df',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (parseError) {
              reject(new Error(`Failed to parse response: ${data}`));
            }
          } else {
            reject(new Error(`Magic Patterns API error: ${res.statusCode} - ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(fullBody);
      req.end();
    });

    console.log('✅ Magic Patterns API success:', result.id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify(result),
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
    };
  }
}; 