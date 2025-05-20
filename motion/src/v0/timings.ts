export const FPS = 30;

// --- Durations (Based on original outline structure) ---
// Section 1: 4 slides ~4.5 mins = 270s = 8100 frames
export const S1_ORIG_SLIDE1_DURATION = 1800; // ~60s Title
export const S1_ORIG_SLIDE2_DURATION = 2100; // ~70s Familiar Face
export const S1_ORIG_SLIDE3_DURATION = 1800; // ~60s Hyperscript
export const S1_ORIG_SLIDE4_DURATION = 2400; // ~80s Transform
export const S1_ORIG_TOTAL = S1_ORIG_SLIDE1_DURATION + S1_ORIG_SLIDE2_DURATION + S1_ORIG_SLIDE3_DURATION + S1_ORIG_SLIDE4_DURATION; // 8100

// Section 2: 5 slides ~5 mins = 300s = 9000 frames
export const S2_ORIG_SLIDE5_DURATION = 1500; // ~50s Spec LOL
export const S2_ORIG_SLIDE6_DURATION = 1500; // ~50s Define Anything
export const S2_ORIG_SLIDE7_DURATION = 2400; // ~80s Transform JSON
export const S2_ORIG_SLIDE8_DURATION = 2400; // ~80s Transform YAML
export const S2_ORIG_SLIDE9_DURATION = 1200; // ~40s TSX Config
export const S2_ORIG_TOTAL = S2_ORIG_SLIDE5_DURATION + S2_ORIG_SLIDE6_DURATION + S2_ORIG_SLIDE7_DURATION + S2_ORIG_SLIDE8_DURATION + S2_ORIG_SLIDE9_DURATION; // 9000

// Section 3: 3 slides ~4 mins = 240s = 7200 frames
export const S3_ORIG_SLIDE10_DURATION = 1800; // ~60s Children Signature
export const S3_ORIG_SLIDE11_DURATION = 2700; // ~90s Nested YAML Example
export const S3_ORIG_SLIDE12_DURATION = 2700; // ~90s Handling Children Concept
export const S3_ORIG_TOTAL = S3_ORIG_SLIDE10_DURATION + S3_ORIG_SLIDE11_DURATION + S3_ORIG_SLIDE12_DURATION; // 7200

// Section 4: 3 slides ~4 mins = 240s = 7200 frames
export const S4_ORIG_SLIDE13_DURATION = 2100; // ~70s Builder Recap
export const S4_ORIG_SLIDE14_DURATION = 2700; // ~90s JSX as Builder
export const S4_ORIG_SLIDE15_DURATION = 2400; // ~80s Table
export const S4_ORIG_TOTAL = S4_ORIG_SLIDE13_DURATION + S4_ORIG_SLIDE14_DURATION + S4_ORIG_SLIDE15_DURATION; // 7200

// Section 5: 3 slides ~3 mins = 180s = 5400 frames
export const S5_ORIG_SLIDE16_DURATION = 2400; // ~80s Brainmap
export const S5_ORIG_SLIDE17_DURATION = 1500; // ~50s CLI Example
export const S5_ORIG_SLIDE18_DURATION = 1500; // ~50s Q&A
export const S5_ORIG_TOTAL = S5_ORIG_SLIDE16_DURATION + S5_ORIG_SLIDE17_DURATION + S5_ORIG_SLIDE18_DURATION; // 5400

// --- Cumulative Start Times ---
export const S1_ORIG_START = 0;
export const S2_ORIG_START = S1_ORIG_START + S1_ORIG_TOTAL; // 8100
export const S3_ORIG_START = S2_ORIG_START + S2_ORIG_TOTAL; // 17100
export const S4_ORIG_START = S3_ORIG_START + S3_ORIG_TOTAL; // 24300
export const S5_ORIG_START = S4_ORIG_START + S4_ORIG_TOTAL; // 31500

// --- Total Duration ---
export const TOTAL_DURATION_ORIG_IN_FRAMES = S5_ORIG_START + S5_ORIG_TOTAL; // 36900 frames (~20.5 mins)
