let myFont;
let fire,
  anglerFish,
  bush,
  pod,
  arrow,
  branch,
  half,
  mush,
  smleaf,
  smush,
  weird,
  leaf;
let fishX = 600;
let fishY = 700;
let okButton;
let secretButton;
let showThing = false;
let stuffInd = -1;

let stuff = [
  "v v leisurely bike ride",
  "annoying socialist bro crush",
  "duff grove fire from scraps",
  "almost made it to the dance party but didn't",
  "oversharing no regerts",
  "libra season",
  "mandatory covid breakup from being too intense duh",
];

let phoneCoords = [];
let view = "instructions";

function preload() {
  myFont = loadFont("assets/VT323.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  leaf = loadImage("assets/transparent-leaf.png");
  fire = loadImage("assets/t-fire.png");
  anglerFish = loadImage("assets/fish.png");
  bush = loadImage("assets/bush.png");
  pod = loadImage("assets/sm-pod.png");
  arrow = loadImage("assets/t-arrow.png");
  branch = loadImage("assets/t-branch.png");
  half = loadImage("assets/t-half.png");
  mush = loadImage("assets/t-mush.png");
  smleaf = loadImage("assets/t-smleaf.png");
  smush = loadImage("assets/t-smush.png");
  weird = loadImage("assets/t-weird.png");
  phone = loadImage("assets/phone.png");

  for (let i = 0; i < stuff.length; i++) {
    const xSide = random(["left", "right"]);
    const ySide = random(["up", "down"]);

    const xLower = xSide === "left" ? 0 : windowWidth / 2 + 200;
    const xHigher = xSide === "left" ? windowWidth / 2 - 200 : windowWidth - 50;
    const yLower = ySide === "up" ? 0 : windowHeight / 2 + 100;
    const yHigher = ySide === "up" ? windowHeight / 2 - 100 : windowHeight - 50;
    const phoneX = random(xLower, xHigher);
    const phoneY = random(yLower, yHigher);
    phoneCoords.push({ x: phoneX, y: phoneY });
  }
  textFont(myFont);
  textSize(48);
  okButton = createButton("ok");
  okButton.position(200, 570);
  okButton.mousePressed(() => {
    view = "play";
    okButton.hide();
  });
  secretButton = createButton("yes?");
  secretButton.position(200, 570);
  secretButton.mousePressed(() => {
    view = "note";
    secretButton.hide();
  });
  secretButton.hide();
}

function draw() {
  if (view === "note") {
    background(220);
    push();
    translate(-300, -300);
    text(
      "happy birthday tina! I hope you had an amazing day filled with many-a-surprise. I cherish our slightly unlikely odd sweet chill friendship and am so happy we met. hope you enjoyed this silly game. here's to many more silly and tender days! -sarah",
      windowWidth / 2,
      windowHeight / 2,
      600,
      600
    );
    pop();

    push();
    translate(-75, -85);
    image(anglerFish, fishX, fishY, 150, 175);
    pop();
  } else {
    background("#c9e3d1");
    image(fire, width / 2 - 150, height / 2 - 162, 300, 325);
    push();
    translate(-75, -85);
    image(anglerFish, fishX, fishY, 150, 175);
    pop();

    image(bush, -50, -50);
    image(mush, 200, 100);
    image(mush, 300, 100);
    image(mush, 400, 100);
    image(mush, 500, 100);

    image(arrow, windowWidth - 200, 300);
    image(branch, windowWidth - 200, 500);
    image(branch, windowWidth - 250, 550);
    image(bush, windowWidth - 300, windowHeight - 200);
    image(bush, windowWidth - 300, windowHeight - 400);

    image(half, 50, windowHeight - 400);
    image(mush, windowWidth - 100, 650);
    image(mush, windowWidth - 200, 650);
    image(mush, windowWidth - 300, 650);
    image(mush, windowWidth - 400, 650);

    image(smush, windowWidth - 100, windowHeight - 200);
    image(smush, windowWidth - 200, windowHeight - 200);
    image(smush, windowWidth - 300, windowHeight - 200);
    image(smush, windowWidth - 400, windowHeight - 200);
    image(smleaf, 0, windowHeight - 200);
    image(smleaf, windowWidth - 300, 200);
    image(pod, windowWidth - 100, 200);

    image(smush, windowWidth - 100, windowHeight - 200);
    image(weird, windowWidth - 400, 0);

    image(bush, -300, windowHeight - 300);
    push();
    scale(-1, 1);
    translate(-400, 0);
    image(weird, 50, windowHeight / 2);
    pop();

    for (let i = 0; i < phoneCoords.length; i++) {
      const { x, y } = phoneCoords[i];
      image(phone, x, y);
    }

    if (view === "instructions") {
      push();
      fill(255);
      rect(85, 185, 410, 465);
      pop();
      text(
        "help slutty safe anglerfish collect all the phones to appease tina the tinder god. wasd to move, enter to pick up.",
        100,
        200,
        400,
        500
      );
    }
    if (view === "complete") {
      push();
      fill(255);
      rect(85, 185, 410, 465);
      pop();
      text(
        "good job you did it :^) want to read the secret msg? uwu",
        100,
        200,
        400,
        500
      );
    }

    if (showThing) {
      text(
        stuff[stuffInd],
        windowWidth / 2 - 160,
        windowHeight / 2 + 200,
        400,
        300
      );
    }
  }

  if (keyIsDown(65)) {
    fishX -= 5;
  }

  if (keyIsDown(68)) {
    fishX += 5;
  }

  if (keyIsDown(87)) {
    fishY -= 5;
  }

  if (keyIsDown(83)) {
    fishY += 5;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    for (let i = 0; i < phoneCoords.length; i++) {
      const { x, y } = phoneCoords[i];
      if (Math.abs(x - fishX) < 100 && Math.abs(y - fishY) < 100) {
        const first = phoneCoords.slice(0, i);
        const second = phoneCoords.slice(i + 1, phoneCoords.length);
        phoneCoords = first.concat(second);
        showThing = true;
        stuffInd += 1;

        if (phoneCoords.length === 0) {
          view = "complete";
          secretButton.show();
        }
        break;
      }
    }
  }
}
