// ============================================================
//  DAASE — Fallback / built-in data
//  Mirrors the constants in index.html exactly
// ============================================================

export const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbzSXaHZ9UjyUh9MDi7CAX5ULucK0Gefwc0vQvyTPUfWTrVI0mQjflyTD_WdF_mcfm-rBA/exec';

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
    desc: 'Studies of black holes, neutron stars, pulsars, fast radio bursts (FRBs), gamma-ray bursts (GRBs), and gravitational wave astrophysics.',
    full_description: "Overview & Science Goals\nThe extreme gravity and immense density around compact objects make them unparalleled astrophysical laboratories for testing fundamental physics and observing phenomena that cannot be created on Earth. The department boasts a vibrant research group focusing on observational, computational, and theoretical aspects of compact objects and energetic transients in the universe.\n\nBlack Holes & Relativistic Accretion\nBlack holes are the end-state of massive stellar evolution offering a unique testing ground for theories of gravity in the strong-field regime. Multi-wavelength observational studies from radio to X-ray wavebands probe emission mechanisms and accretion variability. Magnetohydrodynamic (MHD/GRMHD) simulations of relativistic jets and accretion dynamics unveil the high-energy processes near event horizons.\n\nNeutron Stars & Pulsars\nNeutron stars reach supranuclear densities in their cores, providing ideal environments to probe strong gravity and dense matter equations of state. Observational signatures such as thermonuclear bursts, burst oscillations, Quasi-Periodic Oscillations (QPOs), and relativistic outflows are actively studied. Pulsar emission mechanisms (accretion-powered, rotation-powered, and magnetically-powered) and high-precision timing via Pulsar Timing Arrays (PTAs) serve as ultra-stable cosmic clocks for detecting nanoHertz gravitational waves.\n\nFast Radio Bursts (FRBs) & Gamma-Ray Bursts (GRBs)\nFast Radio Bursts (FRBs) are millisecond-duration radio transients probing magnetar physics and cosmological intergalactic media. Gamma-Ray Bursts (GRBs) represent the most luminous explosive phenomena from massive stellar collapse or binary neutron star mergers, serving as crucial electromagnetic counterparts to gravitational waves.\n\nGravitational Waves, Kilonovae & Multi-Messenger Astrophysics\nExploring compact object mergers through gravitational-wave detections and electromagnetic follow-ups, with focus on high-energy emission from kilonovae, r-process nucleosynthesis, and low-frequency gravitational waves from supermassive black hole binaries.",
    image: 'images/research/Compact_Objects_Transients.png',
    faculty: ['Dr. Manoneeta Chakraborty', 'Dr. Bhargav Vaidya', 'Dr. Amit Shukla', 'Dr. Deepika Bollimpalli', 'Dr. Mukul Bhattacharya']
  },
  {
    id: 'cosmology',
    title: 'Cosmology',
    desc: 'Probing the early universe, 21-cm cosmology, the Epoch of Reionization, Cosmic Dawn, Line Intensity Mapping, and large-scale structure formation.',
    full_description: "Precision Cosmology & Multiwavelength Surveys\nCosmology is the study of the evolutionary history of our Universe. The present age is the era of Precision Cosmology, driven by large-scale surveys conducted via Earth-based and space-based telescopes across the electromagnetic spectrum: Radio (GMRT, MWA, LOFAR, MeerKAT, SKA), Infrared (TIM, CONCERTO, COMAP, SPHEREx), Microwave (Planck, WMAP), Optical (Hubble, JWST, LSST, TMT, ELT, SDSS, DES), X-ray (eROSITA), and Gravitational Waves (LIGO). DAASE faculty are actively involved in national and international consortia for these experiments.\n\nMultiwavelength Line Intensity Mapping (LIM)\nMultiwavelength Line Intensity Mapping is one of the most powerful tools to map large-scale structures across cosmic time. The cosmologically redshifted 21-cm line emitted by the spin-flip transition in neutral hydrogen (HI) allows probing the intergalactic medium from the Cosmic Dark Ages through the Cosmic Dawn to the Epoch of Reionization (EoR). Post-reionization, the 21-cm line maps neutral hydrogen in galaxies, tracing the cosmic web. Other atomic and molecular lines (singly ionized carbon [CII], carbon monoxide CO, doubly ionized oxygen [OIII]) map star-forming galaxies across cosmic history.\n\nGalaxy Clusters & Dark Matter\nGalaxy clusters are the largest gravitationally bound structures in the Universe. Multiwavelength observations (primarily X-ray and radio) reveal the nature and distribution of dark matter and test standard cosmological models (ΛCDM).\n\nCosmological Simulations, Machine Learning & Bayesian Inference\nLarge-scale numerical simulations from the early universe to the present day, advanced Machine Learning emulators for cosmological signals, and robust Bayesian inference frameworks help interpret complex observational datasets and constrain fundamental cosmological parameters.",
    image: 'images/research/Cosmology.png',
    faculty: ['Prof. Abhirup Datta', 'Dr. Suman Majumdar', 'Dr. Priyanka Singh', 'Dr. Prakash Gaikwad']
  },
  {
    id: 'galaxies-agn',
    title: 'Galaxies & Active Galactic Nuclei',
    desc: 'Formation and dynamical evolution of galaxies, interstellar medium physics, dark matter distribution, and relativistic AGN jets.',
    full_description: "Active Galactic Nuclei (AGN) & Relativistic Jets\nActive Galactic Nuclei are among the most energetic engines in the universe. Research focuses on multiwavelength signatures (radio, optical, X-ray, Gamma-ray) of physical processes in the vicinity of supermassive black holes (SMBHs). State-of-the-art simulations combining general relativity and magnetic fields (GRMHD/SRMHD) explore the launching, acceleration, and propagation of relativistic jets and outflows, as well as ultra-high-energy cosmic rays (UHECRs) and neutrino production.\n\nGalaxy Dynamics, Interstellar Medium & Evolution\nStudies of galaxies integrate theoretical modeling, high-resolution hydrodynamic simulations, and radio/optical observations. Key focus domains include:\n• Interstellar Medium (ISM) and neutral hydrogen (HI) 21-cm observations\n• Dynamical modeling of disk and elliptical galaxies\n• Dark matter distribution in spiral, dwarf, and irregular galaxies\n• Circumgalactic Medium (CGM) and galaxy-halo interaction dynamics\n• Galaxy mergers, morphology transformation, and star-formation quenching",
    image: 'images/research/Galaxies_and_Active_Galactic_Nuclei.png',
    faculty: ['Dr. Narendra Nath Patra', 'Dr. Soumavo Ghosh', 'Dr. Priyanka Singh', 'Dr. Amit Shukla']
  },
  {
    id: 'sun-heliosphere',
    title: 'Sun & Heliosphere',
    desc: 'Solar physics, space plasma dynamics, computational astrophysics, ionospheric physics, and lower-upper atmosphere coupling.',
    full_description: "Solar Physics & Space Plasma Dynamics\nStudy of the Sun — our nearest star — and its physical processes through simulations, observational data, and numerical modeling. Major emphasis is placed on space plasma processes in the Sun-Earth environment, aiming to establish indigenous space weather forecasting frameworks. Physics-based simulations and AI/ML approaches model solar flares, coronal mass ejections (CMEs), and solar wind turbulence.\n\nComputational Astrophysics & Jet Dynamics\nAdvanced computational algorithms simulate and analyze complex astrophysical plasmas. Research covers the dynamical evolution of magnetohydrodynamic jets, particle acceleration mechanisms, and reconnection processes, predicting observable signatures for space-based and ground-based telescopes.\n\nIonospheric Physics & Satellite Systems\nThe ionosphere is the ionized region of Earth's atmosphere, vital for all space-based communication, navigation (GNSS/NavIC), and remote sensing missions. Research focuses on understanding ionospheric morphology, scintillation, and disturbances across low and high latitudes, especially during intense geomagnetic storms.\n\nLower-Upper Atmosphere Coupling\nInvestigating the coupling between the lower neutral atmosphere and the upper ionized layers. The potential difference between Earth's surface and the ionosphere maintains a global electrical circuit modulated by thunderstorms. Energy and momentum transport by atmospheric gravity waves and planetary waves generate significant ionospheric variability, studied from both ground observations and space-borne sensors.",
    image: 'images/research/Sun_and_Heliosphere.png',
    faculty: ['Dr. Bhargav Vaidya', 'Dr. Saurabh Das', 'Dr. Amit Shukla', 'Prof. Abhirup Datta']
  },
  {
    id: 'space-weather',
    title: 'Space Weather & Atmospheric Science',
    desc: 'Cloud and precipitation physics, polar meteorology at Arctic station Himadri, radar meteorology, SAR, and Earth observation.',
    full_description: "Cloud & Precipitation Physics\nClouds play a critical role in Earth's radiation budget and hydrological cycle. Research focuses on understanding cloud formation, evolution, and aerosol-cloud-precipitation interactions using satellite, Doppler weather radar, and in-situ ground observations in both tropical India and polar environments to improve Quantitative Precipitation Estimation (QPE) and numerical forecasting models.\n\nPolar Meteorology at Arctic Research Station (Himadri)\nPolar regions exhibit unique atmospheric phenomena including extreme temperature inversions, polar vortex dynamics, and accelerated warming (polar amplification). Since 2022, DAASE has operated an experimental research facility at the Indian Arctic Station 'Himadri' (Ny-Ålesund, Svalbard), studying precipitation, cloud microphysics, atmospheric electricity, lightning, and polar space weather.\n\nNumerical Weather Prediction (NWP) & Climate-Informatics\nUtilizing WRF (Weather Research and Forecasting) models and developing improved physics parameterization schemes for extreme meteorological events. Cutting-edge AI/ML models are integrated with satellite and NWP datasets for early warning of tropical cyclones, severe convective storms, turbulence, and lightning hazards.\n\nRadar Meteorology & Quantitative Precipitation Estimation\nEmploying Doppler weather radar and dual-polarization techniques to investigate hydrometeor microphysics (size, shape, and phase distribution of raindrops, snow, and hail). Research includes attenuation correction, echo classification, and radar calibration algorithms.\n\nSynthetic Aperture Radar (SAR) & Earth Observation\nExploiting Polarimetric SAR (PolSAR), Interferometric SAR (InSAR/PolInSAR), and SAR Tomography for forest biomass estimation, disaster management, land deformation monitoring, and agricultural surveillance using spaceborne (NISAR, Sentinel-1) and drone-borne sensors.",
    image: 'images/research/Space_Weather_and_Atmospheric_Science.png',
    faculty: ['Dr. Saurabh Das', 'Dr. Unmesh Khati']
  },
  {
    id: 'instrumentation',
    title: 'Communication, Navigation & Remote Sensing',
    desc: 'Satellite navigation (GNSS/NavIC), satellite communication channels, CubeSat architecture, drone technologies, RF systems, and radiation detectors.',
    full_description: "Satellite-Based Navigation & Positioning\nDevelopment of advanced receiver algorithms, ionospheric scintillation mitigation, multipath modeling, and precise positioning techniques utilizing GPS, GLONASS, Galileo, and India's indigenous NavIC constellation. Research extends to autonomous drone navigation and precision landing systems.\n\nSatellite Communication & Channel Modeling\nHigh-frequency satellite communication research spanning V/Ka/Ku band atmospheric channel modeling, rain attenuation estimation, and CubeSat-to-ground inter-satellite optical and RF communication links. Development of IoT systems and resilient wireless networks for rural and remote connectivity.\n\nSpace-Based Systems & CubeSat Technology\nDesign and development of CubeSat subsystems, miniaturized satellite payloads, Attitude Determination and Control Systems (ADCS), power management units, and telemetry/telecommand modules for space missions.\n\nRadiation Detector Simulation & Calibration\nSimulation, design, and experimental calibration of radiation detectors, Silicon Photomultipliers (SiPM), scintillation detectors, and gamma-ray instrumentation for space science payloads and laboratory experiments. Testing and RF characterization up to 60 GHz utilizing on-campus Anechoic Chamber and RF measurement setups.",
    image: 'images/research/Communication_Navigation_and_Remote_Sensing.png',
    faculty: ['Prof. Abhirup Datta', 'Dr. Saurabh Das', 'Dr. Amit Shukla', 'Dr. Unmesh Khati']
  },
  {
    id: 'data-science',
    title: 'Data Science & ML in Space Science',
    desc: 'Big data analytics, Bayesian machine learning, deep learning, quantum machine learning, and high-dimensional space data visualization.',
    full_description: "Big Data in Astronomy & Space Sciences\nModern astronomical observatories (SKA, LSST, JWST) and space missions generate petabytes of high-dimensional data. Research involves developing scalable big data pipelines, distributed computing workflows, and automated feature extraction tools tailored for astronomical datasets.\n\nBayesian Machine Learning & Statistical Inference\nFormulating robust Bayesian frameworks, Markov Chain Monte Carlo (MCMC) sampling, and likelihood-free inference for parameter estimation in cosmology, gravitational wave astrophysics, and stellar evolution models.\n\nDeep Learning for Space Observations\nDesigning convolutional neural networks (CNNs), vision transformers, and recurrent architectures for astronomical transient classification, Fast Radio Burst detection, solar flare prediction, extreme weather forecasting, and satellite imagery segmentation.\n\nQuantum Machine Learning & Scientific Visualization\nExploring quantum computing algorithms for optimization, quantum machine learning for pattern recognition in complex space datasets, and advanced multidimensional scientific data visualization frameworks.",
    image: 'images/research/Data_Science_ML_in_Astrophysics.png',
    faculty: ['Dr. Suman Majumdar', 'Dr. Saurabh Das', 'Dr. Bhargav Vaidya']
  }
];

export const FACULTY_FB = [
  { name: 'Dr. Saurabh Das', designation: 'Associate Professor & HoD', isHOD: true, research: 'Remote Sensing, Atmospheric Physics, Aerosols, Climate Science, LIDAR', email: 'saurabh.das', photo: './people_images/Faculty/Dr._Saurabh_Das.jpg', url: 'http://people.iiti.ac.in/~saurabh.das/' },
  { name: 'Prof. Abhirup Datta', designation: 'Professor', research: 'Radio Astronomy, Epoch of Reionization, SKA, Radio Instrumentation', email: 'abhirup.datta', photo: './people_images/Faculty/Prof._Abhirup_Datta.jpg', url: 'https://sites.google.com/iiti.ac.in/abhirupdatta/' },
  { name: 'Dr. Bhargav Vaidya', designation: 'Professor', research: 'Computational Astrophysics, MHD, Relativistic Jets, High-Energy Astrophysics', email: 'bhargav.vaidya', photo: './people_images/Faculty/Dr._Bhargav_Vaidya.jpg', url: 'http://people.iiti.ac.in/~bvaidya/' },
  { name: 'Dr. Narendra Nath Patra', designation: 'Assistant Professor', research: 'HI 21-cm, Epoch of Reionization, Radio Interferometry, IGM', email: 'narendranath.patra', photo: './people_images/Faculty/Dr._Narendra_Nath_Patra.jpg', url: 'http://people.iiti.ac.in/~naren/' },
  { name: 'Dr. Manoneeta Chakraborty', designation: 'Assistant Professor', research: 'X-ray Astronomy, Compact Objects, Neutron Stars, Black Holes', email: 'manoneeta.chakraborty', photo: './people_images/Faculty/Dr._Manoneeta_Chakraborty.jpg', url: 'http://people.iiti.ac.in/~manoneeta/' },
  { name: 'Dr. Soumavo Ghosh', designation: 'Assistant Professor', research: 'Galaxy Evolution, Interstellar Medium, Disk Galaxies, HI Observations', email: 'soumavo.ghosh', photo: './people_images/Faculty/soumavo_ghosh.png', url: 'https://sites.google.com/view/drsoumavoghosh' },
  { name: 'Dr. Prakash Gaikwad', designation: 'Assistant Professor', research: 'Cosmology, Lyman-alpha Forest, Intergalactic Medium, Reionization', email: 'prakash.gaikwad', photo: './people_images/Faculty/Dr._Prakash_Suryakant_Gaikwad.jpg', url: 'https://sites.google.com/view/daase/faculty' },
  { name: 'Dr. Suman Majumdar', designation: 'Assistant Professor', research: 'Cosmological 21-cm Signal, SKA, Reionization, Statistical Methods', email: 'suman.majumdar', photo: './people_images/Faculty/Dr._Suman_Majumdar.jpg', url: 'http://people.iiti.ac.in/~sumanm/' },
  { name: 'Dr. Deepika Bollimpalli', designation: 'Assistant Professor', research: 'Accretion Disk Physics, MHD, Black Hole Accretion, Compact Objects', email: 'deepika.bollimpalli', photo: './people_images/Faculty/Dr._Deepika_Bollimpalli.jpeg', url: 'https://sites.google.com/view/daase/faculty' },
  { name: 'Dr. Priyanka Singh', designation: 'Assistant Professor', research: 'Space Weather, Ionospheric Physics, GNSS, Atmospheric Science', email: 'priyanka.singh', photo: './people_images/Faculty/Dr._Priyanka_Singh.png', url: 'https://psingh220.github.io/pswebpage/home.html' },
  { name: 'Dr. Unmesh Khati', designation: 'Assistant Professor', research: 'SAR Remote Sensing, GNSS, Earth Observation, Navigation', email: 'unmesh.khati', photo: './people_images/Faculty/Dr._Unmesh.png', url: 'http://people.iiti.ac.in/~unmesh.khati/' },
  { name: 'Dr. Amit Shukla', designation: 'Assistant Professor', research: 'RF Engineering, Antenna Design, Microwave Systems, Instrumentation', email: 'amit.shukla', photo: './people_images/Faculty/Dr._Amit_Shukla.png', url: 'https://sites.google.com/iiti.ac.in/welcome/home' },
  { name: 'Dr. Mukul Bhattacharya', designation: 'Assistant Professor', research: 'Multi-messenger Physics, High Energy Transients', email: 'mukulb', photo: './people_images/Faculty/Dr._Mukul_Bhattacharya.jpg', url: 'https://mukulbhattacharya1.wixsite.com/mukulb' },
];

export const VISITING_FB = [
  { name: 'Prof. Hari Hablani', designation: 'Visiting Distinguished Professor', research: 'Spaceflight Vehicles Guidance, Navigation and Control', email: '', photo: './people_images/Faculty/Prof._Hari_Hablani.jpg', url: '' },
  { name: 'Prof. V Chandrasekar', designation: 'Visiting Distinguished Professor', research: 'Radar Meteorology, Radar System Design, DSP Design, RF Communication Systems', email: '', photo: './people_images/Faculty/Prof._V_Chandrasekar.jpg', url: '' },
  { name: 'Prof. Sudhir Kamle', designation: 'Visiting Professor', research: 'Smart Materials & Structures', email: 'kamle', photo: './people_images/Faculty/Prof._Sudhir_Kamle.jpg', url: '' },
  { name: 'Dr. Ramesh Bhat', designation: 'Visiting Professor', research: 'Pulsars, Radio Transients, Radio Astronomy', email: '', photo: './people_images/Faculty/Dr._Ramesh_Bhat.png', url: '' },
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
      "research_interests": ""
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
  { name: "3D Printer", image: "./images/facilities/3D_Printer.jpg" },
  { name: "4 channel DSO with function generator", image: "./images/facilities/4_channel_DSO_with_function_generator.jpg" },
  { name: "AMS with SDR", image: "./images/facilities/AMS_with_SDR.jpg" },
  { name: "AWS 2", image: "./images/facilities/AWS_2.jpg" },
  { name: "AWS", image: "./images/facilities/AWS.jpg" },
  { name: "Actual Cube set", image: "./images/facilities/Actual_Cube_set.jpeg" },
  { name: "Anechoic Chamber 3", image: "./images/facilities/Anechoic_Chamber_3.jpeg" },
  { name: "Anechoic chamber 1", image: "./images/facilities/Anechoic_chamber_1.jpeg" },
  { name: "Anechoic chamber 2", image: "./images/facilities/Anechoic_chamber_2.jpeg" },
  { name: "Annemometer", image: "./images/facilities/Annemometer.jpg" },
  { name: "Antenna Measurment System", image: "./images/facilities/Antenna_Measurment_System.jpg" },
  { name: "Ceilometer 2", image: "./images/facilities/Ceilometer_2.jpeg" },
  { name: "Ceolimeter 1", image: "./images/facilities/Ceolimeter_1.jpg" },
  { name: "Departmental Server 2", image: "./images/facilities/Departmental_Server_2.jpg" },
  { name: "Departmental Server", image: "./images/facilities/Departmental_Server.jpg" },
  { name: "Digital IC Trainer kit", image: "./images/facilities/Digital_IC_Trainer_kit.jpg" },
  { name: "Drone for Hyperspectral Imagery", image: "./images/facilities/Drone_for_Hyperspectral_Imagery.jpg" },
  { name: "Drone for SAR and Hyperspectral Imagery", image: "./images/facilities/Drone_for_SAR_and_Hyperspectral_Imagery.jpg" },
  { name: "EDC lab", image: "./images/facilities/EDC_lab.jpeg" },
  { name: "Electronic Workbench 1", image: "./images/facilities/Electronic_Workbench_1.jpg" },
  { name: "FPGA Device Testing Area 2", image: "./images/facilities/FPGA_Device_Testing_Area_2.jpg" },
  { name: "FPGA Device Testing Area", image: "./images/facilities/FPGA_Device_Testing_Area.jpg" },
  { name: "FPGA system with electronic workbench", image: "./images/facilities/FPGA_system_with_electronic_workbench.jpg" },
  { name: "Faraday' s effect setup", image: "./images/facilities/Faraday_s_effect_setup.jpg" },
  { name: "Febry Perot Interferometer", image: "./images/facilities/Febry_Perot_Interferometer.jpg" },
  { name: "G. M. Counter", image: "./images/facilities/G._M._Counter.jpg" },
  { name: "GNSS Transmitter Receiver", image: "./images/facilities/GNSS_Transmitter_Receiver.jpeg" },
  { name: "GNSS measurment system 1", image: "./images/facilities/GNSS_measurment_system_1.jpg" },
  { name: "GNSS", image: "./images/facilities/GNSS.jpg" },
  { name: "Helmholtz cage", image: "./images/facilities/Helmholtz_cage.jpeg" },
  { name: "Hyperspectral Camera 1", image: "./images/facilities/Hyperspectral_Camera_1.jpg" },
  { name: "Hyperspectral Camera 2", image: "./images/facilities/Hyperspectral_Camera_2.jpg" },
  { name: "In- house Drone 1", image: "./images/facilities/In_house_Drone_1.jpg" },
  { name: "IoT setup", image: "./images/facilities/IoT_setup.jpg" },
  { name: "LPM 1", image: "./images/facilities/LPM_1.jpg" },
  { name: "Lab Discussion 1", image: "./images/facilities/Lab_Discussion_1.jpg" },
  { name: "MOKUGO Powered Advanced Electronic Workbench", image: "./images/facilities/MOKUGO_Powered_Advanced_Electronic_Workbench.jpg" },
  { name: "Malus law setup- Optics lab", image: "./images/facilities/Malus_law_setup_Optics_lab.jpg" },
  { name: "Michaelson Interferometer 1", image: "./images/facilities/Michaelson_Interferometer_1.jpg" },
  { name: "Michaelson Interferometer 2", image: "./images/facilities/Michaelson_Interferometer_2.jpg" },
  { name: "Microwave demonstration setup", image: "./images/facilities/Microwave_demonstration_setup.jpg" },
  { name: "Mini Whip", image: "./images/facilities/Mini_Whip.jpg" },
  { name: "Multi-function interferometer- Optics lab", image: "./images/facilities/Multi_function_interferometer_Optics_lab.jpg" },
  { name: "Particle size experiment- Optics lab", image: "./images/facilities/Particle_size_experiment_Optics_lab.jpg" },
  { name: "Plasma Diagnostics using Spectroscopy", image: "./images/facilities/Plasma_Diagnostics_using_Spectroscopy.jpg" },
  { name: "Polarization Mirrors", image: "./images/facilities/Polarization_Mirrors.jpg" },
  { name: "Precipitation Radar for rain monitoring", image: "./images/facilities/Precipitation_Radar_for_rain_monitoring.jpg" },
  { name: "Precipitation Radar", image: "./images/facilities/Precipitation_Radar.jpg" },
  { name: "Precision cut CNC machine", image: "./images/facilities/Precision_cut_CNC_machine.jpg" },
  { name: "RCS Setup", image: "./images/facilities/RCS_Setup.jpg" },
  { name: "RCS measurment setup", image: "./images/facilities/RCS_measurment_setup.jpg" },
  { name: "RF measurments instruments and Vector Network Analyzer", image: "./images/facilities/RF_measurments_instruments_and_Vector_Network_Analyzer.jpeg" },
  { name: "Radio Interferometer", image: "./images/facilities/Radio_Interferometer.jpeg" },
  { name: "Red Pitiya FPGA Board", image: "./images/facilities/Red_Pitiya_FPGA_Board.jpg" },
  { name: "Reynold's Apparatus", image: "./images/facilities/Reynold_s_Apparatus.jpg" },
  { name: "SIPM Experiment Device for Detector's Lab", image: "./images/facilities/SIPM_Experiment_Device_for_Detector_s_Lab.jpg" },
  { name: "STARC Lab instruments", image: "./images/facilities/STARC_Lab_instruments.jpg" },
  { name: "Satellite Communication Kit", image: "./images/facilities/Satellite_Communication_Kit.jpg" },
  { name: "Scintillator Detector", image: "./images/facilities/Scintillator_Detector.jpg" },
  { name: "Server Control room", image: "./images/facilities/Server_Control_room.jpeg" },
  { name: "Soldering sations EDC lab", image: "./images/facilities/Soldering_sations_EDC_lab.jpg" },
  { name: "Telescope 1", image: "./images/facilities/Telescope_1.jpg" },
  { name: "Telescope 2", image: "./images/facilities/Telescope_2.jpg" },
  { name: "Telescope Manuvere Control", image: "./images/facilities/Telescope_Manuvere_Control.jpg" },
  { name: "Temperature Estimator", image: "./images/facilities/Temperature_Estimator.jpg" },
  { name: "Twin satellite communication system", image: "./images/facilities/Twin_satellite_communication_system.jpg" },
  { name: "U Blox 2", image: "./images/facilities/U_Blox_2.jpeg" },
  { name: "U Blox", image: "./images/facilities/U_Blox.jpg" },
  { name: "UHF, VHF, GNSS, LPM and other weather sensors", image: "./images/facilities/UHF_VHF_GNSS_LPM_and_other_weather_sensors.jpeg" },
  { name: "UHF-VHF RF Antennas 1", image: "./images/facilities/UHF_VHF_RF_Antennas_1.jpg" },
  { name: "Universal Computer Spectrometer", image: "./images/facilities/Universal_Computer_Spectrometer.jpg" },
  { name: "Weather Sensor 1", image: "./images/facilities/Weather_Sensor_1.jpg" },
  { name: "Zeeman effect 2", image: "./images/facilities/Zeeman_effect_2.jpg" },
  { name: "Zeeman effect experiment setup", image: "./images/facilities/Zeeman_effect_experiment_setup.jpg" },
  { name: "setup", image: "./images/facilities/setup.jpg" }
];

export const EVENTS_FB = [
  { title: '3-Day Workshop on Numerical Techniques for Atmospheric and Space Sciences 2025', date: 'December 15–17, 2025', type: 'upcoming', link: 'https://www.iiti.ac.in/daase/events' },
  { title: 'SKA-India Summer Training Program 2025', date: 'July 7–18, 2025', type: 'past', link: 'https://www.iiti.ac.in/daase/ska' },
  { title: 'RETCO-VI: 6th National Conference on Recent Trends in the Study of Compact Objects', date: 'March 10–12, 2025', type: 'past', link: '' },
  { title: 'DAASE Outreach Series — Stargazing Sessions, Space Quizzes & Hackathons', date: 'Ongoing · Semester Events', type: 'past', link: '' },
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


