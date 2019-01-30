const { clientId, clientSecret } = require('./config');
const fetch = require('isomorphic-unfetch');

const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async function(context, req) {
  if (req.method.toUpperCase() === 'OPTIONS') {
    return {
      body: '',
      headers: {
        ...corsHeaders,
      },
    };
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: req.body.code,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();

  return {
    body,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  };
};
