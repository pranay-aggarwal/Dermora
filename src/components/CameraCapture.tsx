
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { 
  ChevronLeft, 
  Camera, 
  RotateCcw, 
  Download,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Eye,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CameraCaptureProps {
  onBack: () => void;
}

export const CameraCapture = ({ onBack }: CameraCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      // Simulate analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setAnalysis({
          problemType: "Acne",
          concerns: ["Pimples", "Redness"],
          hydrationLevel: 75,
          recommendations: [
            "Use a gentle exfoliant 2-3 times per week",
            "Apply a hydrating serum daily",
            
          ]
        });
        setIsAnalyzing(false);
      }, 3000);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
    setAnalysis(null);
    setIsAnalyzing(false);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
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
            <h1 className="text-2xl font-bold text-gray-800">AI Skin Analysis</h1>
            <p className="text-gray-600">Discover your skin's unique needs ✨</p>
          </div>
          
          <div className="w-11" />
        </div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-800 mb-1">Privacy First</h3>
                <p className="text-sm text-blue-700">
                  Your photos are processed locally and never stored on our servers. 
                  Only you have access to your skin analysis results.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Camera Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Take a Clear Photo of Your Face
              </h2>
              <p className="text-gray-600">
                Make sure you're in good lighting and facing the camera directly
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square max-w-md mx-auto">
              {imgSrc ? (
                <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
              ) : (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: facingMode
                  }}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Camera overlay guide */}
              {!imgSrc && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-80 border-2 border-white border-dashed rounded-full opacity-30"></div>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex justify-center gap-4 mt-6">
              {!imgSrc ? (
                <>
                  <Button
                    variant="outline"
                    onClick={toggleCamera}
                    className="rounded-full p-3"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={capture}
                    className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full px-8 py-3"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Capture Photo
                  </Button>
                </>
              ) : (
                <Button
                  onClick={retake}
                  variant="outline"
                  className="rounded-full px-6 py-3"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake Photo
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Analysis Section */}
        {(imgSrc && isAnalyzing) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="p-8 bg-white/70 backdrop-blur-sm text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Sparkles className="w-16 h-16 text-pink-500" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Analyzing Your Skin...
              </h3>
              <p className="text-gray-600">
                Our AI is examining your photo to provide personalized insights
              </p>
            </Card>
          </motion.div>
        )}

        {/* Results Section */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            {/* Success Message */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-semibold text-green-800">Analysis Complete!</h3>
                  <p className="text-green-700">Here are your personalized skin insights</p>
                </div>
              </div>
            </Card>

            {/* Skin Type */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-pink-500" />
                Your Skin Profile
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Problem Type</p>
                  <p className="text-xl font-semibold text-pink-600">{analysis.problemType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hydration Level</p>
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-semibold text-blue-600">{analysis.hydrationLevel}%</p>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${analysis.hydrationLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Areas of Focus</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.concerns.map((concern: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Personalized Recommendations
              </h3>
              
              <div className="space-y-3">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-pink-700 text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Button */}
            <div className="text-center">
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Update My Routine ✨
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
