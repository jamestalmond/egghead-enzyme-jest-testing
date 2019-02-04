import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () => <div>Testing</div>;
const Title = ({ text }) => <div>{text}</div>;

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Title text="Foo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<Test />
					<ul className="App-list">
						<li>Test 1</li>
						<li>Test 2</li>
						<li>Test 3</li>
					</ul>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		);
	}
}

export default App;
