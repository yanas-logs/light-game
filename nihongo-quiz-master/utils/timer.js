/* === Utils ===
utils/timer.js
*/
export class Timer {
  constructor(duration, onTick, onComplete) {
    this.duration = duration;
    this.remaining = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.interval = null;
  }

  start() {
    this.stop();
    this.remaining = this.duration;
    this.onTick?.(this.remaining);

    this.interval = setInterval(() => {
      this.remaining--;
      this.onTick?.(this.remaining);

      if (this.remaining <= 0) {
        this.stop();
        this.onComplete?.();
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
