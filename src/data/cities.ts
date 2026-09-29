import { StateTheme, getStateTheme } from "./themes";

export interface Place {
  id: string;
  name: string;
  category: "Heritage" | "Food" | "Shopping" | "Photo" | "Hidden" | "Hotel";
  story: string;
  why: string;
  duration: string;
  xp: number;
  unlock: string; // e.g. "10:00" or "00:00"
  moods: string[];
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  lat?: number;
  lng?: number;
  address?: string;
}

export interface QuestChallenge {
  type: "trivia" | "observation" | "photo" | "riddle";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuestStep {
  id: number;
  title: string;
  hint: string;
  locationName?: string;
  lat?: number;
  lng?: number;
  clue?: string;
  story?: string;
  challenge?: QuestChallenge;
  xpReward?: number;
}

export interface Quest {
  id: string;
  title: string;
  category: "Heritage" | "Food" | "Shopping" | "Photo" | "Hidden";
  xp: number;
  badge: string;
  stamp: string;
  steps: QuestStep[];
}

export interface HiddenGem {
  id: string;
  name: string;
  clues: string[];
  xp: number;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  location?: string;
  experience: string;
  reward: string;
  code: string;
}

export interface Festival {
  name: string;
  emoji: string;
  note: string;
}

export interface CityData {
  place: string;
  state: string;
  blurb: string;
  places: Place[];
  quests: Quest[];
  hidden: HiddenGem;
  partners: Partner[];
  festivals: Festival[];
  theme?: StateTheme;
}

export const PRESET_CITIES: Record<string, CityData> = {
  "ahmedabad": {
    "place": "Ahmedabad",
    "state": "Gujarat",
    "blurb": "India's first UNESCO World Heritage City — a 600-year-old living maze of pols, stepwells, ornate wooden havelis, and vibrant night feasts.",
    "places": [
      {
        "id": "amd-kalupur",
        "name": "Kalupur Swaminarayan Mandir",
        "category": "Heritage",
        "story": "Built in 1822 with ornate Burmese teakwood carvings, this colorful temple marks the traditional starting gateway for the official AMC Heritage Walk.",
        "why": "Look closely at the columns — you will find playful carvings of British soldiers alongside traditional Gujarati deities.",
        "duration": "45 min",
        "xp": 65,
        "unlock": "06:00",
        "moods": ["History", "Aesthetic"],
        "x": 64,
        "y": 32,
        "lat": 23.0270,
        "lng": 72.5975,
        "address": "Kalupur, Old City"
      },
      {
        "id": "amd-dalpatram",
        "name": "Kavi Dalpatram Chowk & Chabutro",
        "category": "Heritage",
        "story": "In the heart of Lambeshwar ni Pol rests a life-sized bronze statue of 19th-century reformist poet Kavi Dalpatram seated on a stone otla alongside an eight-sided ornate bird feeder (chabutro).",
        "why": "A tranquil community chowk showcasing the timeless pol ethos where birds, children, and elders share the same courtyard.",
        "duration": "30 min",
        "xp": 50,
        "unlock": "08:00",
        "moods": ["History", "Chill"],
        "x": 52,
        "y": 42,
        "lat": 23.0245,
        "lng": 72.5930,
        "address": "Lambeshwar ni Pol, Relief Road"
      },
      {
        "id": "amd-heritage-pol",
        "name": "The Old City Pols (Khadia & Dhal)",
        "category": "Heritage",
        "story": "Narrow 600-year-old self-contained neighborhood lanes engineered like a labyrinth to baffle invaders, foster close community, and beat the desert heat with microclimate shade.",
        "why": "A living museum of carved wooden havelis, secret inter-house escape doors, and underground rainwater harvesting tankas.",
        "duration": "90 min",
        "xp": 75,
        "unlock": "08:00",
        "moods": ["History", "Aesthetic"],
        "x": 46,
        "y": 46,
        "lat": 23.0235,
        "lng": 72.5915,
        "address": "Khadia & Dhal ni Pol"
      },
      {
        "id": "amd-jama",
        "name": "Ahmedabad Jama Masjid",
        "category": "Heritage",
        "story": "Commissioned in 1424 by Sultan Ahmed Shah, this yellow sandstone marvel features 260 intricately carved pillars blending Indo-Islamic, Hindu, and Jain architectural motifs.",
        "why": "Step inside from the chaotic market into a vast sunlit courtyard of profound silence and geometric symmetry.",
        "duration": "45 min",
        "xp": 60,
        "unlock": "07:00",
        "moods": ["History", "Aesthetic", "Chill"],
        "x": 38,
        "y": 48,
        "lat": 23.0238,
        "lng": 72.5888,
        "address": "Manek Chowk, Gandhi Road"
      },
      {
        "id": "amd-sidi",
        "name": "Sidi Saiyyed Mosque",
        "category": "Heritage",
        "story": "Constructed in 1573, this mosque is world-renowned for its twin stone jali windows carved into delicate intertwining palm leaves and the Tree of Life from a single slab of yellow sandstone.",
        "why": "The iconic jali screen has become the undisputed visual insignia of Ahmedabad and IIM Ahmedabad.",
        "duration": "40 min",
        "xp": 55,
        "unlock": "07:00",
        "moods": ["History", "Photo"],
        "x": 28,
        "y": 32,
        "lat": 23.0275,
        "lng": 72.5815,
        "address": "Opp. Bij Bhavan, Salapose Road"
      },
      {
        "id": "amd-teen-darwaza",
        "name": "Teen Darwaza & Bhadra Fort",
        "category": "Heritage",
        "story": "The royal ceremonial gateway with three symmetrical arches built in 1415. A perpetual oil lamp has burned here for more than 600 years in honor of the Goddess of Wealth.",
        "why": "The historic gateway from which Sultans watched royal processions and distributed coins to citizens.",
        "duration": "35 min",
        "xp": 50,
        "unlock": "09:00",
        "moods": ["History"],
        "x": 32,
        "y": 42,
        "lat": 23.0248,
        "lng": 72.5835,
        "address": "Bhadra, Old City"
      },
      {
        "id": "amd-adalaj",
        "name": "Adalaj Stepwell (Rudabai Vav)",
        "category": "Heritage",
        "story": "A five-storey subterranean water temple built in 1499 by Queen Rudabai in Solanki style. Octagonal light wells illuminate intricately carved stone friezes of flowers, birds, and deities.",
        "why": "The underground temperature drops by nearly 6°C compared to ground level, creating a magical sanctuary.",
        "duration": "60 min",
        "xp": 65,
        "unlock": "09:00",
        "moods": ["History", "Photo"],
        "x": 22,
        "y": 14,
        "lat": 23.1667,
        "lng": 72.5800,
        "address": "Adalaj, Gandhinagar Highway"
      },
      {
        "id": "amd-manek",
        "name": "Manek Chowk Market",
        "category": "Shopping",
        "story": "Named after saint Manek Baba, this legendary city square undergoes a three-stage daily metamorphosis: vegetable market at dawn, gold and bullion exchange by afternoon, and feverish street food carnival at night.",
        "why": "Nowhere else in India does a financial diamond exchange transform into a midnight butter-pav-bhaji and chocolate sandwich hotspot.",
        "duration": "50 min",
        "xp": 45,
        "unlock": "19:30",
        "moods": ["Foodie", "Budget", "Night"],
        "x": 42,
        "y": 50,
        "lat": 23.0232,
        "lng": 72.5905,
        "address": "Manek Chowk, Old City"
      },
      {
        "id": "amd-law-garden",
        "name": "Law Garden Handicrafts",
        "category": "Shopping",
        "story": "An open-air evening promenade glowing with authentic Kutchi mirror work, Chaniya Choli, tie-dye bandhani, and hand-embroidered mojris directly from rural artisan guilds.",
        "why": "The undisputed shopping ground for Navratri traditional attire and Gujarati textiles.",
        "duration": "50 min",
        "xp": 40,
        "unlock": "16:00",
        "moods": ["Aesthetic", "Budget"],
        "x": 72,
        "y": 58,
        "lat": 23.0230,
        "lng": 72.5590,
        "address": "Law Garden, Ellisbridge"
      },
      {
        "id": "amd-khaman",
        "name": "Khaman House (Das Khaman)",
        "category": "Food",
        "story": "Operating since 1922, serving the authentic 'vavaniyo' and soft nylon khaman, tempered with crackling black mustard seeds, green chillies, and asafoetida.",
        "why": "Ahmedabad's holy grail breakfast — fluffy, savory, melt-in-mouth yellow gold.",
        "duration": "30 min",
        "xp": 35,
        "unlock": "08:00",
        "moods": ["Foodie", "Budget"],
        "x": 38,
        "y": 62,
        "lat": 23.0210,
        "lng": 72.5850,
        "address": "Shop 2, Trade Centre, Stadium Cross Road"
      },
      {
        "id": "amd-gola",
        "name": "Midnight Gola at Manek Chowk",
        "category": "Food",
        "story": "Towering shaved-ice golas loaded with thick malai rabdi, pistachio, kesar syrup, chocolate drizzle, and fresh fruit cream served strictly past 9 PM under string lights.",
        "why": "Ahmedabad's legendary midnight sweet cooldown after spicy street fares.",
        "duration": "25 min",
        "xp": 40,
        "unlock": "21:00",
        "moods": ["Foodie", "Night"],
        "x": 44,
        "y": 48,
        "lat": 23.0232,
        "lng": 72.5905,
        "address": "Manek Chowk Night Market"
      },
      {
        "id": "amd-sabarmati",
        "name": "Sabarmati Riverfront Promenade",
        "category": "Photo",
        "story": "An 11.5 km two-level waterfront promenade revitalizing the historic Sabarmati river, offering pedal boating, cycling tracks, and sunset reflection views over the cityscape.",
        "why": "Golden hour reflections on calm waters with breezy walking decks away from traffic.",
        "duration": "60 min",
        "xp": 45,
        "unlock": "17:00",
        "moods": ["Aesthetic", "Chill", "Date"],
        "x": 50,
        "y": 70,
        "lat": 23.0290,
        "lng": 72.5740,
        "address": "Sabarmati Riverfront West"
      },
      {
        "id": "amd-gandhi-ashram",
        "name": "Sabarmati Gandhi Ashram (Hriday Kunj)",
        "category": "Heritage",
        "story": "Established in 1917 on the tranquil riverbanks, this was Mahatma Gandhi's headquarters for 13 years and the launching point of the historic 1930 Salt March (Dandi Yatra).",
        "why": "Visit Hriday Kunj, see Gandhi's original spinning charkha, and experience profound simplicity and peace.",
        "duration": "60 min",
        "xp": 60,
        "unlock": "08:30",
        "moods": ["History", "Chill"],
        "x": 56,
        "y": 18,
        "lat": 23.0605,
        "lng": 72.5800,
        "address": "Ashram Road, Ahmedabad"
      },
      {
        "id": "amd-sarkhej",
        "name": "Sarkhej Roza (The Acropolis)",
        "category": "Heritage",
        "story": "A serene 15th-century tomb, palace, and mosque complex set around a vast 34-acre man-made water reservoir, acclaimed by architect Le Corbusier as the 'Acropolis of Ahmedabad'.",
        "why": "Unadorned elegance, stone piers, and gentle breeze rippling over historical water pavilions.",
        "duration": "60 min",
        "xp": 65,
        "unlock": "09:00",
        "moods": ["History", "Aesthetic", "Photo"],
        "x": 16,
        "y": 80,
        "lat": 22.9815,
        "lng": 72.5020,
        "address": "Post Sarkhej, Makarba"
      },
      {
        "id": "amd-dada",
        "name": "Dada Hari ni Vav (Hidden Stepwell)",
        "category": "Hidden",
        "story": "A 500-year-old subterranean masterpiece in Asarwa commissioned in 1485 by Bai Harir Sultani. Five stories of intricately carved sandstone columns plunge into cool stillness.",
        "why": "Dual inscriptions in Sanskrit and Arabic carved into the first gallery wall reveal its shared cultural roots.",
        "duration": "35 min",
        "xp": 70,
        "unlock": "09:00",
        "moods": ["History", "Aesthetic"],
        "x": 78,
        "y": 28,
        "lat": 23.0450,
        "lng": 72.6050,
        "address": "Asarwa, Near Haripura"
      },
      {
        "id": "amd-house",
        "name": "Heritage Homestay (Lambha Pol)",
        "category": "Hotel",
        "story": "A meticulously restored 150-year-old pol haveli with a central skylit chowk, Burma teak wooden pillars, and brass swing (jhula).",
        "why": "Wake up to morning temple bells and freshly brewed Gujarati masala chai inside a living heritage courtyard.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": ["Aesthetic", "Family"],
        "x": 33,
        "y": 44,
        "lat": 23.0240,
        "lng": 72.5920,
        "address": "Lambha Pol, Old City"
      }
    ],
    "quests": [
      {
        "id": "amd-q-heritage",
        "title": "Lost Pol Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Pol Pathfinder",
        "stamp": "Pol Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Find the Khadia Pol Gateway",
            "hint": "Seek the carved wooden gate framing the entrance to the Old City pols near Khadia.",
            "locationName": "Khadia Pol Entrance",
            "lat": 23.0235,
            "lng": 72.5915,
            "clue": "Follow the scent of morning incense past the stone gates where haveli eaves nearly touch above the narrow street.",
            "story": "Ahmedabad's pols were designed during medieval times with heavy wooden gates called 'Pol Darwaza'. At night, each neighborhood gate was barred shut with iron rods and guarded by a local night watchman (Pol Chowkidar) to keep bandits and marauders at bay.",
            "challenge": {
              "type": "trivia",
              "question": "Why were the internal lanes of pols deliberately built as narrow, twisting labyrinths?",
              "options": [
                "To confuse invading cavalry and slow enemy advances",
                "Because horse carriages were forbidden in the city",
                "To match the patterns of astrological star charts",
                "Due to a shortage of building sandstone"
              ],
              "correctIndex": 0,
              "explanation": "Correct! The labyrinthine dead-ends and sharp turns were military architectural defenses designed so invading horsemen could not charge through or easily escape."
            },
            "xpReward": 25
          },
          {
            "id": 2,
            "title": "Discover Kavi Dalpatram's Chabutro",
            "hint": "Look for the eight-sided wooden bird feeder tower in Lambeshwar ni Pol.",
            "locationName": "Kavi Dalpatram Chowk",
            "lat": 23.0245,
            "lng": 72.5930,
            "clue": "Where the bronze poet rests with his walking stick, look upward toward the feathered sanctuary on high.",
            "story": "The Chabutro is a quintessential Gujarati community tower. Every morning, pol residents deposit grains of millet and fresh water. Built tall on a slender pillar, it protects sparrows and pigeons from roaming street cats and dogs.",
            "challenge": {
              "type": "observation",
              "question": "What is the primary architectural purpose of the elevated platform (Chabutro) in the pol chowk?",
              "options": [
                "Safe bird feeding station away from predators",
                "A platform for town criers to make royal announcements",
                "A public grain storage silo for drought relief",
                "A ceremonial stage for evening folk dance"
              ],
              "correctIndex": 0,
              "explanation": "Correct! The Chabutro is an ecological community feeder designed to allow birds to feed in safety above ground predators."
            },
            "xpReward": 25
          },
          {
            "id": 3,
            "title": "Inspect the Secret Rainwater Tanka",
            "hint": "Find the carved stone lid on the haveli otla that conceals an ancient cistern.",
            "locationName": "Old City Haveli Courtyard",
            "lat": 23.0238,
            "lng": 72.5922,
            "clue": "Underneath the cool stone floor where families sit at dusk lies a reservoir that captures the monsoons.",
            "story": "Every authentic pol house had an underground tanka capable of holding up to 25,000 liters of rainwater. Pure monsoon rain collected from copper rooftop gutters passed through charcoal and lime filters, staying naturally cool, clean, and drinking-pure for over three years!",
            "challenge": {
              "type": "trivia",
              "question": "How long could traditional underground tankas keep harvested rainwater fresh without chemical treatment?",
              "options": [
                "Over 2 to 3 years due to copper gutters and lime sealing",
                "Only for 14 days before needing boiling",
                "Exactly 1 month during summer",
                "Only 3 days"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Sealed subterranean tankas with copper filtering kept pristine drinking water fresh and chilled for over 2–3 years."
            },
            "xpReward": 25
          },
          {
            "id": 4,
            "title": "Locate the Secret Escape Passages",
            "hint": "Inspect the upper-level wooden jharokha balconies connected between houses.",
            "locationName": "Dhal ni Pol Eaves",
            "lat": 23.0232,
            "lng": 72.5910,
            "clue": "Look up between two neighboring havelis — what appears to be decorative woodwork is actually a covert bridge.",
            "story": "During sieges, pol residents used 'Bari' — secret interconnecting attic doorways and adjoining rooftop pathways. An entire family could slip through five neighboring houses and emerge miles away on a completely different street without stepping onto the main alley!",
            "challenge": {
              "type": "riddle",
              "question": "What secret architectural feature allowed pol families to evacuate without touching the ground during emergencies?",
              "options": [
                "Interconnected rooftop doors and hidden attic passageways",
                "Underground steam powered elevators",
                "Rope pulleys spanning the Sabarmati river",
                "Horse-drawn tunnel wagons"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Interconnecting attic doors and shared haveli rooftops allowed safe, undetectable passage across entire blocks."
            },
            "xpReward": 25
          },
          {
            "id": 5,
            "title": "Claim Your Pol Heritage Stamp",
            "hint": "Arrive at the Dhal ni Pol Heritage Chowk to seal your quest.",
            "locationName": "Dhal ni Pol Chowk",
            "lat": 23.0235,
            "lng": 72.5915,
            "clue": "You have decoded the defense, water, and community of the world's most intricate heritage neighborhood.",
            "story": "In 2017, UNESCO declared Ahmedabad India's first World Heritage City primarily because the 600-year-old pols remain active, thriving living neighborhoods, where communal harmony, craftsmanship, and historic social fabric endure unbroken.",
            "challenge": {
              "type": "trivia",
              "question": "In which year did Ahmedabad receive official inscription as India's first UNESCO World Heritage City?",
              "options": [
                "2017",
                "2005",
                "2012",
                "2021"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Ahmedabad was officially inscribed as India's first UNESCO World Heritage City at the 41st World Heritage Committee session in July 2017."
            },
            "xpReward": 20
          }
        ]
      },
      {
        "id": "amd-q-amc-walk",
        "title": "AMC Official Heritage Trail",
        "category": "Heritage",
        "xp": 130,
        "badge": "AMC Heritage Scholar",
        "stamp": "Mandir-to-Masjid Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Kalupur Swaminarayan Temple Gate",
            "hint": "Start where the Ahmedabad Municipal Corporation (AMC) official morning walk begins.",
            "locationName": "Kalupur Swaminarayan Mandir",
            "lat": 23.0270,
            "lng": 72.5975,
            "clue": "Stand before the grand carved gateway carved in 1822 where Burma teak meets vibrant polychrome arches.",
            "story": "The AMC Heritage Walk begins here every morning at 7:45 AM with an audiovisual presentation. The temple gate is renowned for its decorative brackets depicting musicians and British soldiers in high hats.",
            "challenge": {
              "type": "observation",
              "question": "What type of timber was imported to create the intricate temple brackets at Kalupur Mandir?",
              "options": [
                "Burmese Teakwood",
                "Himalayan Cedar Pine",
                "Sandalwood",
                "Kashmiri Walnut"
              ],
              "correctIndex": 0,
              "explanation": "Correct! High-grade Burmese teakwood was specially imported for its durability against dry Gujarat winds and termite resistance."
            },
            "xpReward": 25
          },
          {
            "id": 2,
            "title": "Kavi Dalpatram's Residence",
            "hint": "Navigate down the narrow alley of Lambeshwar ni Pol.",
            "locationName": "Lambeshwar ni Pol",
            "lat": 23.0245,
            "lng": 72.5930,
            "clue": "Look for the facade outline where poet Dalpatram composed verses that awakened modern Gujarati prose.",
            "story": "Though the original home suffered damage in an earthquake, the AMC beautifully restored the chowk. The poet's bronze statue sits comfortably on the 'otla' — the traditional raised stone porch where neighbors gossip and drink tea.",
            "challenge": {
              "type": "trivia",
              "question": "What is the traditional raised stone veranda in front of a Gujarati pol home called?",
              "options": [
                "Otla",
                "Jharokha",
                "Chhatri",
                "Mandapa"
              ],
              "correctIndex": 0,
              "explanation": "Correct! The 'Otla' is the elevated front plinth where social life unfolds and visitors are warmly greeted."
            },
            "xpReward": 25
          },
          {
            "id": 3,
            "title": "Calico Dome & Wooden Havelis",
            "hint": "Spot the historic geodesic dome inspired by Buckminster Fuller near Relief Road.",
            "locationName": "Relief Road Junction",
            "lat": 23.0255,
            "lng": 72.5910,
            "clue": "A junction where historic wooden havelis stand across from modern architectural experiments.",
            "story": "Ahmedabad was dubbed the 'Manchester of the East' for its booming textile mills. Modern industrialists collaborated with global luminaries like Le Corbusier, Louis Kahn, and Buckminster Fuller.",
            "challenge": {
              "type": "trivia",
              "question": "Which title was bestowed upon Ahmedabad in the 19th and 20th centuries due to its booming cotton mills?",
              "options": [
                "Manchester of the East",
                "Silk City of the Orient",
                "Venice of Gujarat",
                "Detroit of India"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Ahmedabad was celebrated as the 'Manchester of the East' because of its thriving cotton and calico textile mills."
            },
            "xpReward": 25
          },
          {
            "id": 4,
            "title": "Fernandes Bridge Book Bazaars",
            "hint": "Walk under the historic bridge where thousands of academic and literary books line stalls.",
            "locationName": "Fernandes Bridge",
            "lat": 23.0240,
            "lng": 72.5895,
            "clue": "Under the stone bridge where railway tracks once echoed, look for stacks of vintage paperbacks and manuscripts.",
            "story": "Fernandes Bridge has been Ahmedabad's beloved second-hand book exchange for decades. Generations of college students, historians, and book hunters have haggled here for rare out-of-print Gujarati literature.",
            "challenge": {
              "type": "observation",
              "question": "What famous traditional bazaar operates beneath the arches of Fernandes Bridge?",
              "options": [
                "Second-hand and antique book bazaar",
                "Gold and silver coin bazaar",
                "Pottery and clay diya market",
                "Fresh spices and saffron exchange"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Fernandes Bridge is famous across Gujarat for its sprawling market of rare books, university textbooks, and historical prints."
            },
            "xpReward": 25
          },
          {
            "id": 5,
            "title": "Grand Courtyard of Jama Masjid",
            "hint": "Conclude your walk at the majestic 1424 AD sandstone mosque.",
            "locationName": "Ahmedabad Jama Masjid",
            "lat": 23.0238,
            "lng": 72.5888,
            "clue": "Pass through the western arch into a vast courtyard flanked by 260 pillars carved with lotus and bell motifs.",
            "story": "The AMC Heritage Walk harmoniously concludes here — completing the renowned 'Mandir to Masjid' cultural pilgrimage across the living heart of old Ahmedabad.",
            "challenge": {
              "type": "trivia",
              "question": "How many intricately carved pillars support the prayer sanctuary of Ahmedabad's Jama Masjid?",
              "options": [
                "260 pillars",
                "108 pillars",
                "500 pillars",
                "64 pillars"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Exactly 260 pillars carved with Hindu and Jain architectural influences uphold the domed halls of Jama Masjid."
            },
            "xpReward": 30
          }
        ]
      },
      {
        "id": "amd-q-food",
        "title": "Street Food Trail",
        "category": "Food",
        "xp": 100,
        "badge": "Farsan Connoisseur",
        "stamp": "Farsan Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Start with Das Khaman",
            "hint": "Taste the steamed yellow gram-flour delicacy before 11 AM.",
            "locationName": "Das Khaman House",
            "lat": 23.0210,
            "lng": 72.5850,
            "clue": "Follow the crackle of green mustard seeds in warm oil to the city's 100-year-old farsan master.",
            "story": "Das Khaman has steamed fresh khaman since 1922. Unlike 'Dhokla' which uses fermented rice and dal batter, traditional Khaman is prepared from freshly ground chana dal (bengal gram) and leavened with fruit salt for its sponge-like texture.",
            "challenge": {
              "type": "trivia",
              "question": "What is the primary ingredient that differentiates authentic Khaman from standard Dhokla?",
              "options": [
                "100% Chana dal (Bengal gram) flour",
                "Refined white wheat maida",
                "Fermented sour curd with semolina",
                "Pearl millet bajra flour"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Traditional Gujarati Khaman is made purely from Bengal gram (Chana dal) flour, giving it its iconic golden color and lightness."
            },
            "xpReward": 20
          },
          {
            "id": 2,
            "title": "Crisp Fafda & Papaya Sambharo",
            "hint": "Find a traditional morning farsan counter serving ribbon-shaped fafda with jalebi.",
            "locationName": "Chandravilas Farsan, Gandhi Road",
            "lat": 23.0240,
            "lng": 72.5880,
            "clue": "Crispy chickpea ribbons pulled by palm across a wooden board, paired with raw papaya slaw.",
            "story": "Fafda-Jalebi is Ahmedabad's undisputed Sunday morning religion, especially during the Dussehra festival when citizens devour thousands of kilograms across the city.",
            "challenge": {
              "type": "observation",
              "question": "What traditional relish is always served alongside hot crisp Fafda in Ahmedabad?",
              "options": [
                "Warm raw papaya sambharo and fried green chillies",
                "Tomato ketchup and mint mayonnaise",
                "Coconut chutney and podi powder",
                "Garlic pickle and sweet mango murabba"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Authentic Fafda is invariably paired with tangy grated raw papaya sambharo, sweet besan kadhi, and fried salted green chillies."
            },
            "xpReward": 20
          },
          {
            "id": 3,
            "title": "Hot Dalwada at Gujarat College Road",
            "hint": "Savor crispy spiced yellow moong dal fritters with fried chillies.",
            "locationName": "Ambika Dalwada, Ellisbridge",
            "lat": 23.0220,
            "lng": 72.5650,
            "clue": "Crispy outside, piping hot within — the ultimate monsoon comfort snack.",
            "story": "The moment dark monsoon clouds gather over the Sabarmati river, long queues form outside dalwada stalls. Ground moong dal with black pepper, ginger, and green chillies fried in boiling oil creates an unforgettable crunch.",
            "challenge": {
              "type": "trivia",
              "question": "Which dal is primarily used to prepare Ahmedabad's signature monsoon snack 'Dalwada'?",
              "options": [
                "Yellow Moong Dal (split green gram)",
                "Urad Dal (black gram)",
                "Masoor Dal (red lentil)",
                "Toor Dal (pigeon pea)"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Dalwada is prepared using soaked and coarsely ground yellow moong dal, spiced with cracked black pepper and green chillies."
            },
            "xpReward": 20
          },
          {
            "id": 4,
            "title": "Midnight Gola & Pav Bhaji at Manek Chowk",
            "hint": "Visit the night market past 9:30 PM when the jewelry shops pull down shutters.",
            "locationName": "Manek Chowk Night Market",
            "lat": 23.0232,
            "lng": 72.5905,
            "clue": "Listen for the rhythmic clanking of iron tawas mashing spicy butter pav bhaji under neon street lamps.",
            "story": "Manek Chowk's night transformation is world-famous. Tawa pulav, Amul-butter-drenched pav bhaji, pineapple sandwiches, and mountain-high shaved ice golas create a festival that lasts until 2 AM every single night of the year.",
            "challenge": {
              "type": "trivia",
              "question": "What unique dairy topping is famously piled generously over Manek Chowk sandwiches and Pav Bhaji?",
              "options": [
                "Grated processed Amul cheese and butter blocks",
                "Sweet condensed milk cream",
                "Fermented buffalo yogurt",
                "Fresh goat feta cheese"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Manek Chowk street vendors are legendary for grating entire mountains of Amul cheese over pav bhaji, dosas, and grilled sandwiches."
            },
            "xpReward": 20
          },
          {
            "id": 5,
            "title": "Claim Your Farsan Master Stamp",
            "hint": "Complete your culinary tour and collect the Farsan Stamp.",
            "locationName": "Manek Chowk Sweet Stalls",
            "lat": 23.0232,
            "lng": 72.5905,
            "clue": "You have tasted the salty, sweet, sour, and spicy notes that define the Gujarati palate.",
            "story": "Gujarati food is one of the world's most nuanced vegetarian cuisines, delicately balancing four primary flavors: sweet (mithas), sour (khatas), salty (kharas), and spicy (tikhas).",
            "challenge": {
              "type": "trivia",
              "question": "Which of these culinary balances is the quintessential hallmark of Gujarati regional cooking?",
              "options": [
                "Harmonious balance of sweet, sour, and savory (Khat-Mithu)",
                "Extreme smokiness from wood fire curing",
                "Heavy vinegar marination and wine reduction",
                "Raw mustard seed oil bittering"
              ],
              "correctIndex": 0,
              "explanation": "Correct! 'Khat-Mithu' — the delicate balance of sourness (often lemon or kokum) and sweetness (jaggery or sugar) is the signature of Gujarati cuisine."
            },
            "xpReward": 20
          }
        ]
      },
      {
        "id": "amd-q-hidden",
        "title": "Hidden Stepwell Hunt",
        "category": "Hidden",
        "xp": 140,
        "badge": "Stepwell Seeker",
        "stamp": "Vav Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Decipher the Asarwa Clue",
            "hint": "It hides below street level, older than the Mughal empire itself.",
            "locationName": "Asarwa Gateway",
            "lat": 23.0450,
            "lng": 72.6050,
            "clue": "Past the busy train tracks in northeastern Asarwa, seek an understated sandstone arch that drops directly underground.",
            "story": "Unlike palaces that rise toward the sky, Indian stepwells ('Vavs') are inverted subterranean temples carved downward into Mother Earth to reach the water table in arid regions.",
            "challenge": {
              "type": "trivia",
              "question": "Why did medieval Gujarat builders construct elaborate subterranean stepwells (Vavs)?",
              "options": [
                "To collect monsoon water, provide resting caravanserais, and create a cool underground community haven",
                "As secret gold vaults for royal dynasties",
                "As underground burial catacombs",
                "To test acoustic resonance for royal musicians"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Stepwells functioned as water reservoirs, social cooling hubs, and travelers' rest stops along trade routes."
            },
            "xpReward": 25
          },
          {
            "id": 2,
            "title": "Descend the Five Tiers of Dada Harir",
            "hint": "Count the colonnaded pavilion levels as the air cools down.",
            "locationName": "Dada Hari ni Vav Interior",
            "lat": 23.0450,
            "lng": 72.6050,
            "clue": "Five subterranean levels illuminated by octagonal openings through which sunlight shifts like sundial hands.",
            "story": "Commissioned in 1485 AD by Bai Harir Sultani, a superintendent of the royal harem, this stepwell descends through five intricate pavilion tiers of carved sandstone pillars.",
            "challenge": {
              "type": "observation",
              "question": "How many subterranean tiered pavilion levels comprise the architectural descent of Dada Hari ni Vav?",
              "options": [
                "Five levels",
                "Three levels",
                "Seven levels",
                "Nine levels"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Dada Hari ni Vav is engineered across five underground colonnaded stories descending to the deep water reservoir."
            },
            "xpReward": 30
          },
          {
            "id": 3,
            "title": "Locate the Sanskrit & Arabic Inscriptions",
            "hint": "Inspect the stone niche wall on the first subterranean gallery.",
            "locationName": "First Gallery Wall",
            "lat": 23.0450,
            "lng": 72.6050,
            "clue": "Look closely at the opposing wall friezes: two ancient languages commemorating the same historic dedication.",
            "story": "Dada Harir stepwell features dual inscriptions: one in Sanskrit and one in Arabic. They record the date of construction (Samvat 1556 / 890 AH) and praise the builder Bai Harir, illustrating medieval cultural synthesis.",
            "challenge": {
              "type": "trivia",
              "question": "What two ancient languages are inscribed onto the gallery walls of Dada Hari ni Vav?",
              "options": [
                "Sanskrit and Arabic",
                "Persian and Portuguese",
                "Prakrit and Latin",
                "Greek and Gujarati"
              ],
              "correctIndex": 0,
              "explanation": "Correct! The dual Sanskrit and Arabic stone inscriptions highlight the cross-cultural patronage of Gujarat's sultanate era."
            },
            "xpReward": 30
          },
          {
            "id": 4,
            "title": "Trace the Solanki Floral Friezes",
            "hint": "Examine the base of the stone pillars for elephant and Kalpavriksha motifs.",
            "locationName": "Subterranean Columns",
            "lat": 23.0450,
            "lng": 72.6050,
            "clue": "Carved into rigid sandstone are supple creepers, dancing peacocks, and auspicious urns (purna-kalasha).",
            "story": "The stone masons employed Solanki temple craft traditions even during the sultanate period, resulting in a unique regional architectural style known as the Indo-Saracenic Gujarat vernacular.",
            "challenge": {
              "type": "observation",
              "question": "Which historic Hindu dynasty's architectural and stonemasonry style heavily influenced Gujarat stepwells?",
              "options": [
                "Solanki (Chalukya) Dynasty",
                "Chola Dynasty",
                "Maurya Dynasty",
                "Kushana Dynasty"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Solanki master masons developed the inverted-temple stepped architecture that defines Gujarat's stepwells."
            },
            "xpReward": 30
          },
          {
            "id": 5,
            "title": "Claim the Sacred Vav Stamp",
            "hint": "Reach the circular stone well shaft at the bottom level.",
            "locationName": "Deep Well Shaft",
            "lat": 23.0450,
            "lng": 72.6050,
            "clue": "Stand at the spiral well edge where water meets quiet echoes, and claim your subterranean badge.",
            "story": "You have uncovered one of Ahmedabad's most tranquil architectural gems, preserved away from modern road noises.",
            "challenge": {
              "type": "riddle",
              "question": "What natural cooling phenomenon occurs inside subterranean stepwells like Dada Harir?",
              "options": [
                "Microclimate cooling where thick stone and underground water lower air temperature by 5-6°C",
                "Subterranean ice geysers during winter",
                "Chemical evaporation of sulfur salts",
                "Thermal volcanic steam vents"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Shaded subterranean stone galleries and subterranean water create a natural microclimate up to 6°C cooler than the ambient surface heat."
            },
            "xpReward": 25
          }
        ]
      },
      {
        "id": "amd-q-photo",
        "title": "Heritage Frame Quest",
        "category": "Photo",
        "xp": 90,
        "badge": "Lens of Ahmedabad",
        "stamp": "Frame Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Frame the Sidi Saiyyed Tree of Life",
            "hint": "Capture the delicate stone jali lattice at golden hour.",
            "locationName": "Sidi Saiyyed Mosque",
            "lat": 23.0275,
            "lng": 72.5815,
            "clue": "Aim your camera at the semi-circular window where afternoon sun rays pierce through sandstone branches.",
            "story": "Carved in 1573, this single-slab lattice work is so mathematically precise and thin that visitors often mistake it for wrought iron or fine woodwork.",
            "challenge": {
              "type": "photo",
              "question": "What motif does the famed Sidi Saiyyed stone jali window depict?",
              "options": [
                "Intertwining branches of the mythical Tree of Life and date palms",
                "A procession of war elephants and camels",
                "The solar chariot with 12 wheels",
                "Geometric hexagonal labyrinths only"
              ],
              "correctIndex": 0,
              "explanation": "Correct! The window depicts the legendary 'Tree of Life' with intertwined branches and delicate palm foliage."
            },
            "xpReward": 20
          },
          {
            "id": 2,
            "title": "Capture the Three Arches of Teen Darwaza",
            "hint": "Align your perspective through the central royal arch toward Bhadra Fort.",
            "locationName": "Teen Darwaza Archways",
            "lat": 23.0248,
            "lng": 72.5835,
            "clue": "Stand where royal trumpets once announced the sunrise, framing three rhythmic arches against the sky.",
            "story": "The stone carvings on the pillar bases of Teen Darwaza resemble temple torans, reflecting the multicultural heritage of Ahmedabad's founding.",
            "challenge": {
              "type": "observation",
              "question": "How many arches form the ceremonial facade of Teen Darwaza?",
              "options": [
                "Three identical arched gateways",
                "Five tiered arches",
                "Seven concentric arches",
                "A single colossal arch"
              ],
              "correctIndex": 0,
              "explanation": "Correct! As its Gujarati name 'Teen Darwaza' signifies, the monument consists of three elegant pointed arches."
            },
            "xpReward": 20
          },
          {
            "id": 3,
            "title": "Sarkhej Roza Water Pavilion Reflection",
            "hint": "Frame the stone piers reflected across the historic water tank.",
            "locationName": "Sarkhej Roza Tank",
            "lat": 22.9815,
            "lng": 72.5020,
            "clue": "When the breeze stills, the pillared pavilions mirror perfectly on the water's surface.",
            "story": "Sarkhej Roza was hailed by Swiss-French modernist architect Le Corbusier for its brilliant spatial proportion and purity of form.",
            "challenge": {
              "type": "trivia",
              "question": "Which world-famous architect compared Sarkhej Roza to the Acropolis of Athens?",
              "options": [
                "Le Corbusier",
                "Frank Lloyd Wright",
                "Zaha Hadid",
                "Norman Foster"
              ],
              "correctIndex": 0,
              "explanation": "Correct! Le Corbusier was deeply moved by Sarkhej Roza's proportions and cited it as an inspiration for modern modular architecture."
            },
            "xpReward": 25
          },
          {
            "id": 4,
            "title": "Sabarmati Riverfront Golden Hour",
            "hint": "Capture the long shadow and river reflection at 5:30 PM.",
            "locationName": "Sabarmati Riverfront Walkway",
            "lat": 23.0290,
            "lng": 72.5740,
            "clue": "Where the city skyline meets the water, catch the sun dipping behind the western bridges.",
            "story": "The 11.5 km Sabarmati Riverfront transformed a seasonal arid river into an active urban promenade celebrated with pedestrian bridges and biodiversity parks.",
            "challenge": {
              "type": "photo",
              "question": "Which river flows through the heart of Ahmedabad, dividing the old heritage city from the modern western city?",
              "options": [
                "Sabarmati River",
                "Narmada River",
                "Tapi River",
                "Mahi River"
              ],
              "correctIndex": 0,
              "explanation": "Correct! The sacred Sabarmati River divides the eastern walled city from the western districts of Ahmedabad."
            },
            "xpReward": 25
          }
        ]
      }
    ],
    "hidden": {
      "id": "amd-hidden-vav",
      "name": "Dada Hari ni Vav (Subterranean Water Temple)",
      "clues": [
        "Hidden behind the bustling railway tracks of eastern Asarwa…",
        "It was commissioned in 1485 AD by Bai Harir Sultani, carved entirely into the sandstone earth.",
        "Pass through an understated arched gate where the street noise abruptly vanishes.",
        "Descend five colonnaded pavilion levels into the cool underground sanctuary where Sanskrit and Arabic stone inscriptions rest side-by-side."
      ],
      "xp": 90
    },
    "partners": [
      {
        "id": "amd-p-cafe",
        "name": "Pol Café & Heritage Courtyard",
        "category": "Cafe",
        "location": "Khadia, Old City",
        "experience": "Authentic Gujarati filter chai and warm handvo served in a restored 150-year-old wooden pol courtyard.",
        "reward": "Free Masala Chai & Mukhwas with any completed VISTA quest",
        "code": "VISTACAFE"
      },
      {
        "id": "amd-p-hotel",
        "name": "The Heritage Homestay Haveli",
        "category": "Hotel",
        "location": "Lambha Pol, Old City",
        "experience": "Boutique overnight stay in a carved-wood haveli featuring authentic brass jhula swing and rooftop pol views.",
        "reward": "15% off VISTA Heritage Stays",
        "code": "VISTASTAY"
      },
      {
        "id": "amd-p-shop",
        "name": "Law Garden Bandhani & Mirror Guild",
        "category": "Shop",
        "location": "Law Garden Handicrafts Market",
        "experience": "Handmade tie-dye bandhani dupattas and mirror-work tapestries sourced directly from Kutchi artisan cooperatives.",
        "reward": "Free Handcrafted Bandhani Bookmark + 10% off",
        "code": "VISTACRAFT"
      },
      {
        "id": "amd-p-guide",
        "name": "Ramesh Bhai (AMC Certified 3rd-Gen Guide)",
        "category": "Local Guide",
        "experience": "3rd-generation pol storyteller uncovering secret escape alleys, tankas, and hidden wood carvings.",
        "reward": "Complimentary Heritage Walk Audio Map add-on",
        "code": "VISTAGUIDE"
      },
      {
        "id": "amd-p-artisan",
        "name": "Mata ni Pachedi Traditional Textile Studio",
        "category": "Artisan",
        "location": "Chitrakar Galli, Old City",
        "experience": "Witness 300-year-old sacred kalamkari textile painting on cotton using natural bamboo pens and mineral dyes.",
        "reward": "Miniature Hand-Painted Textile Souvenir",
        "code": "VISTAPACHEDI"
      }
    ],
    "festivals": [
      {
        "name": "Navratri",
        "emoji": "🪔",
        "note": "Nine nights of devotional Garba inside pol courtyards, where entire generations dance under strings of brass lamps."
      },
      {
        "name": "Uttarayan",
        "emoji": "🪁",
        "note": "The International Kite Festival where pol rooftops echo with 'Kai Po Che!' and sky lanterns illuminate the January night."
      },
      {
        "name": "Diwali & New Year",
        "emoji": "✨",
        "note": "Pol havelis glow with thousands of handmade clay diyas, rangoli designs, and dawn greetings of 'Saal Mubarak'."
      }
    ]
  },
  "jaipur": {
    "place": "Jaipur",
    "state": "Rajasthan",
    "blurb": "The Pink City — a grid of rose-washed palaces, bazaars and astronomical wonders.",
    "places": [
      {
        "id": "jai-amber",
        "name": "Amber Fort",
        "category": "Heritage",
        "story": "A hilltop fort-palace of mirror halls and ramparts.",
        "why": "Sheesh Mahal mirrors light up with a single candle.",
        "duration": "90 min",
        "xp": 60,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 28,
        "y": 30
      },
      {
        "id": "jai-jantar",
        "name": "Jantar Mantar",
        "category": "Heritage",
        "story": "18th-century stone instruments that still tell time.",
        "why": "A UNESCO sundial accurate to two seconds.",
        "duration": "45 min",
        "xp": 50,
        "unlock": "10:00",
        "moods": [
          "History"
        ],
        "x": 50,
        "y": 42
      },
      {
        "id": "jai-hawa",
        "name": "Hawa Mahal",
        "category": "Photo",
        "story": "The five-storey wind palace with 953 latticed windows.",
        "why": "The most photographed facade in India.",
        "duration": "30 min",
        "xp": 45,
        "unlock": "09:00",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 45,
        "y": 50
      },
      {
        "id": "jai-bazaar",
        "name": "Johari Bazaar",
        "category": "Shopping",
        "story": "Gem, textile and mojri bazaar in a riot of pink.",
        "why": "Best block-print and jewellery in Rajasthan.",
        "duration": "60 min",
        "xp": 40,
        "unlock": "16:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 52,
        "y": 56
      },
      {
        "id": "jai-dal",
        "name": "Dal Baati Churma Stop",
        "category": "Food",
        "story": "The royal lentil-wheat-clarified-butter trinity.",
        "why": "Rajasthan on a plate, slow-cooked.",
        "duration": "40 min",
        "xp": 40,
        "unlock": "12:00",
        "moods": [
          "Foodie"
        ],
        "x": 60,
        "y": 48
      },
      {
        "id": "jai-night",
        "name": "Chokhi Dhani Nights",
        "category": "Food",
        "story": "A village-themed night fair of food, folk and fire.",
        "why": "All-you-can-eat Rajasthani thali under the stars.",
        "duration": "120 min",
        "xp": 55,
        "unlock": "19:00",
        "moods": [
          "Foodie",
          "Family",
          "Night"
        ],
        "x": 72,
        "y": 68
      },
      {
        "id": "jai-hidden",
        "name": "Panna Meena ka Kund",
        "category": "Hidden",
        "story": "A symmetrical stepwell most maps skip.",
        "why": "A photographer's dream staircase of perfect triangles.",
        "duration": "30 min",
        "xp": 70,
        "unlock": "10:00",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 24,
        "y": 24
      },
      {
        "id": "jai-hotel",
        "name": "Haveli Stay",
        "category": "Hotel",
        "story": "A restored merchant haveli with jharokha windows.",
        "why": "Wake up to a pink-city rooftop sunrise.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 48,
        "y": 60
      }
    ],
    "quests": [
      {
        "id": "jai-q-heritage",
        "title": "Pink Palace Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Pink Pathfinder",
        "stamp": "Palace Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Find Amber Fort",
            "hint": "Head to the hilltop."
          },
          {
            "id": 2,
            "title": "Discover the mirror hall",
            "hint": "Light a candle in Sheesh Mahal."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Who built Jaipur? (Sawai Jai Singh)"
          },
          {
            "id": 4,
            "title": "Mark the palace visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Palace Stamp."
          }
        ]
      },
      {
        "id": "jai-q-food",
        "title": "Royal Thali Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Thali Master",
        "stamp": "Thali Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Order Dal Baati Churma",
            "hint": "Find a thali stop."
          },
          {
            "id": 2,
            "title": "Try a Ghewar",
            "hint": "The disc-shaped festival sweet."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Dal Baati is from which state?"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Thali Stamp."
          }
        ]
      },
      {
        "id": "jai-q-photo",
        "title": "Hawa Frame Quest",
        "category": "Photo",
        "xp": 90,
        "badge": "Lens of Jaipur",
        "stamp": "Frame Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Frame the Hawa Mahal",
            "hint": "Shoot from the cafe opposite."
          },
          {
            "id": 2,
            "title": "Capture the stepwell",
            "hint": "Panna Meena symmetry."
          },
          {
            "id": 3,
            "title": "Submit the challenge",
            "hint": "Mark photo challenge complete."
          },
          {
            "id": 4,
            "title": "Mark the photo spot visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Frame Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "jai-hidden-kund",
      "name": "The Symmetrical Stepwell",
      "clues": [
        "Hidden near a fort, down a quiet lane…",
        "A staircase of perfect triangles…",
        "Most tourists walk past it to the fort…",
        "Find it beside Amber, called Panna Meena."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "jai-p-cafe",
        "name": "Wind View Café",
        "category": "Cafe",
        "location": "Opp. Hawa Mahal",
        "experience": "Lassi with a palace view",
        "reward": "Free lassi with photo quest",
        "code": "QTJAI"
      },
      {
        "id": "jai-p-shop",
        "name": "Block Print Co-op",
        "category": "Shop",
        "location": "Sanganer",
        "experience": "Hand block-printing workshop",
        "reward": "10% off textiles",
        "code": "QTSHOP"
      },
      {
        "id": "jai-p-guide",
        "name": "Royal Storyteller",
        "category": "Local Guide",
        "experience": "Palace history walks",
        "reward": "Free fort add-on",
        "code": "QTGUIDE"
      }
    ],
    "festivals": [
      {
        "name": "Diwali",
        "emoji": "🪔",
        "note": "Pink markets glow with marigold and lamps."
      },
      {
        "name": "Teej",
        "emoji": "🌧️",
        "note": "Monsoon festival with swings and henna."
      },
      {
        "name": "Gangaur",
        "emoji": "🌸",
        "note": "Processions of decorated goddess images."
      }
    ]
  },
  "jodhpur": {
    "place": "Jodhpur",
    "state": "Rajasthan",
    "blurb": "The Blue City — indigo lanes beneath the mighty Mehrangarh.",
    "places": [
      {
        "id": "jod-fort",
        "name": "Mehrangarh Fort",
        "category": "Heritage",
        "story": "A 400-ft cliff fort towering over blue lanes.",
        "why": "One of India's most formidable forts.",
        "duration": "90 min",
        "xp": 60,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 30,
        "y": 28
      },
      {
        "id": "jod-blue",
        "name": "Blue City Lanes",
        "category": "Photo",
        "story": "Indigo-washed houses cascading below the fort.",
        "why": "A blue-on-blue photographer's dream.",
        "duration": "45 min",
        "xp": 50,
        "unlock": "09:00",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 44,
        "y": 44
      },
      {
        "id": "jod-sardar",
        "name": "Sardar Market",
        "category": "Shopping",
        "story": "Bazaar around the clock tower, full of spice and silver.",
        "why": "Best masala and mojri shopping.",
        "duration": "50 min",
        "xp": 40,
        "unlock": "16:00",
        "moods": [
          "Budget",
          "Foodie"
        ],
        "x": 52,
        "y": 52
      },
      {
        "id": "jod-makhani",
        "name": "Dal Makhani Stop",
        "category": "Food",
        "story": "Slow-cooked black lentils in cream — a Jodhpur staple.",
        "why": "Rich, smoky, unforgettable.",
        "duration": "40 min",
        "xp": 40,
        "unlock": "12:00",
        "moods": [
          "Foodie"
        ],
        "x": 58,
        "y": 58
      },
      {
        "id": "jod-night",
        "name": "Rao Jodha Desert Rock Night Walk",
        "category": "Hidden",
        "story": "A guided night walk through a restored rocky park.",
        "why": "Stars, silence and desert flora.",
        "duration": "70 min",
        "xp": 75,
        "unlock": "20:00",
        "moods": [
          "Night",
          "Aesthetic"
        ],
        "x": 26,
        "y": 40
      },
      {
        "id": "jod-hotel",
        "name": "Blue Haveli Stay",
        "category": "Hotel",
        "story": "A rooftop guesthouse in the blue maze.",
        "why": "Sunrise over the blue city.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 48,
        "y": 48
      }
    ],
    "quests": [
      {
        "id": "jod-q-heritage",
        "title": "Blue Fortress Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Cliff Climber",
        "stamp": "Fort Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Climb to Mehrangarh",
            "hint": "Take the winding road up."
          },
          {
            "id": 2,
            "title": "Find the cannon",
            "hint": "The largest in the fort."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Why are the houses blue? (Cooling / Caste / Both)"
          },
          {
            "id": 4,
            "title": "Mark the fort visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Fort Stamp."
          }
        ]
      },
      {
        "id": "jod-q-food",
        "title": "Desert Thali Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Desert Diner",
        "stamp": "Thali Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Order Dal Makhani",
            "hint": "Find a thali stop."
          },
          {
            "id": 2,
            "title": "Try a Mawa Kachori",
            "hint": "The sweet-stuffed Jodhpur classic."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Which lentil is in Dal Makhani? (Urad)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Thali Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "jod-hidden-rock",
      "name": "The Desert Rock",
      "clues": [
        "A park restored from a rocky wasteland…",
        "Best walked after sunset…",
        "Below the fort walls…",
        "Find the Rao Jodha trail."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "jod-p-cafe",
        "name": "Blue Rooftop Café",
        "category": "Cafe",
        "location": "Old City",
        "experience": "Chai over the blue maze",
        "reward": "Free chai with heritage quest",
        "code": "QTJOD"
      },
      {
        "id": "jod-p-guide",
        "name": "Desert Walker",
        "category": "Local Guide",
        "experience": "Night rock walks",
        "reward": "Free night walk add-on",
        "code": "QTGUIDE"
      }
    ],
    "festivals": [
      {
        "name": "Marwar Festival",
        "emoji": "🐴",
        "note": "Folk music and dance celebrating the heroes of Marwar."
      },
      {
        "name": "Diwali",
        "emoji": "🪔",
        "note": "Blue lanes lit with lamps."
      }
    ]
  },
  "bhuj": {
    "place": "Bhuj",
    "state": "Gujarat",
    "blurb": "Gateway to Kutch — white desert, mirror-work villages and a living craft belt.",
    "places": [
      {
        "id": "bhu-aina",
        "name": "Aina Mahal Palace",
        "category": "Heritage",
        "story": "An 18th-century palace with hall-of-mirror walls.",
        "why": "A blend of Indian and European mirror craft.",
        "duration": "45 min",
        "xp": 50,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 40,
        "y": 40
      },
      {
        "id": "bhu-white",
        "name": "Great Rann of Kutch",
        "category": "Photo",
        "story": "A salt marsh that turns into a white desert under the moon.",
        "why": "The largest salt desert in the world.",
        "duration": "120 min",
        "xp": 70,
        "unlock": "16:00",
        "moods": [
          "Photo",
          "Aesthetic",
          "Date"
        ],
        "x": 70,
        "y": 30
      },
      {
        "id": "bhu-nirona",
        "name": "Nirona Craft Village",
        "category": "Shopping",
        "story": "Rogan painting, copper bells and lacquer in one village.",
        "why": "See rare 400-year-old rogan art being made.",
        "duration": "70 min",
        "xp": 55,
        "unlock": "11:00",
        "moods": [
          "Aesthetic",
          "Budget"
        ],
        "x": 30,
        "y": 60
      },
      {
        "id": "bhu-dabeli",
        "name": "Kutchi Dabeli Stop",
        "category": "Food",
        "story": "The spicy-sweet potato burger born in Kutch.",
        "why": "The original dabeli, with pomegranate and peanuts.",
        "duration": "25 min",
        "xp": 35,
        "unlock": "12:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 45,
        "y": 50
      },
      {
        "id": "bhu-rido",
        "name": "Rido Hidden Handicraft Lane",
        "category": "Hidden",
        "story": "A lane of mirror-work artisans off the main road.",
        "why": "Buy embroidery direct from the makers.",
        "duration": "40 min",
        "xp": 70,
        "unlock": "10:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 35,
        "y": 55
      },
      {
        "id": "bhu-tent",
        "name": "White Rann Tent City",
        "category": "Hotel",
        "story": "A tented desert resort for Rann Utsav.",
        "why": "Sleep under the white desert moon.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic",
          "Family"
        ],
        "x": 65,
        "y": 35
      }
    ],
    "quests": [
      {
        "id": "bhu-q-heritage",
        "title": "Mirror Palace Quest",
        "category": "Heritage",
        "xp": 110,
        "badge": "Kutch Explorer",
        "stamp": "Rann Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Visit Aina Mahal",
            "hint": "Find the mirror palace."
          },
          {
            "id": 2,
            "title": "Discover rogan art",
            "hint": "Head to Nirona."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: The Rann is made of? (Salt)"
          },
          {
            "id": 4,
            "title": "Mark the palace visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Rann Stamp."
          }
        ]
      },
      {
        "id": "bhu-q-food",
        "title": "Dabeli Trail",
        "category": "Food",
        "xp": 90,
        "badge": "Dabeli Devotee",
        "stamp": "Dabeli Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Find a dabeli cart",
            "hint": "Lunchtime in Bhuj."
          },
          {
            "id": 2,
            "title": "Order with extra peanuts",
            "hint": "The Kutchi way."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Dabeli was born in? (Kutch)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Dabeli Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "bhu-hidden-lane",
      "name": "The Mirror Lane",
      "clues": [
        "Off the main road, a lane of embroidery…",
        "Mirror-work hangs on every door…",
        "Ask for Rido village…",
        "Find the artisans themselves."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "bhu-p-artisan",
        "name": "Nirona Rogan Artist",
        "category": "Artisan",
        "location": "Nirona",
        "experience": "Watch 400-year-old rogan painting",
        "reward": "Free mini rogan card",
        "code": "QTBHU"
      },
      {
        "id": "bhu-p-tent",
        "name": "Rann Tent City",
        "category": "Hotel",
        "location": "Dhordo",
        "experience": "Desert tent nights",
        "reward": "10% off QuestTrail stays",
        "code": "QTHOME"
      }
    ],
    "festivals": [
      {
        "name": "Rann Utsav",
        "emoji": "🌙",
        "note": "A carnival on the white desert each winter."
      },
      {
        "name": "Navratri",
        "emoji": "🪔",
        "note": "Garba under the Kutch sky."
      }
    ]
  },
  "surat": {
    "place": "Surat",
    "state": "Gujarat",
    "blurb": "The Diamond City — a textile and street-food powerhouse on the Tapi.",
    "places": [
      {
        "id": "sur-dutch",
        "name": "Dutch Garden",
        "category": "Heritage",
        "story": "A colonial-era garden with old tombs and old trees.",
        "why": "A quiet slice of Surat's trading past.",
        "duration": "40 min",
        "xp": 45,
        "unlock": "10:00",
        "moods": [
          "History",
          "Chill"
        ],
        "x": 35,
        "y": 40
      },
      {
        "id": "sur-textile",
        "name": "Textile Market",
        "category": "Shopping",
        "story": "One of India's largest fabric bazaars.",
        "why": "Wholesale silks, sarees and dress material.",
        "duration": "60 min",
        "xp": 40,
        "unlock": "16:00",
        "moods": [
          "Budget"
        ],
        "x": 55,
        "y": 48
      },
      {
        "id": "sur-undhiyu",
        "name": "Surati Undhiyu Stop",
        "category": "Food",
        "story": "The mixed-winter-vegetable classic, Surat-style.",
        "why": "Surat's gift to Gujarati cuisine.",
        "duration": "40 min",
        "xp": 40,
        "unlock": "12:00",
        "moods": [
          "Foodie"
        ],
        "x": 45,
        "y": 55
      },
      {
        "id": "sur-ghari",
        "name": "Ghari Sweet Shop",
        "category": "Food",
        "story": "Surat's signature sweet — rich, stuffed, festival-only.",
        "why": "You haven't tasted Surat without a Ghari.",
        "duration": "25 min",
        "xp": 35,
        "unlock": "08:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 50,
        "y": 60
      },
      {
        "id": "sur-dumas",
        "name": "Dumas Beach",
        "category": "Photo",
        "story": "A black-sand beach famous for snacks and sunsets.",
        "why": "Tomato-bhaji and the Arabian sea.",
        "duration": "70 min",
        "xp": 45,
        "unlock": "17:00",
        "moods": [
          "Photo",
          "Chill",
          "Date"
        ],
        "x": 70,
        "y": 65
      },
      {
        "id": "sur-night",
        "name": "Late-night Locho",
        "category": "Food",
        "story": "A Surat-only steamed snack sold till 2 AM.",
        "why": "The ultimate night food of Surat.",
        "duration": "25 min",
        "xp": 50,
        "unlock": "22:00",
        "moods": [
          "Foodie",
          "Night"
        ],
        "x": 48,
        "y": 50
      },
      {
        "id": "sur-hotel",
        "name": "Tapi Riverside Stay",
        "category": "Hotel",
        "story": "A riverside boutique hotel near the old city.",
        "why": "Walk to both markets and the river.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 40,
        "y": 45
      }
    ],
    "quests": [
      {
        "id": "sur-q-food",
        "title": "Surati Sweet Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Ghari Gourmand",
        "stamp": "Sweet Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Find a Ghari shop",
            "hint": "Ask for the original Ghari."
          },
          {
            "id": 2,
            "title": "Try a Locho",
            "hint": "Surat's steamed snack."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Ghari is famous in which city? (Surat)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Sweet Stamp."
          }
        ]
      },
      {
        "id": "sur-q-photo",
        "title": "Sunset Beach Quest",
        "category": "Photo",
        "xp": 90,
        "badge": "Lens of Surat",
        "stamp": "Frame Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Reach Dumas Beach",
            "hint": "Before sunset."
          },
          {
            "id": 2,
            "title": "Shoot the black sand",
            "hint": "Long exposure if you can."
          },
          {
            "id": 3,
            "title": "Submit the challenge",
            "hint": "Mark photo challenge complete."
          },
          {
            "id": 4,
            "title": "Mark the photo spot visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Frame Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "sur-hidden-locho",
      "name": "The Midnight Locho",
      "clues": [
        "A snack sold only after dark…",
        "Steamed, not fried…",
        "Surat's own, nowhere else…",
        "Find a late-night locho cart."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "sur-p-cafe",
        "name": "Dumas Beach Café",
        "category": "Cafe",
        "location": "Dumas",
        "experience": "Tomato bhaji by the sea",
        "reward": "Free bhaji with food quest",
        "code": "QTSUR"
      },
      {
        "id": "sur-p-shop",
        "name": "Textile Souk",
        "category": "Shop",
        "location": "Ring Road",
        "experience": "Wholesale fabric tour",
        "reward": "10% off dress material",
        "code": "QTSHOP"
      }
    ],
    "festivals": [
      {
        "name": "Navratri",
        "emoji": "🪔",
        "note": "Garba nights across Surat."
      },
      {
        "name": "Uttarayan",
        "emoji": "🪁",
        "note": "Kite festival on the Tapi banks."
      }
    ]
  },
  "kochi": {
    "place": "Kochi",
    "state": "Kerala",
    "blurb": "The Queen of the Arabian Sea — Chinese nets, spice ports and backwaters.",
    "places": [
      {
        "id": "koc-fort",
        "name": "Fort Kochi Streets",
        "category": "Heritage",
        "story": "Colonial bungalows, art cafes and street murals.",
        "why": "A walk through five centuries of trade.",
        "duration": "75 min",
        "xp": 55,
        "unlock": "10:00",
        "moods": [
          "History",
          "Aesthetic"
        ],
        "x": 30,
        "y": 40
      },
      {
        "id": "koc-nets",
        "name": "Chinese Fishing Nets",
        "category": "Photo",
        "story": "Huge cantilevered nets lowered at sunset.",
        "why": "A 600-year-old silhouette against the sea.",
        "duration": "40 min",
        "xp": 50,
        "unlock": "17:00",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 45,
        "y": 30
      },
      {
        "id": "koc-jewtown",
        "name": "Jew Town Bazaar",
        "category": "Shopping",
        "story": "Antiques and spices in a 400-year-old lane.",
        "why": "Scented with cardamom and history.",
        "duration": "50 min",
        "xp": 40,
        "unlock": "16:00",
        "moods": [
          "Budget",
          "Aesthetic"
        ],
        "x": 38,
        "y": 50
      },
      {
        "id": "koc-sadya",
        "name": "Kerala Sadya Stop",
        "category": "Food",
        "story": "A banana-leaf feast of 20+ dishes, eaten by hand.",
        "why": "Kerala on a leaf — pure, balanced, festive.",
        "duration": "50 min",
        "xp": 45,
        "unlock": "12:00",
        "moods": [
          "Foodie",
          "Family"
        ],
        "x": 55,
        "y": 55
      },
      {
        "id": "koc-backwater",
        "name": "Backwater Canal Ride",
        "category": "Hidden",
        "story": "A quiet canoe through village canals away from the crowds.",
        "why": "The real Kerala — palm, kingfisher, silence.",
        "duration": "90 min",
        "xp": 75,
        "unlock": "10:00",
        "moods": [
          "Aesthetic",
          "Date",
          "Chill"
        ],
        "x": 65,
        "y": 60
      },
      {
        "id": "koc-kathakali",
        "name": "Kathakali Show",
        "category": "Heritage",
        "story": "A classical dance-drama with painted faces and eye-language.",
        "why": "Watch a performer's eyes tell a whole epic.",
        "duration": "60 min",
        "xp": 55,
        "unlock": "18:00",
        "moods": [
          "Aesthetic",
          "History"
        ],
        "x": 50,
        "y": 45
      },
      {
        "id": "koc-hotel",
        "name": "Backwater Homestay",
        "category": "Hotel",
        "story": "A family homestay on a canal with a canoe.",
        "why": "Wake up to the sound of water and birds.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic",
          "Chill"
        ],
        "x": 60,
        "y": 65
      }
    ],
    "quests": [
      {
        "id": "koc-q-heritage",
        "title": "Spice Port Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Spice Navigator",
        "stamp": "Port Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Walk Fort Kochi",
            "hint": "Start at the colonial church."
          },
          {
            "id": 2,
            "title": "Find the Chinese nets",
            "hint": "At the water's edge."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Kochi's nickname? (Queen of Arabian Sea)"
          },
          {
            "id": 4,
            "title": "Mark the port visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Port Stamp."
          }
        ]
      },
      {
        "id": "koc-q-food",
        "title": "Sadya Leaf Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Sadya Sage",
        "stamp": "Sadya Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Order a Sadya",
            "hint": "On a banana leaf."
          },
          {
            "id": 2,
            "title": "Try the payasam",
            "hint": "The sweet finish."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: How many dishes in a sadya? (20+)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Sadya Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "koc-hidden-canal",
      "name": "The Quiet Canal",
      "clues": [
        "Away from the tourist boats…",
        "A canoe, not a houseboat…",
        "Past a village of palm…",
        "Find the village canal ride."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "koc-p-cafe",
        "name": "Kashi Art Café",
        "category": "Cafe",
        "location": "Fort Kochi",
        "experience": "Art-cafe brunch",
        "reward": "Free coffee with heritage quest",
        "code": "QTKOC"
      },
      {
        "id": "koc-p-guide",
        "name": "Backwater Boatman",
        "category": "Local Guide",
        "experience": "Village canoe rides",
        "reward": "Free canal add-on",
        "code": "QTGUIDE"
      }
    ],
    "festivals": [
      {
        "name": "Onam",
        "emoji": "🌺",
        "note": "Ten days of flowers, feasts and boat races."
      },
      {
        "name": "Cochin Carnival",
        "emoji": "🎉",
        "note": "New Year carnival on Fort Kochi beach."
      }
    ]
  },
  "amritsar": {
    "place": "Amritsar",
    "state": "Punjab",
    "blurb": "The Golden City — the holiest Sikh shrine and the heart of Punjabi food.",
    "places": [
      {
        "id": "ami-temple",
        "name": "Golden Temple",
        "category": "Heritage",
        "story": "A gilded gurdwara mirrored in a holy pool.",
        "why": "Free langar feeds 100,000 daily — faith in action.",
        "duration": "90 min",
        "xp": 70,
        "unlock": "05:00",
        "moods": [
          "History",
          "Aesthetic"
        ],
        "x": 35,
        "y": 40
      },
      {
        "id": "ami-jallianwala",
        "name": "Jallianwala Bagh",
        "category": "Heritage",
        "story": "A memorial garden to a 1919 massacre.",
        "why": "A sombre, important piece of India's freedom story.",
        "duration": "40 min",
        "xp": 50,
        "unlock": "10:00",
        "moods": [
          "History"
        ],
        "x": 40,
        "y": 45
      },
      {
        "id": "ami-langar",
        "name": "Langar Kitchen",
        "category": "Food",
        "story": "Volunteer-run kitchen feeding all, free, equally.",
        "why": "Sit on the floor and eat together — no caste, no class.",
        "duration": "50 min",
        "xp": 50,
        "unlock": "11:00",
        "moods": [
          "Foodie",
          "Family"
        ],
        "x": 38,
        "y": 42
      },
      {
        "id": "ami-kulcha",
        "name": "Amritsari Kulcha Stop",
        "category": "Food",
        "story": "Stuffed bread with chickpea and chutney, Amritsar-style.",
        "why": "The crispy, buttery breakfast of legends.",
        "duration": "30 min",
        "xp": 40,
        "unlock": "08:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 50,
        "y": 55
      },
      {
        "id": "ami-wagah",
        "name": "Wagah Border Retreat",
        "category": "Photo",
        "story": "A daily flag-lowering ceremony with crowd cheers.",
        "why": "A loud, patriotic, unforgettable spectacle.",
        "duration": "120 min",
        "xp": 55,
        "unlock": "16:00",
        "moods": [
          "Photo",
          "Family"
        ],
        "x": 72,
        "y": 30
      },
      {
        "id": "ami-night",
        "name": "Night Food Street",
        "category": "Food",
        "story": "Tandoori chicken and lassi stalls glowing till midnight.",
        "why": "Punjabi food at its loudest, best, after dark.",
        "duration": "60 min",
        "xp": 50,
        "unlock": "20:00",
        "moods": [
          "Foodie",
          "Night"
        ],
        "x": 55,
        "y": 50
      },
      {
        "id": "ami-hidden",
        "name": "Hidden Bazaar Sweets",
        "category": "Hidden",
        "story": "A tiny shop selling pinni — winter energy sweets.",
        "why": "A local secret for the best pinni in town.",
        "duration": "25 min",
        "xp": 70,
        "unlock": "10:00",
        "moods": [
          "Foodie"
        ],
        "x": 45,
        "y": 60
      },
      {
        "id": "ami-hotel",
        "name": "Heritage Gurdwara Stay",
        "category": "Hotel",
        "story": "A clean, simple stay near the temple.",
        "why": "Wake before dawn for the temple hymns.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 36,
        "y": 38
      }
    ],
    "quests": [
      {
        "id": "ami-q-heritage",
        "title": "Golden Temple Quest",
        "category": "Heritage",
        "xp": 130,
        "badge": "Seva Seeker",
        "stamp": "Golden Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Cover your head and enter",
            "hint": "A scarf is provided free."
          },
          {
            "id": 2,
            "title": "Volunteer in the langar",
            "hint": "Help roll rotis for an hour."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Langar serves how many daily? (100,000)"
          },
          {
            "id": 4,
            "title": "Mark the temple visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Golden Stamp."
          }
        ]
      },
      {
        "id": "ami-q-food",
        "title": "Kulcha & Lassi Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Kulcha King",
        "stamp": "Kulcha Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Find a kulcha shop",
            "hint": "Before 11 AM for the freshest."
          },
          {
            "id": 2,
            "title": "Order a lassi",
            "hint": "Thick, creamy, in a steel glass."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Lassi is made of? (Yoghurt)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Kulcha Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "ami-hidden-pinni",
      "name": "The Pinni Shop",
      "clues": [
        "A tiny sweet shop in a side lane…",
        "Selling winter energy balls…",
        "Made of desi ghee and jaggery…",
        "Ask a local for the pinni shop."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "ami-p-cafe",
        "name": "Lassi Corner",
        "category": "Cafe",
        "location": "Near Temple",
        "experience": "Thick sweet lassi",
        "reward": "Free lassi with food quest",
        "code": "QTAMI"
      },
      {
        "id": "ami-p-guide",
        "name": "Punjabi Storyteller",
        "category": "Local Guide",
        "experience": "Heritage walks",
        "reward": "Free temple add-on",
        "code": "QTGUIDE"
      }
    ],
    "festivals": [
      {
        "name": "Baisakhi",
        "emoji": "🌾",
        "note": "The harvest festival of Punjab."
      },
      {
        "name": "Gurpurab",
        "emoji": "🪔",
        "note": "Guru Nanak's birthday, the temple aglow."
      }
    ]
  },
  "kolkata": {
    "place": "Kolkata",
    "state": "West Bengal",
    "blurb": "The City of Joy — colonial grandeur, adda culture and the sweetest streets.",
    "places": [
      {
        "id": "kol-victoria",
        "name": "Victoria Memorial",
        "category": "Heritage",
        "story": "A marble palace to an empress, now a museum.",
        "why": "The icon of colonial Calcutta.",
        "duration": "70 min",
        "xp": 55,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 30,
        "y": 35
      },
      {
        "id": "kol-howrah",
        "name": "Howrah Bridge",
        "category": "Photo",
        "story": "A cantilever bridge carrying millions daily.",
        "why": "The steel spine of the city at any hour.",
        "duration": "30 min",
        "xp": 45,
        "unlock": "06:00",
        "moods": [
          "Photo"
        ],
        "x": 50,
        "y": 30
      },
      {
        "id": "kol-rosogolla",
        "name": "Rosogolla Stop",
        "category": "Food",
        "story": "The spongy syrup-soaked ball born in Bengal.",
        "why": "Bengal's proudest sweet, fresh and warm.",
        "duration": "25 min",
        "xp": 40,
        "unlock": "10:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 45,
        "y": 50
      },
      {
        "id": "kol-kathi",
        "name": "Kathi Roll Lane",
        "category": "Food",
        "story": "Flaky paratha wrapped around kebab and egg.",
        "why": "The original Kolkata roll — street food royalty.",
        "duration": "25 min",
        "xp": 40,
        "unlock": "12:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 55,
        "y": 55
      },
      {
        "id": "kol-college",
        "name": "College Street Books",
        "category": "Shopping",
        "story": "A mile of second-hand book stalls and coffee houses.",
        "why": "India's largest book bazaar and adda culture.",
        "duration": "60 min",
        "xp": 45,
        "unlock": "16:00",
        "moods": [
          "Aesthetic",
          "Budget"
        ],
        "x": 40,
        "y": 60
      },
      {
        "id": "kol-night",
        "name": "Night Tram Ride",
        "category": "Hidden",
        "story": "A rattling heritage tram through empty night streets.",
        "why": "A vanishing, magical way to see the city.",
        "duration": "40 min",
        "xp": 75,
        "unlock": "21:00",
        "moods": [
          "Night",
          "Aesthetic"
        ],
        "x": 48,
        "y": 45
      },
      {
        "id": "kol-hotel",
        "name": "Colonial Boutique Stay",
        "category": "Hotel",
        "story": "A restored colonial-era guesthouse in BBD Bagh.",
        "why": "High ceilings, old fans, new comfort.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 42,
        "y": 40
      }
    ],
    "quests": [
      {
        "id": "kol-q-food",
        "title": "Sweet & Roll Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Bhadralok Foodie",
        "stamp": "Mishti Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Eat a rosogolla",
            "hint": "Fresh from a sweet shop."
          },
          {
            "id": 2,
            "title": "Wrap a kathi roll",
            "hint": "Find a roll joint."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Rosogolla origin? (Bengal)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Mishti Stamp."
          }
        ]
      },
      {
        "id": "kol-q-heritage",
        "title": "Colonial Calcutta Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Heritage Walker",
        "stamp": "Heritage Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Visit Victoria Memorial",
            "hint": "Marble and gardens."
          },
          {
            "id": 2,
            "title": "Walk College Street",
            "hint": "Books and coffee."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Kolkata's old name? (Calcutta)"
          },
          {
            "id": 4,
            "title": "Mark the place visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Heritage Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "kol-hidden-tram",
      "name": "The Night Tram",
      "clues": [
        "A vanishing vehicle…",
        "Rattling on steel tracks…",
        "Best ridden after dark…",
        "Find a heritage tram route."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "kol-p-cafe",
        "name": "Indian Coffee House",
        "category": "Cafe",
        "location": "College Street",
        "experience": "Adda over coffee since 1942",
        "reward": "Free coffee with heritage quest",
        "code": "QTKOL"
      },
      {
        "id": "kol-p-shop",
        "name": "Book Bazaar",
        "category": "Shop",
        "location": "College Street",
        "experience": "Second-hand book hunt",
        "reward": "10% off books",
        "code": "QTSHOP"
      }
    ],
    "festivals": [
      {
        "name": "Durga Puja",
        "emoji": "🙏",
        "note": "The city becomes one giant art gallery of goddess pandals."
      },
      {
        "name": "Kali Puja",
        "emoji": "🪔",
        "note": "Diwali night, Bengal-style, devoted to Kali."
      }
    ]
  },
  "varanasi": {
    "place": "Varanasi",
    "state": "Uttar Pradesh",
    "blurb": "The oldest living city — ghats, aarti fire and the eternal Ganges.",
    "places": [
      {
        "id": "var-dasaswamedh",
        "name": "Dasaswamedh Ghat",
        "category": "Heritage",
        "story": "The main ghat where the evening aarti blazes.",
        "why": "The spiritual centre of the world's oldest city.",
        "duration": "60 min",
        "xp": 60,
        "unlock": "17:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 40,
        "y": 40
      },
      {
        "id": "var-aarti",
        "name": "Ganga Aarti",
        "category": "Photo",
        "story": "Seven priests with lamps, smoke and chant.",
        "why": "A river of fire and devotion at dusk.",
        "duration": "45 min",
        "xp": 55,
        "unlock": "18:30",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 42,
        "y": 45
      },
      {
        "id": "var-chaat",
        "name": "Kachori Sabzi & Chaat",
        "category": "Food",
        "story": "Spiced potato gravy with crisp kachori, Banaras-style.",
        "why": "The breakfast of pilgrims and poets.",
        "duration": "30 min",
        "xp": 40,
        "unlock": "07:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 50,
        "y": 50
      },
      {
        "id": "var-thandai",
        "name": "Thandai Stop",
        "category": "Food",
        "story": "A spiced milk drink with almond, saffron and rose.",
        "why": "Banaras in a glass — cool, fragrant, ancient.",
        "duration": "20 min",
        "xp": 35,
        "unlock": "10:00",
        "moods": [
          "Foodie"
        ],
        "x": 55,
        "y": 55
      },
      {
        "id": "var-silk",
        "name": "Silk Weaving Lane",
        "category": "Shopping",
        "story": "Hidden workshops weaving real Banarasi silk sarees.",
        "why": "See gold-thread weaving up close.",
        "duration": "50 min",
        "xp": 45,
        "unlock": "11:00",
        "moods": [
          "Aesthetic",
          "Budget"
        ],
        "x": 35,
        "y": 55
      },
      {
        "id": "var-boat",
        "name": "Dawn Boat Ride",
        "category": "Hidden",
        "story": "A silent boat past the ghats as the city wakes.",
        "why": "The single best way to understand Banaras.",
        "duration": "60 min",
        "xp": 75,
        "unlock": "05:00",
        "moods": [
          "Aesthetic",
          "Chill",
          "Photo"
        ],
        "x": 45,
        "y": 35
      },
      {
        "id": "var-night",
        "name": "Night Ghat Walk",
        "category": "Hidden",
        "story": "A walk along the lit ghats after the crowds leave.",
        "why": "Silence, reflection and the river at night.",
        "duration": "50 min",
        "xp": 70,
        "unlock": "21:00",
        "moods": [
          "Night",
          "Aesthetic"
        ],
        "x": 38,
        "y": 48
      },
      {
        "id": "var-hotel",
        "name": "Ghat-side Guesthouse",
        "category": "Hotel",
        "story": "A rooftop guesthouse above the river.",
        "why": "Watch the aarti from your own window.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 44,
        "y": 42
      }
    ],
    "quests": [
      {
        "id": "var-q-heritage",
        "title": "Eternal Ghat Quest",
        "category": "Heritage",
        "xp": 130,
        "badge": "Ganga Pilgrim",
        "stamp": "Ganga Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Reach Dasaswamedh Ghat",
            "hint": "Before the aarti."
          },
          {
            "id": 2,
            "title": "Take a dawn boat",
            "hint": "Before sunrise."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Varanasi is on which river? (Ganga)"
          },
          {
            "id": 4,
            "title": "Mark the ghat visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Ganga Stamp."
          }
        ]
      },
      {
        "id": "var-q-food",
        "title": "Banaras Breakfast Quest",
        "category": "Food",
        "xp": 100,
        "badge": "Chaat Champion",
        "stamp": "Chaat Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Eat Kachori Sabzi",
            "hint": "Before 9 AM."
          },
          {
            "id": 2,
            "title": "Drink a Thandai",
            "hint": "At a famous stall."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Thandai base? (Milk)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Chaat Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "var-hidden-boat",
      "name": "The Dawn Boat",
      "clues": [
        "Before the sun, before the crowds…",
        "A wooden boat on a holy river…",
        "Past every ghat, one by one…",
        "Find a boatman before 5 AM."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "var-p-cafe",
        "name": "Blue Lassi Shop",
        "category": "Cafe",
        "location": "Near ghat",
        "experience": "Thick lassi in clay cups",
        "reward": "Free lassi with food quest",
        "code": "QTVAR"
      },
      {
        "id": "var-p-guide",
        "name": "Boatman Baba",
        "category": "Local Guide",
        "experience": "Dawn boat rides",
        "reward": "Free boat add-on",
        "code": "QTGUIDE"
      }
    ],
    "festivals": [
      {
        "name": "Dev Deepawali",
        "emoji": "🪔",
        "note": "The ghats lit with a million lamps, 15 days after Diwali."
      },
      {
        "name": "Ganga Dussehra",
        "emoji": "🌊",
        "note": "The day the Ganga descended to earth."
      }
    ]
  },
  "mumbai": {
    "place": "Mumbai",
    "state": "Maharashtra",
    "blurb": "The city of dreams — sea, cinema and a relentless, welcoming energy.",
    "places": [
      {
        "id": "mum-gateway",
        "name": "Gateway of India",
        "category": "Heritage",
        "story": "A basalt arch facing the harbour.",
        "why": "Mumbai's most famous postcard.",
        "duration": "40 min",
        "xp": 50,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 35,
        "y": 45
      },
      {
        "id": "mum-cst",
        "name": "CSMT Station",
        "category": "Heritage",
        "story": "A Gothic cathedral of a railway, still running.",
        "why": "A UNESCO station moving 3 million a day.",
        "duration": "30 min",
        "xp": 45,
        "unlock": "06:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 45,
        "y": 35
      },
      {
        "id": "mum-vada",
        "name": "Vada Pav Stop",
        "category": "Food",
        "story": "Spiced potato fritter in a bun — Mumbai's burger.",
        "why": "The fuel of the city, for ₹20.",
        "duration": "15 min",
        "xp": 35,
        "unlock": "08:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 50,
        "y": 50
      },
      {
        "id": "mum-colaba",
        "name": "Colaba Causeway",
        "category": "Shopping",
        "story": "A street of bangles, books and bargains.",
        "why": "The best street shopping in south Mumbai.",
        "duration": "60 min",
        "xp": 40,
        "unlock": "16:00",
        "moods": [
          "Budget"
        ],
        "x": 38,
        "y": 55
      },
      {
        "id": "mum-marine",
        "name": "Marine Drive Sunset",
        "category": "Photo",
        "story": "A 3km curving promenade called the Queen's Necklace.",
        "why": "The city's evening ritual by the sea.",
        "duration": "60 min",
        "xp": 50,
        "unlock": "17:30",
        "moods": [
          "Photo",
          "Chill",
          "Date"
        ],
        "x": 55,
        "y": 60
      },
      {
        "id": "mum-banganga",
        "name": "Banganga Tank",
        "category": "Hidden",
        "story": "An ancient sacred tank hidden in Walkeshwar.",
        "why": "A 1000-year-old silence in the middle of Mumbai.",
        "duration": "40 min",
        "xp": 75,
        "unlock": "10:00",
        "moods": [
          "History",
          "Aesthetic"
        ],
        "x": 30,
        "y": 30
      },
      {
        "id": "mum-night",
        "name": "Mohammed Ali Road Night Food",
        "category": "Food",
        "story": "Ramzan-night grills, malpua and crowds.",
        "why": "The loudest, smokiest, best night food.",
        "duration": "60 min",
        "xp": 55,
        "unlock": "21:00",
        "moods": [
          "Foodie",
          "Night"
        ],
        "x": 48,
        "y": 42
      },
      {
        "id": "mum-hotel",
        "name": "Heritage Sea-facing Stay",
        "category": "Hotel",
        "story": "A restored Art Deco hotel on the marine drive.",
        "why": "Wake to the sound of the Arabian sea.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 52,
        "y": 58
      }
    ],
    "quests": [
      {
        "id": "mum-q-food",
        "title": "Vada Pav Quest",
        "category": "Food",
        "xp": 90,
        "badge": "Street Food Star",
        "stamp": "Vada Pav Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Find a vada pav cart",
            "hint": "Any corner of the city."
          },
          {
            "id": 2,
            "title": "Eat with the red chutney",
            "hint": "The Mumbai way."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Vada pav cost? (~₹20)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Vada Pav Stamp."
          }
        ]
      },
      {
        "id": "mum-q-heritage",
        "title": "Art Deco Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Deco Walker",
        "stamp": "Deco Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Visit the Gateway",
            "hint": "By the harbour."
          },
          {
            "id": 2,
            "title": "Walk Marine Drive",
            "hint": "At sunset."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Marine Drive nickname? (Queen's Necklace)"
          },
          {
            "id": 4,
            "title": "Mark the place visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Deco Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "mum-hidden-banganga",
      "name": "The Sacred Tank",
      "clues": [
        "Hidden above the city noise…",
        "A tank said to hold Ganga water…",
        "In Walkeshwar, past the temples…",
        "Find Banganga Tank."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "mum-p-cafe",
        "name": "Irani Café",
        "category": "Cafe",
        "location": "Fort",
        "experience": "Bun-maska and chai",
        "reward": "Free chai with food quest",
        "code": "QTMUM"
      },
      {
        "id": "mum-p-guide",
        "name": "Heritage Walks Mumbai",
        "category": "Local Guide",
        "experience": "Art Deco walks",
        "reward": "Free walk add-on",
        "code": "QTGUIDE"
      }
    ],
    "festivals": [
      {
        "name": "Ganesh Chaturthi",
        "emoji": "🐘",
        "note": "The city becomes a river of processions and idols."
      },
      {
        "name": "Kala Ghoda Arts",
        "emoji": "🎨",
        "note": "A street arts festival in south Mumbai."
      }
    ]
  },
  "mysuru": {
    "place": "Mysuru",
    "state": "Karnataka",
    "blurb": "The royal city — a palace of gold, sandalwood and silk.",
    "places": [
      {
        "id": "mys-palace",
        "name": "Mysore Palace",
        "category": "Heritage",
        "story": "An Indo-Saracenic palace lit by 97,000 bulbs on Sundays.",
        "why": "The jewel of the Wodeyar dynasty.",
        "duration": "75 min",
        "xp": 60,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 38,
        "y": 42
      },
      {
        "id": "mys-market",
        "name": "Devaraja Market",
        "category": "Shopping",
        "story": "A 130-year-old market of flowers, sandalwood and incense.",
        "why": "The scent and colour of old Mysuru.",
        "duration": "50 min",
        "xp": 45,
        "unlock": "16:00",
        "moods": [
          "Aesthetic",
          "Budget"
        ],
        "x": 48,
        "y": 50
      },
      {
        "id": "mys-dosa",
        "name": "Mysore Masala Dosa",
        "category": "Food",
        "story": "A crisp dosa with a fiery red chutney inside.",
        "why": "The dosa that wears the city's name.",
        "duration": "30 min",
        "xp": 40,
        "unlock": "08:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 55,
        "y": 55
      },
      {
        "id": "mys-chamundi",
        "name": "Chamundi Hill",
        "category": "Photo",
        "story": "A hilltop temple above the city.",
        "why": "Sunrise over all of Mysuru.",
        "duration": "70 min",
        "xp": 50,
        "unlock": "06:00",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 30,
        "y": 28
      },
      {
        "id": "mys-silk",
        "name": "Silk Weaving Lane",
        "category": "Hidden",
        "story": "Workshops weaving pure Mysore silk sarees.",
        "why": "See the gold border woven by hand.",
        "duration": "45 min",
        "xp": 70,
        "unlock": "11:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 60,
        "y": 60
      },
      {
        "id": "mys-hotel",
        "name": "Heritage Heritage Stay",
        "category": "Hotel",
        "story": "A restored royal guesthouse near the palace.",
        "why": "Old-world Mysuru charm.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 40,
        "y": 48
      }
    ],
    "quests": [
      {
        "id": "mys-q-heritage",
        "title": "Royal Palace Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Palace Patron",
        "stamp": "Palace Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Visit Mysore Palace",
            "hint": "On a Sunday for the lights."
          },
          {
            "id": 2,
            "title": "Climb Chamundi Hill",
            "hint": "1000 steps or a road."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Mysuru famous for? (Palace/Silk/Sandalwood)"
          },
          {
            "id": 4,
            "title": "Mark the palace visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Palace Stamp."
          }
        ]
      },
      {
        "id": "mys-q-food",
        "title": "Dosa Quest",
        "category": "Food",
        "xp": 90,
        "badge": "Dosa Devotee",
        "stamp": "Dosa Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Order a Mysore Masala Dosa",
            "hint": "With red chutney."
          },
          {
            "id": 2,
            "title": "Pair with filter coffee",
            "hint": "The Karnataka way."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Dosa made of? (Rice & urad)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Dosa Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "mys-hidden-silk",
      "name": "The Silk Lane",
      "clues": [
        "A lane of clacking looms…",
        "Pure silk with a gold border…",
        "The city's namesake weave…",
        "Find the Mysore silk workshops."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "mys-p-cafe",
        "name": "Filter Coffee House",
        "category": "Cafe",
        "location": "Near palace",
        "experience": "South-Indian filter coffee",
        "reward": "Free coffee with food quest",
        "code": "QTMYS"
      },
      {
        "id": "mys-p-shop",
        "name": "Sandalwood Co-op",
        "category": "Shop",
        "location": "Devaraja Market",
        "experience": "Sandalwood and incense",
        "reward": "10% off sandalwood",
        "code": "QTSHOP"
      }
    ],
    "festivals": [
      {
        "name": "Mysuru Dasara",
        "emoji": "👑",
        "note": "Ten days of palace lights, processions and the golden throne."
      },
      {
        "name": "Yoga Day",
        "emoji": "🧘",
        "note": "The yoga capital celebrates worldwide."
      }
    ]
  },
  "mysore": {
    "place": "Mysuru",
    "state": "Karnataka",
    "blurb": "The royal city — a palace of gold, sandalwood and silk.",
    "places": [
      {
        "id": "mys-palace",
        "name": "Mysore Palace",
        "category": "Heritage",
        "story": "An Indo-Saracenic palace lit by 97,000 bulbs on Sundays.",
        "why": "The jewel of the Wodeyar dynasty.",
        "duration": "75 min",
        "xp": 60,
        "unlock": "10:00",
        "moods": [
          "History",
          "Photo"
        ],
        "x": 38,
        "y": 42
      },
      {
        "id": "mys-market",
        "name": "Devaraja Market",
        "category": "Shopping",
        "story": "A 130-year-old market of flowers, sandalwood and incense.",
        "why": "The scent and colour of old Mysuru.",
        "duration": "50 min",
        "xp": 45,
        "unlock": "16:00",
        "moods": [
          "Aesthetic",
          "Budget"
        ],
        "x": 48,
        "y": 50
      },
      {
        "id": "mys-dosa",
        "name": "Mysore Masala Dosa",
        "category": "Food",
        "story": "A crisp dosa with a fiery red chutney inside.",
        "why": "The dosa that wears the city's name.",
        "duration": "30 min",
        "xp": 40,
        "unlock": "08:00",
        "moods": [
          "Foodie",
          "Budget"
        ],
        "x": 55,
        "y": 55
      },
      {
        "id": "mys-chamundi",
        "name": "Chamundi Hill",
        "category": "Photo",
        "story": "A hilltop temple above the city.",
        "why": "Sunrise over all of Mysuru.",
        "duration": "70 min",
        "xp": 50,
        "unlock": "06:00",
        "moods": [
          "Photo",
          "Aesthetic"
        ],
        "x": 30,
        "y": 28
      },
      {
        "id": "mys-silk",
        "name": "Silk Weaving Lane",
        "category": "Hidden",
        "story": "Workshops weaving pure Mysore silk sarees.",
        "why": "See the gold border woven by hand.",
        "duration": "45 min",
        "xp": 70,
        "unlock": "11:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 60,
        "y": 60
      },
      {
        "id": "mys-hotel",
        "name": "Heritage Heritage Stay",
        "category": "Hotel",
        "story": "A restored royal guesthouse near the palace.",
        "why": "Old-world Mysuru charm.",
        "duration": "Stay",
        "xp": 30,
        "unlock": "00:00",
        "moods": [
          "Aesthetic"
        ],
        "x": 40,
        "y": 48
      }
    ],
    "quests": [
      {
        "id": "mys-q-heritage",
        "title": "Royal Palace Quest",
        "category": "Heritage",
        "xp": 120,
        "badge": "Palace Patron",
        "stamp": "Palace Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Visit Mysore Palace",
            "hint": "On a Sunday for the lights."
          },
          {
            "id": 2,
            "title": "Climb Chamundi Hill",
            "hint": "1000 steps or a road."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Mysuru famous for? (Palace/Silk/Sandalwood)"
          },
          {
            "id": 4,
            "title": "Mark the palace visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Palace Stamp."
          }
        ]
      },
      {
        "id": "mys-q-food",
        "title": "Dosa Quest",
        "category": "Food",
        "xp": 90,
        "badge": "Dosa Devotee",
        "stamp": "Dosa Stamp",
        "steps": [
          {
            "id": 1,
            "title": "Order a Mysore Masala Dosa",
            "hint": "With red chutney."
          },
          {
            "id": 2,
            "title": "Pair with filter coffee",
            "hint": "The Karnataka way."
          },
          {
            "id": 3,
            "title": "Answer a question",
            "hint": "Q: Dosa made of? (Rice & urad)"
          },
          {
            "id": 4,
            "title": "Mark the food stop visited",
            "hint": "Tap Mark Visited."
          },
          {
            "id": 5,
            "title": "Complete the quest",
            "hint": "Earn the Dosa Stamp."
          }
        ]
      }
    ],
    "hidden": {
      "id": "mys-hidden-silk",
      "name": "The Silk Lane",
      "clues": [
        "A lane of clacking looms…",
        "Pure silk with a gold border…",
        "The city's namesake weave…",
        "Find the Mysore silk workshops."
      ],
      "xp": 80
    },
    "partners": [
      {
        "id": "mys-p-cafe",
        "name": "Filter Coffee House",
        "category": "Cafe",
        "location": "Near palace",
        "experience": "South-Indian filter coffee",
        "reward": "Free coffee with food quest",
        "code": "QTMYS"
      },
      {
        "id": "mys-p-shop",
        "name": "Sandalwood Co-op",
        "category": "Shop",
        "location": "Devaraja Market",
        "experience": "Sandalwood and incense",
        "reward": "10% off sandalwood",
        "code": "QTSHOP"
      }
    ],
    "festivals": [
      {
        "name": "Mysuru Dasara",
        "emoji": "👑",
        "note": "Ten days of palace lights, processions and the golden throne."
      },
      {
        "name": "Yoga Day",
        "emoji": "🧘",
        "note": "The yoga capital celebrates worldwide."
      }
    ]
  }
};

export const POPULAR_CITIES = [
  "Ahmedabad",
  "Jaipur",
  "Kochi",
  "Amritsar",
  "Kolkata",
  "Varanasi",
  "Jodhpur",
  "Bhuj",
  "Surat",
  "Mysuru"
];

export const CITY_STATE_MAP: Record<string, string> = 
  {ahmedabad:`Gujarat`,
  surat:`Gujarat`,
  bhuj:`Gujarat`,
  bhavnagar:`Gujarat`,
  rajkot:`Gujarat`,
  vadodara:`Gujarat`,
  jamnagar:`Gujarat`,
  dwarka:`Gujarat`,
  somnath:`Gujarat`,
  gandhinagar:`Gujarat`,
  junagadh:`Gujarat`,
  kutch:`Gujarat`,
  saputara:`Gujarat`,
  porbandar:`Gujarat`,
  anand:`Gujarat`,
  mehsana:`Gujarat`,
  jaipur:`Rajasthan`,
  jodhpur:`Rajasthan`,
  udaipur:`Rajasthan`,
  jaisalmer:`Rajasthan`,
  pushkar:`Rajasthan`,
  ajmer:`Rajasthan`,
  bikaner:`Rajasthan`,
  kota:`Rajasthan`,
  alwar:`Rajasthan`,
  mountabu:`Rajasthan`,
  "mount abu":`Rajasthan`,
  bundi:`Rajasthan`,
  ranakpur:`Rajasthan`,
  chittorgarh:`Rajasthan`,
  bharatpur:`Rajasthan`,
  mumbai:`Maharashtra`,
  pune:`Maharashtra`,
  nagpur:`Maharashtra`,
  aurangabad:`Maharashtra`,
  nashik:`Maharashtra`,
  lonavala:`Maharashtra`,
  mahabaleshwar:`Maharashtra`,
  shirdi:`Maharashtra`,
  ellora:`Maharashtra`,
  ajanta:`Maharashtra`,
  kolhapur:`Maharashtra`,
  kochi:`Kerala`,
  kerala:`Kerala`,
  alleppey:`Kerala`,
  alappuzha:`Kerala`,
  munnar:`Kerala`,
  thekkady:`Kerala`,
  wayanad:`Kerala`,
  kovalam:`Kerala`,
  thiruvananthapuram:`Kerala`,
  trivandrum:`Kerala`,
  kozhikode:`Kerala`,
  thrissur:`Kerala`,
  kumarakom:`Kerala`,
  bekal:`Kerala`,
  amritsar:`Punjab`,
  ludhiana:`Punjab`,
  jalandhar:`Punjab`,
  patiala:`Punjab`,
  chandigarh:`Chandigarh`,
  anandpur:`Punjab`,
  bathinda:`Punjab`,
  kolkata:`West Bengal`,
  darjeeling:`West Bengal`,
  digha:`West Bengal`,
  shantiniketan:`West Bengal`,
  siliguri:`West Bengal`,
  howrah:`West Bengal`,
  chennai:`Tamil Nadu`,
  madurai:`Tamil Nadu`,
  coimbatore:`Tamil Nadu`,
  ooty:`Tamil Nadu`,
  udhagamandalam:`Tamil Nadu`,
  kodaikanal:`Tamil Nadu`,
  mahabalipuram:`Tamil Nadu`,
  pondicherry:`Puducherry`,
  rameswaram:`Tamil Nadu`,
  thanjavur:`Tamil Nadu`,
  kanyakumari:`Tamil Nadu`,
  trichy:`Tamil Nadu`,
  bengaluru:`Karnataka`,
  bangalore:`Karnataka`,
  mysuru:`Karnataka`,
  mysore:`Karnataka`,
  mangalore:`Karnataka`,
  mangaluru:`Karnataka`,
  hampi:`Karnataka`,
  coorg:`Karnataka`,
  kodagu:`Karnataka`,
  gokarna:`Karnataka`,
  udupi:`Karnataka`,
  chikmagalur:`Karnataka`,
  varanasi:`Uttar Pradesh`,
  agra:`Uttar Pradesh`,
  lucknow:`Uttar Pradesh`,
  mathura:`Uttar Pradesh`,
  vrindavan:`Uttar Pradesh`,
  ayodhya:`Uttar Pradesh`,
  prayagraj:`Uttar Pradesh`,
  allahabad:`Uttar Pradesh`,
  kanpur:`Uttar Pradesh`,
  fatehpur:`Uttar Pradesh`,
  sarnath:`Uttar Pradesh`,
  delhi:`Delhi`,
  newdelhi:`Delhi`,
  "new delhi":`Delhi`,
  panaji:`Goa`,
  goa:`Goa`,
  margao:`Goa`,
  oldgoa:`Goa`,
  calangute:`Goa`,
  baga:`Goa`,
  anjuna:`Goa`,
  vasco:`Goa`,
  shimla:`Himachal Pradesh`,
  manali:`Himachal Pradesh`,
  dharamshala:`Himachal Pradesh`,
  kullu:`Himachal Pradesh`,
  kasauli:`Himachal Pradesh`,
  spiti:`Himachal Pradesh`,
  dalhousie:`Himachal Pradesh`,
  kaza:`Himachal Pradesh`,
  rishikesh:`Uttarakhand`,
  haridwar:`Uttarakhand`,
  dehradun:`Uttarakhand`,
  nainital:`Uttarakhand`,
  mussoorie:`Uttarakhand`,
  kedarnath:`Uttarakhand`,
  badrinath:`Uttarakhand`,
  auli:`Uttarakhand`,
  kausani:`Uttarakhand`,
  bhubaneswar:`Odisha`,
  puri:`Odisha`,
  konark:`Odisha`,
  cuttack:`Odisha`,
  guwahati:`Assam`,
  kaziranga:`Assam`,
  tezpur:`Assam`,
  majuli:`Assam`,
  bhopal:`Madhya Pradesh`,
  indore:`Madhya Pradesh`,
  khajuraho:`Madhya Pradesh`,
  ujjain:`Madhya Pradesh`,
  gwalior:`Madhya Pradesh`,
  jabalpur:`Madhya Pradesh`,
  orchha:`Madhya Pradesh`,
  sanchi:`Madhya Pradesh`,
  kanha:`Madhya Pradesh`,
  hyderabad:`Telangana`,
  warangal:`Telangana`,
  visakhapatnam:`Andhra Pradesh`,
  vijayawada:`Andhra Pradesh`,
  tirupati:`Andhra Pradesh`,
  patna:`Bihar`,
  gaya:`Bihar`,
  bodhgaya:`Bihar`,
  nalanda:`Bihar`,
  rajgir:`Bihar`,
  ranchi:`Jharkhand`,
  jamshedpur:`Jharkhand`,
  netarhat:`Jharkhand`,
  raipur:`Chhattisgarh`,
  bilaspur:`Chhattisgarh`,
  bastar:`Chhattisgarh`,
  chitrakoot:`Chhattisgarh`,
  gurugram:`Haryana`,
  gurgaon:`Haryana`,
  kurukshetra:`Haryana`,
  panipat:`Haryana`,
  srinagar:`Jammu & Kashmir`,
  gulmarg:`Jammu & Kashmir`,
  pahalgam:`Jammu & Kashmir`,
  jammu:`Jammu & Kashmir`,
  sonmarg:`Jammu & Kashmir`,
  leh:`Ladakh`,
  kargil:`Ladakh`,
  nubra:`Ladakh`,
  pangong:`Ladakh`,
  gangtok:`Sikkim`,
  pelling:`Sikkim`,
  lachung:`Sikkim`,
  shillong:`Meghalaya`,
  cherrapunji:`Meghalaya`,
  mawlynnong:`Meghalaya`,
  kohima:`Nagaland`,
  dimapur:`Nagaland`,
  imphal:`Manipur`,
  moirang:`Manipur`,
  aizawl:`Mizoram`,
  agartala:`Tripura`,
  itanagar:`Arunachal Pradesh`,
  tawang:`Arunachal Pradesh`,
  ziro:`Arunachal Pradesh`
};

const SUFFIX_RULES = [
  { re: /(garh|kot|nagar|abad|pur|wala|wadi|chowk|pol|haveli)/i, state: "Gujarat" },
  { re: /(garh|pur|garh|jaisal|mer|jodh|udaip|pushkar|fort|baori)/i, state: "Rajasthan" },
  { re: /(wadi|pura|gaon|valli|wadi|wadi)/i, state: "Maharashtra" },
  { re: /(kulam|kadu|patti|ur|patti)/i, state: "Tamil Nadu" },
  { re: /(hati|pur|gaon|jan)/i, state: "Assam" }
];

export function detectState(cityName?: string): string | null {
  if (!cityName) return null;
  const c = cityName.trim().toLowerCase();
  if (CITY_STATE_MAP[c]) return CITY_STATE_MAP[c];
  for (const rule of SUFFIX_RULES) {
    if (rule.re.test(c)) return rule.state;
  }
  return null;
}

export function generateDynamicCity(placeName: string, stateName?: string | null): CityData {
  const theme = getStateTheme(stateName || "India");
  const p = placeName || "Your Destination";
  const s = stateName || theme.state || "India";

  return {
    place: p,
    state: s,
    blurb: `A QuestTrail adventure in ${p} — discover heritage, food and hidden gems with the ${theme.state} cultural theme.`,
    places: [
      {
        id: `${p}-heritage`,
        name: `${p} Heritage Walk`,
        category: "Heritage",
        story: `A walk through the old heart of ${p}.`,
        why: "Discover the local history, traditional arches and craft heritage.",
        duration: "60 min",
        xp: 55,
        unlock: "10:00",
        moods: ["History", "Aesthetic"],
        x: 30,
        y: 40
      },
      {
        id: `${p}-food`,
        name: `${p} Local Food Stop`,
        category: "Food",
        story: "The most-loved local snack of the region.",
        why: "Taste the place the way locals do.",
        duration: "30 min",
        xp: 40,
        unlock: "12:00",
        moods: ["Foodie", "Budget"],
        x: 50,
        y: 50
      },
      {
        id: `${p}-market`,
        name: `${p} Market`,
        category: "Shopping",
        story: "A bustling bazaar of local craft and colour.",
        why: "Take home a piece of authentic handcrafted local art.",
        duration: "50 min",
        xp: 40,
        unlock: "16:00",
        moods: ["Budget", "Aesthetic"],
        x: 60,
        y: 35
      },
      {
        id: `${p}-photo`,
        name: `${p} Sunset Point`,
        category: "Photo",
        story: "The best golden-hour scenic vantage point in town.",
        why: "A frame-worthy view capturing the golden evening light.",
        duration: "40 min",
        xp: 45,
        unlock: "17:00",
        moods: ["Photo", "Aesthetic"],
        x: 40,
        y: 65
      },
      {
        id: `${p}-hidden`,
        name: `${p} Hidden Corner`,
        category: "Hidden",
        story: "A quiet, atmospheric spot most visitors miss.",
        why: "Find the secret spot locals love and tourists do not know about.",
        duration: "40 min",
        xp: 70,
        unlock: "10:00",
        moods: ["Aesthetic", "Chill"],
        x: 25,
        y: 55
      },
      {
        id: `${p}-hotel`,
        name: `${p} Heritage Stay`,
        category: "Hotel",
        story: "A comfortable, culturally styled base for your adventure.",
        why: "Rest and recharge between quest chapters.",
        duration: "Stay",
        xp: 30,
        unlock: "00:00",
        moods: ["Aesthetic"],
        x: 55,
        y: 60
      }
    ],
    quests: [
      {
        id: `${p}-q-heritage`,
        title: `${p} Heritage Quest`,
        category: "Heritage",
        xp: 110,
        badge: "Heritage Walker",
        stamp: "Heritage Stamp",
        steps: [
          { id: 1, title: "Find the heritage walk", hint: "Start at the historical centre of the town." },
          { id: 2, title: "Discover a heritage detail", hint: "Look for old carvings, arches, or a commemorative plaque." },
          { id: 3, title: "Answer a cultural question", hint: `Q: Which state is ${p} located in? (${s})` },
          { id: 4, title: "Mark the landmark visited", hint: "Tap Mark Visited at the heritage marker on the map." },
          { id: 5, title: "Complete the quest", hint: "Earn your permanent Heritage Stamp in your passport." }
        ]
      },
      {
        id: `${p}-q-food`,
        title: `${p} Street Food Trail`,
        category: "Food",
        xp: 90,
        badge: "Local Foodie",
        stamp: "Food Stamp",
        steps: [
          { id: 1, title: "Find a local food stall", hint: "Ask a resident for their favourite regional snack." },
          { id: 2, title: "Taste the signature dish", hint: "Order fresh hot snacks made right in front of you." },
          { id: 3, title: "Answer a culinary question", hint: "Q: Is street food a quintessential way to explore a city? (Yes)" },
          { id: 4, title: "Mark the food stop visited", hint: "Tap Mark Visited on the QuestMap." },
          { id: 5, title: "Complete the quest", hint: "Earn your Food Stamp in your passport." }
        ]
      }
    ],
    hidden: {
      id: `${p}-hidden-corner`,
      name: "The Hidden Sanctum",
      clues: [
        "A quiet spot most visitors walk right past without noticing…",
        "Ask a senior resident for their favourite morning refuge…",
        "The light shifts mysteriously in the late afternoon…",
        "Find the carved arch tucked away behind the main square."
      ],
      xp: 80
    },
    partners: [
      {
        id: `${p}-p-cafe`,
        name: `${p} Chai & Culture Café`,
        category: "Cafe",
        location: "Historic Quarter",
        experience: "Specialty spiced chai with regional sweets",
        reward: "Free Chai with any quest stamp",
        code: "QTCAFE"
      },
      {
        id: `${p}-p-guide`,
        name: `${p} Heritage Guides Collective`,
        category: "Local Guide",
        experience: "Expert walking tours by resident storytellers",
        reward: "Free cultural map add-on",
        code: "QTGUIDE"
      }
    ],
    festivals: [
      { name: "Diwali", emoji: "🪔", note: "The grand festival of lights celebrated with oil lamps and festive sweets." },
      { name: "Holi", emoji: "🌈", note: "The vibrant festival of colours marking the arrival of spring." }
    ]
  };
}

export function resolveDestination(input?: string | null): CityData {
  if (!input) {
    return {
      ...PRESET_CITIES["ahmedabad"],
      theme: getStateTheme("Gujarat")
    };
  }
  const key = input.trim().toLowerCase();
  if (PRESET_CITIES[key]) {
    const city = PRESET_CITIES[key];
    return {
      ...city,
      theme: getStateTheme(city.state)
    };
  }
  const detected = detectState(input);
  const dynamic = generateDynamicCity(input.trim(), detected);
  return {
    ...dynamic,
    theme: getStateTheme(dynamic.state)
  };
}
