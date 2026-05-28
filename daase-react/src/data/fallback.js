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
  'M.Sc. Astronomy — Batch 2025': [
    { name: 'Aman Kumar Jha', email: 'msc2503121001' },
    { name: 'Asutosh Kumar Behera', email: 'msc2503121002' },
    { name: 'Gayathri M', email: 'msc2503121003' },
    { name: 'Jayanti Paul', email: 'msc2503121004' },
    { name: 'Kalash D. Thakkar', email: 'msc2503121005' },
    { name: 'Kanchan Singh', email: 'msc2503121006' },
    { name: 'Purvin S. Bhalekar', email: 'msc2503121007' },
    { name: 'Ranjan Yadav', email: 'msc2503121008' },
    { name: 'Rohit Raj', email: 'msc2503121009' },
    { name: 'Rushikesh A. Sonkusale', email: 'msc2503121010' },
    { name: 'Sougata Bhattacharyya', email: 'msc2503121011' },
    { name: 'Vibhawari P. Suryawanshi', email: 'msc2503121014' },
    { name: 'Yash Mani Tiwari', email: 'msc2503121015' },
  ],
  'M.Sc. Astronomy — Batch 2024': [
    { name: 'Aditya Prakash Sharma', supervisor: 'Dr. N. N. Patra', email: 'msc2403121001' },
    { name: 'Kaivan Sanjay Shah', supervisor: 'Dr. Manoneeta Chakraborty', email: 'msc2403121004' },
    { name: 'Kanishka Gautam', supervisor: 'Dr. Soumavo Ghosh', email: 'msc2403121005' },
    { name: 'Kartik V. Kambhampati', supervisor: 'Dr. Prakash Gaikwad', email: 'msc2403121006' },
    { name: 'Manpreet Singh', supervisor: 'Dr. Prakash Gaikwad', email: 'msc2403121007' },
    { name: 'Mayukh Mandal', supervisor: 'Dr. Suman Majumdar', email: 'msc2403121008' },
    { name: 'Nityananda Padhi', supervisor: 'Dr. Manoneeta Chakraborty', email: 'msc2403121009' },
    { name: 'Sangeeta', supervisor: 'Dr. Soumavo Ghosh', email: 'msc2403121011' },
    { name: 'Sangeetha A', supervisor: 'Prof. Abhirup Datta', email: 'msc2403121012' },
    { name: 'Sayan Maity', supervisor: 'Dr. Deepika Bollimpalli', email: 'msc2403121013' },
    { name: 'Sucharita Charan', supervisor: 'Dr. Priyanka Singh', email: 'msc2403121014' },
    { name: 'Vishal Sarkar', supervisor: 'Dr. Saurabh Das', email: 'msc2403121016' },
  ],
  'M.Tech. Space Engineering — Batch 2025': [
    { name: 'Aninda Pratim Roy', email: 'mt2502121016' },
    { name: 'Ashutosh Kumar', supervisor: 'Prof. Abhirup Datta', email: 'mt2502121018' },
    { name: 'Atreyee Bhattacharjee', supervisor: 'Dr. Amit Shukla', email: 'mt2502121019' },
    { name: 'Shubhangi Uikey', supervisor: 'Dr. Unmesh Khati', email: 'mt2502101017' },
    { name: 'Eshaan Sowale', supervisor: 'Dr. N. N. Patra', email: 'mt2502121021' },
    { name: 'Karni Rathore', email: 'mt2502121022' },
    { name: 'Sanjay Sugunan', email: 'mt2502121023' },
    { name: 'Shreya Ojha', supervisor: 'Dr. Unmesh Khati', email: 'mt2502121024' },
    { name: 'Unnati M. Dhingriya', supervisor: 'Dr. Bhargav Vaidya', email: 'mt2502121025' },
  ],
  'M.Tech. AOLT — Batch 2025': [
    { name: 'Akash Patel', email: 'mt2502121001' },
    { name: 'Alekh Prasad Behera', email: 'mt2502121002' },
    { name: 'Arbaj Khan', email: 'mt2302121003' },
    { name: 'Arka Biswas', email: 'mt2502121004' },
    { name: 'Shubham Shrivastava', email: 'mt2502121006' },
    { name: 'Varad S. Purohit', email: 'mt2502121007' },
    { name: 'Anshul Parmar', email: 'mt2502121008' },
    { name: 'Navneet Dubey', email: 'mt2502121009' },
    { name: 'Pallavisingh', email: 'mt2502121010' },
    { name: 'Rashmiranjita Suar', email: 'mt2502121011' },
  ],
  'M.Tech. Space Engineering — Batch 2024': [
    { name: 'Anismita Biswas', supervisor: 'Prof. Abhirup Datta', email: 'mt2402121001' },
    { name: 'Rasaprolu Lakshya', supervisor: 'Dr. Saurabh Das', email: 'mt2402121002' },
    { name: 'Eknoor Kaur', supervisor: 'Dr. Bhargav Vaidya', email: 'mt2402121003' },
  ],
  'M.S. (Research) — Batch 2025': [
    { name: 'Chanchal', supervisor: 'Dr. N. N. Patra', email: 'ms2504121001' },
    { name: 'Renuka Mahajan', supervisor: 'Dr. Suman Majumdar', email: 'ms2504121003' },
    { name: 'Soumya Gupta', supervisor: 'Dr. N. N. Patra', email: 'ms2504121004' },
    { name: 'Sudhamshu G', supervisor: 'Prof. Abhirup Datta', email: 'ms2504121005' },
  ],
  'M.S. (Research) — Batch 2024': [
    { name: 'Yash Raj', supervisor: 'Dr. Unmesh Khati', email: 'ms2404121001' },
    { name: 'Riddhi Srivastava', supervisor: 'Prof. Abhirup Datta', email: 'ms2404121002' },
    { name: 'Riya', supervisor: 'Prof. Abhirup Datta', email: 'ms2404121003' },
    { name: 'Ankur Sinha', supervisor: 'Dr. N. N. Patra', email: 'ms2404121004' },
    { name: 'Shailendra Dabral', supervisor: 'Dr. Unmesh Khati', email: 'ms2404121005' },
  ],
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
  'Ph.D. — Batch 2026': [
    { name: 'Nithyapriya S', supervisor: 'Prof. Abhirup Datta', email: 'phd2501221003' }
  ],
  'Ph.D. — Batch 2025': [
    { name: 'Devesh Sharma', supervisor: 'Dr. Bhargav Vaidya', email: 'mscphd2303121008' },
    { name: 'Arpan Dawn', supervisor: 'Dr. Unmesh Khati', email: 'phd2501121003' },
    { name: 'Shivani Pandey', supervisor: 'Dr. Soumavo Ghosh', email: 'phd2501121012' },
    { name: 'Manish Singh Almia', supervisor: 'Dr. Prakash Gaikwad', email: 'phd2501121011' },
    { name: 'Ami Nimeshkumar Tank', supervisor: 'Dr. Soumavo Ghosh', email: 'phd2501121002' },
    { name: 'Amar Deep', supervisor: 'Prof. Abhirup Datta', email: 'mscphd2303121001' },
    { name: 'Shiriny Akthar', supervisor: 'Dr. Suman Majumdar', email: 'phd2401221002' },
    { name: 'Aniket Sharma', supervisor: 'Dr. Bhargav Vaidya', email: 'phd2501121005' },
    { name: 'Shubhi Tiwari', supervisor: 'Prof. Abhirup Datta & Dr. Hari B Hablani', email: 'mtphd2302121006' },
    { name: 'Vishrut Pandya', supervisor: 'Dr Suman Majumdar & Prof. Abhirup datta', email: 'mscphd2303121015' },
    { name: 'Bhavya Jaiman', supervisor: 'Dr. Unmesh Khati', email: 'phd2501121007' },
    { name: 'Pratived Sahu', supervisor: 'Prof. Abhirup Datta', email: 'phd2501121001' },
    { name: 'Barenya Kumar Dev', supervisor: 'Prof. Abhirup Datta', email: 'phd2501121008' },
    { name: 'Popat Jeel Hitendrabhai', supervisor: 'Dr. Deepika Bollimpalli', email: 'phd2401221001' },
    { name: 'Vatsal garg', supervisor: 'Dr. Narendra Nath Patra', email: 'phd2401221005' }
  ],
  'Ph.D. — Batch 2024': [
    { name: 'Saurabh Jha', supervisor: 'Prof. Abhirup Datta', email: 'phd2401121005' },
    { name: 'Samir Sethi', supervisor: 'Dr. Priyanka Singh', email: 'phd2401121003' },
    { name: 'Thomas George P', supervisor: 'Dr. Priyanka Singh', email: 'phd2401121006' },
    { name: 'Dizna James', supervisor: 'Dr. Saurabh Das', email: 'phd2401121001' },
    { name: 'Pritam Hore', supervisor: 'Prof. Abhirup Datta', email: 'phd2401121002' },
    { name: 'Santanu Maity', supervisor: 'Dr. Saurabh Das', email: 'phd2401121004' }
  ],
  'Ph.D. — Batch 2023': [
    { name: 'Harshita Bhuyan', supervisor: 'Dr. Bhargav Vaidya', email: 'phd2201221002' },
    { name: 'Nalla Chumbitha Leena', supervisor: 'Dr. Unmesh Khati', email: 'phd2201221004' },
    { name: 'Atharva Hemant Mirashi', supervisor: 'Dr. Narendra Nath Patra', email: 'phd2301121001' },
    { name: 'Tamanna Singh', supervisor: 'Dr. Saurabh Das', email: 'phd2301121002' },
    { name: 'Sirsha Nandy', supervisor: 'Dr. Bhargav Vaidya', email: 'phd2301121003' },
    { name: 'Aditya Sharma', supervisor: 'Dr. Bhargav Vaidya', email: 'phd2301121004' },
    { name: 'Aromal P', supervisor: 'Dr. Manoneeta Chakraborty', email: 'phd2301121005' },
    { name: 'D Manas Mohit', supervisor: 'Dr. Suman Majumdar', email: 'phd2301121006' },
    { name: 'Jibin Jose', supervisor: 'Dr.Manoneeta Chakraborty', email: 'phd2301121007' },
    { name: 'Kavita', supervisor: 'Dr. Saurabh Das', email: 'phd2301121008' },
    { name: 'Keerthi K', supervisor: 'Dr. Narendra Nath Patra', email: 'phd2301121009' },
    { name: 'Nasmi S Anand', supervisor: 'Prof. Abhirup Datta', email: 'phd2301121010' },
    { name: 'Parvathy Thankachy P', supervisor: 'Dr. Saurabh Das', email: 'phd2301121011' },
    { name: 'Pranjal Chaturvedi', supervisor: 'Prof. Abhirup Datta', email: 'phd2301121012' },
    { name: 'Yashrajsinh Mahida', supervisor: 'Dr. Suman Majumdar', email: 'phd2301121014' },
    { name: 'Keshav Aggarwal', supervisor: 'Prof. Abhirup Datta', email: 'mscphd2301121015' }
  ],
  'Ph.D. — Batch 2022': [
    { name: 'Jithu J Athalathil', supervisor: 'Dr. Bhargav Vaidya', email: 'phd2201121002' },
    { name: 'Anam Sabir', supervisor: 'Dr. Unmesh Khati', email: 'phd2201121003' },
    { name: 'Leon Noble', supervisor: 'Dr. Suman Majumdar', email: 'phd2201121004' },
    { name: 'Chandan Kumar Das', supervisor: 'Dr. Amit Shukla', email: 'phd2201121006' },
    { name: 'Vaibhav Tyagi', supervisor: 'Dr. Saurabh Das', email: 'phd2201121012' },
    { name: 'Shraddha Mohnnai', supervisor: 'Dr. Amit Shukla', email: 'phd2201121011' },
    { name: 'Sakshi Jain', supervisor: 'Dr. Unmesh Khati', email: 'phd2201121014' }
  ],
  'Ph.D. — Batch 2021': [
    { name: 'Rashmi Sagar', supervisor: 'Prof. Abhirup Datta', email: 'phd2101121003' },
    { name: 'Bhuvnesh Brawar', supervisor: 'Prof. Abhirup Datta', email: 'phd2101121005' },
    { name: 'Lekhraj Saini', supervisor: 'Dr. Saurabh Das', email: 'phd2101121007' },
    { name: 'Samit Kumar Pal', supervisor: 'Prof. Abhirup Datta', email: 'phd2101121008' },
    { name: 'Ayush Garg', supervisor: 'Dr. Amit Shukla', email: 'phd2101221001' },
    { name: 'Biki Ram', supervisor: 'Dr. Manoneeta Chakraborty', email: 'phd2101221002' }
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


