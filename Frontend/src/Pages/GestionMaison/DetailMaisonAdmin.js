import { Image } from "react-bootstrap";
import "./DetailMaisonAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faGlobe,
  faHouse,
  faLocationDot,
  faSink,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import SideBars from "../../Components/SideBars/SideBars";
import NavbarAdmin from "../../Components/Navbars/NavbarAdmin/NavbarAdmin";
import Tableaux from "../Tableaux/Tableaux";
import profilemaison from "../../fichiers/bann accueil.jpeg";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function DetailMaisonAdmin() {
  // use params nous permet de recuperer les paramettre de mon url qui sont dans l'url comme l'id
  const { id } = useParams();
  const [maisonDetails, setMaisonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  //    useEffect(() => {

  //     const fetchMaisonDetails = async () => {
  //        try {
  //           const response = await axios.get(`http://localhost:8000/api/maison/detail/${id}`);
  //           setMaisonDetails(response.data.maison);
  //           console.log(response.data, 'ici la reponse de detail');
  //        } catch (error) {
  //           console.error("Erreur lors de la récupération des détails de la maison:", error);
  //        } finally {
  //           setLoading(false);
  //        }
  //     };

  //     fetchMaisonDetails();
  //  }, [id]);

  useEffect(() => {
    const fetchMaisonDetails = async () => {
      const token = localStorage.getItem('tokencle')
    const role = localStorage.getItem("rolecle");
      try {
        if (token || role==="admin"){
          const response = await axios.get(
            `http://localhost:8000/api/maison/detail/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.maison) {
            setMaisonDetails(response.data.maison);
            console.log(response.data, "ici la reponse de detail");
          } else {
            console.error("La réponse de détail est undefined ou null.");
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la maison:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMaisonDetails();
  }, [id]);

  console.log("maisonDetails:", maisonDetails);

  console.log("maisonDetails:", maisonDetails);

  // recuperer les categorie
  useEffect(() => {
    // Effectuer une requête pour récupérer la liste des catégories depuis le backend
    const RecupererCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categorie/liste"
        );
        // console.log(response, "les respones");
        setCategories(response.data.categories);
      } catch (error) {
        // console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    RecupererCategories();
  }, []);
  console.log(
    "maisonDetails.categorie_id k j veu voir :",
    maisonDetails.categorie_id
  );
  console.log("categories: k j veu voir", categories);

  return (
    <div>
      <div className="">
        <div className="">
          {/* <div className="contentsidebar">
            <SideBars />
          </div> */}
          <div className="">
            <div className=" container">
              {/* <NavbarAdmin /> */}
              <Link to={'/dashbordAdmin'} 
              style={{color:'#D46F4D', textDecoration:'none', fontWeight:'bold', marginTop:'20px'}}>
                <FontAwesomeIcon  icon={faHouse}/> DASHBOARD ADMIN</Link>
              {/* <Link to={'/gestionmaison'}> </Link> */}
            </div>
            {/* <Tableaux /> */}
            <div
              id="content-main-detail-maison-content-admin"
              className="mt-2 container "
            >
              <div className="d-flex content-main-detailmaison container" style={{alignItems:'center', placeContent:'center'}}>
                <div className="one-img-left">
                  <div className="img-main-detail-maison">
                    <Image
                      // src={maisonDetails.image}
                      src={`http://localhost:8000/storage/${maisonDetails.image}`} 
                      className="content-img-detail-maison1"
                    />
                  </div>
                </div>
                <div className="second-img-right">
                  <div className="second-img-right1">
                    <h1>Maison</h1>
                    <p> {maisonDetails && maisonDetails.description} </p>
                    <div className="d-flex justify-content-evenly">
                      <div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faGlobe}
                              id="icon-details-right"
                            />
                          </span>
                          <span>Superficie: {maisonDetails.superficie} m2</span>
                        </div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faTag}
                              id="icon-details-right"
                            />
                          </span>
                          <span>Prix: {maisonDetails.prix} FCFA</span>
                        </div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              id="icon-details-right"
                            />
                          </span>
                          <span>Adresse: {maisonDetails.addresse}
              
                          </span>
                          <div class="mapouter"><div class="gmap_canvas">
                            <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=dakar bambilor&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://connectionsgame.org/">Connections Puzzle</a></div></div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faHouse}
                              id="icon-details-right"
                            />
                          </span>
                          Categorie:
                          {/* Catégorie:{" "} */}
                          {maisonDetails.categories_id &&
                            categories &&
                            categories.map((cat, index) => {
                              // Vérifiez si la catégorie actuelle correspond à la catégorie de la maison
                              if (cat.id === maisonDetails.categories_id) {
                                return (
                                  <span key={index} value={cat.id}>
                                    {cat.titre}
                                  </span>
                                );
                              }
                              return null;
                            })}
                        </div>
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faCalendarDays}
                              id="icon-details-right"
                            />
                          </span>
                          <span>
                            Date construction:{" "}
                            {maisonDetails.annee_construction}
                          </span>
                        </div>
                        {/* <div><span><FontAwesomeIcon icon={faSink} id='icon-details-right' /></span><span>10 Salles de bains</span></div> */}
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
  );
}
