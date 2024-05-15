import Header from "./Header"
import Part from './Part'
import Content from './Content'


const Course=({course})=> {
    
    let total = course.parts.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.exercises;
      }, 0);
    
      
    console.log(course.parts)
    console.log(course.parts.length)
    console.log(course.parts[0].name)
    return(
        <>
            <Header title={course.name}/>
            
            <Content parts={course.parts}/>

            <b>
            total of {total} exercises
            </b>
        </>
    )
}

export default Course


//const names=[]
    //const exercises=[] 

/*for(let i=0;i<course.parts.length;i++){
        names.push(course.parts[i].name)
        exercises.push(course.parts[i].exercises)
    }*/
    //<Part name={names} exercise={exercises}/>