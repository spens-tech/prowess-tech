import { Service, Project, Testimonial, TeamMember } from './types';

export const SERVICES: Service[] = [
  {
    id: 'video-production',
    title: 'Video Production',
    shortDescription: 'Videography',
    description: 'We tell stories that stick. From brand films to social reels, our productions are crafted to capture attention and hold it.',
    longDescription: 'In a world of micro-attention spans, video is your strongest weapon. We combine Hollywood-grade production value with conversion-optimized storytelling. Whether it is a high-concept brand manifesto, a 15-second TikTok ad, or an animated explainer, we handle everything from writing the script to editing and color correction.',
    iconName: 'Video',
    benefits: [
      'Scripting and conceptualization',
      'High-end camera operators and direction',
      'Advanced motion design and VFX',
      'Format optimization (vertical, widescreen, cinematic)'
    ],
    features: ['Commercials', 'Social Media Reels', 'Corporate Anthologies', 'Product Spotlights']
  },
  {
    id: 'print-design',
    title: 'Print Design',
    shortDescription: 'Branding & Print',
    description: 'Ink that means business. Brochures, packaging, billboards — every print piece we make is designed to be picked up and remembered.',
    longDescription: 'Tactile marketing still holds immense power. We design print assets that demand to be touched, held, and examined. From bespoke product packaging that leaps off shelves to large-format urban billboards that stop highway traffic, we select perfect typography, texture finishes, and layout systems to bridge paper with performance.',
    iconName: 'Printer',
    benefits: [
      'Custom packaging and structural design',
      'Print supply coordination and paper weight selection',
      'Bespoke corporate brochure layouts',
      'Large-scale environmental signage & billboards'
    ],
    features: ['Packaging Systems', 'Corporate Collateral', 'OOH Billboards', 'Exhibition Displays']
  },
  {
    id: 'social-media',
    title: 'Social Media',
    shortDescription: 'Organic & Paid',
    description: 'Scroll-stopping visuals built for the feed. We design content that earns engagement, builds community, and keeps your brand top of mind.',
    longDescription: 'Algorithms change daily, but human psychology remains the same. We construct tailored digital ecosystems for your brand across Instagram, TikTok, LinkedIn, and Facebook. By coupling scroll-stopping design with witty copy and data-backed posting times, we convert transient scrollers into highly active brand disciples.',
    iconName: 'Share2',
    benefits: [
      'Interactive content calendars',
      'Visual asset batch production',
      'Community dialogue management',
      'Detailed monthly engagement analytics'
    ],
    features: ['Audit & Strategy', 'Feed Aesthetic Design', 'Micro-Copywriting', 'Influencer Collabs']
  },
  {
    id: 'ad-campaigns',
    title: 'Ad Campaigns',
    shortDescription: 'Growth Marketing',
    description: 'Performance meets creativity. We build campaigns with a clear goal — reach the right people, at the right time, and make them act.',
    longDescription: 'Creativity without metrics is just art; we build marketing machines. Our campaign architects analyze audience demographics, run targeted split-testing, and coordinate creative designs to lower your Customer Acquisition Cost (CAC) and skyrocket your Return on Ad Spend (ROAS).',
    iconName: 'Target',
    benefits: [
      'Dynamic funnels across Meta, Google, and TikTok',
      'Iterative graphic/video copy split testing',
      'A/B tested landing page configuration',
      'Deep-dive attribution modeling'
    ],
    features: ['Paid Acquisition', 'Retargeting Engine', 'Funnel Optimization', 'Ad Creative Sets']
  },
  {
    id: 'digital-strategy',
    title: 'Digital Strategy',
    shortDescription: 'Advisory',
    description: 'Navigate the digital terrain. We chart a clear roadmap to position your business as a category leader from day one.',
    longDescription: 'Before moving pixels, we study the terrain. We dive deep into market white spaces, competitor weaknesses, and search volume intent to build a master roadmap for your next 18 months of growth, ensuring no dollar is wasted.',
    iconName: 'TrendingUp',
    benefits: [
      'Competitor audit and positioning models',
      'Keyword intent mapping and SEO strategy',
      'Conversion Rate Optimization audits',
      'Omnichannel integration roadmap'
    ],
    features: ['Category Design', 'Market Analysis', 'SEO Auditing', 'Tech Stack Consulting']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'ceylon-tech-origami',
    title: 'Futuristic Brand Identity',
    category: 'design',
    description: 'A glowing digital spatial rebrand for Sri Lanka\'s leading tech incubator, positioning them for international venture attention.',
    longDescription: 'Ceylon Tech wanted to shed their corporate layout and stand out to Silicon Valley venture capitalists. We built them an electric low-poly brand universe centered on glowing light, mathematical origami vectors, and extreme motion. The rebrand unified their physical co-working spaces with their virtual application models, generating a clean, high-concept, future-ready corporate aesthetic.',
    clientName: 'Ceylon Tech Ecosystems',
    year: '2025',
    impactLabel: 'Increase in VCs Inbound',
    impactValue: '+150%',
    imageUrl: '/src/assets/images/project_origami_1779986586046.png',
    tags: ['Cyber Branding', '3D Design', 'Creative Direction', 'Corporate System']
  },
  {
    id: 'payquantum-app',
    title: 'PayQuantum Mobile Solution',
    category: 'social',
    description: 'Transforming complex cross-border financial transactions into a seamless, high-retention mobile experience that appeals to youth.',
    longDescription: 'PayQuantum tasked us with redesigning their multi-currency digital wallet. We focused on sleek, dark-and-teal glassmorphic layouts, simple transactional sliders, and responsive feedback sounds. Additionally, we designed and managed their social launch content in Colombo and London, converting cold leads to active weekly transactors.',
    clientName: 'PayQuantum UK & SL',
    year: '2026',
    impactLabel: 'Customer Conversion Surge',
    impactValue: '+310%',
    imageUrl: '/src/assets/images/project_mobile_1779986609382.png',
    tags: ['UI & UX Design', 'Tech Strategy', 'Social Launch Set', 'Copywriting']
  },
  {
    id: 'silverline-commercial',
    title: 'Cinematic Launch Commercial',
    category: 'video',
    description: 'An immersive 60-second video campaign for Colombo\'s premier luxury EV importer, blending high-speed cinematic choreography with dramatic soundscapes.',
    longDescription: 'To debut Silverline\'s state-of-the-art electric grand tourer, we crafted a cinematic masterpiece on Colombo\'s coastal roads at twilight. We paired heavy drone stabilization with hand-held anamorphic camera frames and rich synthetic soundscapes, showcasing the car\'s silent speed. The video achieved virality, filling the entire preorder allocation within 48 hours.',
    clientName: 'Silverline Luxury Motors',
    year: '2025',
    impactLabel: 'Direct Social Impressions',
    impactValue: '12M+',
    imageUrl: '/src/assets/images/project_studio_1779986641920.png',
    tags: ['Anamorphic Videography', 'VFX Motion', 'Sound Engineering', 'Growth Blast']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'jayani',
    quote: 'Prowess didn\'t just redesign our brand — they repositioned it. Our leads tripled within the first quarter.',
    authorName: 'Jayani De Silva',
    authorRole: 'Marketing Director',
    authorCompany: 'Ceylon Green',
    initials: 'JD'
  },
  {
    id: 'arjun',
    quote: 'The kind of agency that actually gets it. Creative, sharp, and they delivered on every single deadline.',
    authorName: 'Arjun Kulasuriya',
    authorRole: 'Founder',
    authorCompany: 'Horizon Ventures',
    initials: 'AK'
  },
  {
    id: 'ranil',
    quote: 'From Colombo to Global. The video launch was a stellar work of cinematic art that immediately established our luxury product on the market.',
    authorName: 'Ranil Wickramatunge',
    authorRole: 'Managing Director',
    authorCompany: 'Silverline Motors',
    initials: 'RW'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'sahan',
    name: 'Sahan Perera',
    role: 'Creative Director',
    bio: 'An award-winning videographer with 10+ years directing high-fidelity commercials and multi-million view brand stories for elite Asian startups.',
    imageUrl: 'https://picsum.photos/seed/sahan/400/400'
  },
  {
    id: 'dinuka',
    name: 'Dinuka Alwis',
    role: 'Lead Branding & Packaging Stylist',
    bio: 'Masters in Fine Art, specializing in physical geometry, tactile product packaging, and structural identity systems that bridge the digital with the concrete.',
    imageUrl: 'https://picsum.photos/seed/dinuka/400/400'
  },
  {
    id: 'fathima',
    name: 'Fathima Naizar',
    role: 'Head of Growth & Campaign Architecture',
    bio: 'Data-driven marketer who lives in conversion funnels. Managed over $2M in ad spend across international social and search platforms.',
    imageUrl: 'https://picsum.photos/seed/fathima/400/400'
  }
];
