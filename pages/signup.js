import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Signup() {
  return (
    <Container
      h={600}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="row"
        spacing={8}
        maxW="container.lg"
        // minH="100%"
        h="100%"
        my="6"
        boxShadow="lg"
        rounded="lg"
        w={{ md: 1000, sm: "100%" }}
        m="auto"
        // position="absolute"
        // top="50%"
        // left="50%"
        // transform="translate(-50%, -50%)"
        // display="block"
      >
        <Box w={600} p={6}>
          <Heading as="h1" size="xl" mb={20} color="teal.400">
            Create a new account.
          </Heading>
          <Heading as="h2" size="md" mb={2} color="gray.500">
            Email
          </Heading>
          <Input type="email" placeholder="Enter your email address" mb={6} />
          <Heading as="h2" size="md" mb={2} color="gray.500">
            Password
          </Heading>
          <Input type="password" placeholder="Enter your password" mb={20} />
          <Button
            size="lg"
            w={200}
            border="1px solid white"
            borderRadius={20}
            bg={"teal.400"}
            colorScheme="teal"
            display="block"
            mx={"auto"}
          >
            SIGN UP
          </Button>
          <Text fontSize="lg" textAlign="center" color="gray.500" my={4}>
            or
          </Text>
          <Link display="block" textAlign="center" color="gray.500">
            Continue with Google
          </Link>
        </Box>

        <Box
          bg={"teal.400"}
          p={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Heading as="h2" size="lg" color="white" mb={14} textAlign="center">
            Already have an account?
          </Heading>
          <Button
            size="lg"
            w={200}
            border="1px solid white"
            borderRadius={20}
            bg={"teal.400"}
            colorScheme="teal"
            display="block"
            mx={"auto"}
          >
            <a href="login">LOGIN</a>
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
