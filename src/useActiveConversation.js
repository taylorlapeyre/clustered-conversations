import React, { useState, createContext, useContext } from "react";

const ActiveConversationContext = createContext();

export function ActiveConversationProvider({ children }) {
  const [activeConversationId, setActiveConversationId] = useState(null);

  return <ActiveConversationContext.Provider value={{
    activeConversationId,
    setActiveConversationId
  }}>
    {children}
  </ActiveConversationContext.Provider>
}


export default function useActiveConversation() {
  return useContext(ActiveConversationContext);
}

// const { activeId, setActiveId } = useActiveConnversation()