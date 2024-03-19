import textStyle from './textStyle.js';
import Balloon from './balloons.js';

export function createStages(Classes) {
  let Cat = Classes.Cat;
  let MessageHandler = Classes.Bubble;
  let SoundHandler = Classes.Sound;
  let ScrollPaper = Classes.Scroll;
  let Stages = Classes.Stages;
  let VideoHandler = Classes.Video;
  let ContainerHandler = Classes.Container;
  let balloons = new Balloon();

  let EventList = [];
  //this is the front page
  const firstEvent = () => {
    balloons.removeBalloons();
    SoundHandler.playAudio(Stages.getName());
    let texts = ['Disney Princess', 'Before the', '23rd'];
    ContainerHandler.createMultiLineText(texts, textStyle.first);
    ContainerHandler.createSingleLineText(
      ['<- Move to start -> '],
      textStyle.small
    );
    Cat.moveMiddle();
    Cat.stopMove();
  };

  EventList.push({ name: 0, callback: firstEvent });
  //next events are the middle of the stages
  let Stage_names = STAGES_DETAILS.Stage_Name;

  let Middle_Events = Stage_names.map((StageName, Index) => {
    let css_name = STAGES_DETAILS.CSS_NAME[Index];
    let message = STAGES_DETAILS.MESSAGES[Index];
    let callback = () => {
      balloons.removeBalloons();
      SoundHandler.playAudio(Stages.getName());
      ContainerHandler.clear();
      Cat.toggle();
      let css = textStyle[css_name];
      ContainerHandler.createSingleLineText([StageName], css, false);
      ContainerHandler.createVideoView();
      //start the view
      let video_prop = {
        range: STAGES_DETAILS.VIDEO_STAMPS[Index],
        src: './video/meme.mp4',
      };
      //this return promise, promise when the video end
      VideoHandler.insert(video_prop)
        //create a bubble message
        .then(async () => {
          Cat.toggle(); //stop the cat from moving
          await ContainerHandler.createBubbleView();
          MessageHandler.write(message);
          return MessageHandler.wait(); // this will wait for the bubble div to close
        })
        .then(() => {
          Cat.toggle(); // we can let the cat move after its done
        });

      VideoHandler.isPlaying().then(() => {
        Cat.toggle(); // let the cat move if the video is playing
      });
    };
    return { name: Index + 1, callback: callback };
  });

  EventList = [...EventList, ...Middle_Events];

  const lastEvent = async () => {
    balloons.removeBalloons();
    ContainerHandler.clear();
    Cat.toggle();
    SoundHandler.pauseAll();
    //let the ballons float
    //the screen turns black for 3 seconds
    let blackout_milisec = 2000;
    $('#balloon-container').css({ 'z-index': 10, background: 'black' });
    await new Promise((resolve, reject) => {
      //wait for 3 seconds
      setTimeout(() => {
        $('#balloon-container').fadeOut(2000, () => {
          $('#balloon-container').css({
            'z-index': 1,
            background: 'none',
            display: 'flex',
          });
          resolve();
        });
      }, blackout_milisec);
    });

    SoundHandler.playAudio('birth');
    balloons.createBalloons(50);

    ContainerHandler.createSingleLineText(
      ['HAPPY BIRTHDAY VON'],
      textStyle['birth'],
      false
    );

    await ContainerHandler.createBubbleView();

    MessageHandler.write(bdayMessage);
    await MessageHandler.wait();

    Cat.toggle();
  };
  EventList.push({ name: EventList.length, callback: lastEvent });
  return EventList;
}

export function createCustomEvent(Classes) {
  let Cat = Classes.Cat;
  let SoundHandler = Classes.Sound;
  let ScrollPaper = Classes.Scroll;
  let Stages = Classes.Stages;
  let VideoHandler = Classes.Video;
  let ContainerHandler = Classes.Container;
  let EVENT_NAME = 'scroll';
  let condition = (current_event) => {
    let trigger_width = 40;
    let trigger_x = $('#canvas').width() / 2;
    //this will fire if the cat is not yet fire the opening event
    if (
      Cat.x < trigger_width + trigger_x &&
      Cat.x + Cat.width > trigger_x &&
      Stages.getName() == 'birth'
    )
      return true;
    //the event will not fire but its firing because its in the posiution of trigeering
    // else if (
    //   Cat.x < trigger_width + trigger_x &&
    //   Cat.x + Cat.width > trigger_x &&
    //   Stages.getName() == 'birth' &&
    //   current_event == EVENT_NAME
    // ) {
    //   return false;
    // } else {
    //   //not in the position to fire
    //   return;
    // }
  };

  let callback = async () => {
    Cat.toggle(); //stop cat from moving
    ContainerHandler.createScrollView(ScrollPaper);

    return new Promise(async (resolve, reject) => {
      await ScrollPaper.wait();
      Cat.toggle();
      resolve();
    });
  };
  return { name: EVENT_NAME, condition: condition, callback: callback };
}

$(window).on('load', () => {
  //classes declaration
  // resize canvas widht and height
});

$(window).on('load', () => {
  //make sure the user interacted with the page
  //to prevent errors
});
