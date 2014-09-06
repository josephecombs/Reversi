var readline = require("readline");
var Piece = require("./piece.js");
var Board = require("./board.js");

function Game () {
  this.board = new Board();
  this.turn = "black";
  this.currentPlayer = "black";
};

Game.prototype._flipTurn = function () {
  this.turn = (this.turn == "black") ? "white" : "black";
  this.currentPlayer = this.turn;
};

// Dreaded global state!
var rlInterface;
Game.prototype.play = function () {
  rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  this.runLoop(function () {
    rlInterface.close();
    rlInterface = null;
  });
};

Game.prototype.playTurn = function (callback) {
  this.board.print();
  rlInterface.question(
    this.turn + ", where do you want to move?",
    handleResponse.bind(this)
  );

  function handleResponse (answer) {
    try {
      var pos = JSON.parse(answer);
    }
    catch(SyntaxError) {
      console.log("Bad syntax");
      // this.playTurn(callback);
      // return;
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
          if (this.board.validMove([i, j], this.turn)) {
            pos = [i, j];
          }
        }
      }
    }
    if (!this.board.validMove(pos, this.turn)) {
      console.log("Invalid move!");
      this.playTurn(callback);
      return;
    }

    this.board.placePiece(pos, this.turn);
    this._flipTurn();
    callback();
  }
};

Game.prototype.runLoop = function (overCallback) {
  if (this.board.isOver()) {
    console.log("The game is over!");
    this.board.print();
    overCallback();
  } else if (!this.board.hasMove(this.turn)) {
    console.log(this.turn + " has no move!");
    this._flipTurn();
    this.runLoop(overCallback);
  } else {
    this.playTurn(this.runLoop.bind(this, overCallback));
  }
};

Game.prototype.placePiece = function(pos, color) {
  this.board.placePiece(pos, color);
  this._flipTurn();
}

module.exports = Game;
