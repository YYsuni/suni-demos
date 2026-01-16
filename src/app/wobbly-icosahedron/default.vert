uniform float uTime;
#define PI 3.141592653589793

varying float vDisplacement;
varying vec3 vNormal;

float smoothMod(float axis, float amp, float rad) {
  float x = axis / amp;
  float s = sin(PI * x);
  float numerator = cos(PI * x) * s;
  float denom = s * s + rad * rad;
  float angle = atan(numerator / denom);
  return amp * 0.5 - angle / PI;
}

float fit(float value, float inMin, float inMax, float outMin, float outMax) {
  float t = (value - inMin) / (inMax - inMin);
  return mix(outMin, outMax, t);
}

float wave(float y) {
  return fit(smoothMod(y * 5.0 + uTime, 1.0, 1.5), 0.35, 0.6, 0.0, 1.0);
}

void main() {

  vec3 coords = normal;
  coords.y += uTime * 0.1;
  float noisePattern = noise(coords);

  float wavePattern = wave(noisePattern);

  float pattern = wavePattern;

  vDisplacement = pattern;
  vNormal = normal;

  vec3 newPosition = position + pattern * normal * 0.4;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
