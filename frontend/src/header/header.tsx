import React, { useState, useEffect } from 'react';
import './header.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAddBook from '../components/modal-add-book';


const Header = (props:any) => {
    const [show, setShow] = useState(false);

    const openAddModal = () => {
        setShow(true);
    }

    // const getData = async () => {
    //     const data = await axios.get('http://127.0.0.1:8000/book')
    // }

    // useEffect(() => {
    //     getData();
    // }, [])

    return (
        <>
            <div className='header'>
                <div className='header-title'>e-BIBLIOTEKA</div>
                <div className='header-nav' onClick={openAddModal}>DODAJ</div>
            </div>

            <ModalAddBook setShow={setShow} show={show} />

        </>
    )
}

export default Header;