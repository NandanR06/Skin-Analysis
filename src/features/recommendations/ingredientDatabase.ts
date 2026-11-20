import { Ingredient } from '../../types/recommendations';

export const INGREDIENT_DATABASE: Ingredient[] = [
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    cosmeticRole: 'Barrier Support & Sebum Regulation',
    benefits: [
      'Helps balance surface sebum and visual pore appearance',
      'Supports healthy lipid moisture barrier',
      'Encourages more uniform tone and radiant finish',
    ],
    safeFrequency: '1-2x daily, AM or PM',
    precautions: [
      'Concentrations above 10% may cause temporary flushing in sensitive skin',
      'Perform patch test before initial use',
    ],
    patchTestRecommended: false,
    idealForConcerns: ['oil_control', 'tone_evenness', 'texture_smoothing'],
  },
  {
    id: 'hyaluronic_acid',
    name: 'Hyaluronic Acid Multi-Weight',
    cosmeticRole: 'Surface & Deep Hydration',
    benefits: [
      'Attracts and binds atmospheric moisture into the stratum corneum',
      'Plumps visible fine surface dryness lines',
      'Gentle and non-comedogenic for all skin types',
    ],
    safeFrequency: '2x daily, AM and PM',
    precautions: [
      'Apply to slightly damp skin to prevent dehydration in low-humidity environments',
      'Seal with an emollient moisturizer',
    ],
    patchTestRecommended: false,
    idealForConcerns: ['hydration', 'aging_gracefully'],
  },
  {
    id: 'ceramides',
    name: 'Ceramide Complex (NP, AP, EOP)',
    cosmeticRole: 'Lipid Replenishment & Moisture Barrier Defense',
    benefits: [
      'Replenishes intercellular lipid matrix',
      'Prevents transepidermal water loss (TEWL)',
      'Soothes visible flaking, tightness, and surface discomfort',
    ],
    safeFrequency: '2x daily, AM and PM',
    precautions: [
      'Look for balanced 3:1:1 physiological lipid ratios (ceramides, cholesterol, fatty acids)',
    ],
    patchTestRecommended: false,
    idealForConcerns: ['hydration', 'redness_calming', 'texture_smoothing'],
  },
  {
    id: 'centella_asiatica',
    name: 'Centella Asiatica (Cica / Madecassoside)',
    cosmeticRole: 'Soothes Redness & Calms Irritation',
    benefits: [
      'Calms visible redness and temporary reactivity',
      'Rich in antioxidant triterpenoids',
      'Reinforces vulnerable or sensitized skin',
    ],
    safeFrequency: 'Daily as needed',
    precautions: ['Generally very well tolerated even by reactive skin'],
    patchTestRecommended: false,
    idealForConcerns: ['redness_calming', 'hydration'],
  },
  {
    id: 'salicylic_acid',
    name: 'Salicylic Acid (BHA 0.5% - 2%)',
    cosmeticRole: 'Oil-Soluble Pore Refinement',
    benefits: [
      'Dissolves trapped surface sebum and follicular debris',
      'Smooths micro-texture irregularities and bumps',
      'Enhances overall skin clarity',
    ],
    safeFrequency: '2-3x per week in PM routine',
    precautions: [
      'Introduce gradually to avoid dryness or surface peeling',
      'Always follow with daily broad-spectrum SPF 30+',
      'Avoid combining in the same step with other strong exfoliating acids',
    ],
    patchTestRecommended: true,
    idealForConcerns: ['oil_control', 'texture_smoothing'],
  },
  {
    id: 'azelaic_acid',
    name: 'Azelaic Acid (10%)',
    cosmeticRole: 'Tone Uniformity & Redness Reduction',
    benefits: [
      'Visibly diminishes blotchiness and persistent flushing appearance',
      'Refines rough or uneven surface areas gently',
      'Ideal alternative for skin that cannot tolerate strong direct acids',
    ],
    safeFrequency: '1x daily (evening initially, building to twice)',
    precautions: [
      'May produce a mild tingling sensation for the first 1-2 minutes',
      'Patch test behind the ear before full facial application',
    ],
    patchTestRecommended: true,
    idealForConcerns: ['redness_calming', 'tone_evenness'],
  },
  {
    id: 'squalane',
    name: 'Plant-Derived Squalane',
    cosmeticRole: 'Biocompatible Lightweight Emollient',
    benefits: [
      'Mimics natural skin sebum without clogging pores',
      'Locks in active hydration serums without greasy residue',
      'Leaves skin silky and supple',
    ],
    safeFrequency: 'Daily, PM or cold mornings',
    precautions: ['Ensure 100% plant-derived (sugarcane or olive) purity'],
    patchTestRecommended: false,
    idealForConcerns: ['hydration', 'texture_smoothing'],
  },
];
