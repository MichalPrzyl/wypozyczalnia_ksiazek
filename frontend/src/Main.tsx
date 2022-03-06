import React, { useState, useEffect } from 'react';
import Header from './header/header';
import Search from './search/search';
import './main.css'

const Main = () => {

    interface IData {
        id: number;
        title: string;
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

            <div>
                <ul>
                    {data.map(el => <li key={el.id}>{el.title}</li>)}
                </ul>
            </div>

        </div>
    )
}

export default Main;