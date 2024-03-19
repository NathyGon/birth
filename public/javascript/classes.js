import animation from './animation.js';

export class Sound {
  file_name_list = [];
  current_playing;
  constructor(media) {
    this.audio_list = media.map((fileName) => {
      var snd = new Audio(fileName); // buffers automatically when created
      this.file_name_list.push(fileName);
      snd.loop = true;
      snd.volume = 0.5;
      return snd;
    });
  }
  playAudio(name) {
    let index = this.file_name_list.findIndex((e) => e.includes(name));
    let audio = this.audio_list[index];
    if (this.current_playing != audio && this.current_playing != null) {
      this.current_playing.pause();
      this.current_playing.currentTime = 0;
    }

    audio.play();
    this.current_playing = audio;
  }
  pauseAll() {
    this.current_playing.pause();
    for (const audio of this.audio_list) {
      audio.pause();
    }
  }
  resetAll() {
    this.current_playing = null;
    for (const audio of this.audio_list) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

export class Video {
  currentVideo;
  video_attributes;
  constructor() {}
  resetTimeUpdate() {
    if (this.currentVideo.currentTime >= this.video_attributes.range.end) {
      this.currentVideo.currentTime = this.video_attributes.range.start;
    }
  }
  //data contains
  //the range: starting time of the video and when will the video ends
  //src: video source
  insert(data) {
    this.currentVideo = $('.video-container > video')[0];
    this.video_attributes = data;
    this.currentVideo.currentTime = data.range.start;
    this.currentVideo.setAttribute('src', data.src);
    this.currentVideo.volume = 1;
    this.show();
    return this.start();
  }
  async start() {
    //made it into promise to have a callback when the video reaches the ending time
    //this check if the video reaches the ending time
    //one time only
    return new Promise((resolve, reject) => {
      $(this.currentVideo).on('timeupdate', () => {
        if (this.currentVideo.currentTime >= this.video_attributes.range.end) {
          $(this.currentVideo).off('timeupdate'); // remove the current listner
          resolve();
          this.currentVideo.pause();
          // update new listner
          $(this.currentVideo).on('timeupdate', () => {
            this.resetTimeUpdate();
          });
        }
      });
    });
  }
  show() {
    //show video if loaded
    $(this.currentVideo).on('loadeddata', () => {
      this.currentVideo.play();
      $(this.currentVideo).fadeIn(1000);
    });
  }
  isPlaying() {
    return new Promise((resolve, reject) => {
      $(this.currentVideo).on('loadeddata', () => {
        resolve();
      });
    });
  }
  remove() {
    $('video-container').remove();
  }
  pause() {
    this.currentVideo.pause();
  }
}

export class ScrollPaper {
  current_message_index = 0;
  OBJECT_KEYS = [];
  close_button;
  isClosed = true;
  constructor(prop) {
    this.OBJECT_KEYS = Object.keys(prop);
    this.PROPERTIES = prop;
  }

  add(data) {
    this.parentMessage = data['parent'];
    this.reset();
    this.change();
    //remove the scroll

    $(data['increase']).on('click', () => {
      let currentIndex = this.current_message_index + 1;

      if (currentIndex > this.OBJECT_KEYS.length - 1) {
        this.close();
        return;
      }
      this.current_message_index = Math.min(
        this.OBJECT_KEYS.length - 1,
        currentIndex
      );
      this.change();
    });
    $(data['decrease']).on('click', () => {
      let currentIndex = this.current_message_index - 1;
      if (currentIndex < 0) {
        this.close();
        return;
      }
      this.current_message_index = Math.max(0, currentIndex);
      this.change();
    });
    $(data['close']).on('click', () => {
      this.close();
    });
    this.isClosed = false;
  }
  change() {
    let key = this.OBJECT_KEYS[this.current_message_index];
    let data = this.PROPERTIES[key];
    let parent = this.parentMessage;
    parent.html('');
    parent.append($('<p></p>').text(data['title']));
    if (data['type'] == 'image') {
      parent.append($('<img></img>').attr('src', data['data']));
    } else {
      parent.append($('<p></p>').text(data['data']));
    }
    parent.append($('<p></p>').text(data['sender']));
  }
  isOpen() {
    return !this.isClosed;
  }
  close() {
    this.current_message_index = 0;
    this.isClosed = true;
    $('.scroll').trigger('closed');
    $('.scroll').remove();
  }
  reset() {
    this.current_message_index = 0;
    this.isClosed = true;
    $('.scroll').remove();
  }
  wait() {
    return new Promise((resolve, reject) => {
      $('.scroll').on('closed', () => {
        resolve();
      });
    });
  }
}

export class myEvents {
  events = {};

  add(customEvent) {
    this.events[customEvent.name] = {
      condition: customEvent.condition,
      callback: customEvent.callback,
    };
  }
  pending;
  Event_Status;
  EVENT_STATUS_ON_GOING = 1;
  EVENT_STATUS_OVER = 0;

  async checkForEvent() {
    if (this.Event_Status == this.EVENT_STATUS_ON_GOING) return;
    //check if the last event still triggering after its declared over
    //this means that the condition is still being met after its over
    //basically the sprite is stading of the triggering place
    if (
      this.Event_Status == this.EVENT_STATUS_OVER &&
      this.last_event != null &&
      this.last_event()
    ) {
      // console.log('Standing on top of the trigger');
      return;
    }

    this.last_event = null;
    //check for the conditions
    let keys = Object.keys(this.events);
    // console.log('finding triggers');

    //looking for events where the condition are met
    for (const event_name of keys) {
      let chosen_event = this.events[event_name];

      if (!chosen_event.condition()) continue;
      //change the status to on going
      //callback return when the events is over then set the status to done.
      this.Event_Status = this.EVENT_STATUS_ON_GOING;
      this.last_event = chosen_event.condition;
      chosen_event.callback().then(() => {
        this.Event_Status = this.EVENT_STATUS_OVER;
        // console.log('event`s done');
      });

      break;
    }
  }
}

export class Viewer {
  constructor() {
    this.animation = new animation();
  }
  async createBubbleView() {
    let starting_position = '-400px';
    let ending_position = '0px';

    //this will adjust the position where the bubble will move from starting y pos to ending pos
    //if there's a video above the div it will adjust the position of the y
    if ($('#controls').find('video')[0] == null) {
      starting_position = '0px';
      ending_position = '40vh';
    }

    let div = $('<div>').addClass('bubble-container');
    div.css({
      top: starting_position,
    });

    let promise = this.animation.animateBubbleView(div[0], ending_position);
    $('#controls').append(div);

    return promise;
  }
  createVideoView() {
    let div = $('<div>').addClass('video-container');
    var video = document.createElement('video');
    $(video);
    div.append(video);
    $('#controls').append(div);
  }
  createSingleLineText(text, css, loop) {
    let texts = text;
    let div = $('<div>').addClass('single-line').css(css);
    let p;
    texts.forEach((text) => {
      p = $('<p>').text(text);
      div.append(p);
    });
    $('#controls').append(div);

    this.animation.animateOneLine(p[0], loop);
    return;
  }

  createScrollView(Scroll) {
    //The container class name scroll
    let scroll = $('<div></div>').addClass('scroll');
    let container = $('<div></div>').addClass('message-container');
    scroll.append(container);
    let messages = $('<div></div>').addClass('messages');
    let buttons = $('<div></div>').addClass('buttons');
    let decrement = $('<button><</button>');
    let increment = $('<button>></button>');
    let close = $('<button>X</button>');
    scroll.append(close);
    buttons.append(decrement);
    buttons.append(increment);

    container.append(buttons);
    container.append(messages);
    Scroll.add({
      increase: increment,
      decrease: decrement,
      close: close,
      parent: messages,
    });

    $('#controls').append(scroll);
  }
  createMultiLineText(texts, css) {
    let div = $('<div>');
    div.addClass('multiline').css(css);

    texts.forEach((text) => {
      let p = $('<p>').text(text);
      div.append(p);
    });

    $('#controls').append(div);
    let targets = div[0].querySelectorAll('p');
    this.animation.animateMultiLine(targets);
  }
  clear() {
    $('#controls').html('');
  }
}

export class BubbleChat {
  isClosed = true;
  messages;
  currentIndex; // the index of the stack
  chunks = []; // cropted message
  text_element;
  timeOuts = [];
  canNext = false; // if the batch finshes we can next

  constructor(messages) {
    this.messages = messages;
  }

  write(text_message) {
    this.div = $('.bubble-container');

    this.isClosed = false; // make sure its open before setting it to open

    //creating the div messages
    let myName = $('<p>').text('ANIEL NA POGI').addClass('bubble-name');
    this.text_element = $('<p>').addClass('bubble-text');

    this.div.append(myName);
    this.div.append(this.text_element);

    this.chunk(text_message);
    this.canNext = true;
    this.next();
  }
  close() {
    //make sure the element exist
    this.text_element.parent().remove();
    this.isClosed = true;
  }
  //cut the messages by chunk to fit in the div
  chunk(message) {
    let limit = 250;
    this.chunks = message.match(new RegExp('.{1,' + limit + '}', 'g'));
  }
  //this will wait for the messages to be over
  wait() {
    return new Promise((resolve, reject) => {
      $(this.div).on('Done', () => {
        resolve();
      });
    });
  }
  // cancel all the typing
  // we can only call this if already start typing
  denyTyping() {
    for (const timeout of this.timeOuts) {
      clearTimeout(timeout);
    }
    //clear all the timeouts
    this.timeOuts = [];
    //change the state of canNext
    this.canNext = true;
    //insert whole text
    this.text_element[0].textContent = this.current_message_chunk;
  }

  next() {
    if (!this.canNext) {
      this.denyTyping();
      return;
    }
    //if there more chunks of text close it
    if (this.chunks.length == 0) {
      //close the thing
      this.div.trigger('Done'); //alert that the element is done tyiping
      this.close();
      return;
    }

    //get the current message chunk
    this.current_message_chunk = this.chunks.shift();

    let text_mess = this.current_message_chunk;
    this.text_element[0].textContent = '';
    text_mess = this.chunks.length == 0 ? text_mess : text_mess + '...';

    this.typeWriter(this.text_element[0], text_mess);
  }
  done() {
    return this.isClosed;
  }
  //make it
  typeWriter(element, text) {
    this.canNext = false;
    let speed = 50;
    let increment = 10; // how fast it will type
    let promises = [];
    this.timeOuts = [];
    //create timeouts two mimic the typing

    for (let index = 0; index < text.length; index++) {
      speed += increment;
      let timeout;
      let prom = new Promise((resolve, reject) => {
        if (this.canNext) resolve();
        timeout = setTimeout(() => {
          element.textContent += text.charAt(index);
          resolve();
        }, speed);
      });
      this.timeOuts.push(timeout);
      promises.push(prom);
    }

    //if done typing we can now next
    Promise.allSettled(promises).then(() => {
      this.canNext = true;
    });
  }
}
