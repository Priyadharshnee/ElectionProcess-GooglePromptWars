import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Journey from './pages/Journey';
import Simulator from './pages/Simulator';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/simulator" element={<Simulator />} />
          </Routes>
          <AIAssistant />
        </main>
      </div>
    </Router>
  );
}

export default App;
