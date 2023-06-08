import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../helpers/common'
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
      <div className="w-100 m-6 p-3 rounded-md bg-base-100 text-center text-base-content">
        <p>You are currently <span className="text-bold" >{live ? 'live' : 'offline'}</span><br />
        <i>Session started {moment(session.started_at).fromNow()}</i></p>
      </div>

      {/* the no time problem */}
      <div className='w-100 text-center'>
        <div className='btn' onClick={checkOnline}>check online</div>
        <div className='btn' onClick={getSongQueue}>refresh song queue</div>
      </div>
      
      {/* queue list */}
      {songQueue.map((song, idx) => (
        <SongQueueItem id={song.id} key={`songQ ${idx}`} song={song} />
      ))}
    </>
  )
}

export default LivePage