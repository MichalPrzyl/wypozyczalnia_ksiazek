import React from 'react';
import './header.css'

const Header = () => {
    const openAddModal = () =>{
        console.log("no i wcisnąłeś")
    }
    return (
        <div className='header'>
            <div className='header-title'>e-BIBLIOTEKA</div>
            <div className='header-nav' onClick={openAddModal}>DODAJ</div>
        </div>
    )
}

export default Header;