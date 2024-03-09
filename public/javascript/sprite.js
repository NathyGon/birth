class Sprite {
  x = 1000;
  width = 128;
  height = 128;
  height_offset = 10;
  y = 0;
  Image_name = 'cat';
  audio_file = '/audio/cat.wav';
  current_frame = 0;
  number_of_animation = 6 - 1;
  speed = 3; //3
  direction = 1;
  canvas_width = 0;
  canvas_height = 0;
  stop = false;
  IN_MAIN_EVENT = false;

  FRAME_SPEED = 20;

  accumulated_time = 0;

  constructor(Image, width, height) {
    this.canvas_height = height;
    this.canvas_width = width;
    const object_keys = Object.keys(Image);

    let key = object_keys.find((key) => key.includes(this.Image_name));
    this.Image = Image[key][0];
    this.audio = new Audio(this.audio_file);
    this.audio.loop = true;
    this.audio.volume = 0.1;
  }
  toggle() {
    this.IN_MAIN_EVENT = this.IN_MAIN_EVENT ? false : true;
  }

  draw(canvas) {
    var ctx = canvas.getContext('2d');
    this.animate(ctx, this.Image);
  }
  moveFront() {
    this.x = -this.width / 2;
  }
  moveBack() {
    this.x = this.canvas_width - this.width / 2;
  }
  moveMiddle() {
    this.x = (this.canvas_width - this.width) / 2;
  }
  stopMove() {
    this.audio.pause();
    this.stop = true;
  }
  animate(ctx) {
    if (!this.stop && !this.IN_MAIN_EVENT) {
      this.accumulated_time += 5;
      if (this.accumulated_time >= this.FRAME_SPEED) {
        this.accumulated_time = 0;
        this.current_frame++;
      }
    }

    this.current_frame =
      this.current_frame == this.number_of_animation ? 0 : this.current_frame;

    let sx = this.current_frame * this.width;
    let sy = 0;
    let y = canvas.height - this.height + this.height_offset;

    let getImageFrame = this.walk(sx, sy, this.direction);
    ctx.drawImage(getImageFrame, this.x, y);
  }

  move() {
    if (this.stop || this.IN_MAIN_EVENT) return;
    this.audio.play();
    this.x = this.x + this.speed * this.direction;
  }

  walk(sx, sy, direction) {
    // Create a temporary canvas
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.width;
    tempCanvas.height = this.height;
    var tempCtx = tempCanvas.getContext('2d');

    // Clear the temporary canvas
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Flip the image on the temporary canvas
    tempCtx.save();
    if (direction == -1) {
      tempCtx.translate(this.width, 0); // move the origin to the top right corner
      tempCtx.scale(-1, 1); // flip the canvas horizontally
    }

    tempCtx.drawImage(
      this.Image,
      sx,
      sy,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );
    tempCtx.restore();

    return tempCanvas;
  }
  setDirection(updated_dir) {
    this.stop = false;
    this.direction = updated_dir;
  }
}
