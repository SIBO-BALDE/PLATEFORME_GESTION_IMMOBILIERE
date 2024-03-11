import React, { useEffect, useState } from 'react'
import './Terrains.css';
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil';
import Footer from '../../Components/Footer/Footer';
import { Button, Form, Image } from 'react-bootstrap';
import banland from '../../fichiers/ban terrain.png'
import banland1 from "../../fichiers/Automotive Banner.png";
import land1 from '../../fichiers/land1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faComment, faGlobe, faHouse, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';
import Underline from '../../Components/Underline/Underline';
import axios from 'axios';
import ButtonWatshapp from '../../Components/Buttons/BouttonWatshapp/ButtonWatshapp';
import Swal from 'sweetalert2';

export default function Terrains({id}) {


  const [terrainLists, setTerrainLists] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const terrainsParPage = 6;

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/terrain/liste"
        );
        // setCategories(response.categories);
        setTerrainLists(response.data.terrains);
        // console.log(response, 'reponse')
  
        console.log(response , 'terrainlist');
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

  const filteredTerrains = terrainLists.filter((terrain) =>
    terrain.addresse.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayTerrains = searchValue === '' ? terrainLists : filteredTerrains;


  // pagination
const indexOfLastTerrain = currentPage * terrainsParPage;
  const indexOfFirstTerrain = indexOfLastTerrain - terrainsParPage;
  const currentTerrains = filteredTerrains.slice(indexOfFirstTerrain, indexOfLastTerrain);

  const totalPaginationPages = Math.ceil(terrainLists.length / terrainsParPage);

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
      <NavbarAccueil />

      <div className='contentmainland'>
        {/* banner */}
        <div>
          <Image src={banland1}  id='imgbanland'/>
        </div>
        <div className='mt-5'>
        <Underline text='Nos offre de terrains' />
        </div>
        <ButtonWatshapp />
        
        <div className='container'>
        <div class="section_header  ">
          <div class="btn-section">
            <p class="btn btn"><span className='contentnombremaison'>{terrainLists ? terrainLists.length : 0}</span><span className='contentnombremaison2'>Terrains</span></p>
      
          </div>
          <div class="section_search">
            <Form action="" className='d-flex section-search-form'>
              <Form.Control  type="text" placeholder="Cherchez un terrain"  id='input-searchcontent-maison'
               value={searchValue}
               onChange={handleSearchChange}
              />
              <Button type='submit' id='btn-searchmaison'>Rechercher</Button>
            </Form>
          </div>
          </div>
        <div className='contentlandbody container '>
        {currentTerrains &&
              currentTerrains.map((terrainList) => (
          <div className='card-land-band'>
            <div className='card-land-imgcontent'><Image src={`http://localhost:8000/storage/${terrainList.image}`} className='card-land-img' /> </div>
          
          <div className='pricelandcontent d-flex '>
            <h6>{terrainList.prix} FCFA</h6>
          </div>
          <div className='d-flex card1land' id='card1land'>
            <div>
            <div><span className='landiconcard'><FontAwesomeIcon icon={faHouse} /> </span><span>Terrain à vendre</span></div>
            <div><span className='landiconcard'><FontAwesomeIcon icon={faGlobe} /></span><span>{terrainList.superficie}m2</span></div>
            </div>
            <div>
            <div><span className='landiconcard'><FontAwesomeIcon icon={faLocationDot} /></span><span>{terrainList.addresse}</span></div>
            <div><span className='landiconcard'><FontAwesomeIcon icon={faCartShopping} /></span><span>Panier</span></div>
            </div>
          </div>
          <hr  id='referenceland'/>
          <div className='contentlan-btn'>
            <Button id='btn1'><Link to={`/detailterrain/${terrainList.id} || '' `} id='link-contentland1'>Voir détail</Link></Button>
            <Button id='btn2' onClick={handleClickMoreUser}><Link  id='link-contentland2'>Plus d'infos</Link></Button>
          </div>
          </div>
           ))}
          

          
        
         
        </div>
          <Pagination  id='paginationterrain'
          currentPage={currentPage}
          totalPaginationPages={totalPaginationPages}
          setCurrentPage={setCurrentPage}
          
          />
         </div>

      </div>
      <Footer />
    </div>
  )
}
