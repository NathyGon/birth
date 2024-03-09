var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
const fps = 60;
let interacted = false;
function random(num) {
  return Math.floor(Math.random() * num);
}
function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.cssText = getRandomStyles();
    document.getElementById('balloon-container').append(balloon);
  }
}

function removeBalloons() {
  document.getElementById('balloon-container').innerHTML = '';
}

//loading all the requried images
Images = {};
const loadImages = () => {
  for (const dir of image_paths) {
    img = $('<img>').attr('src', 'images/' + dir);
    filename = dir.split('/')[1];
    Images[filename] = img;
  }
};
loadImages();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actions();
  bg.draw(c);
  cat.draw(c);
  setTimeout(() => {
    animate();
  }, 1000 / fps);
}

//write how the game progress
function actions() {
  //prioritize the chat
  if (!message.done()) {
    cat.stopMove();
    return;
  }
  //check if the background is need for changing

  bg.changeBg(cat, canvas);

  trigger.listen(bg);
  //change the music background
  trigger.checkTrigger();
  cat.move();
  //draw the cat and the background
}
