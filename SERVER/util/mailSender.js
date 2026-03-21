const nodemailer = require("nodemailer");

exports.mailSender = async (mail, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.resend.com",
            port: 465,
            secure: true,
            auth: {
                user: "resend",
                pass: process.env.RESEND_API_KEY,
            },
        });

        let info = await transporter.sendMail({
            from: "onboarding@resend.dev",
            to: mail,
            subject: title,
            html: body,
        });
        console.log("Email sent successfully: ", info);
    } catch (error) {
        console.log(error.message);
    }
};