import React from 'react';
import './Pagination.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import downArrowIcon from '../../icons/down-arrow-icon.svg';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  maxVisiblePages = 5 
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      <button 
        className={`pagination-nav ${!canGoPrevious ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!canGoPrevious}
      >
        <img src={downArrowIcon} className='prev-page' alt="Down Arrow" />
      </button>
      
      {visiblePages[0] > 1 && (
        <>
          <button 
            className="pagination-page"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}
      
      {visiblePages.map(page => (
        <button
          key={page}
          className={`pagination-page ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button 
            className="pagination-page"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button 
        className={`pagination-nav ${!canGoNext ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!canGoNext}
      >
        <img src={downArrowIcon} className='next-page' alt="Down Arrow" />
      </button>
    </div>
  );
};

export default Pagination;
