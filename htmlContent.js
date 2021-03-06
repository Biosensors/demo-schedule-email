const ejs = require('ejs');
const path=require("path");
exports.generateHtml=function(params){
    try {
        let template =params.template;
        let data={
            nameOfUser:params.userName,
            greetingMessage:params.greetingMessage||"How are you!",
            otherInformation:params.otherInformation||"Please find the report below:",
            table_column:params.table_column,
            list:params.list
        }
        return new Promise((resolve, reject) => {
            ejs.renderFile(path.join(__dirname, `./${template}`), data, {},function(err, html){
                if (err) {
                    reject(err);
                   } else {
                    resolve(html);
                   }
            });
        })
        
    } catch (error) {
        console.error(error);
    }
}