import { useState, useEffect, useRef } from "react";
import { useSpring } from "@react-spring/three";
import { CONFIG } from "foundations/chronology/layouts/config";
import {
  circleLayout,
  sphereLayout,
  cylinderLayout,
  pyramidesLayout,
  cubeLayout,
  towerLayout,
  orbitalLayout,
  helixLayout,
  bellLayout,
  squareLayout,
  jarLayout,
  giwaLayout,
  randomLayout,
} from "foundations/chronology/layouts/layouts";

export function useLayout({ data, layoutIdx, update = true }) {
  useEffect(() => {
    if (update) {
      if (layoutIdx === 0) circleLayout(data);
      else if (layoutIdx === 1) sphereLayout(data);
      else if (layoutIdx === 2) cylinderLayout(data);
      else if (layoutIdx === 3) pyramidesLayout(data);
      else if (layoutIdx === 4) cubeLayout(data);
      else if (layoutIdx === 5) towerLayout(data);
      else if (layoutIdx === 6) orbitalLayout(data);
      else if (layoutIdx === 7) helixLayout(data);
      else if (layoutIdx === 8) bellLayout(data);
      else if (layoutIdx === 9) squareLayout(data);
      else if (layoutIdx === 10) jarLayout(data);
      else if (layoutIdx === 11) giwaLayout(data);
    }
  }, [data, layoutIdx, update]);
}

const DUMMY_DATA = new Array(8 ** 3).fill(0).map((_, id) => ({
  id,
  store: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
}));

export function useDoubleLayout({ data, layoutIdx, prevLayout, update = true }) {
  useEffect(() => {
    if (update) {
      if (prevLayout != null) {
        for (let i = 0; i < data.length; i++) {
          DUMMY_DATA[i].store = data[i].store;
        }
      } else {
        if (layoutIdx === 0) circleLayout(DUMMY_DATA);
        else if (layoutIdx === 1) sphereLayout(DUMMY_DATA);
        else if (layoutIdx === 2) cylinderLayout(DUMMY_DATA);
        else if (layoutIdx === 3) pyramidesLayout(DUMMY_DATA);
        else if (layoutIdx === 4) cubeLayout(DUMMY_DATA);
        else if (layoutIdx === 5) towerLayout(DUMMY_DATA);
        else if (layoutIdx === 6) orbitalLayout(DUMMY_DATA);
        else if (layoutIdx === 7) helixLayout(DUMMY_DATA);
        else if (layoutIdx === 8) bellLayout(DUMMY_DATA);
        else if (layoutIdx === 9) squareLayout(DUMMY_DATA);
        else if (layoutIdx === 10) jarLayout(DUMMY_DATA);
        else if (layoutIdx === 11) giwaLayout(DUMMY_DATA);
      }
    }
    if (update) {
      if (layoutIdx === 11) circleLayout(data);
      else if (layoutIdx === 0) sphereLayout(data);
      else if (layoutIdx === 1) cylinderLayout(data);
      else if (layoutIdx === 2) pyramidesLayout(data);
      else if (layoutIdx === 3) cubeLayout(data);
      else if (layoutIdx === 4) towerLayout(data);
      else if (layoutIdx === 5) orbitalLayout(data);
      else if (layoutIdx === 6) helixLayout(data);
      else if (layoutIdx === 7) bellLayout(data);
      else if (layoutIdx === 8) squareLayout(data);
      else if (layoutIdx === 9) jarLayout(data);
      else if (layoutIdx === 10) giwaLayout(data);
    }
  }, [data, layoutIdx, update]);
}

export function useRealTimeLayout({ data, layoutIdx, prevLayout, realTimeProgress }) {
  useDoubleLayout({
    data,
    layoutIdx,
    prevLayout,
    update: realTimeProgress != null && prevLayout !== layoutIdx,
  });

  useEffect(() => {
    if (realTimeProgress) {
      for (let i = 0; i < data.length; i++) {
        data[i].source.position.x = data[i].position ? data[i].store.position.x * realTimeProgress + DUMMY_DATA[i].store.position.x * (1 - realTimeProgress) : 0;
        data[i].source.position.y = data[i].store.position.y * realTimeProgress + DUMMY_DATA[i].store.position.y * (1 - realTimeProgress);
        data[i].source.position.z = data[i].store.position.z * realTimeProgress + DUMMY_DATA[i].store.position.z * (1 - realTimeProgress);
        data[i].source.rotation.x = data[i].store.rotation.x * realTimeProgress + DUMMY_DATA[i].store.rotation.x * (1 - realTimeProgress);
        data[i].source.rotation.y = data[i].store.rotation.y * realTimeProgress + DUMMY_DATA[i].store.rotation.y * (1 - realTimeProgress);
        data[i].source.rotation.z = data[i].store.rotation.z * realTimeProgress + DUMMY_DATA[i].store.rotation.z * (1 - realTimeProgress);

        let nextTimeProgress = Math.min(realTimeProgress + 1 / 60, 1);
        data[i].target.position.x = data[i].store.position.x * nextTimeProgress + DUMMY_DATA[i].store.position.x * (1 - nextTimeProgress);
        data[i].target.position.y = data[i].store.position.y * nextTimeProgress + DUMMY_DATA[i].store.position.y * (1 - nextTimeProgress);
        data[i].target.position.z = data[i].store.position.z * nextTimeProgress + DUMMY_DATA[i].store.position.z * (1 - nextTimeProgress);
        data[i].target.rotation.x = data[i].store.rotation.x * nextTimeProgress + DUMMY_DATA[i].store.rotation.x * (1 - nextTimeProgress);

        data[i].target.rotation.y = data[i].store.rotation.y * nextTimeProgress + DUMMY_DATA[i].store.rotation.y * (1 - nextTimeProgress);

        data[i].target.rotation.z = data[i].store.rotation.z * nextTimeProgress + DUMMY_DATA[i].store.rotation.z * (1 - nextTimeProgress);
      }
    }
  }, [data, layoutIdx, realTimeProgress]);
}

function useSourceTargetLayout({ data, layoutIdx, prevLayout, realTimeProgress }) {
  //If Not Real Time
  useLayout({ data, layoutIdx, update: realTimeProgress == null });
  useEffect(() => {
    if (!realTimeProgress) {
      for (let i = 0; i < data.length; i++) {
        data[i].source.position.x = data[i].position ? data[i].position.x : 0;
        data[i].source.position.y = data[i].position ? data[i].position.y : 0;
        data[i].source.position.z = data[i].position ? data[i].position.z : 0;
        data[i].source.rotation.x = data[i].rotation ? data[i].rotation.x : 0;
        data[i].source.rotation.y = data[i].rotation ? data[i].rotation.y : 0;
        data[i].source.rotation.z = data[i].rotation ? data[i].rotation.z : 0;
        data[i].target.position.x = data[i].store.position ? data[i].store.position.x : 0;
        data[i].target.position.y = data[i].store.position ? data[i].store.position.y : 0;
        data[i].target.position.z = data[i].store.position ? data[i].store.position.z : 0;
        data[i].target.rotation.x = data[i].store.rotation ? data[i].store.rotation.x : 0;
        data[i].target.rotation.y = data[i].store.rotation ? data[i].store.rotation.y : 0;
        data[i].target.rotation.z = data[i].store.rotation ? data[i].store.rotation.z : 0;
      }
    }
  }, [data, layoutIdx, realTimeProgress]);
  //If Real Time
  useRealTimeLayout({ data, layoutIdx, prevLayout, realTimeProgress });
}

function interpolateLayout({ data, progress }) {
  for (let i = 0; i < data.length; i++) {
    data[i].position.x = data[i].source.position.x * (1 - progress) + data[i].target.position.x * progress;
    data[i].position.y = data[i].source.position.y * (1 - progress) + data[i].target.position.y * progress;
    data[i].position.z = data[i].source.position.z * (1 - progress) + data[i].target.position.z * progress;
    data[i].rotation.x = data[i].source.rotation.x * (1 - progress) + data[i].target.rotation.x * progress;
    data[i].rotation.y = data[i].source.rotation.y * (1 - progress) + data[i].target.rotation.y * progress;
    data[i].rotation.z = data[i].source.rotation.z * (1 - progress) + data[i].target.rotation.z * progress;
  }
}

export function useAnimatedLayout({ realTimeProgress, data, layoutIdx, prevLayout, onChange }) {
  useSourceTargetLayout({ data, layoutIdx, prevLayout, realTimeProgress });
  const springLayoutUpdateCheck = useRef(layoutIdx);
  const timeProgress = useRef(realTimeProgress);

  const animProps = useSpring({
    from: { animProgress: 0 },
    to: { animProgress: 1 },
    config: realTimeProgress ? CONFIG[0].animation[0] : CONFIG[0].animation[1],
    reset: layoutIdx !== springLayoutUpdateCheck.current || realTimeProgress !== timeProgress.current,
    onChange: (animProgress) => {
      const progress = animProgress.value.animProgress;
      interpolateLayout({ data, progress });
      onChange({ progress });
    },
    onRest: () => {
      springLayoutUpdateCheck.current = layoutIdx;
      timeProgress.current = realTimeProgress;
    },
  });
  return animProps;
}
