
import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Sparkles, Heart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/Quiz";
import { Dashboard } from "@/components/Dashboard";
import { CameraCapture } from "@/components/CameraCapture";
import { Chatbot } from "@/components/Chatbot";
import { Leaderboard } from "@/components/Leaderboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'dashboard' | 'camera' | 'leaderboard'>('home');

  const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className="absolute"
    >
      {children}
    </motion.div>
  );

  if (currentView === 'quiz') {
    return <Quiz onComplete={() => setCurrentView('dashboard')} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'camera') {
    return <CameraCapture onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'leaderboard') {
    return <Leaderboard onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingElement delay={0}>
        <div className="top-20 left-10">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-60 blur-sm"></div>
        </div>
      </FloatingElement>
      
      <FloatingElement delay={1}>
        <div className="top-40 right-20">
          <Sparkles className="w-8 h-8 text-pink-300 opacity-70" />
        </div>
      </FloatingElement>
      
      <FloatingElement delay={2}>
        <div className="top-60 left-1/4">
          <div className="w-6 h-6 bg-gradient-to-br from-peach-200 to-pink-200 rounded-full opacity-50"></div>
        </div>
      </FloatingElement>

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent"
        >
          Dermora ✨
        </motion.div>
        
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('leaderboard')}
            className="text-pink-600 hover:bg-pink-100 rounded-full px-6"
          >
            <Star className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCurrentView('camera')}
            className="text-pink-600 hover:bg-pink-100 rounded-full px-6"
          >
            <Camera className="w-4 h-4 mr-2" />
            Skin Scan
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-12 pb-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
              Your Perfect
            </span>
            <br />
            <span className="text-gray-800">Skincare Journey</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
          >
            Discover your personalized routine, track your progress, and 
            <br className="hidden md:block" />
            glow with confidence every single day ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              onClick={() => setCurrentView('quiz')}
              className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Your Personalized Routine
            </Button>
            
            <Button
              onClick={() => setCurrentView('dashboard')}
              variant="outline"
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Skin Analysis</h3>
              <p className="text-gray-600">
                Snap a photo and get personalized insights about your skin type and concerns
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Tracking</h3>
              <p className="text-gray-600">
                Build consistent habits with gentle reminders and satisfying progress tracking
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Goals</h3>
              <p className="text-gray-600">
                Join others on their skincare journey and celebrate wins together
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
