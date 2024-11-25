const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,   // ID de cliente
  process.env.GOOGLE_CLIENT_SECRET, // Secreto del cliente
  process.env.GOOGLE_REDIRECT_URI  // http://localhost:3000/google/callback
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email'
];

module.exports = { oauth2Client, SCOPES };