import * as THREE from 'three'

/**
 * A field of softly glowing embers drifting upward behind the hero.
 * All particle motion lives in the vertex shader, so the per-frame CPU
 * cost is a single uniform update. Returns a cleanup function.
 */
export function createEmberScene(container: HTMLElement): () => void {
  const isMobile = window.matchMedia('(max-width: 640px)').matches
  const count = isMobile ? 90 : 240

  const BOUNDS_X = 14
  const BOUNDS_Y = 14

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / Math.max(container.clientHeight, 1),
    0.1,
    100
  )
  camera.position.z = 10

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: 'low-power'
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.inset = '0'
  container.appendChild(renderer.domElement)

  const positions = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * BOUNDS_X * 2
    positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS_Y * 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    seeds[i] = Math.random()
    sizes[i] = 0.6 + Math.random() * 1.8
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uHeight: { value: BOUNDS_Y * 2 }
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      uniform float uHeight;
      varying float vAlpha;
      varying float vSeed;

      void main() {
        vec3 p = position;
        float speed = 0.25 + aSeed * 0.6;
        p.y = mod(position.y + uTime * speed + uHeight * 0.5, uHeight) - uHeight * 0.5;
        p.x += sin(uTime * (0.15 + aSeed * 0.4) + aSeed * 6.2831) * 0.8;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * (42.0 / -mv.z);

        float edge = smoothstep(0.0, 0.18, 1.0 - abs(p.y) / (uHeight * 0.5));
        vAlpha = edge * (0.25 + aSeed * 0.75);
        vSeed = aSeed;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      varying float vSeed;

      void main() {
        float d = length(gl_PointCoord - 0.5);
        float glow = smoothstep(0.5, 0.0, d);
        vec3 ember = vec3(0.0, 0.85, 0.49);
        vec3 pale = vec3(0.62, 0.96, 0.78);
        vec3 color = mix(ember, pale, vSeed * 0.7);
        gl_FragColor = vec4(color, glow * glow * vAlpha * 0.85);
      }
    `
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  // Gentle parallax toward the pointer
  let targetX = 0
  let targetY = 0
  const onPointerMove = (event: PointerEvent) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 1.2
    targetY = -(event.clientY / window.innerHeight - 0.5) * 0.8
  }
  window.addEventListener('pointermove', onPointerMove)

  const onResize = () => {
    const { clientWidth, clientHeight } = container
    camera.aspect = clientWidth / Math.max(clientHeight, 1)
    camera.updateProjectionMatrix()
    renderer.setSize(clientWidth, clientHeight)
  }
  window.addEventListener('resize', onResize)

  // Only render while the hero is actually on screen
  let visible = true
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  visibilityObserver.observe(container)

  const clock = new THREE.Clock()
  let rafId = 0

  const tick = () => {
    rafId = requestAnimationFrame(tick)
    if (!visible || document.hidden) return

    material.uniforms.uTime.value = clock.getElapsedTime()
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    renderer.render(scene, camera)
  }
  tick()

  return () => {
    cancelAnimationFrame(rafId)
    visibilityObserver.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('resize', onResize)
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
