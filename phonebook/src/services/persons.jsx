import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const request = axios.post(baseUrl, newObject)
  console.log(newObject,'tchsus')
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  console.log(newObject,'What ')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const remove= async(id)=>{
  console.log(id,'whsup')
  
  const request= axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update ,
  remove: remove
  
}