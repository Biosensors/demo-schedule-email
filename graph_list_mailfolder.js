require("dotenv").config();
const msal = require('@azure/msal-node');
    const axios = require("axios");
    const { convert } = require('html-to-text');


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

(async function(){
    const cca = new msal.ConfidentialClientApplication(msalConfig);
    const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
    
    const bearer = `Bearer ${tokenInfo.accessToken}`;
    let options={
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
    },
    method:'GET',
    url:graphEndpoint + `/v1.0/users/${process.env.EMAIL_USER}/mailfolders`
  };
    
    let response,list=[];
    try {
       response=await axios(options);
      console.log(`status is:${response.status}`)
      if (response&&response.data&&response.data.value){
        response.data.value.forEach(item => {
          list.push({
            id:item.id,
            displayName:item.displayName,
            totalItemCount:item.totalItemCount
          })
        });
      }
      console.log("list of mail folders:",JSON.stringify(list,null,2));
      let folderId = list.filter(item=>item.displayName==='processed')[0].id;
      //list message of processed folder
      options.url=graphEndpoint + `/v1.0/users/${process.env.EMAIL_USER}/mailfolders/${folderId}/messages?$top=100&$count=true`
      response=await axios(options);
      console.log(`status for folder messages is:${response.status}`);
      let htmlString=response.data["value"][6].body.content;

      // let textContent=htmlString.replace(/<[^>]+>/g, '');
      let textContent=convert(htmlString,{whitespaceCharacters:"\n"});
      console.log(`subject is:`,response.data["value"][6].subject);
      console.log(`textContent is:`,textContent);
    } catch (error) {
      console.error(`error is:${error}`)
      
    }

})();
