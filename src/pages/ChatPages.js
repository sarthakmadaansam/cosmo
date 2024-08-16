import React, { useState, useEffect } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { useNavigate } from 'react-router-dom';
import { startSession, endSession } from './SessionManager';
import './StylingChatPage.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

function ChatPage() {
  const navigate = useNavigate();
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hi there! How can I help you today?", sender: "ChatGPT", direction: "incoming" }
  ]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    startSession();
    return () => {
      endSession();
    };
  }, []);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    setMessage("");

    await processMessageToChatGPT(newMessages);
  };

  const handleTerminateChat = () => {
    endSession();
    navigate('/');
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message
    }));

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old."
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      const chatGPTResponse = data.choices[0]?.message?.content || "Sorry, I didn't understand that.";

      setMessages([...chatMessages, {
        message: chatGPTResponse,
        sender: "ChatGPT",
        direction: "incoming"
      }]);
      setTyping(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <MainContainer className="chat-page">
      <div className="chat-container">
        <ChatContainer>
          <MessageList
            scrollBehavior='smooth'
            typingIndicator={typing ? <TypingIndicator content="Rex is typing" /> : null}>
            {messages.map((message, index) => (
              <Message key={index} model={message} />
            ))}
          </MessageList>
        </ChatContainer>
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
        <button onClick={handleTerminateChat}>Terminate Chat</button>
      </div>
    </MainContainer>
  );
}

export default ChatPage;
