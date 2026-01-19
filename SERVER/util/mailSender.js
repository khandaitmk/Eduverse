const nodemailer = require('nodemailer');

exports.mailSender= async (mail,title,body)=>{
    try{
        const transporter = nodemailer.createTransport({
           host: process.env.MAIL_HOST,
            port: 587, // try 465 if 587 fails
            secure: false, // true if port 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            logger: true,  
            debug: true     
        });

        let info = await transporter.sendMail({
            from:process.env.MAIL_USER,
            to: mail,
            subject: title,
            html: body
        });
        console.log("message sent : ",info);

    }catch(error){
        console.log(error.message);
    }
};