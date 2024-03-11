
import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Image} from "react-bootstrap";
import { Link } from "react-router-dom";
 import profileService from '../../fichiers/temon3.png'
 import React from 'react'
import SideBars from "../../Components/SideBars/SideBars";
import Tableaux from "../Tableaux/Tableaux";
import NavbarAdmin from "../../Components/Navbars/NavbarAdmin/NavbarAdmin";
 
export default function DetailFavorie() { 
  return (
    <div className="">
   <div className="">
      <div
        className='maincontent-dashbord-static' 
      >
        <div className="contentsidebar">
          <SideBars
           
          />
        </div>
        <div className="secondecontent">
          <div className="">
            <NavbarAdmin />
          </div>
          <Tableaux />
         

          
        </div>
      </div>
    </div>

    
     
    
    </div>
  )
}

