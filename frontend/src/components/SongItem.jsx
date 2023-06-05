import React from 'react'

const SongItem = (props) => {
  return (
    <div className='w-full h-auto flex m-3 rounded-md bg-base-300 gap-x-3 px-3 py-2'>

      <div className='m-auto flex-none w-5'>
        <input type="checkbox" className="checkbox checkbox-secondary" />
      </div>


      <div className='flex-1 mx-3'>
        <div className='text-xl font-bold text-base-content'>{props.title}</div>
        <div className='text-sm italic'>{props.artist}</div>
      </div>


      <div className='flex-none w-fit cursor-pointer' onClick={()=> console.log("kenna clik")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
        </svg>
      </div>


    </div>
  )
}

export default SongItem