import React, { useEffect, useState } from 'react'
import { fetchData } from '../../helpers/common'
import SongItem from '../components/SongItem'
import ProfileCard from '../components/ProfileCard'

const SongLibraryPage = () => {
  const [songs, setSongs] = useState([])

  const getSongs = async () => {
    const {ok, data} = await fetchData('/songs/')

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
    <div className="w-full h-full text-primary flex">

      <div className='flex-grow overflow-y-auto'>
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