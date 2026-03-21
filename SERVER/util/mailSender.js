const Brevo = require("@getbrevo/brevo");

const client = Brevo.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();

exports.mailSender = async (mail, title, body) => {
    try {
        const sendSmtpEmail = new Brevo.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: mail }];
        sendSmtpEmail.sender = { email: "manishkhandait05@gmail.com", name: "Eduverse" };
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;

        const data = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully: ", data);
    } catch (error) {
        console.log("Email error:", error.message);
    }
};
