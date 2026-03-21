const brevo = require("@getbrevo/brevo");

let apiInstance = new brevo.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

exports.mailSender = async (mail, title, body) => {
    try {
        let sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.sender = { name: "Eduverse", email: "manishkhandait05@gmail.com" };
        sendSmtpEmail.to = [{ email: mail }];
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully: ", data);
    } catch (error) {
        console.log("Email error:", error.message);
    }
};
```

Also make sure in Render your env variable is:
```
BREVO_API_KEY=your-brevo-api-key