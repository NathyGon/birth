import {
  Video,
  Sound,
  ScrollPaper,
  myEvents,
  Viewer,
  BubbleChat,
} from './classes.js';
import Sprite from './sprite.js';
import Stages from './stages.js';
import { createStages, createCustomEvent } from './events.js';

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
const fps = 60;
let interacted = false;
let IS_IMPORTANT = false;

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
//loading all the requried images

const loadImages = () => {
  let Images = {};
  for (const dir of image_paths) {
    let img = $('<img>').attr('src', 'images/' + dir);
    let filename = dir.split('/')[1];
    Images[filename] = img;
  }
  return Images;
};

let VideoHandler;
let StagesHandler;
let Cat;
let ContainerHandler;
let SoundHandler;
let MessageHandler;
let ScrollHandler;
let EventHandler;
function init() {
  const Images = loadImages();
  changeScreenSize();
  VideoHandler = new Video();
  StagesHandler = new Stages(Images);
  Cat = new Sprite(Images, canvas);
  ContainerHandler = new Viewer();
  SoundHandler = new Sound(STAGES_DETAILS.AUDIO);
  MessageHandler = new BubbleChat(STAGES_DETAILS.MESSAGE);
  ScrollHandler = new ScrollPaper(collection_of_messages);
  EventHandler = new myEvents();
  let Classes = {
    Sound: SoundHandler,
    Video: VideoHandler,
    Cat: Cat,
    Container: ContainerHandler,
    Stages: StagesHandler,
    Scroll: ScrollHandler,
    Bubble: MessageHandler,
  };

  StagesHandler.add(createStages(Classes));
  EventHandler.add(createCustomEvent(Classes));

  Cat.moveMiddle();

  initPlayerControls();
  // windowResizeEvent();
}

function windowResizeEvent() {
  $(window).on('resize', () => {
    // changeScreenSize();
    // Cat.resize();
  });
}

function changeScreenSize() {
  let container = document.body;
  canvas.width = $(container).width();
  canvas.height = $(container).height();

  if (window.matchMedia('(orientation: portrait)').matches && isMobileDevice) {
    canvas.width = $(container).height();
    canvas.height = $(container).width();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actions();
  StagesHandler.drawBackground(c);
  Cat.draw(c);
  setTimeout(() => {
    animate();
  }, 1000 / fps);
  return;
}

//write how the game progress
function actions() {
  //prioritize the chat
  // if (!message.done() || scrollPaper.isOpen()) {
  //   cat.stopMove();
  //   return;
  // }
  //check if the background is need for changing

  StagesHandler.listen(Cat, canvas);
  EventHandler.checkForEvent();
  Cat.move();
}

function initPlayerControls() {
  $('#clicker').on('click', (e) => {
    let clicker = e.target;
    $(clicker).fadeOut(1000, () => {
      clicker.remove();
      if (isMobileDevice()) {
        document.body.requestFullscreen();
        screen.orientation.lock('landscape');
      }
      screenTapsHandler();

      $(window).on('keydown', (event) => {
        moveHandler(event.key);
      });

      window.requestAnimationFrame(animate);
    });
  });
  let screenTapsHandler = () => {
    let taps = 0;
    $(window).on('click', (event) => {
      taps += 1;

      if (taps > 1) return;
      setTimeout(() => {
        let keypress;
        if (taps >= 2) {
          keypress = ' ';
        } else if (event.pageX <= Cat.x) keypress = 'a';
        else keypress = 'd';

        moveHandler(keypress);
        taps = 0;
      }, 200);
    });
  };

  const moveHandler = (key) => {
    if (Cat.isInEvent()) {
      if (!MessageHandler.done()) MessageHandler.next();
      return;
    }

    //seperate
    if (key == 'd' || key == 'ArrowRight') {
      Cat.setDirection(1);
    } else if (key == 'a' || key == 'ArrowLeft') {
      Cat.setDirection(-1);
    } else if (key == ' ') {
      Cat.stopMove();
    }
  };
}

init();
