var Piece = require("./piece");

function _makeGrid () {
  var board = new Array(8);
  for (var i = 0; i < 8; i++) {
    board[i] = new Array(8);
  }
  board[3][3] = new Piece("white");
  board[3][4] = new Piece("black");
  board[4][3] = new Piece("black");
  board[4][4] = new Piece("white");
  return board;
}

function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

Board.prototype.getPiece = function (pos) {
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.hasMove = function (color) {
  for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
      if (this.validMove([i,j], color)) {
        return true;
      }      
    }
  }
  return false;
};

Board.prototype.full = function () {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (!this.isOccupied([i, j])) {
        return false;
      }
    }
  }
  return true;
};

Board.prototype.isMine = function (pos, color) {
};

Board.prototype.isOccupied = function (pos) {
  // console.log(this.grid[pos[0]][pos[1]]);
  if (this.grid[pos[0]][pos[1]] === undefined) {
    return false;
  } else {
    return true;
  }
};

Board.prototype.isOver = function () {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (!this.isOccupied([i, j])) {
        return false;
      }
    }
  }
  return true;
}

Board.prototype.isValidPos = function (pos) {
};

function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
}

Board.prototype.placePiece = function (pos, color) {
  if (!this.isOccupied(pos)) {
    if (this.validMove(pos, color)) {
      this.grid[pos[0]][pos[1]] = new Piece(color);
      this.flipNeighbors(pos, color);
    } else {
      throw new Error;
    }
  } else {
    throw new Error;
  }
};

Board.prototype.print = function () {
  console.log("  0 1 2 3 4 5 6 7");
  for (var i = 0; i < 8; i++) {
    var currentLine = "" + i + " ";
    for (var j = 0; j < 8; j++) {
      if (this.isOccupied([i, j])) {
        if (this.getPiece([i, j]).color === "white") {
          currentLine += "W ";
        } else {
          currentLine += "B ";
        }
      } else {
        currentLine += "  ";
      }
    }
    console.log(currentLine);
  }
  this.printScore();
};

Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  var subDirs = this.subdirections(pos, color);
  for (var i = 0; i < subDirs.length; i++) {
    if (this.checkLine(pos, color, subDirs[i])) {
      return true;
    }
  }
  return false;
};

Board.prototype.validMoves = function (color) {
};

Board.prototype.flipNeighbors = function (pos, color) {
  var subDirs = this.subdirections(pos, color);
  for (var i = 0; i < subDirs.length; i++) {
    if (this.checkLine(pos, color, subDirs[i])) {
      this.flipLine(pos, color, subDirs[i]);
    }
  }
  return false;
//put piece on board
//look in 8 directions
  //in each direction, what is at the end of that view?
    //off the board
    //nothing (immediately adjacent)
    //neighbor of own color
    //neighbor of opposing color
      //in same direction, what is adjacent?
        //off board
        //nothing
        //neighbor of own color
        //neighbor of opposing color
      //
    //
  //
//

};

Board.prototype.subdirections = function (pos, color) {
  var validDirs = [];
  for (var i = 0; i < Board.DIRS.length; i++) {
    var nextPos = [pos[0] + Board.DIRS[i][0], pos[1] + Board.DIRS[i][1]];
    if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > 7 || nextPos[1] > 7) {
      
    } else {
      var checkPiece = this.getPiece(nextPos);
    }
    if (checkPiece !== undefined && checkPiece.color !== color) {
      validDirs.push(Board.DIRS[i]);
    }
  }
  return validDirs;
}

Board.prototype.checkLine = function(pos, color, dir) {
  var nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > 7 || nextPos[1] > 7) {
    return false;
  }
  var checkPiece = this.getPiece(nextPos);
  if (checkPiece === undefined) {
    return false;
  } else if (checkPiece.color === color) {
    return true;
  } else {
    return this.checkLine(nextPos, color, dir);
  }
};

Board.prototype.flipLine = function(pos, color, dir) {
  var nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  // if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > 7 || nextPos[1] > 7) {
  //   this.getPiece(pos).flip();
  //   return false;
  // }
  var checkPiece = this.getPiece(nextPos);
  // if (checkPiece === undefined) {
  //   this.getPiece(pos).flip();
  //   return false;
  // } else
  if (checkPiece.color === color) {
    return true;
  } else {
    checkPiece.flip();
    return this.flipLine(nextPos, color, dir);
  }
};

Board.prototype.printScore = function () {
  var blackScore = 0;
  var whiteScore = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (this.grid[i][j] !== undefined) {
        if (this.grid[i][j].color === "white") {
          whiteScore += 1;
        } else {
          blackScore += 1;
        }
      }
    }
  }
  console.log("White Score " + whiteScore);
  console.log("Black Score " + blackScore);
}

module.exports = Board;
