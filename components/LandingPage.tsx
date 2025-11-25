import React from 'react';
import { View, User } from '../types';
import Footer from './Footer';
import Hero from './Hero';
import TailoredSection from './TailoredSection';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import PricingSection from './PricingSection';

interface LandingPageProps {
  navigate: (view: View) => void;
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate, user }) => {
  return (
    <div className="flex flex-col font-sans">
      <Hero navigate={navigate} user={user} />
      <TailoredSection />
      <HowItWorks />
      <Testimonials />
      <PricingSection navigate={navigate} />
      <Footer navigate={navigate} />
    </div>
  );
};

export default LandingPage;