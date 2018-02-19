"use strict";

function mat2id(bits, dataSize, angle){
    var id = 0, i, bitOne = 2, bitTwo = 4;

    if (angle == 0) {
        for (i = 1; i < dataSize-1; ++i){
            id <<= 1;
            id |= bits[i * dataSize + bitOne];
            id <<= 1;
            id |= bits[i * dataSize + bitTwo];
        }
    } else if (angle == 90) {
        for (i = dataSize-2; i > 0; --i) {
            id <<= 1;
            id |= bits[bitOne * dataSize + i];
            id <<= 1;
            id |= bits[bitTwo * dataSize + i];
        }
    } else if (angle == 180) {
        for (i = dataSize-2; i > 0; --i){
            id <<= 1;
            id |= bits[i * dataSize + bitTwo];
            id <<= 1;
            id |= bits[i * dataSize + bitOne];
        }
    } else if (angle == 270) {
        for (i = 1; i < dataSize-1; ++i){
            id <<= 1;
            id |= bits[bitTwo * dataSize + i];
            id <<= 1;
            id |= bits[bitOne * dataSize + i];
        }
    }

    console.log(id.toString(2));
    return id;
};


function decode(matrix, pixelTotal){
    let data = [], angle = 0;
    let frontBit = 0; // 추후 반전

    const directionPoint = [[1,1], [1,pixelTotal-2], [pixelTotal-2,pixelTotal-2], [pixelTotal-2,1]];
    const directionEng = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

    // 각도 찾기
    for (let i = 0; i < 4; i++) {
        if (matrix.get(directionPoint[i][1],directionPoint[i][0]) == frontBit) {
            angle = i * 90;
            break;
        }
    }

    console.log("angle: " + angle);

    // 검증용
    for (let i = 0; i < pixelTotal; i++) {
        for (let j = 0; j < pixelTotal; j++) {
            data.push(matrix.get(j,i));
        }
        console.log(data);
        data = [];
    }

    // angle 값 대로 읽기
    let id = mat2id(matrix.data, pixelTotal, angle);
    console.log(id);

    return true;
}

exports.decode = decode;
