
// --- Timing Constants (Frames at 30 FPS) ---
// Section 1: ~4 mins = 240s = 7200 frames
export const S1_SLIDE1_DURATION = 2100; // ~70s
export const S1_SLIDE2_DURATION = 2100; // ~70s
export const S1_SLIDE3_DURATION = 3000; // ~100s (More complex concept)
export const S1_TOTAL = S1_SLIDE1_DURATION + S1_SLIDE2_DURATION + S1_SLIDE3_DURATION; // 7200
// Section 2: ~5 mins = 300s = 9000 frames
export const S2_SLIDE4_DURATION = 2400; // ~80s
export const S2_SLIDE5_DURATION = 3600; // ~120s (Code examples)
export const S2_SLIDE6_DURATION = 3000; // ~100s (TS Config)
export const S2_TOTAL = S2_SLIDE4_DURATION + S2_SLIDE5_DURATION + S2_SLIDE6_DURATION; // 9000
// Section 3: ~5 mins = 300s = 9000 frames
export const S3_SLIDE7_DURATION = 2400; // ~80s
export const S3_SLIDE8_DURATION = 3600; // ~120s (Code examples)
export const S3_SLIDE9_DURATION = 3000; // ~100s (Trace)
export const S3_TOTAL = S3_SLIDE7_DURATION + S3_SLIDE8_DURATION + S3_SLIDE9_DURATION; // 9000
// Section 4: ~4 mins = 240s = 7200 frames
export const S4_SLIDE10_DURATION = 1800; // ~60s
export const S4_SLIDE11_DURATION = 2400; // ~80s
export const S4_SLIDE12_DURATION = 1800; // ~60s (Table)
export const S4_SLIDE13_DURATION = 1200; // ~40s (Fragment)
export const S4_TOTAL = S4_SLIDE10_DURATION + S4_SLIDE11_DURATION + S4_SLIDE12_DURATION + S4_SLIDE13_DURATION; // 7200
// Section 5: ~3 mins = 180s = 5400 frames
export const S5_SLIDE14_DURATION = 2400; // ~80s (Brainmap)
export const S5_SLIDE15_DURATION = 1500; // ~50s
export const S5_SLIDE16_DURATION = 1500; // ~50s (Q&A)
export const S5_TOTAL = S5_SLIDE14_DURATION + S5_SLIDE15_DURATION + S5_SLIDE16_DURATION; // 5400
// --- Cumulative Start Times ---
export const S1_START = 0;
export const S2_START = S1_START + S1_TOTAL; // 7200
export const S3_START = S2_START + S2_TOTAL; // 16200
export const S4_START = S3_START + S3_TOTAL; // 25200
export const S5_START = S4_START + S4_TOTAL; // 32400