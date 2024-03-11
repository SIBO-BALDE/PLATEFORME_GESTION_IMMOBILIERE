import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Pagination from '../../Components/Pagination/Pagination';
import { Link } from 'react-router-dom';


export default function GestionMessage(id) {

  
  // tableau ou stocker la liste des messages
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessage = async () => {
      const role = localStorage.getItem("rolecle");
      const token = localStorage.getItem("tokencle");
      try {
        if (token || role === "admin") {
          const response = await axios.get(
            "http://localhost:8000/api/messages/listes",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages(response.data.messages);

          console.log(messages);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
      }
    };
    fetchMessage();
  }, []);


// recherche champ input
const [searchValue, setSearchValue] = useState("");

  // recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredMessages = messages.filter(
    (messageel) =>
      messageel &&
      messageel.email &&
      messageel.email.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayCategories =
    searchValue === "" ? messages : filteredMessages;

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const messagesParPage = 4;

  // pagination
  const indexOfLastMessage = currentPage * messagesParPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesParPage;
  const currentMessage = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const totalPaginationPages = Math.ceil(messages.length / messagesParPage);

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
    <div className="mt-4 ms-3  me-3">
      <h3>Liste des Messages des contacts</h3>
      <table className="table border  border-1">
        <thead
          className=""
          id="hearder-color"
          style={{ backgroundColor: "#d46f4d" }}
        >
          <tr>
            <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
              email
            </th>
            <th style={{ backgroundColor: "#d46f4d", color: "#fff" }}>
              Date d'envoie
            </th>
            <th
              className="d-flex  justify-content-center "
              style={{
                backgroundColor: "#d46f4d",
                color: "#fff",
                marginLeft: "3rem",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentMessage.map((messageel) => (
            <tr key={messageel.id}>
              <td style={{ color: "black" }}>{messageel.email}</td>
              <td style={{ color: "black" }}>
                  {formatDate(messageel.created_at)}
                </td>
              {/* <td style={{ color: "black" }}>{messageel.message}</td> */}
              <td className="d-flex justify-content-evenly">
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #d46f4d",
                    color: "#d46f4d",
                  }}
                  id="buttonModifier"
                >
                 <Link
                        style={{ color: "#d46f4d" }}
                        to={`/detailmessageadmin/${messageel.id} || '' `}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
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
  )
}
