import type { FunctionComponent } from "react";
import { Fragment } from "react/jsx-runtime";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import * as Timings from './timings';
import { z } from "zod";

const FPS = 30;
const DURATION_IN_MINUTES = 20;

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: z.string(),
});

export const RemotionRoot: FunctionComponent = () => {
	return (
		<Fragment>
			<Composition
				id="JSX-Lightning-Talk"
				component={JsxLightningTalk2025}
				durationInFrames={DURATION_IN_MINUTES * 60 * FPS}
				fps={FPS}
				width={1920}
				height={1080}
			/>
		</Fragment>
	);
  };

// Helper component for basic slide text (replace with actual designs)
const SlideContent: React.FC<{title: string; children?: React.ReactNode, backgroundColor?: string}> = ({ title, children, backgroundColor = '#eee' }) => {
	return (
	  <AbsoluteFill style={{ backgroundColor: backgroundColor, padding: 50, fontFamily: 'sans-serif' }}>
		<h1 style={{ fontSize: 80, marginBottom: 40 }}>{title}</h1>
		<div style={{ fontSize: 40 }}>
		  {children}
		</div>
	  </AbsoluteFill>
	);
  };

// const _Introduction = () => {
// 	const { titleText, titleColor } = {
// 		titleText: 'JSX: More Than Meets the Eye',
// 		titleColor: 'black',
// 	};
// 	return <Sequence from={S1_START} durationInFrames={S1_SLIDE1_DURATION} name="Intro Slide: Title">
// 		<SlideContent title={titleText} backgroundColor="#f0f0f0">
// 			<p style={{ color: titleColor }}>Subtitle: How {'<YourThing />'} becomes ~~~~~~~~~~~~~~~~~~~~!!.</p>
// 			<p>Pedro Cardona</p>
// 		</SlideContent>		
// 	</Sequence>
// }

const Section1: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText,
	titleColor,
}) => {
	return (
		<>
			{/* Slide 1.1: Title */}
			<Sequence
				from={0} // Start at the beginning of this section's sequence
				durationInFrames={Timings.S1_SLIDE1_DURATION}
				name="S1 Slide 1: Title"
			>
				<SlideContent title={titleText} backgroundColor="#f0f0f0">
					<p style={{color: titleColor}}>
						Subtitle: How {'<YourThing />'} becomes HTML, YAML, Video Timelines, or complex objects.
					</p>
					<p>Pedro Cardona</p>
				</SlideContent>
			</Sequence>

			{/* Slide 1.2: Familiar Faces */}
			<Sequence
				from={Timings.S1_SLIDE1_DURATION} // Starts after previous slide in this section
				durationInFrames={Timings.S1_SLIDE2_DURATION}
				name="S1 Slide 2: Familiar Faces"
			>
				<SlideContent title="We Know This JSX (Usually)">
					<pre>
						<code>{`// React: Building UIs
						const element = <h1 className="greeting">Hello, world!</h1>;\n\n// Remotion: Defining Videos\nconst MyVideo = () => (<Sequence>...</Sequence>);`}</code>
					</pre>
					<p>Talk track: Familiar examples, syntax needs transformation.</p>
				</SlideContent>
			</Sequence>

			{/* Slide 1.3: The Transform */}
			<Sequence
				from={Timings.S1_SLIDE1_DURATION + Timings.S1_SLIDE2_DURATION} // Starts after previous slide
				durationInFrames={Timings.S1_SLIDE3_DURATION}
				name="S1 Slide 3: The Transform"
			>
				<SlideContent title="The Magic Trick: The Transform">
					<p>JSX Syntax -&gt; Compiler -&gt; Function Call!</p>
					<pre>
						<code>{`<MyComponent prop="val" /> --> [Compiler] --> jsx('MyComponent', { prop: 'val' })`}</code>
					</pre>
					<p>
						Talk track: What `jsx` function does is key. React vs Remotion vs
						Custom.
					</p>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 2: Beyond HTML - Defining Structure
const Section2: React.FC = () => {
	return (
		<>
			{/* Slide 2.1: Spec Flexibility */}
			<Sequence
				from={0} // Start at the beginning of this section's sequence
				durationInFrames={Timings.S2_SLIDE4_DURATION}
				name="S2 Slide 4: Spec Flexibility"
			>
				<SlideContent title="JSX Spec? Flexible!" backgroundColor="#e0f7fa">
					<p>Spec = Syntax + Transform Hook. Doesn't dictate return type.</p>
					<pre>
						<code>{`// Our custom jsx concept\nfunction jsx(type, config) {\n  if (typeof type === 'function') {\n    return type(config); // call a function component!\n  } else { ... }\n}`}</code>
					</pre>
					<p>
						Talk track: Flexibility allows targeting DOM, video, builders. Our
						transform executes function components.
					</p>
				</SlideContent>
			</Sequence>

			{/* Slide 2.2: Defining Structure */}
			<Sequence
				from={Timings.S2_SLIDE4_DURATION}
				durationInFrames={Timings.S2_SLIDE5_DURATION}
				name="S2 Slide 5: Defining Structure"
			>
				<SlideContent
					title="Using JSX for Data Structures or... Anything!"
					backgroundColor="#e0f7fa"
				>
					<pre>
						<code>{`// Config Example\n<Service name="auth-api" port={8080} />\n\n// Remotion-like Example\n<Timeline fps={30}>\n  <Animate target="logo" ... />\n</Timeline>`}</code>
					</pre>
					<p>
						Talk track: Syntax describes structure; transform determines format.
					</p>
				</SlideContent>
			</Sequence>

			{/* Slide 2.3: TSX Config */}
			<Sequence
				from={Timings.S2_SLIDE4_DURATION + Timings.S2_SLIDE5_DURATION}
				durationInFrames={Timings.S2_SLIDE6_DURATION}
				name="S2 Slide 6: TSX Config"
			>
				<SlideContent
					title="Telling TypeScript About Our jsx"
					backgroundColor="#e0f7fa"
				>
					<pre>
						<code>{`// tsconfig.json\n{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "./path/to/our/jsx" // <-- Points here!\n    // "jsxImportSource": "react"\n    // "jsxImportSource": "remotion"\n  }\n}`}</code>
					</pre>
					<p>
						Talk track: `jsxImportSource` tells TS which library's `jsx` function
						to use.
					</p>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 3: Function Components as Builder Entry Points
const Section3: React.FC = () => {
	return (
		<>
			{/* Slide 3.1: Target YAML */}
			<Sequence
				from={0} // Start at the beginning of this section's sequence
				durationInFrames={Timings.S3_SLIDE7_DURATION}
				name="S3 Slide 7: Target YAML"
			>
				<SlideContent
					title="Goal: Generate GitHub Actions YAML via JSX"
					backgroundColor="#fff9c4"
				>
					<pre>
						<code>{`<GithubWorkflowX name="CI Pipeline" on={...}>\n  <GithubJobBuilder id="build" ...>\n    {/* ... steps ... */}\n  </GithubJobBuilder>\n</GithubWorkflowX>`}</code>
					</pre>
					<p>Talk track: Concrete goal for our custom transform.</p>
				</SlideContent>
			</Sequence>

			{/* Slide 3.2: Builder Component */}
			<Sequence
				from={Timings.S3_SLIDE7_DURATION}
				durationInFrames={Timings.S3_SLIDE8_DURATION}
				name="S3 Slide 8: Builder Component"
			>
				<SlideContent
					title="The Top-Level Builder Component"
					backgroundColor="#fff9c4"
				>
					<pre>
						<code>{`// Simplified\nexport const GithubWorkflowX = (props) => {\n  // 1. Receive props\n  const factory = new GithubWorkflowBuilder(props.name);\n  // 3. Configure builder\n  factory.setOn(props.on);\n  // 4. Process children (other builders)\n  props.children.forEach(job => factory.addJob(job));\n  // 5. Return builder instance\n  return factory;\n};`}</code>
					</pre>
					<p>
						Talk track: This function is called by our transform and orchestrates
						the builder.
					</p>
				</SlideContent>
			</Sequence>

			{/* Slide 3.3: Transform Call */}
			<Sequence
				from={Timings.S3_SLIDE7_DURATION + Timings.S3_SLIDE8_DURATION}
				durationInFrames={Timings.S3_SLIDE9_DURATION}
				name="S3 Slide 9: Transform Call"
			>
				<SlideContent
					title="JSX -> jsx() -> GithubWorkflowX() -> Builder!"
					backgroundColor="#fff9c4"
				>
					<p>1. Compiler sees {'<GithubWorkflowX ...>'}</p>
					<p>2. Compiler calls: `jsx(GithubWorkflowX, props)` (using *our* jsx)</p>
					<p>3. Our `jsx` sees `typeof GithubWorkflowX === 'function'`.</p>
					<p>4. Our `jsx` *calls* `GithubWorkflowX(props)`.</p>
					<p>5. `GithubWorkflowX` runs, creates/configures builder, returns instance.</p>
					<p>Talk track: Trace the flow.</p>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 4: The Builder Pattern in Action
const Section4: React.FC = () => {
	// Calculate relative start times within this section
	const slide11Start = Timings.S4_SLIDE10_DURATION;
	const slide12Start = slide11Start + Timings.S4_SLIDE11_DURATION;
	const slide13Start = slide12Start + Timings.S4_SLIDE12_DURATION;

	return (
		<>
			{/* Slide 4.1: Builder Recap */}
			<Sequence
				from={0} // Start at the beginning of this section's sequence
				durationInFrames={Timings.S4_SLIDE10_DURATION}
				name="S4 Slide 10: Builder Recap"
			>
				<SlideContent
					title="Builder Pattern: Step-by-Step Construction"
					backgroundColor="#dcedc8"
				>
					<p>Separates complex object construction from its representation.</p>
					<p>Analogy: LEGOs, ordering pizza.</p>
				</SlideContent>
			</Sequence>

			{/* Slide 4.2: Component Uses Builder */}
			<Sequence
				from={slide11Start}
				durationInFrames={Timings.S4_SLIDE11_DURATION}
				name="S4 Slide 11: Component Uses Builder"
			>
				<SlideContent
					title="The Component Function Uses the Builder"
					backgroundColor="#dcedc8"
				>
					<p>
						{'<GithubWorkflowX name="CI">'} -&gt; `props.name` -&gt; `new
						GithubWorkflowBuilder("CI")`
					</p>
					<p>
						{'<GithubWorkflowX on={push}>'} -&gt; `props.on` -&gt; `factory.setOn(push)`
					</p>
					<p>
						{'<GithubJobBuilder />'} (child) -&gt; `props.children` -&gt;
						`factory.addJob(childJobBuilder)`
					</p>
					<p>Talk track: JSX defines *what*; component + builder define *how*.</p>
				</SlideContent>
			</Sequence>

			{/* Slide 4.3: Table */}
			<Sequence
				from={slide12Start}
				durationInFrames={Timings.S4_SLIDE12_DURATION}
				name="S4 Slide 12: Table"
			>
				<SlideContent
					title="Table: JSX -> Component -> Builder"
					backgroundColor="#dcedc8"
				>
					{/* Basic HTML table - consider styling or using a Remotion table component */}
					<table border={1} style={{fontSize: '0.6em', borderCollapse: 'collapse', width: '100%'}}>
						<thead>
							<tr>
								<th>JSX Element/Prop</th>
								<th>jsx Transform Action</th>
								<th>Component Function (GWX) Action</th>
								<th>Builder Action (GWB)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>&lt;GWX...&gt;</code></td>
								<td>Calls <code>jsx(GWX, props)</code></td>
								<td>Receives props</td>
								<td><code>new GWB(props.name)</code></td>
							</tr>
							<tr>
								<td><code>name="CI"</code></td>
								<td>Passes <code>{"{ name: 'CI' }"}</code></td>
								<td>Reads <code>props.name</code></td>
								<td>(Used in constructor)</td>
							</tr>
							<tr>
								<td><code>on=...</code></td>
								<td>Passes <code>{"{ on: ... }"}</code></td>
								<td>Reads <code>props.on</code>, calls <code>factory.setOn</code></td>
								<td><code>setOn(...)</code></td>
							</tr>
							<tr>
								<td><code>&lt;GJB/&gt;</code></td>
								<td>Calls <code>jsx(GJB, ...)</code> -&gt; job</td>
								<td>Receives <code>job</code> in <code>props.children</code></td>
								<td><code>factory.addJob(job)</code></td>
							</tr>
							<tr>
								<td>(Return Value)</td>
								<td>Returns result of <code>GWX(props)</code></td>
								<td>Returns <code>factory</code></td>
								<td>(Final builder instance)</td>
							</tr>
						</tbody>
					</table>
				</SlideContent>
			</Sequence>

			{/* Slide 4.4: Fragment */}
			<Sequence
				from={slide13Start}
				durationInFrames={Timings.S4_SLIDE13_DURATION}
				name="S4 Slide 13: Fragment"
			>
				<SlideContent title="Quick Note: Our Fragment" backgroundColor="#dcedc8">
					<pre>
						<code>{`// Inside Fragment\nif (childrenProps.some(child => typeof child === "string")) {\n  throw new Error(...);\n}`}</code>
					</pre>
					<p>
						Talk track: Prevents raw text nodes, suitable for this specific
						builder context.
					</p>
				</SlideContent>
			</Sequence>
		</>
	);
};

// Section 5: Recap & Your Turn
const Section5: React.FC = () => {
	// Calculate relative start times within this section
	const slide15Start = Timings.S5_SLIDE14_DURATION;
	const slide16Start = slide15Start + Timings.S5_SLIDE15_DURATION;

	return (
		<>
			{/* Slide 5.1: Summary */}
			<Sequence
				from={0} // Start at the beginning of this section's sequence
				durationInFrames={Timings.S5_SLIDE14_DURATION}
				name="S5 Slide 14: Summary"
			>
				<SlideContent
					title="JSX: Declarative Syntax for... Anything!"
					backgroundColor="#e1bee7"
				>
					<p>Center: JSX Syntax</p>
					<p> -&gt; Transform (Compiler + jsxImportSource)</p>
					<p> -&gt; jsx(type, props) Function</p>
					<p>   - React -&gt; DOM/Native UI</p>
					<p>   - Remotion -&gt; Video Render</p>
					<p>   - Custom (Function Type) -&gt; Call Component -&gt; Builder -&gt; YAML/Object</p>
					<p>   - Custom (String Type) -&gt; Descriptor</p>
					<p>Talk track: Recap the core idea and different paths.</p>
					{/* Add the brainmap visual */}
				</SlideContent>
			</Sequence>

			{/* Slide 5.2: Beyond */}
			<Sequence
				from={slide15Start}
				durationInFrames={Timings.S5_SLIDE15_DURATION}
				name="S5 Slide 15: Beyond"
			>
				<SlideContent title="What Else Could You Build?" backgroundColor="#e1bee7">
					<ul>
						<li>Declarative Video/Audio (Remotion)</li>
						<li>Infrastructure as Code</li>
						<li>Game Scenes / Levels</li>
						<li>Email Templating</li>
						<li>API Client Configs / SDKs</li>
						<li>State Machines / Workflows</li>
						{/* Add icons or small visuals */}
					</ul>
				</SlideContent>
			</Sequence>

			{/* Slide 5.3: Q&A */}
			<Sequence
				from={slide16Start}
				durationInFrames={Timings.S5_SLIDE16_DURATION}
				name="S5 Slide 16: Q&A"
			>
				<SlideContent
					title="Questions? / What will YOU transform?"
					backgroundColor="#e1bee7"
				>
					<p>Link to Slides/Demo/Repo/Contact Info</p>
					{/* Add QR code or links */}
				</SlideContent>
			</Sequence>
		</>
	);
};

const JsxLightningTalk2025 = () => {
	return (<AbsoluteFill style={{ backgroundColor: '#fff' }}>
		<Sequence
				from={Timings.S1_START}
				durationInFrames={Timings.S1_TOTAL}
				name={"Section 1: Setting the Stage - What IS This Stuff?"}
		>
			<Section1 titleText="JSX: More Than Meets the Eye" titleColor="black" />
		</Sequence>
		<Sequence
				from={Timings.S2_START}
				durationInFrames={Timings.S2_TOTAL}
				name={"Section 2: Beyond HTML - Defining Structure"}
		>
			<Section2 />
		</Sequence>
		<Sequence
				from={Timings.S3_START}
				durationInFrames={Timings.S3_TOTAL}
				name={"Section 3: Function Components as Builder Entry Points"}
		>
			<Section3 />
		</Sequence>
		<Sequence
				from={Timings.S4_START}
				durationInFrames={Timings.S4_TOTAL}
				name={"Section 4: The Builder Pattern in Action"}
		>
			<Section4 />
		</Sequence>
		<Sequence
				from={Timings.S5_START}
				durationInFrames={Timings.S5_TOTAL}
				name={"Section 5: Recap & Your Turn"}
		>
			<Section5 />
		</Sequence>
	</AbsoluteFill>);
}