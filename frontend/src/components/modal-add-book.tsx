import React, { useState, useEffect } from 'react';
import '../header/header.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalFooter from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export interface IErrors {
    title: string;
}

const ModalAddBook = (props: any) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");
    const [inputFile, setInputFile] = useState(undefined);
    // const [errors, setErrors] = useState("");
    const [errors, setErrors] = useState({} as any);
    const { show, setShow } = props;

    const openModal = () => {

    }
    const closeModal = () => {
        setShow(false);
        setInputTitle("");
        setInputAuthor("");
        setInputFile(undefined);
        setErrors({} as IErrors);
        props.getData();
    }

    const translate = (msg: string) => {
        if (msg == 'Upload a valid image. The file you uploaded was either not an image or a corrupted image.') {
            return 'Prześlij odpowiedni obraz. Plik który wysyłasz jest błędny lub nie jest obrazem.'
        } else if (msg == 'This field may not be blank.'){
            return 'To pole nie może być puste'
        }
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
            const what = err.request.response.split('"')[1]
            const msg = err.request.response.split('"')[3]
            const plMsg = translate(msg);
            if (what == 'title') {setErrors({ title: plMsg })}
            else if (what == 'cover'){setErrors({ file: plMsg })}
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
                <div className='mb-5'>
                    <div className="">Tytuł:
                        <input type="text" className="mx-5" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></input>
                    </div>
                    <span className="err">{errors.title ? <div>{errors.title}</div> : null}</span>
                </div>

                <div className="mb-5">Autor:
                    <input type="text" className="mx-5" value={inputAuthor} onChange={(e) => setInputAuthor(e.target.value)}></input></div>

                <div>Okładka:</div>
                <div className="my-1"><input type="file" onChange={handleChangeFile}></input>
                <span className="err">{errors.file ? <div>{errors.file}</div> : null}</span>

                </div>
            </Modal.Body>

            <Modal.Footer>
                {/* <div className="error">{errors ? errors : ""}</div> */}
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