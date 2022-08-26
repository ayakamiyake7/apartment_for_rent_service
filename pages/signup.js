import { Box, Heading, HStack, Input, Stack } from "@chakra-ui/react";

export default function Signup() {
  return (
    <Stack
      maxW="container.lg"
      my="6"
      boxShadow="base"
      rounded="lg"
      w={{ md: 1000, sm: "100%" }}
      m="auto"
    >
      <Box>
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
      </Box>

      <Box>
        <p>Already have an account?</p>
        <a href="login">LOGIN</a>
      </Box>
    </Stack>
  );
}
