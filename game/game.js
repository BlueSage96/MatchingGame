/*
Resources: 
DT Study: 

Malath Kamaluldeen kamam049@newschool.edu

Elena Peng

Daniel Navarez

orig repo:
https://github.com/miriamtocino/p5-js-memory-game

Global Variable Error:
https://stackoverflow.com/questions/40091136/cant-create-duplicate-variable-that-shadows-a-global-property


array of ids 
*/

var scene = 0;
var switchScene = false;
var whoGif;

var tiles = [];

var numRows = 2;
var numColumns = 4;

var faceDownImage;
var faceUpImages;

var imagesDeck = [];
var flippedTiles = [];

var delayStartFC = null;

var numTries = 0;
var chosenPairs = [];
var loopCount = 4;

class Tile {
  constructor(x, y, faceUpImage) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.faceDownImage = faceDownImage;
    this.faceUpImage = faceUpImage;
    this.isFaceUp = false;
    this.isMatch = false;
    this.id;
  }

  render() {
    fill(0,0,255);
    stroke(255);
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.width, 20);

    if (this.isFaceUp === true) {
      if(typeof this.faceUpImage == 'string'){
        fill(0);
        text(this.faceUpImage,this.x, this.y, this.width, this.width);
        this.id = this.faceUpImage;
      }else if(typeof this.faceUpImage == 'object'){
        image(this.faceUpImage.path, this.x, this.y, this.width, this.width);
        this.id = this.faceUpImage.id;
      }
    }
  }
  setIsFaceUp(isFaceUp) {
    this.isFaceUp = isFaceUp;
  }

  isUnderMouse(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
      y >= this.y && y <= this.y + this.width;
  }
  
  //checkMatch(other){
  //  if(other.id == this.id){
    
  //  }
  //}
}

// Game functions
// --------------------------
function createTiles() {
  for (var i = 0; i < numColumns; i++) {
    for (var j = 0; j < numRows; j++) {
      tiles.push(new Tile(i * 480 + 20, j * 480 + 80, imagesDeck.pop()));
    }
  }
}

function createShadows() {
  for (var i = 0; i < numColumns; i++) {
    for (var j = 0; j < numRows; j++) {
      strokeWeight(0);
      fill(255, 0, 0);
      rect(i * 480 + 30, j * 480 + 50, 400, 400, 20);
    }
  }
}

function updateGameLogic() {
  if (delayStartFC && (frameCount - delayStartFC) > 30) {
    for (var i = 0; i < tiles.length; i++) {
      if (!tiles[i].isMatch && tiles[i].isFaceUp) {
        tiles[i].setIsFaceUp(false);
      }
    }
    flippedTiles = [];
    delayStartFC = null;
  }
}

function createImagesDeck(images) {
  for (var i = 0; i < loopCount; i++) {
    //pull random number from 1 - 15 from deck push random number
    var shuffleCards = Math.floor(random(0,imagesDeck.length));
    //if pair's not included get the text & image and add it to the array
    //keep looping until we have 4 different pairs
    if(!chosenPairs.includes(shuffleCards)){
      imagesDeck.push(images[shuffleCards].img);
      imagesDeck.push(images[shuffleCards].textName);
      chosenPairs.push(shuffleCards);
    }
    else{
      loopCount++;
    }
  }

  imagesDeck.sort(function() {
    return 0.5 - random();
  });
}

function drawScoringMessage() {
  let foundAllMatches = true;

  for (let i = 0; i < tiles.length; i++) {
    foundAllMatches = foundAllMatches && tiles[i].isMatch;
  }

  if (foundAllMatches) {
    end();
  }
}

function preload(){
  whoGif = createImg("assets/rhoa.gif", "Who said that?");
  faceDownImage = loadImage("../assets/faceDownImage.jpg");
}

function loadFaceUpImages() {
  faceUpImages = [
    {
    textName: "Activision", 
     img: {
       path:loadImage("assets/activision.jpg"),
       id: "Activision"
      }
    },
    
    {
    textName: "Amazon", 
     img: {
       path:loadImage("assets/amazon.jpg"),
       id: "Amazon"
      }
    },
  
     {
    textName: "Apple", 
     img: {
       path:loadImage("assets/apple.jpg"),
       id: "Apple"
      }
    },
    
      {
    textName: "Disney", 
     img: {
       path:loadImage("assets/disney.jpg"),
       id: "Disney"
      }
    },
    
     {
    textName: "EA", 
     img: {
       path:loadImage("assets/ea.jpg"),
       id: "EA"
      }
    },
    
     {
    textName: "Github", 
     img: {
       path:loadImage("assets/github.jpg"),
       id: "Github"
      }
    },

     {
    textName: "IBM", 
     img: {
       path:loadImage("assets/ibm.jpg"),
       id: "IBM"
      }
    },
    
     {
    textName: "Intel", 
     img: {
       path:loadImage("assets/intel.jpg"),
       id: "Intel"
      }
    },
    
     {
    textName: "Microsoft", 
     img: {
       path:loadImage("assets/microsoft.jpg"),
       id: "Microsoft"
      }
    },
    
     {
    textName: "Netflix", 
     img: {
       path:loadImage("assets/netflix.jpg"),
       id: "Netflix"
      }
    },
    
     {
    textName: "Robinhood", 
     img: {
       path:loadImage("assets/robinhood.jpg"),
       id: "Robinhood"
      }
    },
    
     {
    textName: "Sony", 
     img: {
       path:loadImage("assets/sony.jpg"),
       id: "Sony"
      }
    },
    
     {
    textName: "Twitter", 
     img: {
       path:loadImage("assets/twitter.jpg"),
       id: "Twitter"
      }
    },
    
     {
    textName: "YouTube", 
     img: {
       path:loadImage("assets/youtube.jpg"),
       id: "YouTube"
      }
    },
     {
    textName: "Zoom", 
     img: {
       path:loadImage("assets/zoom.jpg"),
       id: "Zoom"
      }
    }
  ];
}

function setup(){
  createCanvas(2000,1600);
  textSize(30);
  loadFaceUpImages();
  createImagesDeck(faceUpImages);
  createTiles();
  createShadows();
}

function draw(){
  switch(scene){
    case 1:
      whoGif.hide();
      game();
      break;
    case 2:
      end();
      break;
    default:
      whoGif.show();
      title();
      break;
  }
}

function keyPressed(){
  if(keyCode == RETURN){
    switchScene = true;
    scene++;
  }
}

function title(){
  background(255);
  fill(0);
  textSize(60);
  text("Who said that?",700,100);
  whoGif.position(500,120);
  whoGif.size(1000,750);
  text("Press enter to start game",600,950);
}

function game(){
  clear();
  background(210,180,140);
  //fill(255);
  
  updateGameLogic();
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].render();
  }
  
  drawScoringMessage();
}

function end(){
  background(210,180,140);
  fill(0);
  text("You found them all in " + numTries + " tries", 500, 100);
  text("Press enter to play again",500,200);
}

function mouseClicked() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].isUnderMouse(mouseX, mouseY)) {
      if (flippedTiles.length < 2 && !tiles[i].isFaceUp) {
        tiles[i].setIsFaceUp(true);
        flippedTiles.push(tiles[i]);
        if (flippedTiles.length === 2) {
          numTries++;
          if (flippedTiles[0].id === flippedTiles[1].id) {
            flippedTiles[0].isMatch = true;
            flippedTiles[1].isMatch = true;
          }
          delayStartFC = frameCount;
        }
      }
    }
  }
}
