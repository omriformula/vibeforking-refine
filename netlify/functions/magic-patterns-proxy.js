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
      // Set timeout for the request (9 seconds, less than Netlify's 10s limit)
      const timeout = setTimeout(() => {
        reject(new Error('Request timeout - Magic Patterns API took too long to respond'));
      }, 9000);

      const options = {
        hostname: 'api.magicpatterns.com',
        port: 443,
        path: '/api/v2/pattern',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': fullBody.length,
          'x-mp-api-key': process.env.MAGIC_PATTERNS_API_KEY || 'mp_live_3ZPksZsusmURokxEVKQ1J6Df',
          'User-Agent': 'Netlify-Function/1.0',
        },
        timeout: 8000, // 8 second timeout on the socket
      };

      console.log('📡 Making HTTPS request to Magic Patterns...');

      const req = https.request(options, (res) => {
        clearTimeout(timeout); // Clear our custom timeout
        
        console.log(`📨 Magic Patterns responded with status: ${res.statusCode}`);
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          console.log(`📦 Response received, length: ${data.length} characters`);
          
          // Handle redirects (307, 301, 302, etc.)
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log(`🔄 Following redirect to: ${res.headers.location}`);
            
            // Parse the redirect URL
            const redirectUrl = new URL(res.headers.location);
            
            // Create new options for the redirect
            const redirectOptions = {
              hostname: redirectUrl.hostname,
              port: redirectUrl.port || 443,
              path: redirectUrl.pathname + redirectUrl.search,
              method: 'POST',
              headers: options.headers,
            };
            
            // Make the redirected request
            const redirectReq = https.request(redirectOptions, (redirectRes) => {
              let redirectData = '';
              
              redirectRes.on('data', (chunk) => {
                redirectData += chunk;
              });
              
              redirectRes.on('end', () => {
                console.log(`📦 Redirect response received, length: ${redirectData.length} characters`);
                
                if (redirectRes.statusCode >= 200 && redirectRes.statusCode < 300) {
                  try {
                    const jsonData = JSON.parse(redirectData);
                    console.log('✅ Successfully parsed redirect response JSON');
                    resolve(jsonData);
                  } catch (parseError) {
                    console.error('❌ Failed to parse redirect JSON response:', parseError.message);
                    reject(new Error(`Failed to parse redirect response: ${redirectData.substring(0, 200)}...`));
                  }
                } else {
                  console.error(`❌ Magic Patterns API error after redirect: ${redirectRes.statusCode}`);
                  reject(new Error(`Magic Patterns API error after redirect: ${redirectRes.statusCode} - ${redirectData.substring(0, 200)}...`));
                }
              });
            });
            
            redirectReq.on('error', (error) => {
              console.error('❌ Redirect request error:', error.message);
              reject(error);
            });
            
            console.log(`📤 Sending ${fullBody.length} bytes to redirect URL...`);
            redirectReq.write(fullBody);
            redirectReq.end();
            return;
          }
          
          // Handle normal response (non-redirect)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const jsonData = JSON.parse(data);
              console.log('✅ Successfully parsed response JSON');
              resolve(jsonData);
            } catch (parseError) {
              console.error('❌ Failed to parse JSON response:', parseError.message);
              reject(new Error(`Failed to parse response: ${data.substring(0, 200)}...`));
            }
          } else {
            console.error(`❌ Magic Patterns API error: ${res.statusCode}`);
            reject(new Error(`Magic Patterns API error: ${res.statusCode} - ${data.substring(0, 200)}...`));
          }
        });
      });

      req.on('timeout', () => {
        clearTimeout(timeout);
        req.destroy();
        reject(new Error('Socket timeout - connection to Magic Patterns API timed out'));
      });

      req.on('error', (error) => {
        clearTimeout(timeout);
        console.error('❌ HTTPS request error:', error.message);
        reject(error);
      });

      console.log(`📤 Sending ${fullBody.length} bytes to Magic Patterns API...`);
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