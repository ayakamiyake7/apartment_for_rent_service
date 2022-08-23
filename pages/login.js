export default function Login() {
  return (
    <>
      <h1>LOGIN</h1>
      <h2>Email</h2>
      <input type="email" placeholder="Enter your email address" />
      <h2>Password</h2>
      <input type="password" placeholder="Enter your password" />
      <button>LOGIN</button>

      <p>OR</p>
      <button>Login with Google</button>

      <p>New Here?</p>
      <a href="signup">SIGN UP</a>
    </>
  );
}
