import { Editor } from '@monaco-editor/react';
import { Fragment } from 'react/jsx-runtime';
import {
	Sequence
} from 'remotion';
import { clsx, SlideContent } from '../Root.tsx';
import "../styles.css";
import * as Timings from '../timings';
// Section 1: Setting the Stage
export const Section3_V3: React.FC = () => {
	const slide9Start = Timings.S3_V3_SLIDE8_DURATION;

	return (
		<Fragment>
			{/* Slide 8: Nesting is Fundamental */}
			<Sequence
				from={0}
				durationInFrames={Timings.S3_V3_SLIDE8_DURATION}
				name="S3 Slide 8: Why Nesting Matters"
			>
				<SlideContent title="Nesting: The Heart of JSX">
					<div className={clsx("flex", "gap-10", "items-start", "mb-6")}>
						<div className={clsx("flex-1")}>
							<p className={clsx("text-xl", "mb-2")}>
								Nesting is what makes JSX expressive and powerful.
							</p>
							<ul className={clsx("list-disc", "ml-6", "mb-4")}>
								<li>Represents hierarchy and relationships</li>
								<li>Enables composition and reuse</li>
								<li>Maps directly to tree-like data structures</li>
							</ul>
							<p>
								But how does the transform handle nested elements?
							</p>
						</div>
						<div className={clsx("flex-1", "bg-gray-100", "rounded", "p-3", "border")}>
							<Editor
								theme="vs-dark"
								height="22vh"
								defaultLanguage="javascript"
								defaultValue={`
<Namespace named="LV_Programmers">
  <Service 
	name="user-api" port={9000} />
</Namespace>`					}
								options={{
									fontSize: 20,
									minimap: { enabled: false },
									scrollBeyondLastLine: false,
								}}
							/>
						</div>
					</div>
				</SlideContent>
					<article>
						The usefulness of JSX is in it's ability to represent nested structures.
						We can see here that the <code>Namespace</code> component is a parent of the <code>Service</code> component.

						For this Kubernetes example, we can build an API that will render 
						resources with the namespace applied

						<aside>
							- Note that this is a very specific API, and is used to set up the example.
						</aside>
					</article>
			</Sequence>

			{/* Slide 10: Nested Output Example */}
			<Sequence
				from={slide9Start}
				durationInFrames={Timings.S3_V3_SLIDE10_DURATION}
				name="S3 Slide 10: Nested Output Example"
			>
				<SlideContent title="Nested Output: YAML Example">
					<div className={clsx("flex", "gap-10", "items-start", "mb-6")}>
						<div className={clsx("flex-1")}>
							<p>Your <code>jsx</code> function can recurse over <code>children</code> to build nested YAML output:</p>
							<Editor
								theme="vs-dark"
								height="60vh"
								defaultLanguage="typescript"
								defaultValue={`
export function jsx(type, props) {
	const { children, ...attrs } = props;

	// Determine the "kind" (component name or string tag)
	const kind = typeof type === 'string' ? type : type.name;

	// Start YAML with kind and metadata
	let yaml = \`kind: \${kind}\\nmetadata:\\n\`;
	
	// Add each attribute under metadata
	for (const [key, value] of Object.entries(attrs)) {
		yaml += \`  \${key}: \${JSON.stringify(value)}\\n\`;
	}

	// If there are children, process them recursively
	if (children !== undefined) {
		const nodes = Array.isArray(children) ? children : [children];
		
		for (const child of nodes) {
			// Child is already a YAML string from a nested jsx call
			const block = typeof child === 'string' ? child : String(child);
			
			// Indent every line by two spaces
			const indented = block
				.trim()
				.split('\\n')
				.map(line => '  ' + line)
				.join('\\n');
			yaml += indented + '\\n';
		}
	}

	return yaml.trimEnd();
}
							`}
								options={{
									fontSize: 16,
									minimap: { enabled: false },
									scrollBeyondLastLine: false,
								}}
							/>
						</div>
						<div className={clsx("flex-1", "bg-gray-100", "rounded", "p-3", "border")}>
							<Editor
								theme="vs-dark"
								height="24vh"
								defaultLanguage="yaml"
								defaultValue={`
kind: Service
metadata:
	name: "api-service"
	namespace: ""
`}
								options={{
									fontSize: 18,
									minimap: { enabled: false },
									scrollBeyondLastLine: false,
								}}
							/>
						</div>
					</div>
				</SlideContent>

				<article>					
					So how would we implement the YAML JSX transform?
					With this JSX function, Components are formatted as YAML.

					<aside>
						- The props.children step represents the recursive jsx() calls
					</aside>
				</article>				
			</Sequence>
		</Fragment>
	);
};