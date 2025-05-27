import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/pricing/PricingCard';

const PricingPage: React.FC = () => {
  const pricingPlans = [
    {
      title: 'Free',
      price: 0,
      period: 'month',
      description: 'Basic features for occasional use and personal projects.',
      features: [
        { text: '100 credits per month', included: true },
        { text: 'Light humanization', included: true },
        { text: 'Medium humanization', included: false },
        { text: 'Strong humanization', included: false },
        { text: 'Save projects', included: false },
        { text: 'Priority support', included: false },
      ],
      isPopular: false,
      planType: 'free' as const,
    },
    {
      title: 'Basic',
      price: 9.99,
      period: 'month',
      description: 'Perfect for individual creators and students.',
      features: [
        { text: '500 credits per month', included: true },
        { text: 'Light humanization', included: true },
        { text: 'Medium humanization', included: true },
        { text: 'Strong humanization', included: false },
        { text: 'Save projects', included: true },
        { text: 'Priority support', included: false },
      ],
      isPopular: true,
      planType: 'basic' as const,
    },
    {
      title: 'Premium',
      price: 19.99,
      period: 'month',
      description: 'For professionals who need more advanced features.',
      features: [
        { text: '2,000 credits per month', included: true },
        { text: 'Light humanization', included: true },
        { text: 'Medium humanization', included: true },
        { text: 'Strong humanization', included: true },
        { text: 'Save projects', included: true },
        { text: 'Priority support', included: true },
      ],
      isPopular: false,
      planType: 'premium' as const,
    },
    {
      title: 'Enterprise',
      price: 49.99,
      period: 'month',
      description: 'For teams and businesses with high volume needs.',
      features: [
        { text: '10,000 credits per month', included: true },
        { text: 'Light humanization', included: true },
        { text: 'Medium humanization', included: true },
        { text: 'Strong humanization', included: true },
        { text: 'Save projects', included: true },
        { text: 'Priority support', included: true },
      ],
      isPopular: false,
      planType: 'enterprise' as const,
    },
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container-custom">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground">
            Choose the plan that fits your needs. All plans include core features.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              planType={plan.planType}
            />
          ))}
        </motion.div>

        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What are credits?</h3>
              <p className="text-muted-foreground">
                Credits are used each time you humanize a piece of text. One credit allows you to humanize approximately 500 words of text.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Do unused credits roll over?</h3>
              <p className="text-muted-foreground">
                No, credits reset at the beginning of each billing cycle. Make sure to use all your credits before they expire.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Do you offer a free trial?</h3>
              <p className="text-muted-foreground">
                Yes, our Free plan lets you try the basic features without any commitment. You can upgrade anytime.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and select regional payment methods.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is your refund policy?</h3>
              <p className="text-muted-foreground">
                If you're not satisfied, contact us within 14 days of purchase for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;