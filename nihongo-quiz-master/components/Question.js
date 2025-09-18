import { randInt, shuffle } from '../utils/random.js';
import { kanaMap } from '../data/index.js';

export class Question {
  constructor(direction, script) {
    this.direction = direction;
    this.script = script;
    this.entry = null;
    this.options = [];
    this.questionText = '';
  }

  pickScript(scriptEl) {
    const s = scriptEl.value;
    if (s === 'random') return Math.random() < 0.5 ? 'hiragana' : 'katakana';
    return s;
  }

  build(scriptEl, directionEl) {
    this.entry = kanaMap[randInt(kanaMap.length)];
    this.direction = directionEl.value;
    this.script = this.pickScript(scriptEl);

    let pool = kanaMap.filter(it => it !== this.entry);
    shuffle(pool);
    const wrongs = pool.slice(0, 3);

    if (this.direction === 'latin') {
      this.questionText = this.entry.romaji.toUpperCase();
      this.options = shuffle([
        { text: this.entry[this.script], isCorrect: true },
        ...wrongs.map(w => ({ text: w[this.script], isCorrect: false }))
      ]);
    } else {
      this.questionText = this.entry[this.script];
      this.options = shuffle([
        { text: this.entry.romaji.toUpperCase(), isCorrect: true },
        ...wrongs.map(w => ({ text: w.romaji.toUpperCase(), isCorrect: false }))
      ]);
    }
    return this;
  }

  render(questionEl, optionsEl, qnumEl, qIndex, onSelect) {
    questionEl.textContent = this.questionText;
    qnumEl.textContent = qIndex;
    optionsEl.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    this.options.forEach((o, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.dataset.correct = o.isCorrect ? '1' : '0';
      btn.innerHTML = `<span class="label">${letters[i]}</span><span class="text">${o.text}</span>`;
      btn.onclick = () => onSelect(btn, o);
      optionsEl.appendChild(btn);
    });
  }
}