import React, { useEffect, useState } from "react";
import NavbarAccueil from "../../Components/Navbars/NavbarAccueil/NavbarAccueil";
import Footer from "../../Components/Footer/Footer";
import Underline from "../../Components/Underline/Underline";
import detailterrain from "../../fichiers/land1.png";
import { Button, Image } from "react-bootstrap";
import "./DetailTerrain.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLocationDot,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

export default function DetailTerrain() {
  const { id } = useParams();
  const [terrainDetails, setTerrainDetails] = useState({});
  const [loading, setLoading] = useState(true);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchterrainDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/terrain/detail/${id}`
        );

        if (response.data.terrain) {
          setTerrainDetails(response.data.terrain);
          // console.log(response.data.terrain, "cc cmt");
        } else {
          // console.error("La réponse de détail est undefined ou null.");
        }
      } catch (error) {
        // console.error(
        //   "Erreur lors de la récupération des détails de la maison:",
        //   error
        // );
      } finally {
        setLoading(false);
      }
    };

    fetchterrainDetails();
  }, [id]);

  const handleClickMoreUser = async () =>{
    let  phoneNumber = 774935677 ; 
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir communiquer avec l'admin?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D46F4D',
      cancelButtonColor: '#f00020',
      confirmButtonText: "Oui, j'accepte!",
    }).then((result)=>{
      console.log(result);
      if (result.isConfirmed) {
        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
       
      }
    })
  }

  return (
    <div>
      <NavbarAccueil />
      <div id="content-main-detail-maison-content">
        <Underline text="Detail terrain" />
        <div className="d-flex content-main-detailmaison-terrain container">
          <div className="one-img-left-terrain" style={{height:'360px'}}>
            <div className="img-main-detail-terrain" >
              <Image
                // src={terrainDetails && terrainDetails.image}
                src={`http://localhost:8000/storage/${terrainDetails && terrainDetails.image}`}
                className="content-img-detail-terrain1"
              />
            </div>
            
          </div>
          <div className="second-img-right-terrain" style={{height:'360px'}}>
            <div className="second-img-right1-terrain">
              <h1>Terrain</h1>
              <p>{terrainDetails && terrainDetails.description}</p>
              <div className="">
                <div>
                  <div>
                    <span>
                      <FontAwesomeIcon
                        icon={faGlobe}
                        id="icon-details-right-terrain"
                      />
                    </span>
                    <span>
                      {terrainDetails && terrainDetails.superficie} m2
                    </span>
                  </div>
                  <div>
                    <span>
                      <FontAwesomeIcon
                        icon={faTag}
                        id="icon-details-right-terrain"
                      />
                    </span>
                    <span>{terrainDetails && terrainDetails.prix}FCFA</span>
                  </div>
                  <div>
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        id="icon-details-right-terrain"
                      />
                    </span>
                    <span>{terrainDetails && terrainDetails.addresse}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <Button id="btn-btn-ajouter-panier-terrain" className="w-100" onClick={handleClickMoreUser}>
                  <Link
                    
                    style={{ textDecoration: "none", color: "white" }}
                    id="panier-btn-hover"
                  >
                   Plus d'info
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
