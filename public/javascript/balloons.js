export default function Balloon() {
  this.getRandomStyles = () => {
    var r = this.random(255);
    var g = this.random(255);
    var b = this.random(255);
    var mt = this.random(200);
    var ml = this.random(50);
    var dur = this.random(5) + 5;
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
  };

  this.random = (num) => {
    return Math.floor(Math.random() * num);
  };
  this.createBalloons = (num) => {
    for (var i = num; i > 0; i--) {
      var balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.cssText = this.getRandomStyles();
      document.getElementById('balloon-container').append(balloon);
    }
  };

  this.removeBalloons = () => {
    document.getElementById('balloon-container').innerHTML = '';
  };
}
