```mermaid
flowchart TD
	JSX --> Compiler
	Compiler --> jsx/createElement
	jsx/createElement --> Engine

	createElement --> React.render
	React.render --> HTML
	jsx --> ???
	??? --> YAML
```