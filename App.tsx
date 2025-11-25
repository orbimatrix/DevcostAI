import React, { useState, useEffect } from 'react';
import BlogPost from './components/BlogPost';
import { View, User, BlogPost as BlogPostType, SubscriptionTier } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import EstimatorTool from './components/EstimatorTool';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Legal from './components/Legal';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('devcost_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('devcost_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('devcost_user');
    }
  }, [user]);

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

  const handlePostClick = (post: BlogPostType) => {
    setSelectedPost(post);
    navigate(View.BLOG_POST);
  };

  const handleUsageIncrement = () => {
    if (user) {
      setUser({ ...user, usageCount: (user.usageCount || 0) + 1 });
    }
  };

  const handleUpgrade = (tier: SubscriptionTier) => {
    if (user) {
      setUser({ ...user, subscriptionTier: tier });
      alert(`Successfully upgraded to ${tier} plan!`);
      navigate(View.ESTIMATOR);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingPage navigate={navigate} user={user} />;
      case View.ESTIMATOR:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <EstimatorTool 
              user={user} 
              onUsageIncrement={handleUsageIncrement} 
              onUpgradeClick={() => navigate(View.PRICING)} 
            />
          </div>
        );
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
        return <Pricing navigate={navigate} user={user} onUpgrade={handleUpgrade} />;
      case View.ABOUT:
        return <About navigate={navigate} />;
      case View.CONTACT:
        return <Contact navigate={navigate} />;
      case View.BLOG:
        return <Blog navigate={navigate} onPostClick={handlePostClick} />;
      case View.BLOG_POST:
        return <BlogPost post={selectedPost} navigate={navigate} />;
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