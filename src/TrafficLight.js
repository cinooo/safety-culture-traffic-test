export default class TrafficLight {
  constructor(direction, color) {
    if (direction !== 'NS' && direction !== 'EW') {
      throw new Error('Bad direction given for TrafficLight');
    }

    const acceptedColors = ['GREEN', 'YELLOW', 'RED'];
    if (typeof color === 'undefined' || acceptedColors.indexOf(color) === -1) {
      throw new Error('Must pass in a color GREEN, YELLOW or RED');
    }

    this.direction = direction;
    this.color = color;
    console.log(`Light ${direction} direction: ${color}`)
  }

  changeLight(time) {
    const originalColor = this.color;
    switch (this.color) {
      case 'GREEN':
        const turningYellow = 4.5 * 60 * timeFactor; // Green light should turn yellow at 4.5 minutes
        // console.log(time, turningYellow);
        if (time === turningYellow) {
          this.color = 'YELLOW'
        }
        break;
      case "YELLOW":
        const turningRed = 0;
        if (time === turningRed) {
          this.color = 'RED';
        }
        break;
      case "RED":
        if (time === 0) {
          this.color = 'GREEN';
        }
        break;
    }
    if (originalColor !== this.color) {
      console.log(this.direction, '- changing light from ', originalColor, 'to', this.color);
    }
    return this.color;
  }

};
