import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header/header';
import Search from './search/search';
import './main.css'
import './book.css'

const Main = () => {

    interface IData {
        id: number;
        title: string;
        img: boolean;
        cover: File;
        author: string;
    }

    const [data, setData] = useState<IData[]>([])
    const [inputValue, setInputValue] = useState<string>("")


    const getData = async(params:any) =>{
        
        const response = await axios.get('http://127.0.0.1:8000/book', {params})
        setData(response.data)
    }

    return (
        <div className='app-container'>
            {/*// header component*/}
            <Header data={data} setData={setData} getData={getData} />

            {/*// serach component*/}
            <Search
                inputValue={inputValue}
                setInputValue={setInputValue}
                setData={setData}
                data={data}
                getData={getData}
            />

            {/*// content component*/}

            <div className="books-container">
                {data.map(el =>
                    <div className='book-container'>
                        <div className="book-container-inner">
                            <div>
                                {/* <img src={el.img ? `http://127.0.0.1:8000/media/${el.id}.jpg` : `http://127.0.0.1:8000/media/none.jpg`} width="250" /> */}
                                <img src={el.cover ? `${el.cover}` : `http://127.0.0.1:8000/media/none.jpg`} width="250" height="250"/>
                            </div>
                            <div><span className='title'>Tytuł: </span>{el.title}</div>
                            <div><span className='title'>Autor: </span>{el.author}</div>
                            <div className='borrow-btn'>Wypożycz</div>
                            <div className='options-btn'>Opcje</div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Main;