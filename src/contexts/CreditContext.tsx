import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CreditContextType {
  credits: number;
  maxCredits: number;
  useCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  percentageUsed: number;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};

const getPlanCredits = (planType: string): number => {
  switch (planType) {
    case 'free':
      return 100;
    case 'basic':
      return 500;
    case 'premium':
      return 2000;
    case 'enterprise':
      return 10000;
    default:
      return 100;
  }
};

interface CreditProviderProps {
  children: ReactNode;
}

export const CreditProvider: React.FC<CreditProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(100);

  useEffect(() => {
    if (user) {
      // Get stored credits or set default based on plan
      const storedCredits = localStorage.getItem(`credits_${user.id}`);
      const planMaxCredits = getPlanCredits(user.planType);
      
      if (storedCredits) {
        setCredits(parseInt(storedCredits, 10));
      } else {
        // For new users, start with full credits
        setCredits(planMaxCredits);
        localStorage.setItem(`credits_${user.id}`, planMaxCredits.toString());
      }
      
      setMaxCredits(planMaxCredits);
    } else {
      // Default for unauthenticated users
      setCredits(0);
      setMaxCredits(100);
    }
  }, [user]);

  const useCredits = (amount: number) => {
    if (!user) return;
    
    const newCredits = Math.max(0, credits - amount);
    setCredits(newCredits);
    localStorage.setItem(`credits_${user.id}`, newCredits.toString());
  };

  const addCredits = (amount: number) => {
    if (!user) return;
    
    const newCredits = Math.min(maxCredits, credits + amount);
    setCredits(newCredits);
    localStorage.setItem(`credits_${user.id}`, newCredits.toString());
  };

  const percentageUsed = Math.round(((maxCredits - credits) / maxCredits) * 100);

  return (
    <CreditContext.Provider
      value={{
        credits,
        maxCredits,
        useCredits,
        addCredits,
        percentageUsed,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};