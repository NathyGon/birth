class Media {
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
class Video {
  currentVideo;
  prop;
  constructor() {}
  loop() {
    if (this.currentVideo.currentTime >= this.prop.range.end) {
      this.currentVideo.currentTime = this.prop.range.start;
    }
  }
  insert(video, prop) {
    this.currentVideo = video;
    this.prop = prop;
    this.currentVideo.currentTime = prop.range.start;
    //if the current time reached
    //make the chat appear

    $(this.currentVideo).on('timeupdate', () => {
      //prompt the message once
      if (this.currentVideo.currentTime >= prop.range.end) {
        $(this.currentVideo).off('timeupdate'); // remove the current listner
        message.open(); // open the message
        this.currentVideo.pause();
        // update new listner
        $(this.currentVideo).on('timeupdate', () => {
          this.loop();
        });
      }
    });
  }
  show() {
    //show video if loaded
    $(this.currentVideo).on('loadeddata', () => {
      this.currentVideo.play();
      // cat.toggle();
      $(this.currentVideo).fadeIn(1000);
    });
  }
  remove() {
    this.currentVideo.parentNode.remove();
  }
  pause() {
    this.currentVideo.pause();
  }
}

class BubbleChat {
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

  async open(mess, prop) {
    let stage_currentIndex = bg.getIndex() - 1; // minus 1 because first stage doesnt have message

    let div = await holder.addBubble(prop);
    this.isClosed = false; // make sure its open before setting it to open
    let myName = $('<p>').text('ANIEL NA POGI').css({
      'font-size': '3.4vh',
      'font-family': 'bubbleblack',
      color: 'red',
    });
    this.text_element = $('<p>').css({
      'font-size': '3vh',

      'font-family': 'bubble',
      margin: '10px 3vh 0 3vh',
      'word-wrap': 'Break-word',
    });

    div.append(myName);
    div.append(this.text_element);
    let myText = mess != null ? mess : this.messages[stage_currentIndex];
    this.chunk(myText);
    this.canNext = true;
    this.next();
  }
  close() {
    //make sure the element exist

    this.text_element.parent().remove();
    this.isClosed = true;
  }
  //add the text to the stack
  chunk(message) {
    let limit = 250;
    this.chunks = message.match(new RegExp('.{1,' + limit + '}', 'g'));
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
      this.close();
      cat.startMove();
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
    let increment = 20; // how fast it will type
    let promises = [];
    this.timeOuts = [];
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

//change this
class ScrollPaper {
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
    this.remove();
    this.change();
    //remove the scroll

    $(data['increase']).on('click', () => {
      let currentIndex = this.current_message_index + 1;

      if (currentIndex > this.OBJECT_KEYS.length - 1) {
        this.remove();
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
        this.remove();
        return;
      }
      this.current_message_index = Math.max(0, currentIndex);
      this.change();
    });
    $(data['close']).on('click', () => {
      this.remove();
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
  remove() {
    this.current_message_index = 0;
    this.isClosed = true;
    $('.scroll').remove();
  }
}
css = {
  day: {
    'font-family': 'Kaph, sans-serif',
    'font-size': '10vh',
    'text-align': 'center',
    'text-shadow': '0.8vh 1vh #94C11E ,  0.8vh 2vh #CFAD6E, 0.8vh 3vh #D5D5D3',
    '-webkit-text-stroke': '2px black',
    color: '#396F24',
  },
  halloween: {
    'font-family': 'Kaph, sans-serif',
    'font-size': '10vh',
    'text-align': 'center',
    'text-shadow':
      '0.8vh 1vh #CE3E50 ,   0.8vh 2vh #8F3755,  0.8vh 3vh #302047',
    color: '#FFA437',
    '-webkit-text-stroke': '2px black',
  },
  night: {
    'font-family': 'Kaph, sans-serif',
    'font-size': '10vh',
    'text-align': 'center',
    'text-shadow':
      '0px 0px 6px black ,0.8vh 1vh  black  ,   0.8vh 2vh #004285,  0.8vh 3vh white ',
    color: 'white',
    '-webkit-text-stroke': '2px black',
  },
  christmas: {
    'font-family': 'Kaph, sans-serif',
    'font-size': '10vh',
    'text-align': 'center',
    'text-shadow':
      '0.8vh 1vh  #509637  ,   0.8vh 2vh #22659A,  0.8vh 3vh #D2F2FF',
    color: 'white',
    '-webkit-text-stroke': '2px black',
  },
  birth: {
    'font-family': 'Kaph, sans-serif',
    'font-size': '10vh',
    'text-align': 'center',
    'text-shadow':
      '0.8vh 1vh  white  ,   0.8vh 2vh  #FB9CC3 ,  0.8vh 3vh #633D5B',
    color: '#6D4130',
    '-webkit-text-stroke': '2px black',
  },
};
