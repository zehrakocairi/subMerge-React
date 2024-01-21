import React, { createContext, useState } from "react";

export const ApplicationContext = createContext();

function ApplicationProvider({ children }) {
  const [whiteBoardSubtitles, setWhiteBoardSubtitles] = useState([]);
  const [showSingle, setShowSingle] = useState(false);
  const [showOnlyFirst, setShowOnlyFirst] = useState(false);

  const sharedState = {
    whiteBoardSubtitles,
    setWhiteBoardSubtitles,
    showSingle,
    setShowSingle,
    showOnlyFirst,
    setShowOnlyFirst,
  };
  return <ApplicationContext.Provider value={sharedState}>{children}</ApplicationContext.Provider>;
}

export default ApplicationProvider;
