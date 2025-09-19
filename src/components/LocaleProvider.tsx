'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocaleContextType {
  locale: string;
  messages: any;
  t: (key: string, fallback?: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ 
  children, 
  locale 
}: { 
  children: React.ReactNode; 
  locale: string; 
}) {
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    // Load messages dynamically
    const loadMessages = async () => {
      try {
        const messagesModule = await import(`../messages/${locale}.json`);
        setMessages(messagesModule.default);
      } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        // Fallback to Romanian
        try {
          const fallbackModule = await import(`../messages/ro.json`);
          setMessages(fallbackModule.default);
        } catch (fallbackError) {
          console.error('Failed to load fallback messages:', fallbackError);
          setMessages({});
        }
      }
    };

    loadMessages();
  }, [locale]);

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, messages, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context.locale;
}

export function useTranslations() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LocaleProvider');
  }
  return context.t;
}