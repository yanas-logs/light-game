import { Question } from './Question.js';
import { Timer } from '../utils/timer.js';

export class Game {
  constructor(els) {
    this.els = els;
    this.score = 0;
    this.qIndex = 0;
    this.currentQ = null;
    this.awaitingFeedback = false;
    this.pendingCorrectTimeout = null;

    this.timer = new Timer(() => this.timeout(), els.countdownEl);

    this.bindEvents();
  }

  bindEvents() {
    this.els.switchEl.addEventListener('click', () => {
      this.els.switchEl.classList.toggle('on');
      this.timer.toggle();
    });

    this.els.startBtn.addEventListener('click', () => this.reset());
    this.els.nextBtn.addEventListener('click', () => {
      if (!this.awaitingFeedback) this.nextQuestion();
    });
  }

  reset() {
    this.score = 0;
    this.qIndex = 0;
    this.els.scoreEl.textContent = this.score;
    this.els.qnumEl.textContent = this.qIndex;
    this.els.messageEl.textContent = 'Game started!';
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.pendingCorrectTimeout) {
      clearTimeout(this.pendingCorrectTimeout);
      this.pendingCorrectTimeout = null;
    }
    this.awaitingFeedback = false;
    this.timer.stop();

    this.currentQ = new Question().build(this.els.scriptEl, this.els.directionEl);
    this.currentQ.render(this.els.questionEl, this.els.optionsEl, this.els.qnumEl, ++this.qIndex, (btn, opt) => this.onSelect(btn, opt));

    this.timer.start();
  }

  onSelect(btn, opt) {
    if (this.awaitingFeedback) return;
    this.awaitingFeedback = true;
    this.timer.stop();

    if (opt.isCorrect) {
      this.els.messageEl.textContent = 'Correct! Highlight will appear after 5s.';
      this.pendingCorrectTimeout = setTimeout(() => {
        btn.classList.add('correct');
        this.score++;
        this.els.scoreEl.textContent = this.score;
        setTimeout(() => {
          this.awaitingFeedback = false;
          this.nextQuestion();
        }, 900);
      }, 5000);
    } else {
      btn.classList.add('wrong');
      this.els.messageEl.textContent = 'Wrong ❌';
      if (this.els.showAnswersCheckbox.checked) this.revealCorrect();
      setTimeout(() => {
        this.awaitingFeedback = false;
        this.nextQuestion();
      }, 900);
    }
  }

  revealCorrect() {
    this.els.optionsEl.querySelectorAll('.opt').forEach(b => {
      if (b.dataset.correct === '1') b.classList.add('correct');
    });
  }

  timeout() {
    this.awaitingFeedback = true;
    this.els.messageEl.textContent = 'Time is up!';
    setTimeout(() => {
      this.awaitingFeedback = false;
      this.nextQuestion();
    }, 900);
  }
}