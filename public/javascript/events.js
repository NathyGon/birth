//first event

// main screen
let interacted = false;

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
      text: ['DISNEY PRINCESS', 'BEFORE THE', '23TH'],
      spacing: 170,
      css: {
        top: '10px',
        'font-family': 'Kaph, sans-serif',
        'font-size': '5em',
        'text-align': 'center',
        'text-shadow': '8px 8px #CE3E50 , 8px 16px #8F3755, 8px 24px #302047',
        color: '#FFA437',
      },
      animation: animationProp,
    };

    holder.addAnimatedText(data);
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
      text: ['Move to start -> '],
      spacing: 50,
      css: {
        top: '20px',
        'font-family': 'chaly, sans-serif',
        'font-size': '2em',
        'text-align': 'center',

        color: 'red',
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
        spacing: 100,
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
      spacing: 100,
      css: css['birth'],
      animation: animationProp,
    };
    holder.addOneLine(data);

    await new Promise((resolve, reject) => {
      //wait for 2 seconds
      setTimeout(() => {
        //change this
        let positioning = ['0px', '300px'];

        message.open(bdayMessage, positioning);
        resolve();
      }, 2000);
    });
    cat.toggle();
  };

  stages = [firstPage, ...stages, lastEvent];

  //classes declaration
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

      window.requestAnimationFrame(animate);
      $(window).on('keydown', (event) => {
        moveHandler(event);
      });
    });
  });

  const moveHandler = (event) => {
    if (!message.done()) {
      message.next();
      return;
    }
    if (event.key == 'd' || event.key == 'ArrowRight') {
      cat.setDirection(1);
    } else if (event.key == 'a' || event.key == 'ArrowLeft') {
      cat.setDirection(-1);
    } else if (event.key == ' ') {
      cat.stopMove();
    }
  };
});


