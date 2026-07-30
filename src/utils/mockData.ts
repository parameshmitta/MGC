// Mock Data for Maha Ganapati Committee, Bandarupally

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  idolHeight: string;
  specialty: string;
  image: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  photo: string;
  socials: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface SponsorItem {
  id: string;
  name: string;
  amount?: string;
  year: string;
  logo: string;
  village: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'important' | 'general' | 'event';
  link?: string;
}

export interface VillageProblem {
  id: string;
  name: string;
  phone: string;
  village: string;
  title: string;
  description: string;
  category: string;
  photo?: string;
  location?: string;
  status: 'Pending' | 'Accepted' | 'Solved' | 'Rejected';
  createdAt: string;
  replies?: Array<{
    id: string;
    author: string;
    message: string;
    date: string;
  }>;
}

export interface InstagramPost {
  id: string;
  type: 'post' | 'reel' | 'video';
  mediaUrl: string;
  instagramUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  category: 'idol' | 'pooja' | 'laddu' | 'immersion' | 'cultural' | 'procession';
  caption: string;
}

export interface GalleryVideo {
  id: string;
  url: string;
  title: string;
  duration: string;
  thumbnail: string;
}

export interface DailyEvent {
  day: number;
  date: string;
  title: string;
  description: string;
  prasadam: string;
}

export interface YearGalleryData {
  year: string;
  coverImage: string;
  theme: string;
  idolHeight: string;
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
  dailyEvents: DailyEvent[];
  immersionDetails: {
    date: string;
    route: string;
    description: string;
    highlights: string[];
    videoUrl?: string;
  };
  sponsors: SponsorItem[];
  volunteers: string[];
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2026',
    title: 'Glow of Devotion',
    description: 'A historic celebration marking enhanced community gathering with the installaton of an eco-friendly 15-foot clay idol with special glass-painting effects.',
    idolHeight: '15 Feet',
    specialty: 'Handcrafted Clay Ganesha with glass-painted dynamic halo.',
    image: 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2025',
    title: 'Vishwa Roopa Darshanam',
    description: 'Featuring the spectacular Vishwaroopa posture displaying multiple faces and arms. Gained local recognition across neighboring mandals.',
    idolHeight: '14 Feet',
    specialty: 'Vishwaroopa incarnation with automatic color-changing LED eyes.',
    image: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2024',
    title: 'Mayura Simhasana',
    description: 'Ganesha seated majestically on a dynamic peacock throne symbolising peace and prosperity, crafted by clay experts from Kumartuli.',
    idolHeight: '13 Feet',
    specialty: 'Peacock throne with real peacock feather background decoration.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2023',
    title: 'Kailasa Natha Alankaram',
    description: 'Set against a beautiful backdrop of Mount Kailash with simulated mist and fountains representing the holy Ganges river.',
    idolHeight: '12 Feet',
    specialty: 'Mount Kailash set with active mist generator system.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2022',
    title: 'Sidhi Vinayaka Re-union',
    description: 'Post-pandemic grand celebration focusing on community health and village integration. Large food distributions carried out.',
    idolHeight: '11 Feet',
    specialty: 'Traditional Sidhivinayak pose holding a large gold-plated laddu.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2021',
    title: 'Eco-Vinayaka Movement',
    description: 'Introduced 100% natural organic colors and bio-degradable decor. A small-scale celebration keeping traditions alive during covid restrictions.',
    idolHeight: '9 Feet',
    specialty: 'Organic seed Ganesha designed to blossom into plants post-immersion.',
    image: 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2020',
    title: 'Pragathi Devudu',
    description: 'Home pooja setups and visual streams for NRI villagers. Emphasized digital offerings.',
    idolHeight: '5 Feet',
    specialty: 'Miniature clay idol focusing on visual aesthetics.',
    image: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2019',
    title: 'Sankatahara Vrata Set',
    description: 'Introduced elaborate morning and evening rituals with collective chanting classes for village youth.',
    idolHeight: '10 Feet',
    specialty: 'Classic posture with a beautiful golden canopy.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2018',
    title: 'The Inception',
    description: 'The foundation of the Maha Ganapati Committee Bandarupally by enthusiastic local youth with a small 7-foot clay idol.',
    idolHeight: '7 Feet',
    specialty: 'First community clay Ganesha with locally stitched garments.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
  }
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: '1',
    name: 'Mitta Paramesh',
    role: 'President',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    socials: { facebook: '#', instagram: '#', whatsapp: 'https://wa.me/919876543210' }
  },
  {
    id: '2',
    name: 'K. Rakesh Reddy',
    role: 'Vice President',
    phone: '+91 87654 32109',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    socials: { facebook: '#', instagram: '#' }
  },
  {
    id: '3',
    name: 'B. Shiva Kumar',
    role: 'Secretary',
    phone: '+91 76543 21098',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    socials: { whatsapp: 'https://wa.me/917654321098', instagram: '#' }
  },
  {
    id: '4',
    name: 'V. Laxman Murthy',
    role: 'Treasurer',
    phone: '+91 65432 10987',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    socials: { facebook: '#' }
  },
  {
    id: '5',
    name: 'D. Srinivas',
    role: 'Co-Treasurer',
    phone: '+91 95432 10987',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    socials: { instagram: '#' }
  },
  {
    id: '6',
    name: 'P. Mahesh Babu',
    role: 'Executive Member',
    phone: '+91 99988 87776',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    socials: { whatsapp: 'https://wa.me/919998887776' }
  }
];

export const SPONSORS_DATA: SponsorItem[] = [
  { id: 's1', name: 'Mitta Constructions', amount: '₹1,01,116', year: '2026', logo: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=150&q=80', village: 'Bandarupally' },
  { id: 's2', name: 'R.K. Agro Agencies', amount: '₹51,116', year: '2026', logo: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=150&q=80', village: 'Bandarupally' },
  { id: 's3', name: 'Srinivasa Sweet House', amount: '₹25,116', year: '2026', logo: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=150&q=80', village: 'Bandarupally' },
  { id: 's4', name: 'Bandarupally NRI Youth Group', amount: '₹1,50,000', year: '2025', logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80', village: 'USA & UK' }
];

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'a1',
    title: 'Ganesh Chaturthi Utsav 2026 Celebrations Start Date',
    date: '2026-08-15',
    content: 'The official dates for Ganesha sthapana are set for September 15, 2026. The committee has booked a beautiful 15ft organic clay idol. Daily Annadanam schedules are open for booking.',
    category: 'important'
  },
  {
    id: 'a2',
    title: 'Laddu Prasadam Auction Registration Open',
    date: '2026-07-28',
    content: 'The holy Maha Laddu (approx. 21 KG) auction registration is open. Interested devotees from Bandarupally and nearby villages can enroll their names at the committee office.',
    category: 'event'
  },
  {
    id: 'a3',
    title: 'Volunteers Enrollment Campaign',
    date: '2026-07-15',
    content: 'We need volunteers for traffic management, prasadam distribution, and security. Please register on the Events page or contact the Secretary B. Shiva Kumar.',
    category: 'general'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig1',
    type: 'post',
    mediaUrl: 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=600&q=80',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Behold the magnificent look of Bandarupally Maha Ganapati 2026! Divine blessings to all devotees. 🌺🙏 #ganesha #bandarupally #devotional',
    likes: 1243,
    comments: 89,
    date: '2026-07-29'
  },
  {
    id: 'ig2',
    type: 'reel',
    mediaUrl: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=600&q=80',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Reel: Dynamic Harathi and dhol beats during the evening pooja! The energy is unmatchable this year. 🥁🔥 #harathi #festivalbeats #celebration',
    likes: 4230,
    comments: 245,
    date: '2026-07-28'
  },
  {
    id: 'ig3',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Annadanam Seva: Over 3,000 devotees received delicious Ganesha Prasadam today. Huge thanks to our volunteers! 🍛❤️ #seva #feedinghungry #volunteering',
    likes: 856,
    comments: 32,
    date: '2026-07-27'
  },
  {
    id: 'ig4',
    type: 'post',
    mediaUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Colorful cultural dances performed by Bandarupally kids. Talent and devotion unified! 💃✨ #culturalnight #kidsdance #culturalroots',
    likes: 678,
    comments: 19,
    date: '2026-07-26'
  },
  {
    id: 'ig5',
    type: 'reel',
    mediaUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Slow-motion Ganesha Immersion highlights. See you next year, Bappa! 🌊🙏 #bappa #immersion #visarjan',
    likes: 5122,
    comments: 489,
    date: '2026-07-25'
  },
  {
    id: 'ig6',
    type: 'post',
    mediaUrl: 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=600&q=80',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Eco-friendly clay distribution drive for village homes. Let us celebrate responsibly. 🌱 #ecoganesha #gogreen #saveearth',
    likes: 934,
    comments: 44,
    date: '2026-07-24'
  }
];

export const MOCK_PROBLEMS: VillageProblem[] = [
  {
    id: 'p1',
    name: 'K. Somappa',
    phone: '+91 94400 11223',
    village: 'Bandarupally',
    title: 'Street Light Outage in Harijanawada Street',
    description: 'Four street lights are not functioning for the past one week, causing deep darkness and security concerns for elders walking in the evening.',
    category: 'Street Lights',
    status: 'Pending',
    createdAt: '2026-07-29T10:00:00Z',
    replies: []
  },
  {
    id: 'p2',
    name: 'M. Laxmamma',
    phone: '+91 98480 99887',
    village: 'Bandarupally',
    title: 'Water Leakage in Main Pipeline near Panchayat Office',
    description: 'Drinking water is leaking heavily from the pipeline joint near the Panchayat office. Hundreds of liters of purified water are going into drain water streams.',
    category: 'Water Problem',
    status: 'Accepted',
    createdAt: '2026-07-28T08:30:00Z',
    replies: [
      { id: 'rep1', author: 'Committee Admin', message: 'We have registered the request and informed the local plumber. Inspection will begin tomorrow.', date: '2026-07-28T14:00:00Z' }
    ]
  },
  {
    id: 'p3',
    name: 'B. Venkat',
    phone: '+91 99009 88776',
    village: 'Bandarupally',
    title: 'Severe Potholes near Village High School Entrance',
    description: 'Due to recent rains, deep potholes are formed right at the entrance gate of the government school. School children are slipping and falling on bicycles.',
    category: 'Road Damage',
    status: 'Solved',
    createdAt: '2026-07-25T11:00:00Z',
    replies: [
      { id: 'rep2', author: 'Committee Admin', message: 'Committee volunteers along with school board filled the potholes with gravel. Road leveling is complete.', date: '2026-07-26T16:00:00Z' }
    ]
  }
];

// Helper to get year gallery data
export const getYearGallery = (year: string): YearGalleryData => {
  // Let's create a template gallery for the requested year
  return {
    year,
    coverImage: year === '2026' ? 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=1200&q=80' : 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=1200&q=80',
    theme: TIMELINE_DATA.find(t => t.year === year)?.title || 'Maha Ganapati Utsav',
    idolHeight: TIMELINE_DATA.find(t => t.year === year)?.idolHeight || '12 Feet',
    photos: [
      { id: `${year}-ph1`, url: 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=800&q=80', category: 'idol', caption: `Magnificent Sthapana of ${year} Bappa` },
      { id: `${year}-ph2`, url: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80', category: 'pooja', caption: 'Grand Evening Maha Harathi Devotion' },
      { id: `${year}-ph3`, url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80', category: 'laddu', caption: 'Auction of the holy Maha Laddu' },
      { id: `${year}-ph4`, url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', category: 'procession', caption: 'Grand procession with dhol drums through streets' },
      { id: `${year}-ph5`, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80', category: 'immersion', caption: 'Emotional Visarjan ceremony at local reservoir' },
      { id: `${year}-ph6`, url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80', category: 'cultural', caption: 'Devotional drama performance by village youth' }
    ],
    videos: [
      { id: `${year}-v1`, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: `${year} Sthapana & Harathi Video Highlights`, duration: '12:45', thumbnail: 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=400&q=80' },
      { id: `${year}-v2`, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: `${year} Visarjan Procession & Shobha Yatra`, duration: '28:10', thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80' }
    ],
    dailyEvents: [
      { day: 1, date: 'Day 1', title: 'Prana Pratishta & Sthapana', description: 'Holy installations of Lord Ganesha with chants and homam.', prasadam: 'Modak & Undrallu' },
      { day: 2, date: 'Day 2', title: 'Sahasranama Kumkum Archana', description: 'Chanting of 1000 Ganesha names by village women.', prasadam: 'Pulihora (Tamarind Rice)' },
      { day: 3, date: 'Day 3', title: 'Laksha Patra Pooja', description: 'Offering of 1,00,000 holy leaves with special chants.', prasadam: 'Chakkera Pongali' },
      { day: 4, date: 'Day 4', title: 'Special Laddu Archana', description: 'Idol decorated with small laddus. Evening devotional music.', prasadam: 'Laddu' },
      { day: 5, date: 'Day 5', title: 'Maha Annadanam & Immersion Yatra', description: 'Mass feeding for 5000+ people, followed by grand immersion procession.', prasadam: 'Full South Indian Meals' }
    ],
    immersionDetails: {
      date: `Day 5 of Festival, Sept ${15 + 4}, ${year}`,
      route: 'Pandal -> Main Bazaar Street -> Panchayat Road -> Bandarupally Cheruvu (Village Reservoir)',
      description: 'The visarjan (immersion) is carried out amidst dhol tasha beats, gulal colors, and kolatam folk dances, concluding with safe water immersion at the village reservoir.',
      highlights: ['Dhol Tasha beats from Pune Troupe', '30-foot decorated carrier truck', 'Deep-water crane suspension immersion', 'Free butter-milk distribution booths along route']
    },
    sponsors: SPONSORS_DATA.filter(s => s.year === year || year === '2026'),
    volunteers: [
      'M. Paramesh', 'B. Shiva Kumar', 'K. Rakesh Reddy', 'V. Laxman', 'D. Srinivas', 'P. Mahesh',
      'K. Suresh', 'A. Anand', 'G. Naidu', 'T. Shekhar', 'C. Vamshi', 'M. Nani', 'V. Chaitu'
    ]
  };
};
