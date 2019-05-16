// Note that you'll need to add these dependencies to the package.json in browser.
const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase); // get administrator perms.
var db = admin.firestore(); // get reference to database for project.

/**
 * Add epoch data for a given interaction.
 * @param {*} interaction each browser instance.
 * @param {*} epochNumber aka generation number.
 * @param {*} epochScore score of the best bird for a given epoch.
 */
function setStats(interaction, epochNumber, epochScore) {
  const newEpochRef = db.collection('interactions').doc(interaction.toString())
    .collection('epochs').doc(`epoch${epochNumber}`);
  newEpochRef.set({epochScore: epochScore}, {merge: true});
}

/**
 * @param req (Request) Follows the format:
 * {
 *    "interaction": "AEF1295684BDA1F45E56",
 *    "epochScore": 55,
 *    "epochNumber": 6
 * }
 * @param res (Response)
 */
exports.addGenerationStats = (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  const getParam = key => req.query[key] || req.body[key];
  const interaction = getParam("interaction"),
    epochNumber = getParam("epochNumber"),
    epochScore = getParam("epochScore");
  if (interaction !== undefined && epochNumber !== undefined && epochScore !== undefined) {
  	setStats(interaction, epochNumber, epochScore);
    res.status(200).send(`${epochNumber} ${epochScore} ${interaction}`);
  } else {
  	res.status(201).send(`Invalid parameters. 1${interaction}, 2${epochNumber}, 3${epochScore}`);
  }

};
