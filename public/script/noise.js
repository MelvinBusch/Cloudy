// 1D Perlin Noise Algorithmus in Javascript
let PerlinNoise = function(_amplitude, _scale) {
  const MAX_VERTICES = 256;
  const MAX_VERTICES_MASK = MAX_VERTICES - 1;
  let amplitude = _amplitude;
  let scale = _scale;

  const SEEDARRAY = Array.from({
    length: MAX_VERTICES
  }, () => Math.floor(Math.random() * 40));

  let getVal = function(x) {
    let scaledX = x * scale;
    let xFloor = Math.floor(scaledX);
    let t = scaledX - xFloor;
    let tRemapSmoothstep = t * t * (3 - 2 * t);

    let xMin = xFloor & MAX_VERTICES_MASK;
    let xMax = (xMin + 1) & MAX_VERTICES_MASK;

    let y = lerp(SEEDARRAY[xMin], SEEDARRAY[xMax], tRemapSmoothstep);

    return y * amplitude;
  };

  let lerp = function(a, b, t) {
    return a * (1 - t) + b * t;
  };

  return {
    noise: getVal,
  };
};