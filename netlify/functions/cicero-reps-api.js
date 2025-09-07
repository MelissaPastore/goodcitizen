// Explicitly require any dependencies at the top
const axios = require('axios');

exports.handler = async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };

  // For direct invocation via CLI
  if (!req.httpMethod) {
    const address = req.queryStringParameters?.address || 'No address provided';
    const CICERO_API_KEY = process.env.CICERO_API_KEY || 'API key not found';
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Direct invocation - debug info",
        address: address,
        apiKeyPresent: CICERO_API_KEY !== 'API key not found',
        queryParams: req.queryStringParameters || {}
      })
    };
  }

  // Handle preflight requests
  if (req.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (req.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { address } = req.queryStringParameters || {};
    
    if (!address) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Address parameter is required' })
      };
    }

    const CICERO_API_KEY = process.env.CICERO_API_KEY;

    console.log('CICERO_API_KEY:', CICERO_API_KEY ? 'Present' : 'Missing');
    console.log('Address:', address);

    if (!CICERO_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Cicero API key not configured' })
      };
    }

    try {
      const response = await axios.get(
        'https://app.cicerodata.com/v3.1/official',
        {
          params: {
            search_address: address,
            key: CICERO_API_KEY,
          },
        }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.data)
      };
    } catch (axiosError) {
      console.error('Axios error:', axiosError.message);
      return {
        statusCode: axiosError.response?.status || 500,
        headers,
        body: JSON.stringify({ 
          error: axiosError.response?.data?.error?.message || axiosError.message || 'API request failed'
        })
      };
    }
  } catch (error) {
    console.error('General error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error: ' + error.message })
    };
  }
};