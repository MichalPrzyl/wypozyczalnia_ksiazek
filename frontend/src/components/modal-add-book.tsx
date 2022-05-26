import React, { useState, useEffect } from 'react';
import '../header/header.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalFooter from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalAddBook = (props: any) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");
    const [inputFile, setInputFile] = useState(undefined);
    const [errors, setErrors] = useState("");
    const { show, setShow } = props;

    const openModal = () => {

    }
    const closeModal = () => {
        setShow(false);
        setInputTitle("");
        setInputAuthor("");
        setInputFile(undefined);
        setErrors("");
        props.getData();
    }

    const submitData = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        if (inputFile) {
            formData.append('cover', inputFile);
        }
        formData.append('title', inputTitle);
        formData.append('author', inputAuthor);
        formData.append('is_available', "true");
        try {
            const response = await axios.post('http://127.0.0.1:8000/book', formData)
            closeModal();
        } catch (err: any) {
            const errorMsg = err.request.response.split('"')[3]
            setErrors(errorMsg)
        }

    }

    const handleChangeFile = (e: any) => {
        setInputFile(e.target.files[0]);
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
                    Dodaj książkę
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-5">Tytuł:
                <input type="text" className="mx-5" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></input></div>

                <div className="mb-5">Autor:
                <input type="text" className="mx-5" value={inputAuthor} onChange={(e) => setInputAuthor(e.target.value)}></input></div>

                <div>Okładka:</div>
                <div className="my-1"><input type="file" onChange={handleChangeFile}></input></div>
            </Modal.Body>

            <Modal.Footer>
                <div className="error">{errors ? errors : ""}</div>
                <Button variant="secondary" onClick={() => { closeModal(); }} >
                    Zamknij
                </Button>
                <Button variant="primary" onClick={submitData}>
                    Dodaj
                </Button>
            </Modal.Footer>

        </Modal>
    </>
}

export default ModalAddBook;