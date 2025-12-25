
export interface Verse {
  reference: string;
  text: string;
}

export interface Reflection {
  verse: Verse;
  thought: string;
}

export interface PrayerRequest {
  id: string;
  user: string;
  content: string;
  amens: number;
  timestamp: number;
  isPrayed?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Devotional' | 'Life Lesson' | 'Tech-Spiritual';
  content: string;
  author: string;
  date: string;
  image: string;
}

export interface BiblePassage {
  reference: string;
  verses: { number: number; text: string }[];
  text: string;
  translation_name: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  verse?: string;
  timestamp: number;
  mood?: string;
}
