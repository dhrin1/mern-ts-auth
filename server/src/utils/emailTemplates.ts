export const getVerifyEmailTemplate = (url: string) => ({
  subject: "Verify email address",
  text: `Click on the link to verify email address: ${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Verify Email
</body>
</html>`,
});
