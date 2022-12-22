import React, { useState, Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { useAnimatedLayout } from "foundations/chronology/layouts/hooks";

function updateInstancedMeshMaterials({ mesh, data }) {
  const scratchObject3D = new THREE.Object3D();

  if (!mesh) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const { position, rotation } = data[i];
    scratchObject3D.scale.setScalar(0.01);
    scratchObject3D.position.set(position.x, position.y, position.z);
    scratchObject3D.rotation.set(rotation.x, rotation.y, rotation.z);
    scratchObject3D.updateMatrix();

    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

export const Model = ({ layout, prevLayout, progress, data, realTimeMode }) => {
  const [loaded, setLoaded] = useState(false);
  const object = useLoader(
    PLYLoader,
    "/assets/models/chronology/tower.ply",
    (loader) => {
      setLoaded(true);
    },
    (xhr) => {
      const loadedStatus = xhr.loaded / xhr.total;
    }
  );
  object.computeVertexNormals();
  const meshRef = useRef(null);

  useAnimatedLayout({
    realTimeProgress: progress,
    data,
    layoutIdx: layout,
    prevLayout: prevLayout,
    onChange: () => {
      updateInstancedMeshMaterials({ mesh: meshRef.current, data });
    },
  });

  useEffect(() => {
    if (loaded) {
      updateInstancedMeshMaterials({ mesh: meshRef.current, data });
    }
  }, [data, layout, realTimeMode, loaded]);

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, data.length]} geometry={object}>
        <meshStandardMaterial vertexColors={true} metalness={0.7} roughness={0.3} />
      </instancedMesh>
    </>
  );
};
