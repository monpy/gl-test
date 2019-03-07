uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.819, 0.160, 0.807);
vec3 colorB = vec3(1.000, 0.784, 0.196);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 toCenter = vec2(0.5) - st;
    vec3 color = vec3(0.0);
    float pct = sin(st.x + u_time);

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);
    
    gl_FragColor = vec4(color,1.0);
}