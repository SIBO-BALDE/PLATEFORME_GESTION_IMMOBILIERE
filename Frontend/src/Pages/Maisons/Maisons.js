import React, { useEffect, useState } from 'react'
import './Maisons.css';
import Underline from '../../Components/Underline/Underline'
import { Button, Form, Image } from 'react-bootstrap';
import banner from '../../fichiers/ban maison.png'
import image1 from '../../fichiers/m1.png'
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil';
import Footer from '../../Components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHouse, faLayerGroup, faSink, faTag } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Components/Pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import ButtonWatshapp from '../../Components/Buttons/BouttonWatshapp/ButtonWatshapp';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Maisons({id}) {
// poue lister les maisons
  const [maisonLists, setMaisonLists] = useState([]);
  // Pour la recherche de maison par addresse
  const [searchValue, setSearchValue] = useState('');

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maisonsParPage = 6;
  

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/maison/liste"
        );
        // setCategories(response.categories);
        setMaisonLists(response.data.maison);
        console.log(response, 'reponse')
  
        // console.log(response , 'maisonlist');
      } catch (error) {
        console.error("Erreur lors de la récupération des maison:", error);

      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); 
  };

  const filteredMaisons = maisonLists.filter((maison) =>
  maison.addresse && maison.addresse.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayMaisons = searchValue === '' ? maisonLists : filteredMaisons;

// pagination
const indexOfLastMaison = currentPage * maisonsParPage;
  const indexOfFirstMaison = indexOfLastMaison - maisonsParPage;
  const currentMaisons = filteredMaisons.slice(indexOfFirstMaison, indexOfLastMaison);

  const totalPaginationPages = Math.ceil(maisonLists.length / maisonsParPage);

  

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
      {/* navbbar */}
      <NavbarAccueil />
      {/* fin navbar */}

      {/* banner */}
      <div className='banmaison'>
        <Image src={banner}  id='banmaisonimg'/>
        <Button className=' btn-contentmaison' ><a href='#contentmainmaison'>Acheter maintenant</a></Button>
      </div>
       {/*  fin banner */}
      <Underline text="Nos offres de maison" id='underlinecomponent mt-0 ' />
      <ButtonWatshapp />
      <div id='contentmainmaison'>
        <div className="container">
            <div className="container_left">
              <div className="section_header">
          <div className="btn-section">
            <p className="btn btn"><span className='contentnombremaison'>{maisonLists ? maisonLists.length : 0}</span><span className='contentnombremaison2'>Maisons</span></p>
      
          </div>
          <div className="section_search">
            <Form action="" className='d-flex'>
              <Form.Control  type="text" placeholder="Cherchez une offre" 
              value={searchValue}
              onChange={handleSearchChange}
               id='input-searchcontent-maison'/>
              <Button type='submit' id='btn-searchmaison'>Rechercher</Button>
            </Form>
          </div>
              </div>
              <div className="Card_Mentor">
              {currentMaisons &&
             currentMaisons.map((maisonList) => (
                    <div className="card1">
                    <div className="section_left">
                     <Image src={`http://localhost:8000/storage/${maisonList.image}`} alt="" id='section-left'/>
                    </div>
                    <div className="section_right">
                      <p> <span><FontAwesomeIcon icon={faHouse}  id='iccon-sectionright-content'/> </span>Adress: <span id="prop">{maisonList.addresse}</span></p>
                      <p> <span><FontAwesomeIcon icon={faGlobe} id='iccon-sectionright-content' /></span>Superficie: <span id="prop">{maisonList.superficie} m2</span></p>
                      <p> <span><FontAwesomeIcon icon={faTag} id='iccon-sectionright-content' /></span>Prix: <span id="prop">{maisonList.prix} FCFA</span></p>
                      <p> 
                        <span><FontAwesomeIcon icon={faLayerGroup} id='iccon-sectionright-content' /></span>Categorie: <span id="prop">
                        {maisonList.categorie && maisonList.categorie.titre
                      ? maisonList.categorie.titre
                      : "Catégorie non définie"}{" "}
                        </span>
                        </p>
                     
                    <div className='d-flex btn-content-section-right mt-5 '>
                      <button className='btn1'><Link to={`/detailmaison/${maisonList.id} || '' `}  id='link-detail-maison-content'>Voir détail</Link></button>
                      <button className='btn2' onClick={ handleClickMoreUser}>Plus d'info</button>
                      </div>
                    </div>
                    </div>
                     ))}
                   
             
              </div>
            </div>
          <div className="">
          <Pagination
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
          
          />
        </div>
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </div>
  )
}
