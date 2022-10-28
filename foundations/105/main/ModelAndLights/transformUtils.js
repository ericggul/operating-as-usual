const sigmoid = ({ centre, descend }, t) => 1 / (1 + Math.exp((descend ? 1 : -1) * (t - centre) * 7));
const VAL = 0.9706877692486436;
//mesh scale calculators
function meshScaleA(time) {
  if (time <= 2) {
    return VAL;
  }
  if (time > 4) {
    return sigmoid({ centre: 4.5, descend: true }, time);
  } else {
    return null;
  }
}
function meshScaleB(time) {
  if (time < 1) {
    return sigmoid({ centre: 0.5, descend: false }, time) * 1.15;
  } else if (time <= 3) {
    return VAL * 1.15;
  } else if (time > 4 && time <= 5) {
    return sigmoid({ centre: 4.5, descend: true }, time) * 1.15;
  } else {
    return null;
  }
}
function meshScaleC(time) {
  if (time < 2) {
    return 1 - VAL;
  } else if (time < 3) {
    return sigmoid({ centre: 2.5, descend: false }, time);
  } else {
    return VAL;
  }
}
function meshScaleD(time) {
  if (time < 2) {
    return 1 - VAL;
  } else if (time < 3) {
    return sigmoid({ centre: 2.5, descend: false }, time);
  } else if (time > 4 && time <= 5) {
    return sigmoid({ centre: 4.5, descend: true }, time);
  } else {
    return null;
  }
}
function meshScaleE(time) {
  if (time < 1) {
    return 1 - VAL;
  } else if (time < 2) {
    return sigmoid({ centre: 1.5, descend: false }, time);
  } else if (time > 4 && time <= 5) {
    return sigmoid({ centre: 4.5, descend: true }, time);
  } else {
    return null;
  }
}

export const scaleArray = [meshScaleA, meshScaleB, meshScaleC, meshScaleD, meshScaleE];

function meshAnimateA(time, delta, state, mesh) {
  if (state === 2) {
    mesh.rotation.x += delta * 0.3;
  } else if (state === 3) {
    mesh.rotation.x += delta * 1.5;
    mesh.position.z += Math.sin(time * 3.1) * 0.01;
  } else if (state === 4) {
    mesh.rotation.x += delta * 1.7;
    mesh.rotation.y += delta * 1.3;
    mesh.rotation.z -= delta;
    mesh.position.z += Math.sin(time * 3.1) * 0.02;
    mesh.scale.x += Math.sin(time * 2.1) * 0.015;
  }
}

function meshAnimateB(time, delta, state, mesh) {
  if (state === 2) {
    mesh.rotation.y -= delta * 0.6;
  } else if (state === 3) {
    mesh.rotation.y -= delta * 0.4;
    mesh.position.z -= Math.sin(time * 1.3) * 0.01;
    mesh.position.y -= Math.sin(time * 1.3) * 0.01;
    let scaleIncrement = Math.sin(time * 1.7) * 0.01;
    mesh.scale.x += scaleIncrement;
    mesh.scale.y += scaleIncrement;
    mesh.scale.z += scaleIncrement;
  } else if (state === 4) {
    mesh.rotation.y -= delta * 1.7;
    mesh.rotation.x += delta * 1.5;
    mesh.position.z -= Math.sin(time * 1.3) * 0.01;
    mesh.position.y -= Math.sin(time * 1.3) * 0.01;
    let scaleIncrement = Math.sin(time * 1.7) * 0.01;
    mesh.scale.x += scaleIncrement;
    mesh.scale.y += scaleIncrement;
    mesh.scale.z += scaleIncrement;
  }
}

function meshAnimateC(time, delta, state, mesh) {
  if (state === 4) {
    mesh.rotation.x += delta * 5;
  }
}

function meshAnimateD(time, delta, state, mesh) {
  if (state === 3) {
    mesh.rotation.y += delta;
    mesh.position.x -= Math.sin(time * 1.3) * 0.01;
    mesh.scale.x += Math.sin(time * 3) * 0.02;
    mesh.scale.y += Math.sin(time * 0.5) * 0.007;
  } else if (state === 4) {
    mesh.rotation.y += delta * 1.3;
    mesh.rotation.z -= delta * 1.6;
    mesh.position.x -= Math.sin(time * 1.3) * 0.01;
    mesh.scale.x += Math.sin(time * 3) * 0.02;
    mesh.scale.y += Math.sin(time * 0.5) * 0.007;
  }
}

function meshAnimateE(time, delta, state, mesh) {
  if (state === 2) {
    mesh.rotation.z += delta * 0.4;
  } else if (state === 3) {
    mesh.rotation.z += delta;
    mesh.position.x -= Math.sin(time * 1.1) * 0.03;
    mesh.position.z += Math.sin(time) * 0.05;
  } else if (state === 4) {
    mesh.rotation.z += delta * 1.9;
    mesh.rotation.y -= delta * 2.3;
    mesh.position.x -= Math.sin(time * 1.1) * 0.05;
    mesh.position.z += Math.sin(time) * 0.05;
  }
}

export const animationArray = [meshAnimateA, meshAnimateB, meshAnimateC, meshAnimateD, meshAnimateE];
