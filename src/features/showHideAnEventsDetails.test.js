import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow } from "enzyme";
import Event from "../components/Event/Event.jsx"
import { mockData } from "../mock-data.js";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
    test("An event element is collapsed by default", ({ given, when, then }) => {
      given("the user is on the main page of the app", () => {
      });
      let EventWrapper;
      when("an event is displayed", () => {
        EventWrapper = shallow(<Event event={mockData[1]} />);

      });
  
      then("the event details will be collapsed", () => {
        expect(EventWrapper.state("collapsed")).toBe(true);
      });
    });
  
    test("User can expand an event to see its details", ({given, when, then, }) => {
      given("the user is displayed with a list of events", () => {});
      let EventWrapper;
      when("the user clicks on an individual event", () => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
        EventWrapper.setState({
          collapsed: true,
        });
        EventWrapper.find(".show-details").simulate("click");
      });
  
      then("the event details will be displayed", () => {
        expect(EventWrapper.state("collapsed")).toBe(false);
      });
    });
  
    test("User can collapse an event to hide its details", ({ given, when, then, }) => {
      let EventWrapper;
      given("the user has clicked on an event to display details", () => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
      });
  
      when("the user clicks on “close” button", () => {
        EventWrapper.setState({
          collapsed: false,
        });
        EventWrapper.find(".details-button").simulate("click");
      });
  
      then("the event details will hide", () => {
        expect(EventWrapper.state("collapsed")).toBe(true);
      });
    });
})