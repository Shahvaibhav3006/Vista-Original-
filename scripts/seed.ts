import { supabase } from '../server/src/config/supabase';
import { PRESET_CITIES } from '../src/data/cities';
// Assuming themes, lore, festivals are available or can be seeded similarly.

async function seed() {
  console.log('Starting seed process...');

  for (const cityRaw of Object.values(PRESET_CITIES)) {
    const city = cityRaw as any;
    console.log(`Seeding city: ${city.id || city.place}`);
    
    // Seed City
    const { error: cityError } = await supabase.from('cities').upsert({
      id: city.id,
      name: city.name,
      description: city.description || '',
      latitude: city.lat,
      longitude: city.lng,
    });
    
    if (cityError) console.error(`Error seeding city ${city.id}:`, cityError);

    // Seed Places
    if (city.places) {
      for (const place of city.places) {
        const { error: placeError } = await supabase.from('places').upsert({
          id: place.id,
          city_id: city.id,
          name: place.name,
          category: place.category,
          story: place.story,
          why_visit: place.why_visit,
          duration: place.duration,
          xp_reward: place.xp || 10,
          unlock_time: place.unlockTime,
          latitude: place.lat || place.x,
          longitude: place.lng || place.y,
        });
        if (placeError) console.error(`Error seeding place ${place.id}:`, placeError);
      }
    }

    // Seed Quests
    if (city.quests) {
      for (const quest of city.quests) {
        const { error: questError } = await supabase.from('quests').upsert({
          id: quest.id,
          city_id: city.id,
          title: quest.title,
          description: quest.description,
          difficulty: quest.difficulty,
          xp_reward: quest.xp || 50,
          badge_reward: quest.badge,
          stamp_reward: quest.stamp,
        });
        if (questError) console.error(`Error seeding quest ${quest.id}:`, questError);

        // Seed Quest Steps
        if (quest.steps) {
          for (let i = 0; i < quest.steps.length; i++) {
            const step = quest.steps[i];
            const { error: stepError } = await supabase.from('quest_steps').upsert({
              id: `${quest.id}-step-${i}`,
              quest_id: quest.id,
              place_id: step.placeId || null,
              step_order: i,
              title: step.title || `Step ${i+1}`,
              description: step.description,
              challenge_type: step.type,
              correct_answer: step.correct_answer || null,
            });
            if (stepError) console.error(`Error seeding quest step ${i} for ${quest.id}:`, stepError);
          }
        }
      }
    }
  }

  console.log('Seed process completed.');
}

seed().catch(console.error);
