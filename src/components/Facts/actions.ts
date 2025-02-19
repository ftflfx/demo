'use server';

import { Language } from '@/app/types';

export async function getFact(lang: Language) {
  try {
    const response = await fetch(
      `https://uselessfacts.jsph.pl/api/v2/facts/random?language=${lang}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
