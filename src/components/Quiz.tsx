import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sun, Cloud, Snowflake, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuizProps {
  onComplete: () => void;
  onBack: () => void;
}

interface QuizData {
  skinType: string;
  concerns: string[];
  weather: string;
  lifestyle: string;
}

export const Quiz = ({ onComplete, onBack }: QuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    skinType: '',
    concerns: [],
    weather: '',
    lifestyle: ''
  });

  const questions = [
    {
      id: 'skinType',
      title: 'What\'s your skin type?',
      subtitle: 'Choose the one that sounds most like you',
      options: [
        { value: 'oily', label: 'Oily', description: 'Shiny T-zone, visible pores' },
        { value: 'dry', label: 'Dry', description: 'Tight, flaky, sometimes rough' },
        { value: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
        { value: 'sensitive', label: 'Sensitive', description: 'Easily irritated, reactive' }
      ]
    },
    {
      id: 'concerns',
      title: 'What are your main skin concerns?',
      subtitle: 'Select all that apply - we\'ll prioritize them for you',
      multiple: true,
      options: [
        { value: 'acne', label: 'Acne & Breakouts', description: '🫧' },
        { value: 'aging', label: 'Fine Lines & Aging', description: '✨' },
        { value: 'pigmentation', label: 'Dark Spots', description: '🌟' },
        { value: 'dullness', label: 'Dull Skin', description: '💫' },
        { value: 'pores', label: 'Large Pores', description: '🌸' }
      ]
    },
    {
      id: 'weather',
      title: 'What\'s your climate like?',
      subtitle: 'Your environment affects your skin needs',
      options: [
        { value: 'hot-humid', label: 'Hot & Humid', description: 'Tropical, sticky weather', icon: Sun },
        { value: 'hot-dry', label: 'Hot & Dry', description: 'Desert-like conditions', icon: Sun },
        { value: 'mild', label: 'Mild & Temperate', description: 'Moderate seasons', icon: Cloud },
        { value: 'cold-dry', label: 'Cold & Dry', description: 'Winter-like conditions', icon: Snowflake }
      ]
    },
    {
      id: 'lifestyle',
      title: 'How\'s your daily routine?',
      subtitle: 'We\'ll match your skincare to your lifestyle',
      options: [
        { value: 'minimal', label: 'Keep It Simple', description: '2-3 products max' },
        { value: 'moderate', label: 'Balanced Routine', description: '4-6 products is perfect' },
        { value: 'extensive', label: 'Full Ritual', description: 'I love a complete routine' }
      ]
    }
  ];

  const saveQuizData = async (quizData: QuizData) => {
  const { data, error } = await supabase.from('quiz_results').insert([
    {
      skin_type: quizData.skinType,
      concerns: quizData.concerns,
      weather: quizData.weather,
      lifestyle: quizData.lifestyle,
    },
  ]);

  if (error) {
    console.error("Failed to save quiz:", error);
  } else {
    console.log("Quiz saved!", data);
  }
};

  const handleAnswer = (questionId: string, value: string) => {
    if (questions[currentStep].multiple) {
      const currentValues = quizData.concerns || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setQuizData(prev => ({ ...prev, [questionId]: newValues }));
    } else {
      setQuizData(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const canProceed = () => {
    const current = questions[currentStep];
    if (current.multiple) {
      return quizData.concerns.length > 0;
    }
    return quizData[current.id as keyof QuizData] !== '';
  };

  const nextStep = async () => {
  if (currentStep < questions.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    // Save quiz results to Supabase and complete
    await saveQuizData(quizData);
    onComplete();
  }
};

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            className="text-pink-600 hover:bg-pink-100 rounded-full p-3"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              {currentStep + 1} of {questions.length}
            </div>
            <div className="w-32 h-2 bg-pink-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          <div className="w-11" /> {/* Spacer */}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {currentQuestion.title}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-lg text-gray-600">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-12">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.multiple
                  ? quizData.concerns.includes(option.value)
                  : quizData[currentQuestion.id as keyof QuizData] === option.value;

                return (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300 shadow-lg'
                          : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-pink-200'
                      }`}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            {option.icon && <option.icon className="w-6 h-6 text-pink-500" />}
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">
                                {option.label}
                              </h3>
                              <p className="text-gray-600 mt-1">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                          isSelected
                            ? 'bg-pink-500 border-pink-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full mx-auto mt-1"
                            />
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`px-8 py-4 text-lg rounded-full transition-all duration-300 ${
              canProceed()
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === questions.length - 1 ? (
              'Create My Routine ✨'
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            {currentStep === 0 && "Let's start with the basics! 💕"}
            {currentStep === 1 && "Almost there, gorgeous! 🌟"}
            {currentStep === 2 && "You're doing amazing! ✨"}
            {currentStep === 3 && "Final step - you've got this! 🎉"}
          </p>
        </div>
      </div>
    </div>
  );
};