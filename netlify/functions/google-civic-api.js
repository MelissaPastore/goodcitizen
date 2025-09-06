exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { address } = event.queryStringParameters || {};
    
    if (!address) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Address parameter is required' })
      };
    }

    const GOOGLE_API = process.env.GOOGLE_API;
    
    if (!GOOGLE_API) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Google API key not configured' })
      };
    }

    const axios = require('axios');
    const response = await axios.get(
      'https://www.googleapis.com/civicinfo/v2/representatives',
      {
        params: {
          address,
          key: GOOGLE_API,
        },
      }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error calling Google Civic API:', error);
    
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({ 
        error: error.response?.data?.error?.message || error.message || 'Internal server error'
      })
    };
  }
};