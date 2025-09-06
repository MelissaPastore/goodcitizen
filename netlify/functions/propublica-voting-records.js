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
    const { memberId } = event.queryStringParameters || {};
    
    if (!memberId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'memberId parameter is required' })
      };
    }

    const PROPUBLICA_API = process.env.PROPUBLICA_API;
    
    if (!PROPUBLICA_API) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'ProPublica API key not configured' })
      };
    }

    const axios = require('axios');
    const response = await axios.get(
      `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`,
      { 
        headers: { 
          'X-API-KEY': PROPUBLICA_API 
        } 
      }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error calling ProPublica voting records API:', error);
    
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({ 
        error: error.response?.data?.error || error.message || 'Internal server error'
      })
    };
  }
};