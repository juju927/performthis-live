import React, { useEffect, useState, useContext } from 'react'
import { fetchData } from '../../helpers/common'
import SongItem from '../components/SongItem'
import pfp from '../images/pfp.jpg'

import UserContext from "../context/user"

const SongLibraryPage = () => {
  const userDetails = useContext(UserContext)
  const [songs, setSongs] = useState([])

  const getSongs = async () => {
    console.log(userDetails.toucan)
    const {ok, data} = await fetchData('user-songs/user/', userDetails.toucan, "GET")

    if (ok) {
      setSongs(data)
    } else {
      console.log(data)
    }
  }
  
  useEffect(()=> {
    getSongs()
  }, [])

  return (
    <div className="flex pt-5">

      {/* artist display  */}
      <div className='hidden md:flex'>
        <div className="pt-5 p-3 w-48 flex flex-col items-center ">
          <div className="avatar">
            <div className="w-24 mb-1 rounded-full ring ring-secondary ring-2 ring-offset-base-100 ring-offset-4">
              <img src={pfp} />
            </div>
          </div>

          <div>
            <div className="pt-3 text-xs font-bold uppercase text-secondary tracking-wide">Artist</div>
            <div className="">name</div>
          </div>
        </div>
      </div>

      {/* main song list */}
      <div className='flex-grow overflow-y-auto p-3'>
        {/* top bar: now viewing */}
        <div className='w-100 px-3 py-1 mx-3 bg-neutral-focus rounded-md flex'>
          <div className='text-xs uppercase tracking-wide'>now viewing:</div>
          <div className='text-xs font-bold px-1'>Complete List</div>
        </div>

        {/* action bar */}
        <div className='w-100 h-8 px-3 flex gap-x-3 my-2'>

          {/* select options */}
          <div className=''>
            <input type="checkbox" className="checkbox checkbox-secondary" />
          </div>

          {/* sort function */}
          <div className='w-auto rounded-md'>
            <select className='' name='sortBy'>
              <option value='' selected="selected">Sort by:</option>
              <option value='artist'>Artist</option>
              <option value='title'>Title</option>
            </select>
            
          </div>

          {/* search bar */}
          <div className='flex outline outline-accent outline-1 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input className='mx-3 flex-grow outline-none rounded-md' />       
          </div>

          {/* delete */}
          <div className='rounded-md btn btn-ghost'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

          </div>

          {/* add */}
          <div className='rounded-md btn btn-ghost'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>

        </div>

        {/* song list */}
        {songs.map((song, idx)=> (
          <SongItem id={song.id} key={idx} artist={song.artist} title={song.title} />
        ))}
      </div>

      <div>

      </div>
        

    </div>
  )
}

export default SongLibraryPage