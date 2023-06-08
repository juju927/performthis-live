import React, { useEffect, useState } from 'react'

import { SparklesIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/outline'

const SongQueueItem = (props) => {
  const [shoutouts, setShoutouts] = useState([])

  const parseShoutouts = () => {
    var shoutouts = props.song.requester_so.split(",,,")
    shoutouts = shoutouts.slice(1, shoutouts.length)
    setShoutouts(shoutouts)
  }
  
  useEffect(()=> {
    parseShoutouts()
  }, [])

  return (
    <div className='w-100 h-auto flex m-3 rounded-md bg-base-300 gap-x-3 px-3 py-2'>

      {/* <div className='m-auto flex-none w-5'>
        <input type="checkbox" className="checkbox checkbox-secondary" />
      </div> */}

      {/* request number */}
      <div className='flex flex-none w-fit text-accent'>
        <SparklesIcon className="h-6 w-6 text-accent" aria-hidden="true" /> {shoutouts.length}
      </div>

      <div className='flex-1 mx-3'>
        <div className='text-xl font-bold text-base-content'>{props.song.title}</div>
        <div className='text-sm italic text-base-content'>{props.song.artist}</div>
      </div>

      {/* play button */}
      <div className='flex-none w-fit btn btn-ghost' onClick={()=>console.log('select song')}>
        <PlayIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
      </div>

      {/* delete button */}
      <div className='flex-none w-fit btn btn-ghost' onClick={()=> console.log('delet')}>
        <TrashIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
      </div>

    </div>
  )
}

export default SongQueueItem