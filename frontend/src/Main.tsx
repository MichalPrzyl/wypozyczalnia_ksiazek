import React, { useState, useEffect } from 'react';
import Header from './header/header';
import Search from './search/search';
import './main.css'
import './book.css'

const Main = () => {

    interface IData {
        id: number;
        title: string;
        img: boolean
    }

    const [data, setData] = useState<IData[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    return (
        <div className='app-container'>
            {/*// header component*/}
            <Header />

            {/*// serach component*/}
            <Search
                inputValue={inputValue}
                setInputValue={setInputValue}
                setData={setData}
                data={data}
            />

            {/*// content component*/}

            <div className="books-container">
                {data.map(el =>
                    <div className='book-container'>
                        <div>{el.title}</div>
                        <div>
                            <img src={el.img ? `http://127.0.0.1:8000/media/${el.id}.jpg` : `http://127.0.0.1:8000/media/none.jpg`} width="250" />
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Main;