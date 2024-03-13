//first event

// main screen
let interacted = false;
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

let IS_IMPORTANT = false;
$(window).on('load', () => {
  //prettier-ignore
  const firstPage = () => {
    media.playAudio(bg.getName());
    holder.clear();
    //first page start
    let animationProp = {
      keyframes: [
        { translateX: -25 },
        { translateX: 0 },
        { translateX: 25 },
        { translateX: 0 },
        { translateY: -25 },
        { translateY: 0 },
        { translateY: 25 },
        { translateY: 0 },
      ],
      duration: 10000,
      loop: true,
      delay: function (el, i, l) {
        return i * 200;
      },
    };
    data = {
      text: ['Disney Princess', 'Before the', '23rd'],
      spacing: "20vh",
      css: {
        top: '10px',
        'font-family': 'Kaph, sans-serif',
        'font-size': '5vw',
        'text-align': 'center',
        'text-shadow': '0.8vh 1vh #86BAE0 , 0.8vh 2vh #F7C42F, 0.8vh 3vh #F7F0C6',
        color: '#0763A2',
        '-webkit-text-stroke': '3px black',
      },
      animation: animationProp,
    };

    holder.addAnimatedText(data);
    animationProp = {
      loop: true,
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 2000,
      delay: (el, i) => 100 * i,
    };
    data = {
      text: ['<- Move to start -> '],
      spacing: "1vh",
      css: {
        top: '10vh',
        'font-family': 'Kaph, sans-serif',
        'font-size': '1.7vw',
        'text-align': 'center',

        color: '#DA4C5F',
        '-webkit-text-stroke': '1px black',
      },
      animation: animationProp,
    };

    holder.addOneLine(data);
    cat.moveMiddle();
    cat.stopMove();
  };

  labels = months.LABEL;
  stages = labels.map((label, y) => {
    let css_name = months.CSS_NAME[y];
    return () => {
      media.playAudio(bg.getName());
      holder.clear();
      cat.stopMove();
      animationProp = {
        loop: false,
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: 2000,
        delay: (el, i) => 100 * i,
      };
      data = {
        text: [label],
        spacing: '20vh',
        css: css[css_name],
        animation: animationProp,
      };
      holder.addOneLine(data);
      video_prop = {
        range: months.VIDEO_STAMPS[y],
      };
      holder.addVideo(video_prop);
    };
  });

  const openingScroll = (name) => {
    event_name = 'scroll';
    trigger_width = 40;
    trigger_x = $(canvas).width() / 2;
    //this will fire if the cat is not yet fire the opening event
    if (
      cat.x < trigger_width + trigger_x &&
      cat.x + cat.width > trigger_x &&
      bg.getIndex() == 8 &&
      message.done() &&
      name != event_name
    ) {
      cat.stopMove();
      holder.addScroll();
      return event_name;
      //the event will not fire but its firing because its in the posiution of trigeering
    } else if (
      cat.x < trigger_width + trigger_x &&
      cat.x + cat.width > trigger_x &&
      bg.getIndex() == 8 &&
      name == event_name
    ) {
      return event_name;
    } else {
      //not in the position to fire
      return;
    }
  };

  const lastEvent = async () => {
    removeBalloons();
    holder.clear();
    IS_IMPORTANT = true;

    //black out

    cat.stopMove();
    cat.toggle();
    media.pauseAll();

    $('#balloon-container').css({ 'z-index': 10, background: 'black' });
    await new Promise((resolve, reject) => {
      //wait for 3 seconds
      setTimeout(() => {
        $('#balloon-container').fadeOut(2000, () => {
          $('#balloon-container').css({
            'z-index': 0,
            background: 'none',
            display: 'flex',
          });
          media.playAudio('birth');
          createBalloons(50);
          resolve();
        });
      }, 3000);
    });

    let animationProp = {
      loop: false,
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 2000,
      delay: (el, i) => 100 * i,
    };
    data = {
      text: ['HAPPY BIRTHDAY VON'],
      spacing: '25vh',
      css: css['birth'],
      animation: animationProp,
    };
    holder.addOneLine(data);

    await new Promise((resolve, reject) => {
      //wait for 2 seconds
      setTimeout(() => {
        //change this
        let positioning = ['0px', '20vh'];

        message.open(bdayMessage, positioning);
        resolve();
      }, 2000);
    });
    cat.toggle();
  };

  stages = [firstPage, ...stages, lastEvent];

  //classes declaration
  // resize canvas widht and height
  let container = document.body;
  console.log($(container).width());

  if (window.matchMedia('(orientation: portrait)').matches) {
    canvas.width = $(container).height();
    canvas.height = $(container).width();
  }

  video_handler = new Video();
  bg = new background(Images);
  cat = new Sprite(Images, canvas.width, canvas.height);
  holder = new Holder();
  media = new Media(months.AUDIO);
  message = new BubbleChat(months.MESSAGE);
  trigger = new Trigger(stages);
  scrollPaper = new ScrollPaper(collection_of_messages);
  trigger.addTrigger(openingScroll);
});

$(window).on('load', () => {
  //make sure the user interacted with the page
  //to prevent errors
  $('#clicker').on('click', (e) => {
    let clicker = e.target;
    $(clicker).fadeOut(1200, () => {
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
        if (taps >= 2) {
          keypress = ' ';
        } else if (event.pageX <= cat.x) keypress = 'a';
        else keypress = 'd';

        moveHandler(keypress);

        taps = 0;
      }, 200);
    });
  };

  const moveHandler = (key) => {
    if (!message.done() || scrollPaper.isOpen()) {
      message.next();
      return;
    }
    if (key == 'd' || key == 'ArrowRight') {
      cat.setDirection(1);
    } else if (key == 'a' || key == 'ArrowLeft') {
      cat.setDirection(-1);
    } else if (key == ' ') {
      cat.stopMove();
    }
  };
});


