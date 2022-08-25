import { Container, Heading, Input } from "@chakra-ui/react";

export default function Signup() {
  return (
    <Container maxW="container.lg" my="6">
      <Heading as="h1" size="xl">
        Create a new account.
      </Heading>
      <Heading as="h2" size="lg">
        Email
      </Heading>
      <Input type="email" placeholder="Enter your email address" />
      <Heading as="h2" size="lg">
        Password
      </Heading>
      <input type="password" placeholder="Enter your password" />
      <button>SIGN UP</button>

      <p>OR</p>
      <button>Continue with Google</button>

      <p>Already have an account?</p>
      <a href="login">LOGIN</a>
    </Container>
  );
}
