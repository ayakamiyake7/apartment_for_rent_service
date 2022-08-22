export default function Signup() {
  return (
    <>
      <p>Create a new account.</p>
      <h2>Email address</h2>
      <input type="email" placeholder="Enter your email address" />
      <h2>Password</h2>
      <input type="password" placeholder="Enter your password" />
      <button>Sign up</button>

      <p>OR</p>
      <button>Continue with Google</button>
    </>
  );
}
