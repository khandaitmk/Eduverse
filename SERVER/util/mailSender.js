const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API);

exports.mailSender = async (mail, title, body) => {
    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: mail,
            subject: title,
            html: body,
        });
        console.log("Email sent successfully: ", data);
    } catch (error) {
        console.log("Email error:", error.message);
    }
};