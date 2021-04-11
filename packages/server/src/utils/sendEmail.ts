import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'iycqnfn3zpvimhzn@ethereal.email',
      pass: 'c1aHndf4WtEjjbFTZB',
    },
  });

  const message = {
    from: 'Booga Ooga <s.d.01.2002@gmail.com>',
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
