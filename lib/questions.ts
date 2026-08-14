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
  { id: "who-contact-first", order: 1, chapter: 1, category: "Basic Adulting", fieldType: "short_text_story", title: "Who gets the first phone call?", body: "The one who takes charge and starts making the rest of the calls. No pressure, them.", storyPrompt: "Anything they should know before they pick up the phone?", suggestions: [], maxLength: 120 },
  { id: "where-documents", order: 2, chapter: 1, category: "Basic Adulting", fieldType: "short_text_story", title: "Where's the treasure map?", body: "Will, insurance, passwords — where does someone start digging? (Figuratively. Please don't actually bury anything.)", storyPrompt: "", suggestions: ["safe", "desk", "filing cabinet", "cloud storage"], maxLength: 120 },
  { id: "responsibilities-attention", order: 3, chapter: 1, category: "Basic Adulting", fieldType: "long_text", title: "What quietly falls apart without you?", body: "What in your life would start unraveling if you vanished for a week? (Besides your group chat, which would just assume you're busy.)", suggestions: ["pets", "bills", "subscriptions", "projects"], maxLength: 2000 },
  { id: "confuse-stepping-in", order: 4, chapter: 1, category: "Basic Adulting", fieldType: "long_text", title: "What would baffle someone stepping into your life?", body: "The smart home that only listens to you. The filing system only you understand. The weird little routines nobody else knows about.", suggestions: ["alarm systems", "routines", "smart devices"], maxLength: 2000 },
  { id: "who-access-plan", order: 5, chapter: 1, category: "Basic Adulting", fieldType: "short_text", title: "Who's earned VIP access to this plan?", body: "Who do you trust enough to see all of this, whenever the time comes?", suggestions: [], maxLength: 120 },
  { id: "accounts-surprise", order: 6, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What would surprise people about your digital life?", body: "The crypto wallet. The domain you forgot you own. The side project quietly making $12 a month. Time to come clean.", suggestions: ["investments", "domains", "crypto", "side projects"], maxLength: 2000 },
  { id: "recurring-payments-stop", order: 7, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What subscriptions need to die with you?", body: "What's quietly charging your card into eternity if nobody stops it? (RIP that gym membership you used twice.)", suggestions: ["subscriptions", "memberships"], maxLength: 2000 },
  { id: "difficult-to-access", order: 8, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What only you know how to unlock?", body: "The safe combo. The storage unit. The hiding spot that made sense at the time. Spill it.", suggestions: [], maxLength: 2000 },
  { id: "who-notify", order: 9, chapter: 2, category: "Prevent Future Chaos", fieldType: "short_text_story", title: "Who deserves to hear it from a person, not a post?", body: "The people who'd want a phone call, not a Facebook status.", storyPrompt: "", suggestions: ["friends", "coworkers", "communities"], maxLength: 120 },
  { id: "unfinished-matters", order: 10, chapter: 2, category: "Prevent Future Chaos", fieldType: "long_text", title: "What's left hanging that someone should know about?", body: "Half-finished projects, loose ends, that novel in your drawer — anything someone should pick up, wrap up, or let go of.", suggestions: ["creative work", "projects"], maxLength: 2000 },
  { id: "song-sendoff", order: 11, chapter: 3, category: "Your Legendary Send-Off", fieldType: "short_text_story", title: "What song plays as people walk in?", body: "Your entrance music. Make it count.", storyPrompt: "Why that song?", suggestions: ["Stayin Alive", "My Way", "Always Look on the Bright Side of Life", "Time of Your Life"], maxLength: 120 },
  { id: "vibe-event", order: 12, chapter: 3, category: "Your Legendary Send-Off", fieldType: "choice_with_story", title: "What's the vibe?", body: "Pick a mood. It's your party — no wrong answers.", choices: ["Celebration", "Storytelling night", "Quiet reflection", "Casual gathering"], storyPrompt: "Describe the atmosphere.", suggestions: [], maxLength: 2000 },
  { id: "food-eat", order: 13, chapter: 3, category: "Your Legendary Send-Off", fieldType: "short_text", title: "What's on the menu?", body: "What should people be eating — or explicitly banned from serving?", suggestions: ["tacos", "pizza", "barbecue", "homemade food"], maxLength: 120 },
  { id: "laugh-cry-both", order: 14, chapter: 3, category: "Your Legendary Send-Off", fieldType: "choice_with_story", title: "Laughter, tears, or both?", body: "What emotional tone feels most like you?", choices: ["Mostly laughter", "Mostly reflection", "Both"], storyPrompt: "", suggestions: [], maxLength: 2000 },
  { id: "story-tell-about-you", order: 15, chapter: 3, category: "Your Legendary Send-Off", fieldType: "long_text", title: "What story should get told (again)?", body: "The one that captures exactly who you are — chaos, charm, and all.", suggestions: [], maxLength: 2000 },
  { id: "should-not-happen", order: 16, chapter: 3, category: "Your Legendary Send-Off", fieldType: "long_text", title: "What should absolutely NOT happen?", body: "The awkward slideshow. The boring speech. The catering you'd have opinions about. Name your dealbreakers.", suggestions: ["awkward slideshow", "boring speeches", "bad catering"], maxLength: 2000 },
  { id: "story-remember", order: 17, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What's the story people should remember?", body: "A moment that sums up exactly who you are.", suggestions: [], maxLength: 2000 },
  { id: "misunderstood", order: 18, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What did people always get wrong about you?", body: "The thing people assumed, that was never actually true.", suggestions: [], maxLength: 2000 },
  { id: "advice-leave", order: 19, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What's the advice worth passing on?", body: "Something you learned the hard way that might save someone else the trouble.", suggestions: [], maxLength: 2000 },
  { id: "small-joys", order: 20, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What tiny things made life good?", body: "The stuff nobody would guess made your whole week — the good coffee, the weird ritual, the dumb little thing you looked forward to.", suggestions: ["coffee rituals", "favorite places", "hobbies"], maxLength: 2000 },
  { id: "hope-felt-around-you", order: 21, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "How did you want people to feel around you?", body: "The feeling you hoped you left people with, even just for a minute.", suggestions: [], maxLength: 2000 },
  { id: "wish-asked-more", order: 22, chapter: 4, category: "The Stories That Matter", fieldType: "long_text", title: "What do you wish people had asked you more?", body: "The thing you'd have happily talked about for hours, if anyone had just asked.", suggestions: [], maxLength: 2000 },
  { id: "life-movie", order: 23, chapter: 5, category: "The Weird Stuff", fieldType: "short_text_story", title: "What genre is your life?", body: "Rom-com? Heist film? Slow-burn indie drama nobody quite understood?", storyPrompt: "", suggestions: ["comedy", "adventure", "indie drama"], maxLength: 120 },
  { id: "embarrassing-story", order: 24, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What embarrassing story deserves to survive you?", body: "The one you'd never tell in a job interview but absolutely deserves to live on forever.", suggestions: [], maxLength: 2000 },
  { id: "theme-song", order: 25, chapter: 5, category: "The Weird Stuff", fieldType: "short_text", title: "What's your theme song?", body: "The track that plays if your life got its own opening credits.", suggestions: ["Don't Stop Me Now", "Eye of the Tiger", "I Will Survive"], maxLength: 120 },
  { id: "weird-habit", order: 26, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What weird habit deserves to be remembered?", body: "The quirk that made zero sense to anyone but you.", suggestions: [], maxLength: 2000 },
  { id: "surprise-discover", order: 27, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What would surprise people to find out later?", body: "Something about your life nobody saw coming.", suggestions: [], maxLength: 2000 },
  { id: "conspiracy-theory", order: 28, chapter: 5, category: "The Weird Stuff", fieldType: "long_text", title: "What conspiracy theory should exist about you?", body: "If the internet had to make something up about your secret double life, what should it be?", suggestions: [], maxLength: 2000 },
  { id: "place-felt-home", order: 29, chapter: 5, category: "The Weird Stuff", fieldType: "short_text_story", title: "What place felt most like home?", body: "Not necessarily where you lived — where you felt like the most you.", storyPrompt: "What made it special?", suggestions: [], maxLength: 120 },
];
