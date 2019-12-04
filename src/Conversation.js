import React, { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import Api from "./api";
import useActiveConversation from "./useActiveConversation"

export default function Conversation({ id, initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const { activeConversationId, setActiveConversationId } = useActiveConversation();

  const isActive = activeConversationId === id;

  const handleSubmitNewMessage = async (text) => {
    const message = await Api.createMessage(text);
    setMessages(messages => ([...messages, message]));
  }

  const handleClick = () => {
    if (isActive) {
      setActiveConversationId(null);
    } else {
      setActiveConversationId(id);
    }
  }

  return (
    <div className="conversation" onClick={handleClick}>
      {messages.map(message =>
        <Message key={message.id} text={message.text} /> 
      )}
      {activeConversationId === id && (
        <div className="conversation__textbox" onClick={event => event.stopPropagation()}>
          <InputBox onSubmit={handleSubmitNewMessage} />
        </div>
      )}
    </div>
  )
}