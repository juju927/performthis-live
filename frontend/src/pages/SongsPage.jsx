import React from 'react'
import SongItem from '../components/SongItem'

const SongLibraryPage = () => {
  const songs = [
    {"title": "last cup of coffee",
      "artist": "LilyPichu"},
    {"title": "From the Start",
      "artist": "Laufey"}
  ]

  return (
    <div className="w-full text-primary">
    {songs.map((song, idx)=> (
      <SongItem key={idx} artist={song.artist} title={song.title} />
    ))}
      

    </div>
  )
}

export default SongLibraryPage