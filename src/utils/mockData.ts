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
  objectPosition?: string;
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
  ticketId?: string;
  name: string;
  phone: string;
  village: string;
  title: string;
  description: string;
  category: string;
  urgency?: 'Normal' | 'High' | 'Urgent';
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
    title: 'Maha Ganapati Sthapana (Coming Soon)',
    description: 'Upcoming grand celebration marking community gathering with eco-friendly clay idol.',
    idolHeight: '15 Feet',
    specialty: 'Handcrafted Clay Ganesha with sacred rituals & Bullock Cart Darshanam.',
    image: '/celebrations/ganesha_2026.jpg',
  },
  {
    year: '2025',
    title: 'Vishwa Roopa Darshanam',
    description: 'Spectacular Vishwaroopa Darshanam celebration with village devotees and youth group.',
    idolHeight: '14 Feet',
    specialty: 'Vishwaroopa incarnation with divine background.',
    image: '/celebrations/ganesha_2025.jpg',
  },
  {
    year: '2024',
    title: 'Mayura Mukuta Ganesha',
    description: 'Majestic Ganesha celebration with floral ceiling decor and dedicated committee members.',
    idolHeight: '13 Feet',
    specialty: 'Mayura Mukuta adorned idol with floral mandapam.',
    image: '/celebrations/ganesha_2024.jpg',
  },
  {
    year: '2023',
    title: 'Kailasa Natha Alankaram',
    description: 'Beautiful floral canopy decor and community unity for Lord Ganesha utsav.',
    idolHeight: '12 Feet',
    specialty: 'Kailasa Natha alankaram with youth seva.',
    image: '/celebrations/ganesha_2023.jpg',
  },
  {
    year: '2022',
    title: 'Siddhi Vinayaka Mahotsavam',
    description: 'Grand holy celebration and youth group dedication bringing peace and prosperity.',
    idolHeight: '11 Feet',
    specialty: 'Traditional Siddhi Vinayaka alankaram with lemon garland.',
    image: '/celebrations/ganesha_2022.jpg',
  },
  {
    year: '2021',
    title: 'Simha Vahana Ganesha',
    description: 'Lord Ganesha seated majestically on Simha carrier vahana with vibrant traditional garlands.',
    idolHeight: '10 Feet',
    specialty: 'Lion carrier vahana with sacred pitambaram.',
    image: '/celebrations/ganesha_2021.jpg',
  },
  {
    year: '2020',
    title: 'Shwethambara Vinayaka',
    description: 'Holy celebration with traditional white dhoti and floral arrangements during village utsav.',
    idolHeight: '8 Feet',
    specialty: 'Sacred white drapery and continuous evening chantings.',
    image: '/celebrations/ganesha_2020.jpg',
  },
  {
    year: '2017',
    title: 'Divya Mukuta Vinayaka',
    description: 'Grand handcrafted mukutam and sacred alankaram with enthusiastic youth devotion.',
    idolHeight: '7 Feet',
    specialty: 'Handcrafted crown & sacred mukutam with floral stage decorations.',
    image: '/celebrations/ganesha_2017.jpg',
  },
  {
    year: '2015',
    title: 'Pitambara Vinayaka',
    description: 'Historic Ganesha idol sthapana with traditional pitambara vastram and ornaments.',
    idolHeight: '6 Feet',
    specialty: 'Traditional pitambaram alankaram with handcrafted mukutam.',
    image: '/celebrations/ganesha_2015.jpg',
  }
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: '1',
    name: 'Thoutam Madhukar',
    role: 'President',
    phone: '+91 63011 16586',
    photo: '/team/thoutam_madhukar.jpg',
    socials: {
      instagram: 'https://www.instagram.com/madhukarnetha1?igsh=YTNjc2hkMG9pYjV6',
      whatsapp: 'https://wa.me/916301116586'
    }
  },
  {
    id: '2',
    name: 'Buddarthi Bhaskar',
    role: 'Vice President',
    phone: '+91 89191 80537',
    photo: '/team/buddarthi_bhaskar.jpg',
    objectPosition: 'center 15%',
    socials: {
      instagram: 'https://www.instagram.com/ammu240318?igsh=cHViMzI2c3VvZjY0',
      whatsapp: 'https://wa.me/918919180537'
    }
  },
  {
    id: '3',
    name: 'Mitta Paramesh',
    role: 'Core Member',
    phone: '+91 85558 39756',
    photo: '/team/mitta_paramesh.jpg',
    socials: {
      instagram: 'https://www.instagram.com/paramesh_5146?igsh=MW8wanlqdHV2bGF4cA==',
      whatsapp: 'https://wa.me/918555839756'
    }
  },
  {
    id: '4',
    name: 'Godasi Revanth',
    role: 'Core Member',
    phone: '+91 97013 31921',
    photo: '/team/godasi_revanth.jpg',
    socials: {
      instagram: 'https://www.instagram.com/revanthhh.19?igsh=ajB4NjE0cHA2cjhl',
      whatsapp: 'https://wa.me/919701331921'
    }
  },
  {
    id: '5',
    name: 'Amrutha Harish',
    role: 'Youth Member',
    phone: '+91 77804 26027',
    photo: '/team/amrutha_harish.jpg',
    socials: {
      instagram: 'https://www.instagram.com/amruthaharish3?igsh=MTJ0YjJiMWMzMzN6MQ==',
      whatsapp: 'https://wa.me/917780426027'
    }
  },
  {
    id: '6',
    name: 'Appani Madhukar',
    role: 'Youth Member',
    phone: '+91 85550 41669',
    photo: '/team/appani_madhukar.jpg',
    socials: {
      instagram: 'https://www.instagram.com/mr_madhu_varma5?igsh=YXdnZGFiMXN1bml0',
      whatsapp: 'https://wa.me/918555041669'
    }
  },
  {
    id: '7',
    name: 'Manchala Rajinikanth',
    role: 'Youth Member',
    phone: '+91 96038 92816',
    photo: '/team/manchala_rajinikanth.jpg',
    socials: {
      instagram: 'https://www.instagram.com/rajin_ikanth07?igsh=enBzN3ZyMmhyZG5n',
      whatsapp: 'https://wa.me/919603892816'
    }
  },
  {
    id: '8',
    name: 'Doddipally Rahul',
    role: 'Youth Member',
    phone: '+91 96038 32066',
    photo: '/team/doddipally_rahul.jpg',
    socials: {
      instagram: 'https://www.instagram.com/mr_rahul_official_06?igsh=NnY5eGowaDYwNWFl',
      whatsapp: 'https://wa.me/919603832066'
    }
  },
  {
    id: '9',
    name: 'Teerdhala Chandu',
    role: 'Youth Member',
    phone: '+91 86395 47640',
    photo: '/team/teerdhala_chandu.jpg',
    socials: {
      instagram: 'https://www.instagram.com/mr_chandu_varma1?igsh=enVvb3Z3YWF3Z2c1',
      whatsapp: 'https://wa.me/918639547640'
    }
  },
  {
    id: '10',
    name: 'Teerdhala Chintu',
    role: 'Youth Member',
    phone: '+91 91009 63826',
    photo: '/team/teerdhala_chintu.jpg',
    socials: {
      instagram: 'https://www.instagram.com/chintuthirthala09?igsh=NW9tYnV0NDZianpl',
      whatsapp: 'https://wa.me/919100963826'
    }
  },
  {
    id: '11',
    name: 'Teerdhala Srikanth',
    role: 'Youth Member',
    phone: '+91 93903 84354',
    photo: '/team/teerdhala_srikanth.jpg',
    socials: {
      instagram: 'https://www.instagram.com/sri_12_463_143_office?igsh=amFuN2J4dnhxcXdz',
      whatsapp: 'https://wa.me/919390384354'
    }
  },
  {
    id: '12',
    name: 'Mittapally Tirupathi',
    role: 'Youth Member',
    phone: '+91 96402 69273',
    photo: '/team/mittapally_tirupathi.jpg',
    socials: {
      instagram: 'https://www.instagram.com/iam_thirpu_insta_official?igsh=ejNpaHdhY3AxNjlj',
      whatsapp: 'https://wa.me/919640269273'
    }
  },
  {
    id: '13',
    name: 'Appani Vijay',
    role: 'Youth Member',
    phone: '+91 96185 70581',
    photo: '/team/appani_vijay.jpg',
    socials: {
      instagram: 'https://www.instagram.com/gist_of_vijay?igsh=MWF6cmR3dmw3ZGdtNA==',
      whatsapp: 'https://wa.me/919618570581'
    }
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
    content: 'The official dates for Ganesha sthapana are set for September 14, 2026. The committee has booked a beautiful 15ft organic clay idol. Daily Annadanam schedules are open for booking.',
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
    mediaUrl: '/celebrations/ganesha_2025.jpg',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Behold the magnificent look of Bandarupally Maha Ganapati 2025 Vishwaroopa Darshanam! Divine blessings to all devotees. 🌺🙏 #ganesha #bandarupally #devotional',
    likes: 1243,
    comments: 89,
    date: '2025-09-07'
  },
  {
    id: 'ig2',
    type: 'reel',
    mediaUrl: '/celebrations/ganesha_2024.jpg',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Reel: Mayura Mukuta Ganesha 2024! Dynamic Harathi and dhol beats during the evening pooja with our youth committee. 🥁🔥 #harathi #festivalbeats #celebration',
    likes: 4230,
    comments: 245,
    date: '2024-09-12'
  },
  {
    id: 'ig3',
    type: 'video',
    mediaUrl: '/celebrations/ganesha_2015_annadanam.jpg',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Annadanam Seva: Over 3,000 devotees received delicious Ganesha Prasadam today in Bandarupally village. Huge thanks to our volunteers! 🍛❤️ #seva #feedinghungry #volunteering',
    likes: 856,
    comments: 32,
    date: '2024-09-15'
  },
  {
    id: 'ig4',
    type: 'post',
    mediaUrl: '/celebrations/ganesha_2023.jpg',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Kailasa Natha Alankaram 2023. Sacred stage decor, floral canopy, and community prayers united in devotion. 💐✨ #culturalroots #bhakti #ganeshutsav',
    likes: 1678,
    comments: 74,
    date: '2023-09-19'
  },
  {
    id: 'ig5',
    type: 'reel',
    mediaUrl: '/celebrations/ganesha_2017_harathi.jpg',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Maha Mangala Harathi moments with Bandarupally youth and elders! May Vighnaharta remove all obstacles. 🪔🙏 #harathi #divineblessings #bandarupally',
    likes: 5122,
    comments: 489,
    date: '2023-09-22'
  },
  {
    id: 'ig6',
    type: 'post',
    mediaUrl: '/celebrations/ganesha_2022.jpg',
    instagramUrl: 'https://www.instagram.com/maha_ganapati_committe',
    caption: 'Siddhi Vinayaka Mahotsavam 2022. Honoring our village unity and dedicated committee members. Ganapati Bappa Morya! 🚩🙏 #morya #bappa #siddhivinayaka',
    likes: 1934,
    comments: 112,
    date: '2022-09-02'
  }
];

export const MOCK_PROBLEMS: VillageProblem[] = [];

const YEAR_PHOTOS: Record<string, GalleryPhoto[]> = {
  '2015': [
    { id: '2015-ph1', url: '/celebrations/ganesha_2015.jpg', category: 'idol', caption: 'Maha Ganapati Divya Roopa Sthapana (2015)' },
    { id: '2015-ph2', url: '/celebrations/ganesha_2015_pooja.jpg', category: 'pooja', caption: 'Devotees & Village Children Performing Holy Harathi (2015)' },
    { id: '2015-ph3', url: '/celebrations/ganesha_2015_annadanam.jpg', category: 'cultural', caption: 'Traditional Maha Annadanam Prasadam Preparation (2015)' },
    { id: '2015-ph4', url: '/celebrations/ganesha_2015_youth.jpg', category: 'procession', caption: 'Committee Youth & Children Gathering with Lord Ganesha (2015)' },
  ],
  '2017': [
    { id: '2017-ph1', url: '/celebrations/ganesha_2017.jpg', category: 'idol', caption: 'Maha Ganapati Mukutam & Sthapana Darshanam (2017)' },
    { id: '2017-ph2', url: '/celebrations/ganesha_2017_idol_full.jpg', category: 'idol', caption: 'Grand Maha Ganapati Throne & Alankaram (2017)' },
    { id: '2017-ph3', url: '/celebrations/ganesha_2017_harathi.jpg', category: 'pooja', caption: 'Bala Vinayaka Mahotsavam Children & Youth Harathi (2017)' },
  ],
  '2020': [
    { id: '2020-ph1', url: '/celebrations/ganesha_2020.jpg', category: 'idol', caption: 'Shwethambara Vinayaka Sthapana & Darshanam (2020)' },
    { id: '2020-ph2', url: '/celebrations/ganesha_2020_full.jpg', category: 'idol', caption: 'Grand Shwethambara Vinayaka Alankaram Stage (2020)' },
  ],
  '2021': [
    { id: '2021-ph1', url: '/celebrations/ganesha_2021.jpg', category: 'idol', caption: 'Simha Vahana Alankaram Sthapana (2021)' },
    { id: '2021-ph2', url: '/celebrations/ganesha_2021_full.jpg', category: 'idol', caption: 'Grand Simha Vahana Ganesha Mahotsavam Darshanam (2021)' },
  ],
  '2022': [
    { id: '2022-ph1', url: '/celebrations/ganesha_2022.jpg', category: 'idol', caption: 'Sidhi Vinayaka Re-union & Committee Members (2022)' },
    { id: '2022-ph2', url: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80', category: 'pooja', caption: 'Grand Evening Maha Harathi Devotion (2022)' },
  ],
  '2023': [
    { id: '2023-ph1', url: '/celebrations/ganesha_2023.jpg', category: 'idol', caption: 'Kailasa Natha Alankaram & Youth Committee (2023)' },
    { id: '2023-ph2', url: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80', category: 'pooja', caption: 'Grand Evening Maha Harathi Devotion (2023)' },
  ],
  '2024': [
    { id: '2024-ph1', url: '/celebrations/ganesha_2024.jpg', category: 'idol', caption: 'Mayura Simhasana Celebration & Committee Devotees (2024)' },
    { id: '2024-ph2', url: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80', category: 'pooja', caption: 'Grand Evening Maha Harathi Devotion (2024)' },
  ],
  '2025': [
    { id: '2025-ph1', url: '/celebrations/ganesha_2025.jpg', category: 'idol', caption: 'Vishwa Roopa Darshanam & Youth Group (2025)' },
    { id: '2025-ph2', url: '/celebrations/ganesha_2024.jpg', category: 'pooja', caption: 'Grand Evening Maha Harathi Devotion (2025)' },
  ],
  '2026': [
    { id: '2026-ph1', url: '/celebrations/ganesha_2026.jpg', category: 'idol', caption: 'Bandarupally Maha Ganapati 2026 - Coming Soon (Bullock Cart Sthapana Darshanam)' },
  ],
};

// Helper to get year gallery data
export const getYearGallery = (year: string): YearGalleryData => {
  const timelineItem = TIMELINE_DATA.find(t => t.year === year);
  const heroImage = timelineItem?.image || 'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=1200&q=80';

  const yearPhotos = YEAR_PHOTOS[year] || [
    { id: `${year}-ph1`, url: heroImage, category: 'idol', caption: `Magnificent Sthapana & Committee Darshanam ${year}` },
    { id: `${year}-ph2`, url: 'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=800&q=80', category: 'pooja', caption: 'Grand Evening Maha Harathi Devotion' },
    { id: `${year}-ph3`, url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80', category: 'laddu', caption: 'Auction of the holy Maha Laddu' },
    { id: `${year}-ph4`, url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', category: 'procession', caption: 'Grand procession with dhol drums through streets' },
    { id: `${year}-ph5`, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80', category: 'immersion', caption: 'Emotional Visarjan ceremony at local reservoir' },
    { id: `${year}-ph6`, url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80', category: 'cultural', caption: 'Devotional drama performance by village youth' }
  ];

  return {
    year,
    coverImage: heroImage,
    theme: timelineItem?.title || 'Maha Ganapati Utsav',
    idolHeight: timelineItem?.idolHeight || '12 Feet',
    photos: yearPhotos,
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

export interface BathukammaEdition {
  id: string;
  year: string;
  order: string;
  title: string;
  subtitle: string;
  image: string;
  photos: string[];
  height: string;
  flowersUsed: string;
  description: string;
  highlights: string[];
}

export const BATHUKAMMA_EDITIONS: BathukammaEdition[] = [
  {
    id: 'bathukamma-2018',
    year: '2018',
    order: 'First',
    title: 'Maha Bathukamma 2018',
    subtitle: 'The Historic Inaugural Landmark',
    image: '/bathukamma/bathukamma_2018.jpg',
    photos: ['/bathukamma/bathukamma_2018.jpg'],
    height: '14+ Feet',
    flowersUsed: 'Banthi (Marigold), Chamanti, Gunugu, Thangedu, Mango Leaves',
    description: 'The historic first Maha Bathukamma initiated by the Maha Ganapati Committee youth of Bandarupally. Featuring vibrant yellow and orange marigold concentric tiers, crowned with purple floral initials "MGC", accompanied by village women carrying traditional Bathukammas.',
    highlights: [
      'Inaugural historic milestone in Bandarupally village',
      'Handcrafted purple blossom letters "MGC" on top cone',
      'Fresh green mango leaf band around the midsection',
      'United village women and youth in celebratory folk dance'
    ]
  },
  {
    id: 'bathukamma-2019',
    year: '2019',
    order: 'Second',
    title: 'Maha Bathukamma 2019',
    subtitle: 'Grand Symmetrical Floral Pyramid',
    image: '/bathukamma/bathukamma_2019.jpg',
    photos: ['/bathukamma/bathukamma_2019.jpg'],
    height: '16+ Feet',
    flowersUsed: 'Yellow & Orange Marigold, Fresh Mango Foliage, Scented Flora',
    description: 'The spectacular second edition showcasing impeccable cone geometry and symmetrical layered rings of golden and saffron marigold blossoms. Interspersed with a dense traditional mango leaf collar (Thoranam) honoring Telangana cultural traditions.',
    highlights: [
      'Perfect conical architectural symmetry',
      'Lush green mango leaf collar defining the lower tier',
      'Over 8,000 fresh handpicked floral heads assembled',
      'Special evening prayers & traditional Bathukamma songs'
    ]
  },
  {
    id: 'bathukamma-2021',
    year: '2021',
    order: 'Third',
    title: 'Maha Bathukamma 2021',
    subtitle: 'Maha Ganapati Committee Special',
    image: '/bathukamma/bathukamma_2021.jpg',
    photos: ['/bathukamma/bathukamma_2021.jpg'],
    height: '15+ Feet',
    flowersUsed: 'Golden Marigold, Saffron Banthi, Red Hibiscus & Rose crown',
    description: 'A grand community-wide congregation where the towering central Maha Bathukamma proudly displayed the "మహా గణపతి కమిటీ" (Maha Ganapati Committee) banner. Encircled by dozens of domestic Bathukammas prepared with love by village women in traditional Pattu sarees.',
    highlights: [
      'Featured official "మహా గణపతి కమిటీ" title banner',
      'Surrounded by 100+ family Bathukammas at the village square',
      'Vibrant community Kolatam and Bathukamma singing circle',
      'Special floral Gouramma crown at the pinnacle'
    ]
  },
  {
    id: 'bathukamma-2022',
    year: '2022',
    order: 'Fourth',
    title: 'Maha Bathukamma 2022',
    subtitle: 'Colossal Floral Monument with Lettering',
    image: '/bathukamma/bathukamma_2022.jpg',
    photos: ['/bathukamma/bathukamma_2022.jpg'],
    height: '18+ Feet',
    flowersUsed: 'Thousands of Yellow & Orange Marigold blossoms',
    description: 'A monumental, towering floral installation sculpted with floral typography embedded directly into the marigold body. Standing nearly two stories tall under dedicated bamboo scaffolding, marking Bandarupally’s most ambitious floral tribute to Mother Nature.',
    highlights: [
      'Towering 18+ foot cylindrical floral monument',
      'Handcrafted Telugu floral lettering sculpted into the layers',
      'Crafted over 18 continuous hours by dedicated youth volunteers',
      'Record gathering of devotees and cultural spectators'
    ]
  },
  {
    id: 'bathukamma-2024',
    year: '2024',
    order: 'Fifth',
    title: 'Maha Bathukamma 2024',
    subtitle: 'Divine Gouramma Mukha Alankaram',
    image: '/bathukamma/bathukamma_2024_2.jpg',
    photos: ['/bathukamma/bathukamma_2024_1.jpg', '/bathukamma/bathukamma_2024_2.jpg'],
    height: '18+ Feet',
    flowersUsed: 'Dense Yellow & Orange Marigold blossoms, Crown Tilak & Sacred Flora',
    description: 'The magnificent 2024 edition featuring an ornate sacred idol face (Gouramma Mukham) adorned with vermilion tilak and golden crown embedded centrally in layers of thick saffron marigolds, evoking intense spiritual devotion.',
    highlights: [
      'Sacred sculpted Gouramma face embedded into the floral summit',
      'Multi-angle closeups capturing fine artisan detailing and tilak',
      'Dense golden and saffron marigold layered architecture',
      'Overwhelming participation of village women in traditional devotional attire'
    ]
  },
  {
    id: 'bathukamma-2025',
    year: '2025',
    order: 'Sixth',
    title: 'Maha Bathukamma 2025',
    subtitle: 'Supreme Maha Ganapati Committee Monument',
    image: '/bathukamma/bathukamma_2025_1.jpg',
    photos: ['/bathukamma/bathukamma_2025_1.jpg', '/bathukamma/bathukamma_2025_2.jpg'],
    height: '20+ Feet',
    flowersUsed: 'Golden Marigolds, Orange Banthi, Lotus Petal Halo & Committee Banner',
    description: 'The grandest, most towering Maha Bathukamma reaching an unprecedented 20+ feet high. Crowned with a divine golden idol and lotus halo, enveloped with the prestigious "మహా గణపతి కమిటీ" banner against a clear blue sky, celebrated with unmatched fervor in Bandarupally.',
    highlights: [
      'Record-breaking 20+ foot soaring conical floral tower',
      'Signature "మహా గణపతి కమిటీ" blue & pink banner crowning the apex',
      'Lotus petal crown alankaram atop Mother Gouramma',
      'Spectacular daytime festival view uniting the entire Bandarupally community'
    ]
  }
];


