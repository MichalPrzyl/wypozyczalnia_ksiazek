import React, { useEffect } from 'react';
import './header.css'
import axios from 'axios';
const Header = () => {
    const openAddModal = () =>{
        console.log("no i wcisnąłeś")
    }

    const getData = async () =>{
        await axios.get('http://127.0.0.1:8000/book')
    }


    useEffect(()=>{
        getData();
    })

    return (
        <div className='header'>
            <div className='header-title'>e-BIBLIOTEKA</div>
            <div className='header-nav' onClick={openAddModal}>DODAJ</div>
        </div>
    )
}

export default Header;