import React, { useState } from 'react';
import '../header/header.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalFooter from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalBorrow = (props: any) => {
    const [inputName, setInputName] = useState('');
    const { show, setShow } = props;

    const handleChangeInputName = (e: any) => {
        setInputName(e)
    }

    const closeModal = () => {
        setInputName("")
        setShow(false);
        console.log(window.location.search)
        props.getData(props.params);
    }

    const submitData = async (e: any) => {
        e.preventDefault();

        const sendState = {
            borrowed_to: inputName,
            is_available: false
        }
        
        const response = await axios.patch(`http://127.0.0.1:8000/book/${props.selectedBookId}/`, sendState)

        closeModal();
    }


    return <>
        <Modal
            show={show}
            onHide={() => closeModal()}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Wypożycz książkę
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-5">Kto wypożycza:
                    <input type="text" className="mx-5" value={inputName} onChange={(e) => handleChangeInputName(e.target.value)}></input></div>


            </Modal.Body>

            <Modal.Footer>
                {/* <div className="error">{errors ? errors : ""}</div> */}
                <Button variant="secondary" onClick={() => { closeModal(); }} >
                    Zamknij
                </Button>
                <Button variant="primary" onClick={submitData}>
                    Wypożycz
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ModalBorrow;