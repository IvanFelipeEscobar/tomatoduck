import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TaskCard from './task-card'
import Auth from '../utils/auth'
import { saveTodo } from '../utils/API';


export default function Tasks() {
  const [show, setShow] = useState(false);
  const [todos, setTodo] = useState({todo:``})
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (e) => {
   const {name, value} = e.target
   setTodo({todos, [name]:value})
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(`click`)
    console.log(todos)
    const token = Auth.loggedIn() ? Auth.getToken() : null
    if(!token){
      return false
    }
    try {
      
      const response = await saveTodo(todos, token)
      if(!response.ok){
        throw new Error(`there's trouble`)}
        
      setTodo({todo:``})
     

      

      
      
  

    } catch (error) {
      console.error(error)
    }

    

    


   }

  return (
    <div className=' col-6 d-flex-col my-5'>
      <div className='task-header col-12 justify-content-between d-flex flex-wrap'>
        {/* add something like todo[i].length to get the tasks needed */}
        <h2 className='col-md-4 flex-wrap'>Tasks Left: 0</h2>
        <button className='add-task-btn col-md-4 flex-wrap' onClick={handleShow}>
          Add Task
        </button>
      </div>
      <div className='task-container'>
        <TaskCard />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control 
            type='text' 
            placeholder='Your To-do Task' 
            name='todo'
            onChange={handleInput}
            value={todos.todo}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary'  type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
