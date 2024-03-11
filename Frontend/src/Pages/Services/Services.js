import React, { useEffect, useState } from 'react'
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil'
import Footer from '../../Components/Footer/Footer'
import Pagination from '../../Components/Pagination/Pagination'
import Underline from '../../Components/Underline/Underline'
import { Button, Form, Image } from 'react-bootstrap'
import banservice from '../../fichiers/banservices_simple.png'
import './Services.css';
import imgservice1 from '../../fichiers/S1 (1).png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ButtonWatshapp from '../../Components/Buttons/BouttonWatshapp/ButtonWatshapp'

export default function Services({id}) {

  const [serviceLists, setServiceLists] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredServices = serviceLists.filter((service) =>
    service.titre.toLowerCase().includes(searchValue.toLowerCase())
  );
  const displayServices = searchValue === '' ? serviceLists : filteredServices;

   // pour la pagination
   const [currentPage, setCurrentPage] = useState(1);
   const servicesParPage = 6;
   
  // pagination
const indexOfLastService = currentPage * servicesParPage;
const indexOfFirstService = indexOfLastService - servicesParPage;
const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

const totalPaginationPages = Math.ceil(serviceLists.length / servicesParPage);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/service/liste"
        );
        // setCategories(response.categories);
        setServiceLists(response.data.services);
        // console.log(response, 'reponse')
  
        console.log(response , 'servicesList');
      } catch (error) {
        // console.error("Erreur lors de la récupération des maison:", error);

      }
    };
    fetchUsers();
  }, []);


  return (
    <>
      <NavbarAccueil />
      <div className='border6verifaction'>
        <Image  src={banservice} id='banimg-service' />
      </div>
      <div className='container'>
        <div className='mt-5'><Underline text='Nos offres de service' /></div>
        <ButtonWatshapp />
        <div className="section_header">
          <div className="btn-section">
            <p className="btn btn"><span className='contentnombremaison'>{serviceLists ? serviceLists.length : 0}</span><span className='contentnombremaison2'>Services</span></p>
      
          </div>
          <div className="section_search">
            <Form action="" className='d-flex section-search-form'>
              <Form.Control  type="text" placeholder="Cherchez une offre"  id='input-searchcontent-maison'
              value={searchValue}
              onChange={handleSearchChange}
              />
              <Button type='submit' id='btn-searchmaison'>Rechercher</Button>
            </Form>
          </div>
          </div>
        
        <div className='content-main-service'>

        {currentServices  &&
              currentServices .map((serviceList) => (
          <div className='content-main-service-card'>
            <div className='content-main-service-content'>
              <Image  src={`http://localhost:8000/storage/${serviceList.image}`}  id='content-main-service-contentimg' />
            </div>
            <div className='content-bottom-card'>
            <div><h6 className='text-center mt-3 '>{serviceList.titre}</h6></div>
            <div className='btn-content-service'>
            <Button className='btn-service' ><Link to={`/detailservices/${serviceList.id} || '' `} id='detail-content-service'>Voir détail</Link></Button>
            </div>
            </div>

          </div>
           ))}
            
        </div>
         <Pagination
         currentPage={currentPage}
         totalPaginationPages={totalPaginationPages}
         setCurrentPage={setCurrentPage}
         
         />
      </div>
      
      <Footer />
    </>
  )
}
