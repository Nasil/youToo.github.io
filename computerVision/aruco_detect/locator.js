"use strict";

const distance = (a, b) => Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));

const findContours = function(imageSrc, binary){
  const width = imageSrc.width, height = imageSrc.height;
  let contours = [], src, deltas, pos, pix, nbd, outer, hole, i, j;

  src = binaryBorder(imageSrc, binary);
  deltas = neighborhoodDeltas(width + 2);
  pos = width + 3;
  nbd = 1;

  for (i = 0; i < height; ++ i, pos += 2){
    for (j = 0; j < width; ++ j, ++ pos){
      pix = src[pos];

      if (0 !== pix){
        outer = hole = false;

        if (1 === pix && 0 === src[pos - 1]){
          outer = true;
        }
        else if (pix >= 1 && 0 === src[pos + 1]){
          hole = true;
        }

        if (outer || hole){
          ++ nbd;

          contours.push( borderFollowing(src, pos, nbd, {x: j, y: i}, hole, deltas) );
        }
      }
    }
  }

  return contours;
};

const borderFollowing = function(src, pos, nbd, point, hole, deltas){
    let contour = [], pos1, pos3, pos4, s, s_end, s_prev;
    contour.hole = hole;
    s = s_end = hole? 0: 4;
    do {
        s = (s - 1) & 7;
        pos1 = pos + deltas[s];
        if (src[pos1] !== 0){
            break;
      }
    } while(s !== s_end);

    if (s === s_end) {
        src[pos] = -nbd;
        contour.push({x: point.x, y: point.y});
    } else {
        pos3 = pos;
        s_prev = s ^ 4;

        while(true) {
            s_end = s;

            do {
                pos4 = pos3 + deltas[++ s];
            } while(src[pos4] === 0);

            s &= 7;

            if ( ( (s - 1) >>> 0) < (s_end >>> 0) ){
                src[pos3] = -nbd;
            } else if (src[pos3] === 1){
                src[pos3] = nbd;
            }

            contour.push( {x: point.x, y: point.y} );

            s_prev = s;

            point.x += neighborhood[s][0];
            point.y += neighborhood[s][1];

            if ( (pos4 === pos) && (pos3 === pos1) ){
                break;
            }

            pos3 = pos4;
            s = (s + 4) & 7;
        }
    }

    return contour;
};

const neighborhood = [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];

const neighborhoodDeltas = function(width){
    let deltas = [], len = neighborhood.length, i = 0;

    for (; i < len; ++ i){
        deltas[i] = neighborhood[i][0] + (neighborhood[i][1] * width);
    }

    return deltas.concat(deltas);
};

const approxPolyDP = function(contour, epsilon){
    let slice = {start_index: 0, end_index: 0},
        right_slice = {start_index: 0, end_index: 0},
        poly = [], stack = [], len = contour.length,
        pt, start_pt, end_pt, dist, max_dist, le_eps,
        dx, dy, i, j, k;

    epsilon *= epsilon;
    k = 0;
    for (i = 0; i < 3; ++ i) {
        max_dist = 0;
        k = (k + right_slice.start_index) % len;
        start_pt = contour[k];
        if (++ k === len) {k = 0;}
        for (j = 1; j < len; ++ j){
            pt = contour[k];
            if (++ k === len) {k = 0;}
            dx = pt.x - start_pt.x;
            dy = pt.y - start_pt.y;
            dist = dx * dx + dy * dy;
            if (dist > max_dist) {
                max_dist = dist;
                right_slice.start_index = j;
            }
        }
    }

    if (max_dist <= epsilon){
        poly.push( {x: start_pt.x, y: start_pt.y} );
    } else {
        slice.start_index = k;
        slice.end_index = (right_slice.start_index += slice.start_index);
        right_slice.start_index -= right_slice.start_index >= len? len: 0;
        right_slice.end_index = slice.start_index;
        if (right_slice.end_index < right_slice.start_index){
          right_slice.end_index += len;
        }
        stack.push( {start_index: right_slice.start_index, end_index: right_slice.end_index} );
        stack.push( {start_index: slice.start_index, end_index: slice.end_index} );
    }

  while(stack.length !== 0){
    slice = stack.pop();

    end_pt = contour[slice.end_index % len];
    start_pt = contour[k = slice.start_index % len];
    if (++ k === len) {k = 0;}

    if (slice.end_index <= slice.start_index + 1){
        le_eps = true;
    } else {
        max_dist = 0;
        dx = end_pt.x - start_pt.x;
        dy = end_pt.y - start_pt.y;
        for (i = slice.start_index + 1; i < slice.end_index; ++ i) {
            pt = contour[k];
            if (++ k === len) {k = 0;}
            dist = Math.abs( (pt.y - start_pt.y) * dx - (pt.x - start_pt.x) * dy);
            if (dist > max_dist) {
                max_dist = dist;
                right_slice.start_index = i;
            }
        }
        le_eps = max_dist * max_dist <= epsilon * (dx * dx + dy * dy);
    }

    if (le_eps) {
        poly.push( {x: start_pt.x, y: start_pt.y} );
    } else {
        right_slice.end_index = slice.end_index;
        slice.end_index = right_slice.start_index;
        stack.push( {start_index: right_slice.start_index, end_index: right_slice.end_index} );
        stack.push( {start_index: slice.start_index, end_index: slice.end_index} );
    }
  }

  return poly;
};

const isContourConvex = function(contour){
    let orientation = 0, convex = true,
        len = contour.length, i = 0, j = 0,
        cur_pt, prev_pt, dxdy0, dydx0, dx0, dy0, dx, dy;

    prev_pt = contour[len - 1];
    cur_pt = contour[0];

    dx0 = cur_pt.x - prev_pt.x;
    dy0 = cur_pt.y - prev_pt.y;

    for (; i < len; ++ i){
        if (++ j === len) {j = 0;}
        prev_pt = cur_pt;
        cur_pt = contour[j];
        dx = cur_pt.x - prev_pt.x;
        dy = cur_pt.y - prev_pt.y;
        dxdy0 = dx * dy0;
        dydx0 = dy * dx0;
        orientation |= dydx0 > dxdy0? 1: (dydx0 < dxdy0? 2: 3);
        if (3 === orientation){
            convex = false;
            break;
        }

        dx0 = dx;
        dy0 = dy;
    }

    return convex;
};

function minEdgeLength(poly){
    let len = poly.length, i = 0, j = len - 1,
        min = Infinity, d, dx, dy;

    for (; i < len; j = i ++){
        dx = poly[i].x - poly[j].x;
        dy = poly[i].y - poly[j].y;
        d = dx * dx + dy * dy;
        if (d < min){
            min = d;
        }
    }

    return Math.sqrt(min);
};

function binaryBorder(imageSrc, dst){
    let src = imageSrc.data, height = imageSrc.height, width = imageSrc.width,
        posSrc = 0, posDst = 0, i, j;

    for (j = -2; j < width; ++ j){
        dst[posDst ++] = 0;
    }

    for (i = 0; i < height; ++ i){
        dst[posDst ++] = 0;
        for (j = 0; j < width; ++ j){
            dst[posDst ++] = (0 === src[posSrc ++]? 0: 1);
        }
        dst[posDst ++] = 0;
    }

    for (j = -2; j < width; ++ j){
        dst[posDst ++] = 0;
    }

    return dst;
};

function findCorners(contours, minSize, epsilon, minLength){
    let coners = [], len = contours.length, contour, poly, i, polys = [];

    for (i = 0; i < len; ++ i){
        contour = contours[i];
        if (contour.length >= minSize){
            // 사각형으로 근사화 함
            poly = approxPolyDP(contour, contour.length * epsilon);
            polys.push(poly);
            if ( (4 === poly.length) && ( isContourConvex(poly) ) ){
                if ( minEdgeLength(poly) >= minLength){
                    coners.push(poly);
                }
            }
        }
    }

    return coners;
}

function findDirection(coners, pixelTotal) {
    const len = coners.length;
    let cnt = 0, dx1, dx2, dy1, dy2, swap, i, coner, dimension1, dimension2, pixelSize, locationTmp = [], location = [];

    for (i = 0; i < len; ++ i){
        coner = coners[i];

        dx1 = coner[1].x - coner[0].x;
        dy1 = coner[1].y - coner[0].y;
        dx2 = coner[2].x - coner[0].x;
        dy2 = coner[2].y - coner[0].y;
        if ( (dx1 * dy2 - dy1 * dx2) < 0){
          swap = coner[1];
          coner[1] = coner[3];
          coner[3] = swap;
        }

        // 한 칸당 들어가는 픽셀수
        dimension1 = distance(coner[1], coner[3]);
        dimension2 = distance(coner[0], coner[2]);
        pixelSize = Math.max(Math.floor(dimension1/pixelTotal), Math.floor(dimension2/pixelTotal));
        
        // TODO 카메라의 높이에 따른 bitSize 정해야함
        //if (pixelSize < 5 || pixelSize > 15) {
        //    continue;
        //}

        locationTmp = {
            topRight: { x: coner[0].x, y: coner[0].y},
            bottomRight: { x: coner[1].x, y: coner[1].y},
            bottomLeft: { x: coner[2].x, y: coner[2].y},
            topLeft: { x: coner[3].x, y: coner[3].y},
            pixelSize,
            dimension: pixelTotal,
        };

        location[cnt] = locationTmp;
        cnt++;
    }

    return location;
};

function getLocation(frameBinary, pixelTotal) {
    let binary = [];

    // 바이너리 이미지에서 외곽선이 있는 데이터 전부 찾기
    let contours = findContours(frameBinary, binary);
    // 모서리 후보 찾기 (minSize, epsilon, minLength)
    let coners = findCorners(contours, frameBinary.width * 0.20, 0.05, 10);

    // 각 코너의 방향 확인
    return findDirection(coners, pixelTotal);
}

exports.location = getLocation;
