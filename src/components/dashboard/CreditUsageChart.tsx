import React from 'react';
import { useCredits } from '../../contexts/CreditContext';

const CreditUsageChart: React.FC = () => {
  const { credits, maxCredits, percentageUsed } = useCredits();
  
  // Calculate the angle for the arc based on percentage used
  const circumference = 2 * Math.PI * 44; // 44 is the radius of our circle
  const strokeDashoffset = circumference * (1 - percentageUsed / 100);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-muted stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="44"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            className="text-primary stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="44"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{credits}</span>
          <span className="text-xs text-muted-foreground">Credits left</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">
          {percentageUsed}% used
        </p>
        <p className="text-sm">
          {credits} / {maxCredits} credits remaining
        </p>
      </div>
    </div>
  );
};

export default CreditUsageChart;