import anime from '/javascript/anime.es.js';

export default function animation() {
  this.ANIMATION_BUBBLE = 1;
  this.ANIMATION_SINGLE_LINE_TEXT = 2;

  this.animateBubbleView = async (target, end_position) => {
    return new Promise((res, rej) => {
      anime({
        targets: target,
        width: '70%', // -> from '28px' to '100%',
        top: end_position,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false,
        duration: 1000,
        complete: () => res(),
      });
    });
  };

  this.animateMultiLine = (targets) => {
    let animation_prop = {
      targets: targets,
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
    anime(animation_prop);
  };

  this.animateOneLine = (target, loop) => {
    loop = loop ? loop : false;
    target.innerHTML = target.textContent.replace(
      /\S/g,
      '<span class = "letters">$&</span>'
    );
    let letters = target.querySelectorAll('span');
    $(letters).css('display', 'inline-block').css('position', 'relative');

    let animation_prop = {
      targets: letters,
      loop: loop,
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 2000,
      delay: (el, i) => 100 * i,
    };
    anime(animation_prop);
  };
}
