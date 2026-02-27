#include "./modules/simplex.glsl"

varying vec2 vUv;
uniform float uTime;
uniform float scale;
uniform float aspect;

void main() {
    float thickness = .03;
    vec3 c1 = vec3(0.9608, 0.8706, 0.7020);
    vec3 c2 = vec3(1.0);

    vec2 UV = vUv * vec2(aspect, 1.);

    float n = snoise(vec3(UV * scale + uTime * .1, .1)) + .2;

    float lines = fract(n * 5.);

    float pattern = smoothstep(.5 - thickness, .5, lines) - smoothstep(.5, .5 + thickness, lines) * 1.5;

    vec3 mixed = mix(c2, c1, pattern);
    gl_FragColor = vec4(mixed, 1.0);
    // gl_FragColor = vec4(pattern, pattern, pattern, pattern);
}