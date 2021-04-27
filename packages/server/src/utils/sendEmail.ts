import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log(testAccount.user, testAccount.pass);
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'gj7s4nm4uvxrqcl3@ethereal.email',
      pass: '291QNH5KqAJECnNCb2',
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
