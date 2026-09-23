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
    "citation": "Survival of ultraheavy nuclei in astrophysical sources: applications to PNS outflows; Ekanger N., Bhattacharya M., Murase K. & Horiuchi S., Phys. Rev. D., 114, 063031 (2026)",
    "text": "Survival of ultraheavy nuclei in astrophysical sources: applications to PNS outflows; Ekanger N., Bhattacharya M., Murase K. & Horiuchi S., Phys. Rev. D., 114, 063031 (2026)",
    "url": "https://doi.org/10.1103/p1n3-hc7k",
    "date": "2026-09-14",
    "status": "active"
  },
  {
    "citation": "Ultraheavy Ultrahigh-Energy Cosmic Rays; Zhang B. T., Murase K., Ekanger N., Bhattacharya M. & Horiuchi S., Phys. Rev. Lett., 136, 181002 (2026)",
    "text": "Ultraheavy Ultrahigh-Energy Cosmic Rays; Zhang B. T., Murase K., Ekanger N., Bhattacharya M. & Horiuchi S., Phys. Rev. Lett., 136, 181002 (2026)",
    "url": "https://doi.org/10.1103/221m-gvs3",
    "date": "2026-05-07",
    "status": "active"
  },
  {
    "citation": "Fragile, P. C., Middleton, M. J., Brasseur, B., Bollimpalli, D. A., Smith, Z., The nature of tilted supercritical accretion discs, MNRAS 548, Issue 3 (2026).",
    "text": "Fragile, P. C., Middleton, M. J., Brasseur, B., Bollimpalli, D. A., Smith, Z., The nature of tilted supercritical accretion discs, MNRAS 548, Issue 3 (2026).",
    "url": "https://doi.org/10.1093/mnras/stag711",
    "date": "2026-04-15",
    "status": "active"
  },
  {
    "citation": "Bollimpalli, D. A., Horak, J., Kluzniak, W., Fragile, P. C., Misalignment of the Lense-Thirring precession by an accretion torque, A & A 707, A246 (2026)",
    "text": "Bollimpalli, D. A., Horak, J., Kluzniak, W., Fragile, P. C., Misalignment of the Lense-Thirring precession by an accretion torque, A & A 707, A246 (2026)",
    "url": "https://doi.org/10.1051/0004-6361/202554646",
    "date": "2026-03-09",
    "status": "active"
  },
  {
    "citation": "Quasi-steady emission from repeating fast radio bursts can be explained by magnetar wind nebulae; Bhattacharya M., Murase K. & Kashiyama K., MNRAS, 547, 1 (2025)",
    "text": "Quasi-steady emission from repeating fast radio bursts can be explained by magnetar wind nebulae; Bhattacharya M., Murase K. & Kashiyama K., MNRAS, 547, 1 (2025)",
    "url": "https://doi.org/10.1093/mnras/staf2175",
    "date": "2025-12-10",
    "status": "active"
  },
  {
    "citation": "Fragile, P. C., Bollimpalli, D. A., Schnittman, Jeremy D., Harvey, C., Polarization Signatures of Quasi-Periodic Oscillations in Simulated Tilted, Truncated Disks, ApJ 991, 80 (2025).",
    "text": "Fragile, P. C., Bollimpalli, D. A., Schnittman, Jeremy D., Harvey, C., Polarization Signatures of Quasi-Periodic Oscillations in Simulated Tilted, Truncated Disks, ApJ 991, 80 (2025).",
    "url": "https://doi.org/10.3847/1538-4357/adfde1",
    "date": "2025-09-17",
    "status": "active"
  },
  {
    "citation": "Chakraborty, S., Mondal, S. K., Shukla, B. P., Kumar, R., Das, S., & Mitra, A. (2025). Nowcasting of rain with Doppler weather radar–A comparative strategy for complex orography. J Earth Syst Sci, 134(190).",
    "text": "Chakraborty, S., Mondal, S. K., Shukla, B. P., Kumar, R., Das, S., & Mitra, A. (2025). Nowcasting of rain with Doppler weather radar–A comparative strategy for complex orography. J Earth Syst Sci, 134(190).",
    "url": "https://doi.org/10.1007/s12040-025-02649-4",
    "date": "2025-09-01",
    "status": "active"
  },
  {
    "citation": "Nasreen, I. ; Datta, K. K. ; Shaw, A. K. ; Noble, L. ; Ghara, R. ; Saiyad Ali, Sk. ; Mishra, A. ; Kamran, M. ; Majumdar, S.; Effects of Large Optical Depth on CD HI 21-cm Non-Gaussian Signal; Monthly Notices of the Royal Astronomical Society, September 2025",
    "text": "Nasreen, I. ; Datta, K. K. ; Shaw, A. K. ; Noble, L. ; Ghara, R. ; Saiyad Ali, Sk. ; Mishra, A. ; Kamran, M. ; Majumdar, S.; Effects of Large Optical Depth on CD HI 21-cm Non-Gaussian Signal; Monthly Notices of the Royal Astronomical Society, September 2025",
    "url": "https://doi.org/10.1093/mnras/staf1584",
    "date": "2025-09-01",
    "status": "active"
  },
  {
    "citation": "Wasserman, J. ; Zackrisson, E. ; Dhandha, J. ; Fialkov, A. ; Noble, L. ; Majumdar, S.; Ultraviolet photon production rates of the first stars: Impact on the He II  λ 1640 Å emission line from primordial star clusters and the 21-cm signal from cosmic dawn;  \nMonthly Notices of the Royal Astronomical Society, Accepted in September 2025",
    "text": "Wasserman, J. ; Zackrisson, E. ; Dhandha, J. ; Fialkov, A. ; Noble, L. ; Majumdar, S.; Ultraviolet photon production rates of the first stars: Impact on the He II  λ 1640 Å emission line from primordial star clusters and the 21-cm signal from cosmic dawn;  \nMonthly Notices of the Royal Astronomical Society, Accepted in September 2025",
    "url": "https://doi.org/10.48550/arXiv.2507.21764",
    "date": "2025-09-01",
    "status": "active"
  },
  {
    "citation": "Tyagi, V., & Das, S. (2025). A probabilistic algorithm for mitigating persistent ground clutter in Doppler weather radar. Journal of Geophysical Research: Atmospheres, 130(15), e2025JD043478.",
    "text": "Tyagi, V., & Das, S. (2025). A probabilistic algorithm for mitigating persistent ground clutter in Doppler weather radar. Journal of Geophysical Research: Atmospheres, 130(15), e2025JD043478.",
    "url": "https://doi.org/10.1029/2025JD043478",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Tripathi, A; Datta, A; Mazumder, A; Majumdar, S. (2025). Impact of Calibration and Position Errors on Astrophysical Parameters of the HI 21cm Signal; Journal of Cosmology and Astroparticle Physics, Accepted in August 2025",
    "text": "Tripathi, A; Datta, A; Mazumder, A; Majumdar, S. (2025). Impact of Calibration and Position Errors on Astrophysical Parameters of the HI 21cm Signal; Journal of Cosmology and Astroparticle Physics, Accepted in August 2025",
    "url": "https://doi.org/10.48550/arXiv.2502.20962",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Aggarwal, K., Choudhary, R.K., Datta, A. and Imamura, T., “On the estimation of solar wind velocity under varying solar activity conditions using Akatsuki measurements.”, 2025, MNRAS",
    "text": "Aggarwal, K., Choudhary, R.K., Datta, A. and Imamura, T., “On the estimation of solar wind velocity under varying solar activity conditions using Akatsuki measurements.”, 2025, MNRAS",
    "url": "https://doi.org/10.1093/mnras/staf1305",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Datta, A., Choudhury, T.R., Majumdar, S., More, S., Mukherjee, S., Souradeep, T., Das, S., Adhikari, S., Banerjee, A., Nadkarni-Ghosh, S. and Jain, R.K., “Current status and prospects of cosmology research in India”, 2025, JApA, 46(2), p.61",
    "text": "Datta, A., Choudhury, T.R., Majumdar, S., More, S., Mukherjee, S., Souradeep, T., Das, S., Adhikari, S., Banerjee, A., Nadkarni-Ghosh, S. and Jain, R.K., “Current status and prospects of cosmology research in India”, 2025, JApA, 46(2), p.61",
    "url": "https://doi.org/10.1007/s12036-025-10078-4",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Bagchi, M., Bera, P., Beri, A., Bhattacharya, D., Bhattacharyya, B., Bhattacharyya, S., Chakraborty, M., Chatterjee, D., Chatterjee, S., Chattopadhyay, I., Das, S., Konar, S., Majumdar, P., Misra, R., Mukherjee, A., Mukhopadhyay, B., Pahari, M., Singh, K.~K., Surnis, M., Sutaria, F., & Tendulkar, S., \"Astrophysics with compact objects: An Indian perspective, present status and future vision\", 2025, JApA, 46, 62.",
    "text": "Bagchi, M., Bera, P., Beri, A., Bhattacharya, D., Bhattacharyya, B., Bhattacharyya, S., Chakraborty, M., Chatterjee, D., Chatterjee, S., Chattopadhyay, I., Das, S., Konar, S., Majumdar, P., Misra, R., Mukherjee, A., Mukhopadhyay, B., Pahari, M., Singh, K.~K., Surnis, M., Sutaria, F., & Tendulkar, S., \"Astrophysics with compact objects: An Indian perspective, present status and future vision\", 2025, JApA, 46, 62.",
    "url": "https://doi.org/10.1007/s12036-025-10077-5",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Fragile, P. C., Bollimpalli, D. A., Schnittman, Jeremy D., Harvey, C., Polarization Signatures of Quasi-Periodic Oscillations in Simulated Tilted, Truncated Disks, (Accepted in ApJ)",
    "text": "Fragile, P. C., Bollimpalli, D. A., Schnittman, Jeremy D., Harvey, C., Polarization Signatures of Quasi-Periodic Oscillations in Simulated Tilted, Truncated Disks, (Accepted in ApJ)",
    "url": "https://arxiv.org/abs/2505.11446",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Bollimpalli, D. A., Horak, J., Kluzniak, W., P. C. Fragile Misalignment of the Lense-Thirring precession by an accretion torque (To appear in A & A)",
    "text": "Bollimpalli, D. A., Horak, J., Kluzniak, W., P. C. Fragile Misalignment of the Lense-Thirring precession by an accretion torque (To appear in A & A)",
    "url": "https://arxiv.org/abs/2503.20577",
    "date": "2025-08-01",
    "status": "active"
  },
  {
    "citation": "Brawar, B., Datta, A. and Mangla, S.,“Imaging Ionosphere’s Wave like Structure Using Interferometry Data”. 2025, AdSpR",
    "text": "Brawar, B., Datta, A. and Mangla, S.,“Imaging Ionosphere’s Wave like Structure Using Interferometry Data”. 2025, AdSpR",
    "url": "https://doi.org/10.1016/j.asr.2025.07.059",
    "date": "2025-07-01",
    "status": "active"
  },
  {
    "citation": "Bhaskar, D., Tripathi, R., Shrivastava, M.N., Singh, R., Sasmal, S., Datta, A. and Maurya, A.K., “Lower Ionospheric Perturbations Associated with Lightning Activity over Low and Equatorial Regions”, 2025, Atmosphere, 16(7), p.832.",
    "text": "Bhaskar, D., Tripathi, R., Shrivastava, M.N., Singh, R., Sasmal, S., Datta, A. and Maurya, A.K., “Lower Ionospheric Perturbations Associated with Lightning Activity over Low and Equatorial Regions”, 2025, Atmosphere, 16(7), p.832.",
    "url": "https://doi.org/10.3390/atmos16070832",
    "date": "2025-07-01",
    "status": "active"
  },
  {
    "citation": "Saharan, S., Purohit, J., Shrivastava, M.N., Dube, A., Sasmal, S., Datta, A., Maurya, A.K. and Sharma, H., “Seasonal dependence of solar flare induced Total Electron Content over low latitude ionosphere.”, 2025, ApSS, 370(7), pp.1-13.",
    "text": "Saharan, S., Purohit, J., Shrivastava, M.N., Dube, A., Sasmal, S., Datta, A., Maurya, A.K. and Sharma, H., “Seasonal dependence of solar flare induced Total Electron Content over low latitude ionosphere.”, 2025, ApSS, 370(7), pp.1-13.",
    "url": "https://doi.org/10.1007/s10509-025-04464-1",
    "date": "2025-07-01",
    "status": "active"
  },
  {
    "citation": "Rana, P., Tarafdar, P., Nobleson, K., Dwivedi, C., Chandra Joshi, B., Deb, D., Mondal, S., Krishnakumar, M.~A., Shukla, A., Singha, J., Grover, H., Tahbildar, H., Susobhanan, A., Surnis, M., Desai, S., Batra, N.~D., Srivastava, A., Bharambe, V., Jose, J., Vyasraj, V., Jose Jacob, S., Amarnath, Singh, M., Zuraiq, Z., Sengupta, S., Ogi, T., Kumar, D., Jagadeesh, S., Kareem, F., Maity, D., Rai, K., Vara, K., Chowdhury, S., Kato, R., Arumugam, S., Mamidipaka, P., Arul Pandian, B., Shaji, K., Thiagaraj, P., Arumugam, P., Bagchi, M., Chakraborty, M., Gopakumar, A., Gupta, Y., Maan, Y., Kumar Paladi, A., & Takahashi, K., \"The Indian Pulsar Timing Array data release 2: I. Dataset and timing analysis\", 2025, PASA, 42, pp. 108.",
    "text": "Rana, P., Tarafdar, P., Nobleson, K., Dwivedi, C., Chandra Joshi, B., Deb, D., Mondal, S., Krishnakumar, M.~A., Shukla, A., Singha, J., Grover, H., Tahbildar, H., Susobhanan, A., Surnis, M., Desai, S., Batra, N.~D., Srivastava, A., Bharambe, V., Jose, J., Vyasraj, V., Jose Jacob, S., Amarnath, Singh, M., Zuraiq, Z., Sengupta, S., Ogi, T., Kumar, D., Jagadeesh, S., Kareem, F., Maity, D., Rai, K., Vara, K., Chowdhury, S., Kato, R., Arumugam, S., Mamidipaka, P., Arul Pandian, B., Shaji, K., Thiagaraj, P., Arumugam, P., Bagchi, M., Chakraborty, M., Gopakumar, A., Gupta, Y., Maan, Y., Kumar Paladi, A., & Takahashi, K., \"The Indian Pulsar Timing Array data release 2: I. Dataset and timing analysis\", 2025, PASA, 42, pp. 108.",
    "url": "https://doi.org/10.1017/pasa.2025.10066",
    "date": "2025-07-01",
    "status": "active"
  },
  {
    "citation": "Fragile, P. C., Middleton, M. J., Bollimpalli, D. A., Smith, Z., Long time-scale numerical simulations of large supercritical accretion discs, MNRAS 540, Issue 3, 2820–2829 (2025).",
    "text": "Fragile, P. C., Middleton, M. J., Bollimpalli, D. A., Smith, Z., Long time-scale numerical simulations of large supercritical accretion discs, MNRAS 540, Issue 3, 2820–2829 (2025).",
    "url": "https://doi.org/10.1093/mnras/staf890",
    "date": "2025-07-01",
    "status": "active"
  },
  {
    "citation": "Fragile, P. C., Middleton, M. J., Bollimpalli, D. A., Smith, Z., Long time-scale numerical simulations of large supercritical accretion discs, MNRAS 540, Issue 3, 2820–2829 (2025).",
    "text": "Fragile, P. C., Middleton, M. J., Bollimpalli, D. A., Smith, Z., Long time-scale numerical simulations of large supercritical accretion discs, MNRAS 540, Issue 3, 2820–2829 (2025).",
    "url": "https://doi.org/10.1093/mnras/staf890",
    "date": "2025-05-31",
    "status": "active"
  },
  {
    "citation": "Cocoon shock breakout emission from binary neutron star mergers; Gutierrez E., Bhattacharya M., Radice D., Murase K. & Bernuzzi S., Phys. Rev. D, 111, 063031 (2025)",
    "text": "Cocoon shock breakout emission from binary neutron star mergers; Gutierrez E., Bhattacharya M., Radice D., Murase K. & Bernuzzi S., Phys. Rev. D, 111, 063031 (2025)",
    "url": "https://doi.org/10.1103/PhysRevD.111.063031",
    "date": "2025-03-11",
    "status": "active"
  },
  {
    "citation": "Two-component off-axis jet model for radio flares of tidal disruption events; Sato Y., Murase K., Bhattacharya M., Carpio J. A., Mukhopadhyay M. & Zhang B. T., Phys. Rev. D, 110, L061307 (2024)",
    "text": "Two-component off-axis jet model for radio flares of tidal disruption events; Sato Y., Murase K., Bhattacharya M., Carpio J. A., Mukhopadhyay M. & Zhang B. T., Phys. Rev. D, 110, L061307 (2024)",
    "url": "https://doi.org/10.1103/PhysRevD.110.L061307",
    "date": "2024-09-23",
    "status": "active"
  },
  {
    "citation": "Bollimpalli, D. A., Fragile, P. C., J. W. Dewberry, Kluzniak, W., Truncated, Tilted Discs as a Possible Source of Quasi- Periodic Oscillations, MNRAS 528, Issue 2, 1142–1157 (2024).",
    "text": "Bollimpalli, D. A., Fragile, P. C., J. W. Dewberry, Kluzniak, W., Truncated, Tilted Discs as a Possible Source of Quasi- Periodic Oscillations, MNRAS 528, Issue 2, 1142–1157 (2024).",
    "url": "https://doi.org/10.1093/mnras/stad3975",
    "date": "2023-12-23",
    "status": "active"
  },
  {
    "citation": "Comparison of models for the warm-hot circumgalactic medium around Milky-Way like galaxies, Singh, P., Lau, E., Faerman, Y., Stern, J., Nagai, D. 2024, MNRAS, 532, 3222",
    "text": "Comparison of models for the warm-hot circumgalactic medium around Milky-Way like galaxies, Singh, P., Lau, E., Faerman, Y., Stern, J., Nagai, D. 2024, MNRAS, 532, 3222",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Probing the Circumgalactic Medium with Fast Radio Bursts: Insights from CAMELS, Medlock, I., Nagai, D., Singh, P., Oppenheimer, B., Daniel, A.-A., Villaescusa-Navarro, F. 2024, ApJ, 967, 32",
    "text": "Probing the Circumgalactic Medium with Fast Radio Bursts: Insights from CAMELS, Medlock, I., Nagai, D., Singh, P., Oppenheimer, B., Daniel, A.-A., Villaescusa-Navarro, F. 2024, ApJ, 967, 32",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "A multi-simulation study of relativistic SZ temperature scalings in galaxy clusters and groups, Lee, E., Anbajagane, D., Singh, P., Chluba, J., Nagai, D., Kay, S. T., Cui, W., Dolag, K., Yepes, G. 2022, MNRAS, 517, 5303",
    "text": "A multi-simulation study of relativistic SZ temperature scalings in galaxy clusters and groups, Lee, E., Anbajagane, D., Singh, P., Chluba, J., Nagai, D., Kay, S. T., Cui, W., Dolag, K., Yepes, G. 2022, MNRAS, 517, 5303",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Constraints on precipitation limited hot halos from massive galaxies to galaxy clusters, Singh, P., Voit, G. M., Nath, B. B. 2021, MNRAS, 501, 2467",
    "text": "Constraints on precipitation limited hot halos from massive galaxies to galaxy clusters, Singh, P., Voit, G. M., Nath, B. B. 2021, MNRAS, 501, 2467",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "X-ray and SZ constraints on the properties of the hot CGM, Singh, P., Majumdar, S., Nath, B. B., Silk, J. 2018, MNRAS, 478, 2909",
    "text": "X-ray and SZ constraints on the properties of the hot CGM, Singh, P., Majumdar, S., Nath, B. B., Silk, J. 2018, MNRAS, 478, 2909",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Evolution of bar-induced dark gaps in galaxy discs: evidence of strong bar-driven effects already at z>2, Chattopadhyay, Susnata ; Ghosh, Soumavo ; Gadotti, Dimitri A. ; Le Conte, Zoe A. ; Kim, Taehyun ; Cuomo, Virginia ; de Sá-Freitas, Camila ; Athanassoula, E., 2026, MNRAS (in press)",
    "text": "Evolution of bar-induced dark gaps in galaxy discs: evidence of strong bar-driven effects already at z>2, Chattopadhyay, Susnata ; Ghosh, Soumavo ; Gadotti, Dimitri A. ; Le Conte, Zoe A. ; Kim, Taehyun ; Cuomo, Virginia ; de Sá-Freitas, Camila ; Athanassoula, E., 2026, MNRAS (in press)",
    "url": "https://doi.org/10.1093/mnras/stag1670",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Quadrupole signature as a kinematic diagnostic to constrain bar properties: Implications for the Milky Way, Ghosh, Soumavo ; Kalda, Taavet ; Di Matteo, Paola; Green, Gregory M. ; Khoperskov, Sergey ; Katz, David ; Haywood, Misha 2025, A&A, 704, A 11",
    "text": "Quadrupole signature as a kinematic diagnostic to constrain bar properties: Implications for the Milky Way, Ghosh, Soumavo ; Kalda, Taavet ; Di Matteo, Paola; Green, Gregory M. ; Khoperskov, Sergey ; Katz, David ; Haywood, Misha 2025, A&A, 704, A 11",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Closing the gap: secular evolution of bar-induced dark gaps in the presence of thick discs, Ghosh, Soumavo; Gadotti, Dimitri A; Fragkoudi, Francesca; Nagpal, Vighnesh ; Di Matteo, Paola ; Cuomo, Virginia, 2024, MNRAS, 532, 4570",
    "text": "Closing the gap: secular evolution of bar-induced dark gaps in the presence of thick discs, Ghosh, Soumavo; Gadotti, Dimitri A; Fragkoudi, Francesca; Nagpal, Vighnesh ; Di Matteo, Paola ; Cuomo, Virginia, 2024, MNRAS, 532, 4570",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Bars and boxy/peanut bulges in thin and thick discs. III. Boxy/peanut bulge formation and evolution in the presence of thick discs, Ghosh, Soumavo; Fragkoudi, Francesca; Di Matteo, Paola ; Saha, Kanak, 2024, A&A, 683, A196",
    "text": "Bars and boxy/peanut bulges in thin and thick discs. III. Boxy/peanut bulge formation and evolution in the presence of thick discs, Ghosh, Soumavo; Fragkoudi, Francesca; Di Matteo, Paola ; Saha, Kanak, 2024, A&A, 683, A196",
    "url": "",
    "date": "",
    "status": "active"
  },
  {
    "citation": "Looking for a needle in a haystack: Measuring the length of a stellar bar, Ghosh, Soumavo; Di Matteo, Paola, 2024, A&A, 683, A100",
    "text": "Looking for a needle in a haystack: Measuring the length of a stellar bar, Ghosh, Soumavo; Di Matteo, Paola, 2024, A&A, 683, A100",
    "url": "",
    "date": "",
    "status": "active"
  }
];

export const RESEARCH_AREAS = [
  {
    id: 'compact-objects',
    title: 'Compact Objects & Transients',
    desc: 'Studies of black holes, neutron stars, pulsars, fast radio bursts (FRBs), gamma-ray bursts (GRBs), and gravitational wave astrophysics.',
    section_title: 'AREA OF INTEREST',
    full_description: "Keywords: Black Holes, Neutron Stars, Pulsars, X-ray binaries, Fast Radio Bursts (FRBs), Gamma Ray Bursts (GRBs)\n\nBlack Holes\nBlack holes are the end-state of stellar evolution that offers an unparalleled laboratory for testing theories of gravity under the strong field regime. Multi-wavelength observational studies ranging from the radio to X-ray band offer a unique opportunity to probe the emission mechanism and variability around the black holes. Magnetohydrodynamic simulations of the jets and accretion dynamics around black holes pave the way for understanding the relativistic astrophysics around these enigmatic objects.\n\nNeutron Star\nNeutron stars are extremely dense compact objects whose core reaches supranuclear densities, thereby offering ideal laboratories to probe strong gravity and the properties of supranuclear matter. Several observational features, like thermonuclear bursts, burst oscillations, jets, and Quasi-periodic oscillations, are studied to probe the exotic neutron star conditions. Multi-wavelength observations spanning radio to X-ray wavebands are carried out to pursue the above science goals.\n\nPulsars\nPulsars are cosmic lighthouses that exhibit highly periodic, coherent emission and offer a glimpse into the physics under ultrastrong magnetic fields. The emission mechanism of pulsars — accretion powered, rotation powered, and magnetically powered — is investigated to shed light on the underlying physics, the beam geometry, and the evolution of pulsars across different subclasses. The timing study of pulsars, as undertaken by the pulsar timing arrays (PTAs), provides a unique tool for using them as clocks — especially for the purpose of detecting nanoHertz Gravitational Waves.\n\nFast Radio Bursts (FRBs)\nFast Radio Bursts are extremely enigmatic events exhibiting an intense burst of radio emission in a very short span of time (fraction of seconds). Their origin still remains a mystery, even though recent observations argue for a magnetar origin scenario. The characteristic, radiative behaviour, and comparison with pulsar-like emission pose numerous compelling scientific questions. The extragalactic origin of the FRBs also presents an excellent way of utilizing them as cosmological probes.\n\nGamma Ray Bursts (GRBs)\nGamma-Ray Bursts are one of the most luminous astronomical phenomena originating from either the collapse of very massive stars or the merger of two neutron stars. Investigation of GRBs can offer clues on their emission mechanism and provide an essential tool for investigating the electromagnetic counterpart of gravitational waves generated during the binary neutron star mergers.\n\nGravitational Waves, Kilonovae, and Binary Neutron Star (BNS) Mergers\nExploring compact object mergers through gravitational-wave detections and their electromagnetic counterparts, with a focus on high-energy emission from kilonovae and r-process nucleosynthesis. Employing pulsar timing arrays to search for low-frequency gravitational waves or Nano-Hertz Gravitational Waves (nHz GWs) arising from supermassive black hole binaries and galaxy evolution.",
    image: 'images/research/Compact_Objects_Transients.png',
    faculty: ['Dr. Manoneeta Chakraborty', 'Dr. Bhargav Vaidya', 'Dr. Amit Shukla', 'Dr. Deepika Bollimpalli', 'Dr. Mukul Bhattacharya']
  },
  {
    id: 'cosmology',
    title: 'Cosmology',
    desc: 'Probing the early universe, 21-cm cosmology, the Epoch of Reionization, Cosmic Dawn, Line Intensity Mapping, and large-scale structure formation.',
    image_caption: "Artiist's Impression of Cosmic History. (Image credit: ESA – C. Carreau)",
    section_title: 'AREA OF INTEREST',
    full_description: "Cosmology is the study of the evolutionary history of our Universe. Cosmology can be best described pictographically by the famous Paul Gauguin's 1897 painting, \"Where do we come from? What are we? Where are we going?\"\n\nThe present age is the era of Precision Cosmology, which is driven by large-scale surveys of the Universe conducted via Earth-based and space-based telescopes/experiments operating across the electromagnetic spectrum. Starting from radio (GMRT, MWA, LOFAR, MeerKAT, SKA etc.), infrared (TIM, CONCERTO, COMAP, SPHEREx etc.), microwave (Planck, WMAP etc.), optical (Hubble, JWST, LSST, TMT, ELT, SDSS, DES etc.), X-ray (eROSITA) wavelengths and also including the gravitational waves (LIGO). Many members of DAASE are actively involved in the national and international research teams of the above-mentioned experiments in cosmology.\n\n• These multiwavelength surveys help us to probe the evolving state of the Universe, starting from the time when the matter and radiation got decoupled from each other and Cosmic Microwave Background Radiation was released, to the age of formation of first stars (Cosmic Dawn), to the stage when the intergalactic medium went through a phase change -- from neutral to ionized (Epoch of Reionization), to the present day when we observe the galaxies to be distributed around us in the form of a complex cosmic web at very large scales.\n\n• Multiwavelength Line Intensity Mapping is one of the most powerful tools to probe the Universe at large scales across cosmic time. In this method, a redshifted atomic or molecular line is targeted to map out the Universe. These lines arise due to different physical processes that take place in the intergalactic medium and in the interstellar medium. One such atomic line is the 21-cm line (rest frame wavelength) emitted by the spin-flip transition in the neutral hydrogen atoms (HI), the most abundant baryon in our Universe. The cosmologically redshifted 21-cm line, observed via radio telescopes, allows us to probe the state of the intergalactic medium and the nature of the first luminous sources, starting from the Cosmic Dark Ages to the Epoch of Reionization. Once the reionization of the Universe is complete, the same line then maps the neutral hydrogen trapped in the galaxies, thus probing the large-scale structures. Similarly, other atomic and molecular lines e.g. singly ionized carbon (CII), carbon monoxide (CO), doubly ionized oxygen (OIII), observed via infrared telescopes, are used to map the star-forming galaxies in the Universe from the Cosmic Dawn to the present day.\n\n• These multiwavelength surveys help us address many fundamental questions in cosmology, e.g. what are the major constituents of our Universe, what is the nature of the dark matter and dark energy, how were the first galaxies formed, how did they affect the state of the intergalactic medium and also the subsequent galaxy formation, how did the galaxies arrange themselves in the complex cosmic web that we see around us today.\n\n• Galaxy clusters are the largest gravitationally bound structures in the Universe. Multiwavelength (mostly X-ray and radio) observations of the galaxy clusters can reveal the nature of the dark matter and help us verify the standard models of cosmology.\n\n• Large-scale Numerical Simulations of the Universe, starting from the early stages of the Universe to the present day, Advanced Machine Learning algorithms for emulation of the cosmological signals and robust Bayesian inference frameworks help us in interpreting these complex observations and reveal the mysterious nature of the Universe.",
    image: 'images/research/Cosmology.png',
    faculty: ['Prof. Abhirup Datta', 'Dr. Suman Majumdar', 'Dr. Priyanka Singh', 'Dr. Prakash Gaikwad']
  },
  {
    id: 'galaxies-agn',
    title: 'Galaxies & Active Galactic nuclei',
    desc: 'Interstellar medium, dynamical modeling of galaxies, dark matter distribution in galaxies, circumgalactic medium, and computational astrophysics.',
    section_title: 'AREAS OF INTEREST',
    full_description: "Interstellar Medium, Dynamical modeling of galaxies, Dark matter distribution in galaxies, Circumgalactic medium.\n\nComputational Astrophysics\nThis combines computational methods and algorithms for simulating and analyzing astrophysical data to discover new phenomena. Research also covers dynamical evolution of jets from Active Galactic Nuclei (AGN) and particle acceleration, using advanced simulations to predict observational features.",
    image: 'images/research/Galaxies_and_Active_Galactic_Nuclei.png',
    faculty: ['Dr. Narendra Nath Patra', 'Dr. Priyanka Singh', 'Dr. Soumavo Ghosh', 'Dr. Amit Shukla', 'Dr. Mukul Bhattacharya']
  },
  {
    id: 'sun-heliosphere',
    title: 'Solar Physics and Space Weather',
    desc: 'Solar physics, ionospheric physics, and lower-upper atmosphere coupling.',
    section_title: 'AREAS OF INTEREST',
    full_description: "Solar Physics\nStudy of Sun, the nearest star and its physical process through simulation, observation and modelling is the primary focus. A major focus is on space plasma processes in the Sun-Earth environment, aiming to create indigenous space weather modeling frameworks. Physics based simulation as well machine learning /AI approaches are used to study the behaviour of Sun and the solar phenomena.\n\nIonospheric Physics\nIonosphere is the ionized region of Earth's atmosphere and crucial for all space based communication, navigation as well remote sensing satellites. The major thrust is on to understand the ionospheric characteristics, both in low latitude as well high-latitude. The coupling between Space Weather phenomena and Ionosphere is one of such challenging areas, particularly as the society is more becoming a technology driven society where any disruption in satellite system is a billon dollar problem. The researchers are actively exploring the impact in\n\nLower-Upper Atmosphere Coupling\nThe Earth has both neutral atmosphere at the lower height in addition to the ionozed layers above. The interaction between these two region shapes the characteristics of both the region. The potential difference between Earth crust and Ionosphere maintain a current which modulated by thunderstorms and other phenomena. The Space Weather impacts the lower atmosphere through complex mechanism connecting Magnetosphere-Ionosphere-lower atmosphere. It addition, the energy transport to upper atmosphere by waves of various nature generated at lower atmosphere which modulate the ionosphere characteristics. The current research is focused on the study of these interaction both from both top side and bottom side.",
    image: 'images/research/Sun_and_Heliosphere.png',
    faculty: ['Dr. Bhargav Vaidya', 'Dr. Saurabh Das', 'Dr. Amit Shukla', 'Prof. Abhirup Datta']
  },
  {
    id: 'space-weather',
    title: 'Remote Sensing & Atmospheric Science',
    desc: 'Cloud and precipitation physics, polar meteorology, numerical weather prediction, radar meteorology, SAR, and remote sensing in Earth observation.',
    section_title: 'AREAS OF INTEREST',
    full_description: "Cloud and Precipitation Physics\nCloud plays a crucial role in Earth's radiation budget and key component of the hydrological cycle. The formation, evolution and dissipation of cloud are closely linked with aerosols and a serious concern in climate change scinarios. There are several unasweared questions about how the cloud and precipitations are linked and modulated. The thrust of this group to improve the understanding of the precipitation characteristics and its spatio-temporal evolution using satellite and ground based observations, both in tropical regions like India as well in polar regions like Arctic. Understanding of precipitation process not only improve the Quantitative Precipitation Estimation (QPE) from remote sensing observations, but also helps in development of better forecasting models. Doppler weather radar is one of such remote sensing tool which is extensively being used for precipitation remote sensing that are directly benifitted from our research.\n\nPolar Meteorology\nThe unique atmospheric conditions of the Earth's polar regions are characterized by extreme cold, low moisture, high surface reflectivity (albedo), and strong seasonal temperature variations, including the presence of the polar vortex and ozone-depleting polar stratospheric clouds. Key phenomena include katabatic winds, influenced by dense, cold air, and the complex interaction of space weather with the polar ionosphere. Research in polar meteorology is crucial for understanding global climate change, as the poles act as significant heat sinks and areas of accelerated warming, known as polar amplification, which can also influence weather patterns at lower latitudes. DAASE has established an experimental facility since 2022 at Himadri, Ny Alesund, in the northernmost human settlement to study the precipitation, cloud, atmospheric electricity, lightning and space weather phenomena.\n\nNumerical Weather Prediction and Climate-informatics\nExtreme weather events are major concern to the society and more so as the climate change increases the number of such events and associated fatalities all over the world. Numerical weather prediction (NWP) are physics based model to diagonize and forecast the weather phenomena. We actively use WRF models for studying the extreme weather conditions as well on developing improved parameterization schemes. On the other hand, there is an active research going on to develop AI/ML techniques for better predictions of the extreme weathers such as cyclone, thunderstorms, turbulence and lightning combining satellite and NWP models.\n\nSynthetic Aperture Radar\n• Polarimetric SAR\n• PolInSAR\n• Tomography\n\nRadar Meteorology\nRadar meteorology is a branch of atmospheric science that uses radar technology to study and forecast weather phenomena. By transmitting electromagnetic waves and analyzing the signals reflected by atmospheric targets—such as raindrops, snow, and hail—meteorologists can determine the location, movement, and intensity of precipitation. Investigating the size, shape, and phase (e.g., rain, snow, hail) of hydrometeors in different weather systems, including tropical cyclones and convective storms provides microphysical insights of the physical process. Developing more accurate rainfall estimation algorithms that mitigate errors from varying raindrop size distributions and signal attenuation, especially in heavy rain and thus improving Quantitative precipitation estimation (QPE) is one of the major thrust of the group. Other major research is on Improving calibration, attenuation correction, and removal of non-meteorological echoes from data.\n\nRemote sensing in Earth Observation\nHyperspectral, microwave and optical - all has their own advantages and disadvantages in Earth observations study. Some of the major areas where DAASE faculty are involved in - change detections, classification, Forestry, Agriculture and Disaster management using both Drone as well satellite data.",
    image: 'images/research/Space_Weather_and_Atmospheric_Science.png',
    faculty: ['Dr. Saurabh Das', 'Dr. Unmesh Khati']
  },
  {
    id: 'instrumentation',
    title: 'Instrumentation & Space Technology',
    desc: 'Satellite-based navigation (GNSS/GPS/NavIC), satellite communication channels, IoT, small satellite systems, and radiation detector simulation.',
    section_title: 'AREAS OF INTEREST',
    full_description: "Satellite Based Navigation\n• GNSS/GPS/NavIC\n• Drone navigation\n\nSatellite Communication\n• V/Ka/Ku band channel modelling\n• Cubesat communication\n\nIoT\n• Rural technology\n• Space based systems\n\nSmall Satellite\n• Payload, Navigation, Control\n\nDetector Simulation and Calibration\n• Gamma Ray Detectors",
    image: 'images/research/Communication_Navigation_and_Remote_Sensing.png',
    faculty: ['Prof. Abhirup Datta', 'Dr. Saurabh Das', 'Dr. Amit Shukla', 'Dr. Narendra Nath Patra']
  },
  {
    id: 'data-science',
    title: 'Data Science',
    desc: 'Big data, Bayesian machine learning, deep learning, quantum machine learning, and data visualization.',
    section_title: 'AREAS OF INTEREST',
    full_description: "• Big data\n• Bayesian Machine Learning\n• Deep Learning\n• Quantum Machine Learning\n• Data Visualization",
    image: 'images/research/Data_Science_ML_in_Astrophysics.png'
  }
];

export const FACULTY_FB = [
  { name: 'Dr. Saurabh Das', designation: 'Associate Professor', isHOD: true, research: 'Remote Sensing, Atmospheric Physics, Aerosols, Climate Science, LIDAR', email: 'saurabh.das', photo: './people_images/Faculty/Dr._Saurabh_Das.jpg', url: 'http://people.iiti.ac.in/~saurabh.das/', chamber: '1D-503', phoneExt: '3306' },
  { name: 'Prof. Abhirup Datta', designation: 'Professor', isHOD: false, research: 'Radio Astronomy, Epoch of Reionization, SKA, Radio Instrumentation', email: 'abhirup.datta', photo: './people_images/Faculty/Prof._Abhirup_Datta.jpg', url: 'https://sites.google.com/iiti.ac.in/abhirupdatta/', chamber: '1D-502', phoneExt: '3397' },
  { name: 'Dr. Bhargav Vaidya', designation: 'Associate Professor', isHOD: false, research: 'Computational Astrophysics, MHD, Relativistic Jets, High-Energy Astrophysics', email: 'bvaidya', photo: './people_images/Faculty/Dr._Bhargav_Vaidya.jpg', url: 'http://people.iiti.ac.in/~bvaidya/', chamber: '1D-507', phoneExt: '3254' },
  { name: 'Dr. Narendra Nath Patra', designation: 'Assistant Professor', isHOD: false, research: 'HI 21-cm, Epoch of Reionization, Radio Interferometry, IGM', email: 'naren', photo: './people_images/Faculty/Dr._Narendra_Nath_Patra.jpg', url: 'http://people.iiti.ac.in/~naren/', chamber: '1D-505', phoneExt: '3385' },
  { name: 'Dr. Manoneeta Chakraborty', designation: 'Associate Professor', isHOD: false, research: 'X-ray Astronomy, Compact Objects, Neutron Stars, Black Holes', email: 'manoneeta', photo: './people_images/Faculty/Dr._Manoneeta_Chakraborty.jpg', url: 'http://people.iiti.ac.in/~manoneeta/', chamber: '1D-510', phoneExt: '3358' },
  { name: 'Dr. Soumavo Ghosh', designation: 'Assistant Professor', isHOD: false, research: 'Galaxy Evolution, Interstellar Medium, Disk Galaxies, HI Observations', email: 'soumavo', photo: './people_images/Faculty/soumavo_ghosh.png', url: 'https://sites.google.com/view/drsoumavoghosh', chamber: 'LRC C01', phoneExt: '5229' },
  { name: 'Dr. Prakash Gaikwad', designation: 'Assistant Professor', isHOD: false, research: 'Cosmology, Lyman-alpha Forest, Intergalactic Medium, Reionization', email: 'gaikwad', photo: './people_images/Faculty/Dr._Prakash_Suryakant_Gaikwad.jpg', url: 'https://sites.google.com/view/daase/faculty', chamber: 'LRC C02', phoneExt: '' },
  { name: 'Dr. Suman Majumdar', designation: 'Associate Professor', isHOD: false, research: 'Cosmological 21-cm Signal, SKA, Reionization, Statistical Methods', email: 'suman.majumdar', photo: './people_images/Faculty/Dr._Suman_Majumdar.jpg', url: 'http://people.iiti.ac.in/~sumanm/', chamber: '1D-512', phoneExt: '3304' },
  { name: 'Dr. Deepika Bollimpalli', designation: 'Assistant Professor', isHOD: false, research: 'Accretion Disk Physics, MHD, Black Hole Accretion, Compact Objects', email: 'dbollimpalli', photo: './people_images/Faculty/Dr._Deepika_Bollimpalli.jpeg', url: 'https://sites.google.com/view/daase/faculty', chamber: 'LRC C03', phoneExt: '' },
  { name: 'Dr. Priyanka Singh', designation: 'Assistant Professor', isHOD: false, research: 'Space Weather, Ionospheric Physics, GNSS, Atmospheric Science', email: 'psingh', photo: './people_images/Faculty/Dr._Priyanka_Singh.png', url: 'https://psingh220.github.io/pswebpage/home.html', chamber: 'LRC', phoneExt: '3214' },
  { name: 'Dr. Unmesh Govind Khati', designation: 'Associate Professor', isHOD: false, research: 'SAR Remote Sensing, GNSS, Earth Observation, Navigation', email: 'unmesh.khati', photo: './people_images/Faculty/Dr._Unmesh.png', url: 'http://people.iiti.ac.in/~unmesh.khati/', chamber: '1D-513', phoneExt: '3386' },
  { name: 'Dr. Amit Shukla', designation: 'Associate Professor', isHOD: false, research: 'RF Engineering, Antenna Design, Microwave Systems, Instrumentation', email: 'amit.shukla', photo: './people_images/Faculty/Dr._Amit_Shukla.png', url: 'https://sites.google.com/iiti.ac.in/welcome/home', chamber: '1D-514', phoneExt: '3213' },
  { name: 'Dr. Mukul Bhattacharya', designation: 'Assistant Professor', isHOD: false, research: 'Multi-messenger astrophysics, transient phenomena, compact objects (BH, NS), particle acceleration & relativistic outflows', email: 'mukulb', photo: './people_images/Faculty/Dr._Mukul_Bhattacharya.jpg', url: 'https://mukulbhattacharya1.wixsite.com/mukulb', chamber: 'LRC FC- 502', phoneExt: '5580' },
];

export const VISITING_FB = [
  { name: 'Prof. Hari Hablani', designation: 'Visiting Distinguished Professor', isHOD: false, research: 'Spaceflight Vehicles Guidance, Navigation and Control', email: '', photo: './people_images/Faculty/Prof._Hari_Hablani.jpg', url: '', chamber: '', phoneExt: '' },
  { name: 'Prof. V Chandrasekar', designation: 'Visiting Distinguished Professor', isHOD: false, research: 'Radar Meteorology, Radar System Design, DSP Design, RF Communication Systems', email: '', photo: './people_images/Faculty/Prof._V_Chandrasekar.jpg', url: '', chamber: '', phoneExt: '' },
  { name: 'Prof. Sudhir Kamle', designation: 'Visiting Professor', isHOD: false, research: 'Smart Materials & Structures', email: 'kamle', photo: './people_images/Faculty/Prof._Sudhir_Kamle.jpg', url: '', chamber: '', phoneExt: '' },
  { name: 'Dr. Ramesh Bhat', designation: 'Visiting Professor', isHOD: false, research: 'Pulsars, Radio Transients, Radio Astronomy', email: '', photo: './people_images/Faculty/Dr._Ramesh_Bhat.png', url: '', chamber: '', phoneExt: '' },
  { name: 'Prof. Parthasarathi Mukhopadhyay', designation: 'Visiting Professor', isHOD: false, research: '', email: '', photo: '', url: '', chamber: '', phoneExt: '' },
];

export const PG_FB = {
  "M.Sc. Astronomy \u2014 Batch 2026": [
    {
      "name": "Arnav Sharma",
      "email": "msc2603121003",
      "supervisor": "",
      "research_interests": "Radio Astronomy"
    }
  ],
  "M.S. (Research) \u2014 Batch 2026": [
    {
      "name": "Aashvik B",
      "email": "",
      "supervisor": "Dr. Unmesh Khati",
      "research_interests": ""
    }
  ],
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
  "M.S. (Research) \u2014 Batch 2026": [
    {
      "name": "Aashvik B",
      "email": "",
      "supervisor": "Dr. Unmesh Khati",
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
      "name": "Riya",
      "email": "ms2404121003",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": ""
    },
    {
      "name": "Ankur Sinha",
      "email": "msrphd2404121004",
      "supervisor": "Dr. Narendra Nath Patra",
      "research_interests": ""
    },
    {
      "name": "Nithyapriya S",
      "email": "phd2501221003",
      "supervisor": "Prof. Abhirup Datta",
      "research_interests": "Cosmology, Galaxy Cluster"
    },
    {
      "name": "Najah Saleem",
      "email": "phd2601121007",
      "supervisor": "Dr. Mukul Bhattacharya",
      "research_interests": ""
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
  { sortOrder: 1, name: 'Swapnil Dasharath Sankhe', designation: 'Senior Assistant (HoD Staff)', email: 'aase-office', photo: './people_images/Staff/Swapnil_Dasharath_Sankhe,_Senior_Assistant_(HoD_Staff).jpg' },
  { sortOrder: 2, name: 'Rahul Khare', designation: 'Technical/Administrative Staff', email: 'aase-office' },
  { sortOrder: 3, name: 'Varunesh Shukla', designation: 'Technical/Administrative Staff', email: 'aase-office' },
  { sortOrder: 4, name: 'Abhijeet Dutta', designation: 'Technical/Administrative Staff', email: 'aase-office' },
  { sortOrder: 5, name: 'Durgesh Chouhan', designation: 'Technical/Administrative Staff', email: 'aase-office' },
];


