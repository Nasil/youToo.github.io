"use strict";

var rotate = require('matrix-rotate');

const pixelTotal = 7;

var correctBitMatrix115_0 = [
    [ 1, 1, 1, 1, 1, 1, 1],
    [ 1, 0, 1, 1, 1, 1, 1],
    [ 1, 0, 1, 0, 0, 0, 1],
    [ 1, 1, 0, 0, 0, 1, 0],
    [ 1, 0, 1, 1, 1, 1, 1],
    [ 1, 1, 0, 0, 0, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1],
]

var correctBitMatrix115_3 = [
    [ 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 0, 1, 1, 1, 1],
    [ 1, 1, 0, 0, 1, 0, 1],
    [ 1, 1, 0, 0, 1, 0, 0],
    [ 1, 1, 1, 0, 1, 0, 1],
    [ 1, 0, 0, 1, 0, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1],
]

var correctBitMatrix115_1 = [
    [ 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 0, 1, 0, 0, 1],
    [ 1, 0, 1, 0, 1, 1, 1],
    [ 1, 0, 1, 0, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 1, 1],
    [ 1, 1, 1, 1, 0, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1],
]

var correctBitMatrix227 = [
    [ 1, 1, 1, 1, 1, 1, 1],
    [ 1, 0, 1, 1, 1, 1, 1],
    [ 1, 1, 0, 0, 0, 1, 1],
    [ 1, 1, 0, 1, 1, 0, 1],
    [ 1, 0, 1, 1, 1, 1, 1],
    [ 1, 1, 0, 0, 0, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1],
]


const directionPoint = [[1,1], [1,pixelTotal-2], [pixelTotal-2,pixelTotal-2], [pixelTotal-2,1]];
const directionEng = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

function main(matrix){
    let bits = [], angle = 0;
    let frontBit = 0; // 추후 반전
    let newMatrix;

    angle = 0;

    if (angle == 1) {
        newMatrix = RotateMatrix(matrix, 270);
    } else if (angle == 2) {
        newMatrix = RotateMatrix(matrix, 180);
    } else {
        newMatrix = matrix;
    }

    for (let i = 0; i < 4; i++) {
        if (newMatrix[directionPoint[i][0]][directionPoint[i][1]] == frontBit) {
            angle = i;
            break;
        }
    }

    console.log("angle: " + angle);

    bits = reverse(newMatrix);
    mat2id(bits, 7, angle * 90);
}

function reverse(matrix) {
    let bits = [];

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {

            // 반전
            let val = (matrix[i][j]) == 1 ? 0 : 1;
            bits.push(val);
        }
    }

    return bits;
}

function mat2id(bits, dataSize, angle){
    var id = 0, i;

    if (angle == 0) {
        for (i = 1; i < dataSize-1; ++i){
            id <<= 1;
            id |= bits[i * dataSize + 2];
            id <<= 1;
            id |= bits[i * dataSize + 4];
        }
    } else if (angle == 90) {
        for (i = dataSize-2; i > 0; --i) {
            id <<= 1;
            id |= bits[2 * dataSize + i];
            id <<= 1;
            id |= bits[4 * dataSize + i];
        }
    } else if (angle == 180) {
        for (i = dataSize-2; i > 0; --i){
            id <<= 1;
            id |= bits[i * dataSize + 4];
            id <<= 1;
            id |= bits[i * dataSize + 2];
        }
    } else if (angle == 270) {
        for (i = 1; i < dataSize-1; ++i){
            id <<= 1;
            id |= bits[4 * dataSize + i];
            id <<= 1;
            id |= bits[2 * dataSize + i];
        }
    }

    console.log(id.toString(2));
    console.log(id);
    return id;
};

function RotateMatrix(matrix, degrees){
  if(degrees == 90){
    //For 90 degrees swap the height/width and swap the location of each element
    var output = GenerateMatrix(matrix[0].length, matrix.length, 0); //Swapping the width and height for non square matrices
    for(var i = 0; i < matrix[0].length; i++){
      for(var j = 0; j < matrix.length; j++){
        output[i][j] = matrix[j][i];
      }
    }
  } else if(degrees == 180) {
    //For 180 degrees, rebuild array backwards
    var output = GenerateMatrix(matrix.length, matrix[0].length, 0);
    for(var i = matrix.length - 1; i >= 0; i--){
      for(var j = matrix[0].length - 1; j >=0; j--){
        output[matrix.length - 1 - i][matrix[0].length - 1 - j] = matrix[i][j];
      }
    }
  } else if(degrees == 270) {
    //For 270 degrees, not sure how to make short description
    var output = GenerateMatrix(matrix[0].length, matrix.length, 0); //Swapping the width and height for non square matrices
    for(var i = 0; i < matrix[0].length; i++){
      for(var j = matrix.length - 1; j >=0; j--){
        output[i][matrix.length - 1 - j] = matrix[j][i];
      }
    }
  }
  return output;
}

//Generates a matrix with the requested length and width and value
function GenerateMatrix(length, width, value){
  var output = [];
  for(var i = 0; i < length; i++){
    width > 0 ? output.push([]) : output.push(value); //If matrix has 0 width
    for(var j = 0; j < width; j++){
      output[i].push(value)
    }
  }
  return output;
}

main(correctBitMatrix115_0);
main(correctBitMatrix115_1);
main(correctBitMatrix115_3);
//main(correctBitMatrix227);
