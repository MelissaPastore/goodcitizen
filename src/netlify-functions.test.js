// Simple test to verify the functions are set up correctly
const googleCivicApi = require('../netlify/functions/google-civic-api');
const propublicaVotingRecords = require('../netlify/functions/propublica-voting-records');
const propublicaMembers = require('../netlify/functions/propublica-members');

describe('Netlify Functions', () => {
  test('google-civic-api function exists and has handler', () => {
    expect(googleCivicApi.handler).toBeDefined();
    expect(typeof googleCivicApi.handler).toBe('function');
  });

  test('propublica-voting-records function exists and has handler', () => {
    expect(propublicaVotingRecords.handler).toBeDefined();
    expect(typeof propublicaVotingRecords.handler).toBe('function');
  });

  test('propublica-members function exists and has handler', () => {
    expect(propublicaMembers.handler).toBeDefined();
    expect(typeof propublicaMembers.handler).toBe('function');
  });

  test('google-civic-api returns error for missing address parameter', async () => {
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {}
    };
    const context = {};

    const result = await googleCivicApi.handler(event, context);
    
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('Address parameter is required');
  });

  test('propublica-voting-records returns error for missing memberId parameter', async () => {
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {}
    };
    const context = {};

    const result = await propublicaVotingRecords.handler(event, context);
    
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('memberId parameter is required');
  });

  test('propublica-members returns error for missing chamber parameter', async () => {
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {}
    };
    const context = {};

    const result = await propublicaMembers.handler(event, context);
    
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('chamber parameter is required');
  });
});