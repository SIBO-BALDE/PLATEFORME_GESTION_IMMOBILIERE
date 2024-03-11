import React, { useState } from 'react'
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil'
import Footer from '../../Components/Footer/Footer'
import Underline from '../../Components/Underline/Underline'
import Pagination from '../../Components/Pagination/Pagination'
import banpropos from '../../fichiers/bancontact_simple.png'
import { Button, Form, Image } from 'react-bootstrap'
import contact from '../../fichiers/contact.png'
import contactNous from '../../fichiers/contact-nous.png'
import './Contact.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faQuestion, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import ButtonWatshapp from '../../Components/Buttons/BouttonWatshapp/ButtonWatshapp'
import Swal from 'sweetalert2'
import axios from 'axios'
import { emailPattern} from '../../Components/Regex/Regex.js' 

export default function Contacts() {

  const [messages, setMessages] = useState([]);

    const [messageData, setMessageData] = useState({
        email: "",
        message: "",
      });
      
      const ajouterMessage = async (e) => {
        e.preventDefault();

        if(messageData.email === "" || messageData.message === ""){
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "les champs sont  obligatoires!",
          });
          return
        }
        if (!emailPattern.test(messageData.email)){
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "L'email  invalide!",
          });
          return
          
        }
        
        try {
            const response = await axios.post(
              "http://localhost:8000/api/messages/create",
    
              messageData,
              
            );
    
            // Vérifiez si la requête a réussi
            if (response.status === 200) {
              // Ajoutez la nouvelle maison à la liste existante
              setMessages([...messages, response.data]);
             
              setMessageData({
                email: "",
                message: "",
              });
              Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "Message envoyée avec succée!",
              });
             
             
            } else {
              console.error("Erreur dans lajout de maison");
            }
          
        } catch (error) {
          // Gestion des erreurs Axios
          console.error("Erreur Axios:", error);
        }
      };


  return (
    <div>
      <div>
        <NavbarAccueil />
        <div>
          <div className='banner-contact'>
            <Image src={banpropos} className='banner-contact1' />

          </div>
          <div className='main-content-contact'>
           <div className='mt-5 mb-5 '> <Underline text="Nous contactez" /></div>
           <ButtonWatshapp />
            <section className=''>
              
              <div className=' conain-main-contact container'>
                <div className='contain-image-contact-detail'> 
                  <Image src={contactNous} id='img-contact-content' />
                  <div className='d-flex justify-content-evenly 'id='icon-relative-contact'>
                    {/* <Link className='icon-contact-content'> */}
                    <a className='icon-contact-content' href='tel:+221774935677'>
                      <span id='icon-taille-contact'> <FontAwesomeIcon icon={faPhone} /> </span>
                    <p>+221 77 493 56 77</p>
                    {/* </Link> */}
                    </a>
                    {/* <Link className='icon-contact-content'> */}
                    <a className='icon-contact-content' href='mailto:diapcon@gmail.com'>
                    <span id='icon-taille-contact'> <FontAwesomeIcon icon={faEnvelope} /> </span>
                     <p>diapcon@gmail.com</p>
                     </a>
                    {/* </Link> */}
                  </div>
                </div>
                <div className='second-contact-content'>
                <div className="innerCard">
            <div className="frontSide">
                <h1 clasNames="title">Besoin D'aide </h1>
                <span><FontAwesomeIcon icon={faQuestion}  id='conten-icon-question'/></span>
                {/* <p>Contactez Nous</p> */}
                
            </div>
            <div className="backSide">
              <h1>DIASPORA CONNECT</h1>
                <p>Vous souhaitez construire une maison au sénegal en etant à 
                    l’étrangerz visitez nos differents offres de services de construction à des prix battants tout concurenst</p>
                    <div className='w-100 d-flex  justify-content-center '>
                      <Link to={'/'}>
                      <Button id='btn-btncontact'> Visitez notre page d'accueille pour  voir nos offres</Button>
                      </Link>
                     </div>
                    </div>
                </div>
                </div>
              </div>
              <div className='section-contact1'>
              <Underline text="Pour tous autre informations vueillez et renseignez ce formulaire" />
              <div className='container  content-flex-contact'>
                < div className='content-left-form-contact'>
                    <Form >
                      <h3 className='text-center mt-5 '> Contactez nous</h3>
                     
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
  <Form.Label>Email</Form.Label><span className='text-danger'>*</span>
  <Form.Control
    type="text"
    value={messageData.email}  // Ajoutez cette ligne
    onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
  />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
  <Form.Label>Sujet</Form.Label><span className='text-danger'>*</span>
  <Form.Control
    as="textarea"
    rows={3}
    value={messageData.message}  // Ajoutez cette ligne
    onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
  />
                          </Form.Group>


                        <div className='btn-content-position-contact'>
                            <Button type='submit'  className='btn-colour-contact w-100 '
                            onClick={ajouterMessage}
                            
                            >Envoyer</Button>
                        </div>
                    </Form>
                  </div>
                  <div className='img-content-form-contact'>
                      <Image src={contact} alt='' id='image-form-contact'/>
                  </div>
              </div>
              </div>
            </section>
          </div>
         
        </div>
        <Footer />
      </div>
    </div>
  )
}
