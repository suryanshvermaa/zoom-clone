import Image from 'next/image'
import React from 'react'

const Loader=()=> {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        <Image src='/icons/loading-circle.svg' alt='loader' height={50} width={50}/>
    </div>
  )
}

export default Loader