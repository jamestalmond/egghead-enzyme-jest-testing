import React from 'react';
import ReactDOM from 'react-dom';
import App, { Link } from './App';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<App /> shallow rendering', () => {
	it('should render 1 p tag', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('p').length).toBe(3);
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

	it('matches the snapshot', () => {
		const tree = shallow(<App />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('updates className with new State', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('.blue').length).toBe(1);
		expect(wrapper.find('.red').length).toBe(0);
		wrapper.setState({ mainColor: 'red' });
		expect(wrapper.find('.blue').length).toBe(0);
		expect(wrapper.find('.red').length).toBe(1);
	});

	it('on button click changes p text', () => {
		const wrapper = shallow(<App />);
		const button = wrapper.find('button');
		expect(wrapper.find('.button-state').text()).toBe('No!');
		button.simulate('click');
		expect(wrapper.find('.button-state').text()).toBe('Yes!');
	});

	it('on input change, title changes text', () => {
		const wrapper = shallow(<App />);
		const input = wrapper.find('input');
		expect(wrapper.find('h2').text()).toBe('');
		input.simulate('change', { currentTarget: { value: 'James' } });
		expect(wrapper.find('h2').text()).toBe('James');
	});

	it('calls componentDidMount, updates p tag text', () => {
		jest.spyOn(App.prototype, 'componentDidMount');
		const wrapper = shallow(<App />);
		expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
		expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount');
	});

	it('setProps calls componentWillReceiveProps', () => {
		jest.spyOn(App.prototype, 'componentWillReceiveProps');
		const wrapper = shallow(<App />);
		wrapper.setProps({ hide: true });
		expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1);
		expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps');
	});

	it('handleStrings function returns correctly', () => {
		const wrapper = shallow(<App />);
		const trueReturn = wrapper.instance().handleStrings('Hello world');
		expect(trueReturn).toBe(true);
		const falseReturn = wrapper.instance().handleStrings('');
		expect(falseReturn).toBe(false);
	});
});

describe('<App /> mount rendering', () => {
	it('should render 1 p tag', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('p').length).toBe(3);
		wrapper.unmount();
	});

	it('should render an element with the class .App-header', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('.App-header').exists()).toBe(true);
		wrapper.unmount();
	});

	it('should render an ul tag with 3 children', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('ul').children().length).toBe(3);
		wrapper.unmount();
	});

	it('should render an ul tag with the className App-list', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('ul').hasClass('App-list')).toBe(true);
		wrapper.unmount();
	});

	it('should render an a tag with the text Learn React', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('a').text()).toBe('Learn React');
		wrapper.unmount();
	});

	it('should find an element with the text prop', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find('[text="Foo"]'));
		wrapper.unmount();
	});

	it('should find an element with the specified alt text', () => {
		const wrapper = mount(<App />);
		expect(wrapper.find({ alt: 'logo' }));
		wrapper.unmount();
	});

	it('matches the snapshot', () => {
		const tree = mount(<App />);
		expect(toJson(tree)).toMatchSnapshot();
		tree.unmount();
	});
});

describe('<Link />', () => {
	it('link component accepts address prop', () => {
		const wrapper = shallow(<Link address="www.google.com" />);
		expect(wrapper.instance().props.address).toBe('www.google.com');
	});

	it('a tag node renders href correctly', () => {
		const wrapper = shallow(<Link address="www.google.com" />);
		expect(wrapper.props().href).toBe('www.google.com');
	});

	it('returns null with true hide prop ', () => {
		const wrapper = shallow(<Link hide={false} />);
		expect(wrapper.find('a').length).toBe(1);
		wrapper.setProps({ hide: true });
		expect(wrapper.get(0)).toBeNull();
	});
});
