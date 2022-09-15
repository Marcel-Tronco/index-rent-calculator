# General Info

## What is the app about
This is the code from a project I worked on earlier this year for a client concerning the planned new rent index system of a city in Germany. Users where informed on the planned rent index and could calculate the index rent for their flat. Additionally they could participate in gathering data for an overview on what that rent index meant compared to the „real rents“.

## System Architecture

### Context
The base for the chosen design was the strict scarcity of both time for development and funds/know how for the operation/maintenance of it. Aims where fast development and the possibility to change some info texts easily without excessive technical knowledge.

### Core funcionality

People should be able to read the info and use the calculator on the frontend. On the backend selected data users wanted to contribute should be saved and made accessible easily in a way and format the client with no deep technical knowledge can easily understand.

### Broad Structure

The frontend was build with react using ui elements of Material UI to fasten development and clients inputs in form of markdown texts. The calculation is a small and simple script running in the frontend. (Parts of the calculated) Data is sent to the backend.

The backend is an express app. On the one hand it serves the frontend app to users on the other it has an api route, where data is gathered and can be downloaded by the client using a Sqlite3 database.

### More on the frontend 

To minimize the need for communication with the client and adaptions necessary to translate the raw text into a styled text, markdown texts where used. In that way the client could play around searching for the right text styling all on their own.

Navigation in the single page application is organized via scrolling with refs.

### Backend

The approach to use a Sqlite3 data base rather than cloud based storage or an extra data base container etc. was chosen for simplicity/economical reasons. Cloud database services aren't cheap, maintening an extra database, setting it up etc costs time...

Sqlite3 is generally a fast database. The main bottleneck for the task at hand is that saving new data (i.e. doing an „INSERT“ query) runs synchronously, only one insert after another, the new ones waiting until the db file is saved, the write lock is gone etc. But as thousands of new entries at one time were no probable scenerio that did hardly matter.

Easy access to the data for the client was established via a csv download function using the built-in JavaScript features.