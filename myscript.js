/**Object that holds all the information for tiles */
var tiles =  [
	{"letter":"A", "value":1,  "amount":9, "image" : "img/letter/Scrabble_Tile_A.jpg"},
	{"letter":"B", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_B.jpg"},
	{"letter":"C", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_C.jpg"},
	{"letter":"D", "value":2,  "amount":4, "image" : "img/letter/Scrabble_Tile_D.jpg"},
	{"letter":"E", "value":1,  "amount":12, "image" : "img/letter/Scrabble_Tile_E.jpg"},
	{"letter":"F", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_F.jpg"},
	{"letter":"G", "value":2,  "amount":3, "image" : "img/letter/Scrabble_Tile_G.jpg"},
	{"letter":"H", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_H.jpg"},
	{"letter":"I", "value":1,  "amount":9, "image" : "img/letter/Scrabble_Tile_I.jpg"},
	{"letter":"J", "value":8,  "amount":1, "image" : "img/letter/Scrabble_Tile_J.jpg"},
	{"letter":"K", "value":5,  "amount":1, "image" : "img/letter/Scrabble_Tile_K.jpg"},
	{"letter":"L", "value":1,  "amount":4, "image" : "img/letter/Scrabble_Tile_L.jpg"},
	{"letter":"M", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_M.jpg"},
	{"letter":"N", "value":1,  "amount":6, "image" : "img/letter/Scrabble_Tile_N.jpg"},
	{"letter":"O", "value":1,  "amount":8, "image" : "img/letter/Scrabble_Tile_O.jpg"},
	{"letter":"P", "value":3,  "amount":2, "image" : "img/letter/Scrabble_Tile_P.jpg"},
	{"letter":"Q", "value":10, "amount":1, "image" : "img/letter/Scrabble_Tile_Q.jpg"},
	{"letter":"R", "value":1,  "amount":6, "image" : "img/letter/Scrabble_Tile_R.jpg"},
	{"letter":"S", "value":1,  "amount":4, "image" : "img/letter/Scrabble_Tile_S.jpg"},
	{"letter":"T", "value":1,  "amount":6, "image" : "img/letter/Scrabble_Tile_T.jpg"},
	{"letter":"U", "value":1,  "amount":4, "image" : "img/letter/Scrabble_Tile_U.jpg"},
	{"letter":"V", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_V.jpg"},
	{"letter":"W", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_W.jpg"},
	{"letter":"X", "value":8,  "amount":1, "image" : "img/letter/Scrabble_Tile_X.jpg"},
	{"letter":"Y", "value":4,  "amount":2, "image" : "img/letter/Scrabble_Tile_Y.jpg"},
	{"letter":"Z", "value":10, "amount":1, "image" : "img/letter/Scrabble_Tile_Z.jpg"},
	{"letter":"Blank", "value":0,  "amount":2, "image" : "img/letter/Scrabble_Tile_Blank.jpg"}
]

/**Object that holds board itself while being in a array */

var board = [
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "doubleW","letterMultiplier": 1, "wordMultiplier": 2, "image": "img/tiles/double_word.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "blank", "letterMultiplier": 1, "wordMultiplier": 1, "image": "img/tiles/blank.png"},
    { "type": "doubleL", "letterMultiplier": 1, "wordMultiplier": 2, "image": "img/tiles/double_letter.png"},

]
//Tracks high score
var highestScore = 0;

//Global array for insering letters
letterArray = [];


//main function that runs the functions
$(document).ready(function(){

    boardImage();
    restart();
    
 });




//Function that prints out image of the letter tile and creats a img tab in HTML with and ID of the letter
function letterImage(){
    $("#rack").empty();
    for(let i = 0; i < 7; ++i){
        const randIndex = Math.floor(Math.random() * 27);
        $("#rack").append("<img id = 'letter" + i + "' class = 'letterTile' letter = '" + tiles[randIndex].letter + "' src = '" + tiles[randIndex].image + "' />");
    }
}

//Function that prints out a set board that has also sets the index of each board tile that was placed
function boardImage(){
    for(let i = 0; i < 7; ++i){
        $("#board").append("<img id = 'boardtile "+ i + "'class = 'board' index = '"+ i +"'type = '" + board[i].type + "'src = '" + board[i].image + "' />");
    }
}

//Allows letter tiles draggable from the rack
//Idea and datastructure came from Christpher Nevers
function makeTileDraggable () {
    $(".letterTile").draggable({
        snapMode: 'inner',
    });
}

//Allows the board to allow letter tiles to be dropped
//Idea and datastructure came from Christpher Nevers
function makeBoardDroppable () {
    $(".board").droppable({
        accept: '.letterTile',
        drop: addLetter
    });
}

//Allows tiles to be dropped back into rack 
//Idea and datastructure came from Christpher Nevers
function makeRackDroppable () {
    $('#rack').droppable({
        accept: '.letterTile',
        drop: rackDrop,
    });
}

//When the letter is placed, add the letter to an array that saves where the letter is placed on the board by index
//Idea and datastructure came from Christpher Nevers 
function addLetter(event, ui){
    ui.draggable.position ({
        of: $(this),
    });

    const id = ui.draggable.attr('letter');
    const type = $(this).attr('type');
    const index = $(this).attr('index');

    letterArray[id] = {index, type}

    console.log(letterArray[id]);
}

//When the tile is placed back into the the rack, it appends the picture back to the rack with the image and ID 
function rackDrop(event, ui){
    const letter = ui.draggable.attr('letter');
    const id = ui.draggable.attr('id');
    
    console.log(letterArray[letter]);
    delete letterArray[letter];

    ui.draggable.remove();

    $("#rack").append("<img id = 'letter" + id + "' class = 'letterTile' letter = '" + letter + "' src = 'img/letter/Scrabble_Tile_" + letter + ".jpg' />");

    makeTileDraggable();
}

//Calculate the actual score of each tile on the board
function score() {
    let position = [];
    let wArray = new Array();
    console.log(Object.keys(letterArray));

    for (const key of Object.keys( letterArray )) {
        const pos = Number (letterArray[key]['index']);
        position.push (pos);           // store board position
        wArray[pos] = key;           // construct word
}

    position = position.sort(function(a, b) {return a - b;});

    var score = calculateScore ();

    if(highestScore < score){
        highestScore = score;
    }

    restart();

    $("#score").text(score);
    $("#hScore").text(highestScore);

}

//Calculation of the score by checking the board tile type and adding to score
function calculateScore () {
    let score = 0;
    for (const key of Object.keys (letterArray)) {
        const tileType = letterArray[key]['type'];
        const value = getLetterValue (key);
        
        if (tileType == 'doubleL'){
            score += value * 2;
        }else if (tileType == 'doubleW'){
            score += value * 2;
        }else{
            score += value;
        }
    }
    return score;
}

//Gets the value of the letter value
//Data structure and Help from Chris Nevers
function getLetterValue (letter) {
    const obj = tiles.filter ((val) => val.letter == letter)[0];
    return obj.value;
}

//Restart when the user hits refresh
function restart(){
    letterArray = [];
    letterImage();
    makeTileDraggable();
    makeBoardDroppable();
    makeRackDroppable();
}



