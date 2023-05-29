const axios = require('axios');
const { parseString } = require('xml2js');

const SOAP_URL = 'http://localhost:8081/myWebService';

const callSoapApi = async (requestXml) => {
  try {
    const response = await axios.post(SOAP_URL, requestXml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const responseXml = response.data;

    // Convert XML response to JSON
    let jsonResponse = await new Promise((resolve, reject) => {
      parseString(responseXml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return jsonResponse;
  } catch (error) {
    console.log("🚀 ~ file: soapClient.js:29 ~ callSoapApi ~ error:", error)
   }
};

module.exports = {
  callSoapApi,
};
