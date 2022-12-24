import Head from 'next/head'
import { getCookie, deleteCookie } from 'cookies-next';
import  Router  from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState({username: ''});
  // const ref = useRef();


  const isUser = () => {
    const token = getCookie('expertia_auth_token');
    fetch(`http://localhost:8080/users/getUsers/${token}`)
    .then((res) => res.json())
    .then((res) => {
      setUserDetails(res.data);
      if(res.success === false) {
        Router.push('/signup')
      }
      else {
        localStorage.setItem("id", res.data._id);
        getData();
      }
    })
    .catch(() => {
      Router.push('/signup');
    })
  }
  useEffect(() => {
    isUser();
  },[])

  const handleAddTask = () => {
    let id = localStorage.getItem("id");
    let Body = {
      taskName: value,
      userId: id
    }
    fetch(`http://localhost:8080/tasks/add`, {
      method: 'POST',
      body: JSON.stringify(Body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.success) {
        setValue('');
        getData();
      }
      if(res.message === 'Daily limit exceeded') {
        alert(res.message);
      }
    })
  }


  // Storing value of task on every input change
  const handleChange = (e) => {
    setValue(e.target.value);
  }


  const getData = () => {
    let id = localStorage.getItem("id");
      fetch(`http://localhost:8080/tasks/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);

      })
  }

  const handleLogout = () => {
    console.log('logout');
    deleteCookie('expertia_auth_token');
    Router.push('/signup')
  }
  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <div className='flex p-[5%] justify-center items-center'>

      {/* login form  */}
      <div className='sm:min-w-[350px] md:min-w-[505px]  shadow-2xl border  p-[35px]  rounded-[10px]  flex-col box-border'>

        {/* Heading */}
        <h1 className='text-black font-[Poppins] text-[25px] font-light'>Hello</h1>

        {/* sub heading */}
        <div className='flex-col items-start '>
          <p className='font-[Poppins] text-[31px] mb-[30px] font-medium leading-[46px]'>{userDetails?.username}</p>
          <p className=' text-[16px] font-[Poppins] font-normal leading-[24px] mb-[48px]'>Good to see you here</p>
        </div>

        <h5 className='font-bold mb-[30px]'>Task for {new Date(Date.now()).toString().split(' ').slice(0, 4).join(' ')}</h5>

        <div className=' mb-[70px]'>
          {
            data.map((el) => (
              <p>• {el.taskName}</p>
            ))
          }
        </div>

        <div>
          <input className='border-solid border-[0.6px] border-black rounded-[6px] p-[1rem] w-full mb-[21px]' type='text'  placeholder='Eg: Nedd to finish my assignment...' value={value} onChange={handleChange} required/>

          {/* login button */}
          <button className='w-full bg-black p-[1rem] text-white rounded-[6px] font-[Poppins] font-medium text-[16px] mb-[20px]' onClick={handleAddTask}>Add New Task</button>

          <button className="block m-[auto] text-black font-bold text-[14px]" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
    </>
  )
}


// export const getServerSideProps = async ({ req, res }) => {
//   const token = getCookie('expertia_auth_token', { req, res });
//   let result = fetch(`http://localhost:8080/users/getUsers/${token}`)
//   .then((resp) => resp.json())

//   return { props: result };
// };
