## 이진화 (Binalized)

- 영상처리에서 이진화는 어떤 주어진 임계값(threshold)보다 밝은 픽셀들은 모두 흰색(0)으로, 그렇지 않은 픽셀들은 모두 검은색(1)으로 바꾸는 것을 지칭한다.
- 이진화에 따른 분류(classification) 에러를 최소화시켜주는 임계값을 optimal threshold라고 부른다. 
- 즉, 어떤 T값 하나를 고정했을 때 T보다 어두운 물체 픽셀의 비율과 T보다 밝은 배경픽셀의 비율의 합을 최소화해주는 T를 optimal threshold라고 부른다

## 가변 이진화 (adaptive thresholding)
- 픽셀 주변의 local 영역의 밝기 평균을 임계값으로 사용하는 방법
- 이 방법은 영상 픽셀마다 서로 다른 threshold를 사용하는데, 그 threshold 값은 그 픽셀을 중심으로 한 n x n 주변 영역의 밝기 평균에 일정한 상수를 빼서 결정한다.

```
"use strict";

const BitMatrix_1 = require("../BitMatrix");
const REGION_SIZE = 8;
const MIN_DYNAMIC_RANGE = 24;
function numBetween(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
// Like BitMatrix but accepts arbitry Uint8 values
class Matrix {
    constructor(width, height) {
        this.width = width;
        this.data = new Uint8ClampedArray(width * height);
    }
    get(x, y) {
        return this.data[y * this.width + x];
    }
    set(x, y, value) {
        this.data[y * this.width + x] = value;
    }
}
function binarize(data, width, height) {
    // Convert image to greyscale
    const greyscalePixels = new Matrix(width, height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            greyscalePixels.set(x, y, data[width * y + x]);
        }
    }
    const horizontalRegionCount = Math.ceil(width / REGION_SIZE);
    const verticalRegionCount = Math.ceil(height / REGION_SIZE);
    const blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
    for (let verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (let hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            let sum = 0;
            let min = Infinity;
            let max = 0;
            for (let y = 0; y < REGION_SIZE; y++) {
                for (let x = 0; x < REGION_SIZE; x++) {
                    const pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                    sum += pixelLumosity;
                    min = Math.min(min, pixelLumosity);
                    max = Math.max(max, pixelLumosity);
                }
            }
            let average = sum / (Math.pow(REGION_SIZE, 2));
            if (max - min <= MIN_DYNAMIC_RANGE) {
                average = min / 2;
                if (verticalRegion > 0 && hortizontalRegion > 0) {
                    const averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) +
                        (2 * blackPoints.get(hortizontalRegion - 1, verticalRegion)) +
                        blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                    if (min < averageNeighborBlackPoint) {
                        average = averageNeighborBlackPoint;
                    }
                }
            }
            blackPoints.set(hortizontalRegion, verticalRegion, average);
        }
    }

    const binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
    for (let verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (let hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            const left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
            const top = numBetween(verticalRegion, 2, verticalRegionCount - 3);
            let sum = 0;
            for (let xRegion = -2; xRegion <= 2; xRegion++) {
                for (let yRegion = -2; yRegion <= 2; yRegion++) {
                    sum += blackPoints.get(left + xRegion, top + yRegion);
                }
            }
            const threshold = sum / 25;
            for (let x = 0; x < REGION_SIZE; x++) {
                for (let y = 0; y < REGION_SIZE; y++) {
                    const lum = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                    binarized.set(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y, lum <= threshold);
                }
            }
        }
    }
    return binarized;
}

exports.binarize = binarize;
```

## Otsu 이진화 기법 
- 실제 입력 영상의 밝기 분포(히스토그램)을 보고 임계값을 찾아주는 방법 
- 입력 영상에서 임계값 T보다 어두운 픽셀들의 비율을 α, 밝기 평균을 μ1, 분산을 σ12, T보다 밝은 픽셀들의 비율을 β, 밝기 평균을 μ2, 분산을 σ22라 했을 때 (α+β=1), intra-class 분산과 inter-class 분산은 각각 다음과 같이 계산된다.
```
intra-class variance = ασ12+βσ22     --- (1)
inter-class variance = αβ(μ1-μ2)2     --- (2)
```
- 식 (1)을 최소화시키는 것은 식 (2)를 최대화시키는 것과 동일하며 둘 중 어느 기준을 사용해도 무방하지만 계산상으로는 식 (2)를 최대화시키는 것이 효율적이다. 
- 즉, Otsu의 이진화 알고리즘은 임계값 T를 0 부터 255까지 단계적으로 변화시키면서 식 (2)를 계산하고 식 (2)가 최대가 되는 T 값을 찾아서 영상을 이진화하는 방법이다.



- 밝기값 히스토 그램, 이진화 결과 영상 
- ex) https://zhangyu94.github.io/MultiOtsu/
```
'use strict';

let maxSum = 0.;
let thresholds = [];

function createImg(frame, width, height) {
    return {
        width : width,
        height : height,
        data : frame
    }
}

function histogram(image) {
    let histogram = new Uint8ClampedArray(256);
    let maxCnt = image.width * image.height;
    for (let i = 0; i < maxCnt; i++) {
        let luma = image.data[i];
        histogram[luma]++;
    }

    for (let i = 0; i < histogram.length; i++) {
        histogram[i]++;
    }

    return histogram;
}

function for_loop(H, u, vmax, level, levels, index)
{
    var classes = index.length - 1;

    for (var i = u; i < vmax; i++) {
        index[level] = i;

        if (level + 1 >= classes) {
            var sum = 0.;

            for (var c = 0; c < classes; c++) {
                var u = index[c];
                var v = index[c + 1];
                var s = H[v + u * levels];
                sum += s;
            }

            if (maxSum < sum) {
                thresholds = index.slice(1, index.length - 1);
                maxSum = sum;
            }
        } else
            for_loop(H,
                    i + 1,
                    vmax + 1,
                    level + 1,
                    levels,
                    index);
    }
}

function buildTables(histogram)
{
    var P = new Array(histogram.length + 1);
    var S = new Array(histogram.length + 1);
    P[0] = 0;
    S[0] = 0;

    var sumP = 0;
    var sumS = 0;

    for (var i = 0; i < histogram.length; i++) {
        sumP += histogram[i];
        sumS += i * histogram[i];
        P[i + 1] = sumP;
        S[i + 1] = sumS;
    }

    var H = new Array(histogram.length * histogram.length);
    H.fill(0.);

    for (var u = 0; u < histogram.length; u++)
        for (var v = u + 1; v < histogram.length; v++)
            H[v + u * histogram.length] = Math.pow(S[v] - S[u], 2) / (P[v] - P[u]);

    return H;
}

function otsuExec(histogram, classes)
{
    maxSum = 0.;
    thresholds = new Uint8ClampedArray(classes - 1);
    let H = buildTables(histogram);
    let index = new Uint8ClampedArray(classes + 1);
    index[0] = 0;
    index[index.length - 1] = histogram.length - 1;

    for_loop(H,
            1,
            histogram.length - classes + 1,
            1,
            histogram.length,
            index);

    return thresholds;
}

function otsu(frame, width, height)
{
    let img = createImg(frame, width, height);
    let hist = histogram(img);

    let classes = 2;
    let thresholds = otsuExec(hist, classes);

    var dstData = img.data;
    var colors = new Uint8ClampedArray(classes);
    for (var i = 0; i < classes; i++)
        colors[i] = Math.round(255 * i / (classes - 1));

    var colorTable = new Uint8ClampedArray(256);
    var j = 0;

    for (var i = 0; i < colorTable.length; i++) {
        if (j < thresholds.length && i >= thresholds[j])
            j++;

        colorTable[i] = colors[j];
    }

    for (var i = 0; i < dstData.length; i++) {
        var luma = (  11 * dstData[i]
                    + 16 * dstData[i + 1]
                    +  5 * dstData[i + 2]) >> 5;
        luma = colorTable[luma];
        dstData[i]     = luma;
    }

    return dstData;
}


exports.otsu = otsu;
```



#### 참고
- http://darkpgmr.tistory.com/115
- https://github.com/hipersayanX/MultiOtsuThresholdJS
- https://github.com/JasonAltschuler/Otsu
