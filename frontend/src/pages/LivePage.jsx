import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../helpers/common'
import { MegaphoneIcon, StopCircleIcon } from '@heroicons/react/24/outline'
import jwt_decode from 'jwt-decode'
import moment from 'moment'

import UserContext from "../context/user"
import SongQueueItem from '../components/SongQueueItem'

const LivePage = () => {
  const userDetails = useContext(UserContext)
  const [live, setLive] = useState(false)
  const [session, setSession] = useState({})
  const [songQueue, setSongQueue] = useState([])

  const checkOnline = async () => {
    const { ok, data } = await fetchData('/live-sessions/session/', undefined, "POST", {
      'performer_id': jwt_decode(userDetails.toucan).id
      // 'performer_id': 'de6c2823-485c-4833-9355-fb6024b256a6'
    })

    if (ok) {
      if (Object.keys(data).length == 0) {
        setLive(false);
        setSession(data)
      } else {
        setLive(true);
        setSession(data)
      }
    } else {
      console.log(data)
    }
  }

  const getSongQueue = async () => {
    const { ok, data } = await fetchData('/song-queues/session/', undefined, "POST", {
      'live_session_id': session.id
    })

    if (ok) {
      setSongQueue(data)
    } else {
      console.log(data)
    }
  }

  const endCurrentSession = async () => {
    const { ok, data } = await fetchData('/live-sessions/session/', userDetails.toucan, "PATCH", {
      'session_id': session.id
    })

    if (ok) {
      setSession({})
      setLive(false)
      setSongQueue([])
    } else {
      console.log(data)
    }
  }

  const deleteCurrentSession = async () => {
    const { ok, data } = await fetchData('/live-sessions/session/', userDetails.toucan, "DELETE", {
      'session_id': session.id
    })

    if (ok) {
      setSession({})
      setLive(false)
      setSongQueue([])
    } else {
      console.log(data)
    }
  }

  const startNewSession = async () => {
    const { ok, data } = await fetchData('/live-sessions/', userDetails.toucan, "POST")
    
    if (ok) {
      setSession(data.data)
    } else {
      console.log(data)
    }
  }

  useEffect(()=> {
    checkOnline();
  }, [])

  useEffect(()=> {
    if (Object.keys(session).length > 0) {
      getSongQueue()
    }
  }, [session])

  return (
    <>
      <div className="flex flex-col flex-gap-3 w-100 m-6 p-3 rounded-md bg-base-100 text-center text-base-content">
        <div className="">
          { live ? (
            <>
              <div className="text-center text-base-content text-xl">
                You are currently <br />
                <span className="font-bold uppercase tracking-wide"> ✨ taking requests ✨ </span>
              </div>
              <div className="text-center text-base-content text-xs italic">
                Session started {moment(session.started_at).fromNow()}
              </div>

            </>) : 
            (
            <>
              <div className="text-center text-base-content text-base">
                You are currently <br />
                <span className="font-bold uppercase tracking-wide"> 💤 NOT taking requests 💤 </span>
              </div>
            </>)}

        </div>
      </div>

      {/* the no time problem */}
      <div className='w-100 text-center'>
      { live ? (
        <>
          <div className='btn' onClick={endCurrentSession}>end current session</div>
          <div className='btn' onClick={deleteCurrentSession}>delete current session</div> 
        </>

        ): (
          <div className='btn' onClick={startNewSession}>start new session</div>
        )}
        <div className='btn' onClick={checkOnline}>check online</div>
        <div className='btn' onClick={getSongQueue}>refresh song queue</div>
      </div>
      
      {/* queue list */}
      <div className="w-100 mx-6 px-3 text-xl"> 
        Queue
      </div>
      { songQueue.length == 0 && (
        <div className="text-center m-6">Queue is empty!</div>
      ) }
      {songQueue.map((song, idx) => (
        !song.is_completed && <SongQueueItem id={song.id} key={`songQ ${idx}`} song={song} getSongQueue={getSongQueue} />
      ))}
    </>
  )
}

export default LivePage