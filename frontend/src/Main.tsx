import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from './header/header';
import Search from './search/search';
import './main.css'
import './book.css'
import ModalBorrow from './components/modal-borrow';
import ModalDetails from './components/modal-details';
import { shortenString } from './helpers';


export interface IData {
    id: number;
    title: string;
    // img: boolean;
    cover: File;
    author: string;
    is_available: boolean;
    borrowed_to: string;
}

const Main = () => {
    
    const [data, setData] = useState<IData[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [ showBorrow, setShowBorrow ] = useState(false);
    const [ showDetailsModal, setShowDetailsModal ] = useState(false);
    const [ selectedBookId, setSelectedBookId ] = useState<number>();
    const [ params, setParams ] = useState()

    const getData = async (params: any = {}) => {
        const response = await axios.get('http://127.0.0.1:8000/book', { params })
        setData(response.data)
    }

    const handleDelete = async (id: number) => {
        const { value: wantToDelete } = await Swal.fire({
            title: 'Czy na pewno?',
            text: 'Czy na pewno chcesz usunać książkę?',
            icon: 'question',
            confirmButtonText: 'Tak',
            showCancelButton: true,
            cancelButtonText: 'Nie'
        })
        if (wantToDelete) {
            await axios.delete(`http://127.0.0.1:8000/book/${id}/`)
            getData();
        }
    }

    const handleReturn = async (id: number) => {
        const { value: wantToDelete } = await Swal.fire({
            title: 'Czy na pewno?',
            text: 'Czy na pewno chcesz oddać książkę?',
            icon: 'question',
            confirmButtonText: 'Tak',
            showCancelButton: true,
            cancelButtonText: 'Nie'
        })
        if (wantToDelete) {
            const sendState = {
                borrowed_to: '',
                is_available: true
            }
            await axios.patch(`http://127.0.0.1:8000/book/${id}/`, sendState)
            getData(params);
        }
    }

    const handleBorrow = async (id:number) => {
        setShowBorrow(true);
        setSelectedBookId(id);
    }

    const handleDetails = async (id:number) => {
        setShowDetailsModal(true);
        setSelectedBookId(id);
    }

    return (
        <div className='app-container'>
            {/*// header component*/}
            <Header setData={setData} getData={getData} />

            {/*// serach component*/}
            <Search
                inputValue={inputValue}
                setInputValue={setInputValue}
                setData={setData}
                data={data}
                getData={getData}
                params={params} 
                setParams={setParams}
            />

            {/*// content component*/}

            <div className="books-container">
                {data.map(el =>
                    <div key={el.id} className='book-container'>
                        <div className="book-container-inner">
                            <div>
                                {/* <img src={el.img ? `http://127.0.0.1:8000/media/${el.id}.jpg` : `http://127.0.0.1:8000/media/none.jpg`} width="250" /> */}
                                <img src={el.cover ? `${el.cover}` : `http://127.0.0.1:8000/media/none.jpg`} width="250" height="250" />
                            </div>
                            <div><span className='title'>Tytuł: </span>{shortenString(el.title)}</div>
                            <div><span className='title'>Autor: </span>{el.author}</div>
                            {el.is_available ? (
                                <div className={`borrow-btn`} onClick={e => handleBorrow(el.id)}>Wypożycz</div>
                            ) : (
                                <div className={`borrow-btn give-back-btn`} onClick={e => handleReturn(el.id)}>Oddaj</div>
                            )}
                            <div className='b-btns-container'>
                                <div className='delete-btn' onClick={e => handleDelete(el.id)}>Usuń</div>
                                <div className='options-btn' onClick={e => handleDetails(el.id)}>Szczegóły</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
                <ModalBorrow show={showBorrow} setShow={setShowBorrow} selectedBookId={selectedBookId} getData={getData} params={params} />
                <ModalDetails 
                    show={showDetailsModal} 
                    setShow={setShowDetailsModal}
                    selectedBookId={selectedBookId} 
                    // selectedBook={data.find((el:any)=>el.id=selectedBookId)}
            />
        </div>
    )
}

export default Main;