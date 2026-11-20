import { ScanReport } from '@/types/scan';
import { SkinProfile } from '@/types/profile';
import { SkinCarePlan, RoutineStep } from '@/types/recommendations';
import { INGREDIENT_DATABASE } from '@/features/recommendations/ingredientDatabase';

export function buildPersonalizedPlan(scan: ScanReport, profile: SkinProfile): SkinCarePlan {
  const isOily =
    scan.summaryObservations.shineOverall === 'elevated' || profile.skinFeel === 'oily_shiny';
  const isSensitive =
    profile.sensitivity === 'very_sensitive' ||
    profile.sensitivity === 'moderately_sensitive' ||
    scan.summaryObservations.rednessOverall === 'prominent';
  const isDry = profile.skinFeel === 'tight_dry' || profile.flaking === 'frequently';
  const hasTextureFocus =
    scan.summaryObservations.textureOverall === 'rough' ||
    profile.primaryConcerns.includes('texture_smoothing');

  // Morning Routine
  const morningRoutine: RoutineStep[] = [
    {
      stepNumber: 1,
      timeOfDay: 'AM',
      category: 'Cleanser',
      productName:
        isDry || isSensitive ? 'Gentle Hydrating Milk Cleanser' : 'Balancing Gel Cleanser',
      heroIngredient: isDry ? 'Glycerin & Colloidal Oat' : 'Zinc PCA & Green Tea',
      whyRecommended: isDry
        ? 'Cleanses night impurities without stripping natural skin barrier lipids.'
        : 'Removes excess overnight sebum production without over-drying.',
      howToApply:
        'Massage 1 pump onto damp skin for 30 seconds, rinse thoroughly with lukewarm water.',
    },
    {
      stepNumber: 2,
      timeOfDay: 'AM',
      category: 'Serum/Active',
      productName: isSensitive
        ? 'Calming Cica & Panthenol Serum'
        : isOily
          ? 'Niacinamide 5% + Zinc 1% Balancing Serum'
          : 'Multi-Molecular Hyaluronic Acid Serum',
      heroIngredient: isSensitive
        ? 'Centella Asiatica (Cica)'
        : isOily
          ? 'Niacinamide (5%)'
          : 'Hyaluronic Acid',
      whyRecommended: isSensitive
        ? 'Addresses visible cheek redness observed during face scan and reinforces defensive barrier.'
        : isOily
          ? 'Regulates daytime light reflection and reduces visible shine on the forehead and nose.'
          : 'Plumps stratum corneum cells and maintains smooth, radiant surface hydration.',
      howToApply: 'Pat 3-4 drops evenly across forehead, cheeks, and neck until absorbed.',
    },
    {
      stepNumber: 3,
      timeOfDay: 'AM',
      category: 'Moisturizer',
      productName: isOily ? 'Oil-Free Mattifying Water Gel' : 'Ceramide Barrier Cream',
      heroIngredient: isOily ? 'Electrolytes & Silica' : 'Ceramides NP & AP',
      whyRecommended: isOily
        ? 'Provides weightless non-greasy hydration suitable for shine-prone areas.'
        : 'Seals active hydration and replenishes intercellular lipid moisture envelope.',
      howToApply: 'Smooth a dime-sized amount gently across face avoiding direct eyelid contact.',
    },
    {
      stepNumber: 4,
      timeOfDay: 'AM',
      category: 'Sunscreen',
      productName: 'Broad-Spectrum Daily Mineral Shield SPF 50+',
      heroIngredient: 'Zinc Oxide 12% + Antioxidants',
      whyRecommended:
        'Essential daily defense protecting newly supported skin cells from UV pigmentation and photo-aging.',
      howToApply:
        'Apply 2 generous finger lengths as the final step 15 minutes before daylight exposure.',
      cautions: 'Reapply every 2 hours if outdoors or sweating.',
    },
  ];

  // Evening Routine
  const eveningRoutine: RoutineStep[] = [
    {
      stepNumber: 1,
      timeOfDay: 'PM',
      category: 'Cleanser',
      productName: 'Gentle Clarifying Cleanser',
      heroIngredient: 'Amino Acid Surfactants',
      whyRecommended:
        'Thoroughly dissolves daytime mineral sunscreen, pollution particulate, and oil.',
      howToApply:
        'Work into a mild lather with water, rinse thoroughly and pat dry with a clean towel.',
    },
    {
      stepNumber: 2,
      timeOfDay: 'PM',
      category: 'Treatment',
      productName:
        hasTextureFocus && !isSensitive
          ? 'Salicylic Acid 2% Refining Treatment'
          : isSensitive
            ? 'Azelaic Acid 10% Soothing Emulsion'
            : 'Restorative Barrier Repair Serum',
      heroIngredient:
        hasTextureFocus && !isSensitive
          ? 'Salicylic Acid (BHA)'
          : isSensitive
            ? 'Azelaic Acid (10%)'
            : 'Squalane & Ceramide Complex',
      whyRecommended:
        hasTextureFocus && !isSensitive
          ? 'Gently refines micro-texture variance identified on forehead and cheeks.'
          : isSensitive
            ? 'Reduces visible flushing and blotchiness without harsh irritation.'
            : 'Reconditions skin barrier overnight during cellular rest phase.',
      howToApply:
        hasTextureFocus && !isSensitive
          ? 'Apply 2-3 nights per week only. Begin with 1 night to assess tolerance.'
          : 'Smooth 1 thin pump across face after cleansing.',
      cautions: hasTextureFocus
        ? 'Avoid contact with eye contour. Slight tingling is normal.'
        : undefined,
    },
    {
      stepNumber: 3,
      timeOfDay: 'PM',
      category: 'Moisturizer',
      productName: 'Overnight Barrier Recovery Cream',
      heroIngredient: 'Ceramide Triplet & Centella',
      whyRecommended: 'Deep restorative moisture lock preventing nocturnal water loss.',
      howToApply: 'Warm a nickel-sized amount between fingertips and press into skin.',
    },
  ];

  // Pick matched ingredients
  const matchingIngredientIds = [
    isOily ? 'niacinamide' : 'hyaluronic_acid',
    'ceramides',
    isSensitive ? 'centella_asiatica' : hasTextureFocus ? 'salicylic_acid' : 'squalane',
    'azelaic_acid',
  ];

  const matchedIngredients = INGREDIENT_DATABASE.filter(ing =>
    matchingIngredientIds.includes(ing.id),
  );

  return {
    planId: `plan_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    summary: `Personalized ${isOily ? 'Clarifying & Mattifying' : isSensitive ? 'Calming & Barrier Repair' : 'Hydrating & Smoothing'} Protocol`,
    morningRoutine,
    eveningRoutine,
    recommendedIngredients: matchedIngredients,
    cautionaryNotes: [
      'Always introduce one new active ingredient at a time, spacing introductions by 10-14 days.',
      'If irritation, burning, or persistent tightness occurs, pause actives and return to gentle cleanser and barrier cream.',
      'Never skip morning broad-spectrum sunscreen when utilizing active skincare ingredients.',
    ],
    patchTestGuide:
      'Apply a small dab of product behind the ear or on inner forearm. Leave on for 24 hours. Check for signs of redness, itching, or swelling before facial application.',
    disclaimer:
      'This skincare plan is designed for cosmetic wellness and routine education. It is not medical treatment or a clinical prescription.',
  };
}
