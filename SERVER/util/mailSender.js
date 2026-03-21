require("dotenv").config();
const brevo = require("@getbrevo/brevo");

// Correct initialization (as per docs)
let defaultClient = brevo.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new brevo.TransactionalEmailsApi();

exports.mailSender = async (mail, title, body) => {
    try {
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "Eduverse",
            email: "manishkhandait05@gmail.com"
        };

        sendSmtpEmail.to = [{ email: mail }];
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("Email sent:", data);
    } catch (err) {
        console.error(err);
    }
};