import React, { useState, useEffect, useReducer } from "react";
import Conversation from "./Conversation"
import InputBox from "./InputBox"
import useActiveConversation from "./useActiveConversation";
import Api from "./api";

function conversationsReducer(state, action) {
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
        activeConversationId: state.conversations[state.conversations.length - 1].id
      }
    }

    case "NEW_CONVERSATION": {
      return {
        conversations: [...state.conversations, action.conversation],
        activeConversationId: action.conversation.id
      }
    }

    case "NEW_MESSAGE": {
      return {
        ...state,
        conversations: state.conversations.map(conversation => {
          if (conversation.id === action.id) {
            return {
              ...conversation,
              messages: [...conversation.messages, action.message ]
            }
          } else {
            return conversation
          }
        })
      }
    }

    default: {
      return state;
    }
  }
}

function last(array) {
  return array[array.length - 1];
}

export default function Feed({ initialConversations }) {
  const [secondsSinceLastMessage, setSecondsSinceLastMessage] = useState(500);

  const [conversationState, dispatch] = useReducer(conversationsReducer, {
    activeConversationId: last(initialConversations).id,
    conversations: initialConversations
  });

  const { conversations, activeConversationId } = conversationState;

  const mostRecentConversation = conversations[conversations.length - 1];

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceLastMessage(seconds => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])
  
  const handleSubmitMessage = async (messageText) => {
    if (secondsSinceLastMessage > 60 || conversations.length === 0) {
      const conversation = await Api.createConversation(messageText);
      dispatch({ type: "NEW_CONVERSATION", conversation })
    } else {
      const message = await Api.createMessage(messageText);
      dispatch({
        type: "NEW_MESSAGE",
        id: mostRecentConversation.id,
        message
      })
    }

    setSecondsSinceLastMessage(0);
  }

  return (
    <div className="feed">
      <div className="feed__conversations">
        {conversations.map(conversation =>
          <Conversation
            isActive={activeConversationId === conversation.id && conversation.id !== mostRecentConversation.id}
            dispatch={dispatch}
            key={conversation.id}
            id={conversation.id}
            messages={conversation.messages}
          />
        )}
      </div>
      {activeConversationId === mostRecentConversation.id && (
        <div className="feed__textbox">
          <InputBox onSubmit={handleSubmitMessage} />
        </div>
      )}
    </div>
  )
}