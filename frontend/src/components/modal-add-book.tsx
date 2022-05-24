import React, { useState, useEffect } from 'react';
import '../header/header.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalFooter from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalAddBook = (props: any) => {
    const { show, setShow } = props;
    const [ inputTitle, setInputTitle ] = useState(""); 
    const [ inputFile, setInputFile ] = useState();

    const submitData = async(e:any) => {
        e.preventDefault();

        const formData = new FormData();
        if(inputFile){
            formData.append('cover', inputFile);
        }
        formData.append('title', inputTitle);

        await axios.post('http://127.0.0.1:8000/book', formData)
        setShow(false);
    }

    const handleChangeFile = (e:any) =>{
        setInputFile(e.target.files[0]);
    }

    return <>
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Custom Modal Styling
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Name
                <input type="text" value={inputTitle} onChange={(e)=>setInputTitle(e.target.value)}></input>

                <input type="file" onChange={handleChangeFile}></input>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={() => {setShow(false);}} >
                    Close
                </Button>
                <Button variant="primary" onClick={submitData}>
                    Save Changes
                </Button>
            </Modal.Footer>

        </Modal>
    </>
}

export default ModalAddBook;