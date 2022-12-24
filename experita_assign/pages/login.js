import { useState } from "react";
import Router from 'next/router'
import { setCookie } from "cookies-next";
import Link from 'next/link'


export default function Login() {
    const [data, setData] = useState({username: '', password: ''});

    // Storing the data on every input change
    const handleChange = (e) => {
        const { name, value} = e.target;
        setData({...data, [name]: value});
    }

    // Submitting the form data
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://good-puce-moose-toga.cyclic.app/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {

          // Login successfully
          if(res.success) {
              alert(res.message);
              setCookie("expertia_auth_token", res.token)
              Router.push('/')
          }

          // if the credentials are wrong
          else if(res.message=='Invalid Credentials') {
              alert(res.message);
          }
        })
        .catch(() => {
          alert("Internal Server Error")
        })
    }
    return (
        <>
    <div className='flex p-[5%] justify-center items-center'>

      {/* login form  */}
      <div className='sm:min-w-[350px] md:min-w-[505px]  shadow-2xl border  p-[35px]  rounded-[10px]  flex-col box-border'>

        {/* Heading */}
        <h1 className='text-black font-[Poppins] text-[25px] font-light'>Welcome !</h1>

        {/* sub heading */}
        <div className='flex-col items-start my-[29px]'>
          <p className='font-[Poppins] text-[31px] font-medium leading-[46px]'>Sign in to</p>
          <p className=' text-[16px] font-[Poppins] font-normal leading-[24px] m-[0 0 48px 0]'>Expertia Todo Store</p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>

          {/* username input field */}
          <label className='font-[Poppins] font-normal text-[16px] leading-[32px] text-black'>User name</label>
          <input className='border-solid border-[0.6px] border-black rounded-[6px] p-[1rem] w-full mb-[38px]' type='text' name="username" placeholder='Enter your user name' onChange={handleChange} required />

          {/* password input field */}
          <label className='font-[Poppins] font-normal text-[16px] leading-[32px] text-black'>Password</label>
          <input className='border-solid border-[0.6px] border-black rounded-[6px] p-[1rem] w-full mb-[21px]' type='password' name='password' placeholder='Enter your Password' onChange={handleChange} required/>

          <div className='flex justify-between '>
            <div className='mb-[38px]'>
              <input type='checkbox' className='mr-[5px]' />
              <span className='text-[12px] font-light leading-[18px] font-[Poppins] text-black'>Remember me</span>
            </div>
            <p className='text-[12px] font-light leading-[18px] font-[Poppins] text-[#4D4D4D]'>Forget Password ?</p>
          </div>

          {/* login button */}
          <button className='w-full bg-black p-[1rem] text-white rounded-[6px] font-[Poppins] font-medium text-[16px] mb-[72px]'>Login</button>

          {/* registration link */}
          <p className='text-center font-light text-[16px] font-[Poppins] leading-[24px] text-[#7D7D7D]'>Don't have an Account ? <Link className="text-black font-bold" href='/signup'>Register</Link> </p>
        </form>
      </div>
      <div className='lg:flex hidden w-[fit-content] h-[701px] flex content-center items-center'>
        <img src='/discuss.svg' className='W-[100%] h-[100%]' alt='logo' />
      </div>
    </div>
        </>
    )
}