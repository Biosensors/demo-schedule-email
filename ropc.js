'use strict';

const axios = require("axios");
let options={
    method:'POST',
    url:`https://login.microsoftonline.com/b64948ea-2e8c-4541-a5ae-d3c999f25bd2/oauth2/v2.0/token`,
    data:{
        client_id:"18fcb914-4aff-4716-acc4-b0658c9b4dd8"
       ,scope:"user.read%20openid%20profile%20offline_access" 
       ,username:"dev-webservice.bs@biosensors.com" 
       ,password:"Xod68598" 
       ,grant_type:"password" 
    }
}

let response;
async function main(){
    try {
        response = await axios(options);
        if (response&&response.data){
            return response.data;
        } else {
            return;
        }
    } catch (error) {
           console.error(error);
    }
}

main();

