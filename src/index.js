import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unstable_trace as trace } from 'scheduler/tracing';
import { Profiler } from 'react';

const callback = (id, phase, actualTime, baseTime, startTime, commitTime) => {
	// console.log(`${id}'s ${phase} phase:`);
	// console.log(`Actual time: ${actualTime / 1000} seconds`);
	// console.log(`Base time: ${baseTime / 1000} seconds`);
	// console.log(`Start time: ${startTime / 1000} seconds`);
	// console.log(`Commit time: ${commitTime / 1000} seconds`);
}
// renderizamos la aplicacion
ReactDOM.render(
	<React.StrictMode>
		<div className="contenedor">
		<Profiler id="YourComponent" onRender={callback}>

			<App />
			</Profiler>

		</div>
	</React.StrictMode>,
	document.getElementById('root')
);

