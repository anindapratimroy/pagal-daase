// ============================================================
//  DAASE — Fallback / built-in data
//  Mirrors the constants in index.html exactly
// ============================================================

export const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbxUatsKOENxCBlC_cPO1e0DoNOIoHcSuOIOcKyCzqheAxmNm3o_TCttqvg5cbNaPRimsQ/exec';

export function drivePhotoUrl(raw) {
  if (!raw) return '';
  const m = raw.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
  if (m) return 'https://drive.google.com/uc?export=view&id=' + m[1];
  const m2 = raw.match(/id=([a-zA-Z0-9_-]{25,})/);
  if (m2) return 'https://drive.google.com/uc?export=view&id=' + m2[1];
  return raw;
}

export const PUBLICATIONS_FB = [
  {
    text: "Aggarwal, K., Choudhary, R. K., Datta, A., & Imamura, T. (2025). On the estimation of solar wind velocity under varying solar activity conditions using Akatsuki measurements. MNRAS.",
    url: "https://doi.org/10.1093/mnras/staf001"
  },
  {
    text: "Datta, A., Choudhury, T. R., Majumdar, S., More, S., Mukherjee, S. (2025). Current status and prospects of cosmology research in India. J Earth Syst Sci.",
    url: "https://doi.org/10.1007/s12040-025-02456-1"
  },
  {
    text: "Brawar, B., Datta, A., & Mangla, S. (2025). Imaging Ionosphere's Wave like Structure Using Interferometry Data. AdSpR.",
    url: "https://doi.org/10.1016/j.asr.2025.01.012"
  },
  {
    text: "Bhaskar, D., Tripathi, R., Shrivastava, M. N. (2025). Lower Ionospheric Perturbations Associated with Lightning Activity over Low and Equatorial Regions. Atmosphere.",
    url: "https://doi.org/10.3390/atmos16010001"
  },
  {
    text: "Saharan, S., Purohit, J., Shrivastava, M. N., Dube, A. (2025). Seasonal dependence of solar flare induced Total Electron Content over low latitude ionosphere. ApSS.",
    url: "https://doi.org/10.1007/s10509-025-04312-4"
  },
  {
    text: "Rana, P., Tarafdar, P., Nobleson, K., Dwivedi, C. (2025). Data-driven Analysis of Stellar Populations. Astronomy & Astrophysics.",
    url: "https://doi.org/10.1051/0004-6361/202452001"
  }
];

export const RESEARCH_AREAS = [
  {
    id: 'compact-objects',
    title: 'Compact Objects & Transients',
    desc: 'Studies of black holes, neutron stars, pulsars, and transient phenomena including gamma-ray bursts.',
    full_description: "The extreme gravity and immense density around the compact objects make them excellent astrophysical laboratories for testing fundamental physics and observing phenomena that can't be created on Earth. The department boasts a vibrant group focusing on observational as well as theoretical aspects of the compact objects and energetic transients in our universe.\n\nThe overarching themes include:\nMultiwavelength study of Neutron Stars, Black Holes, Ultra Luminous X-ray sources (ULXs), Fast Radio Bursts (FRBs), Gamma-Ray bursts (GRBs).\nSimulations of General Relativistic Magneto-hydrodynamics (GRMHD) of accretion disc-jet, High Energy Astrophysics, Astro-particle physics, Multi-messenger Astrophysics.",
    image: 'images/research/img_3.jpg',
    faculty: ['Prof. Bhargav Vaidya', 'Dr. Manoneeta Chakraborty', 'Dr. Mukul Bhattacharya']
  },
  {
    id: 'cosmology',
    title: 'Cosmology',
    desc: 'Probing the early universe, the Epoch of Reionization, observational cosmology, and large-scale structure formation.',
    full_description: "These multiwavelength surveys help us address many fundamental questions in cosmology, e.g. what are the major constituents of our Universe, what is the nature of the dark matter and dark energy, how were the first galaxies formed, how did they affect the state of the intergalactic medium and also the subsequent galaxy formation, how did the galaxies arranged themselves in the complex cosmic web that we see around us today.\n\nGalaxy clusters are the largest gravitationally bound structures in the Universe. Multiwavelength (mostly X-ray and radio) observations of the galaxy clusters can reveal the nature of the dark matter and help us to verify the standard models of cosmology.\n\nLarge-scale Numerical Simulations of the Universe, starting from the early stages of the Universe to the present day, Advanced Machine Learning algorithms for emulation of the cosmological signals and robust Bayesian inference frameworks help us in interpreting these complex observations and reveal the mysterious nature of the Universe.",
    image: 'images/research/img_9.jpg',
    faculty: ['Prof. Abhirup Datta', 'Dr. Saurabh Das']
  },
  {
    id: 'galaxies-agn',
    title: 'Galaxies & Active Galactic Nuclei',
    desc: 'Formation and evolution of galaxies, interstellar medium physics, AGN feedback, and quasar absorption systems.',
    full_description: "Active Galactic Nucleus (AGN) & Jets\nThe primary focus includes investigations of multiwavelength (radio, X-ray, Gamma-ray) signatures of the energetic processes taking place in the vicinity of Active Galactic Nuclei (AGN). Along with observations, researchers are actively involved in building state-of-the-art physics based simulations combining relativity and magnetism (GRMHD/SRMHD) to explore formation, acceleration and propagation of large scale outflows and jets from such supermassive black holes (SMBHs). It also aids to unveil the mystery underlying the launching of extreme particles (UHECRs, Neutrinos) from these objects.\n\nGalaxies\nStudy of Galaxies is another active area of research where both theory/simulation as well observation approaches are used. The specific area of interest include: Interstellar Medium, Dynamical modeling of galaxies, Dark matter distribution in galaxies, Circumgalactic medium.",
    image: 'images/research/img_2.jpg',
    faculty: ['Dr. Suman Majumdar', 'Dr. Rajlaxmi Sahu']
  },
  {
    id: 'sun-heliosphere',
    title: 'Sun & Heliosphere',
    desc: 'Solar physics, heliospheric science, solar wind dynamics, and coronal mass ejections.',
    full_description: "Solar Physics and Space Weather\nStudy of Sun, the nearest star and its physical process through simulation, observation and modelling is the primary focus. A major focus is on space plasma processes in the Sun-Earth environment, aiming to create indigenous space weather modeling frameworks. Physics based simulation as well machine learning/AI approches are used to study the behaviour of Sun and the solar phenomena.\n\nComputational Astrophysics\nThis combines computational methods and algorithms for simulating and analyzing astrophysical data to discover new phenomena. Research also covers dynamical evolution of jets from Active Galactic Nuclei (AGN) and particle acceleration, using advanced simulations to predict observational features.\n\nLower-Upper Atmosphere Coupling\nThe Earth has both neutral atmosphere at the lower height in addition to the ionized layers above. The interaction between these two region shapes the characteristics of both the region. The Space Weather impacts the lower atmosphere through complex mechanism connecting Magnetosphere-Ionosphere-lower atmosphere. The current research is focused on the study of these interaction both from both top side and bottom side.",
    image: 'images/research/img_10.jpg',
    faculty: ['Prof. Bhargav Vaidya', 'Dr. Hariharan']
  },
  {
    id: 'space-weather',
    title: 'Space Weather & Atmospheric Science',
    desc: 'Atmospheric modeling, ionospheric physics, climate modeling, and space weather prediction.',
    full_description: "Remote Sensing & Atmospheric Science\nCloud plays a crucial role in Earth's radiation budget and key component of the hydrological cycle. The thrust of this group is to improve the understanding of the precipitation characteristics and its spatio-temporal evolution using satellite and ground based observations, both in tropical regions like India as well in polar regions like Arctic.\n\nDAASE has established an experimental facility since 2022 at Himadri, Ny Alesund, in the northernmost human settlement to study the precipitation, cloud, atmospheric electricity, lightning and space weather phenomena.\n\nNumerical Weather Prediction and Climate-informatics\nWe actively use WRF models for studying the extreme weather conditions as well on developing improved parameterization schemes. There is an active research going on to develop AI/ML techniques for better predictions of the extreme weathers such as cyclone, thunderstorms, turbulence and lightning combining satellite and NWP models.",
    image: 'images/research/img_16.jpg',
    faculty: ['Prof. Abhirup Datta', 'Dr. Priyanka Singh']
  },
  {
    id: 'instrumentation',
    title: 'Communication, Navigation & Remote Sensing',
    desc: 'RF instrumentation, antenna design, SAR and optical remote sensing, GNSS, CubeSat and drone technologies.',
    full_description: "Instrumentation & Space Technology\n• Satellite Based Navigation\n• Satellite Communication\n• V/Ka/Ku band channel modelling\n• Cubesat communication\n• Payload, Navigation, Control\n• Detector Simulation and Calibration",
    image: 'images/research/img_1.jpg',
    faculty: ['Dr. Siddharth Malu', 'Dr. Unmesh Khati', 'Dr. Amit Shukla']
  },
  {
    id: 'data-science',
    title: 'Data Science & ML in Astrophysics',
    desc: 'Machine learning, statistical inference, Bayesian analysis, and computational astrophysics.',
    full_description: "Data Science\n• Bayesian Machine Learning\n• Quantum Machine Learning",
    image: 'images/research/img_4.jpg',
    faculty: ['Dr. Suman Majumdar', 'Dr. Saurabh Das']
  }
];

export const FACULTY_FB = [
  { name: 'Dr. Saurabh Das', designation: 'Associate Professor & HoD', isHOD: true, research: 'Remote Sensing, Atmospheric Physics, Aerosols, Climate Science, LIDAR', email: 'saurabh.das', photo: 'images/faculty/saurabh_das.jpg', url: 'http://people.iiti.ac.in/~saurabh.das/' },
  { name: 'Prof. Abhirup Datta', designation: 'Professor', research: 'Radio Astronomy, Epoch of Reionization, SKA, Radio Instrumentation', email: 'abhirup.datta', photo: 'images/faculty/abhirup_datta.jpg', url: 'https://sites.google.com/iiti.ac.in/abhirupdatta/' },
  { name: 'Prof. Bhargav Vaidya', designation: 'Professor', research: 'Computational Astrophysics, MHD, Relativistic Jets, High-Energy Astrophysics', email: 'bhargav.vaidya', photo: 'images/faculty/bhargav_vaidya.jpg', url: 'http://people.iiti.ac.in/~bvaidya/' },
  { name: 'Dr. Narendra Nath Patra', designation: 'Assistant Professor', research: 'HI 21-cm, Epoch of Reionization, Radio Interferometry, IGM', email: 'narendranath.patra', photo: 'images/faculty/narendra_patra.jpg', url: 'http://people.iiti.ac.in/~naren/' },
  { name: 'Dr. Manoneeta Chakraborty', designation: 'Assistant Professor', research: 'X-ray Astronomy, Compact Objects, Neutron Stars, Black Holes', email: 'manoneeta.chakraborty', photo: 'images/faculty/manoneeta_chakraborty.jpg', url: 'http://people.iiti.ac.in/~manoneeta/' },
  { name: 'Dr. Soumavo Ghosh', designation: 'Assistant Professor', research: 'Galaxy Evolution, Interstellar Medium, Disk Galaxies, HI Observations', email: 'soumavo.ghosh', photo: 'images/faculty/soumavo_ghosh.jpg', url: 'https://sites.google.com/view/drsoumavoghosh' },
  { name: 'Dr. Prakash Gaikwad', designation: 'Assistant Professor', research: 'Cosmology, Lyman-alpha Forest, Intergalactic Medium, Reionization', email: 'prakash.gaikwad', photo: 'images/faculty/prakash_gaikwad.jpg', url: 'https://sites.google.com/view/daase/faculty' },
  { name: 'Dr. Suman Majumdar', designation: 'Assistant Professor', research: 'Cosmological 21-cm Signal, SKA, Reionization, Statistical Methods', email: 'suman.majumdar', photo: 'images/faculty/suman_majumdar.jpg', url: 'http://people.iiti.ac.in/~sumanm/' },
  { name: 'Dr. Deepika Bollimpalli', designation: 'Assistant Professor', research: 'Accretion Disk Physics, MHD, Black Hole Accretion, Compact Objects', email: 'deepika.bollimpalli', photo: 'images/faculty/deepika_bollimpalli.jpg', url: 'https://sites.google.com/view/daase/faculty' },
  { name: 'Dr. Priyanka Singh', designation: 'Assistant Professor', research: 'Space Weather, Ionospheric Physics, GNSS, Atmospheric Science', email: 'priyanka.singh', photo: 'images/faculty/priyanka_singh.jpg', url: 'https://psingh220.github.io/pswebpage/home.html' },
  { name: 'Dr. Unmesh Khati', designation: 'Assistant Professor', research: 'SAR Remote Sensing, GNSS, Earth Observation, Navigation', email: 'unmesh.khati', photo: 'images/faculty/unmesh_khati.jpg', url: 'http://people.iiti.ac.in/~unmesh.khati/' },
  { name: 'Dr. Amit Shukla', designation: 'Assistant Professor', research: 'RF Engineering, Antenna Design, Microwave Systems, Instrumentation', email: 'amit.shukla', photo: 'images/faculty/amit_shukla.jpg', url: 'https://sites.google.com/iiti.ac.in/welcome/home' },
  { name: 'Dr. Mukul Bhattacharya', designation: 'Assistant Professor', research: 'Multi-messenger Physics, High Energy Transients', email: 'mukulb', photo: 'images/faculty/mukul_bhattacharya.jpg', url: 'https://mukulbhattacharya1.wixsite.com/mukulb' },
];

export const VISITING_FB = [
  { name: 'Prof. Hari Hablani', designation: 'Visiting Distinguished Professor', research: 'Spaceflight Vehicles Guidance, Navigation and Control', email: '', photo: 'images/faculty/hari_hablani.jpg', url: '' },
  { name: 'Prof. V Chandrasekar', designation: 'Visiting Distinguished Professor', research: 'Radar Meteorology, Radar System Design, DSP Design, RF Communication Systems', email: '', photo: 'images/faculty/v_chandrasekar.jpg', url: '' },
  { name: 'Prof. Sudhir Kamle', designation: 'Visiting Professor', research: 'Smart Materials & Structures', email: 'kamle', photo: 'images/faculty/sudhir_kamle.jpg', url: '' },
  { name: 'Dr. Ramesh Bhat', designation: 'Visiting Professor', research: 'Pulsars, Radio Transients, Radio Astronomy', email: '', photo: 'images/faculty/ramesh_bhat.jpg', url: '' },
];

export const PG_FB = {
  "M.Sc. Astronomy \u2014 Batch 2025": [
    {
      "name": "Aman Kumar Jha",
      "email": "msc2503121001",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Asutosh Kumar Behera",
      "email": "msc2503121002",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Gayathri M",
      "email": "msc2503121003",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Jayanti Paul",
      "email": "msc2503121004",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Kalash Dharmeshbhai Thakkar",
      "email": "msc2503121005",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Kanchan Singh",
      "email": "msc2503121006",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Purvin Sunil Bhalekar",
      "email": "msc2503121007",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Ranjan Yadav",
      "email": "msc2503121008",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Rohit Raj",
      "email": "msc2503121009",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Rushikesh Ashok Sonkusale",
      "email": "msc2503121010",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Sougata Bhattacharyya",
      "email": "msc2503121011",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Vibhawari Pramod Suryawanshi",
      "email": "msc2503121014",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Yash Mani Tiwari",
      "email": "msc2503121015",
      "supervisor": "",
      "research_interests": ""
    }
  ],
  "M.Sc. Astronomy \u2014 Batch 2024": [
    {
      "name": "Aditya Prakash Sharma",
      "email": "msc2403121001",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": ""
    },
    {
      "name": "Kaivan Sanjay Shah",
      "email": "msc2403121004",
      "supervisor": "Dr. Manoneeta Chakraborty",
      "research_interests": ""
    },
    {
      "name": "Kanishka Gautam",
      "email": "msc2403121005",
      "supervisor": "Dr. Soumavo Ghosh",
      "research_interests": ""
    },
    {
      "name": "Kartik Venkataramana Kambhampati",
      "email": "msc2403121006",
      "supervisor": "Dr. Prakash Gaikwad",
      "research_interests": ""
    },
    {
      "name": "Manpreet Singh",
      "email": "msc2403121007",
      "supervisor": "Dr. Prakash Gaikwad",
      "research_interests": ""
    },
    {
      "name": "Mayukh Mandal",
      "email": "msc2403121008",
      "supervisor": "Dr. Suman Majumdar",
      "research_interests": ""
    },
    {
      "name": "Nityananda Padhi",
      "email": "msc2403121009",
      "supervisor": "Dr. Manoneeta Chakraborty",
      "research_interests": ""
    },
    {
      "name": "Sangeeta",
      "email": "msc2403121011",
      "supervisor": "Dr. Soumavo Ghosh",
      "research_interests": ""
    },
    {
      "name": "Sangeetha A",
      "email": "msc2403121012",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    },
    {
      "name": "Sayan Maity",
      "email": "msc2403121013",
      "supervisor": "Dr. Deepika Bollimpalli",
      "research_interests": ""
    },
    {
      "name": "Sucharita Charan",
      "email": "msc2403121014",
      "supervisor": "Dr. Priyanka Singh",
      "research_interests": ""
    },
    {
      "name": "Vishal Sarkar",
      "email": "msc2403121016",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": ""
    }
  ],
  "M.Tech. AOLT \u2014 Batch 2025": [
    {
      "name": "Akash Patel",
      "email": "mt2502121001",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Alekh Prasad Behera",
      "email": "mt2502121002",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Arbaj Khan",
      "email": "mt2302121003",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Arka Biswas",
      "email": "mt2502121004",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Shubham Shrivastava",
      "email": "mt2502121006",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Varad Shridharbhai Purohit",
      "email": "mt2502121007",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Anshul Parmar",
      "email": "mt2502121008",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Navneet Dubey",
      "email": "mt2502121009",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Pallavisingh",
      "email": "mt2502121010",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Rashmiranjita Suar",
      "email": "mt2502121011",
      "supervisor": "",
      "research_interests": ""
    }
  ],
  "M.Tech. Space Engineering \u2014 Batch 2025": [
    {
      "name": "Aninda Pratim Roy",
      "email": "mt2502121016",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Radar Instrumentation"
    },
    {
      "name": "Ashutosh Kumar",
      "email": "mt2502121018",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    },
    {
      "name": "Atreyee Bhattacharjee",
      "email": "mt2502121019",
      "supervisor": "Dr. Amit Shukla",
      "research_interests": ""
    },
    {
      "name": "Shubhangi Uikey",
      "email": "mt2502101017",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": ""
    },
    {
      "name": "Eshaan Sowale",
      "email": "mt2502121021",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": ""
    },
    {
      "name": "Karni Rathore",
      "email": "mt2502121022",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Sanjay Sugunan",
      "email": "mt2502121023",
      "supervisor": "",
      "research_interests": ""
    },
    {
      "name": "Shreya Ojha",
      "email": "mt2502121024",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": ""
    },
    {
      "name": "Unnati Manohar Dhingriya",
      "email": "mt2502121025",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": ""
    }
  ],
  "M.Tech. Space Engineering \u2014 Batch 2024": [
    {
      "name": "Anismita Biswas",
      "email": "mt2402121001",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    },
    {
      "name": "Rasaprolu Lakshya",
      "email": "mt2402121002",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": ""
    },
    {
      "name": "Eknoor Kaur",
      "email": "mt2402121003",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": ""
    }
  ],
  "M.S. (Research) \u2014 Batch 2025": [
    {
      "name": "Chanchal",
      "email": "ms2504121001",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": ""
    },
    {
      "name": "Renuka Mahajan",
      "email": "ms2504121003",
      "supervisor": "Dr. Suman Majumdar",
      "research_interests": ""
    },
    {
      "name": "Soumya Gupta",
      "email": "ms2504121004",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": ""
    },
    {
      "name": "Sudhamshu G",
      "email": "ms2504121005",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    }
  ],
  "M.S. (Research) \u2014 Batch 2024": [
    {
      "name": "Yash Raj",
      "email": "ms2404121001",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": ""
    },
    {
      "name": "Riddhi Srivastava",
      "email": "ms2404121002",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    },
    {
      "name": "Riya",
      "email": "ms2404121003",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    },
    {
      "name": "Ankur Sinha",
      "email": "ms2404121004",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": ""
    },
    {
      "name": "Shailendra Dabral",
      "email": "ms2404121005",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": ""
    }
  ]
};

export const UG_FB = {
  'B.Tech. Space Science & Engineering — Batch 2025': [
    { name: 'Abhijeet', email: 'sse250021001' }, { name: 'Amaan Ali', email: 'sse250021002' },
    { name: 'Aryan Shyam Shinde', email: 'sse250021003' }, { name: 'Ayush R Mishra', email: 'sse250021004' },
    { name: 'Fiya', email: 'sse250021005' }, { name: 'Harshdeep Singh', email: 'sse250021006' },
    { name: 'Harshit Verma', email: 'sse250021007' }, { name: 'Hetal Saraf', email: 'sse250021008' },
    { name: 'Kanoje Yash Shyam', email: 'sse250021009' }, { name: 'Kondamuri Tathwik', email: 'sse250021010' },
    { name: 'Mannath Vinay Jain', email: 'sse250021012' }, { name: 'Pranjal I. Waghmare', email: 'sse250021013' },
    { name: 'Samyak Patil', email: 'sse250021014' }, { name: 'Shah Het Hardikkumar', email: 'sse250021015' },
    { name: 'Shivam Pandey', email: 'sse250021016' }, { name: 'Singampalli Tanooj', email: 'sse250021017' },
    { name: 'Somya Mangal', email: 'sse250021018' }, { name: 'Vedant Sahu', email: 'sse250021019' },
    { name: 'Vemula Ashritha', email: 'sse250021020' },
  ],
  'B.Tech. Space Science & Engineering — Batch 2024': [
    { name: 'Amadala Sathvik', email: 'sse240021001' }, { name: 'Ananya Shubhangi Sinha', email: 'sse240021002' },
    { name: 'Apurva Dinesh Chipte', supervisor: 'Dr. Narendra Patra', email: 'sse240021003' },
    { name: 'Bhav Makhija', email: 'sse240021004' }, { name: 'Burra Venkata Chakrapani', email: 'sse240021005' },
    { name: 'Gujjala Mohit Sasi Chandra', email: 'sse240021006' }, { name: 'Karedla Pavan Kalyan', email: 'sse240021007' },
    { name: 'Kartikey Raghav', email: 'sse240021008' }, { name: 'Lathiya Pinak Paresh', email: 'sse240021009' },
    { name: 'Manish Kumawat', email: 'sse240021010' }, { name: 'Patel Devki', supervisor: 'Dr. Priyanka Singh', email: 'sse240021011' },
    { name: 'Pritish Dutta', email: 'sse240021012' }, { name: 'Sabavath Raghavendar', email: 'sse240021014' },
    { name: 'Sakshya Singh Kasera', supervisor: 'Dr. Priyanka Singh', email: 'sse240021015' },
    { name: 'Seelam Chandra Shekar Vinayak', email: 'sse240021016' }, { name: 'Shrey Aggarwal', email: 'sse240021017' },
    { name: 'Srujana Patil', email: 'sse240021018' },
  ],
  'B.Tech. Space Science & Engineering — Batch 2023': [
    { name: 'Aman', email: 'sse230021001' }, { name: 'Anjanayae Chaurasia', email: 'sse230021002' },
    { name: 'Anuvab Mandal', email: 'sse230021003' }, { name: 'Apoorv Singh', email: 'sse230021004' },
    { name: 'Arnav Deshpande', email: 'sse230021005' }, { name: 'Bunga Manoj Kumar', email: 'sse230021006' },
    { name: 'Dhriti Jha', email: 'sse230021007' }, { name: 'Dodiya Yashkumar Shailesh', supervisor: 'Dr. Unmesh Khati', email: 'sse230021008' },
    { name: 'K Hari Balan', email: 'sse230021009' }, { name: 'N. Kaveri', email: 'sse230021010' },
    { name: 'Parul Pahurkar', supervisor: 'Dr. Bhargav Vaidya', email: 'sse230021011' }, { name: 'Prem Pratik', email: 'sse230021012' },
    { name: 'Ramavath Deepak Kumar', email: 'sse230021013' }, { name: 'Rathod Nisarg Bipinbhai', email: 'sse230021014' },
    { name: 'Sakshi Sidhe', email: 'sse230021015' }, { name: 'Siddharth Vezzu', email: 'sse230021016' },
    { name: 'Srinivas G. C. Nelavalli', email: 'sse230021017' }, { name: 'Sudarsanam S.S.N.S. Kumar', email: 'sse230021018' },
    { name: 'Valali Sai Pranav', email: 'sse230021019' }, { name: 'Vandan Nagori', email: 'sse230021020' },
  ],
};

export const ALUMNI_FB = [
  { year: 'Batch 2025', msc: ['Annie Chandrika Sattenapalli', 'Anushka Agarwal', 'Aryan Bhake', 'Ashutosh Das', 'Daisy Rani Boro', 'Gitaj Singh', 'Harikrishnan R', 'Navanit A V', 'Parth Hitesh Kothari', 'Prasad Rajesh Posture', 'Vijay Choudhary'], mtech: ['Abhishek Darwai', 'Aman Dubey', 'Harsh Kararwal', 'Katta Rajat', 'Ranjan Kumar', 'Souradeep Hazra', 'Sreya Ghosh', 'Tejas Rajendra Rajuskar'], ms: ['Kumar Sheshank Shekhar', 'Harshal Raut'], phd: ['Sushmita Agarwal', 'Harsha Avinash Tanti', 'Chandra Shekhar Murmu', 'Soumen Datta', 'Harsha Tanti', 'Anshuman Tripathi'] },
  { year: 'Batch 2024', msc: ['Sparsh Arya', 'A Aditya', 'Avasarala Praneeth', 'G Akash', 'Krishangi Kashyap', 'Sheetal', 'Sanjay Kumar Yadav', 'Kunal Thapar', 'Ashad Ahmad', 'Potluri Hemanth', 'Tiasha Biswas'], mtech: ['Sudhanshu Rajesh Gavade', 'Anjali Patel', 'Kundan Sahu', 'Gautam Arora'], ms: ['Nitig Singh', 'Manish Kumar Mawatwal', 'Chavakula Subhasri', 'Mohit Jagne', 'Nikita'], phd: ['Parul Janagal', 'Sarvesh Mangla', 'Akriti Sinha', 'Hemapriya R', 'Swarna Chatterjee', 'Prateek Mayank'] },
  { year: 'Batch 2023', msc: ['Alvera Farooqui', 'Vednarayan Sriram Iyer', 'Ansh Chopra', 'Pranjali Sharma', 'Soumya Manoj Gupta', 'Avinash Kumar Himanshu', 'Sayeed Kazim Hussain Nasir', 'Priyatam Kumar Mahto', 'Amit Poonia', 'Saurabh', 'Sumit Gautam', 'Keshav Aggarwal'], mtech: ['Ankit Bhanu', 'Shubhanshu U. Bishwash', 'Narthu Santhosh Kumar', 'Pushp Ranjan', 'Archishman Guha'], ms: ['Saswata Dasgupta'], phd: ['Naga Vijaya Deepthi A', 'Aishrila Mazumder', 'Sayan Kundu', 'Unnati Kashyap', 'Sriyasriti Acharya', 'Gourab Giri', 'Arghyadeep Paul'] },
  { year: 'Batch 2022', msc: ['Ankit Meena', 'Gursharanjit Kaur', 'Jibin V Sunny', 'Kishlay Singh', 'Motghare Kunal Manoharrao', 'Manish Kumar Singh', 'Pawan Tiwari', 'Sirsha Nandy', 'Sohini Dutta'], mtech: [], ms: [], phd: ['Madhurima Choudhury', 'Majidul Rahaman', 'Althaf A', 'Mohd Kamran', 'Sanmoy Bandyopadhyay', 'Chandrani Chatterjee'] },
  { year: 'Batch 2021', msc: ['Aadarsh Pathak', 'Ravi Pratap Dubey', 'Koyena Das', 'Hemanth Kumar Reddy Bommireddy', 'Pranoy Ghosh', 'Chandan Kumar Das', 'Anuraag Arya', 'Saranniya S', 'Mugatwala Ronish Himanshu', 'Himanshu', 'Prattipati Sanjeeva Rao', 'Maneesh Bazgalia', 'Vikrant Someshwar Londhe', 'Vabbani Krishna Kumar'], mtech: [], ms: [], phd: ['Sumanjit Chakraborty', 'Ramij Raja', 'Arnab Chakraborty'] },
  { year: 'Batch 2020', msc: ['Anchal Saxena', 'Biki Ram', 'Himanshu Tiwari', 'Indrendra Sisodiya', 'Nikhil Sanjay Borse', 'Samanvith A', 'Sandeep Kumar'], mtech: [], ms: [], phd: [] },
];

export const FACILITIES_FB = [
  { icon: '📡', name: 'IITI Radio Interferometer Observatory' },
  { icon: '📻', name: 'Radio Frequency Lab (up to 60 GHz)' },
  { icon: '🔭', name: 'Optics Lab' },
  { icon: '🌐', name: 'IoT Lab' },
  { icon: '🛰️', name: 'Remote Sensing Lab' },
  { icon: '⚡', name: 'Plasma Lab' },
  { icon: '🥽', name: 'VR-Based Data Observatory' },
  { icon: '💡', name: 'Electronics Device & Circuit Lab' },
  { icon: '🚁', name: 'Drone Fleet' },
  { icon: '🌈', name: 'Hyperspectral Imaging System' },
  { icon: '📶', name: 'Microwave Optics System' },
  { icon: '🧲', name: 'Helmholtz Cage' },
  { icon: '🖱️', name: 'VLSI System Trainer Kit' },
  { icon: '🏠', name: 'Anechoic Chamber' },
  { icon: '🌧️', name: 'Micro Rain Radar' },
  { icon: '💧', name: 'Laser Precipitation Monitor' },
  { icon: '📏', name: 'LIDAR-Ceilometer' },
  { icon: '⚡', name: 'Electric Field Mill & Lightning Detector' },
  { icon: '🖥️', name: 'PCB Fabrication Tools' },
  { icon: '🧊', name: 'Arctic Research Facility — Himadri' },
];

export const EVENTS_FB = [
  { title: '3-Day Workshop on Numerical Techniques for Atmospheric and Space Sciences 2025', date: 'December 15–17, 2025', type: 'upcoming' },
  { title: 'SKA-India Summer Training Program 2025', date: 'July 7–18, 2025', type: 'past' },
  { title: 'RETCO-VI: 6th National Conference on Recent Trends in the Study of Compact Objects', date: 'March 10–12, 2025', type: 'past' },
  { title: 'DAASE Outreach Series — Stargazing Sessions, Space Quizzes & Hackathons', date: 'Ongoing · Semester Events', type: 'past' },
];
export const PHD_FB = {
  "Ph.D. \u2014 Batch 2021": [
    {
      "name": "Rashmi Sagar",
      "email": "phd2101121003",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Observational Cosmology"
    },
    {
      "name": "Bhuvnesh Brawar",
      "email": "phd2101121005",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Space weather and Ionospheric phenomena"
    },
    {
      "name": "Lekhraj Saini",
      "email": "phd2101121007",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Climate change over the Arctic region"
    },
    {
      "name": "Samit Kumar Pal",
      "email": "phd2101121008",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Radio Astronomy, Observational Cosmology"
    },
    {
      "name": "Ayush Garg",
      "email": "phd2101221001",
      "supervisor": "Dr. Amit Shukla",
      "research_interests": "Gamma-Ray Bursts (GRBs), Active Galactic Nucleus (AGNs)"
    },
    {
      "name": "Biki Ram",
      "email": "phd2101221002",
      "supervisor": "Dr. Manoneeta Chakraborty",
      "research_interests": "Neutron star, Black holes, X-ray binaries, Accretion Physics, X-ray Burst"
    }
  ],
  "Ph.D. \u2014 Batch 2022": [
    {
      "name": "Jithu J Athalathil",
      "email": "phd2201121002",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": "Space-Weather"
    },
    {
      "name": "Anam Sabir",
      "email": "phd2201121003",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": "SAR Time-series, Forest Disturbance Mapping"
    },
    {
      "name": "Leon Noble",
      "email": "phd2201121004",
      "supervisor": "Dr. Suman Majumdar",
      "research_interests": "Cosmic Dawn and Epoch of Reionization"
    },
    {
      "name": "Chandan Kumar Das",
      "email": "phd2201121006",
      "supervisor": "Dr. Amit Shukla",
      "research_interests": "Particle Acceleration in Astrophysical Jets"
    },
    {
      "name": "Vaibhav Tyagi",
      "email": "phd2201121012",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Atmospheric Remote Sensing: Extreme weather conditions"
    },
    {
      "name": "Shraddha Mohnnai",
      "email": "phd2201121011",
      "supervisor": "Dr. Amit Shukla",
      "research_interests": "High Energy Astrophysics"
    },
    {
      "name": "Sakshi Jain",
      "email": "phd2201121014",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": "Remote sensing"
    }
  ],
  "Ph.D. \u2014 Batch 2023": [
    {
      "name": "Harshita Bhuyan",
      "email": "phd2201221002",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": "Multi-wavelength and multi-messenger astronomy, computational astrophysics"
    },
    {
      "name": "Nalla Chumbitha Leena",
      "email": "phd2201221004",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": "Microwave remote sensing"
    },
    {
      "name": "Atharva Hemant Mirashi",
      "email": "phd2301121001",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": "Galaxy Structure & Evolution, Radio Astronomy"
    },
    {
      "name": "Tamanna Singh",
      "email": "phd2301121002",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Extreme Weather Prediction and TGFs"
    },
    {
      "name": "Sirsha Nandy",
      "email": "phd2301121003",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": "Physics-based Modeling of Solar Wind-Magnetosphere Interaction"
    },
    {
      "name": "Aditya Sharma",
      "email": "phd2301121004",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": "Relativistic AGN Jets"
    },
    {
      "name": "Aromal P",
      "email": "phd2301121005",
      "supervisor": "Dr. Manoneeta Chakraborty",
      "research_interests": "Compact Objects"
    },
    {
      "name": "D Manas Mohit",
      "email": "phd2301121006",
      "supervisor": "Dr. Suman Majumdar",
      "research_interests": "Large-Scale Structure, Line Intensity Mapping, Cosmic Dawn and Epoch of Reionisation"
    },
    {
      "name": "Jibin Jose",
      "email": "phd2301121007",
      "supervisor": "Dr. Manoneeta Chakraborty",
      "research_interests": "Compact Objects"
    },
    {
      "name": "Kavita",
      "email": "phd2301121008",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Atmospheric and Space Science"
    },
    {
      "name": "Keerthi K",
      "email": "phd2301121009",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": "Galaxy evolution and properties of bars"
    },
    {
      "name": "Nasmi S Anand",
      "email": "phd2301121010",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Study of diffuse radio emission in galaxy clusters"
    },
    {
      "name": "Parvathy Thankachy P",
      "email": "phd2301121011",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Parameterization in NWP model"
    },
    {
      "name": "Pranjal Chaturvedi",
      "email": "phd2301121012",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Multiwavelength Astronomy, AstroSat, Galaxies"
    },
    {
      "name": "Yashrajsinh Mahida",
      "email": "phd2301121014",
      "supervisor": "Dr. Suman Majumdar",
      "research_interests": "Cosmic Dawn and Epoch of Reionization, Early Universe Cosmology"
    },
    {
      "name": "Keshav Aggarwal",
      "email": "mscphd2301121015",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Solar, Planetary and Exoplanetary atmospheres"
    }
  ],
  "Ph.D. \u2014 Batch 2024": [
    {
      "name": "Saurabh Jha",
      "email": "phd2401121005",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Space Weather, Ionospheric Physics"
    },
    {
      "name": "Samir Sethi",
      "email": "phd2401121003",
      "supervisor": "Dr. Priyanka Singh",
      "research_interests": "Cosmology with Fast Radio Burst"
    },
    {
      "name": "Thomas George P",
      "email": "phd2401121006",
      "supervisor": "Dr. Priyanka Singh",
      "research_interests": "Circumgalactic Medium, Galaxy Cluster Evolution"
    },
    {
      "name": "Dizna James",
      "email": "phd2401121001",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Atmospheric Remote Sensing"
    },
    {
      "name": "Pritam Hore",
      "email": "phd2401121002",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Radio Astronomy, Galaxy Clusters"
    },
    {
      "name": "Santanu Maity",
      "email": "phd2401121004",
      "supervisor": "Dr. Saurabh Das",
      "research_interests": "Space Weather Phenomenon, ML and DL methods"
    }
  ],
  "Ph.D. \u2014 Batch 2025": [
    {
      "name": "Devesh Sharma",
      "email": "mscphd2303121008",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": "Solar Physics"
    },
    {
      "name": "Arpan Dawn",
      "email": "phd2501121003",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": "SAR, Forest Biomass"
    },
    {
      "name": "Shivani Pandey",
      "email": "phd2501121012",
      "supervisor": "Dr. Soumavo Ghosh",
      "research_interests": "Galaxy Dynamics and Evolution"
    },
    {
      "name": "Manish Singh Almia",
      "email": "phd2501121011",
      "supervisor": "Dr. Prakash Gaikwad",
      "research_interests": "Astrophysics"
    },
    {
      "name": "Ami Nimeshkumar Tank",
      "email": "phd2501121002",
      "supervisor": "Dr. Soumavo Ghosh",
      "research_interests": "Galaxy dynamics and evolution"
    },
    {
      "name": "Amar Deep",
      "email": "mscphd2303121001",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Interaction of solar wind with the Earth's magnetosphere, energy transfer processes and magnetospheric dynamics"
    },
    {
      "name": "Shiriny Akthar",
      "email": "phd2401221002",
      "supervisor": "Dr. Suman Majumdar",
      "research_interests": "Line-Intensity-Mapping (LIM), Epoch of Reionization (EoR), Cosmological Model"
    },
    {
      "name": "Aniket Sharma",
      "email": "phd2501121005",
      "supervisor": "Dr. Bhargav Vaidya",
      "research_interests": "Solar Wind Turbulence"
    },
    {
      "name": "Shubhi Tiwari",
      "email": "mtphd2302121006",
      "supervisor": "Prof. Abhirup Datta & Dr. Hari B Hablani",
      "research_interests": "Space Debris Detection using Small Satellites"
    },
    {
      "name": "Vishrut Pandya",
      "email": "mscphd2303121015",
      "supervisor": "Dr. Suman Majumdar & Prof. Abhirup Datta",
      "research_interests": "Developing novel statistical techniques to explore cosmology"
    },
    {
      "name": "Bhavya Jaiman",
      "email": "phd2501121007",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": "Earth Observation (SAR)"
    },
    {
      "name": "Pratived Sahu",
      "email": "phd2501121001",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Astronomy and Astrophysics"
    },
    {
      "name": "Barenya Kumar Dev",
      "email": "phd2501121008",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Radio Astronomy, Radio Loud AGN, Galaxy Evolution, Galaxy Clusters"
    },
    {
      "name": "Popat Jeel Hitendrabhai",
      "email": "phd2401221001",
      "supervisor": "Dr. Deepika Bollimpalli",
      "research_interests": "Modeling variability phenomena in BHXRBs"
    },
    {
      "name": "Vatsal Garg",
      "email": "phd2401221005",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": "Galaxy Formation and Evolution"
    }
  ],
  "Ph.D. \u2014 Batch 2026": [
    {
      "name": "Nithyapriya S",
      "email": "phd2501221003",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Cosmology, Galaxy Cluster"
    }
  ]
};

export const INTERNS_FB = {
  'Current Interns': [
    { name: 'Intern Placeholder 1', supervisor: 'Dr. Saurabh Das' },
    { name: 'Intern Placeholder 2', supervisor: 'Prof. Abhirup Datta' }
  ]
};

export const NEWS_FB = [];
export const OUTREACH_FB = [];

export const STAFF_FB = [
  { sortOrder: 1, name: 'Swapnil Dasharath Sankhe', designation: 'Senior Assistant (HoD Staff)', email: 'aase-office' },
  { sortOrder: 2, name: 'Rahul Khare', designation: 'Technical/Administrative Staff', email: 'aase-office' },
  { sortOrder: 3, name: 'Varunesh Shukla', designation: 'Technical/Administrative Staff', email: 'aase-office' },
  { sortOrder: 4, name: 'Abhijeet Dutta', designation: 'Technical/Administrative Staff', email: 'aase-office' },
  { sortOrder: 5, name: 'Durgesh Chouhan', designation: 'Technical/Administrative Staff', email: 'aase-office' },
];


