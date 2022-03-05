import React from 'react';
import './search.css'
// @ts-ignore
import searchIcon from './lupa.png';

const Search = () => {


    const handleClickSearch = () => {
        console.log("Szukam...,")
    }
    return (
        <div className='search'>
            <div className='search-center'>
                <div className='search-input-wrapper'>
                    <div className='search-input-wrapper-input'>
                        <input></input>
                    </div>
                    <div className='search-input-wrapper-icon' onClick={handleClickSearch}><img src={searchIcon} /></div>
                </div>


                <div className='search-checkbox-wrapper'>
                    <div className='search-checkbox-wrapper-checkbox'>
                        <input type="checkbox"></input>
                    </div>
                    <div className='search-checkbox-wrapper-label'>Szukaj wśród niedostępnych</div>
                </div>
            </div>
        </div>
    )
}

export default Search;