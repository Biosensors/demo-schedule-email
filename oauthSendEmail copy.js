require("dotenv").config();
const msal = require('@azure/msal-node');
    const fetch = require('node-fetch');

    const clientSecret = process.env.CLIENT_SECRET;
    const clientId = process.env.CLIENT_ID;
    const tenantId = process.env.TENANT_ID;
    const aadEndpoint =
      process.env.AAD_ENDPOINT || 'https://login.microsoftonline.com';
    const graphEndpoint =
      process.env.GRAPH_ENDPOINT || 'https://graph.microsoft.com';

    const msalConfig = {
      auth: {
        clientId,
        clientSecret,
        authority: aadEndpoint + '/' + tenantId,
      },
    };

    const tokenRequest = {
      scopes: [graphEndpoint + '/.default'],
    };
    // const tokenRequest = {
    //   scopes: ["user.read","user.write"],
    //   username: process.env.EMAIL_USER,
    //   password: process.env.EMAIL_PASS, // Add your password here
    // };

(async function(){
    const cca = new msal.ConfidentialClientApplication(msalConfig);
    const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
    
    const mail = {
      subject: 'Microsoft Graph Yadong Sample2',
      //This "from" is optional if you want to send from group email. For this you need to give permissions in that group to send emails from it.
      from: {
        emailAddress: {
          address: process.env.EMAIL_USER,
        },
      },
      toRecipients: [
        {
          emailAddress: {
            address: 'yd.zhu@biosensors.com',
          },
        },
      ],
      body: {
        content:
          '<h1>MicrosoftGraph Yadong Sample</h1>This is the email body1111',
        contentType: 'html',
      },
    };
    
    const headers = new fetch.Headers();
    const bearer = `Bearer ${tokenInfo.accessToken}`;
    
    headers.append('Authorization', bearer);
    headers.append('Content-Type', 'application/json');
    
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({ message: mail, saveToSentItems: false }),
    };
    let response;
    try {
       response=await fetch(
        graphEndpoint + `/v1.0/users/${process.env.EMAIL_USER}/sendMail`,
        options
      );
      console.log(`status is:${response.status}`)
      
    } catch (error) {
      console.error(`error is:${error}`)
      
    }

})();
