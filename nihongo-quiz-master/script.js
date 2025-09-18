import { Game } from './components/Game.js';

const els = {
  directionEl: document.getElementById('direction'),
  scriptEl: document.getElementById('script'),
  switchEl: document.getElementById('switch'),
  countdownEl: document.getElementById('countdown'),
  questionEl: document.getElementById('question'),
  optionsEl: document.getElementById('options'),
  qnumEl: document.getElementById('qnum'),
  scoreEl: document.getElementById('score'),
  messageEl: document.getElementById('message'),
  startBtn: document.getElementById('startBtn'),
  nextBtn: document.getElementById('nextBtn'),
  showAnswersCheckbox: document.getElementById('showAnswers')
};

const game = new Game(els);
game.reset();