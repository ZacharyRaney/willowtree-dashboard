# willowtree-dashboard
To run using [Yarn](https://yarnpkg.com/):
```
yarn install
yarn server
```

Requires a client_secret.json from Google API and requires a keys.js file with the format:
```
const ONTAP_SHEETID = ''; // Google Sheet ID that has the information for whats on tap.

module.exports = {ONTAP_SHEETID};
```
These files should be stored in a folder in the project root named .secrets
The OnTap sheet coulums should be: name, location, type, abv, and description.
