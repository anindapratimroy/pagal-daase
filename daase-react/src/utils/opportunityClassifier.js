/**
 * Opportunity Classification and Sorting Utility
 * 
 * Orders opportunities strictly into the academic hierarchy:
 * 1. Ph.D. Opportunities
 * 2. JRF Opportunities (Junior Research Fellowship / Project Fellow / Associate)
 * 3. PG Opportunities (Postgraduate / M.Tech / M.Sc / M.S / Masters)
 * 4. UG Opportunities (Undergraduate / B.Tech / Summer/Winter Internships)
 * 5. Other Opportunities (General)
 */

export const OPP_TIERS = {
  PHD: 1,
  JRF: 2,
  PG:  3,
  UG:  4,
  OTHER: 5,
};

export const OPP_TIER_CONFIG = {
  [OPP_TIERS.PHD]: {
    id: 'phd',
    label: 'Ph.D. Opportunities',
    shortLabel: 'Ph.D.',
    icon: '🎓',
    color: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.12)',
    borderColor: 'rgba(192, 132, 252, 0.35)',
    order: 1,
  },
  [OPP_TIERS.JRF]: {
    id: 'jrf',
    label: 'JRF Opportunities',
    shortLabel: 'JRF',
    icon: '🔬',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    order: 2,
  },
  [OPP_TIERS.PG]: {
    id: 'pg',
    label: 'PG Opportunities',
    shortLabel: 'PG / Master\'s',
    icon: '📚',
    color: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.35)',
    order: 3,
  },
  [OPP_TIERS.UG]: {
    id: 'ug',
    label: 'UG Opportunities',
    shortLabel: 'UG / Internships',
    icon: '💻',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.12)',
    borderColor: 'rgba(251, 191, 36, 0.35)',
    order: 4,
  },
  [OPP_TIERS.OTHER]: {
    id: 'other',
    label: 'Other Opportunities',
    shortLabel: 'General',
    icon: '🌟',
    color: '#94a3b8',
    bgColor: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.35)',
    order: 5,
  },
};

// Regex patterns for classification
const RE_PHD = /\b(ph\.?\s*d|doctoral|doctorate|doctor\s+of\s+philosophy|d\.?\s*phil)\b/i;
const RE_JRF = /\b(jrf|junior\s+research\s+fellow(ship)?|srf|senior\s+research\s+fellow(ship)?|project\s+associate|project\s+fellow|research\s+fellow(ship)?)\b/i;
const RE_PG  = /\b(pg|post\s*graduates?|m\.?\s*tech|m\.?\s*sc|m\.?\s*des|masters?|master's)\b|\bm\.?\s*s(\.|\b)(?!\w)/i;
const RE_UG  = /\b(ug|under\s*graduates?|b\.?\s*tech|b\.?\s*sc|b\.?\s*e|bachelors?|bachelor's|intern(ship)?s?|trainees?|summer\s+intern|winter\s+intern|summer\s+fellow|visiting\s+students?)\b/i;

/**
 * Robustly inspects an opportunity object and classifies its academic tier.
 * @param {Object} opp 
 * @returns {Object} { tier: number, id: string, label: string, shortLabel: string, icon: string, color: string, bgColor: string, borderColor: string }
 */
export function classifyOpportunity(opp) {
  if (!opp || typeof opp !== 'object') {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.OTHER], tier: OPP_TIERS.OTHER };
  }

  const title = (opp.title || '').trim();
  const tag = (opp.tag || opp.category || opp.level || opp.degree || opp.program || opp.type || opp.audience || '').trim();
  const role = (opp.role || opp.position || '').trim();
  const eligibility = (opp.eligibility || opp.qualifications || opp.criteria || '').trim();
  const desc = (opp.desc || opp.description || opp.details || '').trim();

  // 1. Direct explicit tags / categories
  const tagLower = tag.toLowerCase();
  if (/^(ph\.?d|doctoral)$/i.test(tagLower)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PHD], tier: OPP_TIERS.PHD };
  }
  if (/^(jrf|srf)$/i.test(tagLower)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.JRF], tier: OPP_TIERS.JRF };
  }
  if (/^(pg|post\s*graduate|masters?|m\.?tech|m\.?sc)$/i.test(tagLower)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PG], tier: OPP_TIERS.PG };
  }
  if (/^(ug|under\s*graduate|bachelors?|b\.?tech|intern(ship)?)$/i.test(tagLower)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.UG], tier: OPP_TIERS.UG };
  }

  // 2. High-confidence Primary Scope: Title & Role
  const primaryText = `${title} ${tag} ${role}`;

  const hasJrfPrimary = RE_JRF.test(primaryText);
  const hasPhdPrimary = RE_PHD.test(primaryText);
  const hasPgPrimary  = RE_PG.test(primaryText);
  const hasUgPrimary  = RE_UG.test(primaryText);

  // If primary mentions PhD
  if (hasPhdPrimary && !hasJrfPrimary) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PHD], tier: OPP_TIERS.PHD };
  }

  // If primary mentions JRF
  if (hasJrfPrimary) {
    // If it's specifically titled as PhD admission/program with JRF eligibility, treat as PhD
    if (/ph\.?d\s+(admissions?|programs?|positions?)/i.test(primaryText) && !/\b(recruitment|post|vacancy|opening|hiring)\s+of\s+(a\s+)?jrf\b/i.test(primaryText)) {
      return { ...OPP_TIER_CONFIG[OPP_TIERS.PHD], tier: OPP_TIERS.PHD };
    }
    return { ...OPP_TIER_CONFIG[OPP_TIERS.JRF], tier: OPP_TIERS.JRF };
  }

  // If primary mentions PG
  if (hasPgPrimary && !hasUgPrimary) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PG], tier: OPP_TIERS.PG };
  }

  // If primary mentions UG / Internships
  if (hasUgPrimary) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.UG], tier: OPP_TIERS.UG };
  }

  if (hasPgPrimary) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PG], tier: OPP_TIERS.PG };
  }

  // 3. Fallback: Check full text (eligibility, qualifications, descriptions)
  const fullText = `${primaryText} ${eligibility} ${desc}`;

  if (RE_JRF.test(fullText)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.JRF], tier: OPP_TIERS.JRF };
  }
  if (RE_PHD.test(fullText)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PHD], tier: OPP_TIERS.PHD };
  }
  if (RE_PG.test(fullText)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.PG], tier: OPP_TIERS.PG };
  }
  if (RE_UG.test(fullText)) {
    return { ...OPP_TIER_CONFIG[OPP_TIERS.UG], tier: OPP_TIERS.UG };
  }

  return { ...OPP_TIER_CONFIG[OPP_TIERS.OTHER], tier: OPP_TIERS.OTHER };
}

/**
 * Sorts an array of opportunities strictly by the academic hierarchy:
 * PhD -> JRF -> PG -> UG -> Other.
 * Preserves secondary sort by deadline / date or stability.
 * 
 * @param {Array} opportunities 
 * @returns {Array} Sorted array
 */
export function sortOpportunitiesByTier(opportunities = []) {
  if (!Array.isArray(opportunities)) return [];

  return [...opportunities].sort((a, b) => {
    const classA = classifyOpportunity(a);
    const classB = classifyOpportunity(b);

    if (classA.tier !== classB.tier) {
      return classA.tier - classB.tier;
    }

    // Secondary sort: deadline if present
    const dateA = a.lastDate || a.deadline || '';
    const dateB = b.lastDate || b.deadline || '';
    if (dateA && dateB) {
      const timeA = new Date(dateA).getTime();
      const timeB = new Date(dateB).getTime();
      if (!isNaN(timeA) && !isNaN(timeB)) {
        return timeB - timeA;
      }
    }

    return 0;
  });
}
