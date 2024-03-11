import React, { useEffect, useState } from "react";
import "./DashbordAdmin.css";
import NavbarAdmin from "../../Components/Navbars/NavbarAdmin/NavbarAdmin";
import SideBars from "../../Components/SideBars/SideBars";
import { Image } from "react-bootstrap";
import Tableaux from "../Tableaux/Tableaux";
import profile from "../../fichiers/profile.png";
import Chart from "../../Components/Charts/Charts";
import GestionUtilisateurs from "../GestionUtilisateurs/GestionUtilisateurs";
import GestionMaison from "../GestionMaison/GestionMaison";
import GestionTerrain from "../GestionTerrain/GestionTerrain";
import GestionServices from "../GestionServices/GestionServices";
import GestionFavorie from "../GestionFavorie/GestionFavorie";
import GestionCategorie from "../GestionCategorie/GestionCategorie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentification/AuthContext";
import Swal from "sweetalert2";
import GestionNewsLetter from "../GestionNewsletter/GestionNewsLetter";
import Pagination from "../../Components/Pagination/Pagination";
import GestionMessage from "../../Pages/GestionMessage/GestionMessage";


function KPI() {
  const [userLists, setUserLists] = useState([]);
 

  useEffect(() => {
    const fetchUsers = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "admin") {
          const response = await axios.get(
            "http://localhost:8000/api/users/liste"
            , {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserLists(response.data.users);
          console.log(response, "reponse");
  
          console.log(userLists);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des users:", error);
      }
    };
    fetchUsers();
  }, []);

  // pour la pagination
const [currentPage, setCurrentPage] = useState(1);
const userListsParPage = 2;

// pagination
const indexOfLastUserLists = currentPage * userListsParPage;
const indexOfFirstUserLists = indexOfLastUserLists - userListsParPage;
const currentUserLists = userLists.slice(indexOfFirstUserLists, indexOfLastUserLists);

const totalPaginationPages = Math.ceil(userLists.length / userListsParPage);



  return (
    <div className="contenueprincipal container ">
      <div className="dashbord-content-main-one container" id="vv">
        <div className="content-left-admin-dashbord">
          <h3 className="mb-2">Liste des utilisateurs</h3>
          <table className="table mb-5">
            <thead className="table-light" id="hearder-color">
              <tr>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Profile
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Prenom
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Nom
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Email
                </th>
                <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                  Téléphone
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUserLists &&
                currentUserLists.map((userlist) => (
                  <tr key={userlist.id}>
                    <td>
                      <Image
                        // src={userlist.prenom}
                        src={`http://localhost:8000/storage/${userlist.image}`}
                        className="img-profile-tab-admin"
                      />
                    </td>
                    <td>{userlist.prenom}</td>
                    <td>{userlist.nom}</td>
                    <td>{userlist.email}</td>
                    <td>{userlist.telephone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
          <Pagination
         currentPage={currentPage}
         totalPaginationPages={totalPaginationPages}
         setCurrentPage={setCurrentPage}
         
         />
          </div>
          <div className="conten-admin-2">
            <div className="title-progressbar-admin px-4 ">
              <p>
                Liste des utilisateurs total par rapport au utilisateurs bloqués
              </p>
            </div>
            <span>Pourcentage des utilisateurs total</span>
            <div
              className="progress mt-4"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="98"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                id="progress-bar"
                style={{ width: "100%", color: "white" }}
              >
                100%
              </div>
            </div>
            <span>Pourcentage des utilisateurs total bloqué</span>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                id="progress-bar"
                style={{ width: "5%", color: "white" }}
              >
                5%
              </div>
            </div>
          </div>
        </div>
        <div className="content-diagramme-circulaire-right-conten-2">
          <div className="">
            <Chart />
            <p className="text-center mt-2 ">
              Nombre de projet de construction <br></br> terminé par rapport au
              projet total <br></br> 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderContent(name) {
  switch (name) {
    case "dashbordAdmin":
      return <KPI />;
    case "gestionuser":
      return <GestionUtilisateurs />;
    case "gestionmaison":
      return <GestionMaison />;
    case "gestionterrain":
      return <GestionTerrain />;
    // case "gestioncommenentaire":
    //   return <GestionCommentaire />;
    case "gestionservices":
      return <GestionServices />;
    case "gestionfavorie":
      return <GestionFavorie />;
    case "gestionfavorie":
      return <GestionFavorie />;
    case "gestioncategorie":
      return <GestionCategorie />;
    case "gestionnewletter":
      return <GestionNewsLetter />;
    case "gestionmessage":
      return <GestionMessage />;
    default:
      return <KPI />;
  }
}

export default function DashbordAdmin() {
  // l'etat pour verifier si le sidebar est ouvert ou pas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("dashbordAdmin");

  // function pour changer l'eta
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const role = localStorage.getItem("rolecle");
  const token = localStorage.getItem("tokencle");

  useEffect(() => {
   
    if ( role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Acces interdit, connecter vous en tant qu'admin pour avoir accée au dashboard!",
      });
      navigate("/"); 
    }
  }, [ role , navigate]);

  

  function handleChangePath(path) {
    setName(path);
  }

  return (
    <div className="">
      <div
        className={`maincontent-dashbord-static ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <div className="contentsidebar">
          <SideBars
            isOpen={isSidebarOpen}
            name={name}
            handleChangePath={handleChangePath}
            id="sidebar-content"
          />
        </div>
        <div className="secondecontent">
          <div className="">
            <NavbarAdmin onMenuClick={toggleSidebar} />
          </div>
          <Tableaux />
          {/* contenue selon le lien clicker */}
          {RenderContent(name)}
        </div>
      </div>
    </div>
  );
}
