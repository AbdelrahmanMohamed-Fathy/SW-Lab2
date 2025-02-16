/*IMPORTANT NOTES
1- you are using JS Name Casing (camelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments, functions)
*/

class point2D {
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  // starting point represents the top left corner

  // =================
  //      METHODS
  // =================
  constructor(startingPoint, width, height) {
    this.startingPoint = startingPoint;
    this.updateWidth(width);
    this.updateHeight(height);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  updateWidth(width) {
    if (!width || width <= 0) {
      throw Error("invalid Width");
    }

    this.width = width;
  }

  updateHeight(height) {
    if (!height || height <= 0) {
      throw Error("invalid Height");
    }

    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }

  update({ startingPoint, width, height }) {
    this.startingPoint = startingPoint;
    this.updateWidth(width);
    this.updateHeight(height);
  }

  printEndPoints() {
    const topRight = this.startingPoint.coordX + this.width;
    const bottomLeft = this.startingPoint.coordY + this.height;

    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
}

function buildRectangle(coordX, coordY, width, height) {
  const startingPoint = new point2D(coordX, coordY);
  return buildRectangle(startingPoint, width, height);
}

function buildRectangle(startingPoint, width, height) {
  const rectangle = new Rectangle(startingPoint, width, height);
  return rectangle;
}

function buildSquare(coordX, coordY, sideLength) {
  const startingPoint = new point2D(coordX, coordY);
  return buildSquare(startingPoint, sideLength);
}

function buildSquare(startingPoint, sideLength) {
  // this check is not completely necessary because the rectangle class checks the length but it provides a clearer error message
  if (!sideLength || sideLength <= 0) {
    throw Error("invalid side length");
  }

  const square = buildRectangle(startingPoint, sideLength, sideLength);
  return square;
}

const rectangle = buildRectangle({ coordX: 2, coordY: 3 }, 5, 4);
const square = buildSquare({ coordX: 5, coordY: 5 }, 5);

console.log(square.calculatePerimeter());
square.printEndPoints();

rectangle.updateHeight(3);
