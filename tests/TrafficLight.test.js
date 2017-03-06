var chai = require("chai");
var expect = chai.expect;
import TrafficLight from '../src/TrafficLight.js'

describe('TrafficLight', () => {
  it('should not instantiate a class without paramaters', function() {
    expect(function() {
       new TrafficLight()
     }).to.throw(Error);
  });

  describe('#changeLight', function() {
    const directions = ['NS', 'EW'];
    const colors = ['GREEN', 'YELLOW', 'RED'];
    directions.forEach(function(direction) {
      colors.forEach(function (color) {
        it(`should create a new ${direction} ${color} TrafficLight instance`, function() {
          let trafficLight = new TrafficLight(direction, color);
          expect(trafficLight).to.be.an.instanceOf(TrafficLight);
        });
      })
    });

    it('should not change light if no time passed in', function()  {
      let trafficLight = new TrafficLight('NS', 'GREEN');
      expect(trafficLight.changeLight()).to.equal('GREEN');
    })

    let range = [1000, 1*60*1000, (4.5*60-1)*1000];
    range.forEach(function(mins) {
      let trafficLight = new TrafficLight('NS', 'GREEN');
      it('should stay GREEN between 0 to 4.5 minutes', function()  {
        expect(trafficLight.changeLight(mins)).to.equal('GREEN');
      })
    })

    it('should change light from GREEN to YELLOW at 4.5 minutes', function()  {
      let trafficLight = new TrafficLight('NS', 'GREEN');
      const mins = 4.5 * 60 * 1000;
      expect(trafficLight.changeLight(mins)).to.equal('YELLOW');
    })

    range = [(4.5*60+1)*1000, 4.8*60*1000, (5*60-1)*1000];
    range.forEach(function(mins) {
      let trafficLight = new TrafficLight('NS', 'YELLOW');
      it('should stay YELLOW between 4.5 to 5 minutes', function()  {
        expect(trafficLight.changeLight(mins)).to.equal('YELLOW');
      })
    })

    it('should change light from YELLOW to RED at 5 minutes', function()  {
      let trafficLight = new TrafficLight('NS', 'YELLOW');
      const mins = 0;
      expect(trafficLight.changeLight(mins)).to.equal('RED');
    })

    it('should change light from RED to GREEN at 5 minutes', function()  {
      let trafficLight = new TrafficLight('NS', 'RED');
      const mins = 0;
      expect(trafficLight.changeLight(mins)).to.equal('GREEN');
    })

    range = [1000, 2.5*60*1000, (5*60-1)*1000];
    range.forEach(function(mins) {
      let trafficLight = new TrafficLight('NS', 'RED');
      it('should stay RED between 0 to 5 minutes', function()  {
        expect(trafficLight.changeLight(mins)).to.equal('RED');
      })
    })
  })
})
