Feature: Specify number of events

Scenario: When user hasn’t specified a number, thirty-two is the default number.
Given the user selected a city before 
When user sees an added input parameter field to choose number of events shown 
Then user should be able to get a default number of thirty-two events

Scenario: User can change the number of events they want to see.
Given user did not modify number 
When User changes number 
Then user should be able to see more/less event elements depending on the number