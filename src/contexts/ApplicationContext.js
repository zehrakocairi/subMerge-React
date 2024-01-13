import React, { createContext, useState } from "react";

export const ApplicationContext = createContext();

function ApplicationProvider({ children }) {
  const [whiteBoardSubtitles, setWhiteBoardSubtitles] = useState([]);

  const sharedState = {
    whiteBoardSubtitles,
    setWhiteBoardSubtitles,
  };
  return <ApplicationContext.Provider value={sharedState}>{children}</ApplicationContext.Provider>;
}

export default ApplicationProvider;
