import React from 'react';
import {Sequence, AbsoluteFill} from 'remotion';
import {z} from 'zod';
import * as Timings from './timings.js';

export const myCompSchema = z.object({
	titleText: z.string(),
	subtitleText: z.string(),
	authorName: z.string(),
});

const SlideContent: React.FC<{
	title: string;
	children?: React.ReactNode;
	backgroundColor?: string;
}> = ({title, children, backgroundColor = '#eee'}) => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: backgroundColor,
				padding: 50,
				fontFamily: 'sans-serif',
			}}
		>
			<h1 style={{fontSize: 80, marginBottom: 40}}>{title}</h1>
			<div style={{fontSize: 40}}>{children}</div>
		</AbsoluteFill>
	);
};

// Section 1: Setting the Stage
const Section1_Original: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText,
	subtitleText,
	authorName,
}) => {
	// Calculate relative start times within this section
	const slide2Start = Timings.S1_ORIG_SLIDE1_DURATION;
	const slide3Start = slide2Start + Timings.S1_ORIG_SLIDE2_DURATION;
	const slide4Start = slide3Start + Timings.S1_ORIG_SLIDE3_DURATION;

	return (
		<>
			{/* Slide 1: Title */}
			<Sequence from={0} durationInFrames={Timings.S1_ORIG_SLIDE1_DURATION} name="S1 Slide 1: Title">
				<SlideContent title={titleText} backgroundColor="#f0f0f0">
					<p>{subtitleText}</p>
					<p>{authorName}</p>
					{/* Add "magic" theme visuals? */}
				</SlideContent>
			</Sequence>

			{/* Slide 2: The Familiar Face */}
			<Sequence from={slide2Start} durationInFrames={Timings.S1_ORIG_SLIDE2_DURATION} name="S1 Slide 2: Familiar Face">
				<SlideContent title="We all know *this* JSX:">
					<pre><code>{`// Looks like HTML, right?\nconst element = <h1 className="greeting">Hello, world!</h1>;\n\n// Renders to the DOM via React\nReactDOM.render(element, document.getElementById('root'));`}</code></pre>
					<p>Talk: "We see JSX daily... it's *not* HTML..."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 3: A Blast From the Past */}
			<Sequence from={slide3Start} durationInFrames={Timings.S1_ORIG_SLIDE3_DURATION} name="S1 Slide 3: Hyperscript">
				<SlideContent title="Before JSX: Hyperscript & Functions">
					<pre><code>{`// Concept: h(type, props, ...children)\nh('h1', { className: 'greeting' }, 'Hello, world!');\nh('div', {}, h('span', {}, 'Content'));`}</code></pre>
					<p>Talk: "How did we describe UIs before?... Syntactic sugar..."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 4: The Magic Trick: The Transform */}
			<Sequence from={slide4Start} durationInFrames={Timings.S1_ORIG_SLIDE4_DURATION} name="S1 Slide 4: The Transform">
				<SlideContent title="JSX => ??? => Profit! (The Transform)">
					<p>{'<MyComponent prop="val" /> --> [Compiler] --> jsx(\'MyComponent\', { prop: \'val\' })'}</p>
					<p>Talk: "Browser doesn't understand {"<tag>"}... Compiler replaces syntax... *We* can define the function!"</p>
					<p>Goal: What *else* can `jsx` do?</p>
					{/* Add diagram animation */}
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 2: Beyond HTML - JSX as Pure Structure
const Section2_Original: React.FC = () => {
	// Calculate relative start times
	const slide6Start = Timings.S2_ORIG_SLIDE5_DURATION;
	const slide7Start = slide6Start + Timings.S2_ORIG_SLIDE6_DURATION;
	const slide8Start = slide7Start + Timings.S2_ORIG_SLIDE7_DURATION;
	const slide9Start = slide8Start + Timings.S2_ORIG_SLIDE8_DURATION;

	return (
		<>
			{/* Slide 5: JSX Spec? LOL. */}
			<Sequence from={0} durationInFrames={Timings.S2_ORIG_SLIDE5_DURATION} name="S2 Slide 5: Spec LOL">
				<SlideContent title={`The "Spec": It's... Flexible!`}>
					<p>Talk: "What does the spec *actually* say?... Doesn't specify return type! Just syntax + transform process."</p>
					<p>Key Insight: `jsx(type, props, ...children)` - what it *does* is up to the library.</p>
					<p>{`props => ???`} (Simplest form)</p>
				</SlideContent>
			</Sequence>

			{/* Slide 6: Example - Simple Component */}
			<Sequence from={slide6Start} durationInFrames={Timings.S2_ORIG_SLIDE6_DURATION} name="S2 Slide 6: Define Anything">
				<SlideContent title="Let's Define... Anything!">
					<pre><code>{`// Our desired JSX\n<Service name="auth-api" port={8080} protocol="http" />`}</code></pre>
					<p>Talk: "Imagine defining config... No children needed yet. This isn't HTML."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 7: Transform to JSON */}
			<Sequence from={slide7Start} durationInFrames={Timings.S2_ORIG_SLIDE7_DURATION} name="S2 Slide 7: Transform JSON">
				<SlideContent title="Target: JSON">
					<pre><code>{`// Our magical custom jsx function (conceptual)\nfunction jsonJsx(type, props) {\n  return { type: type, props: props };\n}\n\n// Resulting JSON:\n{\n  "type": "Service",\n  "props": { ... }\n}`}</code></pre>
					<p>Talk: "Configure transform to output JSON... No React, no HTML."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 8: Transform to YAML */}
			<Sequence from={slide8Start} durationInFrames={Timings.S2_ORIG_SLIDE8_DURATION} name="S2 Slide 8: Transform YAML">
				<SlideContent title="Target: YAML">
					<pre><code>{`// Another magical jsx function (conceptual)\nfunction yamlJsx(type, props) { ... }\n\n// Resulting YAML String:\nService:\n  name: "auth-api"\n  ...`}</code></pre>
					<p>Talk: "How about YAML? Same idea, different output format! *Same* JSX syntax."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 9: Practical Context - TSX Config */}
			<Sequence from={slide9Start} durationInFrames={Timings.S2_ORIG_SLIDE9_DURATION} name="S2 Slide 9: TSX Config">
				<SlideContent title="How TS Knows What `jsx` to Use">
					<pre><code>{`// tsconfig.json\n{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "react" // <-- Key!\n  }\n}`}</code></pre>
					<p>Talk: "`jsxImportSource` tells TS where to find `jsx`, `jsxs`, `Fragment`."</p>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 3: Introducing Children & Composition
const Section3_Original: React.FC = () => {
	const slide11Start = Timings.S3_ORIG_SLIDE10_DURATION;
	const slide12Start = slide11Start + Timings.S3_ORIG_SLIDE11_DURATION;

	return (
		<>
			{/* Slide 10: React's Full Signature */}
			<Sequence from={0} durationInFrames={Timings.S3_ORIG_SLIDE10_DURATION} name="S3 Slide 10: Children">
				<SlideContent title="Okay, But What About `<Outer><Inner /></Outer>`?">
					<p>Talk: "React's transform handles children. `jsx(type, props, ...children)`."</p>
					<pre><code>{`// React.createElement(type, props, ...children)\n// Modern React uses _jsx(...)`}</code></pre>
					<p>Talk: "Allows nesting, shines for tree structures."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 11: Revisiting YAML with Children */}
			<Sequence from={slide11Start} durationInFrames={Timings.S3_ORIG_SLIDE11_DURATION} name="S3 Slide 11: Nested YAML">
				<SlideContent title="Let's Build Nested YAML Config!">
					<pre><code>{`<AppConfig version="1.2">\n  <Database type="postgres" ... />\n  <Logging level="info">\n    <Target type="file" ... />\n  </Logging>\n</AppConfig>`}</code></pre>
					<p>Talk: "Remember config? Let's nest it. How can `yamlJsx` handle this?"</p>
				</SlideContent>
			</Sequence>

			{/* Slide 12: Improving the YAML Transform */}
			<Sequence from={slide12Start} durationInFrames={Timings.S3_ORIG_SLIDE12_DURATION} name="S3 Slide 12: Handling Children">
				<SlideContent title="Handling `children` in the Transform">
					<pre><code>{`// Super conceptual yamlJsx that handles children\nfunction yamlJsx(type, props, ...children) {\n  let node = { [type]: { ...props } };\n  if (children.length > 0) {\n    const childNodes = children.map(child => /* process */);\n    // Logic to merge childNodes...\n  }\n  return node;\n}`}</code></pre>
					<p>Talk: "`yamlJsx` needs to be smarter... Recursion or accumulation. Starts to look like..."</p>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 4: The Builder Pattern Connection
const Section4_Original: React.FC = () => {
	const slide14Start = Timings.S4_ORIG_SLIDE13_DURATION;
	const slide15Start = slide14Start + Timings.S4_ORIG_SLIDE14_DURATION;

	return (
		<>
			{/* Slide 13: Quick Pattern Recap: Builder */}
			<Sequence from={0} durationInFrames={Timings.S4_ORIG_SLIDE13_DURATION} name="S4 Slide 13: Builder Recap">
				<SlideContent title="Remember the Builder Pattern?">
					<p>Talk: "Design pattern for complex objects step-by-step. Separates construction."</p>
					<p>Analogy: Sandwich - `start().addBread()...getSandwich()`</p>
					<pre><code>{`class YamlBuilder {\n  constructor() { ... }\n  addNode(...) { ... }\n  addChild(...) { ... }\n  build() { ... }\n}`}</code></pre>
				</SlideContent>
			</Sequence>

			{/* Slide 14: JSX Transform as a Builder */}
			<Sequence from={slide14Start} durationInFrames={Timings.S4_ORIG_SLIDE14_DURATION} name="S4 Slide 14: JSX as Builder">
				<SlideContent title="Your `jsx` Function IS a Builder!">
					<p>Talk: "Think how `yamlJsx` could work:"</p>
					<p>`jsx('AppConfig', ..., dbChild, loggingChild)`</p>
					<p>Inside `jsx`:</p>
					<ol>
						<li>Start 'AppConfig' node (`builder.startNode`)</li>
						<li>Process `dbChild` (result of `jsx('Database', ...)`), add it (`builder.addChild`)</li>
						<li>Process `loggingChild` (result of `jsx('Logging', ...)`, which processed its children), add it.</li>
						<li>Return constructed structure.</li>
					</ol>
					<p>Key Idea: Each `jsx` call is a builder step.</p>
				</SlideContent>
			</Sequence>

			{/* Slide 15: Table: JSX Transform vs Builder */}
			<Sequence from={slide15Start} durationInFrames={Timings.S4_ORIG_SLIDE15_DURATION} name="S4 Slide 15: Table">
				<SlideContent title="Table: JSX Transform vs Builder">
					{/* Use Remotion table component or render an image/SVG of the table */}
          			<p>(Display the comparison table from the original outline here)</p>
          			{/* Example basic table structure */}
					<table border={1} style={{fontSize: '0.6em', borderCollapse: 'collapse', width: '100%'}}>
						<thead><tr><th>JSX Part</th><th>Builder Analogy</th><th>Example (`yamlJsx`)</th></tr></thead>
						<tbody>
							<tr><td>`type`</td><td>Start new object</td><td>`builder.startNode(type)`</td></tr>
							<tr><td>`props`</td><td>Configure object</td><td>`builder.setProps(props)`</td></tr>
							<tr><td>`...children`</td><td>Add sub-objects</td><td>`children.forEach(...)`</td></tr>
							<tr><td>Return value</td><td>Partial result</td><td>Partial object/string</td></tr>
						</tbody>
					</table>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 5: Recap & Your Turn
const Section5_Original: React.FC = () => {
	const slide17Start = Timings.S5_ORIG_SLIDE16_DURATION;
	const slide18Start = slide17Start + Timings.S5_ORIG_SLIDE17_DURATION;

	return (
		<>
			{/* Slide 16: Brainmap / Summary */}
			<Sequence from={0} durationInFrames={Timings.S5_ORIG_SLIDE16_DURATION} name="S5 Slide 16: Summary">
				<SlideContent title="JSX: It's Just Sugar for Trees!">
					<p>Center: JSX Syntax</p>
					<p> -&gt; Transform (Compiler)</p>
					<p> -&gt; `jsx(type, props, ...children)` Function</p>
					<p>   - React -&gt; DOM</p>
					<p>   - Custom jsonJsx -&gt; JSON</p>
					<p>   - Custom yamlJsx (Builder) -&gt; YAML</p>
					<p>   - Your own -&gt; Anything!</p>
					<p>Key Takeaway: Familiar syntax, transform function gives power.</p>
					{/* Add the brainmap visual */}
				</SlideContent>
			</Sequence>

			{/* Slide 17: Tiny Example - CLI Definition? */}
			<Sequence from={slide17Start} durationInFrames={Timings.S5_ORIG_SLIDE17_DURATION} name="S5 Slide 17: CLI Example">
				<SlideContent title="What Could *You* Build?">
					<pre><code>{`// Define CLI structure using JSX\n<CLI name="mytool" ...>\n  <Command name="process" ...>\n    <Arg name="input" ... />\n    <Flag name="verbose" ... />\n  </Command>\n</CLI>`}</code></pre>
					<p>Talk: "Imagine defining a CLI... Custom transform could create data structure."</p>
				</SlideContent>
			</Sequence>

			{/* Slide 18: Questions? Ideas? */}
			<Sequence from={slide18Start} durationInFrames={Timings.S5_ORIG_SLIDE18_DURATION} name="S5 Slide 18: Q&A">
				<SlideContent title="Questions? / What will YOU transform?">
					<p>Link to Slides/Demo/Contact Info</p>
					{/* Add QR code or links */}
				</SlideContent>
			</Sequence>
		</>
	);
};


// --- Main Video Component ---
export const MyVideoOriginal: React.FC<z.infer<typeof myCompSchema>> = (props) => {
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			{/* Render Section 1 */}
			<Sequence
				from={Timings.S1_ORIG_START}
				durationInFrames={Timings.S1_ORIG_TOTAL}
				name="Section 1: Setting the Stage"
			>
				<Section1_Original {...props} />
			</Sequence>

			{/* Render Section 2 */}
			<Sequence
				from={Timings.S2_ORIG_START}
				durationInFrames={Timings.S2_ORIG_TOTAL}
				name="Section 2: Beyond HTML"
			>
				<Section2_Original />
			</Sequence>

			{/* Render Section 3 */}
			<Sequence
				from={Timings.S3_ORIG_START}
				durationInFrames={Timings.S3_ORIG_TOTAL}
				name="Section 3: Children & Composition"
			>
				<Section3_Original />
			</Sequence>

			{/* Render Section 4 */}
			<Sequence
				from={Timings.S4_ORIG_START}
				durationInFrames={Timings.S4_ORIG_TOTAL}
				name="Section 4: Builder Pattern Connection"
			>
				<Section4_Original />
			</Sequence>

			{/* Render Section 5 */}
			<Sequence
				from={Timings.S5_ORIG_START}
				durationInFrames={Timings.S5_ORIG_TOTAL}
				name="Section 5: Recap & Your Turn"
			>
				<Section5_Original />
			</Sequence>
		</AbsoluteFill>
	);
};
