import * as THREE from "three";

// Convert a Euclidean vector to homogeneous coordinates.
const e2h = (e: THREE.Vector2): THREE.Vector3 => new THREE.Vector3(e.x, e.y, 1);

// Convert homogeneous coordinates to Euclidean vector.
const h2e = (h: THREE.Vector3): THREE.Vector2 =>
  new THREE.Vector2(h.x / h.z, h.y / h.z);
