const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

exports.mailSender = async (mail, title, body) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: title,
            htmlContent: body,
            sender: { name: "Eduverse", email: "manishkhandait05@gmail.com" },
            to: [{ email: mail }],
        });
        console.log("Email sent successfully: ", result);
    } catch (error) {
        console.log("Email error:", error.message);
    }
};