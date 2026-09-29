export const AUDIO_LORE: Record<string, string[]> = {
  Heritage: [
    "These stones have watched empires rise and quietly fade. Run a hand along them — you touch centuries.",
    "Built not for show but for shelter, faith and defence, this place still hums with the lives that filled it.",
    "Every arch here is a sentence; together they tell the story of a city that refused to be forgotten."
  ],
  Food: [
    "This dish was born of scarcity and spice — a recipe sharpened by a thousand grandmothers.",
    "Eat it the way locals do: slowly, with your hands, and never alone.",
    "The flavour here is a map of trade routes — pepper from the coast, ghee from the plains, saffron from the hills."
  ],
  Shopping: [
    "What you buy here is not a souvenir — it is a livelihood, woven or hammered by hand.",
    "Bargain with a smile; the price is a conversation, not a contest."
  ],
  Photo: [
    "Wait for the light to turn gold, then wait one more minute. That is when the place gives itself away.",
    "Frame the people as much as the place — a city is its faces."
  ],
  Hidden: [
    "The best places hide in plain sight, behind a gate, below a street, past a turn no one takes.",
    "Find it, and you join the small club of people who know the city's quiet name."
  ],
  Hotel: [
    "A good stay is a doorway — rest here, and the city begins the moment you step out."
  ]
};

export const SHARE_CAPTIONS = [
  "Lost in the lanes of {place} — and found something better than a map.",
  "Some cities you visit. {place}, you play.",
  "Golden hour, golden streets, golden {place}.",
  "Where every corner is a quest and every meal a reward. 📍 {place}",
  "Traded the itinerary for a trail. Best decision in {place}.",
  "Not all who wander are lost — some are just one quest ahead in {place}."
];

export function getAudioLore(category: string): string {
  const list = AUDIO_LORE[category] || AUDIO_LORE.Heritage;
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomShareCaption(placeName?: string): string {
  const chosen = SHARE_CAPTIONS[Math.floor(Math.random() * SHARE_CAPTIONS.length)];
  return chosen.replace("{place}", placeName || "this place");
}

export function generateTravelSummary(state: {
  destination?: string | null;
  level?: { name: string };
  visited: Record<string, unknown>;
  quests: Record<string, { completedAt?: string }>;
  xp: number;
  badges: string[];
  greenXp?: number;
}): string {
  const visitedCount = Object.keys(state.visited).length;
  const questCount = Object.values(state.quests).filter((q) => q.completedAt).length;

  return [
    `You explored ${state.destination || "a new city"} as a ${state.level?.name || "traveler"}.`,
    `You visited ${visitedCount} places and completed ${questCount} quest${questCount === 1 ? "" : "s"}.`,
    `You earned ${state.xp} XP and ${state.badges.length} badge${state.badges.length === 1 ? "" : "s"}.`,
    state.greenXp ? `You also collected ${state.greenXp} Green XP for eco-friendly travel. 🌿` : "",
    "Every stamp in your passport is a story you lived, not a place you passed."
  ]
    .filter(Boolean)
    .join(" ");
}
