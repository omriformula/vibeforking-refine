const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
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
        body: JSON.stringify({ error: 'Image data is required' }),
      };
    }

    // Convert base64 image data back to buffer
    const imageBuffer = Buffer.from(imageData, 'base64');
    
    // Create form data for Magic Patterns API
    const formData = new FormData();
    formData.append('mode', 'fast');
    formData.append('prompt', prompt || 'Please look at the attached image and recreate');
    formData.append('images', imageBuffer, {
      filename: filename || 'uploaded-image.png',
      contentType: 'image/png'
    });

    console.log('📡 Calling Magic Patterns API...');

    // Make the API call to Magic Patterns
    const response = await fetch('https://api.magicpatterns.com/api/v2/pattern', {
      method: 'POST',
      headers: {
        'x-mp-api-key': process.env.MAGIC_PATTERNS_API_KEY || 'mp_live_3ZPksZsusmURokxEVKQ1J6Df',
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Magic Patterns API error:', response.status, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Magic Patterns API error', 
          details: errorText,
          status: response.status 
        }),
      };
    }

    const result = await response.json();
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
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
    };
  }
}; 