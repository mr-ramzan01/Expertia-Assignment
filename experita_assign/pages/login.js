import { useState } from "react";
import Router from 'next/router'
import { setCookie } from "cookies-next";


export default function Login() {
    const [data, setData] = useState({username: '', password: ''});

    const handleChange = (e) => {
        const { name, value} = e.target;
        console.log(value);
        setData({...data, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data, 'data');
        fetch('http://localhost:8080/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res, 'res');
            if(res.success) {
                alert(res.message);
                setCookie("expertia_auth_token", res.token)
                Router.push('/')
            }
            else if(res.message=='Invalid Credentials') {
                alert(res.message);
            }
        })
    }
    return (
        <>
         {/* <div>sign in
            <form onSubmit={handleSubmit}>
                <input type={"text"} name='username' placeholder="enter your user name" onChange={handleChange} required/><br/>
                <input type={"pasword"} name='password' placeholder="enter your password" onChange={handleChange} required/><br/>
                <button style={{border: '1px solid blue'}}>Login</button>
            </form>
         </div> */}
         <div className='flex w-full border-2 border-solid border-red-400 h-screen p-14 justify-center items-center'>

      {/* login form  */}
      <div className='sm:min-w-[450px] border border-solid border-black h-full min-w-[505px] h-[fit-content] rounded-[10px] py-[1rem] px-[3rem] flex-col box-border'>

        {/* Heading */}
        <h1 className='w-[132px] h-[38px] text-black font-[Poppins] text-[25px] font-light leading-[38px]'>Welcome !</h1>

        {/* sub heading */}
        <div className='flex-col items-start my-[29px]'>
          <p className='font-[Poppins] text-[31px] font-medium leading-[46px] w-[144px] h-[47px]'>Sign in to</p>
          <p className='w-[260px] h-[24px] text-[16px] font-[Poppins] font-normal leading-[24px] m-[0 0 48px 0]'>Lorem Ipsum is simply</p>
        </div>

        {/* form */}
        <div>

          {/* username input field */}
          <p className='font-[Poppins] font-normal text-[16px] leading-[32px] text-black'>User name</p>
          <input className='border-solid border-[0.6px] border-black rounded-[6px] p-[1rem] w-full mb-[38px]' type='text' placeholder='Enter your user name' />

          {/* password input field */}
          <p className='font-[Poppins] font-normal text-[16px] leading-[32px] text-black'>Password</p>
          <input className='border-solid border-[0.6px] border-black rounded-[6px] p-[1rem] w-full mb-[21px]' type='text' placeholder='Enter your Password' />

          <div className='flex justify-between '>
            <div className='mb-[38px]'>
              <input type='checkbox' className='mr-[5px]' />
              <span className='text-[12px] font-light leading-[18px] font-[Poppins] text-black'>Remember me</span>
            </div>
            <p className='text-[12px] font-light leading-[18px] font-[Poppins] text-[#4D4D4D]'>Forget Password ?</p>
          </div>

          {/* login button */}
          <button className='w-full bg-black p-[1rem] text-white rounded-[6px] font-[Poppins] font-medium text-[16px] mb-[72px]'>Login</button>

          <p className='text-center font-light text-[16px] font-[Poppins] leading-[24px] text-[#7D7D7D]'>Don't have an Account ? <span className='text-black font-bold'> Register</span> </p>
        </div>
      </div>
      <div className='lg:flex hidden  w-[fit-content] h-[701px] flex content-center items-center'>
        <img src='/discuss.svg' alt='logo' />
      </div>
    </div>
        </>
    )
}