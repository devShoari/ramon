import { en } from './en';
import { fa } from './fa';

export const dictionaries = {
  en,
  fa,
};

export const getDictionary = (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
}; 