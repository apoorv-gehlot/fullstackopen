
const Header = ({name}) => <h1>{name}</h1>

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
}

const Content = ({parts}) =>{
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
    </div>
  );
}

const Total = ({parts}) => <h3>total of {parts.reduce(function(sum, part){ return sum + part.exercises }, 0)} exercises</h3>

const Course = ({course}) =>{
  // console.log(course)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;