import { gojuon } from './gojuon.js';
import { dakuten } from './dakuten.js';
import { handakuten } from './handakuten.js';
import { youon } from './youon.js';

export { gojuon, dakuten, handakuten, youon };

export const kanaMap = [
  ...gojuon,
  ...dakuten,
  ...handakuten,
  ...youon
];