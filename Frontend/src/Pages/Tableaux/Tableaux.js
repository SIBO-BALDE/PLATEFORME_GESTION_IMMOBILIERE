import { faBellConcierge, faChartLine, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Tableaux.css";
import axios from "axios";

export default function Tableaux() {

  const [maisons, setMaisons] = useState([]);
  const [terrains, setTerrains] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel pour la liste de maisons
        const maisonsResponse = await axios.get("http://localhost:8000/api/maison/liste");
        setMaisons(maisonsResponse.data.maison.length);
      console.log(maisonsResponse.data.maison.length
        , 'tableau')
        // Appel pour la liste de terrains
        const terrainsResponse = await axios.get("http://localhost:8000/api/terrain/liste");
        setTerrains(terrainsResponse.data.terrains.length);

        // Appel pour la liste de services
        const servicesResponse = await axios.get("http://localhost:8000/api/service/liste");
        setServices(servicesResponse.data.services.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div
      className="d-flex justify-content-evenly"
      style={{ height: "content" }}
    >
      <div className="card1-admin">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faHome} id="icon-content-admin" />
          </div>
          <div>
            <h4> Nombre de maison Total</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{maisons}</h1>
      </div>
      <div className="card1-admin">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faHome} id="icon-content-admin" />
          </div>
          <div>
            <h4> Nombre Terrain Total</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{terrains}</h1>
      </div>
      <div className="card1-admin">
        <div className="d-flex justify-content-around mt-2 ">
          <div>
            <FontAwesomeIcon icon={faBellConcierge} id="icon-content-admin" />
          </div>
          <div>
            <h4>Nombre Service Total</h4>
          </div>
        </div>
        <h1 className="text-center mt-1 ">{services}</h1>
      </div>
    </div>
  );
}
