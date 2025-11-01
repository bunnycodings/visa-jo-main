'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface ContentRefreshContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const ContentRefreshContext = createContext<ContentRefreshContextType | undefined>(undefined);

export function ContentRefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <ContentRefreshContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </ContentRefreshContext.Provider>
  );
}

export function useContentRefresh() {
  const context = useContext(ContentRefreshContext);
  if (!context) {
    throw new Error('useContentRefresh must be used within ContentRefreshProvider');
  }
  return context;
}
