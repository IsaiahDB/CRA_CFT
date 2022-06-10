import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

	test('render text input', () => {
		expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
	});
	test("renders number input correctly", () => {
		const query = NumberOfEventsWrapper.state("numberOfEvents");
		expect(NumberOfEventsWrapper.find(".numberChange").props("value")).toBe(query);
	  });

	test('change numberOfEvents state when number input changes', () => {
		NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    	expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual(32);
	});
})