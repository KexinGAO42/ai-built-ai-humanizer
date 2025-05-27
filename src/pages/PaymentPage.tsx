import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, CreditCard, Lock, CheckCircle } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState<string>(user?.planType || 'basic');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      credits: 500,
      features: ['Light humanization', 'Medium humanization', 'Save projects'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      credits: 2000,
      features: ['Light humanization', 'Medium humanization', 'Strong humanization', 'Save projects', 'Priority support'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      credits: 10000,
      features: ['Light humanization', 'Medium humanization', 'Strong humanization', 'Save projects', 'Priority support'],
    },
  ];
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Split into groups of 4 and join with spaces
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    
    return formatted;
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    // Limit to 19 characters (16 digits + 3 spaces)
    setCardNumber(formatted.slice(0, 19));
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    // Limit to 5 characters (MM/YY)
    setExpiryDate(formatted.slice(0, 5));
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 3-4 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Navigate to dashboard after successful payment
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };
  
  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);
  
  return (
    <div className="py-12 bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground">
              Choose your plan and enter payment details
            </p>
          </div>
          
          {isComplete ? (
            <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-success/10 p-4">
                  <CheckCircle className="h-16 w-16 text-success" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Your subscription has been activated.
              </p>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn-primary"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan Selection */}
              <div className="md:col-span-1 space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h2 className="text-lg font-semibold mb-4">Select a Plan</h2>
                  <div className="space-y-3">
                    {plans.map((plan) => (
                      <div 
                        key={plan.id}
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${
                          selectedPlan === plan.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {plan.credits} credits
                            </p>
                          </div>
                          <p className="font-semibold">${plan.price}/mo</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedPlanDetails && (
                  <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                    <h3 className="font-semibold mb-3">Plan Features</h3>
                    <ul className="space-y-2 text-sm">
                      {selectedPlanDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Payment Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h2 className="text-lg font-semibold mb-6">Payment Details</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          className="input-field pl-12"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        className="input-field"
                        placeholder="John Smith"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="input-field"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cvv"
                            className="input-field pr-10"
                            placeholder="123"
                            value={cvv}
                            onChange={handleCvvChange}
                            required
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-md mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Plan</span>
                        <span>{selectedPlanDetails?.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Credits</span>
                        <span>{selectedPlanDetails?.credits}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">${selectedPlanDetails?.price}/month</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-6">
                      <p className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Your payment information is secure. We use industry-standard encryption.
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full flex justify-center"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        `Subscribe for $${selectedPlanDetails?.price}/month`
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;