import React, {createContext, useRef} from 'react';

interface ContextProps {
  getCurrentPlaylistId: () => string;
  setCurrentPlaylistId: (newId: string) => void;
  currentPlayListId: string;
}

export const GlobalContext = createContext<ContextProps | null>(null);
export function GlobalProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const currentPlayListId = useRef('');

  const setCurrentPlaylistId = (newId: string) => {
    currentPlayListId.current = newId;
  };

  const getCurrentPlaylistId = () => {
    return currentPlayListId.current;
  };
  const value = {
    getCurrentPlaylistId,
    setCurrentPlaylistId,
    currentPlayListId: currentPlayListId.current,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
