import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, Calendar, UserCheck } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [hasVoterId, setHasVoterId] = useState(false);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEligibility = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Connect to Flask backend
      const res = await axios.post('http://localhost:5000/api/eligibility', {
        age: parseInt(age),
        has_voter_id: hasVoterId
      });
      setEligibility(res.data);
    } catch (error) {
      console.error('Error checking eligibility:', error);
      // Fallback or error state
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-50 border-green-200';
      case 'needs_registration': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'not_eligible': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'needs_registration': return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'not_eligible': return <XCircle className="w-8 h-8 text-red-500" />;
      default: return <UserCheck className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('welcome_title')}</h1>
        <p className="text-lg text-gray-600">{t('welcome_subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Input Form & Timeline */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center"><UserCheck className="mr-2 text-primary-500" /> {t('check_eligibility')}</h2>
            <form onSubmit={checkEligibility} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('your_age')}</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                  placeholder={t('placeholder_age')}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="voterId"
                  checked={hasVoterId}
                  onChange={(e) => setHasVoterId(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="voterId" className="ml-2 block text-sm text-gray-700">
                  {t('already_have_voter_id')}
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex justify-center items-center"
              >
                {loading ? t('checking_btn') : t('check_status_btn')}
              </button>
            </form>
          </motion.div>

          {/* Timeline Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center"><Calendar className="mr-2 text-accent-500" /> {t('election_timeline')}</h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-primary-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-gray-100 bg-white shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-gray-900 text-sm">Voter Registration</div>
                          <time className="text-xs font-medium text-primary-600">Active Now</time>
                      </div>
                      <div className="text-xs text-gray-500">Register before the deadline to ensure your name is on the rolls.</div>
                  </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-gray-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-gray-100 bg-gray-50 shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-gray-500 text-sm">Election Day</div>
                          <time className="text-xs font-medium text-gray-500">TBA</time>
                      </div>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Status & Progress */}
        <div className="md:col-span-2 space-y-8">
          {eligibility ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-2xl shadow-sm border ${getStatusColor(eligibility.status)}`}
            >
              <div className="flex items-start space-x-4">
                {getStatusIcon(eligibility.status)}
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {eligibility.status === 'ready' ? t('status_eligible') : 
                     eligibility.status === 'needs_registration' ? t('status_almost') : 
                     t('status_not_yet')}
                  </h2>
                  <p className="text-lg opacity-90 mb-6">{eligibility.message}</p>
                  
                  <div className="bg-white/60 p-4 rounded-xl border border-white/40">
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 opacity-80">{t('suggested_next_action')}</h3>
                    <p className="font-medium flex items-center">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      {eligibility.next_step}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-gray-100 border-dashed">
              <p className="text-gray-400 text-lg flex items-center">
                <AlertCircle className="mr-2" /> {t('enter_details_prompt')}
              </p>
            </div>
          )}

          {/* Progress Tracker Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Journey</h2>
                <p className="text-gray-500">Track your progress to becoming a voter</p>
              </div>
              <span className="text-3xl font-extrabold text-primary-500">20%</span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: '20%' }}></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-primary-50 rounded-xl border border-primary-100">
                <div className="font-bold text-primary-700">Step 1</div>
                <div className="text-sm text-primary-600">Eligibility</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                <div className="font-bold text-gray-600">Step 2</div>
                <div className="text-sm text-gray-500">Register</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                <div className="font-bold text-gray-600">Step 3</div>
                <div className="text-sm text-gray-500">Learn</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                <div className="font-bold text-gray-600">Step 4</div>
                <div className="text-sm text-gray-500">Mock Vote</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link to="/journey" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200">
                Continue Journey <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
