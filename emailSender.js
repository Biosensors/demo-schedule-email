'use strict';
const outlook = require('./outlookMailer');


class EmailSender{
    constructor(options){
        this.auth={
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
        this.recipients = options.recipients.join(",");
        this.ccRecipients = options.ccRecipients.join(",");
        this.subject=options.subject||"Demo Subject";
        this.attachments=options.attachments;
        this.html=options.html;
    }

    async sendEmail(){
        let self=this;
        await outlook.sendEmail({
            auth:self.auth,
            from:self.auth.user,
            to:self.recipients,
            cc:self.ccRecipients,
            subject:self.subject,
            html:self.html,
            attachments:self.attachments,
            onError: function(e){
                console.error(e)
            },
            onSuccess:function (i) {
                console.log("Email sent successfully!",i);
            }
        });
    }
}

module.exports=EmailSender