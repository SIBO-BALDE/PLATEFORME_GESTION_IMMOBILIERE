import React, { useEffect, useState } from 'react'
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil'
import Footer from '../../Components/Footer/Footer'
import Underline from '../../Components/Underline/Underline'
import detailservices from '../../fichiers/contruction.png'
import { Button, Image } from 'react-bootstrap'
import './DetailServicesAdmin.css';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import SideBars from '../../Components/SideBars/SideBars'
import NavbarAdmin from '../../Components/Navbars/NavbarAdmin/NavbarAdmin'
import Tableaux from '../Tableaux/Tableaux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


export default function DetailServicesAdmin() {

   // use params nous permet de recuperer les paramettre de mon url qui sont dans l'url comme l'id
   const { id } = useParams();
   const [serviceDetails, setServiceDetails] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchTerrDetails = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem('tokencle')
      try {
        if (token || role==="admin"){
          const response = await axios.get(
            `http://localhost:8000/api/service/detail/${id}`,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.service) {
            setServiceDetails(response.data.service);
            console.log(response.data, "ici la reponse de detail service");
          } else {
            console.error("La réponse de détail est undefined ou null.");
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du terrain:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTerrDetails();
  }, [id]);

  console.log("serserviceDetails:",serviceDetails);

  console.log("serserviceDetails:",serviceDetails);
  return (
    <div>
    
    

     <div className="">
        <div className="">
          {/* <div className="contentsidebar">
            <SideBars />
          </div> */}
          <div className="">
            <div className="container">
              {/* <NavbarAdmin /> */}
              <Link to={'/dashbordAdmin'} 
              style={{color:'#D46F4D', textDecoration:'none', fontWeight:'bold', marginTop:'20px'}}>
                <FontAwesomeIcon  icon={faHouse}/> DASHBOARD ADMIN</Link>
            </div>
            {/* <Tableaux /> */}
            <div
              id="content-main-detail-maison-content-admin"
              className="mt-2 container "
            >
              <div className="d-flex content-main-detailmaison container ">
                <div className="one-img-left">
                  <div className="img-main-detail-maison">
                    <Image
                      // src={serviceDetails.image}
                      src={`http://localhost:8000/storage/${serviceDetails.image}`} 
                      className="content-img-detail-maison1"
                    />
                   
                  </div>
                </div>
                <div className="second-img-right">
                  <div className="second-img-right1">
                    <h1>Service</h1>
                    <h6> {serviceDetails.titre} </h6>
                    <div className="">
                      <div>
                        <div>
                         
                          <span>{serviceDetails.description}</span>
                        </div>
                   
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      
      </div>
    
    </div>
  )
}


