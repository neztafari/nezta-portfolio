import type { Ref } from "react";

// The interior used by the Unity tour preview and the homepage intro: CSS 3D planes in cqi,
// so the scene scales with its container. The camera element gets its pose from the caller:
// TourViewport animates it (.tour-cam), the intro holds one still pose (.tour-cam.still).

type Face = { c: string; w: number; h: number; t: string };

// A plane w×h (in cqi) centered at x, y, z. Floor is at y = 20, ceiling at y = -30.
const face = (c: string, w: number, h: number, x: number, y: number, z: number, rot = ""): Face => ({
  c,
  w,
  h,
  t: `translate3d(${x}cqi, ${y}cqi, ${z}cqi) ${rot}`,
});

// An open-bottom box standing on the floor (or on yb), w along x, d along z, h tall.
function box(c: string, cx: number, cz: number, w: number, d: number, h: number, yb = 20): Face[] {
  const yt = yb - h;
  const ym = yb - h / 2;
  return [
    face(`${c} top`, w, d, cx, yt, cz, "rotateX(90deg)"),
    face(`${c} front`, w, h, cx, ym, cz + d / 2),
    face(`${c} side`, w, h, cx, ym, cz - d / 2),
    face(`${c} side`, d, h, cx - w / 2, ym, cz, "rotateY(90deg)"),
    face(`${c} side`, d, h, cx + w / 2, ym, cz, "rotateY(90deg)"),
  ];
}

const faces: Face[] = [
  // main room, x -60..60, z +20..-160
  face("floor", 120, 180, 0, 20, -70, "rotateX(90deg)"),
  face("ceil", 120, 180, 0, -30, -70, "rotateX(90deg)"),
  face("wall", 180, 50, -60, -5, -70, "rotateY(90deg)"),
  face("wall", 180, 50, 60, -5, -70, "rotateY(90deg)"),
  // back wall with a doorway at x 6..34
  face("wall back", 66, 50, -27, -5, -160),
  face("wall back", 26, 50, 47, -5, -160),
  face("wall back", 28, 12, 20, -24, -160),
  // second room seen through the doorway
  face("floor two", 60, 60, 20, 20, -190, "rotateX(90deg)"),
  face("ceil", 60, 60, 20, -30, -190, "rotateX(90deg)"),
  face("wall two", 60, 50, -10, -5, -190, "rotateY(90deg)"),
  face("wall two", 60, 50, 50, -5, -190, "rotateY(90deg)"),
  face("wall two back", 60, 50, 20, -5, -220),
  face("art", 18, 12, 20, -10, -219.5),
  // window on the left wall and the light it throws on the floor
  face("sun", 60, 52, -34, 19.8, -80, "rotateX(90deg)"),
  face("window", 44, 22, -59.6, -9, -80, "rotateY(90deg)"),
  face("rug", 30, 44, 30, 19.8, -95, "rotateX(90deg)"),
  // furniture
  ...box("cab", -54, -135, 12, 18, 30),
  ...box("tbl", 28, -95, 6, 12, 7),
  ...box("tbl", 28, -95, 12, 20, 1.6, 13),
  ...box("sofa", 49, -95, 14, 32, 7),
  ...box("sofa", 56, -95, 4, 40, 17),
  ...box("sofa", 49, -77, 14, 4, 11),
  ...box("sofa", 49, -113, 14, 4, 11),
];

export default function TourRoom({ camRef, still }: { camRef?: Ref<HTMLDivElement>; still?: boolean }) {
  return (
    <div className="tour-scene">
      <div className={`tour-cam${still ? " still" : ""}`} ref={camRef}>
        {faces.map((f, i) => (
          <i
            key={i}
            className={`tf ${f.c}`}
            style={{ width: `${f.w}cqi`, height: `${f.h}cqi`, left: `${-f.w / 2}cqi`, top: `${-f.h / 2}cqi`, transform: f.t }}
          />
        ))}
      </div>
    </div>
  );
}
