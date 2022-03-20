import nodemailer from 'nodemailer';

export const emailRegister = (data) => {
    const {email, name, token} = data;
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5c2e5bc74614e8",
          pass: "4837168dfd9691"
        }
      });

    // Email info
    const info =  transport.sendMail({
        from: '"UpTask - Projects administrator"<accounts@uptask.com>',
        to: email,
        subject: "UpTask - confirm your account",
        text: "Confirm your account",
        html: `<p>Hi: ${name} confirm your account on UpTask  </p>
        <p>Your account is almost ready, just confirm it at the next link</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>
        <p>If you don't create this account, please ignore this email</p>
        `
        });
};

export const emailForgotPassword = (data) => {
  const {email, name, token} = data;
  const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5c2e5bc74614e8",
        pass: "4837168dfd9691"
      }
    });

  // Email info
  const info =  transport.sendMail({
      from: '"UpTask - Projects administrator"<accounts@uptask.com>',
      to: email,
      subject: "UpTask - restablish your password",
      text: "Restablish your password",
      html: `<p>Hi: ${name} you asked for a new password  </p>
      <p>Just confirm it at the next link:</p>
      <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablish password</a>
      <p>If you don't ask this email, please ignore this email</p>
      `
      });
};
