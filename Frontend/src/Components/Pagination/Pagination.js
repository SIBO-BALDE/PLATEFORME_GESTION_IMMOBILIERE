import React from 'react'
import './Pagination.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ currentPage, totalPaginationPages, setCurrentPage }) {
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPaginationPages; i++) {
      items.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
          <a className="page-link " onClick={() => setCurrentPage(i)} href="#" >
            {i}
          </a>
        </li>
      );
    }
    return items;
  };
  return (
    <div>
     <nav aria-label="Page navigation example" id='navigation'>
        <ul className="pagination" >
              <a className="page-link"  onClick={() => setCurrentPage(currentPage - 1)} 
                   href="#" aria-label="Previous" id='page-link1' >
                <FontAwesomeIcon icon={faChevronLeft} id='iconpagination' /> 
              </a>
              
              {renderPaginationItems()}
              <a className="page-link" id='page-link1' href="#" 
                 onClick={() => setCurrentPage(currentPage + 1)}  aria-label="Next">
                <FontAwesomeIcon icon={faChevronRight} id='iconpagination'/>
                </a>
        </ul>
    </nav>
    </div>
  )
}
