import React, { useContext, useState } from 'react'
import { fetchData } from '../../helpers/common'
import { TrashIcon, SparklesIcon } from '@heroicons/react/24/outline'

import UserContext from "../context/user"
import SongRequestModal from './SongRequestModal'

const SongItem = (props) => {
  const userDetails = useContext(UserContext)
  const [showSongRequestModal, setShowSongRequestModal] = useState(false)


  const deleteSong = async() => {
    const {ok, data} = await fetchData('user-songs/', userDetails.toucan, "DELETE", {
      "song_id": props.id
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


      {/* request button */}
      <div className='flex-none w-fit btn btn-accent text-accent-content' onClick={()=> setShowSongRequestModal(true)}>
        Request
        <SparklesIcon className="h-6 w-6 text-accent-content" aria-hidden="true" />
      </div>

      {/* delete buttin */}
      <div className='flex-none w-fit btn btn-ghost' onClick={deleteSong}>
        <TrashIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
      </div>

      <SongRequestModal showSongRequestModal={showSongRequestModal} setShowSongRequestModal={setShowSongRequestModal} song_id={props.id} title={props.title} artist={props.artist} />

    </div>
  )
}

export default SongItem