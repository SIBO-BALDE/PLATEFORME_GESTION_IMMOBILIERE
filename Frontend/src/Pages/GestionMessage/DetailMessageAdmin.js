import React, { useEffect, useState } from "react";
import "./DetailMessage.css";
import { Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faEnvelope, faHouse, faMessage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function DetailMessageAdmin() {
  const { id } = useParams();

  // tableau ou stocker la liste des messages
  const [messages, setMessages] = useState([]);
  const [messageDetails, setMessageDetails] = useState({});


  const fetchMessage = async () => {
   
    const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem("tokencle");

    try {
      if (token || role === "admin") {
        const response = await axios.get(
          `http://localhost:8000/api/messages/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.message) {
          setMessages(response.data.message);
          const messageDetailsData = response.data.message_details;
          setMessageDetails(messageDetailsData);
          console.log(
            response.data.message_details,
            "ici la reponse de detail"
          );
        } else {
          console.error("La réponse de détail est undefined ou null.");
        }

        console.log(messages);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
    }
  };


  useEffect(() => {
    fetchMessage();
  }, []);


  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <div>
      <div className="container profile-page">
                
            <div className="row d-flex justify-content-center  border shadow " id='content-message' 
                style={{
                   paddingBottom:'70px',
                   paddingTop:'10px',
                    
                    }} 
                    >
                        <Link
                  to={"/dashbordAdmin"}
                  style={{
                    color: "#D46F4D",
                    textDecoration: "none",
                    fontWeight: "bold",
                    
                    
                  }}
                >
                  <FontAwesomeIcon icon={faHouse} /> DASHBOARD ADMIN
                </Link>
          <div className="col-xl-6 col-lg-7 col-md-12">
              
            <div className=" profile-header">
              <div className="body">
                
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="profile-image float-md-right d-flex justify-content-center  
                    align-content-center align-items-center" style={{width:'150px',
                    height:'150px',
                    borderRadius:'50%',
                    border:'3px solid #D46F4D',}}>
                      
                      <FontAwesomeIcon icon={faMessage}  style={{width:'100px',
                        height:'100px', color:'#D46F4D'}}/>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12">
                    <h4 className="m-t-0 m-b-0  mt-2">
                        <span><FontAwesomeIcon icon={faEnvelope} style={{color:'#D46F4D',marginRight:'10px'}} /> </span>
                      <strong>{messageDetails.email} </strong>
                    </h4>
                    <h4 className="m-t-0 m-b-0 mt-2">
                    <span><FontAwesomeIcon icon={faCalendarDay} style={{color:'#D46F4D',marginRight:'10px'}} /> </span>
                      <strong>{formatDate(messageDetails.created_at)} </strong>
                    </h4>
                    <p className=" mt-2">{messageDetails.message} </p>
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
