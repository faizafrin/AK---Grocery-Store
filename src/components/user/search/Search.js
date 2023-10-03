import React from 'react'
import { useSelector } from 'react-redux';
import './search.css'
const Search = () => {
  const searchToggle = useSelector((state)=> state.toggleReducer.searchToggle);
  return (
  
 <form className="search-form" id={searchToggle ? (null):("search-form")}>
        <input type="search" id="search-box" placeholder="search here..."/>
        <label for="search-box" className="fas fa-search"></label>
    </form>
     
   
  )
}

export default Search