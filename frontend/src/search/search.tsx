import React, { useEffect } from 'react';
import './search.css'
// @ts-ignore
import searchIcon from './lupa.png';
import axios from 'axios';
interface IProps{
    inputValue: string;
    setInputValue: any;
    setData: Function;
    data: any[];
}

const Search = ({inputValue, setInputValue, setData, data}:IProps) => {


    const handleClickSearch = () => {
        // console.log("Szukam...,")
    }

    const handleInputValueChange = (e:any) =>{
        setInputValue(e.target.value)
    }

    const getData = async() =>{
        const params = {
            search: inputValue
        }
        const response = await axios.get('http://127.0.0.1:8000/book', {params})
        setData(response.data)
    }

    useEffect(()=>{
        getData();
        console.log(data)
    }, [inputValue])

    return (
        <div className='search'>
            <div className='search-center'>
                <div className='search-input-wrapper'>
                    <div className='search-input-wrapper-input'>
                        <input onChange={handleInputValueChange} value={inputValue}></input>
                    </div>
                    <div className='search-input-wrapper-icon' onClick={handleClickSearch}><img src={searchIcon} /></div>
                </div>


                <div className='search-checkbox-wrapper'>
                    <div className='search-checkbox-wrapper-checkbox'>
                        <input type="checkbox"></input>
                    </div>
                    <div className='search-checkbox-wrapper-label'>Szukaj wśród niedostępnych</div>
                </div>
            </div>
        </div>
    )
}

export default Search;