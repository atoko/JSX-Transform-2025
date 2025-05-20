
export const FPS = 30;

// --- Durations (Based on v3 outline structure) ---

// Section 1: 4 slides ~4 mins = 240s = 7200 frames
export const S1_V3_SLIDE1_DURATION = 1500; // ~50s Title
export const S1_V3_SLIDE2_DURATION = 1800; // ~60s Usual Suspects
export const S1_V3_SLIDE3_DURATION = 1800; // ~60s Syntactic Sugar
export const S1_V3_SLIDE4_DURATION = 2100; // ~70s Transform
export const S1_V3_TOTAL = S1_V3_SLIDE1_DURATION + S1_V3_SLIDE2_DURATION + S1_V3_SLIDE3_DURATION + S1_V3_SLIDE4_DURATION; // 7200

// Section 2: 3 slides ~4 mins = 240s = 7200 frames
export const S2_V3_SLIDE5_DURATION = 1800; // ~60s TSX Config
export const S2_V3_SLIDE6_DURATION = 2700; // ~90s Transform JSON
export const S2_V3_SLIDE7_DURATION = 2700; // ~90s Transform YAML
export const S2_V3_TOTAL = S2_V3_SLIDE5_DURATION + S2_V3_SLIDE6_DURATION + S2_V3_SLIDE7_DURATION; // 7200

// Section 3: 3 slides ~5 mins = 300s = 9000 frames
export const S3_V3_SLIDE8_DURATION = 1500; // ~50s Nesting Importance
export const S3_V3_SLIDE10_DURATION = 3000; // ~100s Nested YAML Revisited
export const S3_V3_TOTAL = S3_V3_SLIDE8_DURATION + S3_V3_SLIDE10_DURATION; // 9000

// Section 4: 4 slides ~5 mins = 300s = 9000 frames
export const S4_V3_SLIDE11_DURATION = 1200; // ~40s Builder Recap
export const S4_V3_SLIDE12_DURATION = 1800; // ~60s Strategy (JSX -> Comp -> Builder)
export const S4_V3_SLIDE13_DURATION = 3000; // ~100s GHA Goal (Show the nice JSX)
export const S4_V3_SLIDE14_DURATION = 3000; // ~100s How it Works (Component Code)
export const S4_V3_TOTAL = S4_V3_SLIDE11_DURATION + S4_V3_SLIDE12_DURATION + S4_V3_SLIDE13_DURATION + S4_V3_SLIDE14_DURATION; // 9000

// Section 5: 3 slides ~3 mins = 180s = 5400 frames
export const S5_V3_SLIDE15_DURATION = 2400; // ~80s Summary Brainmap
export const S5_V3_SLIDE16_DURATION = 1500; // ~50s Beyond UI/YAML
export const S5_V3_SLIDE17_DURATION = 1500; // ~50s Q&A / Call to Action
export const S5_V3_TOTAL = S5_V3_SLIDE15_DURATION + S5_V3_SLIDE16_DURATION + S5_V3_SLIDE17_DURATION; // 5400

// --- Cumulative Start Times ---
export const S1_V3_START = 0;
export const S2_V3_START = S1_V3_START + S1_V3_TOTAL; // 7200
export const S3_V3_START = S2_V3_START + S2_V3_TOTAL; // 14400
export const S4_V3_START = S3_V3_START + S3_V3_TOTAL; // 23400
export const S5_V3_START = S4_V3_START + S4_V3_TOTAL; // 32400

// --- Total Duration ---
export const TOTAL_DURATION_V3_IN_FRAMES = S5_V3_START + S5_V3_TOTAL; 

let previous = 0;
let total = 0;
export const SEQUENCE = [
	  S1_V3_SLIDE1_DURATION, 
	  S1_V3_SLIDE2_DURATION, 
	  S1_V3_SLIDE3_DURATION, 
	  S1_V3_SLIDE4_DURATION, 
	  S2_V3_SLIDE5_DURATION, 
	  S2_V3_SLIDE6_DURATION, 
	  S2_V3_SLIDE7_DURATION,
	  S3_V3_SLIDE8_DURATION,
	  S3_V3_SLIDE10_DURATION,
	  S4_V3_SLIDE11_DURATION,
	  S4_V3_SLIDE12_DURATION,
	  S4_V3_SLIDE13_DURATION,
	  S4_V3_SLIDE14_DURATION,
	  S5_V3_SLIDE15_DURATION,
	  S5_V3_SLIDE16_DURATION,
	  S5_V3_SLIDE17_DURATION,
].map((current) => {
	previous = total;
	total += current;
	return previous;
});