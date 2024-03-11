import React from 'react'
import { Button} from 'react-bootstrap';

export default function ButtonLogOut({ handleLogout }) {


  return (
    <div>
      <div className="d-flex me-3 " id='btnpabiernav'>
           <Button className=' btn btn-connection1' onClick={handleLogout} >Deconnexion</Button>
         </div>
    </div>
  )
}
