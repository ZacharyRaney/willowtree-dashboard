import google from 'googleapis';
import fs from 'fs';
import readline from 'readline';
import GoogleAuth from 'google-auth-library';
import { ONTAP_SHEETID } from '../../.secrets/keys';

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/ontap.json
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_DIR = `${process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}ontap.json`;

class OnTap {

  constructor() {
    this.auth = {};
    fs.readFile('./.secrets/client_secret.json', (err, content) => {
      if (err) {
        console.log(`Error loading client secret file: ${err}`);
        return;
      }
      this.authorize(JSON.parse(content));
    });
    this.response = {};
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  storeToken(token) { // eslint-disable-line class-methods-use-this
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log(`Token stored to ${TOKEN_PATH}`);
  }

  /**
   * Gets a new access token by prompting user to visit url
   * and input the code given
   */
  getNewToken(oauth2Client) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log(`Authorize this app by visiting this url: ${authUrl}`);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token; // eslint-disable-line no-param-reassign
        this.storeToken(token);
        this.auth = oauth2Client;
        this.update();
      });
    });
  }

  /**
   * Authorize using locally saved token. If none exsists,
   * calls getNewToken to create a new one
   */
  authorize(credentials) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new GoogleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        this.getNewToken(oauth2Client);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        this.auth = oauth2Client;
        this.update();
      }
    });
  }

  setResponse(res) {
    this.response = res;
  }

  /**
   * Update the stored copy of the spreadsheet data
   */
  update() {
    const sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: ONTAP_SHEETID,
      range: 'A2:E',
    }, (err, response) => {
      if (err) {
        console.log(`The API returned an error: ${err}`);
        return;
      }
      this.setResponse(JSON.stringify(response));
    });
  }
}
export default OnTap;
