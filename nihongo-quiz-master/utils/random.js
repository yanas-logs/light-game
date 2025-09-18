/*
 === Utils === 
utils/random.js
*/
export function randInt(n) {
  return Math.floor(Math.random() * n);
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
