import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [dataArr, setdataArr] = useState([])
    const [data, setdata] = useState({})

    useEffect(() => {
        let data = localStorage.getItem("data");

        if (data) {
            setdataArr(JSON.parse(data))
        }
    }, [])


    const savepassword = () => {

        setdataArr([...dataArr, { ...form, id: uuidv4() }])
        localStorage.setItem("data", JSON.stringify([...dataArr, { ...form, id: uuidv4() }]));
        console.log([...dataArr, { ...form, id: uuidv4() }])
        setform({ site: "", username: "", password: "" })
        toast.success(`saved password`, {
            position: "top-right",
            autoClose: 3087,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    const deletePassword = (id) => {
        // console.log(id)
        let c = confirm("Do you want to delete this password ?!")

        if (c) {

            setdataArr(dataArr.filter(item => item.id !== id))
            localStorage.setItem("data", JSON.stringify(dataArr.filter(item => item.id !== id)));
        }
        toast.success(`password deleted,`, {
            position: "top-right",
            autoClose: 3087,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });


    }
    const editPassword = (id) => {
        setform(dataArr.filter(i => i.id === id)[0])
        // console.log(dataArr.filter(i=>i.id===id))
        setdataArr(dataArr.filter(item => item.id !== id))
    }

    const showPassword = () => {    
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            passref.current.type = "text"
            console.log(ref.current.src)
            if (ref.current.src.includes("/closedeye.png")) {
                ref.current.src = "/openeye.png"
                passref.current.type = "password"
            }
            else {
                ref.current.src = "/closedeye.png"
                passref.current.type = "text"
            }
        }


    }

    const copytext = (text) => {
        navigator.clipboard.writeText(text)
        toast.success(`Copied ${text}`, {
            position: "top-right",
            autoClose: 3087,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3087}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="text text-white text-sm  flex flex-col items-center md:p-4 p-9 gap-6 container2 ">
                <div className="logo text-2xl text-red-800 font-bold text-center font-bold">
                    <span className='text-green-500'>&lt; </span> Pass<span className='text-green-500'>SG /&gt;</span><br />
                    <span className='text-xs font-normal text-red-500'>Your own password manager</span>
                </div>
                <input value={form.site} onChange={handlechange} className='p-1 w-full border bg-gray-300 bg-opacity-10 py-2 px-4 border-green-500 rounded-full' placeholder='Enter website URL' type="text" name='site' />
                <div className="flex gap-5 w-full">
                    <input value={form.username} onChange={handlechange} className='p-1 border w-3/4 border-green-500 bg-gray-300 bg-opacity-10 py-2 px-4 rounded-full' placeholder='Enter Username' type="text" name='username' />
                    <div className="relative">

                        <input ref={passref} value={form.password} onChange={handlechange} className='p-1 border border-green-500 bg-gray-300 bg-opacity-10 py-2 px-4 rounded-full' placeholder='Enter Password' type="password" name='password' />
                        <span onClick={showPassword} className='absolute cursor-pointer right-0 top-0 mix-blend-screen p-3'>
                            <img ref={ref} width={25} className='invert' src="/openeye.png" alt="eye" />

                        </span>
                    </div>
                </div>
                <button onClick={savepassword} className=' text-black flex gap-2 border-[2px] border-purple-700 px-3 text-xs font-bold py-1 bg-green-400 w-fit items-center justify-center rounded-full text-md'>
                    <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover" >
                    </lord-icon>
                    save</button>

                <div className="flex w-[200px] md:w-[799px] md:px-[36px]  md:mx-0  flex-col items-center justify-center rounded-md">
                    <h1 className='font-bold text-xl px-2 py-5 text-center underline'>Your saved Passwords</h1>
                    {dataArr.length === 0 && <div>No Password exists</div>}
                    {dataArr.length !== 0 &&
                        <div className='md:w-[799px] w-[96vw]'>
                            <table className="table-auto  text-black overflow-hidden w-full rounded-lg bg-slate-500">
                                <thead className='bg-green-950 text-white w-full  md:w-[780px] '>
                                    <tr className=''>
                                        <th className='py-2 items-center text-start w-[35%] border-gray-600 border px-4'>Sitename</th>
                                        <th className='py-2 items-center text-start w-[35%] border-gray-600 border px-4'>Username</th>
                                        <th className='py-2 items-center text-start w-[20%] border-gray-600 border px-4'>Password</th>
                                        <th className='py-2 items-center text-start md:w-[90px] border-gray-600 border px-4'>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataArr.map((item, index) => {

                                        return < tr key={index}>
                                            <td>
                                                <div className='py-2 md:w-[277px] w-[30vw] flex justify-between px-4 border-gray-600 border-x'>
                                                    <div className='w-3/4 text-xs overflow-hidden text-ellipsis whitespace-nowrap'>

                                                        <a className='w-fit overflow-hidden' target='_blank' href={item.site}>{item.site}</a>
                                                    </div>

                                                    <div onClick={() => copytext(item.site)} className='cursor-pointer flex h-[18px] justify-between'><lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        style={{ "width": "23px", "height": "18px" }}
                                                        trigger="hover" colors="primary:#30e849">
                                                    </lord-icon></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='py-2  md:w-[277px] w-[30vw] text-xs flex justify-between px-4 border-gray-600 border-x'>
                                                    <div className='w-3/4 overflow-hidden text-ellipsis whitespace-nowrap'>

                                                        {item.username}
                                                    </div>
                                                    <div onClick={() => copytext(item.username)} className='cursor-pointer flex h-[18px] justify-between'><lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        style={{ "width": "23px", "height": "18px" }}
                                                        trigger="hover" colors="primary:#30e849">
                                                    </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='py-2 md:w-[157px]  flex justify-between px-4 border-gray-600 border-x'>
                                                    <div className='w-3/4 text-xs overflow-hidden text-ellipsis whitespace-nowrap'>

                                                        {"*".repeat(item.password.length)}
                                                    </div>
                                                    <div onClick={() => copytext(item.password)} className='cursor-pointer flex h-[18px] justify-between'><lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        style={{ "width": "23px", "height": "18px" }}
                                                        trigger="hover" colors="primary:#30e849">
                                                    </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='py-2 flex justify-between px-3 border-gray-600 border-x'>
                                                    <img onClick={() => { editPassword(item.id) }} src="/edit.svg" alt="" />
                                                    <span onClick={() => { deletePassword(item.id) }} className='items-center justify-center flex mx-3'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            colors="primary:#fff"
                                                            style={{ "width": "22px", "height": "22px" }}>
                                                        </lord-icon>
                                                    </span>

                                                </div>
                                            </td>

                                        </tr>
                                    })}


                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div >
        </>
    )
}

export default Manager
