import React from 'react';
import Header from './header/header';
import Search from './search/search';
import './main.css'

const Main = () =>{
    return (
    <div className='app-container'>
       {/*// header component*/} 
        <Header />

       {/*// serach component*/} 
       <Search />

       {/*// content component*/} 

    </div>
    )
}

export default Main;