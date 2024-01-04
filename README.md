# Football Roster Management App
## Overview
This React application was developed as part of a coding challenge to showcase expertise in state management, dynamic data population, and adherence to design specifications. The challenge focused on creating a Roster Management App with two main pages: Roster Details and Formation Overview.

## Roster Details
Editable Team Name
Allows users to edit the team name, with the edit icon always visible initially.
After the name is changed once, the edit icon is visible only on hovering.

## Search Field
Includes a search bar to filter players by name and/or position.
Supports keystrokes: Enter to execute the search, ESC to cancel, and clicking 'x' to clear the search criteria.

## Roster Importer
Handles importing rosters from .csv files, with error handling for empty values.
Provides a summary of player counts and positions before import.
Supports re-importing, clearing, and refreshing the application state.

## Roster Table
Displays player data in a table, including country flags and readable height/weight values.
Includes an actions menu for editing or deleting players, with validation checks.

# Formation Overview
## Formation Preview
Displays a 4-3-3 formation with players positioned according to their roles.
Checks for roster availability, sufficient starters, and appropriate position counts.
Shows specific messages if conditions are not met.

## Player Details
Allows users to view details about players in the formation.
Clicking on a player reveals their information and position-specific stats.
Goalkeepers show Clean Sheets and Saves, while other positions show Goals, Assists, Appearance, and Minutes Played.

# How to Run Locally
1.Clone the repository.
2.Install dependencies using npm install.
3.Run the application locally with npm start.

# Deployment
The application is deployed using Netlify for easy access.
You can find the application here : https://657094d30f58ec068270f9ca-snazzy-beig.netlify.app/
