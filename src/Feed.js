import React, { useState, useEffect, useReducer } from "react";
import Conversation from "./Conversation"
import InputBox from "./InputBox"
import useActiveConversation from "./useActiveConversation";
import Api from "./api";

function reducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_CONVERSATION": {
      return {
        ...state,
        activeConversationId: action.id
      }
    }

    case "CLEAR_ACTIVE_CONVERSATION": {
      return {
        ...state,
        activeConversationId: action.id
      }
    }

    default: {
      return state;
    }
  }
}

export default function Feed({ initialConversations }) {
  const [conversations, setConversations] = useState(initialConversations);
  const { activeConversationId, setActiveConversationId } = useActiveConversation();
  const [secondsSinceLastMessage, setSecondsSinceLastMessage] = useState(500);

  const mostRecentConversation = conversations[conversations.length - 1];

  const [state, dispatch] = useReducer({ activeConversationId: mostRecentConversation.id })


  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceLastMessage(seconds => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])
  
  const handleSubmitMessage = async (messageText) => {
    if (secondsSinceLastMessage > 60) {
      const conversation = await Api.createConversation(messageText);
      setConversations([...conversations, conversation]);
    }
    setSecondsSinceLastMessage(0);
  }

  return (
    <div className="feed">
      <div className="feed__conversations">
        {conversations.map(conversation =>
          <Conversation
            key={conversation.id}
            id={conversation.id}
            initialMessages={conversation.messages}
          />
        )}
      </div>
      {isLastConversationActive && (
        <div className="feed__textbox">
          <InputBox onSubmit={handleSubmitMessage} />
        </div>
      )}
    </div>
  )
}