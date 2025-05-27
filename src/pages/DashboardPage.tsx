import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import TextHumanizer from '../components/humanizer/TextHumanizer';
import CreditUsageChart from '../components/dashboard/CreditUsageChart';
import SavedProjects from '../components/dashboard/SavedProjects';
import { ArrowUpRight, Plus, History, Settings } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('humanizer');

  return (
    <div className="py-8 bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-border p-5 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">
                    {user?.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h2 className="font-medium text-lg">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="mt-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {user?.planType.charAt(0).toUpperCase() + user?.planType.slice(1)} Plan
                </div>
              </div>

              <div className="mt-6">
                <CreditUsageChart />
                <Link 
                  to="/pricing" 
                  className="btn-outline w-full mt-4 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Get More Credits
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <nav>
                <button 
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === 'humanizer' 
                      ? 'bg-primary/5 text-primary border-l-2 border-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveTab('humanizer')}
                >
                  <Plus className="h-5 w-5" />
                  Humanizer
                </button>
                <button 
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === 'history' 
                      ? 'bg-primary/5 text-primary border-l-2 border-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  <History className="h-5 w-5" />
                  History
                </button>
                <button 
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-primary/5 text-primary border-l-2 border-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'humanizer' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h1 className="text-2xl font-bold mb-6">AI Humanizer Tool</h1>
                  <TextHumanizer />
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Tips for Better Results</h2>
                    <a href="#" className="text-primary text-sm flex items-center gap-1">
                      Learn more <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use medium or strong humanization for best results with AI detection tools</li>
                    <li>• Check the output for any remaining AI patterns or unnatural phrasing</li>
                    <li>• For academic content, use the 'medium' setting to maintain formal tone</li>
                    <li>• For creative writing, the 'strong' setting works best</li>
                    <li>• Process text in smaller chunks (500-1000 words) for optimal results</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="space-y-6">
                <SavedProjects />
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                        <input type="text" id="name" className="input-field" defaultValue={user?.name} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" id="email" className="input-field" defaultValue={user?.email} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-lg font-medium mb-4">Subscription Plan</h2>
                    <div className="p-4 rounded-md bg-muted">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{user?.planType.charAt(0).toUpperCase() + user?.planType.slice(1)} Plan</p>
                          <p className="text-sm text-muted-foreground">Renewal on October 15, 2023</p>
                        </div>
                        <Link to="/pricing" className="btn-primary text-sm">
                          Change Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-lg font-medium mb-4">Password</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium mb-1">Current Password</label>
                        <input type="password" id="current-password" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium mb-1">New Password</label>
                        <input type="password" id="new-password" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <input type="password" id="confirm-password" className="input-field" />
                      </div>
                      <button className="btn-primary">Update Password</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;