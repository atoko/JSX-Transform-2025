import { Fragment, type PropsWithChildren } from 'react';
import {
	AbsoluteFill,
	Composition,
	Sequence,
} from 'remotion';
import { z } from 'zod';
import fig5_ from "./figure/5__Summary.png";
import { Section1_V3 } from './section/Section_1.tsx';
import { Section2_V3 } from './section/Section_2.tsx';
import { Section3_V3 } from './section/Section_3.tsx';
import { Section4_V3 } from './section/Section_4.tsx';
import "./styles.css";
import * as Timings from './timings';
import { SEQUENCE } from './timings';
import { seek } from '@remotion/studio';

export const MyCompSchemaV3 = z.object({
	titleText: z.string(),
	subtitleText: z.string(),
	authorName: z.string(),
});

// Standard Video properties
const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;


export const RemotionRoot: React.FC = () => {
	return (
		<Fragment>
			<Composition
				id="JSX-Lightning-Talk-v3"
				component={MyVideoV3} 
				durationInFrames={Timings.TOTAL_DURATION_V3_IN_FRAMES}
				fps={Timings.FPS}
				width={VIDEO_WIDTH}
				height={VIDEO_HEIGHT}
				defaultProps={{
					titleText: 'JSX: More Than Meets the Eye',
					subtitleText: 'How <AngleBrackets /> can build more than just UI',
					authorName: 'Pedro Cardona',
				}}
			/>
		</Fragment>
	);
};

export const SequencePlayback = (() => {
	let current = 0;
	return {
		next: () => {
			if (current >= SEQUENCE.length - 1) {
				current = 0;
			} else {
				current++;
			}
			console.log(SEQUENCE[current]);
			seek(SEQUENCE[current]);
		},
		previous: () => {
			if (current <= 0) {
				current = SEQUENCE.length - 1;
			} else {
				current--;
			}
			console.log(SEQUENCE[current]);
			seek(SEQUENCE[current]);
		}
	}
})()

export const SlideContent: React.FC<{
	title: string;
	children?: React.ReactNode;
	backgroundColor?: string;
	titleSize?: number;
	contentSize?: number;
}> = ({
	title,
	children,
	backgroundColor = '#f8f9fa',
}) => {
	const PlayerButton = ({ 
		children,
		onClick
	}: PropsWithChildren<{ onClick: () => void }> ) => {
		return <button
			className={clsx(
				"bg-gray-200",
				"rounded-full",
				"w-10",
				"p-2",
				"border",
				"border-gray-300",
				"hover:bg-gray-300",
				"transition-colors",
				"duration-200",
			)}			
			onClick={onClick}
		>
			{children}
		</button>
	}
	return (
		<AbsoluteFill
			className={clsx("pt-4", "pl-6")}
			style={{
				backgroundColor: backgroundColor,
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
			}}
		>
			<h1 
				className={clsx("mb-5", "font-bold", "text-2xl")}
			>
				{title}
			</h1>
			<div
				className={clsx("text-gray-800", "leading-relaxed")} 
			>
				{children}
			</div>
			<footer
				className={clsx(
					"flex",
					"gap-2",
					"absolute",
					"top-2",
					"right-2",
				)}
			>
				<PlayerButton
					onClick={() => {
						SequencePlayback.previous();
					}}
				>{"◀︎"}</PlayerButton>
				<PlayerButton
					onClick={() => {
						SequencePlayback.next();
					}}
				>{"▶"}</PlayerButton>

			</footer>
		</AbsoluteFill>
	);
};
export function Greeting({ name }: { name: string}) { 
	return <h1>Hello, {name}!</h1>; // <h1> is a JSX element
}

export function WelcomePage() {
	const details = { name: "Pedro" }
	return <div>
		<Greeting name={details.name} /> // A functional JSX component
		<p>Welcome to the site!</p>
	</div>
}
// --- Section Components (Based on v3 Outline) ---
export const clsx = (...props: string[]) => {
	return props.filter(Boolean).join(' ');
}


// Section 5: Recap & What's Next
const Section5_V3: React.FC = () => {
	const slide16Start = Timings.S5_V3_SLIDE15_DURATION;
	// const slide17Start = slide16Start + Timings.S5_V3_SLIDE16_DURATION;

	return (
		<Fragment>
			{/* Slide 15: Summary */}
			<Sequence
				from={0}
				durationInFrames={Timings.S5_V3_SLIDE15_DURATION}
				name="S5 Slide 15: Summary"
			>
				<SlideContent title="Summary: It's All About the Transform">
					<div
						className={
							clsx("flex", "gap-5")
						}
					>
						<ul style={{ listStyleType: 'circle', marginLeft: '2em' }}>
							<li>React Elements (DOM/Native)</li>
							<li>Video Instructions (Remotion)</li>
							<li>Builder Instances / Config Objects (GHA Example)</li>
							<li>JSON, YAML, etc.</li>
						</ul>
						<img 
							className={clsx("w-120", "h-100", "mx-20")}
							src={fig5_} 
						/>					
					</div>
				</SlideContent>
			</Sequence>

			{/* Slide 17 */}
			<Sequence
				from={slide16Start}
				durationInFrames={Timings.S5_V3_SLIDE17_DURATION + Timings.S5_V3_SLIDE17_DURATION}
				name="S5 Slide 17: Q&A"
			>``
				<SlideContent 
					title={"Q&A"}
				>
					<span
						className={clsx("text-2xl")}
					>

					<p>Thank you for your questions!</p>
					<div
						className={clsx( "border", "p-2", "leading-loose", "max-w-80", "gap-4", "items-center", "mt-4")}
						>
					<h2>Pedro Cardona Noriega</h2>
					<h3>pedro@evermagica.com</h3>
					<h4
						className={clsx("pt-2", "text-right", "text-sm", "hover:text-blue-400", "text-gray-500", "place-self-end")}
						>https://github.com/atoko</h4>
					</div>
					</span>
				</SlideContent>
			</Sequence>
		</Fragment>
	);
};


// --- Main Video Component ---
export const MyVideoV3: React.FC<z.infer<typeof MyCompSchemaV3>> = (props) => {
	// Optional: Access video config if needed for dynamic calculations
	// const { fps, durationInFrames, width, height } = useVideoConfig();

	return (
		// Use AbsoluteFill to ensure content fills the screen
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			{/* Optional: Add background audio track */}
			{/* <Audio src={staticFile("background_music.mp3")} volume={0.1} loop /> */}

			{/* Render Section 1 */}
			<Sequence
				from={Timings.S1_V3_START}
				durationInFrames={Timings.S1_V3_TOTAL}
				name="Section 1: Intro & Basics"
			>
				<Section1_V3 {...props} /> {/* Pass props down */}
			</Sequence>

			{/* Render Section 2 */}
			<Sequence
				from={Timings.S2_V3_START}
				durationInFrames={Timings.S2_V3_TOTAL}
				name="Section 2: Configuration & Simple Examples"
			>
				<Section2_V3 />
			</Sequence>

			{/* Render Section 3 */}
			<Sequence
				from={Timings.S3_V3_START}
				durationInFrames={Timings.S3_V3_TOTAL}
				name="Section 3: Leaf Nodes"
				>
				<Section3_V3 />
			</Sequence>

			{/* Render Section 4 */}
			<Sequence
				from={Timings.S4_V3_START}
				durationInFrames={Timings.S4_V3_TOTAL}
				name="Section 4: Case Study - GHA Builder"
			>
				<Section4_V3 />
			</Sequence>

			{/* Render Section 5 */}
			<Sequence
				from={Timings.S5_V3_START}
				durationInFrames={Timings.S5_V3_TOTAL}
				name="Section 5: Recap & Next Steps"
			>
				<Section5_V3 />
			</Sequence>
		</AbsoluteFill>
	);
};
