import React, { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import Api from "./api";

export default function Conversation({ id, dispatch, isActive, messages }) {
  const handleSubmitNewMessage = async (text) => {
    const message = await Api.createMessage(text);
    dispatch({ type: "NEW_MESSAGE", id, message })
  }

  const handleClick = () => {
    if (isActive) {
      dispatch({ type: "CLEAR_ACTIVE_CONVERSATION" })
    } else {
      dispatch({ type: "SET_ACTIVE_CONVERSATION", id })
    }
  }

  return (
    <div className="conversation" onClick={handleClick}>
      {messages.map(message =>
        <Message key={message.id} text={message.text} /> 
      )}
      {isActive && (
        <div className="conversation__textbox" onClick={event => event.stopPropagation()}>
          <InputBox onSubmit={handleSubmitNewMessage} />
        </div>
      )}
    </div>
  )
}