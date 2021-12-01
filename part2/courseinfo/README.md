# Exercises 2.1.-2.5.

## 2.1: Course information step6
Let's change the App component like so:

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}
Define a component responsible for formatting a single course called Course.

The component structure of the application can be, for example, the following:

App
  Course
    Header
    Content
      Part
      Part
      ...
Hence, the Course component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

## 2.2: Course information step7
Show also the sum of the exercises of the course.

## 2.3*: Course information step8
If you haven't done so already, calculate the sum of exercises with the array method reduce.

## 2.4: Course information step9
Let's extend our application to allow for an arbitrary number of courses

## 2.5: separate module
Declare the Course component as a separate module, which is imported by the App component. You can include all subcomponents of the course into the same module.