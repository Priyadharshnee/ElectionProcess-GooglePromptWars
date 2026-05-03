import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const candidates = [
  { id: '1', name: 'Arun Kumar', party: 'Progressive Party', symbol: '🌞', color: 'bg-yellow-100 text-yellow-600' },
  { id: '2', name: 'Meera Reddy', party: 'United Front', symbol: '🌳', color: 'bg-green-100 text-green-600' },
  { id: '3', name: 'Vikram Singh', party: 'Liberty Alliance', symbol: '⚖️', color: 'bg-blue-100 text-blue-600' },
  { id: 'NOTA', name: 'None of the Above', party: 'NOTA', symbol: '❌', color: 'bg-gray-100 text-gray-600' },
];

const Simulator = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setIsConfirming(true);
  };

  const handleConfirm = () => {
    setIsConfirming(false);
    setHasVoted(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setSelectedCandidate(null);
  };

  const resetSimulator = () => {
    setHasVoted(false);
    setSelectedCandidate(null);
  };

  if (hasVoted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border-4 border-white"
        >
          <CheckCircle2 className="w-16 h-16" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Vote Successfully Cast!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8"
        >
          Thank you for participating in the mock simulation.
          <br/>In a real election, your vote is secret and secured.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="space-x-4"
        >
          <button onClick={resetSimulator} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
            Try Again
          </button>
          <Link to="/journey" className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md transition-colors">
            Back to Journey
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex justify-center items-center">
          <ShieldCheck className="mr-3 w-8 h-8 text-primary-500" /> Electronic Voting Machine
        </h1>
        <p className="text-gray-500">Mock Simulator - Press the blue button next to your chosen candidate.</p>
      </div>

      <div className="bg-gray-200 p-4 md:p-8 rounded-3xl shadow-2xl border-4 border-gray-300 relative">
        <div className="bg-white rounded-xl shadow-inner border border-gray-100 overflow-hidden">
          {/* EVM Header */}
          <div className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center text-sm font-bold uppercase tracking-widest">
            <span>Ballot Unit</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div> Ready</span>
          </div>

          {/* Candidate List */}
          <div className="divide-y divide-gray-200">
            {candidates.map((candidate, index) => (
              <div key={candidate.id} className="flex items-center p-4 md:p-6 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center font-bold text-xl text-gray-400 border-r border-gray-200 pr-4 mr-4">
                  {index + 1}
                </div>
                
                <div className="flex-grow flex items-center">
                  <div className={`w-16 h-16 flex items-center justify-center text-3xl rounded-xl mr-6 ${candidate.color}`}>
                    {candidate.symbol}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm font-medium text-gray-500">{candidate.party}</p>
                  </div>
                </div>

                <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
                  {/* The Blue Button */}
                  <button
                    onClick={() => handleSelect(candidate)}
                    className="w-16 h-12 bg-blue-600 hover:bg-blue-500 active:bg-blue-800 active:scale-95 rounded-lg shadow-[0_4px_0_rgb(30,64,175)] hover:shadow-[0_2px_0_rgb(30,64,175)] hover:translate-y-[2px] transition-all flex items-center justify-center"
                    aria-label={`Vote for ${candidate.name}`}
                  >
                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                  </button>
                  {/* Red Light Indicator (Simulated) */}
                  <div className={`w-4 h-4 rounded-full ml-6 border border-gray-300 shadow-inner ${selectedCandidate?.id === candidate.id ? 'bg-red-500 shadow-[0_0_10px_rgb(239,68,68)]' : 'bg-gray-200'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {isConfirming && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex items-center justify-center p-4 z-50"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Vote</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to vote for <strong className="text-gray-900">{selectedCandidate?.name}</strong>?</p>
                <div className="flex space-x-3">
                  <button onClick={handleCancel} className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleConfirm} className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95">
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Simulator;
