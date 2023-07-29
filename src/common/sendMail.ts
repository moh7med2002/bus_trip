import * as nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'moha7medheshamabohani@gmail.com',
    pass: 'vbquetqbpspsbavf',
  },
});

// const mailOptions = {
//   from: 'moha7medheshamabohani@gmail.com',
//   to: 'recipient@example.com',
//   subject: 'Test Email',
//   text: 'This is a test email sent from Node.js using nodemailer.',
// };

export const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
