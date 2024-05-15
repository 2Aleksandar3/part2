import Part from "./Part"
const Content=({parts})=>{

   //let list= parts.map((name)=><li>{name}</li>);
    

    
     console.log('hi',parts)
     console.log('oy', parts[1].exercises)
    return (
        <div>
       
       {parts.map((part) => <Part key={part.id} name={part.name} exercise={part.exercises} />)}
       
        </div>
      )}

export default Content