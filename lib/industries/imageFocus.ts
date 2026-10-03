/** Per-segment crop focus so thumbnails read well in cards and the mega-menu. */
export const SEGMENT_IMAGE_FOCUS: Record<string, string> = {
  "die-casting": "object-cover object-[center_42%]",
  forging: "object-cover object-center",
  "heat-treatment": "object-cover object-center",
  "rubber-moulding": "object-cover object-[28%_center]",
  "eaf-induction": "object-cover object-center",
  rolling: "object-cover object-center",
  "forging-foundry": "object-cover object-center",
  "precision-machining": "object-cover object-center",
  kiln: "object-cover object-[center_45%]",
  cleanrooms: "object-cover object-[center_35%]",
};

export function getSegmentImageFocus(segmentId: string) {
  return SEGMENT_IMAGE_FOCUS[segmentId] ?? "object-cover object-center";
}
