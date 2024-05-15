import { useState,useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import persons from './services/persons'


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
  
  
  return(
    <ul>
        {props.namesToShow.map((person)=> <li key={person.id}>
        {person.name} {person.number}     
        
        <button onClick={()=>{if(window.confirm("Delete "+person.name+"?"))
        {personService.remove(person.id)
        .then(()=>props.setPersons(props.persons.filter((newObject)=> newObject.id !==person.id)))}}}>
           delete
        </button>
         </li>
           )}
      </ul>
  )
}

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  if(message!=null){
  return (
    <div className='message'>
      {message}
    </div>
  )}
  

}
const ErrorMessage=({error})=>{
  if(error===null){
    return null
  }
  if(error!=null){
    return(
      <div className='error'>
        {error}
      </div>
    )
  }
}


const App = () => {
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message,setNewMessage]= useState('')
  const [error,setErrorMessage]= useState('')
  

  
  

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const AddNewName=(event)=>{
    const sameName = persons.find(function(person) {return person.name === newName});
    
    
    
    console.log(persons.find((person)=> person.name===newName ),'hiya')
   
    if (sameName){
      const changedNum={...persons,number:newNumber ,name:newName, id:sameName.id}
      if(window.confirm(newName +' is already added to phonebook, replace the old number with a new one?')){
        personService.update(sameName.id,changedNum)
        .catch(error => {
          
          setErrorMessage(
            `Information of '${sameName.name}' has already been removed from the server `
          );
          console.log(sameName.id,'fgdhhjgdjt')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          
          setPersons(persons.filter((n) => n.id !== sameName.id));
        })
        .then(returnedPerson=>
          {
            setPersons(persons.map(person=>
              person.id!=returnedPerson.id?
              person:returnedPerson))
              setNewMessage(`${newName} changed number`)
              setTimeout(() => {
                setNewMessage(null)
              }, 5000)
          })
          
      }
    }
    event.preventDefault();
    
    console.log('The name you entered was: ',newName)
    console.log(persons)
    const peopleObj={
      name:newName,
      number:newNumber,
      id:`${persons.length+1}`
    }
    console.log(peopleObj.id,"hello")

    personService
    .create(peopleObj)
    .then(returnedPerson => {
      console.log(returnedPerson,'ola')
      
      setNewName('')
      setNewNumber('')
      setNewMessage(`${newName} is added to the phonebook`)
              setTimeout(() => {
                setNewMessage(null)
              }, 5000)
    })

  }
  
  const namesToShow = (filterName==='')||(!window.confirm) ? persons:persons.filter(persons=>persons.name.toLowerCase().includes(filterName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <ErrorMessage error={error}/>
      <Filter setFilterName={setFilterName} filterName={filterName}/>
      
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}  setPersons={setPersons} AddNewName={AddNewName} persons={persons} id={persons.id} />
      
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} filterName={filterName} AddNewName={AddNewName} setPersons={setPersons} persons={persons} id={persons.id} name={persons.name} number={persons.number}/>
      
    </div>
  )
}

export default App


