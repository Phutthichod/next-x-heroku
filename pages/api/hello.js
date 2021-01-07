// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
console.log("test")
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
let oAuth2Client
let url = ""
// fs.readFile('./credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Apps Script API.

//   authorize(JSON.parse(content));
// });


function getToken(code) {
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);

    console.log(token)

    // callAppsScript(oAuth2Client)

    oAuth2Client.setCredentials(token);
    // listEvents(oAuth2Client)
    // return token
    insertAcl(oAuth2Client)
    return token
  })
}


// function callAppsScript(auth) {
//   const script = google.script({version: 'v1', auth});
//   script.projects.create({
//     resource: {
//       title: 'My Script',
//     },
//   }, (err, res) => {
//     if (err) return console.log(`The API create method returned an error: ${err}`);
//     script.projects.updateContent({
//       scriptId: res.data.scriptId,
//       auth,
//       resource: {
//         files: [{
//           name: 'hello',
//           type: 'SERVER_JS',
//           source: 'function helloWorld() {\n  console.log("Hello, world!");\n}',
//         }, {
//           name: 'appsscript',
//           type: 'JSON',
//           source: '{\"timeZone\":\"America/New_York\",\"exceptionLogging\":' +
//            '\"CLOUD\"}',
//         }],
//       },
//     }, {}, (err, res) => {
//       if (err) return console.log(`The API updateContent method returned an error: ${err}`);
//       console.log(`https://script.google.com/d/${res.data.scriptId}/edit`);
//     });
//   });
// }
function authorize(credentials, res) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  getCode(oAuth2Client, res);
}
function getCode(oAuth2Client, res) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  url = authUrl
  res.statusCode = 200
  res.json({ url: url })

}
async function insertAcl(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.acl.insert({
    calendarId: "primary", requestBody: {
      role: "owner",
      scope: {
        type: "user",
        value: "pin2041to@pintest.page",
      }

    }
  })
  console.log(res.data)
}
function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    console.log(events)
    return events
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}
export default (req, res) => {
  // console.log(res)
  if (req.method === 'POST') {
    console.log(req.body)
    // console.log()
    res.statusCode = 200
    res.json({ token: getToken(req.body.code) })
  } else {
    fs.readFile('./credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Apps Script API.

      authorize(JSON.parse(content), res);
    });

  }


}
