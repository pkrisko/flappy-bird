// Note that you'll need to add these dependencies to the package.json in browser.
const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase); // get administrator perms.
var db = admin.firestore(); // get reference to database for project.

/**
 * Each time a browser opens and first generation starts, log stats about what
 * the key variables for algorithm are.
 * @param {*} interaction
 * @param {*} learningRate
 * @param {*} mutationRateMultiplier
 * @param {*} numHiddenLayers
 */
function setStats(interaction, learningRate, mutationRateMultiplier, numHiddenLayers) {
  const newEpochRef = db.collection('interactions').doc(interaction.toString())
    .collection('keyVariables').doc(`keyVariables`);
  newEpochRef.set(
        {
            learningRate: learningRate,
            mutationRateMultiplier: mutationRateMultiplier,
            numHiddenLayers: numHiddenLayers
        },
        {merge: true}
    );
}

/**
 * @param req (Request) Follows the format:
 * {
 *    "interaction": "AEF1295684BDA1F45E56",
 *    "learningRate": 0.1,
 *    "mutationRateMultiplier": 4.2,
 *    "numHiddenLayers": 10
 * }
 * @param res (Response)
 */
exports.addKeyVariableStats = (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  const getParam = key => req.query[key] || req.body[key];
  const interaction = getParam("interaction"),
    learningRate = getParam("learningRate"),
    mutationRateMultiplier = getParam("mutationRateMultiplier"),
    numHiddenLayers = getParam("numHiddenLayers");
  if (interaction !== undefined && learningRate !== undefined
    && mutationRateMultiplier !== undefined && numHiddenLayers!== undefined) {
  	setStats(interaction, learningRate, mutationRateMultiplier, numHiddenLayers);
    res.status(200).send(`1${learningRate} 2${learningRate} 3${mutationRateMultiplier} 4${numHiddenLayers}`);
  } else {
  	res.status(201).send(`Invalid parameters. 1${learningRate} 2${learningRate} 3${mutationRateMultiplier} 4${numHiddenLayers}`);
  }
};
