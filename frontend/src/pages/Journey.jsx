import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, FileText, BookOpen, Vote, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Eligibility', icon: <Check className="w-6 h-6" />, desc: 'Check if you can vote' },
  { id: 2, title: 'Register', icon: <FileText className="w-6 h-6" />, desc: 'Get your Voter ID' },
  { id: 3, title: 'Learn', icon: <BookOpen className="w-6 h-6" />, desc: 'Understand the process' },
  { id: 4, title: 'Mock Vote', icon: <Vote className="w-6 h-6" />, desc: 'Practice voting' },
  { id: 5, title: 'Completed', icon: <Award className="w-6 h-6" />, desc: 'Ready for Election Day!' },
];

const Journey = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Your Voting Journey</h1>
        <p className="text-lg text-gray-600">Follow these steps to become a prepared and confident voter.</p>
      </div>

      {/* Progress Bar & Steps Tracker */}
      <div className="mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  disabled={step.id > currentStep + 1}
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                    isCompleted ? 'bg-primary-500 text-white shadow-md' :
                    isCurrent ? 'bg-white border-4 border-primary-500 text-primary-600 shadow-lg scale-110' :
                    'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {step.icon}
                </button>
                <div className="mt-3 text-center hidden md:block">
                  <div className={`text-sm font-bold ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 h-full flex flex-col justify-center items-center text-center"
          >
            {currentStep === 1 && (
              <div className="space-y-6 max-w-lg">
                <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Are you eligible?</h2>
                <p className="text-gray-600 text-lg">You must be an Indian citizen and 18 years or older on the qualifying date to be eligible to vote.</p>
                <div className="pt-4">
                  <Link to="/" className="text-primary-600 font-semibold hover:underline">Go to Dashboard to check status &rarr;</Link>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 max-w-lg">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Get Registered</h2>
                <p className="text-gray-600 text-lg">Apply online via the Voter Service Portal using Form 6. You'll need proof of age and address.</p>
                <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Visit Official Portal
                </a>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 max-w-lg">
                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Know the Process</h2>
                <p className="text-gray-600 text-lg">On election day, you'll visit the booth, show ID, sign the register, and press the button on the EVM.</p>
                <p className="text-sm text-gray-500 italic">Tip: Ask the AI Assistant in the bottom right if you have questions!</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 max-w-lg">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Vote className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Practice Makes Perfect</h2>
                <p className="text-gray-600 text-lg">Try our interactive Electronic Voting Machine (EVM) simulator to see exactly how it feels to cast your vote.</p>
                <Link to="/simulator" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Launch Simulator
                </Link>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6 max-w-lg">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-primary-500">You're Ready!</h2>
                <p className="text-gray-600 text-lg">You have completed the journey. You are now informed, prepared, and ready to make your voice heard on Election Day.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`font-medium py-2 px-4 rounded-lg transition-colors ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            Back
          </button>
          
          <div className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            {progress}% Completed
          </div>

          <button 
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className={`flex items-center font-medium py-2 px-6 rounded-lg transition-colors ${currentStep === steps.length ? 'text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'}`}
          >
            Next Step <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Journey;
