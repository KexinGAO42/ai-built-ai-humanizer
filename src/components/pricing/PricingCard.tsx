import React from 'react';
import { Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  planType: 'free' | 'basic' | 'premium' | 'enterprise';
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  planType,
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const isCurrentPlan = user?.planType === planType;
  
  const handleSubscribe = () => {
    if (!isAuthenticated) {
      navigate('/register');
    } else if (!isCurrentPlan) {
      navigate('/payment');
    }
  };
  
  return (
    <div 
      className={`card relative ${
        isPopular ? 'border-primary shadow-lg' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="mb-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-extrabold">${price}</span>
          <span className="ml-1 text-xl text-muted-foreground">/{period}</span>
        </div>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 ${feature.included ? 'text-success' : 'text-muted-foreground'}`}>
              <Check className="h-5 w-5" />
            </div>
            <span className={`ml-3 text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8">
        <button
          onClick={handleSubscribe}
          className={`w-full ${
            isCurrentPlan
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : isPopular
              ? 'btn-primary'
              : 'btn-outline'
          }`}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current Plan' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;