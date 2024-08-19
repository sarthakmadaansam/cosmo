const {onRequest} = require("firebase-functions/v2/https");

const addMessage = require("./api/addMessage");

exports.addMessage = onRequest(addMessage.addMessage);
