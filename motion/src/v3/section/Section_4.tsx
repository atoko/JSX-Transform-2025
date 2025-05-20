import { Editor } from '@monaco-editor/react';
import { Fragment } from 'react';
import {
	Sequence,
} from 'remotion';
import fig4_ from "../figure/4__Builder_Pattern.png";
import "../styles.css";
import * as Timings from '../timings';
import { clsx, SlideContent } from '../Root.tsx';


// Section 4: Case Study: GitHub Actions Builder
export const Section4_V3: React.FC = () => {
	const slide12Start = Timings.S4_V3_SLIDE11_DURATION;
	const slide13Start = slide12Start + Timings.S4_V3_SLIDE12_DURATION;
	const slide14Start = slide13Start + Timings.S4_V3_SLIDE13_DURATION;

	return (
		<Fragment>
			{/* Slide 11: Builder Recap */}
			<Sequence
				from={0}
				durationInFrames={Timings.S1_V3_SLIDE1_DURATION / 2}
				name="S1 Slide 1: Title"
			>
				<SlideContent title={"Part 2: Building a Github Actions workflow JSX engine"} backgroundColor="#e9ecef">
					<p className={clsx("text-lg", "mt-33", "text-center")}>
						{"How I built a YAML JSX transformer for Github Actions"}
					</p>
				</SlideContent>
			</Sequence>
			<Sequence
				from={Timings.S4_V3_SLIDE11_DURATION / 2}
				durationInFrames={Timings.S4_V3_SLIDE11_DURATION}
				name="S4 Slide 11: Builder Recap"
			>
				<SlideContent title="Refresher: The Builder Pattern">
					<div
						className={"flex gap-4"}
					>
					<div className={clsx("mb-4")}>
						<p className={clsx("text-lg", "mb-2")}>A design pattern that helps with:</p>
						<ul className={clsx("list-disc", "ml-8", "space-y-2")}>
							<li>Constructing complex objects step-by-step</li>
							<li>Separating construction logic from representation</li>
							<li>Providing a fluent interface for object creation</li>
						</ul>
					</div>

					<Editor
						theme="vs-dark"
						className={clsx("ml-20", "mr-4")}
						height="58vh"
						defaultLanguage="typescript"
						defaultValue={`

// Traditional builder pattern
const report = new ReportBuilder()
  .setTitle("Q1 Performance")
  .addSection("Overview", "Company performance exceeded expectations")
  .addSection("Financials", { revenue: "$2.5M", expenses: "$1.8M" })
  .addChart("revenue-trends", { type: "line", data: [...] })
  .build();

// What if we could use JSX instead?
const report = (
  <Report title="Q1 Performance">
	<Section name="Overview">
	  Company performance exceeded expectations
	</Section>
	<Section name="Financials">
	  <Metric name="Revenue" value="$2.5M" />
	  <Metric name="Expenses" value="$1.8M" />
	</Section>
	<Chart id="revenue-trends" type="line" data={[...]} />
  </Report>
);`}
						options={{
							fontSize: 18,
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
						}}
					/>
					</div>

				</SlideContent>
				<article>
					Before we dive into the GitHub Actions example,
					Let's review an OOP concept: the builder pattern. 
					
					Since we're not serializing the yaml components immediately,
					this can be our "Engine" layer.
					
					The builder pattern allows:
						1. Common ".build()" method.
						2. Nested objects are also builders themselves
						3. Each JSX element represents a corresponding builder instance 

					The Builder pattern is a perfect match for JSX - both involve constructing complex objects with nested structures. 					
				</article>
				<aside>
					- Emphasize how JSX is more visually representative of the final structure
					- Point out that nesting is more intuitive in JSX than with method chaining
					- Mention that JSX offers better editor support (autocomplete, syntax highlighting)
				</aside>
			</Sequence>

			{/* Slide 12: Strategy */}
			<Sequence
				from={slide12Start}
				durationInFrames={Timings.S4_V3_SLIDE12_DURATION}
				name="S4 Slide 12: Strategy"
			>
				<SlideContent title="The Strategy: JSX Drives a Builder via Components">
					<div className={clsx("flex", "flex-col", "gap-4", "mb-4")}>
						<div
							className={"flex"}
						>
							<div className={clsx("bg-gray-100", "p-4", "rounded-md", "border", "border-gray-200", "grow")}>
								<h3 className={clsx("font-bold", "mb-2")}>Implementation Strategy:</h3>
								<ol className={clsx("list-decimal", "ml-6", "space-y-1")}>
									<li>Create custom <code>jsxImportSource</code> implementation</li>
									<li>Our <code>jsx</code> function evaluates component types</li>
									<li>Inside components, use props to configure builder instances</li>
									<li className={clsx("font-mono", "text-sm")}>Return builder instances (domain object)</li>
								</ol>
							</div>

							<Editor
								className={"ml-20"}
								theme="vs-dark"
								height="65vh"
								defaultLanguage="typescript"
								defaultValue={`
// The jsx runtime implementation
export function jsx(builder, props) {
	if (typeof builder === 'function') {
		return builder(props); // Component returns builder instance
	}
}

// A component that configures a builder
export const GithubActionsWorkflow = (props) => {
	const { id, name, runsOn, children, ...otherProps } = props;
	
	// Create and configure builder with direct props
	const builder = new GhaBuilder(id).setName(name).setRunsOn(runsOn);
	
	// Process children (steps) 
		if (children) {
			const steps = Array.isArray(children) ? children : [children];
			steps.forEach(step => builder.addStep(step));
		}
	
	return builder; // Return builder for parent component
}`}
								options={{
									fontSize: 18,
									minimap: { enabled: false },
								}}
								beforeMount={(monaco) => {
									monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
										noSemanticValidation: true,
										noSyntaxValidation: true,
									});
								}}							
							/>
						</div>
					</div>
				</SlideContent>
				<article>
					This approach bridges the declarative nature of JSX with the imperative builder pattern. 
					Components create builder instances and configure their attributes, 
					while the JSX structure provides the hierarchical relationships between objects.
				</article>
				<aside>
					- Explain how components can be both "tag names" and "factory functions"
					- Note that props become builder configuration parameters
					- Nesting in JSX naturally maps to builder hierarchies
				</aside>
			</Sequence>

			{/* Slide 13: GHA Goal */}
			<Sequence
				from={slide13Start}
				durationInFrames={Timings.S4_V3_SLIDE13_DURATION}
				name="S4 Slide 13: GHA Goal"
			>
				<SlideContent title="Goal: Declarative GitHub Workflows">
					<div className={clsx("mb-4")}>
						<p className={clsx("text-lg", "mb-2")}>
							What if we could define GitHub Actions workflows with JSX instead of YAML?
						</p>
					</div>

					<div className={clsx("grid", "grid-cols-2", "gap-4")}>
						<Editor
							theme="vs-dark"
							height="48vh"
							defaultLanguage="typescript"
							defaultValue={`// GitHub Actions workflow using JSX

const deployWorkflow = (
  <GithubWorkflow 
	name="Deploy Website" 
	on={{ push: { branches: ['main'] } }}
  >
	<Job 
	  id="build" 
	  name="Build Artifacts" 
	  runsOn="ubuntu-latest"
	>
	  <Step uses="actions/checkout@v4" />
	  <Step 
		name="Setup Node" 
		uses="actions/setup-node@v4" 
		with={{ 'node-version': '20' }} 
	  />
	  <Step 
		name="Install & Build" 
		run="npm ci && npm run build" 
	  />
	  <Step 
		name="Upload Artifact" 
		uses="actions/upload-artifact@v4" 
		with={{ name: 'dist', path: 'dist/' }} 
	  />
	</Job>

	<Job 
	  id="deploy" 
	  name="Deploy to Prod" 
	  needs="build" 
	  runsOn="ubuntu-latest"
	>
	  <Step 
		name="Download Artifact" 
		uses="actions/download-artifact@v4" 
		with={{ name: 'dist' }} 
	  />
	  {/* More deployment steps... */}
	</Job>
  </GithubWorkflow>
);`}
							options={{
								fontSize: 15,
								minimap: { enabled: false },
							}}
							beforeMount={(monaco) => {
								monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
									noSemanticValidation: true,
									noSyntaxValidation: true,
								});
							}}							
						/>

						<Editor
							className={clsx("mr-5")}
							theme="vs-dark"
							height="48vh"
							defaultLanguage="yaml"
							defaultValue={`# Equivalent YAML output
name: Deploy Website
on:
  push:
	branches:
	  - main

jobs:
  build:
	name: Build Artifacts
	runs-on: ubuntu-latest
	steps:
	  - uses: actions/checkout@v4
	  
	  - name: Setup Node
		uses: actions/setup-node@v4
		with:
		  node-version: '20'
		  
	  - name: Install & Build
		run: npm ci && npm run build
		
	  - name: Upload Artifact
		uses: actions/upload-artifact@v4
		with:
		  name: dist
		  path: dist/
		  
  deploy:
	name: Deploy to Prod
	needs: build
	runs-on: ubuntu-latest
	steps:
	  - name: Download Artifact
		uses: actions/download-artifact@v4
		with:
		  name: dist
		  
	  # More deployment steps...`}
							options={{
								fontSize: 15,
								minimap: { enabled: false },
							}}
						/>
					</div>
				</SlideContent>
				<article>
					With a JSX-based approach we get the ability to use JavaScript logic 
					for dynamic workflow generation.
				</article>
				<aside>
					- Highlight benefits: type safety, reusable components, inline logic
					- Mention how this approach works with existing CI/CD systems
				</aside>
			</Sequence>
			{/* Slide 14: How it Works */}
			<Sequence
				from={slide14Start}
				durationInFrames={Timings.S4_V3_SLIDE14_DURATION}
				name="S4 Slide 14: How it Works"
			>
				<SlideContent title="How It Works: Component Orchestrates Builder">
					<div
						className={clsx("flex", "gap-4", "mb-4")}>
						<div className={clsx("mb-4")}>
							<h3 className={clsx("font-bold", "mb-2")}>The Key Components:</h3>
							<ol className={clsx("list-decimal", "ml-6", "mb-4", "space-y-1")}>
								<li>JSX runtime implementation (<code>jsx</code> function)</li>
								<li>Component functions (<code>GithubWorkflow</code>, <code>Job</code>, <code>Step</code>)</li>
								<li>Builder classes that construct the workflow</li>
								<li>YAML serialization logic</li>
							</ol>
						<img 
							className={clsx("ml-8", "w-110", "h-64")}
							src={fig4_} 
						/>				
						</div>
				<div>
					<Editor
						theme="vs-dark"
						height={"64vh"}
						width={"50vw"}
						defaultLanguage="typescript"
						defaultValue={`// Workflow component implementation
export class GithubWorkflowBuilder {
	constructor(name) {
		this.config = { name, jobs: {} };
	}

	setOn(triggers) { ... }
	addJob(jobBuilder) { 
		this.config.jobs[jobBuilder.id] = jobBuilder; 
		return this;
	}

	build() {
	    // Validation 
		if (this.config.name.length > 255) {
		    throw new Error("Workflow name exceeds 255 characters.");
		}
		
		const output = structuredClone(this.config);
		for (const builder of Object.values(this.config.jobs)) {
			output.jobs[builder.id] = builder.build();
		}
		return output; 
	}
	toYAML() { return convertToYAML(this.build()); }
}

// Component function
export const GithubWorkflow = (props) => {
  const { name, on, children, ...otherProps } = props;

  // 1. Create and configure the builder
  const builder = new GithubWorkflowBuilder(name);
  builder.setOn(on);
  
  // 2. Process any jobs (children)
  if (children) {
	const jobs = Array.isArray(children) ? children : [children];
	jobs.forEach(jobBuilder => builder.addJob(jobBuilder));
  }
  
  // 3. Return builder (or built YAML)
  return builder.toYAML(); // Or return builder for further processing
};`}
						options={{
							fontSize: 16,
							minimap: { enabled: false },
						}}
						beforeMount={(monaco) => {
							monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
								noSemanticValidation: true,
								noSyntaxValidation: true,
							});
						}}						
					/>			
						</div>
					</div>			
				</SlideContent>
				<article>
					The builders are the mechanism that ties JSX and the output together. 
					Each component instantiates a builder and configures it with props. 
					The nested structure of JSX naturally represents the structure of the workflow.
				</article>
				<aside>
					- Emphasize how props become configuration parameters
					- Note how the builder pattern provides a clean 
						API for constructing complex objects
				</aside>
			</Sequence>
		</Fragment>
	);
};
