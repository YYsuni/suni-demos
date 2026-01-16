uniform float uTime;

varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;

void main() {
  float intensity = clamp(vDisplacement, 0.0, 1.0);
  float pulse = 0.7 + 0.3 * sin(uTime * 1.2 + intensity * 5.0);

  vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8)); // 右上方光源
  float diffuse = max(dot(normalize(vNormal), lightDir), 0.0);

  vec3 color = vec3(0.102, 0.298, 1.0);
  color *= (0.4 + 0.6 * diffuse);
  color *= mix(0.8, 1.4, intensity);
  color *= pulse;

  gl_FragColor = vec4(color, 1.0);
}
