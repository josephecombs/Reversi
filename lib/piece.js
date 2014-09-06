function Piece (color) {
  this.color = color;
}

Piece.prototype.oppColor = function () {
  if (this.color === 'white') {
    return "black";
  } else {
    return "white";
  }
};

Piece.prototype.flip = function () {
  this.color = this.oppColor();
};

Piece.prototype.toString = function () {
};

module.exports = Piece;
