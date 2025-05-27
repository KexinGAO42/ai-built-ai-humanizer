import React, { useState } from 'react';
import { Loader2, RefreshCw, Copy, Check } from 'lucide-react';
import { useCredits } from '../../contexts/CreditContext';
import { motion } from 'framer-motion';

// Mock humanization examples for demo
const humanizedExamples = [
  {
    original: "The neural network architecture comprised multiple layers of transformers with self-attention mechanisms.",
    humanized: "The design of the neural network included several layers of transformers that use self-attention mechanisms."
  },
  {
    original: "Users can input queries which the system processes utilizing natural language understanding algorithms.",
    humanized: "Users can type in questions, and the system uses natural language understanding to figure out what they're asking."
  },
  {
    original: "The implementation facilitates enhanced comprehension of complex linguistic structures.",
    humanized: "This approach helps people better understand complicated language patterns."
  }
];

const TextHumanizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [humanizationLevel, setHumanizationLevel] = useState('medium');
  const [copied, setCopied] = useState(false);
  const { credits, deductCredits } = useCredits();

  const processText = () => {
    if (!inputText.trim()) return;
    if (credits <= 0) {
      alert('You have no credits left. Please upgrade your plan.');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call with random delay
    setTimeout(() => {
      // For demo, we'll use a simple transformation
      // In a real app, this would call an actual API
      let result = '';
      
      // Simple mock "humanization" - in a real app this would be an AI service
      const words = inputText.split(' ');
      if (humanizationLevel === 'light') {
        // Light changes - shuffle a few words and adjust some punctuation
        result = words.map(word => 
          Math.random() > 0.8 ? word.replace(',', '') : word
        ).join(' ');
      } else if (humanizationLevel === 'medium') {
        // Medium changes - replace some words with synonyms and restructure
        result = inputText
          .replace('utilize', 'use')
          .replace('implement', 'build')
          .replace('functionality', 'features')
          .replace('therefore', 'so')
          .replace('additionally', 'also');
      } else {
        // Strong changes - more significant rewriting
        result = inputText
          .replace('utilize', 'use')
          .replace('implement', 'create')
          .replace('functionality', 'features')
          .replace('therefore', 'because of this')
          .replace('additionally', 'plus')
          .replace('however', 'but')
          .replace('nevertheless', 'still');
      }
      
      // Use some examples for demonstration if text matches
      for (const example of humanizedExamples) {
        if (inputText.includes(example.original)) {
          result = inputText.replace(example.original, example.humanized);
          break;
        }
      }
      
      // If no transformations applied, add some variety
      if (result === inputText) {
        result = `${inputText.split('.').join('.')} This text has been humanized to sound more natural and conversational.`;
      }
      
      setOutputText(result);
      setIsProcessing(false);
      
      // Use credits for the operation
      deductCredits(1);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">AI Text</h3>
          <textarea
            className="text-editor min-h-[300px]"
            placeholder="Paste your AI-generated text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <label htmlFor="humanization-level" className="block text-sm font-medium text-gray-700 mb-1">
                Humanization Level
              </label>
              <select
                id="humanization-level"
                className="input-field"
                value={humanizationLevel}
                onChange={(e) => setHumanizationLevel(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">
                Credits: {credits}
              </span>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={processText}
                disabled={isProcessing || !inputText.trim() || credits <= 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Humanize Text
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Humanized Text</h3>
            {outputText && (
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-success" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
          <div className="text-editor min-h-[300px] bg-muted/30">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Humanizing your text...</p>
              </div>
            ) : (
              <div>
                {outputText ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap"
                  >
                    {outputText}
                  </motion.p>
                ) : (
                  <p className="text-muted-foreground">
                    Your humanized text will appear here...
                  </p>
                )}
              </div>
            )}
          </div>
          {outputText && (
            <div className="mt-4 text-sm text-muted-foreground">
              <p>This text has been humanized and should pass AI detection tools.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextHumanizer;