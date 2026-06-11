import { gsap } from 'gsap'
import * as THREE from 'three'

/**
 * WebGL hover effect for imagery: a canvas is laid over the <img> inside a
 * `[data-distort]` wrapper and, on hover of the enclosing link, the texture
 * zooms slightly while a wave ripples through it with a small RGB split.
 * While idle the canvas shows the untouched image, so nothing changes
 * visually until the pointer arrives. Falls back to the existing CSS hover
 * when WebGL/fine pointers aren't available.
 */

const MAX_INSTANCES = 8

let cleanups: Array<() => void> = []

function createDistortCard(wrapper: HTMLElement) {
  const img = wrapper.querySelector('img')
  if (!img) return

  const setup = () => {
    if (wrapper.dataset.distortReady) return
    wrapper.dataset.distortReady = '1'

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    } catch {
      return // no WebGL — CSS hover stays in charge
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const canvas = renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    wrapper.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)

    const uniforms = {
      uMap: { value: null as THREE.Texture | null },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uImageAspect: { value: img.naturalWidth / Math.max(img.naturalHeight, 1) },
      uPlaneAspect: { value: 1 }
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform float uProgress;
        uniform float uTime;
        uniform float uImageAspect;
        uniform float uPlaneAspect;
        varying vec2 vUv;

        void main() {
          // object-fit: cover
          vec2 s = vec2(
            min(uPlaneAspect / uImageAspect, 1.0),
            min(uImageAspect / uPlaneAspect, 1.0)
          );
          vec2 uv = (vUv - 0.5) * s + 0.5;

          // zoom in slightly as the effect builds
          uv = (uv - 0.5) * (1.0 - 0.07 * uProgress) + 0.5;

          // travelling wave + rgb split
          uv.x += sin(uv.y * 7.0 + uTime * 2.4) * 0.014 * uProgress;
          float shift = 0.009 * uProgress;

          float r = texture2D(uMap, uv + vec2(shift, 0.0)).r;
          vec2 gb = vec2(
            texture2D(uMap, uv).g,
            texture2D(uMap, uv - vec2(shift, 0.0)).b
          );
          gl_FragColor = vec4(r, gb.x, gb.y, 1.0);
        }
      `
    })

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(plane)

    const render = () => renderer.render(scene, camera)

    const texture = new THREE.TextureLoader().load(
      img.currentSrc || img.src,
      () => render()
    )
    texture.colorSpace = THREE.SRGBColorSpace
    uniforms.uMap.value = texture

    const resize = () => {
      const width = wrapper.clientWidth
      const height = wrapper.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height, false)
      uniforms.uPlaneAspect.value = width / height
      render()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrapper)

    // Only animate while the effect is live
    let rafId = 0
    let running = false
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      uniforms.uTime.value += 1 / 60
      render()
    }
    const start = () => {
      if (running) return
      running = true
      loop()
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    const host = wrapper.closest('a') ?? wrapper
    const onEnter = () => {
      start()
      gsap.to(uniforms.uProgress, {
        value: 1,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: true
      })
    }
    const onLeave = () => {
      gsap.to(uniforms.uProgress, {
        value: 0,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: true,
        onComplete: () => {
          stop()
          render()
        }
      })
    }
    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointerleave', onLeave)

    cleanups.push(() => {
      stop()
      resizeObserver.disconnect()
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointerleave', onLeave)
      plane.geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      canvas.remove()
      delete wrapper.dataset.distortReady
    })
  }

  if (img.complete && img.naturalWidth) {
    setup()
  } else {
    img.addEventListener('load', setup, { once: true })
  }
}

export function initHoverDistort() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  document
    .querySelectorAll<HTMLElement>('[data-distort]')
    .forEach((wrapper, index) => {
      if (index < MAX_INSTANCES) createDistortCard(wrapper)
    })
}

document.addEventListener('astro:page-load', initHoverDistort)
document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((dispose) => dispose())
  cleanups = []
})
