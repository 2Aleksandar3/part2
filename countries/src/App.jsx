import { useState,useEffect, Children } from 'react'
import axios from 'axios'




const Pressed=({index,title,setFilter})=>{
  const [isActive, setIsActive] = useState(false);
  
  if(isActive===true){
    
    setFilter(title)
    
  }
  else {
    
    for(let i=0;i<1;i++){
    
  return (<div>
    <li key={index}>{title} <button id={index} onClick={() => {setIsActive(true)}}>show</button></li>
    </div>
  )}
}
 
}

const GettingWeather=(name)=>{
  const [weather, setWeather]= useState()
  console.log(name.name,'ime')

  const url = import.meta.env.VITE_APP_API_URL
  const api_key= import.meta.env.VITE_APP_API_KEY
  

  useEffect(() => {
    axios.get(`${url}/weather?q=${name.name}&appid=${api_key}`).then((res) => {
      setWeather(res.data);
    }).catch((error) => {
      if (error.response) {
        console.error('Server Error:', error.response.status);
      } else if (error.request) {
        console.error('Network Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    });},[])

    console.log(weather?.weather,'temp')
    return(
      <div>
        <p>temperature {weather?.main.temp} </p>
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}/>
        <p>wind {weather?.wind.speed}</p>
      </div>
    )
}

const CountryList=(props)=>{
  
  

  if(props.countriesToShow.length===1 ){
    
    
    console.log(props.countriesToShow[0].name.common,'hiloa')
    
    
    return(
      <div>
      
      <h2>{props.countriesToShow[0].name.common}</h2>
        <p>capital {props.countriesToShow[0].capital} <br/>area {props.countriesToShow[0].area}</p>
        <h3>languages: </h3>
        <ul>
        {Object.values(props.countriesToShow[0].languages).map((languages, index) => (
            <li key={index}>{languages}</li>
          ))}
        </ul>
        <img src={props.countriesToShow[0].flags.png}/>
        <GettingWeather name={props.countriesToShow[0].name.common}/>
      </div>
    )
  }
   else if(props.countriesToShow.length>10){
    return(
      <div>
      Too many matches, specify another filter 
    </div>
    )
  }else if(props.countriesToShow.length>1){
   
      return (
    <div>
      <ul>
          {props.countriesToShow.map(function(countries,index) {return ( 
            
            <Pressed  setFilter={props.setFilter} title={countries.name.common} index={index} capital={countries.capital} area={countries.area} flags={countries.flags.png} languages={countries.languages}>
            helo
            </Pressed>
            
             )}) }
             
        </ul>
    </div>
    )
    
  }
 
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterName,setFilter]=useState("")
  

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((res) => {
      setCountries(res.data);
    });
    
    
  },[]);
  if(countries.length===0) return null
  
  

  

  
  const countriesToShow = filterName==='' ? '':countries.filter(countries=>countries.name.common.toLowerCase().includes(filterName.toLowerCase()))

 console.log(countriesToShow,'whazuuuup')
  console.log(countries[1].name.common,'hellllllo');
  

return (
  <div>
    <form>
      <div>
        find countries <input value={filterName} onChange={e => setFilter(e.target.value)}/>
      </div>
    </form>
    <CountryList countriesToShow={countriesToShow} setFilter={setFilter}/>
  </div>
  )
}

export default App
