import { useEffect, useState } from 'react'
import './App.css'                   //now the css will be applied after importing this
import axios from 'axios'


function App(){

  const BASE_URL = "https://student-mangement-backend-1-ffzy.onrender.com"
  // const [stateVariable, setStateFunction] = useState(initialValue);

  // stateVariable → stores the current value.
  // setStateFunction → updates that value.
  // initialValue → the value when the component first loads.

  const[students , setStudents] = useState([])     //setstudents is a function  //student is an array
  const[id,setId] = useState('')   //to take the input from the input id box
  const[name,setName] = useState('')
  const[course,setCourse] = useState('')
  const[update,setUpdate] = useState(false)
  
  
  async function getStudents(){
      const response = await axios.get(BASE_URL+'/students')
      setStudents(response.data)      //response is the object and data is the key of the object
  }
  
  useEffect(() => {          //when u open the page automatically this function is called
    getStudents()
  },[])     //Arrow function
  
  
  //event.target.value contains the input value (check in console under events have target and under target value is present)
  function handleId(event){
    setId(event.target.value)
  }

  function handleName(event){
    setName(event.target.value)
  }

  function handleCourse(event){
    setCourse(event.target.value)
  }
  
  async function sendData(){
    if(update === false){
      const response=await axios.post(BASE_URL+'/students',{
        id:id,
        name:name,
        course:course
      })
      alert(response.data.message)  //json madhe ek key aahe "message"(written in backend also return{"message":}) so will get its value
    } else{     //call PUT method
        const response = await axios.put(BASE_URL+'/students/'+id,{    //,id is the path parameter
          id:id,
          name:name,
          course:course
        })
        alert(response.data.message)
    } 
    }

  function editStudent(student){      
    setId(student.id)
    setName(student.name)
    setCourse(student.course)
    setUpdate(true)     //if clicked on edit button then update should become true
  }

  async function deleteStudent(id){
    const response = await axios.delete(BASE_URL+'/students/'+id)
    alert(response.data.message)
    getStudents()
  }



  //ALL THE FUNCTIONS SHOULD BE WRITTEN ABOVE RETURN
  return(
    //use className instead of class as the babble compiler may get confuse
    <div className='container'>   
        <h1>Student Management System</h1>

        <form className='student-form'>      {/* student-form written here so that the css functionalities of student-form should be applied here also*/ }
          <input type="number" placeholder='Student ID' onChange={handleId} value={id}></input>
          <input type="text" placeholder='Student Name' onChange={handleName} value={name}></input>
          <input type="text" placeholder='Student Course' onChange={handleCourse} value={course}></input>
          <button onClick={sendData}>{update?"Update":"Submit"}</button>
        </form>

        <table>
          <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
          </thead>
          <tbody>
            
            {students.map((student) => {
              return(
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td><button className='edit-btn' onClick={() => {editStudent(student)}}>Edit</button></td>                   
                  <td><button className='delete-btn' onClick={() => {deleteStudent(student.id)}}>Delete</button></td>
                </tr>
              )
            })}                                        
          </tbody>
        </table>
    </div>
  ) 
}

export default App         //you need to compulasarily export the function in order to import new function