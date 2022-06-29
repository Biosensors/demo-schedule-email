
const htmlContent=require('./htmlContent');
const empData=require("./emp.json");
const EmailSender=require('./emailSender');
const path=require("path");

exports.start=async function(){
    console.log("index.js!");
    try {
        
        let params = {
            userName:"Ya Dong",
            greetingMessage:"I hope you are doing well!",
            otherInformation:"Please find the attached report.",
            table_column:["User ID","First Name","Last Name","Company","Function"],
            list:empData.filter(item=>item["Function"]==="IT"&&item["Company"]==="JWMS China"),
            template:"emailTemplate.ejs"
        }
        let html=await htmlContent.generateHtml(params);
        let attachments=[{
            filename:"final-line-20181128.xlsx",
            path:path.join(__dirname,"./final-line-20181128.xlsx")
        }];
        let emailSender = new EmailSender({
            html:html,
            recipients:["yd.zhu@biosensors.com","yunlin.song@jwmsgrp.com"],
            ccRecipients:["zq.song@jwmsgrp.com","q.yu@jwmsgrp.com","c.han@jwmsgrp.com"],
            subject:"Yadong Demo Project!",
            attachments:attachments
        })
        emailSender.sendEmail();
    } catch (error) {
        console.error(error);
    }

}
