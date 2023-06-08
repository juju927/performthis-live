import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MusicalNoteIcon } from '@heroicons/react/24/outline'

import { fetchData } from '../../helpers/common'
import UserContext from "../context/user"


export default function SongRequestModal(props) {
  const userDetails = useContext(UserContext)
  const [requester, setRequester] = useState('')
  const [shoutout, setShoutout] = useState('')
  const [requesterSO, setRequesterSO] = useState('')
  
  const requestSong = async() => {
    if (requester == '') {
      if (shoutout == '') {
        setRequesterSO('')
      } else {
        setRequesterSO('Anonymous - ' + shoutout)
      }
    } else {
      setRequesterSO(requester + ' - ' + shoutout)
    }

    const {ok, data} = await fetchData('song-queues/session/', undefined, "POST", {
      // this needs to be changed to performer id eventually
      "performer_id": "ba18b96e-7504-44dd-919f-37cbe001413a",
      "song_id": props.song_id,
      "requester_so": requesterSO
    })

    if (ok) {
      setRequester('')
      setShoutout('')
      props.setShowSongRequestModal(false)
    } else {
      console.log(data)
    }
  }

  return (
    <Transition.Root show={props.showSongRequestModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>props.setShowSongRequestModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-base-200 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <MusicalNoteIcon className="h-6 w-6 text-secondary-content" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base-content font-semibold leading-6">
                      Song Request for:
                    </Dialog.Title>
                    <div className="">

                      <div className="mb-6">
                        {props.title} by {props.artist}
                      </div>

                      <p className="text-sm text-base-content mb-3">
                        Include a shoutout?
                      </p>

                      <div className="mb-6">
                        <label className="block text-sm font-bold mb-2 text-left" htmlFor="requester">
                          Requester Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          value={requester}
                          id="requester"
                          type="text"
                          placeholder="Name"
                          onChange={(e) => setRequester(e.target.value)}
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-bold mb-2 text-left" htmlFor="shoutout">
                          Message
                        </label>
                        <input
                          className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          value={shoutout}
                          id="shoutout"
                          type="text"
                          placeholder="Message"
                          onChange={(e) => setShoutout(e.target.value)}
                        />
                      </div>



                      
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={requestSong}
                  >
                    Send Request
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}