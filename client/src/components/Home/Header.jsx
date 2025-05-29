import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='my-4 flex items-center justify-center flex-col'>
        <div className='text-4xl flex flex-col w-full items-start'>
            <h1 className='font-bold'>Hey I am The Coder ! </h1>
            <h2>Discoer new blogs of technology and trends.</h2>
        </div>

        <div className='my-8 flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='w-full md:w-1/2'>
                {/* <img src="./temp.jpg" alt="temp" className='rounded w-full h-[50vh] object-cover' /> */}
                <img src="./temp.jpg" alt="temp" className='rounded w-full h-[30vh] md:h-[40vh] lg:h-[50vh] object-cover' />
            </div>
            <div className='w-full md:w-1/2'>
                <h1 className='text-3xl font-bold'>Lorem Ipsum</h1>
                <p className='mt-2 mb-8'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum consequuntur eaque fuga nostrum maxime suscipit odio delectus reiciendis voluptates explicabo debitis facilis earum dolor, repellat ipsa est libero nisi eveniet.</p>
                <Link className='mt-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-4 py-2 rounded text-white'>Read Blog</Link>
            </div>
        </div>
    </div>
  )
}

export default Header