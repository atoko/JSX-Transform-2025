import { Editor } from '@monaco-editor/react';
import {
	Sequence
} from 'remotion';
import { clsx, SlideContent } from '../Root.tsx';
import * as Timings from '../timings';
import "../styles.css";

export const Section2_V3: React.FC = () => {
	const slide6Start = Timings.S2_V3_SLIDE5_DURATION;
	const slide7Start = slide6Start + Timings.S2_V3_SLIDE6_DURATION;

	return (
		<>
			{/* Slide 5: TSX Config */}
			<Sequence
				from={0}
				durationInFrames={Timings.S2_V3_SLIDE5_DURATION}
				name="S2 Slide 5: TSX Config"
			>
				<SlideContent title="tsconfig.json: Configuring the Transform">
					There are two main ways to configure the transform:
					<pre
						className={clsx("mx-[5vw]", "flex", "gap-15")}
					>
					<Editor
							theme={"vs-dark"}
							height={"24vh"}
							width={"30vw"}
							defaultLanguage={"json"}
							defaultValue={`{
	"compilerOptions": {
		"jsx": "react-jsx",
		"jsxImportSource": "@LVProgrammers/jsx-runtime"
	}
}
						`}
							options={{
								fontSize: 20,
							}}
						/>
						<Editor
								theme={"vs-dark"}
								height={"24vh"}
								defaultLanguage={"typescript"}
								defaultValue={`/** @jsxImportSource preact */

							`}
								options={{
									fontSize: 20,
								}}
						/>
					</pre>
					<hr />
					The basic functions expected by tsc are:
					<table>
						<tr>
							<td>Function Name</td>
							<td>Description</td>
						</tr>
						<tr>
							<td>elementFactory</td>
							<td>Creates elements based on the provided type and props.</td>
						</tr>
						<tr>
							<td>fragment</td>
							<td>Creates a fragment that can group multiple elements without adding extra nodes to the DOM.</td>
						</tr>
					</table>
				</SlideContent>
				<article>
					We will be implementing our runtime with Typescript as the compiler.
				</article>
			</Sequence>

			{/* Slide 6: Transform JSON */}
			<Sequence
				from={slide6Start}
				durationInFrames={Timings.S2_V3_SLIDE6_DURATION}
				name="S2 Slide 6: Transform JSON"
			>
				<SlideContent title="Example: Transforming JSX to JSON">
					<h2>
						A Kubernetes example:
					</h2>
					<pre className={clsx("flex", "gap-4", "max-w-120", "mb-6")}>
					<Editor
							theme={"vs-dark"}
							height={"18vh"}
							defaultLanguage={"javascript"}
							defaultValue={`export function jsx(type, props) {
  return { 
  	componentType: String(type),
	properties: props 
  };
}

<Service 
	name="user-api" port={9000} />
// -> jsx("Service", { name: "~", port: 9000 })
`


}
							options={{
								fontSize: 22,
							}}
						/>				
					</pre>
						<p>
							{`jsx("Service", { name: "~", port: 9000 })`} then returns
						</p>
						<div
							className={clsx("flex", "gap-8")}
						>

<Editor
							theme={"vs-dark"}
							height={"26vh"}
							defaultLanguage={"json"}
							defaultValue={`{
  "componentType": "Service",
  "properties": { 
    "name": "user-api", 
    "port": 9000 
  }
}
						`}
							options={{
								fontSize: 20,
							}}
						/>			
						<Editor
								theme={"vs-dark"}
								height={"25vh"}
								defaultLanguage={"json"}
								defaultValue={`{
	"Service": {
		"properties": { 
			"name": "user-api", 
			"port": 9000 
		}
	}
}
							`}
								options={{
									fontSize: 20,
								}}
							/>			
						</div>	
				</SlideContent>
				<article>
					Here we can see a basic JSX to JSON transform. The implementation on the left 
					extracts the Component tag and adds it to a "componentType" property.

					The example on the right builds an object
					 that more closely resembles the original JSX.
					This is to show that the design of JSX components is specific to each use case.
				</article>
			</Sequence>

			{/* Slide 7: Transform YAML */}
			<Sequence
				from={slide7Start}
				durationInFrames={Timings.S2_V3_SLIDE7_DURATION}
				name="S2 Slide 7: Transform YAML"
			>
				<SlideContent title="Example: Transforming JSX to YAML String">
					<pre
						className={clsx("max-w-150")}>
					<Editor
							theme={"vs-dark"}
							height={"32vh"}
							width={"70vw"}
							defaultLanguage={"javascript"}
							defaultValue={`<Service 
	name="user-api" port={33000} />
// -> jsx("Service", { name: "~", port: 33000 })

// jsx -> yaml
export function jsx(type, props) {
  let yaml = \`\${type}:\\n\`;
  for (const key in props) {
    yaml += \`  \${key}: \${JSON.stringify(props[key])}\\n\`;
  }
  return yaml;
}`}
							options={{
								fontSize: 20,
							}}
						/>				
					</pre>
					<div
						className={clsx("flex", "gap-4", "items-start", "mb-6")}>
							<div
								className={clsx("flex", "flex-col")}
							>
								<h3>
									JSX:		
								</h3>
									<Editor
										theme={"vs-dark"}
										height={"7vh"}
										width={"55vw"}
										defaultLanguage={"yaml"}
										defaultValue={`jsx("Service", { name: "~," port: 31000 })`}
										options={{
											fontSize: 20,
										}}
									/>	
							</div>
							<div
								className={clsx("flex", "flex-col")}
							>
								<h3>
									YAML:
								</h3>

								<Editor
									theme={"vs-dark"}
									height={"15vh"}
									width={"55vw"}
									defaultLanguage={"yaml"}
									defaultValue={`Service:
name: "user-api"
port: "31000"
										`}
									options={{
										fontSize: 20,
									}}
								/>		
							</div>
						
					</div>								
				</SlideContent>
				<article>
					Transforming JSX to YAML is also possible. If you'll notice, however, 
					this implementation doesn't validate any inputs.
					We need to build an engine that can "speak" the domain of the object we are interested 
					in creating.
					Let's think about what useful features we need to add to our transform.
				</article>
			</Sequence>
		</>
	);
};