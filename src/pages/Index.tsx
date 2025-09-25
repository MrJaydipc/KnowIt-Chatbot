import React, { useState } from 'react';
import { HeroSection } from '@/components/LandingPage/HeroSection';
import { ChatWidget } from '@/components/ChatBot/ChatWidget';
import { AdminPanel } from '@/components/AdminDashboard/AdminPanel';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');

  return (
    <div className="relative">
      {currentView === 'landing' && (
        <>
          <HeroSection />
          <ChatWidget />
          <div className="fixed top-4 right-4 z-50">
            <Button 
              onClick={() => setCurrentView('admin')}
              variant="outline"
              size="sm"
            >
              Admin View
            </Button>
          </div>
        </>
      )}
      
      {currentView === 'admin' && (
        <>
          <AdminPanel />
          <div className="fixed top-4 right-4 z-50">
            <Button 
              onClick={() => setCurrentView('landing')}
              variant="outline"
              size="sm"
            >
              Landing View
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
