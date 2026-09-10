"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { ExperienceState } from "@/components/studio-experience";
import { sampleFlight } from "@/lib/experience-motion";

type Props = {
  state: RefObject<ExperienceState>;
  onReady: () => void;
  onUnavailable: () => void;
};

// Store surface parameters and each strip's centre. The shader separates the
// pieces, refines them into a knot, then opens the entire sculpture.
function ribbonGeometry() {
  const count = 18;
  const strips = Array.from(
    { length: count },
    (_, i) =>
      new ParametricGeometry(
        (u, v, target) => target.set((i + u) / count, v, (i + 0.5) / count),
        20,
        20,
      ),
  );
  const geometry = mergeGeometries(strips);
  strips.forEach((strip) => strip.dispose());
  return geometry;
}

const goldFragment = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec3 N = normalize(vNormal);
    if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(cameraPosition-vWorld);
    vec3 R = reflect(-V,N);
    float facing = max(dot(N,V),0.);
    float fresnel = pow(1.-facing,3.);
    // Broad studio panels and a narrow side light create metallic reflections.
    float mainLight = pow(max(dot(R,normalize(vec3(-.55,.7,1.))),0.),10.);
    float topLight = pow(max(dot(R,normalize(vec3(.6,.9,.2))),0.),7.);
    float strip = pow(max(1.-abs(R.y-.22)*3.6,0.),20.)*smoothstep(-.5,.25,R.x);
    float bounce = pow(max(dot(R,normalize(vec3(.25,-.8,.5))),0.),5.);
    float rim = pow(max(dot(R,normalize(vec3(-.85,-.15,-.5))),0.),9.);
    vec3 color = vec3(.12,.062,.019);
    color += vec3(1.,.78,.4)*mainLight*2.9;
    color += vec3(1.,.52,.14)*topLight*1.15;
    color += vec3(1.,.91,.65)*strip*2.3;
    color += vec3(.5,.22,.065)*bounce*.65;
    color += vec3(.62,.68,.73)*rim*.65;
    color += fresnel*vec3(.24,.14,.045);
    float fog = smoothstep(17.,35.,distance(cameraPosition,vWorld));
    color = mix(color,vec3(.026,.022,.016),fog);
    gl_FragColor = vec4(color,1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const ribbonVertex = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uImpulse;
  uniform float uTravel;
  uniform float uRelease;
  uniform float uVelocity;
  uniform float uFilament;
  uniform float uOffset;
  uniform vec3 uPointer;
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying float vArc;
  const float TAU = 6.2831853;
  vec3 centre(float t) {
    float r = 2. + .66*cos(3.*t);
    vec3 knot = vec3(r*cos(2.*t),r*sin(2.*t),.92*sin(3.*t));
    vec3 openForm = vec3(3.7*cos(t),3.7*sin(t),.24*sin(3.*t));
    vec3 form = mix(knot,openForm,uRelease);
    // Both transitions unfold the same continuous surface through the lens.
    form += uTravel*vec3(sin(t)*3.1,cos(t*2.)*.65,sin(t*2.)*2.5);
    form *= 1.+uFilament*.22;
    form.z += uFilament*sin(t*2.+uOffset+uTime*.34)*.65;
    return form;
  }
  vec3 surface(float u,float v,float segment) {
    float t = u*TAU + uFilament*uOffset;
    vec3 C = centre(t);
    vec3 T = normalize(centre(t+.002)-centre(t-.002));
    vec3 B = normalize(cross(T,vec3(0.,0.,1.)));
    vec3 N = normalize(cross(B,T));
    float twist = t*1.5 + sin(t*3.+uTime*.18)*.4 + uTime*.08 + uTravel*.9;
    float a = v*TAU;
    float width = mix(.44+.14*sin(t*3.+.6),.017,uFilament);
    float x = cos(a)*width;
    float y = sin(a)*mix(.155,.017,uFilament);
    float x1 = x*cos(twist)-y*sin(twist);
    float y1 = x*sin(twist)+y*cos(twist);
    vec3 p = C+B*x1+N*y1;
    float raw = 1.-smoothstep(.08,.43,uProgress);
    p += N*sin(t*29.+a*2.+uTime*.5)*.023*raw;
    vec3 partCentre = centre(segment*TAU);
    float separation = uImpulse*.8*(1.-uFilament);
    p += normalize(partCentre+vec3(.001))*separation*(.7+.3*sin(segment*61.));
    vec3 delta = p-uPointer;
    p += normalize(delta+vec3(.001))*pow(max(0.,1.-length(delta)/2.6),2.)*.27;
    p += N*sin(t*6.-uTime*.85)*(.035+abs(uVelocity)*.055)*(1.-uFilament);
    return p;
  }
  void main() {
    vec3 p = surface(position.x,position.y,position.z);
    vec3 tangent = surface(position.x+.0003,position.y,position.z)-p;
    vec3 across = surface(position.x,position.y+.0003,position.z)-p;
    vec3 n = normalize(cross(tangent,across));
    vec4 world = modelMatrix*vec4(p,1.);
    vWorld = world.xyz;
    vArc = position.x;
    vNormal = normalize(mat3(modelMatrix)*n);
    gl_Position = projectionMatrix*viewMatrix*world;
  }
`;

const filamentFragment = `
  uniform float uTime;
  uniform float uTravel;
  uniform float uOffset;
  varying float vArc;
  void main() {
    float light = pow(.5+.5*sin(vArc*6.283-uTime*1.1+uOffset),12.);
    float alpha = (.1+uTravel*.2)+light*.55;
    gl_FragColor = vec4(vec3(.96,.67,.29)*(1.+light),alpha);
  }
`;

const fragmentVertex = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix*instanceMatrix*vec4(position,1.);
    vWorld = world.xyz;
    vNormal = normalize(mat3(modelMatrix)*mat3(instanceMatrix)*normal);
    gl_Position = projectionMatrix*viewMatrix*world;
  }
`;

const particleVertex = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uImpulse;
  uniform float uTravel;
  uniform float uRelease;
  uniform float uVelocity;
  uniform vec3 uPointer;
  attribute vec4 aData;
  varying float vAlpha;
  varying float vTint;
  void main() {
    float t = aData.x*6.283+uTime*.095;
    float formed = smoothstep(.08,.43,uProgress);
    float released = uRelease;
    float r = 2.+.66*cos(t*3.);
    vec3 knot = vec3(r*cos(t*2.),r*sin(t*2.),.92*sin(t*3.));
    vec3 ring = vec3(cos(t)*4.4,sin(t)*4.4,sin(t*3.)*.8);
    vec3 p = mix(knot,ring,released);
    p += uTravel*vec3(sin(t)*3.1,cos(t*2.)*.65,sin(t*2.)*2.5);
    p += position*mix(2.5,.65,formed)*(1.+released*.8);
    p *= 1.+uImpulse*.32;
    p.z += position.z*min(abs(uVelocity),1.5)*1.6;
    vec3 delta = p-uPointer;
    p += normalize(delta+vec3(.001))*pow(max(0.,1.-length(delta)/2.6),2.)*.7;
    vec4 mv = modelViewMatrix*vec4(p,1.);
    gl_Position = projectionMatrix*mv;
    gl_PointSize = clamp((aData.w*.6+.4)*uPixelRatio*32./max(1.,-mv.z),.6,3.);
    vAlpha = (.16+.52*aData.w)*(1.-smoothstep(16.,32.,-mv.z));
    vTint = aData.z;
  }
`;
const particleFragment = `
  varying float vAlpha;
  varying float vTint;
  void main() {
    float d = length(gl_PointCoord-.5)*2.;
    float alpha = pow(max(0.,1.-d),2.)*vAlpha;
    if (alpha<.015) discard;
    vec3 color = mix(vec3(.6,.38,.13),vec3(1.,.86,.56),vTint);
    gl_FragColor = vec4(color,alpha);
  }
`;

export default function ImmersiveWorld({
  state,
  onReady,
  onUnavailable,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onReady, onUnavailable });
  callbacks.current = { onReady, onUnavailable };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      callbacks.current.onUnavailable();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    const root = new THREE.Group();
    scene.add(root);
    const pointer3 = new THREE.Vector3(100, 100, 100);
    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uImpulse: { value: 0 },
      uTravel: { value: 0 },
      uRelease: { value: 0 },
      uVelocity: { value: 0 },
      uFilament: { value: 0 },
      uOffset: { value: 0 },
      uPointer: { value: pointer3 },
    };
    const geometry = ribbonGeometry();
    const material = new THREE.ShaderMaterial({
      vertexShader: ribbonVertex,
      fragmentShader: goldFragment,
      uniforms,
      side: THREE.DoubleSide,
    });
    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.frustumCulled = false;
    root.add(sculpture);
    const filamentGeometry = new ParametricGeometry(
      (u, v, target) => target.set(u, v, u),
      240,
      6,
    );
    const filamentMaterials = [0.7, 2.8].map(
      (offset) =>
        new THREE.ShaderMaterial({
          vertexShader: ribbonVertex,
          fragmentShader: filamentFragment,
          uniforms: {
            ...uniforms,
            uFilament: { value: 1 },
            uOffset: { value: offset },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        }),
    );
    const filaments = filamentMaterials.map((material) => {
      const mesh = new THREE.Mesh(filamentGeometry, material);
      mesh.frustumCulled = false;
      root.add(mesh);
      return mesh;
    });
    const count = window.innerWidth < 700 ? 10 : 18;
    const fragmentGeometry = new THREE.IcosahedronGeometry(1, 1);
    const fragmentMaterial = new THREE.ShaderMaterial({
      vertexShader: fragmentVertex,
      fragmentShader: goldFragment,
    });
    const fragments = new THREE.InstancedMesh(
      fragmentGeometry,
      fragmentMaterial,
      count,
    );
    fragments.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    fragments.frustumCulled = false;
    root.add(fragments);
    let randomSeed = 27182;
    const random = () => {
      randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
      return randomSeed / 4294967296;
    };
    const particleCount = window.innerWidth < 700 ? 1800 : 3600;
    const positions = new Float32Array(particleCount * 3);
    const data = new Float32Array(particleCount * 4);
    for (let i = 0; i < particleCount; i++) {
      positions.set(
        [(random() - 0.5) * 2, (random() - 0.5) * 2, (random() - 0.5) * 2],
        i * 3,
      );
      data.set([random(), random(), random(), random()], i * 4);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    dustGeometry.setAttribute("aData", new THREE.BufferAttribute(data, 4));
    const dustMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        ...uniforms,
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    dust.frustumCulled = false;
    root.add(dust);
    const dummy = new THREE.Object3D();
    const target = new THREE.Vector3();
    const look = new THREE.Vector3();
    const pointer = new THREE.Vector2();
    const easedPointer = new THREE.Vector2();
    const neutralPointer = new THREE.Vector2();
    let elapsed = 0,
      lastDraw = 0,
      clickTime = -10000;
    let dirty = true;
    let lastDrawProgress = -1;
    let wasReacting = false;
    let visible = true,
      destroyed = false,
      contextLost = false,
      ready = false;
    let lastReduced = state.current.reducedMotion;
    let mobile = window.innerWidth < 700;

    function wake() {
      dirty = true;
      state.current.invalidate();
    }
    function resize() {
      const width = host!.clientWidth,
        height = host!.clientHeight;
      if (!width || !height) return;
      mobile = width < 700;
      camera.aspect = width / height;
      camera.fov = mobile ? 55 : 42;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      wake();
    }
    function render(now: number, dt: number): boolean {
      if (destroyed || contextLost || !visible || document.hidden) return false;
      const reduced = state.current.reducedMotion;
      const { progress, velocity } = state.current;
      const moving =
        Math.abs(velocity) > 0.0001 ||
        progress !== state.current.targetProgress;
      const pointerMoving =
        !reduced && easedPointer.distanceTo(pointer) > 0.001;
      const reacting = now - clickTime < 1800;
      if (wasReacting !== reacting) {
        wasReacting = reacting;
        dirty = true;
      }
      if (reduced !== lastReduced) {
        lastReduced = reduced;
        dirty = true;
      }
      if (!reduced) elapsed += dt;
      // Continuous ambient movement at 30 Hz; direct manipulation uses every
      // display frame. Hidden/offscreen scenes do not keep the clock alive.
      if (
        !dirty &&
        progress === lastDrawProgress &&
        !moving &&
        !pointerMoving &&
        !reacting &&
        now - lastDraw < 1000 / 30 - 1
      )
        return !reduced;
      lastDraw = now;
      dirty = false;
      const flight = sampleFlight(progress, reduced);
      const { middle, release: released, turn, cameraTravel } = flight;
      const travel = flight.travel * (reduced ? 0.65 : 1);
      easedPointer.lerp(
        reduced ? neutralPointer : pointer,
        1 - Math.exp(-4 * dt),
      );
      camera.position.set(
        middle * 1.6 +
          Math.sin(turn * 0.5) * 1.8 * cameraTravel +
          easedPointer.x * 0.4,
        0.5 +
          middle * 0.6 +
          flight.entrance * 0.9 * cameraTravel +
          easedPointer.y * 0.28,
        (mobile ? 16.8 : 14.2) -
          middle * 2.2 +
          released * 1.5 -
          flight.travel * (mobile ? 1.8 : 3.3) * cameraTravel,
      );
      look.set(middle * 0.7, 0.45, 0);
      camera.lookAt(look);
      root.position.set(
        middle * (mobile ? 1.3 : 3.25),
        mobile ? 1.25 + middle * 2 : 1.35,
        0,
      );
      root.rotation.set(
        0.28 +
          middle * 0.32 +
          Math.sin(turn) * 0.23 * cameraTravel +
          Math.sin(elapsed * 0.24) * 0.055,
        -0.28 +
          middle * 0.65 +
          turn +
          easedPointer.x * 0.1 +
          Math.sin(elapsed * 0.19) * 0.1,
        -0.2 + progress * 0.3 + Math.sin(turn * 0.5) * 0.18 * cameraTravel,
      );
      sculpture.rotation.z = Math.sin(elapsed * 0.21) * 0.12;
      filaments.forEach((mesh, i) => {
        mesh.rotation.z = Math.sin(elapsed * 0.18 + i) * 0.14;
      });
      // The final form opens around the words as the camera returns to centre.
      root.position.y -= released * (mobile ? 0.85 : 1.0);
      const age = THREE.MathUtils.clamp((now - clickTime) / 1800, 0, 1);
      const impulse =
        Math.sin(age * Math.PI) * Math.exp(-age * 2.5) * (reduced ? 1.1 : 2.8);
      uniforms.uTime.value = elapsed;
      uniforms.uProgress.value = progress;
      uniforms.uImpulse.value = impulse;
      uniforms.uTravel.value = travel;
      uniforms.uRelease.value = released;
      uniforms.uVelocity.value = THREE.MathUtils.clamp(velocity, -1.5, 1.5);
      if (reduced) pointer3.set(100, 100, 100);
      else
        pointer3.set(
          easedPointer.x * 7 - root.position.x,
          easedPointer.y * 4 - root.position.y,
          1,
        );
      for (let i = 0; i < count; i++) {
        const seed = (i * 0.61803398875) % 1;
        const t = (i / count) * Math.PI * 2 + elapsed * 0.085 + progress * 0.8;
        const radius = 3.7 + seed * 2.7 - middle * (1.4 + seed) + travel * 1.9;
        target.set(
          Math.cos(t) * radius,
          Math.sin(t) * radius * 0.68,
          Math.sin(t * 3) * (2.8 + travel * 2.2),
        );
        target.multiplyScalar(1 + impulse * 0.35 + released * 0.2);
        dummy.position.copy(target);
        dummy.rotation.set(
          t + elapsed * 0.07,
          seed * 6 + elapsed * 0.1,
          t * 0.8,
        );
        const size = (0.055 + seed * 0.13) * (1 - middle * 0.65);
        dummy.scale.set(size, size * (0.7 + seed * 0.65), size * 0.55);
        dummy.updateMatrix();
        fragments.setMatrixAt(i, dummy.matrix);
      }
      fragments.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      lastDrawProgress = progress;
      if (!ready) {
        ready = true;
        callbacks.current.onReady();
      }
      return !reduced || reacting || pointerMoving;
    }
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || state.current.reducedMotion) return;
      const rect = host!.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((event.clientY - rect.top) / rect.height) * 2,
      );
      wake();
    };
    const onLeave = () => {
      pointer.set(0, 0);
      wake();
    };
    let press: { x: number; y: number; id: number } | null = null;
    const onPress = (event: PointerEvent) => {
      if ((event.target as Element).closest("a,button") || event.button !== 0)
        return;
      press = { x: event.clientX, y: event.clientY, id: event.pointerId };
    };
    const onRelease = (event: PointerEvent) => {
      const start = press;
      press = null;
      if (
        !start ||
        start.id !== event.pointerId ||
        Math.hypot(event.clientX - start.x, event.clientY - start.y) > 9
      )
        return;
      clickTime = performance.now();
      wake();
    };
    const onCancel = () => {
      press = null;
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      callbacks.current.onUnavailable();
    };
    const onRestored = () => {
      contextLost = false;
      ready = false;
      wake();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) wake();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(host);
    const surface = host.parentElement!;
    surface.addEventListener("pointermove", onPointer, { passive: true });
    surface.addEventListener("pointerleave", onLeave);
    surface.addEventListener("pointerdown", onPress, { passive: true });
    window.addEventListener("pointerup", onRelease, { passive: true });
    window.addEventListener("pointercancel", onCancel);
    window.addEventListener("resize", resize);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    renderer.domElement.addEventListener("webglcontextrestored", onRestored);
    state.current.renderFrame = render;
    resize();
    wake();
    return () => {
      destroyed = true;
      if (state.current.renderFrame === render)
        state.current.renderFrame = null;
      observer.disconnect();
      visibilityObserver.disconnect();
      surface.removeEventListener("pointermove", onPointer);
      surface.removeEventListener("pointerleave", onLeave);
      surface.removeEventListener("pointerdown", onPress);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        onRestored,
      );
      fragments.dispose();
      geometry.dispose();
      material.dispose();
      filamentGeometry.dispose();
      filamentMaterials.forEach((material) => material.dispose());
      fragmentGeometry.dispose();
      fragmentMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [state]);
  return <div className="immersive-world" ref={hostRef} aria-hidden="true" />;
}
