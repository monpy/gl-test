uniform mat4 u_matrix;
attribute vec2 a_pos;
varying vec2 poly_resolution;
varying vec4 poly_lt;
varying vec4 poly_rb;
uniform vec2 left_top;
uniform vec2 right_bottom;

void main() {
  poly_lt = u_matrix * vec4(left_top, 0.0, 1.0);
  poly_rb = u_matrix * vec4(right_bottom, 0.0, 1.0);
  gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
}