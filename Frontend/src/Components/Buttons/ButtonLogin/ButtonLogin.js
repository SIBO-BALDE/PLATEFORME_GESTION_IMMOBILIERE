import React, { useState } from 'react'
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ButtonLogin({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    navigate('connexion')
    
  };
  
       
      
  return (
    <div>
        <div className="d-flex me-3 " id='btnpabiernav'>
           
            <Button className=' btn btn-connection' onClick={handleLogin} ><Nav.Link href='/connexion' >Connexion</Nav.Link></Button>
          </div>
    </div>
  )
}
