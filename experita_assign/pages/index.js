import Head from 'next/head'
import { getCookie } from 'cookies-next';
import  Router  from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard(props) {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if(props.success === false) {
      Router.push('/login')
    }
    else {
      localStorage.setItem("id", props.data._id);
      console.log("here")
      getData()
    }
  },[])

  const handleAddTask = () => {
    let id = localStorage.getItem("id");
    let Body = {
      name: ref.current.value,
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
      console.log(res, 'res');
      setData(res.data);
      setCount((prev) => prev+1);
    })
  }
  // useEffect(() => {
    // getData();
    // console.log("here2")
  // },[count])

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // }


  const getData = () => {
    let id = localStorage.getItem("id");
      fetch(`http://localhost:8080/tasks/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, 'res');
        setData(res.data);

      })
  }
  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
      <div >
          Main
          <div>
            <ul>
              {
                data && data.map((el) => (
                  <li key={Date.now()}>{el.name}</li>
                ))
              }
            </ul>
          </div>
          <input style={{border: '1px solid blue'}} ref={ref} placeholder='Eg: need to finish assignment'/>
          <button onClick={handleAddTask}>Add New Task</button>
      </div>
    </>
  )
}


export const getServerSideProps = async ({ req, res }) => {
  const token = getCookie('expertia_auth_token', { req, res });
  let result = fetch(`http://localhost:8080/users/getUsers/${token}`)
  .then((resp) => resp.json())

  return { props: result };
};
