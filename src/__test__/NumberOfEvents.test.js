import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

	test('render text input', () => {
		expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
	});

	test('change numberOfEvents state when number input changes', () => {
		const numberOfEvents = NumberOfEventsWrapper.prop('number-of-events');
    	expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(numberOfEvents);
	});
})