import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './ButtonWatshapp.css';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";

export default function ButtonWatshapp() {
  useEffect(() =>
   {

    // handleClickWatshappButton()
   }, []);

  const handleClickWatshappButton = async () => {
    // try {
    //   const response = await axios.post('https://localhost:8000/api/users/whatsapp');
    //   console.log(response.data);
      
    //   // if (response.data === 200) {
    //   //   // Redirigez l'utilisateur vers le lien WhatsApp
    //   //   window.location.href = response.data.urlWhatsApp;
    //   // } else {
    //   //   console.error('La réponse du serveur ne contient pas l\'URL WhatsApp.');
    //   // }

    // } catch (error) {
    //   console.error('Erreur lors de l\'envoi du message WhatsApp', error);
    // }

    // try {
    //   const response = await axios.post('https://localhost:8000/api/users/whatsapp');
    //   console.log(response.data, 'response.data');

    //   if (response.data.urlWhatsApp) {
    //     // Redirigez l'utilisateur vers le lien WhatsApp
    //     window.location.href = response.data.urlWhatsApp;
    //   } else {
    //     console.error("La réponse du serveur ne contient pas l'URL WhatsApp.");
    //   }
    // } catch (error) {
    //   console.error("Erreur lors de la récupération de l'URL WhatsApp", error.message);
    // }

   
      // this. = data.user;
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
     
    
  };
  
  
  return (
    <div>
       <Button className="whatsapp-button" onClick={handleClickWatshappButton }>
        <a 
           data-tooltip-id="my-tooltip-multiline" 
           data-tooltip-html="Besoin de plus d'information ?<br />Cliquez sur le button pour nous contacter">
        <FontAwesomeIcon icon={faWhatsapp}  className='icon-whattsapp'/>
        </a>
        <Tooltip id="my-tooltip-multiline" 
        style={{ backgroundColor: "#25D366", color: "#fff", fontSize:'15px', fontWeight:'bold'}}
        />
        </Button>
    </div>
  )
}
