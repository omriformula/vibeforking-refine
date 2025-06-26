const https = require('https');
const http = require('http');
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

    // Helper function to make HTTP request with automatic redirect following
    const makeRequest = (url, body, maxRedirects = 3) => {
      return new Promise((resolve, reject) => {
        let redirectCount = 0;
        
        const attemptRequest = (currentUrl) => {
          const parsedUrl = new URL(currentUrl);
          const isHttps = parsedUrl.protocol === 'https:';
          const client = isHttps ? https : http;
          
          const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (isHttps ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: {
              'Content-Type': `multipart/form-data; boundary=${boundary}`,
              'Content-Length': body.length,
              'x-mp-api-key': process.env.MAGIC_PATTERNS_API_KEY || 'mp_live_3ZPksZsusmURokxEVKQ1J6Df',
              'User-Agent': 'Netlify-Function/1.0',
            },
            timeout: 8000,
          };

          console.log(`📡 Making request to: ${currentUrl}`);

          const req = client.request(options, (res) => {
            console.log(`📨 Response status: ${res.statusCode}`);
            
            // Handle redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              if (redirectCount >= maxRedirects) {
                reject(new Error(`Too many redirects (${redirectCount})`));
                return;
              }
              
              redirectCount++;
              console.log(`🔄 Redirect ${redirectCount}: ${res.headers.location}`);
              
              // Handle relative URLs
              const redirectUrl = res.headers.location.startsWith('http') 
                ? res.headers.location 
                : new URL(res.headers.location, currentUrl).href;
              
              attemptRequest(redirectUrl);
              return;
            }
            
            // Handle normal response
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            
            res.on('end', () => {
              console.log(`📦 Response received: ${data.length} characters`);
              
              if (res.statusCode >= 200 && res.statusCode < 300) {
                try {
                  const jsonData = JSON.parse(data);
                  console.log('✅ Success!');
                  resolve(jsonData);
                } catch (parseError) {
                  console.error('❌ JSON parse error:', parseError.message);
                  reject(new Error(`Parse error: ${parseError.message}`));
                }
              } else {
                console.error(`❌ API error: ${res.statusCode}`);
                reject(new Error(`API error: ${res.statusCode} - ${data.substring(0, 200)}`));
              }
            });
          });

          req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
          });

          req.on('error', (error) => {
            console.error('❌ Request error:', error.message);
            reject(error);
          });

          req.write(body);
          req.end();
        };

        attemptRequest(url);
      });
    };

    // Make the API call
    const result = await makeRequest('https://api.magicpatterns.com/api/v2/pattern', fullBody);
    
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
    console.error('❌ Function error:', error.message);
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