precision mediump float;
uniform float u_timee;
varying vec4 poly_lt;
varying vec4 poly_rb;
uniform vec2 u_resolution_chuo;
varying vec2 poly_resolution;

varying vec4 uVu;

void main() {
  // float pct = step(u_resolution_chuo.x / 2.0, gl_FragCoord.x);
  vec2 rect = vec2(poly_rb.x - poly_lt.x, poly_rb.y - poly_lt.y);
  vec2 asRect = rect / u_resolution_chuo;
  float asX = gl_FragCoord.x / u_resolution_chuo.x;
  // float centerX = gl_FragCoord.x / u_resolution_chuo.x;
  // float stepF = step(u_resolution_chuo.x / 2.0, gl_FragCoord.x);
  // gl_FragColor = vec4(vec3(asX * asRect.x), 1.0);
  // gl_FragColor = vec4(vec3(poly_lt.x / u_resolution_chuo.x), 1.0);
  float left = poly_lt.x / u_resolution_chuo.x;
  

  gl_FragColor = vec4(vec3( step(500.0, abs(gl_FragCoord.x) ) ), 1.0);
}