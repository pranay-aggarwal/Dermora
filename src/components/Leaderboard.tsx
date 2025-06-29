
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Crown, Star, Award, Trophy, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface LeaderboardProps {
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  consistency: number;
  rank: number;
}

export const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'all'>('week');
  
  const users: User[] = [
    { id: '1', name: 'SkinQueen23', avatar: '👑', streak: 28, consistency: 96, rank: 1 },
    { id: '2', name: 'GlowGetter', avatar: '✨', streak: 21, consistency: 94, rank: 2 },
    { id: '3', name: 'RoutiineRebel', avatar: '🌟', streak: 19, consistency: 92, rank: 3 },
    { id: '4', name: 'SkincareStar', avatar: '💫', streak: 15, consistency: 89, rank: 4 },
    { id: '5', name: 'You', avatar: '💕', streak: 12, consistency: 87, rank: 5 },
    { id: '6', name: 'RadiantRose', avatar: '🌹', streak: 11, consistency: 85, rank: 6 },
    { id: '7', name: 'GlowUpGuru', avatar: '🔥', streak: 9, consistency: 82, rank: 7 },
    { id: '8', name: 'SkinSuccess', avatar: '🏆', streak: 8, consistency: 80, rank: 8 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isUser: boolean = false) => {
    if (isUser) return 'bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300';
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300';
      default:
        return 'bg-white/70 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-800">Glow Leaderboard</h1>
            <p className="text-gray-600">Celebrating consistency champions! 🏆</p>
          </div>
          
          <div className="w-11" />
        </div>

        {/* Time Frame Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-full p-1 border border-pink-200">
              {(['week', 'month', 'all'] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeFrame === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeFrame(period)}
                  className={`rounded-full px-6 ${
                    timeFrame === period
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  {period === 'week' && 'This Week'}
                  {period === 'month' && 'This Month'}
                  {period === 'all' && 'All Time'}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Card className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 relative">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-3xl mb-2">{users[1].avatar}</div>
                  <p className="font-semibold text-sm text-gray-800">{users[1].name}</p>
                  <p className="text-xs text-gray-600">{users[1].streak} day streak</p>
                </motion.div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Award className="w-6 h-6 text-gray-400" />
                </div>
              </Card>
              <div className="w-20 h-16 bg-gradient-to-t from-gray-300 to-gray-200 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-600 font-bold">2</span>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Card className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300 relative">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-4xl mb-2">{users[0].avatar}</div>
                  <p className="font-bold text-sm text-gray-800">{users[0].name}</p>
                  <p className="text-xs text-gray-600">{users[0].streak} day streak</p>
                </motion.div>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Crown className="w-8 h-8 text-yellow-500" />
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1 right-1"
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </motion.div>
              </Card>
              <div className="w-20 h-20 bg-gradient-to-t from-yellow-400 to-yellow-300 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="text-yellow-800 font-bold text-lg">1</span>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Card className="p-4 bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 relative">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-3xl mb-2">{users[2].avatar}</div>
                  <p className="font-semibold text-sm text-gray-800">{users[2].name}</p>
                  <p className="text-xs text-gray-600">{users[2].streak} day streak</p>
                </motion.div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
              </Card>
              <div className="w-20 h-12 bg-gradient-to-t from-amber-400 to-amber-300 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="text-amber-800 font-bold">3</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-pink-500" />
              Full Rankings
            </h3>
            
            <div className="space-y-3">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${getRankBg(user.rank, user.name === 'You')}`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <p className={`font-semibold ${user.name === 'You' ? 'text-pink-700' : 'text-gray-800'}`}>
                        {user.name}
                        {user.name === 'You' && ' 💕'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.streak} day streak
                      </p>
                    </div>
                  </div>

                  {/* Consistency Score */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{user.consistency}%</p>
                    <p className="text-xs text-gray-600">consistency</p>
                  </div>

                  {/* Sparkle for top performers */}
                  {user.rank <= 3 && (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-pink-400" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 text-center">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Keep Glowing!
            </h3>
            <p className="text-gray-700">
              You're doing amazing at #5! Every day of consistency brings you closer to that healthy glow. 
              Keep up the fantastic work! ✨
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
