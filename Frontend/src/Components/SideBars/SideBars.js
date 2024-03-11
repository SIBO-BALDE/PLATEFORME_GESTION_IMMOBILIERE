import React from "react";
import "./SideBars.css";
// import profile from "../../Assets/profile.png";
import profile from '../../fichiers/profile.png'
import profile2 from '../../fichiers/profile-blanc.png'
import { Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faFile,
  faGear,
  faUser,
  faSignOutAlt,
  faHouse,
  faGauge,
  faLayerGroup,
  faHeart,
  faEnvelope,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../Pages/Authentification/AxiosAuthIntercepteur";
import Swal from "sweetalert2";



const links = [
  {
    path: "dashbordAdmin",
    text: "Dashboard",
    icon: faGauge,
  },
  {
    path: "gestionuser",
    text: "Gestion Utilisateurs",
    icon: faUser,
  },
  {
    path: "gestionmaison",
    text: "Gestion Maisons",
    icon: faHouse,
  },
  {
    path: "gestionterrain",
    text: "Gestion Terrains",
    icon: faHouse,
  },
  {
    path: "gestionservices",
    text: "Gestion Services",
    icon: faGear,
  },
  
  {
    path: "gestioncategorie",
    text: "Gestion Catégories",
    icon: faLayerGroup,
  },
  {
    path: "gestionfavorie",
    text: "Gestion Témoignages",
    icon: faHeart,
  },
  {
    path: "gestionnewletter",
    text: "Gestion Newsletters",
    icon: faEnvelope,
  },
  {
    path: "gestionmessage",
    text: "Gestion Contacts",
    icon: faMessage,
  },
];

export default function SideBars({ isOpen, name, handleChangePath }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    
  try {
    // Utilisez votre instance Axios configurée
    if (token || role === "admin"){
      const response = await axios.post("http://localhost:8000/api/auth/logout"
      , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
  
      if (response.status === 200) {
        // Votre code de déconnexion réussie ici
  
        Swal.fire({
          title: "Etes-vous sûr ?",
          text: "De vouloir se déconnecter!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#D46F4D",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, bien sûr!"
        }).then((result) => {
          if (result.isConfirmed) {
            // Supprimer le token du localStorage lors de la déconnexion
            // localStorage.removeItem("token");
            localStorage.removeItem("tokencle");
            localStorage.removeItem("rolecle");
  
            Swal.fire({
              title: "Deconnexion!",
              text: "Vous êtes déconnecté avec succès.",
              icon: "success"
            });
            navigate("/connexion");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Échec de déconnexion!",
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};



  return (
    <div style={{ display: !isOpen ? "block" : "none", border:'none' }}>
      <div className="contentOneSidebar">
        <div className="contentimage">
          <div className="d-flex justify-content-center ">
            {" "}
            <Image src={profile2} alt="" id="image-contenu" />
          </div>
          <p className="text-center"><Link to={'/'} style={{textDecoration:'none', color:'white'}}>Moussa Basse</Link></p>
          <hr />
        </div>
        <div id="content-try-content">
          {links.map((link, index) => (
            <div key={index}
              className={`contentlink mt-3 ${
                name === link.path && "activeclassbar"
              }`}
            >
              <FontAwesomeIcon icon={link.icon} className="ms-2" />
              <Button
                className="linkcontent"
                onClick={() => handleChangePath(link.path)}
              >
                <span
                  className={`linktext ${name === link.path && "activeclassbar"}`}
                  id="lktinext"
                >
                  {link.text}
                </span>
              </Button>
            </div>
          ))}
        </div>
        <div className="mainContentBottom">
          <div className="d-flex  justify-content-center">
            <Button className="logout d-flex justify-content-center align-items-center " 
            id="logout" onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="logouticon  "
              />
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}