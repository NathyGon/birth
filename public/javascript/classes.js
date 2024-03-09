class Media {
  file_name_list = [];
  current_playing;
  constructor(media) {
    this.audio_list = media.map((fileName) => {
      var snd = new Audio(fileName); // buffers automatically when created
      this.file_name_list.push(fileName);
      snd.loop = true;
      snd.volume = 0.7;
      return snd;
    });
    console.log(this.audio_list);
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
  constructor() {}
  insert(video, prop) {
    this.currentVideo = video;
    this.currentVideo.currentTime = prop.range.start;
    //if the current time reached
    //make the chat appear

    $(this.currentVideo).on('timeupdate', () => {
      if (this.currentVideo.currentTime >= prop.range.end) {
        this.currentVideo.pause();
        $(this.currentVideo).off('timeupdate');
        //generate bubble text
        //delete the video

        this.remove().then(() => {
          //wait for the video to get remove and proceed to the chat buble
          message.open();
        });
      }
    });
  }
  show() {
    this.currentVideo.play();
    $(this.currentVideo).fadeIn(2000);
  }
  remove() {
    return new Promise((resolve, reject) => {
      $(this.currentVideo).fadeOut(1000, () => {
        this.currentVideo.parentNode.remove();
        resolve();
      });
    });
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
  promises = [];
  canNext = false; // if the batch finshes we can next
  constructor(messages) {
    this.messages = messages;
  }

  async open(mess) {
    this.promises = [];
    this.isClosed = false;
    let stage_currentIndex = bg.getIndex() - 1; // minus 1 because first stage doesnt have message

    let div = await holder.addBubble();

    let myName = $('<p>').text('ANIEL NA POGI').css({
      'font-size': '1.3em',
      'font-family': 'bubbleblack',
      color: 'red',
    });
    this.text_element = $('<p>').css({
      'font-size': '1.3em',

      'font-family': 'bubble',
      margin: '10px 40px 0 40px',
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
    this.text_element.parent().remove();
    this.isClosed = true;
  }
  //add the text to the stack
  chunk(message) {
    let limit = 250;
    this.chunks = message.match(new RegExp('.{1,' + limit + '}', 'g'));
  }

  next() {
    if (!this.canNext) {
      return;
    }
    if (this.chunks.length == 0) {
      //close the thing
      this.close();
      return;
    }
    //if its not done printing all the text
    // we can make it much faster by setting

    this.message_chunk_current = this.chunks.shift();
    let text_mess = this.message_chunk_current;
    this.text_element[0].textContent = '';
    text_mess = this.chunks.length == 0 ? text_mess : text_mess + '...';
    //this is the last message

    this.typeWriter(this.text_element[0], text_mess);
  }
  done() {
    return this.isClosed;
  }
  do(scrollEvent) {
    Promise.allSettled(this.promises).then(() => {
      scrollEvent();
    });
  }

  typeWriter(element, text) {
    this.canNext = false;
    let speed = 50;
    let increment = 15;
    this.promises = [];
    for (let index = 0; index < text.length; index++) {
      speed += increment;
      let prom = new Promise((resolve, reject) => {
        setTimeout(() => {
          element.textContent += text.charAt(index);
          resolve();
        }, speed);
      });
      this.promises.push(prom);
    }
    //if all are fulfiled
    //then we can print the next one
    //if not we have to wait
    //we can only skip if the speech end
    Promise.allSettled(this.promises).then(() => {
      this.canNext = true;
    });
  }
}

//change this
class ScrollPaper {
  current_message_index = 0;
  constructor() {}
  OBJECT_KEYS = ['nathaniel', 'zucker'];
  PROPERTIES = {
    nathaniel: {
      text: 'sdfsdfasdfasdfasd',
      name: 'VonGela',
    },
    zucker: {
      text: ' sand odkfadshf naskdfhaksdjf ',
      name: 'hehehe hehehehehehe',
    },
  };

  add(increment, decrement, messageDiv) {
    this.parentMessage = messageDiv;
    this.remove();
    this.change();
    //remove the scroll

    $(increment).on('click', () => {
      let currentIndex = this.current_message_index + 1;
      if (currentIndex >= this.OBJECT_KEYS.length - 1) {
        this.remove();
        return;
      }
      this.current_message_index = Math.min(
        this.OBJECT_KEYS.length - 1,
        currentIndex
      );
      this.change();
    });
    $(decrement).on('click', () => {
      let currentIndex = this.current_message_index - 1;
      if (currentIndex < 0) {
        this.remove();
        return;
      }
      this.current_message_index = Math.max(0, currentIndex);
      this.change();
    });
  }
  change() {
    let key = this.OBJECT_KEYS[this.current_message_index];
    let data = this.PROPERTIES[key];
    let parent = this.parentMessage;
    parent.html('');
    parent.append($('<p></p>').text(data['name']));
    parent.append($('<p></p>').text(data['text']));
    parent.append($('<p></p>').text(key));
  }
  remove() {
    this.current_message_index = 0;
    $('.scroll').remove();
  }
}
css = {
  day: {
    margin: '20px 0 20px 0',
    'font-family': 'Kaph, sans-serif',
    'font-size': '5em',
    'text-align': 'center',
    'text-shadow': '8px 8px #CFAD6E , 8px 16px #94C11E, 8px 24px #396F24',
    color: '#D5D5D3',
  },
  halloween: {
    margin: '20px 0 20px 0',
    'font-family': 'Kaph, sans-serif',
    'font-size': '5em',
    'text-align': 'center',
    'text-shadow': '8px 8px #CE3E50 , 8px 16px #8F3755, 8px 24px #302047',
    color: '#FFA437',
  },
  night: {
    margin: '20px 0 20px 0',
    'font-family': 'Kaph, sans-serif',
    'font-size': '5em',
    'text-align': 'center',
    'text-shadow':
      '0px 0px 6px black ,8px 8px  black  , 8px 16px #004285, 8px 24px ',
    color: 'white',
  },
  christmas: {
    margin: '20px 0 20px 0',
    'font-family': 'Kaph, sans-serif',
    'font-size': '5em',
    'text-align': 'center',
    'text-shadow': '8px 8px  #509637  , 8px 16px #22659A, 8px 24px #D2F2FF',
    color: 'white',
  },
  birth: {
    margin: '20px 0 20px 0',
    'font-family': 'Kaph, sans-serif',
    'font-size': '5em',
    'text-align': 'center',
    'text-shadow': '8px 8px  white  , 8px 16px  #FB9CC3 , 8px 24px #633D5B',
    color: '#6D4130',
  },
};
