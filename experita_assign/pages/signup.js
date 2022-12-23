import { useState } from "react";
import Router from 'next/router'


export default function Signup() {
    const [data, setData] = useState({email: '', username: '', password: '', confirmPassword: ''});

    const handleChange = (e) => {
        const { name, value} = e.target;
        console.log(value);
        setData({...data, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data, 'data');
        if(data.password!==data.confirmPassword) {
            alert("password is incorrect")
        }
        else {
            fetch('http://localhost:8080/users/signup', {
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
                    Router.push('/')
                }
                else if(res.message=='User already registered') {
                    alert(res.message);
                }
            })
        }

    }
    return (
        <>
         <div>signup
            <form onSubmit={handleSubmit}>
                <input type={"email"} name='email' placeholder="enter your email" onChange={handleChange} required/><br/>
                <input type={"text"} name='username' placeholder="enter your user name" onChange={handleChange} required/><br/>
                <input type={"pasword"} name='password' placeholder="enter your password" onChange={handleChange} required/><br/>
                <input type={"pasword"} name='confirmPassword' placeholder="cofirm your password" onChange={handleChange} required/><br/>
                <button style={{border: '1px solid blue'}}>Register</button>
            </form>
         </div>
        </>
    )
}