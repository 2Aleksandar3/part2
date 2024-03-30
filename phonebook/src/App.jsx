import { useState } from 'react'

const Filter=(props)=>{
  return(
    <form>
        <div>
          filter shown with <input value={props.filterName} onChange={e => props.setFilterName(e.target.value)}/>
        </div>
      </form>
  )
}

const PersonForm=(props)=>{
  let namesLen=props.persons.length
  return(
    <form onSubmit={props.AddNewName}>
        <div>
          name: <input  value={props.newName} onChange={e => props.setNewName(e.target.value)}/> 
        </div>
        <div>
          number: <input   value={props.newNumber} onChange={e => props.setNewNumber(e.target.value)}/> 
        </div>
        
        <div>
          <button type="submit"  onClick={() => {
            setTimeout(() =>{
        props.setPersons(persons=>[...persons,{ id:namesLen++, name: props.newName,number: props.newNumber }])},100);
      }}>add</button>
        </div>
      </form>
  )
}

const Persons=(props)=>{
  console.log(props.namesToShow,'whatup')
  
  return(
    <ul>
        {props.namesToShow.map((person)=> <li key={person.id}>{person.name} {person.number} </li>
           )}
      </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { 
      id:1,
      name: 'Arto Hellas',
      number:'0637620440'
   },
   {
    id:2,
    name:'Otto Afaknfk',
    number:'44-5565-897'
   }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const AddNewName=(event)=>{
    console.log(persons.find((person) =>  person.name===newName ),'hiya')
   
    if (persons.find(function(person) {return person.name === newName})){
      
      window.alert(newName +' was already entered')
    }
    event.preventDefault();
    console.log('The name you entered was: ',newName)
    console.log(persons)
  }
  
  const namesToShow = filterName==='' ? persons:persons.filter(persons=>persons.name.toLowerCase().includes(filterName.toLowerCase()))

  let namesLen=persons.length
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterName={setFilterName}/>
      <form>
        <div>
          filter shown with <input value={filterName} onChange={e => setFilterName(e.target.value)}/>
        </div>
      </form>
      <h2>add a new</h2>
      <PersonForm setNewName={setNewName} setNewNumber={setNewNumber} AddNewName={AddNewName} setPersons={setPersons} persons={persons} />
      <form onSubmit={AddNewName}>
        <div>
          name: <input  value={newName} onChange={e => setNewName(e.target.value)}/> 
        </div>
        <div>
          number: <input   value={newNumber} onChange={e => setNewNumber(e.target.value)}/> 
        </div>
        
        <div>
          <button type="submit"  onClick={() => {
            setTimeout(() =>{
        setPersons(persons=>[...persons,{ id:namesLen++, name: newName,number: newNumber }])},100);
      }}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} filterName={filterName} id={persons.id} name={persons.name} number={persons.number}/>
      <ul>
        {namesToShow.map(function(persons) {return ( <li key={persons.id}>{persons.name} {persons.number} </li>
           )}) }
      </ul>
    </div>
  )
}

export default App