import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserRegister = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values.name, 'lol');
    // console.log(values.email)
    // console.log(values.password)
    
    axios.post('/register', {
      name: `${values.name}`,
      email: `${values.email}`,
      password: `${values.password}`
    })
    .then(function (response) {
      console.log(response);
      if (response.data === 'User already registered') {
        alert(response.data)
      } else {
        window.location.replace("http://localhost:3000/login");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <label>Name</label>
      <input
        name="name"
        ref={register({
          required: 'Required',
        })}
      />
      <label>Email</label>
      <input
        name="email"
        ref={register({
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
      />
      {errors.email && errors.email.message}

      <label>Password</label>
      <input
        name="password"
        ref={register({ required: "This is required." })}
      />
      {errors.password && errors.password.message}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserRegister;
