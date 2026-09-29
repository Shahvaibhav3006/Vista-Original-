export interface StateTheme {
  state: string;
  accent: string;
  accent2: string;
  localGreeting: string;
  englishGreeting: string;
  motif: string;
  emoji: string;
  pattern: string;
  tagline: string;
}

export const STATE_THEMES: Record<string, StateTheme> = {
  "Gujarat": {
    "state": "Gujarat",
    "accent": "#E68A00",
    "accent2": "#C4493B",
    "localGreeting": "ગુજરાતમાં આપનું સ્વાગત છે",
    "englishGreeting": "Welcome to Gujarat",
    "motif": "Bandhani & Patola weave",
    "emoji": "🦚",
    "pattern": "bandhani-dots",
    "tagline": "Land of the White Desert & Garba nights"
  },
  "Rajasthan": {
    "state": "Rajasthan",
    "accent": "#D94E67",
    "accent2": "#B8341E",
    "localGreeting": "राजस्थान में आपका स्वागत है",
    "englishGreeting": "Welcome to Rajasthan",
    "motif": "Jaali & Bandhej",
    "emoji": "🐪",
    "pattern": "jaali",
    "tagline": "Kingdom of forts, deserts & royal hues"
  },
  "Maharashtra": {
    "state": "Maharashtra",
    "accent": "#8B3A62",
    "accent2": "#D97706",
    "localGreeting": "महाराष्ट्रात आपले स्वागत आहे",
    "englishGreeting": "Welcome to Maharashtra",
    "motif": "Paithani & Warli",
    "emoji": "🦁",
    "pattern": "warli",
    "tagline": "Caves, coast & the city of dreams"
  },
  "Kerala": {
    "state": "Kerala",
    "accent": "#0D8A68",
    "accent2": "#D97706",
    "localGreeting": "കേരളത്തിലേക്ക് സ്വാഗതം",
    "englishGreeting": "Welcome to Kerala",
    "motif": "Kathakali & Backwaters",
    "emoji": "🛶",
    "pattern": "palm",
    "tagline": "God's Own Country, on the water"
  },
  "Punjab": {
    "state": "Punjab",
    "accent": "#D96B27",
    "accent2": "#1B7A3D",
    "localGreeting": "ਪੰਜਾਬ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    "englishGreeting": "Welcome to Punjab",
    "motif": "Phulkari & Bhangra",
    "emoji": "🌾",
    "pattern": "phulkari",
    "tagline": "Fields of gold & the langar spirit"
  },
  "West Bengal": {
    "state": "West Bengal",
    "accent": "#B23A2A",
    "accent2": "#D97706",
    "localGreeting": "পশ্চিমবঙ্গে স্বাগতম",
    "englishGreeting": "Welcome to West Bengal",
    "motif": "Kantha & Alpana",
    "emoji": "🐯",
    "pattern": "alpana",
    "tagline": "Of rosogolla, rivers & Durga"
  },
  "Tamil Nadu": {
    "state": "Tamil Nadu",
    "accent": "#B8341E",
    "accent2": "#D97706",
    "localGreeting": "தமிழ்நாட்டிற்கு வரவேற்கிறோம்",
    "englishGreeting": "Welcome to Tamil Nadu",
    "motif": "Kolam & Temple Gopuram",
    "emoji": "🛕",
    "pattern": "kolam",
    "tagline": "Temples, filter coffee & Bharatam"
  },
  "Karnataka": {
    "state": "Karnataka",
    "accent": "#C4493B",
    "accent2": "#1B7A3D",
    "localGreeting": "ಕರ್ನಾಟಕಕ್ಕೆ ಸ್ವಾಗತ",
    "englishGreeting": "Welcome to Karnataka",
    "motif": "Mysuru Silk & Channapatna",
    "emoji": "🐘",
    "pattern": "silk",
    "tagline": "Palaces, sandalwood & coffee hills"
  },
  "Uttar Pradesh": {
    "state": "Uttar Pradesh",
    "accent": "#B8341E",
    "accent2": "#D97706",
    "localGreeting": "उत्तर प्रदेश में आपका स्वागत है",
    "englishGreeting": "Welcome to Uttar Pradesh",
    "motif": "Chikankari & Ganga Aarti",
    "emoji": "🕌",
    "pattern": "chikan",
    "tagline": "Of the Taj, ghats & Awadh cuisine"
  },
  "Delhi": {
    "state": "Delhi",
    "accent": "#B8341E",
    "accent2": "#1B7A3D",
    "localGreeting": "दिल्ली में आपका स्वागत है",
    "englishGreeting": "Welcome to Delhi",
    "motif": "Mughal Arch & Jali",
    "emoji": "🏛️",
    "pattern": "jaali",
    "tagline": "Seven cities, one heartbeat"
  },
  "Goa": {
    "state": "Goa",
    "accent": "#0D8A68",
    "accent2": "#D97706",
    "localGreeting": "गोंयचे स्वागत आशे",
    "englishGreeting": "Welcome to Goa",
    "motif": "Azulejos & Palm",
    "emoji": "🌴",
    "pattern": "palm",
    "tagline": "Beaches, churches & sussegado"
  },
  "Himachal Pradesh": {
    "state": "Himachal Pradesh",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    "englishGreeting": "Welcome to Himachal Pradesh",
    "motif": "Pahari & Kullu Shawl",
    "emoji": "🏔️",
    "pattern": "pahari",
    "tagline": "Snow peaks, apples & prayer flags"
  },
  "Uttarakhand": {
    "state": "Uttarakhand",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "उत्तराखंड में आपका स्वागत है",
    "englishGreeting": "Welcome to Uttarakhand",
    "motif": "Aipan & Char Dham",
    "emoji": "⛰️",
    "pattern": "aipan",
    "tagline": "Land of the gods & the Ganges"
  },
  "Odisha": {
    "state": "Odisha",
    "accent": "#B8341E",
    "accent2": "#D97706",
    "localGreeting": "ଓଡ଼ିଶାରେ ସ୍ୱାଗତ",
    "englishGreeting": "Welcome to Odisha",
    "motif": "Pattachitra & Konark",
    "emoji": "🛞",
    "pattern": "pattachitra",
    "tagline": "Sun temple, sea & silver filigree"
  },
  "Assam": {
    "state": "Assam",
    "accent": "#C4493B",
    "accent2": "#1B7A3D",
    "localGreeting": "অসমলৈ স্বাগতম",
    "englishGreeting": "Welcome to Assam",
    "motif": "Gamcha & Muga Silk",
    "emoji": "🦏",
    "pattern": "gamcha",
    "tagline": "Tea gardens, rhino & Bihu"
  },
  "Madhya Pradesh": {
    "state": "Madhya Pradesh",
    "accent": "#C4493B",
    "accent2": "#D97706",
    "localGreeting": "मध्य प्रदेश में आपका स्वागत है",
    "englishGreeting": "Welcome to Madhya Pradesh",
    "motif": "Bagh Print & Gond",
    "emoji": "🐅",
    "pattern": "gond",
    "tagline": "Tigers, stupas & the heart of India"
  },
  "Telangana": {
    "state": "Telangana",
    "accent": "#B8341E",
    "accent2": "#D97706",
    "localGreeting": "తెలంగాణకు స్వాగతం",
    "englishGreeting": "Welcome to Telangana",
    "motif": "Ikat & Bidri",
    "emoji": "🍛",
    "pattern": "ikat",
    "tagline": "Biryani, Nizam heritage & Charminar"
  },
  "Andhra Pradesh": {
    "state": "Andhra Pradesh",
    "accent": "#B8341E",
    "accent2": "#D97706",
    "localGreeting": "ఆంధ్రప్రదేశ్‌కు స్వాగతం",
    "englishGreeting": "Welcome to Andhra Pradesh",
    "motif": "Kalamkari & Kuchipudi",
    "emoji": "🌶️",
    "pattern": "kalamkari",
    "tagline": "Spice coast & temple towns"
  },
  "Bihar": {
    "state": "Bihar",
    "accent": "#B8341E",
    "accent2": "#D97706",
    "localGreeting": "बिहार में आपका स्वागत है",
    "englishGreeting": "Welcome to Bihar",
    "motif": "Madhubani & Sujini",
    "emoji": "☸️",
    "pattern": "madhubani",
    "tagline": "Where Buddha taught & history began"
  },
  "Jharkhand": {
    "state": "Jharkhand",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "झारखंड में आपका स्वागत है",
    "englishGreeting": "Welcome to Jharkhand",
    "motif": "Sohrai & Paitkar",
    "emoji": "🌳",
    "pattern": "sohrai",
    "tagline": "Waterfalls, forests & tribal art"
  },
  "Chhattisgarh": {
    "state": "Chhattisgarh",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "छत्तीसगढ़ में आपका स्वागत है",
    "englishGreeting": "Welcome to Chhattisgarh",
    "motif": "Bastar Dhokra",
    "emoji": "🦬",
    "pattern": "dhokra",
    "tagline": "Falls, forests & bell-metal craft"
  },
  "Haryana": {
    "state": "Haryana",
    "accent": "#D96B27",
    "accent2": "#1B7A3D",
    "localGreeting": "हरियाणा में आपका स्वागत है",
    "englishGreeting": "Welcome to Haryana",
    "motif": "Phulkari & Kurta",
    "emoji": "🚜",
    "pattern": "phulkari",
    "tagline": "Fields, forts & the sport heartland"
  },
  "Jammu & Kashmir": {
    "state": "Jammu & Kashmir",
    "accent": "#1B5E8C",
    "accent2": "#C4493B",
    "localGreeting": "جموں و کشمیر میں خوش آمدید",
    "englishGreeting": "Welcome to Jammu & Kashmir",
    "motif": "Pashmina & Papier-mâché",
    "emoji": "🛶",
    "pattern": "kashmir",
    "tagline": "Dal lake, chinar & heaven on earth"
  },
  "Sikkim": {
    "state": "Sikkim",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "सिक्किममा तपाईंलाई स्वागत छ",
    "englishGreeting": "Welcome to Sikkim",
    "motif": "Thangka & Prayer Wheel",
    "emoji": "🏔️",
    "pattern": "thangka",
    "tagline": "Kanchenjunga & monastery calm"
  },
  "Meghalaya": {
    "state": "Meghalaya",
    "accent": "#0D8A68",
    "accent2": "#1B5E8C",
    "localGreeting": "মেঘালয়লৈ স্বাগতম",
    "englishGreeting": "Welcome to Meghalaya",
    "motif": "Living Root Bridges",
    "emoji": "🌧️",
    "pattern": "root",
    "tagline": "Clouds, caves & root bridges"
  },
  "Nagaland": {
    "state": "Nagaland",
    "accent": "#C4493B",
    "accent2": "#1B7A3D",
    "localGreeting": "Nagaland-otshü pfiho",
    "englishGreeting": "Welcome to Nagaland",
    "motif": "Warrior Beads & Hornbill",
    "emoji": "🦅",
    "pattern": "beads",
    "tagline": "Hornbill festival & warrior hills"
  },
  "Manipur": {
    "state": "Manipur",
    "accent": "#C4493B",
    "accent2": "#1B7A3D",
    "localGreeting": "মনিপুৰলৈ স্বাগতম",
    "englishGreeting": "Welcome to Manipur",
    "motif": "Moirang Phee & Ras Lila",
    "emoji": "💃",
    "pattern": "moirang",
    "tagline": "Loktak lake & dance of the gods"
  },
  "Mizoram": {
    "state": "Mizoram",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "Mizorama lo lawm a",
    "englishGreeting": "Welcome to Mizoram",
    "motif": "Puan & Bamboo",
    "emoji": "🎋",
    "pattern": "bamboo",
    "tagline": "Bamboo hills & cheraw dance"
  },
  "Tripura": {
    "state": "Tripura",
    "accent": "#C4493B",
    "accent2": "#D97706",
    "localGreeting": "ত্রিপুরায় স্বাগতম",
    "englishGreeting": "Welcome to Tripura",
    "motif": "Rignai & Udaipur Palace",
    "emoji": "🏯",
    "pattern": "rignai",
    "tagline": "Palaces, lakes & tribal weave"
  },
  "Arunachal Pradesh": {
    "state": "Arunachal Pradesh",
    "accent": "#1B7A3D",
    "accent2": "#D97706",
    "localGreeting": "Arunachal apong",
    "englishGreeting": "Welcome to Arunachal Pradesh",
    "motif": "Tribal Weave & Monastery",
    "emoji": "🌄",
    "pattern": "tribal",
    "tagline": "Land of the dawn-lit mountains"
  },
  "Chandigarh": {
    "state": "Chandigarh",
    "accent": "#1B5E8C",
    "accent2": "#D97706",
    "localGreeting": "ਚੰਡੀਗੜ੍ਹ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    "englishGreeting": "Welcome to Chandigarh",
    "motif": "Le Corbusier & Rock Garden",
    "emoji": "🗿",
    "pattern": "grid",
    "tagline": "The planned city of gardens"
  },
  "Puducherry": {
    "state": "Puducherry",
    "accent": "#1B5E8C",
    "accent2": "#D97706",
    "localGreeting": "புதுச்சேரிக்கு வரவேற்கிறோம்",
    "englishGreeting": "Welcome to Puducherry",
    "motif": "French Quarter & Kolam",
    "emoji": "🚲",
    "pattern": "french",
    "tagline": "French streets by the sea"
  },
  "Ladakh": {
    "state": "Ladakh",
    "accent": "#1B5E8C",
    "accent2": "#D97706",
    "localGreeting": "लद्दाख में आपका स्वागत है",
    "englishGreeting": "Welcome to Ladakh",
    "motif": "Prayer Flags & Stupa",
    "emoji": "🏔️",
    "pattern": "flags",
    "tagline": "High passes & monastery silence"
  }
};

export const DEFAULT_THEME: StateTheme = {
  state: "India",
  accent: "#E05A47",
  accent2: "#D97706",
  localGreeting: "नमस्ते",
  englishGreeting: "Welcome to Incredible India",
  motif: "Mandala & Paisley",
  emoji: "🇮🇳",
  pattern: "lotus",
  tagline: "A land of epic stories, living crafts & timeless trails"
};

export function getStateTheme(stateName?: string | null): StateTheme {
  if (!stateName) return DEFAULT_THEME;
  const direct = STATE_THEMES[stateName];
  if (direct) return direct;
  const match = Object.values(STATE_THEMES).find(
    (t) => t.state.toLowerCase() === stateName.toLowerCase()
  );
  return match || { ...DEFAULT_THEME, state: stateName };
}

export function getThemePatternStyle(theme: StateTheme): React.CSSProperties {
  const t = theme.accent;
  const patterns: Record<string, string> = {
    bandhani: `radial-gradient(${t}22 1.5px, transparent 2px)`,
    jaali: `linear-gradient(45deg, ${t}14 25%, transparent 25%), linear-gradient(-45deg, ${t}14 25%, transparent 25%)`,
    kolam: `radial-gradient(${t}22 1px, transparent 1.5px)`,
    palm: `linear-gradient(120deg, ${t}10 50%, transparent 50%)`,
    phulkari: `linear-gradient(90deg, ${t}18 50%, transparent 50%)`,
    warli: `radial-gradient(${t}18 1.5px, transparent 2px)`,
    madhubani: `repeating-linear-gradient(45deg, ${t}12 0 6px, transparent 6px 12px)`,
    gond: `radial-gradient(${t}18 2px, transparent 2.5px)`,
    lotus: `radial-gradient(${t}18 2px, transparent 2.5px)`
  };
  return {
    backgroundImage: patterns[theme.pattern] || patterns.lotus,
    backgroundSize: "24px 24px"
  };
}
