import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Simple translations bundle
const resources = {
  en: {
    translation: {
      "app_title": "My First Vote",
      "nav_dashboard": "Dashboard",
      "nav_journey": "My Journey",
      "nav_simulator": "Mock Voting",
      "welcome_title": "Welcome to Your Voting Journey",
      "welcome_subtitle": "Empowering your voice. Let's get you ready for the upcoming elections.",
      "check_eligibility": "Check Eligibility",
      "your_age": "Your Age",
      "placeholder_age": "e.g., 18",
      "already_have_voter_id": "I already have a Voter ID",
      "check_status_btn": "Check Status",
      "checking_btn": "Checking...",
      "election_timeline": "Election Timeline",
      "status_eligible": "You are Eligible!",
      "status_almost": "Almost There!",
      "status_not_yet": "Not Yet Eligible",
      "suggested_next_action": "Suggested Next Action",
      "enter_details_prompt": "Enter your details to check status"
    }
  },
  ta: {
    translation: {
      "app_title": "என் முதல் வாக்கு",
      "nav_dashboard": "முகப்பு",
      "nav_journey": "என் பயணம்",
      "nav_simulator": "மாதிரி வாக்குப்பதிவு",
      "welcome_title": "உங்கள் வாக்கு பயணத்திற்கு வரவேற்கிறோம்",
      "welcome_subtitle": "உங்கள் குரலுக்கு அதிகாரம். வரவிருக்கும் தேர்தல்களுக்கு உங்களை தயார்படுத்துவோம்.",
      "check_eligibility": "தகுதியை சரிபார்க்கவும்",
      "your_age": "உங்கள் வயது",
      "placeholder_age": "உதாரணமாக, 18",
      "already_have_voter_id": "என்னிடம் ஏற்கனவே வாக்காளர் அடையாள அட்டை உள்ளது",
      "check_status_btn": "நிலையை சரிபார்க்கவும்",
      "checking_btn": "சரிபார்க்கிறது...",
      "election_timeline": "தேர்தல் காலவரிசை",
      "status_eligible": "நீங்கள் தகுதியானவர்!",
      "status_almost": "கிட்டத்தட்ட முடிந்தது!",
      "status_not_yet": "இன்னும் தகுதி பெறவில்லை",
      "suggested_next_action": "பரிந்துரைக்கப்பட்ட அடுத்த செயல்",
      "enter_details_prompt": "நிலையைச் சரிபார்க்க உங்கள் விவரங்களை உள்ளிடவும்"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
