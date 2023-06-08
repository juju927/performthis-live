import React, { useEffect, useState, useContext } from 'react'
import { fetchData } from '../../helpers/common'
import { SparklesIcon, PlayIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline'

import UserContext from "../context/user"

const SongQueueItem = (props) => {
  const userDetails = useContext(UserContext)
  const [shoutouts, setShoutouts] = useState([])
  const [active, setActive] = useState(false)

  const parseShoutouts = () => {
    var shoutouts = props.song.requester_so.split(",,,")
    shoutouts = shoutouts.slice(1, shoutouts.length)
    setShoutouts(shoutouts)
  }
  
  const removeFromQueue = async () => {
    const { ok, data } = await fetchData('/song-queues/session/', userDetails.toucan, "DELETE", {
      "song_queue_id": props.song.id
    })

    if (ok) {
      props.getSongQueue()
    } else {
      console.log(data)
    }
  }

  const markAsComplete = async () => {
    const { ok, data } = await fetchData('/song-queues/session/', userDetails.toucan, "PATCH", {
      "song_queue_id": props.song.id
    })

    if (ok) {
      props.getSongQueue()
    } else {
      console.log(data)
    }
  }

  useEffect(()=> {
    parseShoutouts()
  }, [])

  return (
    <div className={`w-100 h-auto flex m-3 rounded-md bg-base-300 gap-x-3 px-3 py-2 ${active && 'outline-4 outline-info outline-double'}`}>

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

      { !active && (
        <>
          {/* play button */}
          <div className='flex-none w-fit btn btn-ghost' onClick={()=> setActive(true)}>
            <PlayIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
          </div>

          {/* delete button */}
          <div className='flex-none w-fit btn btn-ghost' onClick={removeFromQueue}>
            <TrashIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
          </div>
        </>
      ) }

      { active && (
        <>
          {/* done button */}
          <div className='flex-none w-fit btn btn-ghost' onClick={markAsComplete}>
            <CheckIcon className="h-6 w-6 text-base-content" aria-hidden="true" />
          </div>
        </>
      )}

    </div>
  )
}

export default SongQueueItem