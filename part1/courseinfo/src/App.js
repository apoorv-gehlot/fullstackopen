
const Part = (props) => {
  // console.log(props.part)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  );
}

const Header = (props) =>{
  // console.log(props.course)
  return(
    <h1>{props.name}</h1>
  );
}

const Content = (props) =>{
  // console.log(props.course.parts)
  return (
    <div>
      <Part part={props.course.parts[0]}/>
      <Part part={props.course.parts[1]}/>
      <Part part={props.course.parts[2]}/>
    </div>
  );
}

const Total = (props) => {
  let total=0
  props.course.parts.forEach(part => {
    total += part.exercises
  });

  return (
    <p>Number of exercises {total}</p>
  );
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  );
}

export default App;
