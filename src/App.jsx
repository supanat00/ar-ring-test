import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function App() {
  const canvasRef = useRef();
  const gltfUrl = 'https://www.dropbox.com/s/jb8yx06dcehaxuk/ring.gltf?dl=0';


  useEffect(() => {
    let scene, camera, renderer;

    const init = () => {
      // Create Three.js scene, camera, and renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Load and display the model
      const loader = new GLTFLoader();
      loader.load(gltfUrl, function (gltf) {
        const model = gltf.scene;
        scene.add(model);
      });

      // Update camera aspect ratio on window resize
      window.addEventListener('resize', handleResize);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default App;
