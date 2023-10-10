
"use client"
import react from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import ShowAllbooks from './allbooksPage/page';
export default function Home() {

  
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        let temp = Object.entries(response.data.message);
        setBooks(temp)
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  },[]);

  const handleSearch = async(e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5555/books/search?query=${searchTerm}`)
      .then((response) => {
        // console.log('hello worleb')
        // console.log(response.status)
        // console.log(response.data)
        let temp = Object.entries(response.data);
        console.log(temp);
        setBooks(temp)
        // console.log(books.length)
      })
      .catch((error) => {
        // console.log('search error')
        console.log(error);
        
      });
 }
 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-6xl font-bold text-blue-900'>
        BOOK STORE</h1>
      <div className='w-6/12'>
        
        <form
        className='flex flex-row justify-evenly'
        onSubmit={handleSearch}
        >
          <input
            className='m-4 p-4 sm:w-full border border-slate-600 rounded-md text-center '
            type="text"

            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      
          <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 px-4 rounded'
           type="submit">Search</button>
          
          
        </form> 
      </div>
      
        <br/>
        <ShowAllbooks books={books}/>
    </main>
  )
}

