
import { BlogPost, Verse } from "./types";

export const DAILY_VERSES: Verse[] = [
  { reference: "Psalm 46:10", text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { reference: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives." },
  { reference: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
  { reference: "Philippians 4:7", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
  { reference: "Psalm 23:2", text: "He makes me lie down in green pastures, he leads me beside quiet waters." },
  { reference: "Revelation 21:4", text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain." }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Architecture of Silence",
    category: "Life Lesson",
    author: "Grace Thompson",
    date: "May 12, 2024",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
    content: "Silence is not the absence of sound, but the presence of depth. In the digital age, we are terraforming our minds with noise. Reclaiming Eden begins with building a 'Secret Place'—a mental architecture where the only voice that matters is the one that whispered the stars into existence."
  },
  {
    id: "2",
    title: "Sanctified Algorithms",
    category: "Tech-Spiritual",
    author: "Elder Silas",
    date: "June 05, 2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    content: "Can machine learning help us find the Divine? At Eden, we believe intelligence—whether biological or artificial—is a gift to be stewarded. When we use AI to parse the historical depths of Hebrew scripture, we aren't automating faith; we are cleaning the windows of our understanding."
  },
  {
    id: "3",
    title: "The Sabbath of the Screen",
    category: "Devotional",
    author: "Brother Julian",
    date: "July 20, 2024",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800",
    content: "Digital rest is the new fasting. To truly enter the Garden, one must occasionally close the gate on the global feed. How often do we check our notifications before we check our hearts? This week, try a 'Digital Sabbath' and see what the Lord grows in the quiet."
  }
];

export const INITIAL_PRAYERS = [
  { id: "p1", user: "Gabriel", content: "Praying for my grandmother's recovery from surgery. May the Great Physician's hands be upon the doctors.", amens: 42, timestamp: Date.now() - 1000000 },
  { id: "p2", user: "Sophia", content: "Strength for our local food pantry volunteers. We are seeing more families than ever, and our spirits are weary but willing.", amens: 128, timestamp: Date.now() - 500000 },
  { id: "p3", user: "Lucas", content: "Guidance for my career transition. I want to work where my talents serve the Kingdom, not just the bottom line.", amens: 15, timestamp: Date.now() - 200000 },
  { id: "p4", user: "Mary", content: "Restoration for a broken relationship with my daughter. Seeking the peace that passes all understanding.", amens: 89, timestamp: Date.now() - 100000 }
];
