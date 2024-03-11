import React from 'react'
import './Panier.css';
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil'
import Footer from '../../Components/Footer/Footer'
import Underline from '../../Components/Underline/Underline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import imgpanier from '../../fichiers/bann accueil.jpeg'
import { Button, Image } from 'react-bootstrap';

export default function Panier() {
  return (
    <div className='main-content-panier'>
      <NavbarAccueil />
      <div>
        <Underline text='Détail panier'/>
        <div className='d-flex content-one-page-panier container'>
         
         {/* premier partie */}
          <div className='conten-main-content1-left'>
             
          <div className='  content-one-page-panier1' id='content-one-page-panier1'>
            <div> <Image  src={imgpanier} id='img-panier-fixe' className='mt-3 img-content-panier-product' /></div>
            <div>
              <h5>Maison R+4</h5>
              <h6 className='price-color-panier'>50.000.000FCFA</h6>
              <p>Lorem upsum lorem upsum</p>
            </div>
            <div className='mt-3'><h5>1</h5></div>
            <div className='icon-delete-panier mt-3 '><FontAwesomeIcon icon={faTrashCan}  /></div>
          </div>
          <div className='  content-one-page-panier1' id='content-one-page-panier1'>
            <div> <Image  src={imgpanier} id='img-panier-fixe' className='mt-3 img-content-panier-product' /></div>
            <div>
              <h5>Maison R+4</h5>
              <h6 className='price-color-panier'>50.000.000FCFA</h6>
              <p>Lorem upsum lorem upsum</p>
            </div>
            <div className='mt-3'><h5>1</h5></div>
            <div className='icon-delete-panier mt-3 '><FontAwesomeIcon icon={faTrashCan}  /></div>
          </div>
          <div className='  content-one-page-panier1' id='content-one-page-panier1'>
            <div> <Image  src={imgpanier} id='img-panier-fixe' className='mt-3 img-content-panier-product' /></div>
            <div>
              <h5>Maison R+4</h5>
              <h6 className='price-color-panier'>50.000.000FCFA</h6>
              <p>Lorem upsum lorem upsum</p>
            </div>
            <div className='mt-3'><h5>1</h5></div>
            <div className='icon-delete-panier mt-3 '><FontAwesomeIcon icon={faTrashCan}  /></div>
          </div>

          </div>

          {/* deuxime partie */}
          <div className='content-one-page-panier2 '>
            <h4 className='text-center'>Total:60.000.000FCFA</h4>
              <div className='d-flex justify-content-center align-items-center gap-2 flex-column' >
                <Button className='w-100 btn-btn-payment-panier'id='btn-btn-payment-panier' >Proceder au payment</Button>
                <Button className='w-100 btn-btn-payment-panier' id='btn-btn-payment-panier'>Vider le  panier</Button>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
