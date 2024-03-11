import React from 'react'
import NavbarAccueil from '../../Components/Navbars/NavbarAccueil/NavbarAccueil'
import Footer from '../../Components/Footer/Footer'
import Underline from '../../Components/Underline/Underline'
import { Image } from 'react-bootstrap'
import banpropos from '../../fichiers/bann _about.png'
import photo1 from '../../fichiers/bann accueil.jpeg'
// import photo2 from '../../fichiers/maison1.png'


import './Apropos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import ButtonWatshapp from '../../Components/Buttons/BouttonWatshapp/ButtonWatshapp'


export default function Apropos() {
  return (
    <div>
      <NavbarAccueil />
      <div className='navbar-propos'>
        <Image src={banpropos} className='apropoimg' />

      </div>
      <div className=''>
      <div className='mt-5'><Underline  text='A-propos'/></div>
      <ButtonWatshapp />
      <div id='experience'>
        <div id="" className='container'>
        <div className="experience pt-100 pb-100" >
		   <div className="container">
			<div className="row">
				<div className="col-xl-8 mx-auto text-center">
				</div>
			</div>
			<div className="row">
               <div className="col-xl-12">
                  <ul className="timeline-list">
                     {/* <!-- Single Experience --> */}
                     <li>
                        <div className="timeline_content" id='content1'>
                           {/* <span>2008</span> */}
                           <h4> Qui Sommes nous</h4>
                           <p>L'histoire de Diaspora Connect prend racine en 2023 avec une vision audacieuse de connecter les sénégalais de l'extérieur et le pays . Cette année-là, une équipe déterminée a semé les premières graines de ce qui allait devenir une plateforme révolutionnaire. Des heures de planification, de discussions et de développement ont permis d'établir les bases solides nécessaires pour concrétiser cette vision ambitieuse.</p>
                        </div>
                     </li>
                     {/* <!-- Single Experience --> */}
                     <li>
                        <div className="timeline_content">
                        <Image  src={photo1} className='timeline-img'id='contentimg-timeline' />
                        </div>
                     </li>
                     {/* <!-- Single Experience --> */}
                     <li>
                        <div className="timeline_content">
                        <Image  src={photo1} className='timeline-img'id='contentimg-timeline' />
                        </div>
                     </li>
                     {/* <!-- Single Experience --> */}
                     <li>
                        <div className="timeline_content" id='timeline_content'>
                        
                           <h4>Nos objectifs</h4>
                           <p>Alors que notre communauté continuait de croître, nous avons redoublé d'efforts pour améliorer l'expérience utilisateur. L'innovation était au cœur de nos préoccupations, avec des investissements majeurs dans des fonctionnalités novatrices et une interface conviviale. Cela a permis de renforcer l'engagement au sein de notre communauté grandissante.</p>
                        </div>
                     </li>
                     <li>
                        <div className="timeline_content"  id='content1' >
                        
                           <h4>Innovation et Engagement</h4>
                           <p>L'année 2023 a été le témoin de nombreux succès et réalisations pour notre communauté. Les récits inspirants de réussite et d'impact positif de l'immobilier sur les vies et les carrières ont alimenté notre détermination à continuer d'offrir des expériences  de qualité. Ces histoires de succès sont devenues la pierre angulaire de notre motivation.</p>
                        </div>
                     </li>
                  </ul>
               </div>
      </div>
		 </div>
	    </div>
      </div>
      <section className='mt-5 section-avis'>
      <Underline  text="Notre équipe" /> 
      {/* debut card */}
      <div className='container mt-5 ' id='content-flex' >
        <div className='contain-card'>
        <div className='content-contenimg'>
          <Image src={photo1}  id='contenimg-pointview'/>
        </div>
        <div className='content-bottom'>
          <h5 className='text-center'>Sibo Balde</h5>
          <h6 className='text-center'>Developpeuse Frontend</h6>
          <p className='text-center'> Le développeur back-end a pour mission de concevoir tous les éléments techniques indispensables au fonctionnement </p>
          <di className='icon-content-pointview'>
            <span><FontAwesomeIcon icon={faFacebookF} /> </span>
            <span><FontAwesomeIcon icon={faLinkedinIn} /> </span>
            <span><FontAwesomeIcon icon={faTwitter} /> </span>
            </di>
        </div>
        </div>
        <div className='contain-card'>
        <div className='content-contenimg'>
          <Image src={banpropos}  id='contenimg-pointview'/>
        </div>
        <div className='content-bottom'>
          <h5 className='text-center'>Moussa Bass</h5>
          <h6 className='text-center'>Developpeuse Backend</h6>
          <p className='text-center'> Le développeur back-end a pour mission de concevoir tous les éléments techniques indispensables au fonctionnement </p>
          <di className='icon-content-pointview'>
            <span><FontAwesomeIcon icon={faFacebookF} /> </span>
            <span><FontAwesomeIcon icon={faLinkedinIn} /> </span>
            <span><FontAwesomeIcon icon={faTwitter} /> </span>
            </di>
        </div>
        </div>
        <div className='contain-card'>
        <div className='content-contenimg'>
          <Image src={banpropos}  id='contenimg-pointview'/>
        </div>
        <div className='content-bottom'>
          <h5 className='text-center'>Sibo Balde</h5>
          <h6 className='text-center'>Developpeuse Frontend</h6>
          <p className='text-center'> Le développeur back-end a pour mission de concevoir tous les éléments techniques indispensables au fonctionnement </p>
          <di className='icon-content-pointview'>
            <span><FontAwesomeIcon icon={faFacebookF} /> </span>
            <span><FontAwesomeIcon icon={faLinkedinIn} /> </span>
            <span><FontAwesomeIcon icon={faTwitter} /> </span>
            </di>
        </div>
        </div>
        <div className='contain-card'>
        <div className='content-contenimg'>
          <Image src={banpropos}  id='contenimg-pointview'/>
        </div>
        <div className='content-bottom'>
          <h5 className='text-center'>Sibo Balde</h5>
          <h6 className='text-center'>Developpeuse Frontend</h6>
          <p className='text-center'> Le développeur back-end a pour mission de concevoir tous les éléments techniques indispensables au fonctionnement </p>
          <di className='icon-content-pointview'>
            <span><FontAwesomeIcon icon={faFacebookF} /> </span>
            <span><FontAwesomeIcon icon={faLinkedinIn} /> </span>
            <span><FontAwesomeIcon icon={faTwitter} /> </span>
            </di>
        </div>
        </div>
        <div className='contain-card'>
        <div className='content-contenimg'>
          <Image src={banpropos}  id='contenimg-pointview'/>
        </div>
        <div className='content-bottom'>
          <h5 className='text-center'>Sibo Balde</h5>
          <h6 className='text-center'>Developpeuse Frontend</h6>
          <p className='text-center'> Le développeur back-end a pour mission de concevoir tous les éléments techniques indispensables au fonctionnement </p>
          <di className='icon-content-pointview'>
            <span><FontAwesomeIcon icon={faFacebookF} /> </span>
            <span><FontAwesomeIcon icon={faLinkedinIn} /> </span>
            <span><FontAwesomeIcon icon={faTwitter} /> </span>
            </di>
        </div>
        </div>
        <div className='contain-card'>
        <div className='content-contenimg'>
          <Image src={banpropos}  id='contenimg-pointview'/>
        </div>
        <div className='content-bottom'>
          <h5 className='text-center'>Sibo Balde</h5>
          <h6 className='text-center'>Developpeuse Frontend</h6>
          <p className='text-center'> Le développeur back-end a pour mission de concevoir tous les éléments techniques indispensables au fonctionnement </p>
          <di className='icon-content-pointview'>
            <span><FontAwesomeIcon icon={faFacebookF} /> </span>
            <span><FontAwesomeIcon icon={faLinkedinIn} /> </span>
            <span><FontAwesomeIcon icon={faTwitter} /> </span>
            </di>
        </div>
        </div>
      </div>
      {/* Fin card */}
      </section>  
      </div>
      {/* <div className='container'><Pagination /></div> */}
      </div>
      <Footer />
    </div>
  )
}
