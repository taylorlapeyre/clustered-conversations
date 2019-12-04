import React from 'react';
import Feed from "./Feed";
import uuid from "uuid/v4";
import './App.css';

const testData = {
  feed: {
    id: uuid(),
    conversations: [
      {
        id: uuid(),
        messages: [
          {
            id: uuid(),
            text: "Hiro is being super chill right now"
          },
          {
            id: uuid(),
            text: "I wish my dog was that chill"
          }
        ]
      },
      {
        id: uuid(),
        messages: [
          {
            id: uuid(),
            text: "Did anyone see the new Avengers movie?"
          },
          {
            id: uuid(),
            text: "Yeah, I totally did!"
          }
        ]
      }
    ]
  }
}


function App() {  
  return (
    <Feed initialConversations={testData.feed.conversations} />
  );
}

export default App;
