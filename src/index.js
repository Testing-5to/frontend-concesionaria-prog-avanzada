import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// renderizamos la aplicacion
ReactDOM.render(
	<React.StrictMode>
		<div className="contenedor">
			<App />
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);

