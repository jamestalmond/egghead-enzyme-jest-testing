import React from 'react';
import Form from './Form';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import api from './api';

configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
	const input = wrapper.find(instance);
	input.simulate('change', {
		currentTarget: { value: newValue }
	});
	return wrapper.find(instance);
};

describe('<Form />', () => {
	// opted in by default
	test('receive promotions default is true', () => {
		const wrapper = shallow(<Form />);
		const promotionInput = wrapper.find('[data-testid="checked"]');
		expect(promotionInput.props().checked).toBe(true);
	});
	// actually input their information
	test('allows user to fill out form', () => {
		const wrapper = shallow(<Form />);
		const nameInput = updateInput(wrapper, '[data-testid="name"]', 'James');
		const emailInput = updateInput(
			wrapper,
			'[data-testid="email"]',
			'test@gmail.com'
		);
		const numberInput = updateInput(
			wrapper,
			'[data-testid="number"]',
			'01234567890'
		);
		wrapper.find('[data-testid="checked"]').simulate('click');

		expect(nameInput.props().value).toBe('James');
		expect(emailInput.props().value).toBe('test@gmail.com');
		expect(numberInput.props().value).toBe('01234567890');
		expect(wrapper.find('[data-testid="checked"]').props().checked).toBe(false);
	});
	//submits the form, calls api
	test('submits the form', () => {
		jest
			.spyOn(api, 'addUser')
			.mockImplementation(() => Promise.resolve({ data: 'New User Added' }));
		const wrapper = shallow(<Form />);
		updateInput(wrapper, '[data-testid="name"]', 'James');
		updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com');
		updateInput(wrapper, '[data-testid="number"]', '01234567890');
		wrapper
			.find('[data-testid="addUserForm"]')
			.simulate('submit', { preventDefault: () => {} });

		expect(api.addUser).toHaveBeenCalledWith(
			'James',
			'test@gmail.com',
			'01234567890'
		);
	});
	// matches snapshot
	test('matches saved snapshot', () => {
		const wrapper = shallow(<Form />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
