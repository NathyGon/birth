export default class Stages {
  //
  STAGES_SEQUENCE = [
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

  background_paths = [];
  current_path_index = 0;
  constructor(Images) {
    this.Images = Images;
    this.setImageNames(Images);
  }

  drawBackground(canvas) {
    let chosen_image = this.background_paths[this.current_path_index];
    var ctx = canvas.getContext('2d');
    ctx.drawImage(chosen_image, 0, 0, canvas.width, canvas.height);
  }
  setImageNames(Images) {
    let image_names = Object.keys(Images);
    this.background_paths = this.STAGES_SEQUENCE.map((image_name) => {
      let found_image = image_names.find((e) => e.includes(image_name));
      return Images[found_image][0];
    });
  }

  listen(sprite, canvas) {
    //move background to right
    if (sprite.x >= canvas.width) {
      this.current_path_index = Math.min(
        this.STAGES_SEQUENCE.length - 1,
        this.current_path_index + 1
      );
      sprite.moveFront();
    } else if (sprite.x + sprite.width <= 0) {
      this.current_path_index = Math.max(0, this.current_path_index - 1);
      sprite.moveBack();
    }

    this.update();
  }
  Stages = {};
  add(stages) {
    stages.forEach((stage) => {
      this.Stages[stage.name] = stage.callback;
    });
  }
  prev_stage;
  update() {
    let current_stage = this.current_path_index;

    if (
      this.Stages[current_stage] == undefined ||
      current_stage == this.prev_stage
    )
      return;
    this.prev_stage = current_stage;

    this.Stages[current_stage]();
  }

  getName() {
    return this.STAGES_SEQUENCE[this.current_path_index];
  }
  getIndex() {
    return this.current_path_index;
  }
}
