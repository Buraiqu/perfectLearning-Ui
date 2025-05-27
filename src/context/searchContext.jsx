import { createContext, useState, useContext } from 'react';

// Create the context
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Value to be provided to consumers
  const value = {
    searchQuery,
    setSearchQuery
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using the search context
export const useSearch = () => {
  return useContext(SearchContext);
};