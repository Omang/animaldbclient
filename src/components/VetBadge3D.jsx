import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VetBadge3D = ({ size = 64 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Medical Diamond/Cross 3D Node
    const geometry = new THREE.OctahedronGeometry(1.2, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x5eead4, linewidth: 2 })
    );
    scene.add(wireframe);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2dd4bf, 3, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      mesh.rotation.y = time * 1.2;
      mesh.rotation.x = time * 0.6;
      wireframe.rotation.y = mesh.rotation.y;
      wireframe.rotation.x = mesh.rotation.x;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      className="inline-flex items-center justify-center shrink-0"
    />
  );
};

export default VetBadge3D;
