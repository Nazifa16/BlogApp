import React from "react";
import Header from "../../components/Header";
import {
  Box,
  Text,
  Button,
  Image,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../constant/router";
import { useTitle } from "../../hooks/useTitle";

function Home() {
  const navigate = useNavigate();
  useTitle("Home | Blog App");

  const columns = useBreakpointValue({ base: 1, sm: 2 });

  return (
    <div>
      <Header />
      <SimpleGrid
        bg="gray.50"
        columns={{ base: 1, sm: columns }}
        spacing="30"
        p={{ base: 5, md: 10 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap={{ base: 4, md: 8 }}
        >
          <Text
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            color="black"
          >
            Welcome to Articles Devil
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }} color="black">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam quos
            maiores eos impedit praesentium fuga quasi libero ducimus repellat
            doloremque earum rerum, ullam tempora exercitationem a ad, voluptas,
            rem tenetur.
          </Text>
          <Button
            size="lg"
            colorScheme="teal"
            alignSelf="flex-start"
            onClick={() => navigate(ROUTER.ARTICLE_CREATE)}
          >
            Get started
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image src="https://cdni.iconscout.com/illustration/premium/thumb/blog-writer-working-on-article-5691583-4759515.png" />
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default Home;
