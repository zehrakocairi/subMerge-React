import React, { createContext, useState } from "react";

export const ApplicationContext = createContext();

function ApplicationProvider({ children }) {
  const [whiteBoardSubtitles, setWhiteBoardSubtitles] = useState([]);
  const [showOne, setShowOne] = useState(false);
  const [changeText, setChangeText] = useState(false);

  const sharedState = {
    whiteBoardSubtitles,
    setWhiteBoardSubtitles,
    showOne,
    setShowOne,
    changeText,
    setChangeText,
  };
  return <ApplicationContext.Provider value={sharedState}>{children}</ApplicationContext.Provider>;
}

export default ApplicationProvider;
