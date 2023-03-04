//three
import { useEffect, useState } from "react";
import { extend, Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function save(blob, filename) {
  var link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  link.remove();
}

export default function Exporter({ triggerExport = true, saveGlb = false }) {
  const scene = useThree((state) => state.scene);

  const exporter = new GLTFExporter();

  const handleExport = () => {
    console.log(scene);

    exporter.parse(
      scene,
      (result) => {
        console.log(result);
        if (saveGlb) {
          saveArrayBuffer(result, "scene.glb");
        } else {
          saveString(JSON.stringify(result, null, 2), "scene.gltf");
        }
      },
      { binary: saveGlb, trs: true, onlyVisible: true }
    );
  };

  useEffect(() => {
    if (triggerExport) {
      handleExport();
    }
  }, [triggerExport]);
  return null;
}
