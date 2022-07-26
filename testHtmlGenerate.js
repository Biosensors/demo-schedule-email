const htmlContent=require('./htmlContent');
const empData=require("./emp.json");

(async function(){
    let params = {
        userName:"Yun lin",
        greetingMessage:"I hope you are doing well!",
        otherInformation:"Please find the attached report.",
        table_column:["User ID","First Name","Last Name","Company","Function"],
        list:empData.filter(item=>item["Function"]==="IT"&&item["Company"]==="JWMS China"),
        template:"emailTemplate.ejs"
    }
    let html=await htmlContent.generateHtml(params);
    console.log(html);
})();
