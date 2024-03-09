class Trigger {
  x_postion = 0; // the coordinates where this will apear
  last_map;
  STAGES;
  current_stage = null;
  constructor(data) {
    this.STAGES = data;
  }
  listen(bg) {
    let stage_now = this.STAGES[bg.getIndex()];
    if (this.current_stage != stage_now) {
      this.current_stage = stage_now;
      this.current_stage();
    }
  }
  last_trigger_name = null;
  pending_event;
  addTrigger(customEvent) {
    this.pending_event = customEvent;
  }
  checkTrigger() {
    let name = this.last_trigger_name;
    this.last_trigger_name = this.pending_event(name);
  }
}

function onelineAnimation(textWrapper, animationProp) {
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    '<span class = "letters">$&</span>'
  );
  let letters = textWrapper.querySelectorAll('span');
  $(letters).css('display', 'inline-block').css('position', 'relative');
  animationProp.targets = letters;
  anime(animationProp);
}
class Holder {
  async addBubble() {
    let div = $('<div>');
    div.css({
      border: ' 2px solid',

      'border-radius': '10px',
      ' padding': '10px',
      ' box-shadow': '5px 10px',
      background: 'white',
      padding: '20px',
      width: '0%',

      margin: 'auto',
      position: 'relative',
      top: '70px',
      height: 'auto',
    });

    $('#controls').append(div);
    await new Promise((res, rej) => {
      anime({
        targets: div[0],
        width: '70%', // -> from '28px' to '100%',
        top: '320px',
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false,
        duration: 1000,

        complete: () => res(),
      });
    });
    return div;
  }
  addVideo(prop) {
    let div = $('<div>');
    div.css({
      position: 'relative',
      margin: '40px 0px 0px 0px ',
      'text-align': 'center',
    });
    var video = document.createElement('video');
    video.setAttribute('src', 'video/meme.mp4');
    $(video).css({
      width: '40%',
      border: '5px solid black',
      display: 'none',
    });
    div.append(video);
    $('#controls').append(div);
    video_handler.insert(video, prop);
    video_handler.show();
  }
  addOneLine(prop) {
    let texts = prop.text;
    let css = prop.css;
    let animationProp = prop.animation;

    let div = $('<div>');
    div
      .css({
        position: 'relative',
      })
      .css(css);
    let p;
    texts.forEach((text) => {
      p = $('<p>')
        .css({ 'line-height': prop.spacing + 'px' })
        .text(text);
      // $('<p>').css();
      div.append(p);
    });
    $('#controls').append(div);
    onelineAnimation(p[0], animationProp);
  }
  addNormal(prop) {
    let texts = prop.text;
    let css = prop.css;
    let div = $('<div>');
    div
      .css({
        position: 'relative',
      })
      .css(css);
    let p;
    texts.forEach((text) => {
      p = $('<p>')
        .css({ 'line-height': prop.spacing + 'px' })
        .text(text);
      // $('<p>').css();
      div.append(p);
    });
    $('#controls').append(div);
  }

  addScroll() {
    //The container class name scroll

    let scroll = $('<div></div>').addClass('scroll');
    let container = $('<div></div>').addClass('message-container');
    scroll.append(container);
    let messages = $('<div></div>').addClass('messages');
    let buttons = $('<div></div>').addClass('buttons');
    let decrement = $('<button>-</button>');
    let increment = $('<button>+</button>');
    buttons.append(decrement);
    buttons.append(increment);
    container.append(buttons);
    container.append(messages);

    scrollPaper.add(increment, decrement, messages);

    $('#controls').append(scroll);
  }

  addAnimatedText(prop) {
    //this will hold all the elements
    let texts = prop.text;
    let css = prop.css;
    let animationProp = prop.animation;

    let div = $('<div>');
    div
      .css({
        position: 'relative',
      })
      .css(css);

    texts.forEach((text) => {
      let p = $('<p>')
        .css({ 'line-height': prop.spacing + 'px' })
        .text(text);
      // $('<p>').css();
      div.append(p);
    });

    $('#controls').append(div);
    animationProp.targets = div[0].querySelectorAll('p');
    anime(animationProp);
  }
  clear() {
    $('#controls').html('');
  }
}
