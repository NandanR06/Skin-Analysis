export interface Ingredient {
  id: string;
  name: string;
  cosmeticRole: string; // e.g. "Humectant & Barrier Support"
  benefits: string[];
  safeFrequency: string; // e.g. "Daily, AM or PM"
  precautions: string[];
  patchTestRecommended: boolean;
  idealForConcerns: string[];
}

export interface RoutineStep {
  stepNumber: number;
  timeOfDay: 'AM' | 'PM' | 'BOTH';
  category: 'Cleanser' | 'Toner/Mist' | 'Serum/Active' | 'Moisturizer' | 'Sunscreen' | 'Treatment';
  productName: string;
  heroIngredient: string;
  whyRecommended: string;
  howToApply: string;
  cautions?: string;
}

export interface SkinCarePlan {
  planId: string;
  generatedAt: string;
  summary: string;
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  recommendedIngredients: Ingredient[];
  cautionaryNotes: string[];
  patchTestGuide: string;
  disclaimer: string;
}
