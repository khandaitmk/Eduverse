const nodemailer = require("nodemailer");

exports.mailSender = async (mail, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,        // ✅ change from 465 to 587
    secure: false,    // ✅ change from true to false
    auth: {
        user: "resend",
        pass: process.env.RESEND_API,
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