import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='relative bg-fuchsia-950 text-white'>
                <div className=" mx-auto flex py-1 justify-between  px-3">


                    <div className="logo text-lg text-white font-bold">
                        <span className='text-green-500'>&lt; </span> Pass<span className='text-green-500'>SG /&gt;</span></div>
                        <div className="github cursor-pointer">
                            <img width={90} className='md:{invert absolute top-[-1.6rem] right-0 p-0}' src="/github.webp" alt="" />
                        </div>
                                         {/* <ul>

                        <li className='list-none text-white flex gap-4 '>
                            <a className='hover:font-bold hover:underline' href="/">Home</a>
                            <a className='hover:font-bold hover:underline' href="/">about</a>
                            <a className='hover:font-bold hover:underline' href="/">contact</a>
                        </li>
                    </ul> */}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
