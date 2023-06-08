import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MusicalNoteIcon } from '@heroicons/react/24/outline'
import jwt_decode from 'jwt-decode'

import { fetchData } from '../../helpers/common'
import UserContext from "../context/user"


export default function AddSongModal(props) {
  const userDetails = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [title1, setTitle1] = useState('')
  const [title2, setTitle2] = useState('')
  const [artist, setArtist] = useState('')
  
  const addSong = async () => {
    const { ok, data } = await fetchData('user-songs/', userDetails.toucan, "POST", {
      "title": title,
      "artist": artist,
      "alt_title_1": title1,
      "alt_title_2": title2
    })

    if (ok) {
      setTitle('')
      setTitle1('')
      setTitle2('')
      setArtist('')
      props.setShowAddSongModal(false)
    } else {
      console.log(data)
    }
  }

  const handleClick = () => {
    console.log('a')
    
  }

  return (
    <Transition.Root show={props.showAddSongModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>props.setShowAddSongModal(false)}>
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
                      Add a New Song
                    </Dialog.Title>
                    <div className="mt-5">

                      <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="title">
                          Title
                        </label>
                        <input
                          className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          value={title}
                          id="title"
                          type="text"
                          placeholder="Song Title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="artist">
                          Artist
                        </label>
                        <input
                          className="shadow appearance-none border rounded bg-base-200 w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          value={artist}
                          id="artist"
                          type="text"
                          placeholder="Artist"
                          onChange={(e) => setArtist(e.target.value)}
                        />
                      </div>



                      <p className="text-sm text-base-content">
                        Please make sure that the information is keyed in accurately before you submit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={addSong}
                  >
                    Submit
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