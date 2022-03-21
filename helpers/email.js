import nodemailer from 'nodemailer';

export const emailRegister = (data) => {
  const { email, name, token } = data;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  // Email info
  const info = transport.sendMail({
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
  const { email, name, token } = data;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  // Email info
  const info = transport.sendMail({
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
