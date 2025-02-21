export const AppConfig = {
  AppUrl: process.env.NEXT_PUBLIC_APP_URL as string,
  // NEXT AUTH
  AuthSecret: process.env.AUTH_SECRET,
  // NODE MAILER
  SenderGmail: process.env.SENDER_GMAIL,
  SenderGmailPass: process.env.SENDER_GMAIL_PASS,
};

export const phoneInputStyle = {
  width: "100%",
  height: "48px",
  color: "black",
  fontSize: "16px",
  borderColor: "#E5E5E5",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.07)",
};
