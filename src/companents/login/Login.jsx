import * as React from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';
import { observer } from "mobx-react";
import MyStore from '../../store/MyStore';
import Swal from 'sweetalert2';

const Login = (observer(() => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8787/login", {
      method: "POST",
      body: JSON.stringify({
        name, password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      MyStore.setIsLogin(true);
      Swal.fire({
        title: "hello to admin!!",
        text: "now you move to admin page",
        icon: "success",
      })
    }
    else if (response.status === 401) {
      Swal.fire({
        title: "error!!!",
        text: "the user & paswerd not valid",
        icon: "warning",
      })
      setName('')
      setPassword('')
    }
  }
  return (
    <>
      <form>
        <Stack spacing={2}>
          <Input placeholder="user" required type='string' value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="password" required type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>login</Button>
        </Stack>
      </form>
    </>
  );
}))

export default Login
