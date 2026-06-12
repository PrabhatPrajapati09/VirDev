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


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,          
    secure: true,       
    auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS  
    }
});

export default transporter;



// We don't even need to import nodemailer anymore!

// const transporter = {
//     sendMail: async (mailOptions) => {
//         try {
//             const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//                 method: "POST",
//                 headers: {
//                     "accept": "application/json",
//                     "api-key": process.env.BREVO_API_KEY, 
//                     "content-type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     sender: { 
//                         name: "VirDev", 
//                         email: process.env.SMTP_USER
//                     },
//                     to: [{ email: mailOptions.to }],
//                     subject: mailOptions.subject,
//                     htmlContent: mailOptions.html,
//                     textContent: mailOptions.text
//                 })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error("Brevo API Error:", errorData);
//                 throw new Error("Failed to send email");
//             }

//             const data = await response.json();
//             return { messageId: data.messageId }; // Mocks Nodemailer's success response

//         } catch (error) {
//             console.error("Email Transporter Error:", error);
//             throw error;
//         }
//     }
// };

// export default transporter;