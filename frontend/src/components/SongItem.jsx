import React, { useContext } from 'react'
import { fetchData } from '../../helpers/common'

import UserContext from "../context/user"

const SongItem = (props) => {
  const userDetails = useContext(UserContext)

  const deleteSong = async() => {
    const {ok, data} = await fetchData('user-songs/', userDetails.toucan, "DELETE", {
      "user_song_id": props.id
    })

    console.log(props.id)
    if (ok) {
      console.log("song deleted")
    } else {
      console.log(data)
    }
  }

  return (
    <div className='w-100 h-auto flex m-3 rounded-md bg-base-300 gap-x-3 px-3 py-2'>

      {/* <div className='m-auto flex-none w-5'>
        <input type="checkbox" className="checkbox checkbox-secondary" />
      </div> */}


      <div className='flex-1 mx-3'>
        <div className='text-xl font-bold text-base-content'>{props.title}</div>
        <div className='text-sm italic'>{props.artist}</div>
      </div>


      {/* <div className='flex-none w-fit btn btn-ghost' onClick={()=> console.log("kenna clik")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
        </svg>
      </div> */}

      <div className='flex-none w-fit btn btn-ghost' onClick={deleteSong}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>



    </div>
  )
}

export default SongItem