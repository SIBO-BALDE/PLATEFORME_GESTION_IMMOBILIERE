import React, { useEffect, useState } from 'react'
import "./GestionUtilisateurs"
import { Button, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUnlock, faUserLock } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import axios from "../../Pages/Authentification/AxiosAuthIntercepteur";
import Pagination from '../../Components/Pagination/Pagination';


export default function GestionUtilisateurs() {

  const [userLists, setUserLists] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);

  // l'etat pour le button bloquer reste desactivier
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [searchValue, setSearchValue] = useState('');



  // function pour la recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Pour la pagination
  const filteredUsers = userLists.filter((service) =>
    service.prenom.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayUsers = searchValue === '' ? userLists : filteredUsers;


  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const userListsParPage = 4;
  
  // pagination
  const indexOfLastUserLists = currentPage *  userListsParPage;
  const indexOfFirstUserLists = indexOfLastUserLists -  userListsParPage;
  const currentUserLists =filteredUsers.slice(indexOfFirstUserLists, indexOfLastUserLists);
  
  const totalPaginationPages = Math.ceil( userLists.length /userListsParPage);





// pour lister les users avec avec cet effet on recupere l'ensemble des utilisateurs
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/users/liste"
  //       );
  //       // setCategories(response.categories);
  //       setUserLists(response.data.users);
  //       console.log(response, 'reponse')
  
  //       console.log(userLists);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des terrains:", error);

  //     }
  //   };
  //   fetchUsers();
  // }, []);


//  function pour bloquer un user
const handleBloquer = async (userId) => {
  const role = localStorage.getItem("rolecle");
    const token = localStorage.getItem('tokencle')
  try {
    if (token || role==="admin"){
      const response = await axios.put(`http://localhost:8000/api/user/bloquer/${userId}`, {
        isBlocked: !userLists.find((user) => user.id === userId).bloque,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }

      );
  
      if (response.status === 200) {
        setUserLists((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
  
        if (!userLists.find((user) => user.id === userId).bloque) {
          setBlockedUsers((prevBlockedUsers) => [
            ...prevBlockedUsers,
            userLists.find((user) => user.id === userId),
          ]);
          setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, userId]);
        } else {
          setBlockedUsers((prevBlockedUsers) =>
            prevBlockedUsers.filter((user) => user.id !== userId)
          );
        }
  
        saveBlockedUsersToStorage();
      } else {
        console.error('Erreur lors de la mise à jour du statut de blocage');
      }
    }
  } catch (error) {
    console.error('Erreur réseau', error);
  }
};

// const handleBloquer = async (userId) => {
//   try {
//     const userToBlock = userLists.find((user) => user.id === userId);
//     const isBlocked = !userToBlock.bloque;

//     const response = await axios.put(`http://localhost:8000/api/user/bloquer/${userId}`, {
//       isBlocked,
//     });

//     if (response.status === 200) {
//       setUserLists((prevUsers) =>
//         prevUsers.filter((user) => user.id !== userId)
//       );

//       if (!isBlocked) {
//         setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userToBlock]);
//         setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, userId]);
//       } else {
//         setBlockedUsers((prevBlockedUsers) =>
//           prevBlockedUsers.filter((user) => user.id !== userId)
//         );
//       }

//       saveBlockedUsersToStorage();
//     } else {
//       console.error('Erreur lors de la mise à jour du statut de blocage');
//     }
//   } catch (error) {
//     console.error('Erreur réseau', error);
//   }
// };



// function pour debloquer un user
const handleDebloquer = async (userId) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/user/debloquer/${userId}`
    
    );

    if (response.status === 200) {
      // Mise à jour locale de l'état de blocage
      setUserLists((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, bloque: !user.bloque } : user
        )
      );

      // Mise à jour de la liste des utilisateurs bloqués
      setBlockedUsers((prevBlockedUsers) =>
        prevBlockedUsers.filter((user) => user.id !== userId)
      );
    } else {
      console.error('Erreur lors de la mise à jour du statut de déblocage');
    }
  } catch (error) {
    console.error('Erreur réseau', error);
  }
};


// function pour swicher entre liste user bloquer ou non bloquer
  const toggleBlockedUsers = () => {
    setShowBlockedUsers(!showBlockedUsers);
  };


  // il nous permet de resuperer l'ensemble des uutilisateurs bloquer
  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/listeBloquer"
        );
        setBlockedUsers(response.data.users);
        console.log(response, 'response user bloquees');
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs bloqués:", error);
      }
    
    
    };
    
    handleDebloquer();
    fetchBlockedUsers();
   
  }, []);



  // il nous permet de recuperer l'ensemble des uutilisateurs nonbloquer
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/listeNonBloquer"
        );
        setUserLists(response.data.users);
        console.log(response, 'utilisateurs bloquees');
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };
  
    fetchUsers();
    handleBloquer();
  }, []);

  
  // Enregistrer la liste des utilisateurs bloqués dans le stockage local
  const saveBlockedUsersToStorage = () => {
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
  };

  
  // Charger la liste des utilisateurs bloqués depuis le stockage local
  useEffect(() => {
    const storedBlockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    setBlockedUsers(storedBlockedUsers);
  }, []);



  
  
  

  return (
    <div className='container'>
        <div className='d-flex justify-content-between mt-5'>
          <div><Button className='ms-4'style={{backgroundColor:'#d46f4d', border :'none'}} onClick={toggleBlockedUsers} > 
          
          {showBlockedUsers ? 'Voir liste utilisateurs non bloqués' : 'Voir liste utilisateurs bloqués'}

          </Button>
          </div>
          <div className='flex-grow-1 d-flex justify-content-end '>
            <div className="champsRecherche mt-2 mb-3 w-50">
              <Form>
                <div
                  className="input-group flex-nowrap "
                  style={{borderColor:'#d46f4d'}}
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
                    style={{backgroundColor:'#d46f4d'}}
                    ><FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>


       {/* liste des utilisateur bloquees */}
       {showBlockedUsers ? (
       <div className="mt-4 ms-3  me-3 ">
        <h4>Liste des utilisateurs bloqués</h4>
        <table className="table border  border-2 ">
          {/* ... en-tête de tableau existant ... */}
          <thead className="" id='hearder-color' style={{backgroundColor:'#d46f4d'}}>
             <tr >
                <th className='header-color' style={{backgroundColor:'#d46f4d' ,color:'#fff'}} >Profile</th>
                <th style={{backgroundColor:'#d46f4d' , color:'#fff'}}>Prenom</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Nom</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Email</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Téléphone</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Action</th>
              </tr>
            </thead>
          <tbody>
            {blockedUsers &&
              blockedUsers.map((blockedUser) => (
                <tr key={blockedUser.id}>
                 <td>
                <Image 
                    // src={blockedUser.image} 
                    src={`http://localhost:8000/storage/${blockedUser.image}`} 
                
                  className="img-profile-tab-user" id='img-profile-tab-user' 
                  style={{height: "30px", width: "30px", borderRadius:"50%"}} />
                </td>
                <td>{blockedUser.nom}</td>
                <td>{blockedUser.prenom}</td>
                <td>{blockedUser.email}</td>
                <td>{blockedUser.telephone}</td>
                
                  <td>
                    <Button
                       onClick={() => handleDebloquer(blockedUser.id)}
                      // disabled={!blockedUser.bloque}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #d46f4d',
                        color: '#d46f4d',
                      }}
                    >
                     <FontAwesomeIcon icon={faUnlock} />
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
       ) : (

      <div>
        <div className='mt-4 ms-3  me-3 '>
        <h4>Liste des utilisateurs </h4>
          <table className="table border  border-2 ">
            <thead className="" id='hearder-color' style={{backgroundColor:'#d46f4d'}}>
             <tr >
                <th className='header-color' style={{backgroundColor:'#d46f4d' ,color:'#fff'}} >Profile</th>
                <th style={{backgroundColor:'#d46f4d' , color:'#fff'}}>Prenom</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Nom</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Email</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Téléphone</th>
                <th style={{backgroundColor:'#d46f4d', color:'#fff' }}>Action</th>
              </tr>
            </thead>
            <tbody>
            {displayUsers &&
              displayUsers.map((userlist) => (
              <tr key={userlist.id}>
                <td>
                <Image src={`http://localhost:8000/storage/${userlist.image}`} className="img-profile-tab-user" id='img-profile-tab-user' 
                  style={{height: "30px", width: "30px", borderRadius:"50%"}} />
                </td>
                <td>{userlist.nom}</td>
                <td>{userlist.prenom}</td>
                <td>{userlist.eamil}</td>
                <td>{userlist.telephone}</td>
                <td>
                  <Button 
                 onClick={() => handleBloquer(userlist.id)}
                 disabled={userlist.bloque}
                  style={{backgroundColor:'#fff' , border:'1px solid #d46f4d', color:'#d46f4d'}}>
                    <FontAwesomeIcon icon={faUserLock} />
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
      )}
       



    </div>
  )
}



// export default function GestionUtilisateurs() {
//   const handleBloquer = async (userId) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/user/bloquer/${userId}`, {
//         isBlocked: !userLists.find((user) => user.id === userId).bloque,
//       });

//       if (response.status === 200) {
//         // Mise à jour locale de l'état de blocage
//         setUserLists((prevUsers) =>
//           prevUsers.map((user) =>
//             user.id === userId ? { ...user, bloque: !user.bloque } : user
//           )
//         );

//         // Mise à jour de la liste des utilisateurs bloqués
//         if (!userLists.find((user) => user.id === userId).bloque) {
//           setBlockedUsers((prevBlockedUsers) => [
//             ...prevBlockedUsers,
//             userLists.find((user) => user.id === userId),
//           ]);
//         } else {
//           setBlockedUsers((prevBlockedUsers) =>
//             prevBlockedUsers.filter((user) => user.id !== userId)
//           );
//         }
//       } else {
//         console.error('Erreur lors de la mise à jour du statut de blocage');
//       }
//     } catch (error) {
//       console.error('Erreur réseau', error);
//     }
//   };

//   const toggleBlockedUsers = () => {
//     setShowBlockedUsers(!showBlockedUsers);
//   };

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between mt-5">
//         <div>
//           <Button
//             className="ms-4"
//             style={{ backgroundColor: '#d46f4d', border: 'none' }}
//             onClick={toggleBlockedUsers}
//           >
//             {showBlockedUsers ? 'Voir liste utilisateurs non bloqués' : 'Voir liste utilisateurs bloqués'}
//           </Button>
//         </div>
//         <div className="flex-grow-1 d-flex justify-content-end">
//           {/* ... votre barre de recherche existante ... */}
//         </div>
//       </div>

//       {showBlockedUsers ? (
//         // Section pour la liste des utilisateurs bloqués
//         <div className="mt-4 ms-3 me-3">
//           <h4>Liste des utilisateurs bloqués</h4>
//           <table className="table border  border-2 ">
//             {/* ... en-tête de tableau existant ... */}
//             <tbody>
//               {blockedUsers &&
//                 blockedUsers.map((blockedUser) => (
//                   <tr key={blockedUser.id}>
//                     {/* ... autres colonnes ... */}
//                     <td>
//                       <Button
//                         onClick={() => handleBloquer(blockedUser.id)}
//                         disabled={!blockedUser.bloque}
//                         style={{
//                           backgroundColor: '#fff',
//                           border: '1px solid #d46f4d',
//                           color: '#d46f4d',
//                         }}
//                       >
//                         Débloquer
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         // Section pour la liste des utilisateurs non bloqués
//         <div className="mt-4 ms-3 me-3">
//           <h4>Liste des utilisateurs non bloqués</h4>
//           <table className="table border  border-2 ">
//             {/* ... en-tête de tableau existant ... */}
//             <tbody>
//               {userLists &&
//                 userLists.map((userlist) => (
//                   <tr key={userlist.id}>
//                     {/* ... autres colonnes ... */}
//                     <td>
//                       <Button
//                         onClick={() => handleBloquer(userlist.id)}
//                         disabled={userlist.bloque}
//                         style={{
//                           backgroundColor: '#fff',
//                           border: '1px solid #d46f4d',
//                           color: '#d46f4d',
//                         }}
//                       >
//                         <FontAwesomeIcon icon={faUserLock} />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

