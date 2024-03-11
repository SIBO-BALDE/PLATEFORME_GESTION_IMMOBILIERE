import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import NavbarAdmin from "../../Components/Navbars/NavbarAdmin/NavbarAdmin";
import Tableaux from "../Tableaux/Tableaux";
import SideBars from "../../Components/SideBars/SideBars";
import { faGlobe, faHouse, faLocationDot, faTag } from "@fortawesome/free-solid-svg-icons";

export default function DetailTerrainAdmin() {
  // use params nous permet de recuperer les paramettre de mon url qui sont dans l'url comme l'id
  const { id } = useParams();
  const [terrainDetails, setTerrainDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerrDetails = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem('tokencle')

      try {
        if (token || role==="admin"){

          const response = await axios.get(
            `http://localhost:8000/api/terrain/detail/${id}`,
            
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.terrain) {
            setTerrainDetails(response.data.terrain);
            console.log(response.data, "ici la reponse de detail");
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

  console.log("terrainDetails:", terrainDetails);

  console.log("terrainDetails:", terrainDetails);

  return (
    
      
      <div className="">
        <div className="">
          <div className="contentsidebar">
            {/* <SideBars /> */}
          </div>
          <div className="">
            {/* <div className="">
              <NavbarAdmin />
            </div> */}
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
                      // src={terrainDetails.image}
                      src={`http://localhost:8000/storage/${terrainDetails.image}`} 
                      className="content-img-detail-maison1"
                    />
                  </div>
                </div>
                <div className="second-img-right">
                  <div className="second-img-right1">
                    <h1>Terrain</h1>
                    <p> {terrainDetails.description} </p>
                    <div className="">
                      <div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faGlobe}
                              id="icon-details-right"
                            />
                          </span>
                          <span>Superficie: {terrainDetails.superficie} m2</span>
                        </div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faTag}
                              id="icon-details-right"
                            />
                          </span>
                          <span>Prix: {terrainDetails.prix} FCFA</span>
                        </div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              id="icon-details-right"
                            />
                          </span>
                          <span>Adresse: {terrainDetails.addresse}</span>
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
    
    
  );
}
