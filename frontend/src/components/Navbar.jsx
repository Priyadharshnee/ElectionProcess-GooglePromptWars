import { Link, useLocation } from 'react-router-dom';
import { Vote, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { path: '/', label: t('nav_dashboard') },
    { path: '/journey', label: t('nav_journey') },
    { path: '/simulator', label: t('nav_simulator') },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary-600">
            <Vote className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">{t('app_title')}</span>
          </Link>
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 flex items-center h-full ${
                  location.pathname === link.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-full"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{i18n.language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
