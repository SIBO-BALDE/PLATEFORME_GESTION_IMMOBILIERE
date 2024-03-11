import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { faCheck, faCommentSlash, faEnvelope, faEye, faHome, faHourglassHalf, faHouse, faPhone, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardUser.css";
import Swal from "sweetalert2";

export default function DashboardUser() {
  const [utilisateur, setUtilisateur] = useState([]);
  console.log(utilisateur, "usertab");

  // pour le modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userInformations = () =>{
    const token = localStorage.getItem("tokencle");
    const role = localStorage.getItem("rolecle");
    
    if (token || role==='user') {
      axios
        .post(
          "http://localhost:8000/api/auth/me",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then((response) => {
          const userData = response.data;
          setUtilisateur(userData);
          console.log(userData, "userdATA Dashboard");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur :",
            error
          );
        });
    }
  }

  useEffect(() => {
    // Récupérez le token et le role  du localStorage
    userInformations();
    fetchTemoignagesEn();
    fetchTemoignagesAccept();
    fetchTemoignagesRefus();
    
  }, []);

  // Liste temoignage en attente
  const [temoignagesEnAtente, setTemoignagesEnAtente] = useState([]);
  const fetchTemoignagesEn = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "user") {
        const response = await axios.get(
          "http://localhost:8000/api/temoigngage/MestemoignageAttente",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTemoignagesEnAtente(response.data.temoignages);
        console.log(response, "temoignageuser");
        console.warn(response.data.temoignages, "temoignagedatauser");
      }
    } catch (error) {
      console.error("Erreur Axios:", error);
    }
  };

  const [temoignagesAccept, setTemoignagesAccept] = useState([]);
  const fetchTemoignagesAccept = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "user") {
        const response = await axios.get(
          "http://localhost:8000/api/temoigngage/MestemoignageAccepter",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTemoignagesAccept(response.data.temoignages);
        console.log(response, "temoignageuser");
        console.warn(response.data.temoignages, "temoignagedatauser");
      }
    } catch (error) {
      console.error("Erreur Axios:", error);
    }
  };
  const [temoignagesRefus, setTemoignagesRefus] = useState([]);
  const fetchTemoignagesRefus = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "user") {
        const response = await axios.get(
          "http://localhost:8000/api/temoigngage/MestemoignageRefuser",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTemoignagesRefus(response.data.temoignages);
        console.log(response, "temoignageuser");
        console.warn(response.data.temoignages, "temoignagedatauser");
      }
    } catch (error) {
      console.error("Erreur Axios:", error);
    }
  };


  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const navigate = useNavigate();
  const role = localStorage.getItem("rolecle");
  // const token = localStorage.getItem("tokencle");
  useEffect(() => {
  
    if ( role !== "user") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Acces interdit, vueillez et connectez vous!",
      });
      navigate("/"); 
    }
  }, [ role , navigate]);


  // Gestionnaire de clic pour le bouton de modification
  const handleShowEditProfiles = (utilisateur) => {
    setEditProfileData({
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      // password: utilisateur.password,
      image: utilisateur.image,
      telephone: utilisateur.telephone,
    });
    handleShow();
    // console.log(editTerrainData, "editTerrainData recuperation")
    // console.log('Prix after adding to  mis a jour handleShowEditTerrains:', terrain.prix);
  };

  //  etat pour modifier categorie
  const [editProfileData, setEditProfileData] = useState({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    // password: "",
    image: "",
    telephone: "",
  });

  const [newFile, setNewFile] = useState("");
  const handleFileChange = (file) => {
    setNewFile(file);
  };

  // Fonction pour mettre à jour une le profile
  const modifierProfile = async () => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");

    const formData = new FormData();
    // console.log('Prix before adding to formData:', editTerrainData.prix);
    formData.append("id", editProfileData.id);
    formData.append("nom", editProfileData.nom);
    formData.append("prenom", editProfileData.prenom);
    formData.append("email", editProfileData.email);
    // console.log('Prix after adding to formData:', editProfileData.prix);
    formData.append("telephone", editProfileData.telephone);

    if (newFile instanceof File) {
      formData.append("image", newFile);
    } else {
      formData.append("image", editProfileData.image);
    }
    // console.log(formData, "formData")

    try {
      if (token || role === "user") {
        const response = await axios.post(
          `http://localhost:8000/api/update/${editProfileData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        if (response.status === 200) {
          const updatedUser = response.data.user;
          console.log(response.data.user);
        // si id updateUser = id utilisateur
          if (updatedUser.id == utilisateur.id) {
            setUtilisateur(updatedUser)
          }
        
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Profile mise à jour avec succès!",
          });
        } else {
          console.error("erreur lors de la modification de la terrain");
        }
      }
      //  console.log(newFile, 'newFile')
    } catch (error) {
      console.error("une erreur  Axios:", error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    
  try {
    // Utilisez votre instance Axios configurée
    if (token || role === "user"){
      const response = await axios.post("http://localhost:8000/api/auth/logout"
      , {},
      
      {
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
    <div>
      <div className="container-userdashboard">
        
          <nav className="nav-items-dashboard-user">
            <ul className="">
                <li className="ms-5">
                      <a href="#" className="logo-userdashboard-userdashboard" id='lien-ancre'>
                      <Image
                          src={`http://localhost:8000/storage/${utilisateur.image}`}
                          className="img-userdashboard"
                          onClick={() => handleShowEditProfiles(utilisateur)}
                        />
                    </a>
                </li>
                <li className="ms-5 mt-3" style={{color:'white'}}>{utilisateur.prenom} {utilisateur.nom}</li>
                <li className="ms-2 mt-3" style={{color:'white'}}>{utilisateur.email}</li>
                <li className="ms-5 mt-3" style={{color:'white'}}>{utilisateur.telephone}</li>

                <li className="ms-5 "><a href="" className="logtout-user" id='lien-ancre'>
        
                  {/* <span className="nav-item">Log out</span> */}
                    <Button className="logout d-flex justify-content-center align-items-center " 
                      id="logout-user-dashboard" onClick={handleLogout}>
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="logouticon "
                        />
                    </Button>
                </a></li>
            </ul>
          </nav>
          <section className="main-userdashboard">
          <Link to={"/"} style={{ textDecoration: "none", color: "black",float:'right',marginTop:'0' }} >
              <FontAwesomeIcon icon={faHome} />
            </Link>
              <div className="main-skills-userdashboard">
                  <div className="card-userdashboard">
                        <FontAwesomeIcon icon={faHourglassHalf} style={{fontSize:'40px', color:'#D46F4D', 
                          marginBottom:'10px'}} />
                        <h3>Nombre de témoignage</h3>
                        <h5>En attente</h5>
                        <h1 style={{color:'#D46F4D', fontWeight:'bold'}}>{temoignagesEnAtente.length}</h1>
                  </div>
                  <div className="card-userdashboard">
                    <FontAwesomeIcon  icon={faCheck} style={{fontSize:'40px', color:'#D46F4D',
                         marginBottom:'10px'
                        }} />
                      <h3>Nombre de témoignage</h3>
                      <h5>Accepté</h5>
                      <h1 style={{color:'#D46F6D', fontWeight:'bold'}}>{temoignagesAccept.length}</h1>
                  </div>
                  <div className="card-userdashboard">
                      <FontAwesomeIcon icon={faCommentSlash} style={{fontSize:'40px', color:'#D46F4D',
                         marginBottom:'10px'
                        }} />
                      <h3>Nombre de témoignage</h3>
                      <h5>Refusé</h5>
                      <h1 style={{color:'#D46F6D', fontWeight:'bold'}}>{temoignagesRefus.length}</h1>
                  </div>
              </div>
              <section className="main-course-userdashboard">
                <h1>Liste des témoignages</h1>
                <div className="course-box-userdashboard">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" 
                        type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" style={{color:'#D46F4D'}}>En attente</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                        type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"style={{color:'#D46F4D'}} >Accepté</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" 
                        type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" style={{color:'#D46F4D'}}>Refusé</button>
                    </li>
                </ul>
          
                <div className="course-userdashboard">
                <div className="tab-content  w-100" id="myTabContent ">
                  {/* 1 */}
                  <div className="tab-pane fade show active w-100 " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <div className="mt-4 ms-3  me-3 w-100 ">
                      <h3>Liste des Temoignages en attente</h3>
                      <table className="table border  border-1 table-tableau-user ">
                        <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#d46f4d" }}
          >
            <tr>
              
              <th
                className="header-color"
                style={{ backgroundColor: "#d46f4d", color: "#fff" }}
              >
              Id
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Status
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Date
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Message
              </th>
              
              
            </tr>
                        </thead>
                        <tbody>
                            {temoignagesEnAtente &&
                              temoignagesEnAtente.map((temoignageE) => ( 
                                <tr   key={temoignageE.id}>
                                      <td>{temoignageE.id}</td>
                                      <td>{temoignageE.statut}</td>
                                      <td>{formatDate(temoignageE.created_at)}</td>
                                      <td id="scrol-contenue">{temoignageE.contenue}</td>
                
                                </tr>
                              ))}
            
                        </tbody>
                      </table>
      
                    </div>
                  </div>
                    {/* 2 */}

                  <div className="tab-pane fade w-100 " id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <div className="mt-4 ms-3  me-3 w-100 ">
                      <h3>Liste des Temoignages Acceptés</h3>
                      <table className="table border  border-1 table-tableau-user">
                          <thead
                            className=""
                            id="hearder-color"
                            style={{ backgroundColor: "#d46f4d" }}
                          >
                              <tr>
                                  <th
                                    className="header-color"
                                    style={{ backgroundColor: "#d46f4d", color: "#fff" }}
                                  >
                                    Id
                                  </th>
                                  <th
                                    className="header-color"
                                    style={{ backgroundColor: "#d46f4d", color: "#fff" }}
                                  >
                                    Status
                                  </th>
                                  <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                                    Date
                                  </th>
            
                                  <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                                    Message
                                  </th>
              
            
                              </tr>
                          </thead>
                          <tbody>
                              {temoignagesAccept &&
                                temoignagesAccept.map((temoignageA) => (   
                                <tr key={temoignageA.id}>
                                  <td>{temoignageA.id}</td>
                                  <td>{temoignageA.statut}</td>
                                  <td>{formatDate(temoignageA.created_at)}</td>
                                  <td id="scrol-contenue">{temoignageA.contenue}</td>
                                </tr>
                                ))}
                          </tbody>
                      </table>
                    </div>
                  </div>
                      {/* 3 */}
                  <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                    <div className="mt-4 ms-3  me-3">
                        <h3>Liste des Temoignages Refusés</h3>
                        <table className="table border  border-1">
                          <thead
                              className=""
            id="hearder-color"
                              style={{ backgroundColor: "#d46f4d" }}
                            >
                              <tr>
                                  <th
                                      className="header-color"
                                      style={{ backgroundColor: "#d46f4d", color: "#fff" }}
                                    >
                                      Id
                                  </th>
                                  <th
                                    className="header-color"
                                    style={{ backgroundColor: "#d46f4d", color: "#fff" }}
                                  >
                                    Status
                                  </th>
                                  <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                                      Date
                                  </th>
                                 
                                  <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                                      Message
                                  </th>
                                  
            
                              </tr>
                          </thead>
                          <tbody>
                              {temoignagesRefus &&
                                temoignagesRefus.map((temoignageR) => (
                                <tr  key={temoignageR.id} >
                                    <td>{temoignageR.id}</td>
                                    <td>{temoignageR.statut}</td>
                                    <td>{formatDate(temoignageR.created_at)}</td>
                                  <td id="scrol-contenue">{temoignageR.contenue}</td>
                                    
                                </tr>
                                ))}
                          </tbody>
                        </table>
                    </div>
                  </div>
     
      

                </div>
            
                </div>
                </div>
              </section>
          </section>
      </div>



      {/* modal modifier user */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier votre profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex justify-content-around ">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={editProfileData.nom}
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      nom: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={editProfileData.prenom}
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      prenom: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-around ">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={editProfileData.email}
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder=""
                  value={editProfileData.telephone}
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      telephone: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div>
                <Form.Label htmlFor="inputimage">Image</Form.Label>
              </div>

              {newFile ? (
                // Si newFile existe, afficher la nouvelle image
                <Image
                  src={URL.createObjectURL(newFile)}
                  width={200}
                  height={50}
                />
              ) : (
                // Sinon, afficher l'image existante
                <Image
                  src={`http://localhost:8000/storage/${editProfileData.image}`}
                  width={200}
                  height={50}
                />
              )}
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e.target.files[0])}
                id="inputimage"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant=""  onClick={modifierProfile} 
              style={{backgroundColor:'#D46F4D', border:'none', width:'130px' , color:'white'}}>
            Modifier
          </Button>
          <Button variant="" onClick={handleClose} style={{backgroundColor:'#fff', border:'1px solid #D46F4D' , width:'130px', color:'#D46F4D'}} >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* nouveau */}
    </div>
  );
}