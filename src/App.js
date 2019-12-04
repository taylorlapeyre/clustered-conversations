import React from 'react';
import Feed from "./Feed";
import uuid from "uuid/v4";
import { ActiveConversationProvider } from "./useActiveConversation";
import './App.css';

const testData = {
  feed: {
    id: "f3783e82-c665-4a27-a1ee-009e8ca6b136",
    createdAt: "2019-10-31 18:46:14 UTC",
    updatedAt: "2019-10-31 18:46:14 UTC",
    conversations: [
      "f3783e82-c665-4a27-a1ee-009e8ca6b136"
    ]
  },
  conversations: [
    {
      id: "f3783e82-c665-4a27-a1ee-009e8ca6b136",
      createdAt: "2019-10-31 18:46:14 UTC",
      updatedAt: "2019-10-31 18:46:14 UTC",
      messages: [
        "f3783e82-c665-4a27-a1ee-009e8ca6b136",
        "f3783e82-c665-4a27-a1ee-009e8ca6b136",
        "f3783e82-c665-4a27-a1ee-009e8ca6b136"
      ]
    }
  ],
  messages: [
    {
      id: "f3783e82-c665-4a27-a1ee-009e8ca6b136",
      createdAt: "2019-10-31 18:46:14 UTC",
      updatedAt: "2019-10-31 18:46:14 UTC",
      conversation_id: "f3783e82-c665-4a27-a1ee-009e8ca6b136",
      text: "Haha! amazing"
    }
  ]
}

// graphql`
// feed(id: "f3783e82-c665-4a27-a1ee-009e8ca6b136") {
//   id,
//   createdAt,
//   updatedAt,
//   conversations {
//     id,
//     createdAt,
//     updatedAt,
//     messages {
//       id,
//       createdAt,
//       updatedAt,
//       text
//     }
//   }
// }
// `

const testData2 = {
  feed: {
    id: uuid(),
    conversations: [
      {
        id: uuid(),
        messages: [
          {
            id: uuid(),
            text: "Haha! amazing"
          },
          {
            id: uuid(),
            text: "Haha! amazing"
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
    <ActiveConversationProvider>
      <Feed initialConversations={testData2.feed.conversations} />
    </ActiveConversationProvider>
  );
}

export default App;
