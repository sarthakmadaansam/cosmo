const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  try {
    const {chatId, message} = req.body;

    // Basic validation
    if (!chatId || !message) {
      return res.status(400).json({error: "Missing required fields"});
    }

    // Reference to the chat document
    const chatRef = db.collection("chats").doc(chatId);

    // Add the message to the messages subcollection
    const messageRef = await chatRef.collection("messages").add({
      message: message,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Return success response
    return res.status(200).json({
      message: "Message added successfully",
      messageId: messageRef.id,
    });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});
