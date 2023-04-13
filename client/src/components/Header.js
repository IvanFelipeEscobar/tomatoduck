import React, { useState } from 'react';
import icon from '../assets/tomato-24.svg';
// import { Nav, Container} from 'reactstrap';
import { Link } from 'react-router-dom'
import { Modal, Tab, Nav,} from 'react-bootstrap'
import SignUpForm from './Signup';
import LoginForm from './Login';
import Auth from '../utils/auth'

const Header = () => {
  const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  return (
    <div className='container'>
      <nav className='navbar d-flex'>
        <Link className='link-unstyled d-flex' to='/'>
          <img src={icon} alt='Tomato icon' />
          <h2 className='d-flex align-self-center'>TomatoDuck</h2>
        </Link>
        {Auth.loggedIn() ? (<>
        <div className='container d-flex justify-content-end'>
          <Link className='mx-2' to='/preferences'>
            <button className='login-btn'>User Settings</button>
          </Link>
          <button className='login-btn' onClick={Auth.logout}>Log Out</button></div>
          </>

        ) : (
        <button className='login-btn' onClick={()=>setModal(true)}>
          Sign In/Sign Up
        </button>)
        } 
      </nav>


     <Modal
      show={modal}
      onHide={()=> setModal(false)}
      aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey ='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Sign In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={()=> setModal(false)}/>
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={()=> setModal(false)}/>
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>

      </Modal>
    </div>
  );
};

export default Header;

  