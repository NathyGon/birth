export default class Sprite {
  //sprite posstion
  x = 128;
  y = 0;
  //the size of the sprite
  width = 0;
  height = 0;
  //Image normal pixel size
  IMAGE_WIDTH = 128;
  IMAGE_HEIGHT = 128;

  height_offset = 10;

  Image_name = 'cat';
  audio_file = '/audio/cat.mp3';
  current_frame = 0;
  number_of_animation = 6 - 1;
  FRAME_SPEED = 20;
  accumulated_time = 0;

  speed = 5; //speed of how fast the sprite can move
  direction = 1; // left to right  -1 or 1
  //canvas size
  canvas_width = 0;
  canvas_height = 0;
  // stop the cat from moving
  stop = false;
  IN_MAIN_EVENT = false;

  scaling; // scalling of the sprite base on the canvas size

  BASE_HEIGHT = 720; // The size height where the size of the sprite is normal

  constructor(Image, canvas) {
    this.canvas = canvas;
    this.canvas_height = canvas.height;
    this.canvas_width = canvas.width;
    this.getImage(Image);
    this.changeAudio();
    this.calculateScalling();
    this.height_offset = this.height - 10;
  }
  resize() {
    // this.canvas_height = this.canvas.height;
    // this.canvas_width = this.canvas.width;
    // this.calculateScalling();
    // this.moveMiddle();
  }
  getImage(Image) {
    const object_keys = Object.keys(Image);
    let key = object_keys.find((key) => key.includes(this.Image_name));
    this.Image = Image[key][0];
  }
  changeAudio(audio_filename) {
    let current_audio_filename =
      audio_filename == null ? this.audio_file : audio_filename;
    this.setAudio(current_audio_filename);
  }
  setAudio(pathname) {
    this.audio = new Audio(pathname);
    this.audio.loop = true;
    this.audio.volume = 0.3;
  }
  calculateScalling() {
    this.scaling = this.canvas_height / this.BASE_HEIGHT; // scale differs on the screen
    this.scaling = Math.min(3, this.scaling); // Limit the scale for only 3 times
    this.height = this.width = this.IMAGE_HEIGHT * this.scaling; // scale the height and the width
    this.speed *= this.scaling; // also increase the speed base on the scalling
  }
  toggle() {
    this.IN_MAIN_EVENT = this.IN_MAIN_EVENT ? false : true;
  }
  startMove() {
    this.stop = false;
    this.IN_MAIN_EVENT = false;
  }

  draw() {
    var ctx = this.canvas.getContext('2d');
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
    this.meow(false);
    this.stop = true;
  }
  isInEvent() {
    return this.IN_MAIN_EVENT;
  }
  animate(ctx) {
    //this is the priority event
    //if any of this condition true
    //it means that the sprite is on main event
    if (!this.stop && !this.IN_MAIN_EVENT) {
      this.accumulated_time += 5;
      if (this.accumulated_time >= this.FRAME_SPEED) {
        this.accumulated_time = 0;
        this.current_frame++;
      }
    }

    this.current_frame =
      this.current_frame == this.number_of_animation ? 0 : this.current_frame;

    let sx = this.current_frame * this.IMAGE_WIDTH;
    let sy = 0;
    let y = this.canvas_height - this.height_offset;

    let getImageFrame = this.getFrame(sx, sy, this.direction);
    ctx.drawImage(getImageFrame, this.x, y);
  }
  meow(play) {
    play ? this.audio.play() : this.audio.pause();
  }

  move() {
    if (this.stop || this.IN_MAIN_EVENT) return;
    this.meow(true);
    this.x = this.x + this.speed * this.direction;
  }

  getFrame(sx, sy, direction) {
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
      this.IMAGE_WIDTH,
      this.IMAGE_HEIGHT,
      0,
      0,
      this.width,
      this.height
    );
    return tempCanvas;
  }
  setDirection(updated_dir) {
    this.stop = false;
    this.direction = updated_dir;
  }
  getDirection() {
    return this.direction;
  }
}
