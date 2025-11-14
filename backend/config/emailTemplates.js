export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Verify Your VirDev Account</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      background: #0F172A;
      font-family: Arial, Helvetica, sans-serif;
    }

    table {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 560px;
      margin: 50px auto;
      background: #1E293B;
      border-radius: 12px;
      overflow: hidden;
    }

    .header {
      padding: 32px 20px;
      color: white;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      background: linear-gradient(to right, #EC4899, #8B5CF6, #06B6D4);
    }

    .content {
      padding: 36px 30px;
      color: #E2E8F0;
      font-size: 16px;
      line-height: 1.6;
    }

    .otp-box {
      display: block;
      width: 100%;
      background: #1E293B;
      border: 2px solid #EC4899;
      color: #ffffff;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 4px;
      text-align: center;
      padding: 18px 0;
      border-radius: 10px;
      margin: 32px 0;
    }

    .footer {
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #94A3B8;
    }

    @media only screen and (max-width: 480px) {
      .content {
        padding: 25px 18px;
      }

      .header {
        font-size: 24px;
        padding: 26px 16px;
      }

      .otp-box {
        font-size: 26px;
        padding: 16px 0;
      }
    }
  </style>
</head>

<body>

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table class="container" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td class="header">
              Verify Your Email – VirDev
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content">
              <p>Hello Developer,</p>

              <p>
                You're one step away from unlocking your full VirDev experience.
                Please verify your account associated with:
                <br>
                <strong style="color:#06B6D4;">{{email}}</strong>
              </p>

              <p style="margin-top: 20px;">
                Enter the following One-Time Password (OTP) to complete your verification:
              </p>

              <!-- OTP Box -->
              <span class="otp-box">{{otp}}</span>

              <p>
                This OTP is valid for the next <strong style="color:#EC4899;">15 minutes</strong>.
                <br>If you didn’t request this, feel free to ignore this email.
              </p>

              <p>Happy Coding,<br><strong>VirDev Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              © 2025 VirDev. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>

</html>


`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Reset Your VirDev Password</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      background: #0F172A;
      font-family: Arial, Helvetica, sans-serif;
    }

    table {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 560px;
      margin: 50px auto;
      background: #1E293B;
      border-radius: 12px;
      overflow: hidden;
    }

    .header {
      padding: 32px 20px;
      color: white;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      background: linear-gradient(to right, #EC4899, #8B5CF6, #06B6D4);
    }

    .content {
      padding: 36px 30px;
      color: #E2E8F0;
      font-size: 16px;
      line-height: 1.6;
    }

    .otp-box {
      display: block;
      width: 100%;
      background: #1E293B;
      border: 2px solid #8B5CF6;
      color: #ffffff;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 4px;
      text-align: center;
      padding: 18px 0;
      border-radius: 10px;
      margin: 32px 0;
    }

    .footer {
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #94A3B8;
    }

    @media only screen and (max-width: 480px) {
      .content {
        padding: 25px 18px;
      }

      .header {
        font-size: 24px;
        padding: 26px 16px;
      }

      .otp-box {
        font-size: 26px;
        padding: 16px 0;
      }
    }
  </style>
</head>

<body>

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table class="container" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td class="header">
              Reset Your Password
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content">
              <p>Hello Developer,</p>

              <p>
                We received a request to reset the password for your VirDev account:
                <br>
                <strong style="color:#06B6D4;">{{email}}</strong>
              </p>

              <p style="margin-top: 20px;">
                Use the One-Time Password (OTP) below to reset your password:
              </p>

              <!-- OTP Display -->
              <span class="otp-box">{{otp}}</span>

              <p>
                ⚠️ This OTP is valid for the next
                <strong style="color:#EC4899;">15 minutes</strong>.
              </p>

              <p>
                If you didn’t request this, you can safely ignore this email.
              </p>

              <p>Stay secure,<br><strong>VirDev Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              © 2025 VirDev. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>

</html>

`

export const WELCOME_TO_VIRDEV_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Welcome to VirDev</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body { margin:0; padding:0; background:#0F172A; font-family:Arial, Helvetica; }
    table{ border-collapse:collapse; }

    .container{
      width:100%; max-width:560px; margin:40px auto;
      background:#1E293B; border-radius:14px; overflow:hidden;
    }

    .header{
      background:linear-gradient(to right,#EC4899,#8B5CF6,#06B6D4);
      text-align:center; padding:32px 20px; color:white;
      font-size:28px; font-weight:bold;
    }

    .content{
      padding:36px 30px; color:#E2E8F0; font-size:16px; line-height:1.7;
    }

    .button{
      display:inline-block; background:#8B5CF6; padding:14px 24px;
      color:white; border-radius:10px; text-decoration:none;
      font-size:16px; font-weight:bold; margin:25px 0; text-align:center;
    }

    .footer{
      padding:20px; text-align:center; color:#94A3B8; font-size:13px;
    }

    @media only screen and (max-width:480px){
      .content{ padding:26px 18px; }
      .header{ font-size:24px; }
    }
  </style>
</head>

<body>
  <table width="100%">
    <tr><td align="center">

      <table class="container">
        <tr><td class="header">Welcome to VirDev 🚀</td></tr>

        <tr><td class="content">
          <p>Hello <strong>{{name}}</strong>,</p>

          <p>Welcome to <strong>VirDev</strong> — the platform where developers connect, match, and build together.</p>

          <p>You’re now part of a global community of passionate coders who collaborate, share ideas, and level up their skills.</p>

          <p>Start by completing your profile so we can match you with the perfect dev partners.</p>

          <center>
            <a href="{{profileLink}}" class="button">Complete Your Profile</a>
          </center>

          <p>Let’s build something amazing.<br><strong>– The VirDev Team</strong></p>
        </td></tr>

        <tr><td class="footer">© 2025 VirDev • All rights reserved.</td></tr>
      </table>

    </td></tr>
  </table>
</body>
</html>
`


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Password Reset Successful</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body{ margin:0; padding:0; background:#0F172A; font-family:Arial; }
    table{ border-collapse:collapse; }

    .container{
      width:100%; max-width:560px; margin:50px auto;
      background:#1E293B; border-radius:14px; overflow:hidden;
    }

    .header{
      background:linear-gradient(to right,#06B6D4,#8B5CF6,#EC4899);
      text-align:center; padding:32px 20px; color:white;
      font-size:26px; font-weight:bold;
    }

    .content{
      padding:34px 28px; color:#E2E8F0; font-size:16px; line-height:1.7;
    }

    .footer{
      padding:18px; text-align:center; color:#94A3B8; font-size:13px;
    }
  </style>
</head>

<body>
  <table width="100%">
    <tr><td align="center">

      <table class="container">
        <tr><td class="header">Password Reset Successful 🔐</td></tr>

        <tr><td class="content">
          <p>Hello <strong>{{name}}</strong>,</p>

          <p>Your VirDev account password was successfully changed. If this was you — great, you’re all set.</p>

          <p>If you <strong>did not</strong> perform this action, immediately secure your account.</p>

          <p>We recommend:</p>
          <ul>
            <li>Resetting your password again</li>
            <li>Checking your active sessions</li>
            <li>Enabling additional security if available</li>
          </ul>

          <p>Stay safe,<br><strong>The VirDev Team</strong></p>
        </td></tr>

        <tr><td class="footer">© 2025 VirDev • All rights reserved.</td></tr>

      </table>

    </td></tr>
  </table>
</body>
</html>
`
