export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    marketplace: string;
    wallet: string;
    helpCenter: string;
    pricing: string;
    howItWorks: string;
    login: string;
    getStarted: string;
  };
  
  // Dashboard
  dashboard: {
    title: string;
    myCredits: string;
    activeProjects: string;
    earnings: string;
    impactTitle: string;
    notificationsTitle: string;
    quickActionsTitle: string;
    exportCSR: string;
  };
  
  // Marketplace
  marketplace: {
    title: string;
    subtitle: string;
    search: string;
    sortBy: string;
    projectType: string;
    verifier: string;
    location: string;
    vintage: string;
    priceRange: string;
    verified: string;
    pending: string;
    retired: string;
    buyCredits: string;
  };
  
  // Wallet
  wallet: {
    title: string;
    balance: string;
    credits: string;
    transactions: string;
    topUp: string;
    withdraw: string;
    retire: string;
    downloadCertificate: string;
  };
  
  // Forms
  forms: {
    required: string;
    invalidEmail: string;
    minLength: string;
    maxLength: string;
    submit: string;
    cancel: string;
    save: string;
  };
  
  // Errors
  errors: {
    generic: string;
    network: string;
    notFound: string;
    unauthorized: string;
    validation: string;
  };
  
  // Success messages
  success: {
    saved: string;
    submitted: string;
    purchased: string;
    retired: string;
  };
  
  // Accessibility
  a11y: {
    skipToMain: string;
    closeDialog: string;
    openMenu: string;
    loading: string;
    sortAscending: string;
    sortDescending: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      marketplace: "Marketplace",
      wallet: "Wallet",
      helpCenter: "Help Center",
      pricing: "Pricing",
      howItWorks: "How It Works",
      login: "Login",
      getStarted: "Get Started",
    },
    dashboard: {
      title: "Dashboard",
      myCredits: "My Credits",
      activeProjects: "Active Projects",
      earnings: "Earnings",
      impactTitle: "Environmental Impact",
      notificationsTitle: "Notifications",
      quickActionsTitle: "Quick Actions",
      exportCSR: "Export CSR Report",
    },
    marketplace: {
      title: "Carbon Credit Marketplace",
      subtitle: "Browse and purchase verified carbon credits from sustainable projects across India",
      search: "Search by project name or location...",
      sortBy: "Sort by",
      projectType: "Project Type",
      verifier: "Verifier",
      location: "Location",
      vintage: "Vintage",
      priceRange: "Price Range per Credit",
      verified: "Verified",
      pending: "Pending",
      retired: "Retired",
      buyCredits: "Buy Credits",
    },
    wallet: {
      title: "Wallet",
      balance: "Balance",
      credits: "Credits",
      transactions: "Transactions",
      topUp: "Top Up",
      withdraw: "Withdraw",
      retire: "Retire Credits",
      downloadCertificate: "Download Certificate",
    },
    forms: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      minLength: "Must be at least {min} characters",
      maxLength: "Must be no more than {max} characters",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
    },
    errors: {
      generic: "Something went wrong. Please try again.",
      network: "Network error. Please check your connection.",
      notFound: "The requested resource was not found.",
      unauthorized: "You are not authorized to perform this action.",
      validation: "Please check your input and try again.",
    },
    success: {
      saved: "Successfully saved!",
      submitted: "Successfully submitted!",
      purchased: "Purchase completed successfully!",
      retired: "Credits retired successfully!",
    },
    a11y: {
      skipToMain: "Skip to main content",
      closeDialog: "Close dialog",
      openMenu: "Open menu",
      loading: "Loading content",
      sortAscending: "Sort ascending",
      sortDescending: "Sort descending",
    },
  },
  hi: {
    nav: {
      home: "होम",
      marketplace: "बाज़ार",
      wallet: "वॉलेट",
      helpCenter: "सहायता केंद्र",
      pricing: "मूल्य निर्धारण",
      howItWorks: "यह कैसे काम करता है",
      login: "लॉगिन",
      getStarted: "शुरू करें",
    },
    dashboard: {
      title: "डैशबोर्ड",
      myCredits: "मेरे क्रेडिट",
      activeProjects: "सक्रिय परियोजनाएं",
      earnings: "कमाई",
      impactTitle: "पर्यावरणीय प्रभाव",
      notificationsTitle: "सूचनाएं",
      quickActionsTitle: "त्वरित कार्रवाई",
      exportCSR: "सीएसआर रिपोर्ट निर्यात करें",
    },
    marketplace: {
      title: "कार्बन क्रेडिट बाज़ार",
      subtitle: "भारत भर में स्थायी परियोजनाओं से सत्यापित कार्बन क्रेडिट ब्राउज़ और खरीदें",
      search: "परियोजना नाम या स्थान से खोजें...",
      sortBy: "क्रमबद्ध करें",
      projectType: "परियोजना प्रकार",
      verifier: "सत्यापनकर्ता",
      location: "स्थान",
      vintage: "विंटेज",
      priceRange: "प्रति क्रेडिट मूल्य सीमा",
      verified: "सत्यापित",
      pending: "लंबित",
      retired: "सेवानिवृत्त",
      buyCredits: "क्रेडिट खरीदें",
    },
    wallet: {
      title: "वॉलेट",
      balance: "शेष राशि",
      credits: "क्रेडिट",
      transactions: "लेनदेन",
      topUp: "टॉप अप",
      withdraw: "निकासी",
      retire: "क्रेडिट रिटायर करें",
      downloadCertificate: "प्रमाणपत्र डाउनलोड करें",
    },
    forms: {
      required: "यह फ़ील्ड आवश्यक है",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
      minLength: "कम से कम {min} वर्ण होने चाहिए",
      maxLength: "{max} वर्णों से अधिक नहीं होना चाहिए",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "सहेजें",
    },
    errors: {
      generic: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।",
      network: "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।",
      notFound: "अनुरोधित संसाधन नहीं मिला।",
      unauthorized: "आपके पास यह कार्रवाई करने का अधिकार नहीं है।",
      validation: "कृपया अपना इनपुट जांचें और पुन: प्रयास करें।",
    },
    success: {
      saved: "सफलतापूर्वक सहेजा गया!",
      submitted: "सफलतापूर्वक सबमिट किया गया!",
      purchased: "खरीदारी सफलतापूर्वक पूर्ण हुई!",
      retired: "क्रेडिट सफलतापूर्वक रिटायर हुए!",
    },
    a11y: {
      skipToMain: "मुख्य सामग्री पर जाएं",
      closeDialog: "डायलॉग बंद करें",
      openMenu: "मेनू खोलें",
      loading: "सामग्री लोड हो रही है",
      sortAscending: "आरोही क्रम में क्रमबद्ध करें",
      sortDescending: "अवरोही क्रम में क्रमबद्ध करें",
    },
  },
};

export const useTranslation = (language: Language = 'en') => {
  const t = translations[language];
  
  return {
    t,
    language,
  };
};
