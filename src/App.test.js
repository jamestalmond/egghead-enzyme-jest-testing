import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
	it('should render 1 p tag', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('p').length).toBe(1);
	});

	it('should render an element with the class .App-header', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('.App-header').exists()).toBe(true);
	});

	it('should render an ul tag with 3 children', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('ul').children().length).toBe(3);
	});

	it('should render an ul tag with the className App-list', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('ul').hasClass('App-list')).toBe(true);
	});

	it('should render an a tag with the text Learn React', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('a').text()).toBe('Learn React');
	});

	it('should find an element with the text prop', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('[text="Foo"]'));
	});

	it('should find an element with the specified alt text', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find({ alt: 'logo' }));
	});
});
