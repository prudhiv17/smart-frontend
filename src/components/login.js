import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from './Components';
import axios from 'axios';

function LoginSignUp() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState('');
  const [blink, setBlink] = useState(false);
  const [signIn, toggle] = useState(true);
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (!email.value || !password.value) {
      setError('Both fields are required.');
      setBlink(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email.value,
        password: password.value,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/home');
    } catch (error) {
      console.error("Error signing in", error);
      setError('Sign in failed. Check your credentials.');
      setBlink(true);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target.elements;

    if (!name.value || !email.value || !password.value) {
      setError('All fields are required.');
      setBlink(true);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/signup', {
        name: name.value,
        email: email.value,
        password: password.value,
      });
      navigate('/login'); 
    } catch (error) {
      console.error("Error signing up", error);
      setError('Sign up failed. Try again.');
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type='text' name="name" placeholder='Name' required />
          <Components.Input type='email' name="email" placeholder='Email' required />
          <Components.Input type='password' name="password" placeholder='Password' required />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type='email' name="email" placeholder='Email' required />
          <Components.Input type='password' name="password" placeholder='Password' required />
          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome to Precision Agriculture !</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Join the Future of Farming!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default LoginSignUp;
