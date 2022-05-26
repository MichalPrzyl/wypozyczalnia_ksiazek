import React, { useState, useEffect } from 'react';
import '../header/header.css'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ModalFooter from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { IData } from '../Main';

import { shortenString } from '../helpers';


const ModalDetails = (props: any) => {
    const { show, setShow, selectedBookId } = props;

    const [bookData, setBookData] = useState<IData>();

    const getBookData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/book/${props.selectedBookId}/`)
        setBookData(response.data.data)
    }
    useEffect(() => {
        if (show) {
            getBookData();
            console.log("useeffect")
        }
    }, [show])

    const closeModal = () => {
        setShow(false);
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
                    Szczegóły
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    {/* <div className='detail-record'><div className='detail-label'>label</div><div className='detail-value'>wartosc</div></div> */}
                    <div className='detail-record'><div className='detail-label'>Id: </div><div className='detail-value'>{selectedBookId}</div></div>
                    <div className='detail-record'><div className='detail-label'>Tytuł: </div><div className='detail-value'>{shortenString(bookData?.title)}</div></div>
                    <div className='detail-record'><div className='detail-label'>Autor: </div><div className='detail-value'>{bookData?.author}</div></div>
                    <div className='detail-record'><div className='detail-label'>Dostępny: </div><div className='detail-value'>{bookData?.is_available ? 'tak' : 'nie'}</div></div>
                    {!bookData?.is_available ?<div className='detail-record'><div className='detail-label'>Wypożyczony przez:</div><div className='detail-value'>{bookData?.borrowed_to}</div></div>: null}

                    {/* <div className='detai-label'>Id: <span className='detail-value'>{selectedBookId}</span></div>
                    <div className='detai-label'>Tytuł: <span className='detail-value'>{bookData?.title}</span></div>
                    <div className='detai-label'>Autor: <span className='detail-value'>{bookData?.author}</span></div>
                    <div className='detai-label'>Dostępny: <span className='detail-value'>{bookData?.is_available ? 'tak' : 'nie'}</span></div>
                    {!bookData?.is_available ? <div className='detai-label'>Wypożyczony przez: <span className='detail-value'>{bookData?.borrowed_to}</span></div> : null} */}
                </>
            </Modal.Body>

            <Modal.Footer>
                {/* <div className="error">{errors ? errors : ""}</div> */}
                <Button variant="secondary" onClick={() => { closeModal(); }} >
                    Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ModalDetails;