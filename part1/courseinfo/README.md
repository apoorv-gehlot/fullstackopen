# 1.1: course information, 

## Exercises 1.1.-1.2.
### step1
The application that we will start working on in this exercise will be further developed in a few of the following exercises. In this and other upcoming exercise sets in this course, it is enough to only submit the final state of the application. If desired, you may also create a commit for each exercise of the series, but this is entirely optional.

Use create-react-app to initialize a new application. Modify index.js to match with the code given in exercise,
and remove extra files (App.css, App.test.js, index.css, logo.svg, setupTests.js, reportWebVitals.js)).

### step2
Unfortunately, the entire application is in the same component. 

Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.

Define the new components in file App.js.

## Exercises 1.3.-1.5.
Change the course and its parts into a single JavaScript object. Fix everything that breaks.