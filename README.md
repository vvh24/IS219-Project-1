# IS219-Project-1
Data Visualization Project: Telling Stories Through Code
# Topic: Technology - UFO Interactive Map
# Essential Question: Where and when have UFO sightings been most frequently reported in the last 50 years?
### Description
UFO sightings Visualization that displays real time and historical sightings on an interactive map 
### Data Sources
    NUFORC Dataset - scrubbed file (CSV)
### Potential Visualizations: 
    Real-world data by using NUFORC reports 
    Incorporate map, filters, trends over time

#### Date: 02/11/2025
1. Get datasets using Kaggle: https://www.kaggle.com/datasets/NUFORC/ufo-sightings?resource=download 

2. Zip file contains 2 cvs files. The one chosen was scrubbed.csv which contains a cleaned and formatted: date & time, city, state, country, shape of the UFO, duration of sighting, description (comments), and latitude & longitude (for mapping) information. 

3. Convert scrubbed.csv file into JSON format 

4. Created a React App and installed Leaflet.js and React-Leaflet for mapping 

5. Moved ufo_sightings.json to public/data/ and used fetch() in React to load and display the data

