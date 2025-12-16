// config.js - THIS WILL TRIGGER ALERTS!
module.exports = {
  // AWS credentials
  AWS_ACCESS_KEY_ID: "AKIAIOSFODNN7EXAMPLE",
  AWS_SECRET_ACCESS_KEY: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  
  // GitHub Personal Access Token
  GITHUB_TOKEN: "ghp_1234567890abcdefghijklmnopqrstuvwxyz",
  
  // Stripe API Key
  STRIPE_SECRET_KEY: "sk_live_1234567890abcdefghijklmnopqrstuv",
  
  // Google API Key
  GOOGLE_API_KEY: "AIzaSyD1234567890abcdefghijklmnopqrstuv",
  
  // Slack Webhook
  SLACK_WEBHOOK: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
  
  // Private SSH Key
  SSH_PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyz...
-----END RSA PRIVATE KEY-----`,
  
  // Database credentials
  DB_CONNECTION_STRING: "postgresql://user:SuperSecret123!@db.example.com:5432/mydb",
  
  // JWT Secret
  JWT_SECRET: "super-secret-jwt-key-that-should-not-be-here",
  
  // Mailgun API Key
  MAILGUN_API_KEY: "key-1234567890abcdefghijklmnopqrstuv",
  
  // Twilio credentials
  TWILIO_ACCOUNT_SID: "AC1234567890abcdefghijklmnopqrstuv",
  TWILIO_AUTH_TOKEN: "1234567890abcdefghijklmnopqrstuv"
};