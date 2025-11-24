import React, { useState } from 'react';
import { View, User } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import EstimatorTool from './components/EstimatorTool';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Legal from './components/Legal';
import Pricing from './components/Pricing';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [user, setUser] = useState<User | null>(null);

  const navigate = (view: View) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    navigate(View.ESTIMATOR);
  };

  const handleLogout = () => {
    setUser(null);
    navigate(View.LANDING);
  };

  const renderView = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingPage navigate={navigate} user={user} />;
      case View.ESTIMATOR:
        return <div className="max-w-7xl mx-auto px-4 py-8"><EstimatorTool /></div>;
      case View.LOGIN:
        return <Auth initialView={View.LOGIN} onLogin={handleLogin} navigate={navigate} />;
      case View.SIGNUP:
        return <Auth initialView={View.SIGNUP} onLogin={handleLogin} navigate={navigate} />;
      case View.PROFILE:
        return user ? <Profile user={user} navigate={navigate} /> : <Auth initialView={View.LOGIN} onLogin={handleLogin} navigate={navigate} />;
      case View.TERMS:
        return <Legal view={View.TERMS} />;
      case View.PRIVACY:
        return <Legal view={View.PRIVACY} />;
      case View.PRICING:
        return <Pricing navigate={navigate} />;
      default:
        return <LandingPage navigate={navigate} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar
        currentView={currentView}
        user={user}
        navigate={navigate}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderView()}
      </main>
    </div>
  );
}

export default App;