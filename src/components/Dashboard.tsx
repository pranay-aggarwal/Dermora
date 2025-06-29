
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Check, 
  Heart, 
  Droplets, 
  Sun, 
  Moon, 
  Calendar,
  TrendingUp,
  Award,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  onBack: () => void;
}

interface RoutineItem {
  id: string;
  name: string;
  time: 'morning' | 'evening';
  completed: boolean;
  icon: React.ReactNode;
}

export const Dashboard = ({ onBack }: DashboardProps) => {
  const [routine, setRoutine] = useState<RoutineItem[]>([
    { id: '1', name: 'Gentle Cleanser', time: 'morning', completed: false, icon: <Droplets className="w-5 h-5" /> },
    { id: '2', name: 'Vitamin C Serum', time: 'morning', completed: false, icon: <Sun className="w-5 h-5" /> },
    { id: '3', name: 'Moisturizer', time: 'morning', completed: false, icon: <Heart className="w-5 h-5" /> },
    { id: '4', name: 'SPF 30+', time: 'morning', completed: false, icon: <Sun className="w-5 h-5" /> },
    { id: '5', name: 'Cleansing Oil', time: 'evening', completed: false, icon: <Droplets className="w-5 h-5" /> },
    { id: '6', name: 'Gentle Cleanser', time: 'evening', completed: false, icon: <Droplets className="w-5 h-5" /> },
    { id: '7', name: 'Retinol Serum', time: 'evening', completed: false, icon: <Moon className="w-5 h-5" /> },
    { id: '8', name: 'Night Moisturizer', time: 'evening', completed: false, icon: <Heart className="w-5 h-5" /> },
  ]);

  const [streak, setStreak] = useState(7);
  const [weeklyProgress] = useState([65, 80, 95, 70, 85, 90, 100]);

  const toggleRoutineItem = (id: string) => {
    setRoutine(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const morningRoutine = routine.filter(item => item.time === 'morning');
  const eveningRoutine = routine.filter(item => item.time === 'evening');
  
  const morningProgress = (morningRoutine.filter(item => item.completed).length / morningRoutine.length) * 100;
  const eveningProgress = (eveningRoutine.filter(item => item.completed).length / eveningRoutine.length) * 100;
  const totalProgress = (routine.filter(item => item.completed).length / routine.length) * 100;

  const tips = [
    {
      title: "Consistency is Key! 🗝️",
      content: "Apply products to slightly damp skin for better absorption and hydration."
    },
    {
      title: "Morning Glow ✨",
      content: "Always finish your morning routine with SPF, even on cloudy days!"
    },
    {
      title: "Evening Ritual 🌙",
      content: "Use retinol products at night only, and always follow with moisturizer."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-pink-600 hover:bg-pink-100 rounded-full p-3"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Your Glow Dashboard</h1>
            <p className="text-gray-600">Keep up the amazing work! ✨</p>
          </div>
          
          <div className="w-11" />
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-pink-100 to-pink-200 border-pink-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-600 font-medium mb-1">Current Streak</p>
                  <p className="text-3xl font-bold text-pink-700">{streak}</p>
                  <p className="text-sm text-pink-600">days strong! 🔥</p>
                </div>
                <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-pink-700" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium mb-1">Today's Progress</p>
                  <p className="text-3xl font-bold text-purple-700">{Math.round(totalProgress)}%</p>
                  <p className="text-sm text-purple-600">almost there! 💪</p>
                </div>
                <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-700" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-orange-100 to-pink-100 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium mb-1">Weekly Average</p>
                  <p className="text-3xl font-bold text-orange-700">82%</p>
                  <p className="text-sm text-orange-600">consistency ⭐</p>
                </div>
                <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-500" />
              Weekly Progress
            </h3>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyProgress.map((progress, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    className="bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-lg w-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Routine Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Morning Routine */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-500" />
                  Morning Routine
                </h3>
                <span className="text-sm text-orange-600 font-medium">
                  {Math.round(morningProgress)}% complete
                </span>
              </div>
              
              <Progress value={morningProgress} className="mb-4 h-2" />
              
              <div className="space-y-3">
                {morningRoutine.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.completed
                        ? 'bg-green-100 border-green-200'
                        : 'bg-white/70 hover:bg-white/90'
                    }`}
                    onClick={() => toggleRoutineItem(item.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      item.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-pink-200 hover:text-pink-600'
                    }`}>
                      {item.completed ? <Check className="w-4 h-4" /> : item.icon}
                    </div>
                    <span className={`flex-1 transition-all duration-300 ${
                      item.completed ? 'text-green-700 line-through' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                    {item.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Sparkles className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Evening Routine */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-purple-500" />
                  Evening Routine
                </h3>
                <span className="text-sm text-purple-600 font-medium">
                  {Math.round(eveningProgress)}% complete
                </span>
              </div>
              
              <Progress value={eveningProgress} className="mb-4 h-2" />
              
              <div className="space-y-3">
                {eveningRoutine.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.completed
                        ? 'bg-green-100 border-green-200'
                        : 'bg-white/70 hover:bg-white/90'
                    }`}
                    onClick={() => toggleRoutineItem(item.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      item.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-pink-200 hover:text-pink-600'
                    }`}>
                      {item.completed ? <Check className="w-4 h-4" /> : item.icon}
                    </div>
                    <span className={`flex-1 transition-all duration-300 ${
                      item.completed ? 'text-green-700 line-through' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                    {item.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Sparkles className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              Daily Skincare Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                  <h4 className="font-medium text-gray-800 mb-2">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
