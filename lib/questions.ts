export type FieldType =
  | "short_text"
  | "short_text_story"
  | "long_text"
  | "choice_with_story";

export type Question = {
  id: string;
  order: number;
  chapter: number;
  category: string;
  fieldType: FieldType;
  title: string;
  body: string;
  storyPrompt?: string;
  suggestions: string[];
  maxLength: number;
  choices?: string[];
};

export const CHAPTER_META = [
  {
    level: 1,
    name: "Basic Adulting",
    tagline: "Quick practical info.",
    completionMessage: "Nice. You've already done more planning than most humans.",
    icon: "/assets/icon-document.svg",
  },
  {
    level: 2,
    name: "Prevent Future Chaos",
    tagline: "Prevent confusion and detective work.",
    completionMessage: "Future chaos reduced.",
    icon: "/assets/icon-checklist.svg",
  },
  {
    level: 3,
    name: "Your Legendary Send-Off",
    tagline: "Event planning.",
    completionMessage: "Your send-off is taking shape.",
    icon: "/assets/icon-music.svg",
  },
  {
    level: 4,
    name: "The Stories That Matter",
    tagline: "Meaningful reflections.",
    completionMessage: "This is the part people will care about most.",
    icon: "/assets/icon-notebook.svg",
  },
  {
    level: 5,
    name: "The Weird Stuff",
    tagline: "Personality and humor.",
    completionMessage: "Your legacy now includes chaos.",
    icon: "/assets/icon-chat.svg",
  },
] as const;

export const RELIEF_CHAPTER = 2;
export const LEVEL_UNLOCK_PCT = 0.7;

export const QUESTIONS: Question[] = [
  { id: "who-contact-first", order: 1, chapter: 1, category: "Basic Adulting", fieldType: "short_text_story", title: "Who should people contact first?", body: "If something ever happens, who would coordinate things first?", storyPrompt: "Anything they should know?", suggestions: [], maxLength: 120 },
  { id: "where-documents", order: 2, chapter: 1, category: "Basic Adulting", fieldType: "short_text_story", title: "Where are your important documents?", body: "If someone needed to find your important documents, where should they start looking?", storyPrompt: "", suggestions: ["safe", "desk", "filing cabinet", "cloud storage"], maxLength: 120 },
  { id: "responsibilities-attention", order: 3, chapter: 1, category: "Basic Adulting", fieldType: "long_text", title: "What responsibilities might need attention?", body: "What things in your life would quietly break if you disappeared for a week?", suggestions: ["pets", "bills", "subscriptions", "projects"], maxLength: 2000 },
  { id: "confuse-stepping-in", order: 4, chapter: 1, category: "Basic Adulting", fieldType: "long_text", title: "What would confuse someone stepping into your life?", body: "Small things that might confuse someone stepping into your life.", suggestions: ["alarm systems", "routines", "smart devices"], maxLength: 2000 },
  { id: "who-access-plan", order: 5, chapter: 1, category: "Basic Adulting", fieldType: "short_text", title: "Who should have access to this plan?", body: "Who do you want to be able to view this plan if something happens?", suggestions: [], maxLength: 120 },
  { id: "accounts-surprise", order: 6, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What accounts or services might surprise people?", body: "Anything in your digital or financial life that someone might not realize exists?", suggestions: ["investments", "domains", "crypto", "side projects"], maxLength: 2000 },
  { id: "recurring-payments-stop", order: 7, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What recurring payments should someone stop?", body: "What subscriptions or automatic payments might continue forever without you?", suggestions: ["subscriptions", "memberships"], maxLength: 2000 },
  { id: "difficult-to-access", order: 8, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What is difficult to access without you?", body: "Something only you know how to find or unlock.", suggestions: [], maxLength: 2000 },
  { id: "who-notify", order: 9, chapter: 2, category: "Prevent Future Chaos", fieldType: "short_text_story", title: "Who should definitely be notified?", body: "Who are the people that would want to know?", storyPrompt: "", suggestions: ["friends", "coworkers", "communities"], maxLength: 120 },
  { id: "unfinished-matters", order: 10, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "Is there anything unfinished that matters?", body: "Creative work, projects, or loose ends someone should know about.", suggestions: ["creative work", "projects"], maxLength: 2000 },
  { id: "song-sendoff", order: 11, chapter: 3, category: "Your Legendary Send-Off", fieldType: "short_text_story", title: "What song should play at your send-off?", body: "What song should play?", storyPrompt: "Why that song?", suggestions: ["Stayin Alive", "My Way", "Always Look on the Bright Side of Life", "Time of Your Life"], maxLength: 120 },
  { id: "vibe-event", order: 12, chapter: 3, category: "Your Legendary Send-Off", fieldType: "choice_with_story", title: "What vibe should the event have?", body: "What kind of vibe feels right?", choices: ["Celebration", "Storytelling night", "Quiet reflection", "Casual gathering"], storyPrompt: "Describe the atmosphere.", suggestions: [], maxLength: 2000 },
  { id: "food-eat", order: 13, chapter: 3, category: "Your Legendary Send-Off", fieldType: "short_text", title: "What food should people eat?", body: "What food would feel most like you?", suggestions: ["tacos", "pizza", "barbecue", "homemade food"], maxLength: 120 },
  { id: "laugh-cry-both", order: 14, chapter: 3, category: "Your Legendary Send-Off", fieldType: "choice_with_story", title: "Should people laugh, cry, or both?", body: "What emotional tone would feel right?", choices: ["Mostly laughter", "Mostly reflection", "Both"], storyPrompt: "", suggestions: [], maxLength: 2000 },
  { id: "story-tell-about-you", order: 15, chapter: 3, category: "Your Legendary Send-Off", fieldType: "long_text", title: "What story should someone tell about you?", body: "The one story that captures your spirit.", suggestions: [], maxLength: 2000 },
  { id: "should-not-happen", order: 16, chapter: 3, category: "Your Legendary Send-Off", fieldType: "long_text", title: "What should absolutely NOT happen?", body: "Anything you’d hate at your send-off?", suggestions: ["awkward slideshow", "boring speeches", "bad catering"], maxLength: 2000 },
  { id: "story-remember", order: 17, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What's a story from your life people should remember?", body: "A moment that represents who you are.", suggestions: [], maxLength: 2000 },
  { id: "misunderstood", order: 18, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What's something people misunderstood about you?", body: "Is there something about you people often got wrong?", suggestions: [], maxLength: 2000 },
  { id: "advice-leave", order: 19, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What advice would you leave behind?", body: "Something you've learned that might help someone else.", suggestions: [], maxLength: 2000 },
  { id: "small-joys", order: 20, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What small things brought you joy?", body: "Little things that made life feel good.", suggestions: ["coffee rituals", "favorite places", "hobbies"], maxLength: 2000 },
  { id: "hope-felt-around-you", order: 21, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What do you hope people felt when they were around you?", body: "What feeling do you hope people had when they were around you?", suggestions: [], maxLength: 2000 },
  { id: "wish-asked-more", order: 22, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What do you wish people asked you more about?", body: "Something you’d have loved to talk about more.", suggestions: [], maxLength: 2000 },
  { id: "life-movie", order: 23, chapter: 5, category: "The Weird Stuff", fieldType: "short_text_story", title: "If your life were a movie, what kind would it be?", body: "If someone made a movie about your life, what kind would it be?", storyPrompt: "", suggestions: ["comedy", "adventure", "indie drama"], maxLength: 120 },
  { id: "embarrassing-story", order: 24, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What embarrassing story deserves to survive you?", body: "What's an embarrassing story that deserves to survive you?", suggestions: [], maxLength: 2000 },
  { id: "theme-song", order: 25, chapter: 5, category: "The Weird Stuff", fieldType: "short_text", title: "If your life had a theme song, what would it be?", body: "What song best represents your life?", suggestions: ["Don't Stop Me Now", "Eye of the Tiger", "I Will Survive"], maxLength: 120 },
  { id: "weird-habit", order: 26, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What weird habit should people remember?", body: "What's a strange habit or quirk that was uniquely you?", suggestions: [], maxLength: 2000 },
  { id: "surprise-discover", order: 27, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What would surprise people to discover later?", body: "What might surprise people about your life?", suggestions: [], maxLength: 2000 },
  { id: "conspiracy-theory", order: 28, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What conspiracy theory should exist about your life?", body: "If there had to be a conspiracy theory about you, what would it be?", suggestions: [], maxLength: 2000 },
  { id: "place-felt-home", order: 29, chapter: 5, category: "The Weird Stuff", fieldType: "short_text_story", title: "What place felt most like home?", body: "What place felt most like home?", storyPrompt: "What made it special?", suggestions: [], maxLength: 120 },
];
