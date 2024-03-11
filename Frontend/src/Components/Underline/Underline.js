import { faDiamond } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Underline.css';

export default function Underline(props) {
    // console.log(props)
  return (
    <div>
        <div className="mb-3 ">
        <div className='d-flex justify-content-center icon-diamond-home'><span className='mx-auto'><FontAwesomeIcon icon={faDiamond} /></span></div>
        <div><h4 className='text-center text-dark fw-bold'>{props.text} </h4></div>
      
        <div className='contentlinehome mx-auto '> 
          <div className='underline-content' id='underline-content1'></div>
          <div className='underline-content' id='underline-content2'></div>
        </div>
      </div>
    </div>
  )
}
