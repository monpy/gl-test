import mapboxgl from "mapbox-gl";
import fragmentSource from "./geo-fragment.glsl";
import vertexSource from "./geo-vertex.glsl";
import earcut from "earcut";

import { Vector4, Matrix4 } from "three";

class GeoChuoku {
  constructor(map) {
    this.id = "geo-chuo";
    this.type = "custom";
    this.renderingMode = "2d";
    this.timeUniform;
    this.time = 0;
    this.resolutionUniform;
    this.resolution;
    this.map = map;
    this.rect = [0.0, 1.0, 0.0, 1.0];
    this.vecPos = [0, 0];
  }

  onAdd(map, gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    this.aPos = gl.getAttribLocation(this.program, "a_pos");
    this.timeUniform = gl.getUniformLocation(this.program, "u_timee");
    this.resolutionUniform = gl.getUniformLocation(
      this.program,
      "u_resolution_chuo"
    );

    const geoPoints = [];
    for (let geo of s) {
      const transformed = mapboxgl.MercatorCoordinate.fromLngLat({
        lng: geo[0],
        lat: geo[1]
      });

      if (this.rect[0] < transformed.x) this.rect[0] = transformed.x;
      if (this.rect[1] > transformed.x) this.rect[1] = transformed.x;
      if (this.rect[2] < transformed.y) this.rect[2] = transformed.y;
      if (this.rect[3] > transformed.y) this.rect[3] = transformed.y;

      geoPoints.push(transformed.x);
      geoPoints.push(transformed.y);
    }

    console.log(this.rect);
    const rectPositions = [
      this.rect[1],
      this.rect[3],
      this.rect[0],
      this.rect[3],
      this.rect[0],
      this.rect[2],
      this.rect[1],
      this.rect[2]
    ];
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(rectPositions),
      gl.STATIC_DRAW
    );
  }

  render(gl, matrix) {
    // console.log(matrix);

    gl.useProgram(this.program);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.program, "u_matrix"),
      false,
      matrix
    );
    gl.uniform1f(this.timeUniform, this.time);
    gl.uniform2f(
      gl.getUniformLocation(this.program, "left_top"),
      this.rect[1],
      this.rect[3]
    );
    gl.uniform2f(
      gl.getUniformLocation(this.program, "right_bottom"),
      this.rect[0],
      this.rect[2]
    );
    gl.uniform2f(
      gl.getUniformLocation(this.program, "u_resolution_chuo"),
      gl.canvas.width,
      gl.canvas.height
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.aPos);
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.drawArrays(gl.LINE_LOOP, 0, geoArr.length);
    // gl.drawArrays(gl.TRIANGLES, 0, s.length);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }

  updateTime() {
    setInterval(() => {
      this.time += 0.02;
      this.map.repaint = true;
    }, 10);
  }
}

export default GeoChuoku;

const geoArr = [
  [139.772862025961, 35.703702216389],
  [139.772789709677, 35.7031202848781],
  [139.773657488902, 35.7030400068957],
  [139.773166668607, 35.7018788895041],
  [139.776640272131, 35.7006158384551],
  [139.780389729203, 35.7003314017777],
  [139.779973611992, 35.698078065855],
  [139.782656937168, 35.6978555385073],
  [139.782460866975, 35.6965264241601],
  [139.782162298351, 35.6960978315547],
  [139.782584715312, 35.6947177894994],
  [139.77765609865, 35.6918963752226],
  [139.770428329204, 35.6892980476718],
  [139.769671955297, 35.6869116588511],
  [139.770896936245, 35.6845086037942],
  [139.77031860382, 35.6784105716956],
  [139.763680554014, 35.6725127745501],
  [139.754287997693, 35.6698099331871],
  [139.749759980439, 35.6707635482045],
  [139.747570008949, 35.6696324987461],
  [139.746958889041, 35.6705049994115],
  [139.743280706839, 35.6713948551936],
  [139.739057791784, 35.6740255493448],
  [139.73677167917, 35.6788730462592],
  [139.733830262956, 35.6788780401945],
  [139.731519159082, 35.6815151033445],
  [139.731268286902, 35.6820021204067],
  [139.729997785869, 35.6855419347176],
  [139.731171670037, 35.6891424901389],
  [139.737662643816, 35.6933507552381],
  [139.7439466746, 35.701417915909],
  [139.744530116072, 35.7022146621818],
  [139.745873698713, 35.7028929965194],
  [139.746713884039, 35.7030366425319],
  [139.749060271015, 35.7031244487392],
  [139.761296375727, 35.7015866602011],
  [139.76455720685, 35.7000086081157],
  [139.768280282309, 35.699700827736],
  [139.76786304994, 35.7009686128161],
  [139.766397211662, 35.7017824938719],
  [139.766769149676, 35.7026461083361],
  [139.76809334743, 35.702743056152],
  [139.76805694737, 35.7034661110771],
  [139.76989110569, 35.7033669500296],
  [139.770078724954, 35.7053553726572],
  [139.773035283951, 35.7050955567194],
  [139.772862025961, 35.703702216389]
];

const tri = earcut(Array.prototype.concat.apply([], geoArr));

const s = [];
for (let t of tri) {
  s.push(geoArr[t]);
}
