class background {
  x = 0; // x positino in the canvax
  y = 0; // y

  image_sequence_name = [
    'day',
    'day',
    'night',
    'day',
    'halloween',
    'christmas',
    'day',
    'night',
    'birth',
  ];
  image_sequence = [];
  current_background = 0;
  constructor(Images) {
    this.Images = Images;
    this.setImageNames(Images);
  }

  draw(canvas) {
    let chosen_image = this.image_sequence[this.current_background];
    var ctx = canvas.getContext('2d');
    ctx.drawImage(chosen_image, 0, 0, 1280, 720);
  }
  setImageNames(Images) {
    let image_names = Object.keys(Images);
    this.image_sequence = this.image_sequence_name.map((image_name) => {
      let found_image = image_names.find((e) => e.includes(image_name));
      return Images[found_image][0];
    });
  }
  changeBg(sprite, canvas) {
    //move background to right
    if (sprite.x >= canvas.width) {
      this.current_background = Math.min(
        this.image_sequence_name.length - 1,
        this.current_background + 1
      );
      sprite.moveFront();
    } else if (sprite.x + sprite.width <= 0) {
      this.current_background = Math.max(0, this.current_background - 1);
      sprite.moveBack();
    }
  }
  getName() {
    return this.image_sequence_name[this.current_background];
  }
  getIndex() {
    return this.current_background;
  }
}
