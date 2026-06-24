import { College } from '../types';

export const mockColleges: College[] = [
  {
    id: 'neo-stanford',
    name: 'Neo-Stanford AI Institute',
    location: { city: 'Palo Alto', state: 'California' },
    fees: 60000,
    rating: 4.9,
    placementPercentage: 98,
    aiScore: 97,
    establishedYear: 2042,
    overview: 'Neo-Stanford is the pinnacle of artificial intelligence and cyber-physical systems. Established in the mid-21st century, it leads the global frontier in deep consciousness learning, bio-synthetic interfaces, and autonomous agent frameworks.',
    courses: [
      { name: 'B.Tech in Cognitive Systems', duration: '4 Years', fees: 60000, type: 'Engineering' },
      { name: 'M.Tech in Neural Network Design', duration: '2 Years', fees: 65000, type: 'Engineering' },
      { name: 'MBA in Cyber-Enterprise Systems', duration: '2 Years', fees: 70000, type: 'Management' },
      { name: 'M.Sc in Quantum Data Science', duration: '2 Years', fees: 55000, type: 'Science' }
    ],
    placementDetails: {
      averagePackage: '18.5 LPA',
      highestPackage: '85.0 LPA',
      placementPercentage: 98,
      topRecruiters: ['Cyberdyne Corp', 'Omni Consumer Products', 'Nexus AI', 'Aetheric Systems']
    },
    reviews: [
      { id: '1', userName: 'Aria-909', rating: 5, comment: 'The neural interface lab is state-of-the-art. Highly recommended if you want to work on direct brain-computer systems!', date: '2026-05-12' },
      { id: '2', userName: 'Kaelen_Vox', rating: 4.8, comment: 'Incredible faculty, though the workload is intense. Be prepared to upgrade your bio-processor.', date: '2026-04-30' }
    ],
    facilities: ['Neural Link Pods', 'Quantum Computing Core', 'Cyber-Gymnasium', 'Bio-Synthetic Fab Lab', 'Holographic Amphitheater']
  },
  {
    id: 'nova-mit',
    name: 'Nova MIT (Massachusetts Institute of Tech)',
    location: { city: 'Cambridge', state: 'Massachusetts' },
    fees: 65000,
    rating: 5.0,
    placementPercentage: 99,
    aiScore: 99,
    establishedYear: 2038,
    overview: 'Nova MIT is globally renowned for breakthroughs in quantum materialization, nanotechnology, and temporal engineering. It houses the legendary Hyper-Grid Project, defining the next century of connectivity.',
    courses: [
      { name: 'B.Tech in Nanotechnology', duration: '4 Years', fees: 65000, type: 'Engineering' },
      { name: 'B.Tech in Quantum Computation', duration: '4 Years', fees: 68000, type: 'Engineering' },
      { name: 'M.Sc in Applied Plasma Physics', duration: '2 Years', fees: 62000, type: 'Science' },
      { name: 'PhD in Temporal Mathematics', duration: '3 Years', fees: 70000, type: 'Science' }
    ],
    placementDetails: {
      averagePackage: '22.0 LPA',
      highestPackage: '120.0 LPA',
      placementPercentage: 99,
      topRecruiters: ['Singularity Labs', 'Hyperion Dynamics', 'Temporal Research Corp', 'Nova Energy']
    },
    reviews: [
      { id: '1', userName: 'Zane_Zero', rating: 5, comment: 'Mind-bending quantum research. The campus has a literal pocket fusion reactor powering the grid.', date: '2026-06-01' }
    ],
    facilities: ['Sub-Atomic Accelerator', 'Plasma Containment Chamber', 'Grid VR Lounge', 'Nanobot Synthesis Bay']
  },
  {
    id: 'cyberdyne-academy',
    name: 'Cyberdyne Academy of Robotics',
    location: { city: 'Austin', state: 'Texas' },
    fees: 42000,
    rating: 4.6,
    placementPercentage: 92,
    aiScore: 89,
    establishedYear: 2045,
    overview: 'Cyberdyne Academy specializes in robotic limbs, autonomous drone fleets, and android kinetics. Supported heavily by military and industrial tech contracts, it offers unprecedented hands-on robotics engineering.',
    courses: [
      { name: 'B.Tech in Android Kinetics', duration: '4 Years', fees: 42000, type: 'Engineering' },
      { name: 'B.Tech in Drone Fleet Logistics', duration: '4 Years', fees: 40000, type: 'Engineering' },
      { name: 'M.Tech in Haptic Interfaces', duration: '2 Years', fees: 45000, type: 'Engineering' }
    ],
    placementDetails: {
      averagePackage: '12.0 LPA',
      highestPackage: '52.0 LPA',
      placementPercentage: 92,
      topRecruiters: ['Cyberdyne Robotics', 'Defense Grid Inc', 'Autonomous Movers', 'Apex Heavy Indus']
    },
    reviews: [
      { id: '1', userName: 'MechMaster', rating: 4.5, comment: 'Amazing practical courses. Built my own hexapod scout in the freshman year. Very affordable compared to California schools.', date: '2026-03-15' }
    ],
    facilities: ['Heavy Mech Assembly Bay', 'Drone Test Field', 'Haptic Suit Simulation Rooms', 'Cryo-Metal Alloys Lab']
  },
  {
    id: 'nexus-columbia',
    name: 'Nexus Columbia Cyber-Business School',
    location: { city: 'New York City', state: 'New York' },
    fees: 58000,
    rating: 4.7,
    placementPercentage: 94,
    aiScore: 92,
    establishedYear: 2043,
    overview: 'Nexus Columbia is the premier institution for digital finance, decentralization economics, and AI-led enterprise leadership. It sits at the cross-section of Wall Street and the Cyber-Net.',
    courses: [
      { name: 'MBA in Algorithmic Wealth Management', duration: '2 Years', fees: 62000, type: 'Management' },
      { name: 'BBA in Decentralized Finance (DeFi)', duration: '3 Years', fees: 55000, type: 'Management' },
      { name: 'M.Sc in Net-Economics', duration: '2 Years', fees: 58000, type: 'Science' }
    ],
    placementDetails: {
      averagePackage: '16.0 LPA',
      highestPackage: '75.0 LPA',
      placementPercentage: 94,
      topRecruiters: ['Ledger Capital', 'Solana-9 Syndicate', 'Neo-WallStreet Labs', 'Apex Consulting']
    },
    reviews: [
      { id: '1', userName: 'CryptoQueen', rating: 4.8, comment: 'If you want to run corporate syndicates or launch decentralized autonomous protocols, this is the only school that matters.', date: '2026-04-18' }
    ],
    facilities: ['Crypto Trading Pit', 'Holographic Stock Market Dashboard', 'Decentralized Law Incubator']
  },
  {
    id: 'aether-caltech',
    name: 'Aether Caltech Propulsion Lab',
    location: { city: 'Pasadena', state: 'California' },
    fees: 62000,
    rating: 4.8,
    placementPercentage: 96,
    aiScore: 95,
    establishedYear: 2040,
    overview: 'Aether Caltech focuses on deep space exploration tech, asteroid mining robotics, and ion propulsion. It works closely with global Space agencies to train engineers for off-world deployments.',
    courses: [
      { name: 'B.Tech in Aerospace Propulsion', duration: '4 Years', fees: 62000, type: 'Engineering' },
      { name: 'B.Tech in Asteroid Extraction Tech', duration: '4 Years', fees: 64000, type: 'Engineering' },
      { name: 'M.Tech in Orbital Mechanics', duration: '2 Years', fees: 66000, type: 'Engineering' }
    ],
    placementDetails: {
      averagePackage: '17.0 LPA',
      highestPackage: '90.0 LPA',
      placementPercentage: 96,
      topRecruiters: ['Off-World Mining Corp', 'Interstellar Transit Co', 'California Space Grid']
    },
    reviews: [
      { id: '1', userName: 'Stargazer', rating: 5, comment: 'We literally get to control orbital mining probes for homework. A dream come true.', date: '2026-05-28' }
    ],
    facilities: ['Low-Gravity Sim Chamber', 'Ion Engine Test Silo', 'Asteroid Mining Tele-Op Center']
  },
  {
    id: 'zenith-university',
    name: 'Zenith University of Cloud Systems',
    location: { city: 'Seattle', state: 'Washington' },
    fees: 38000,
    rating: 4.4,
    placementPercentage: 90,
    aiScore: 85,
    establishedYear: 2047,
    overview: 'Zenith trains developers in planet-scale distributed networks, decentralized file systems, and cyber-grid security protocols. It is heavily backed by the Seattle tech industry.',
    courses: [
      { name: 'B.Tech in Cloud Architecture', duration: '4 Years', fees: 38000, type: 'Engineering' },
      { name: 'B.Sc in Network Administration', duration: '3 Years', fees: 34000, type: 'Science' },
      { name: 'M.Tech in Cybersecurity Systems', duration: '2 Years', fees: 42000, type: 'Engineering' }
    ],
    placementDetails: {
      averagePackage: '10.5 LPA',
      highestPackage: '45.0 LPA',
      placementPercentage: 90,
      topRecruiters: ['SkyNet Cloud Services', 'Seattle Cyber Security', 'Aetheric Networks']
    },
    reviews: [
      { id: '1', userName: 'NetRunner', rating: 4.2, comment: 'Solid courses on mesh networking. It has great connections with tech conglomerates for internships.', date: '2026-02-14' }
    ],
    facilities: ['Planet-Scale Server Farm (On-Site)', 'Cyber-Range Testing Bay', 'VR Coding Pods']
  },
  {
    id: 'grid-chicago',
    name: 'Grid Chicago College of Data Analytics',
    location: { city: 'Chicago', state: 'Illinois' },
    fees: 35000,
    rating: 4.3,
    placementPercentage: 88,
    aiScore: 82,
    establishedYear: 2048,
    overview: 'Grid Chicago provides practical training in massive-scale neural analytics, predictive grid load modeling, and automation architectures. It offers affordable access to data-centric careers.',
    courses: [
      { name: 'B.Sc in Predictive Analytics', duration: '3 Years', fees: 35000, type: 'Science' },
      { name: 'B.Tech in Automation Control', duration: '4 Years', fees: 37000, type: 'Engineering' },
      { name: 'M.Sc in Grid Mechanics', duration: '2 Years', fees: 38000, type: 'Science' }
    ],
    placementDetails: {
      averagePackage: '9.0 LPA',
      highestPackage: '38.0 LPA',
      placementPercentage: 88,
      topRecruiters: ['Chicago Grid Authority', 'Apex Analytics', 'Midwest Automations']
    },
    reviews: [
      { id: '1', userName: 'DataMinerX', rating: 4.5, comment: 'For this tuition cost, the value is phenomenal. The predictive modeling lab is always active.', date: '2026-05-02' }
    ],
    facilities: ['Supercomputer Access Node', 'Cyber-Grid Simulation Wall', '24/7 Collaboration Zones']
  },
  {
    id: 'neotokyo-cyber',
    name: 'Neo-Tokyo Cyber Academy (LA Branch)',
    location: { city: 'Los Angeles', state: 'California' },
    fees: 48000,
    rating: 4.7,
    placementPercentage: 93,
    aiScore: 90,
    establishedYear: 2046,
    overview: 'Specializing in digital immersive environments, game design, and synthetic arts. The Academy blends Japanese virtual design principles with California cinematic visual tech.',
    courses: [
      { name: 'B.Sc in Virtual World Architecture', duration: '4 Years', fees: 48000, type: 'Arts' },
      { name: 'B.Sc in Immersive Game Engine Coding', duration: '4 Years', fees: 46000, type: 'Arts' },
      { name: 'M.Sc in Synthetic Creative Media', duration: '2 Years', fees: 50000, type: 'Arts' }
    ],
    placementDetails: {
      averagePackage: '13.5 LPA',
      highestPackage: '60.0 LPA',
      placementPercentage: 93,
      topRecruiters: ['Virtual Worlds Corp', 'Kurogane Immersive', 'Fuji-Net Entertains', 'Sony CyberMedia']
    },
    reviews: [
      { id: '1', userName: 'PixelKat', rating: 4.9, comment: 'Designing virtual cityscapes in full neural immersion is just... incredible. High job demand too.', date: '2026-03-29' }
    ],
    facilities: ['Volumetric Capture Stage', 'Full-Body Haptic Suites', 'Interactive XR Theatre']
  },
  {
    id: 'hyperion-austin',
    name: 'Hyperion Bio-Computational University',
    location: { city: 'Austin', state: 'Texas' },
    fees: 40000,
    rating: 4.5,
    placementPercentage: 91,
    aiScore: 87,
    establishedYear: 2049,
    overview: 'Hyperion bridges the gap between organic life and technology. Combining molecular biology with neural compute interfaces, it is a pioneer in bio-silico computing structures.',
    courses: [
      { name: 'B.Sc in Molecular Computing', duration: '4 Years', fees: 40000, type: 'Science' },
      { name: 'M.Sc in Bio-Synthetic Logic Systems', duration: '2 Years', fees: 44000, type: 'Science' },
      { name: 'M.Tech in Bio-Informatics', duration: '2 Years', fees: 45000, type: 'Engineering' }
    ],
    placementDetails: {
      averagePackage: '11.8 LPA',
      highestPackage: '48.0 LPA',
      placementPercentage: 91,
      topRecruiters: ['BioGrid Technologies', 'Texas Genetic Systems', 'Aether Health Tech']
    },
    reviews: [
      { id: '1', userName: 'GenoLinker', rating: 4.4, comment: 'Fascinating curriculum. We grow our own bio-processing chips in petridishes. Highly specialized.', date: '2026-04-10' }
    ],
    facilities: ['Bio-Silicon Synthesis Lab', 'Molecular Modeling Supercomputer', 'Sterilized Clean Rooms']
  },
  {
    id: 'vector-boston',
    name: 'Vector Cybersecurity College',
    location: { city: 'Boston', state: 'Massachusetts' },
    fees: 52000,
    rating: 4.8,
    placementPercentage: 95,
    aiScore: 93,
    establishedYear: 2044,
    overview: 'Vector is the training ground for the elite agents of digital defense. Focusing on network forensics, counter-intrusions, cryptographic architectures, and cyber-law enforcement.',
    courses: [
      { name: 'B.Tech in Offensive Cyber Tactics', duration: '4 Years', fees: 52000, type: 'Engineering' },
      { name: 'B.Tech in Cryptographic Systems', duration: '4 Years', fees: 54000, type: 'Engineering' },
      { name: 'M.Sc in Net Forensics', duration: '2 Years', fees: 50000, type: 'Science' }
    ],
    placementDetails: {
      averagePackage: '15.5 LPA',
      highestPackage: '70.0 LPA',
      placementPercentage: 95,
      topRecruiters: ['Federal Cyber agency', 'Sentinel Cybersecurity', 'Globeshield Net', 'Apex Defenses']
    },
    reviews: [
      { id: '1', userName: 'NetBreakerCounter', rating: 4.9, comment: 'We play real-time red-team/blue-team simulation games with thousands of dollars on the line. Very high adrenaline.', date: '2026-05-19' }
    ],
    facilities: ['Cyber Warfare Arena', 'Military-Grade Cryptographic Sandbox', 'Net-Forensic Specimen Lab']
  },
  {
    id: 'omni-seattle',
    name: 'Omni IoT and Cybernetics School',
    location: { city: 'Seattle', state: 'Washington' },
    fees: 45000,
    rating: 4.6,
    placementPercentage: 90,
    aiScore: 88,
    establishedYear: 2045,
    overview: 'Omni IoT focuses on the integration of computing in everyday environments. Smart grids, cybernetic prostheses, automated city planning, and low-energy mesh networks.',
    courses: [
      { name: 'B.Tech in Cybernetic Prosthetics', duration: '4 Years', fees: 45000, type: 'Engineering' },
      { name: 'B.Tech in Urban Grid Engineering', duration: '4 Years', fees: 44000, type: 'Engineering' },
      { name: 'M.Tech in Ambient Intelligence Systems', duration: '2 Years', fees: 48000, type: 'Engineering' }
    ],
    placementDetails: {
      averagePackage: '12.5 LPA',
      highestPackage: '50.0 LPA',
      placementPercentage: 90,
      topRecruiters: ['Omni Corp Solutions', 'Pacific Smart Grid', 'Urban Kinetics', 'BioGlow Devices']
    },
    reviews: [
      { id: '1', userName: 'CyberBodyFixer', rating: 4.7, comment: 'Building cybernetic arm controllers and testing them on smart prostheses is incredible. The connection to hospitals is huge.', date: '2026-05-05' }
    ],
    facilities: ['Cybernetic Hanger', 'Smart Home Test Grid', 'Signal Jamming Chamber', '3D Bio-Printer Hub']
  },
  {
    id: 'prism-ny',
    name: 'Prism Academy of Digital Arts',
    location: { city: 'New York City', state: 'New York' },
    fees: 32000,
    rating: 4.2,
    placementPercentage: 86,
    aiScore: 80,
    establishedYear: 2050,
    overview: 'Prism Academy nurtures the next generation of digital creatives. Merging AI generative algorithms, holographic cinematography, and cybernetic art designs into a single discipline.',
    courses: [
      { name: 'B.Sc in Generative Art & Prompts', duration: '3 Years', fees: 30000, type: 'Arts' },
      { name: 'B.Sc in Holographic Cinematography', duration: '3 Years', fees: 32000, type: 'Arts' },
      { name: 'M.Sc in Cybernetic Sculpture', duration: '2 Years', fees: 35000, type: 'Arts' }
    ],
    placementDetails: {
      averagePackage: '8.5 LPA',
      highestPackage: '32.0 LPA',
      placementPercentage: 86,
      topRecruiters: ['Grid Cinema Systems', 'Prism Creative Labs', 'Metropolitan Holographics', 'V-Net Advertising']
    },
    reviews: [
      { id: '1', userName: 'NeonBrush', rating: 4.3, comment: 'Very creative space. For an art school, the placement support is surprisingly strong, mostly in virtual advertising syndicates.', date: '2026-06-11' }
    ],
    facilities: ['Holographic Canvas Studio', 'Spatial Sound Lab', 'Generative GPU Compute Farms']
  }
];
