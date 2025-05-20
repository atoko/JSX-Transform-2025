import { Editor } from '@monaco-editor/react';
import { Fragment } from 'react';
import {
	Sequence
} from 'remotion';
import { z } from 'zod';
import { clsx, SlideContent, WelcomePage, type MyCompSchemaV3 } from '../Root.tsx';
import * as Timings from '../timings';
import fig1_4 from "../figure/1_4__JSX_Flowchart.png";
import "../styles.css";

export const Section1_V3: React.FC<z.infer<typeof MyCompSchemaV3>> = ({
	titleText,
	subtitleText,
	authorName,
}) => {
	// Calculate relative start times within this section
	const slide2Start = Timings.S1_V3_SLIDE1_DURATION;
	const slide3Start = slide2Start + Timings.S1_V3_SLIDE2_DURATION;
	const slide4Start = slide3Start + Timings.S1_V3_SLIDE3_DURATION;

	return (
		<Fragment>
			{/* Slide 1: Title */}
			<Sequence
				from={0}
				durationInFrames={Timings.S1_V3_SLIDE1_DURATION}
				name="S1 Slide 1: Title"
			>
				<SlideContent title={titleText} backgroundColor="#e9ecef">
					<p className={clsx("text-lg", "mt-33", "text-center")}>
						{subtitleText}
					</p>
					{/* Add conference/sponsor logos or graphics */}
					<p 
						className={clsx("mt-44", "pr-8", "text-right", "text-gray-600")}
					>
						{authorName}
					</p>
				</SlideContent>
				<article>
					Hello everyone! I'm Pedro Cardona, and today we're diving into JSX.
					<br />
					We'll explore how JSX is more than just a syntax for React. It's a
					powerful tool that can be used in various contexts, some more
					unexpected than others.
					<br />
					We'll start, of course, at the beginning, with a overview of what JSX
					is and how it works. Then, we'll look at how we can configure the JSX
					transform.
				</article>
				<aside>
					- We'll also explore how JSX handles nested elements and children.
				</aside>
			</Sequence>

			{/* Slide 2: Usual Suspects */}
			<Sequence
				from={slide2Start}
				durationInFrames={Timings.S1_V3_SLIDE2_DURATION}
				name="S1 Slide 2: Usual Suspects"
			>
				<SlideContent title="Where We Usually See JSX">
				<div
					className={clsx("flex", "gap-4", "items-start", "mb-6")}
				>

						<Editor
							theme={"vs-dark"}
							height={"76vh"}
							width={"70vw"}
							defaultLanguage={"javascript"}
							defaultValue={`// React: Building UIs (The Classic)

function Greeting({ name }) { 
	return <h1>Hello, {name}!</h1>; // <h1> is a JSX element
}

function WelcomePage({ id }) {
	const details = getDetails(id); 
	// details = { name: "Pedro" }
	return <div>
		<Greeting name={details.name} /> // A functional JSX component
		<p>Welcome to the site!</p>
	</div>
}

document.body = react(
	<body>
		<WelcomePage id={12352} /> // JSX 
	</body>
);
							`}
							options={{
								"fontSize": 24,
							}}
						/>
						<hr />
						<br />
					<WelcomePage />		
				</div>

				</SlideContent>
				<article>
					JSX is often associated with React, where it serves as a syntax
					extension for JavaScript. It allows us to write HTML-like code 
					to build components.

					<br />

					Here we are creating a tree of html views, that are then rendered to the
					document body. The `WelcomePage` component is a functional component
					that returns a JSX element. Inside it, we are using the `Greeting`
					component, which takes a `name` prop and renders it inside an {"<h1>"}
					element.

					This is the main idea behind JSX: we are using a function to prepare a 
					React element, or a tree of React elements, which is/are then rendered 
					to the DOM. 
				</article>
				<aside>
					- We see here a typical React component using JSX.
					- Note that we are using functions and HTML tags alongside our 
						JavaScript code.
				</aside>
			</Sequence>

			{/* Slide 3: Syntactic Sugar */}
			<Sequence
				from={slide3Start}
				durationInFrames={Timings.S1_V3_SLIDE3_DURATION}
				name="S1 Slide 3: Syntactic Sugar"
			>
				<SlideContent title="It's (Mostly) Syntactic Sugar">
					Reviewing {"<WelcomePage />"}
					<div
						className={clsx("text-gray-800", "leading-relaxed", "mb-4", "mx-2", "border", "rounded-sm", "max-w-70", "pl-0.5", "ml-60")}
					>

						<WelcomePage />
					</div>
					<div
						className={clsx("flex", "gap-4", "items-start", "mb-6")}
					>
					<pre>
						<Editor
							theme={"vs-dark"}
							height={"43vh"}
							width={"62vw"}
							defaultLanguage={"javascript"}
							defaultValue={`// Simplified React:
createElement(
	'body',
	null,
	createElement(WelcomePage, { id: 12352 }, 
		createElement('div', null,
			createElement(Greeting, { name: 'Pedro' }, 
				createElement('h1', null, 'Hello, <name>!'),
			),
			"// A functional JSX component.",
			createElement('p', null, 'Welcome to the site!')
		)
	)
);
						`}
							options={{
								fontSize: 21,
							}}
						/>
					</pre>
					<div
						className={clsx("bg-gray-100", "p-4", "rounded-md", "border", "border-gray-200", "grow")}
					>
					<legend
						className={clsx("font-bold", "mb-2")}
					>JSX "engine":</legend>
					<ul
						className={clsx("list-disc", "pl-2", "ml-4", "text-gray-800")}
					>
						<li>Composed of nested function calls</li>
						<li>Each element knows how to render()</li>
						<li>Non-JSX elements are strings</li>
						<li>(Like our comment, now part of the HTML string)</li>
					</ul>

					</div>
					</div>
				</SlideContent>
				<article>
					This HTML component, when rendered, looks like this: 
					JSX is transformed into function calls, which then create
					the corresponding elements.

					This tells us that there is a step between what we write in JSX \
					and what actually runs.
				</article>
				<aside>
					- Note that the comment was transformed into a string by the JSX 
						interpreter, "// A functional JSX component."
					- Note typescript also handles jsx by default, and it does so by using the
						`createElement` function. This is the function that is called 
						when we use JSX.
				</aside>
			</Sequence>

			{/* Slide 4: The Transform */}
			<Sequence
				from={slide4Start}
				durationInFrames={Timings.S1_V3_SLIDE4_DURATION}
				name={"S1 Slide 4: The Transform"}
			>
				<SlideContent title={"The Compiler's Role: The Transform"}>

					<p>
						The compiler replaces your JSX with calls to a function you specify.
					</p>
					<ul className={clsx("list-disc", "ml-6", "mb-4", "text-sm")}>
						<li>
							This means <strong>JSX is not tied to React</strong>: it's a generic syntax transform
						</li>
					</ul>
					<p>
						Let's visualize how this works:
					</p>
					<div style={{display: 'flex', gap: '2em', alignItems: 'flex-start', marginBottom: '1em'}}>
						<div>
							<pre>
{<img 
	className={clsx("w-102", "h-60")}
	src={fig1_4} 
/>}</pre>
						</div>
						<div style={{flex: 1}}>
							<ul className={clsx("list-disc", "ml-3", "text-sm", "leading-loose")}>
								<li>
									<strong>JSX Syntax</strong>: What you write (<code>{'<MyComponent />'}</code>)
								</li>
								<li>
									<strong>Compiler</strong>: Transforms JSX to function calls
								</li>
								<li>
									<strong>JSX Engine</strong>: The function that receives the calls (<code>jsx</code>)
								</li>
								<li>
									<strong>Output</strong>: DOM, objects, configuration, anything!
								</li>
							</ul>
						</div>
					</div>
				</SlideContent>
				<aside>
					- Emphasize: JSX is a syntax, not a framework.
					- The "transform" is the compiler step, not runtime.
					- <code>jsxImportSource</code> is the key to customizing.
					- Show how this enables non-UI use cases.
				</aside>
				<article>
					This is how you use JSX. The only requirement: implement a compatible 
						<code>jsx</code> function.
					We'll look at concrete examples of customizing the transform next.
				</article>

			</Sequence>
		</Fragment>
	);
};