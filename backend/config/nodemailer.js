
// using brevo
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }

// });

// export default transporter;

// using gmail
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,          
//     secure: true,       
//     auth: {
//         user: process.env.SMTP_USER, 
//         pass: process.env.SMTP_PASS  
//     }
// });

// export default transporter;


const transporter = {
    sendMail: async (mailOptions) => {
        try {
            const payload = {
                sender: { 
                    name: "VirDev", 
                    email: process.env.SMTP_USER 
                },
                to: [{ email: mailOptions.to }],
                subject: mailOptions.subject,
                htmlContent: mailOptions.html || mailOptions.text, 
            };

            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": process.env.BREVO_API_KEY, 
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (!response.ok) {
                console.error("❌ Brevo API Error:", data);
                throw new Error(`Brevo API Error: ${JSON.stringify(data)}`);
            }

            console.log("✅ Email sent successfully via API! ID:", data.messageId);
            return data;
            
        } catch (error) {
            console.error("❌ Transporter Error:", error.message);
            throw error;
        }
    }
};

export default transporter;