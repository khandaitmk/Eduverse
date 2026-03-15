const nodemailer = require("nodemailer");

exports.mailSender = async (mail, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, // ✅ changed from 587
      secure: true, // ✅ changed from false
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: mail,
      subject: title,
      html: body,
    });
    console.log("message sent : ", info);
  } catch (error) {
    console.log(error.message);
  }
};
