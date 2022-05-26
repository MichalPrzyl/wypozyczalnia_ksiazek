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
    getData: Function;
    params?: string;
    setParams?: Function;
}

const Search = ({inputValue, setInputValue, setData, data, getData, setParams}:IProps) => {


    const handleClickSearch = () => {
        // console.log("Szukam...,")
    }

    const handleInputValueChange = (e:any) =>{
        setInputValue(e.target.value)
    }

    

    useEffect(()=>{
        const params = {
            search: inputValue
        }
        getData(params);
        if(setParams){
            setParams({search: inputValue})
        }
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
            </div>
        </div>
    )
}

export default Search;