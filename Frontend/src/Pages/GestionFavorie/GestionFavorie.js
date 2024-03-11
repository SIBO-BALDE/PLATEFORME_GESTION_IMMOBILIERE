import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import profileService from "../../fichiers/temon3.png";
import { useEffect, useState } from "react";
import axios from "axios";
import './GestionFavorie.css';
import Pagination from "../../Components/Pagination/Pagination";

export default function GestionFavorie() {
  // etat pour stocker les temoignage
  const [temoignages, setTemoignages] = useState([]);
  const [temoignagesAccepter, setTemoignagesAccepter] = useState([]);
  const [temoignagesRefuser, setTemoignagesRefuser] = useState([]);
  const [temoignagesEnAtente, setTemoignagesEnAtente] = useState([]);
// en atente
  const [show, setShow] = useState(false);
  // accepté
  const [showAccept, setShowAccept] = useState(false);
  // refus
  const [showRefus, setShowRefus] = useState(false);
  // total
  const [showTotal, setShowTotal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // accept
  const handleCloseAccept = () => setShowAccept(false);
  const handleShowAccept = () => setShowAccept(true);
  // refus
  const handleCloseRefus = () => setShowRefus(false);
  const handleShowRefus = () => setShowRefus(true);
  // refus
  const handleCloseTotal = () => setShowTotal(false);
  const handleShowTotal = () => setShowTotal(true);


  // 
    const token=localStorage.getItem('tokencle')
    const role = localStorage.getItem('rolecle')

  // Liste temoignage en attente
  const fetchTemoignages = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "admin") {
          const response = await axios.get(
            "http://localhost:8000/api/temoignage/liste/enattente",
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTemoignagesEnAtente(response.data.temoignages);
          console.log(response, "temoignage");
          console.warn(response.data.temoignages, "temoignagedata");
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    };
    const [temoignageDetail, setTemoignageDetail] = useState({});
    // detail temoignages
    const fetchDetailsTemoignagesEnAtente = async (id) =>{
      try {
        if(token || role === 'admin'){
          const response = await axios.get(`http://localhost:8000/api/temoignage/detail/${id}`,
          {
            headers:{
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,

            }
          }
          )
          if (response.data) {
            const detail = response.data
            setTemoignageDetail(detail.temoignage.contenue);
            console.log(response.data, "ici la reponse de detail temoignage");
            console.log(detail, "ici la reponse de detail detail");
            console.log(temoignageDetail, "ici la reponse");
            handleShow();
          } else {
            console.error("La réponse de détail est undefined ou null.");
          }
        }
        
      } catch (error) {
        
      }
      
    }
    // detail temoignages en attente

  // Liste temoignage  acepter
  const fetchTemoignagesAcepter = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "admin") {
          const response = await axios.get(
            "http://localhost:8000/api/temoignage/liste/accepter",
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTemoignagesAccepter(response.data.temoignages);
          console.log(response, "temoignage");
          console.warn(response.data.temoignages, "temoignagedata");
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    };

  // Liste temoignage  refuser
  const fetchTemoignagesRefuser = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "admin") {
          const response = await axios.get(
            "http://localhost:8000/api/temoignage/liste/refuser",
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTemoignagesRefuser(response.data.temoignages);
          console.log(response, "temoignage");
          console.warn(response.data.temoignages, "temoignagedata");
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    };

    
  // Liste temoignage  Totals
  const fetchTemoignagesTotal = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "admin") {
          const response = await axios.get(
            "http://localhost:8000/api/temoignage/liste",
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTemoignages(response.data.temoignages);
          console.log(response, "temoignage");
          // console.warn(response.data.temoignages, "temoignagedata");
          console.log(response.data.message)
        }
      } catch (error) {
        console.error("Erreur Axios:", error);
      }
    };

  useEffect(() => {
    

    fetchTemoignages();
    fetchTemoignagesAcepter();
    fetchTemoignagesRefuser();
    fetchTemoignagesTotal();
  }, []);

  
  
// Function pour accepter une temoignage
  const handleAccept = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");

    console.log(id);
    try {
      if (token || role === "admin") {
        const response = await axios.post(
          `http://localhost:8000/api/temoignage/accepter/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
         
        );
       
       fetchTemoignages();
       fetchTemoignagesAcepter();
       fetchTemoignagesRefuser();
       fetchTemoignagesTotal();
       
      } 
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  // Function pour refuser une temoignage
  const handleRefuse = async (id) => {
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");
    try {
      if (token || role === "admin") {
        const response = await axios.put(
          `http://localhost:8000/api/temoignage/refuser/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
         
        );
       
       fetchTemoignages();
       fetchTemoignagesAcepter();
       fetchTemoignagesRefuser();
       fetchTemoignagesTotal();
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

 // recherche champ input
 const [searchValue, setSearchValue] = useState("");

   // recherche
   const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredTemoignages = temoignagesEnAtente.filter(
    (temoignageEn) =>
     temoignageEn &&
      temoignageEn.created_at &&
      temoignageEn.created_at.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayTemoignages =
    searchValue === "" ? temoignagesEnAtente : filteredTemoignages;

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const temoignageParPage = 4;

  // pagination
  const indexOfLastTemoignage = currentPage * temoignageParPage;
  const indexOfFirstTemoignage = indexOfLastTemoignage -  temoignageParPage;
  const currentTemoignages = filteredTemoignages.slice(
    indexOfFirstTemoignage,
    indexOfLastTemoignage
  );

  const totalPaginationPages = Math.ceil(temoignagesEnAtente.length /temoignageParPage);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-5">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" 
          type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" style={{color:'#D46F4D'}}>En attente</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
           type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"style={{color:'#D46F4D'}} >Acceptée</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" 
          type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" style={{color:'#D46F4D'}}>Refusée</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="total-tab" data-bs-toggle="tab" data-bs-target="#total-tab-pane" 
          type="button" role="tab" aria-controls="total-tab-pane" aria-selected="false"style={{color:'#D46F4D'}} >Total</button>
        </li>
        
        
      </ul>
        <div className="flex-grow-1 d-flex justify-content-end ">
          <div className="champsRecherche mt-2 mb-3 w-50">
            <Form>
              <div
                className="input-group flex-nowrap "
                style={{ borderColor: "#d46f4d" }}
              >
                <Form.Control
                  type="search"
                  className="form-control w-50   "
                  placeholder="Rechercher un utilisateur"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <span
                  className="input-group-text text-white me-4"
                  id="addon-wrapping"
                  style={{ backgroundColor: "#d46f4d" }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {/* biggining */}
      <div className="tab-content" id="myTabContent">
    {/* 1 */}
    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
      <div className="mt-4 ms-3  me-3">
        <h3>Liste des Temoignages en attente</h3>
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
                Detail
              </th>
              <th
                className="header-color"
                style={{ backgroundColor: "#d46f4d", color: "#fff" }}
              >
                Profile
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Prenom
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>Nom</th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Téléphone
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTemoignages &&
              currentTemoignages.map((temoignageEn) => (
                <tr key={temoignageEn.id}>
                  <td>
                    <Button
                     onClick={() =>  fetchDetailsTemoignagesEnAtente(temoignageEn.id)}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                    >
                      {/* <Link to={"/detailFavorie"} style={{ color: "#d46f4d" }}>
                        {" "} */}
                        <FontAwesomeIcon icon={faEye} />
                      {/* </Link> */}
                    </Button>
                  </td>
                  <td>
                    <Image
                      src={`http://localhost:8000/storage/${temoignageEn.user.image}`}
                      className="img-profile-tab-user"
                      id="img-profile-tab-user"
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{temoignageEn.user.prenom}</td>
                  <td>{temoignageEn.user.nom}</td>
                  <td>{temoignageEn.user.email}</td>
                  <td>{temoignageEn.user.telephone}</td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                        marginRight: "8px",
                      }}
                      
                      onClick={() => handleAccept(temoignageEn.id)}
                      // onClick={ handleAccept}
                    >
                      Accepter
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                      onClick={() => handleRefuse(temoignageEn.id)}
                    >
                      Refuser
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
    {/* 2 */}
    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
      <div className="mt-4 ms-3  me-3">
        <h3>Liste des Temoignages Acceptés</h3>
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
                Detail
              </th>
              <th
                className="header-color"
                style={{ backgroundColor: "#d46f4d", color: "#fff" }}
              >
                Profile
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Prenom
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>Nom</th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Téléphone
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {temoignagesAccepter &&
              temoignagesAccepter.map((temoignage) => (
                <tr key={temoignage.id}>
                  <td>
                    <Button
                     
                     onClick={() =>  fetchDetailsTemoignagesEnAtente(temoignage.id)}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                    >
                      
                        <FontAwesomeIcon icon={faEye} />
                      
                    </Button>
                  </td>
                  <td>
                    <Image
                      src={`http://localhost:8000/storage/${temoignage.user.image}`}
                      className="img-profile-tab-user"
                      id="img-profile-tab-user"
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{temoignage.user.prenom}</td>
                  <td>{temoignage.user.nom}</td>
                  <td>{temoignage.user.email}</td>
                  <td>{temoignage.user.telephone}</td>
                  <td>
                    {/* <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                        marginRight: "8px",
                      }}
                      
                      onClick={() => handleAccept(temoignage.id)}
                      // onClick={ handleAccept}
                    >
                      Accepter
                    </Button> */}
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                      onClick={() => handleRefuse(temoignage.id)}
                    >
                      Refuser
                    </Button>
                  </td>
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
                Detail
              </th>
              <th
                className="header-color"
                style={{ backgroundColor: "#d46f4d", color: "#fff" }}
              >
                Profile
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Prenom
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>Nom</th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Téléphone
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {temoignagesRefuser &&
              temoignagesRefuser.map((temoignage) => (
                <tr key={temoignage.id}>
                  <td>
                    <Button
                    // onClick={handleShowRefus}
                    onClick={() =>  fetchDetailsTemoignagesEnAtente(temoignage.id)}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                      
                    </Button>
                  </td>
                  <td>
                    <Image
                      src={`http://localhost:8000/storage/${temoignage.user.image}`}
                      className="img-profile-tab-user"
                      id="img-profile-tab-user"
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{temoignage.user.prenom}</td>
                  <td>{temoignage.user.nom}</td>
                  <td>{temoignage.user.email}</td>
                  <td>{temoignage.user.telephone}</td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                        marginRight: "8px",
                      }}
                      
                      onClick={() => handleAccept(temoignage.id)}
                      // onClick={ handleAccept}
                    >
                      Accepter
                    </Button>
                    {/* <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                      onClick={() => handleRefuse(temoignage.id)}
                    >
                      Refuser
                    </Button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
      {/* 4 */}
      <div className="tab-pane fade" id="total-tab-pane" role="tabpanel" aria-labelledby="total-tab" tabIndex="0">
      <div className="mt-4 ms-3  me-3">
        <h3>Liste Temoignages total </h3>
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
                Detail
              </th>
              <th
                className="header-color"
                style={{ backgroundColor: "#d46f4d", color: "#fff" }}
              >
                Profile
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Prenom
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>Nom</th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Téléphone
              </th>
              {/* <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {temoignages &&
              temoignages.map((temoignage) => (
                <tr key={temoignage.id}>
                  <td>
                    <Button
                    // onClick={handleShowTotal}
                    onClick={() =>  fetchDetailsTemoignagesEnAtente(temoignage.id)}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                    >
                      
                        <FontAwesomeIcon icon={faEye} />
                      
                    </Button>
                  </td>
                  <td>
                    <Image
                      src={`http://localhost:8000/storage/${temoignage.user.image}`}
                      className="img-profile-tab-user"
                      id="img-profile-tab-user"
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{temoignage.user.prenom}</td>
                  <td>{temoignage.user.nom}</td>
                  <td>{temoignage.user.email}</td>
                  <td>{temoignage.user.telephone}</td>
                  {/* <td>
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                        marginRight: "8px",
                      }}
                      
                      onClick={() => handleAccept(temoignage.id)}
                      // onClick={ handleAccept}
                    >
                      Accepter
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d46f4d",
                        color: "#d46f4d",
                      }}
                      onClick={() => handleRefuse(temoignage.id)}
                    >
                      Refuser
                    </Button>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>

      </div>
     {/* end */}

     {/* detail attente */}
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail temoignage en atente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <p>Contenue: {temoignageDetail}</p>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  
          style={{
            backgroundColor: "#fff",
            border: "1px solid #D46F4D",
            width: "130px",
            color: "#D46F4D",
          }}>
            Fermer
          </Button>
          
        </Modal.Footer>
      </Modal>
      
     {/* detail acccepté */}
     <Modal show={showAccept} onHide={handleCloseAccept}>
        <Modal.Header closeButton>
          <Modal.Title>Detail temoignage acccepté</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {temoignagesAccepter &&
        temoignagesAccepter.map((temoignage) => (
      <div key={temoignage.id} className="d-flex justify-content-around ">
        <div>
        <Image  src={`http://localhost:8000/storage/${temoignage.user.image}`} 
         style={{width:'150px',height:'150px', borderRight:'5px solid #D46F4D'}} />
        </div>
        <div>
        <p>Prenom: {temoignage.user.prenom}</p>
        <p>Nom: {temoignage.user.nom}</p>
        <p>Email: {temoignage.user.email}</p>
        <p>Contenue: {temoignage.contenue}</p>
        </div>
        {/* Ajoutez d'autres détails du témoignage en attente */}
      </div>
    ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAccept}  
          style={{
            backgroundColor: "#fff",
            border: "1px solid #D46F4D",
            width: "130px",
            color: "#D46F4D",
          }}>
            Fermer
          </Button>
          
        </Modal.Footer>
      </Modal>

     {/* detail refusé */}
     <Modal show={showRefus} onHide={handleCloseRefus}>
        <Modal.Header closeButton>
          <Modal.Title>Detail temoignage refusé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {temoignagesRefuser &&
        temoignagesRefuser.map((temoignage) => (
      <div key={temoignage.id} className="d-flex justify-content-around ">
        <div>
        <Image  src={`http://localhost:8000/storage/${temoignage.user.image}`} 
         style={{width:'150px',height:'150px', borderRight:'5px solid #D46F4D'}} />
        </div>
        <div>
        <p>Prenom: {temoignage.user.prenom}</p>
        <p>Nom: {temoignage.user.nom}</p>
        <p>Email: {temoignage.user.email}</p>
        <p>Contenue: {temoignage.contenue}</p>
        </div>
        {/* Ajoutez d'autres détails du témoignage en attente */}
      </div>
    ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRefus}  
          style={{
            backgroundColor: "#fff",
            border: "1px solid #D46F4D",
            width: "130px",
            color: "#D46F4D",
          }}>
            Fermer
          </Button>
          
        </Modal.Footer>
      </Modal>
     {/* detail total */}
     <Modal show={showTotal} onHide={handleCloseTotal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail temoignage refusé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {temoignages &&
        temoignages.map((temoignage) => (
      <div key={temoignage.id} className="d-flex justify-content-around ">
        <div>
        <Image  src={`http://localhost:8000/storage/${temoignage.user.image}`} 
         style={{width:'150px',height:'150px', borderRight:'5px solid #D46F4D'}} />
        </div>
        <div>
        <p>Prenom: {temoignage.user.prenom}</p>
        <p>Nom: {temoignage.user.nom}</p>
        <p>Email: {temoignage.user.email}</p>
        <p>Contenue: {temoignage.contenue}</p>
        </div>
        {/* Ajoutez d'autres détails du témoignage en attente */}
      </div>
    ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTotal}  
          style={{
            backgroundColor: "#fff",
            border: "1px solid #D46F4D",
            width: "130px",
            color: "#D46F4D",
          }}>
            Fermer
          </Button>
          
        </Modal.Footer>
      </Modal>


     
       
    </div>
  );
}
