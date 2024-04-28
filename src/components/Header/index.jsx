import { Badge, Box, Button, ButtonGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "../../constant/router";
import { useGlobalStore } from "../../store/global/GlobalProvider";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
  const navigate = useNavigate();

  const { state } = useGlobalStore();

  const { pathname } = useLocation(); //path
  const isActive = (p) => (pathname == p ? "orange" : "white"); //klikleyende rengi deyismek ucun

  const queryClient = useQueryClient();
  const articles = queryClient.getQueryData(["blogs"])?.data; //datani select edir
  console.log("articles", articles);

  const favCount = state.favorites?.length;
  return (
    <Box
      height="100px"
      padding="12px"
      backgroundColor="teal"
      justifyContent="space-between"
      display="flex"
    >
      <Text
        display="Flex"
        alignItems="Center"
        as="h1"
        fontSize="4xl"
        color="white"
      >
        Blog
      </Text>

      <Stack direction="row" spacing={4} align="center" as="ul">
        <Button
          colorScheme="teal"
          variant="ghost"
          color="white"
          onClick={() => navigate(ROUTER.HOME)}
          as="li"
          color={isActive(ROUTER.HOME)}
        >
          Home
        </Button>

        <Button
          colorScheme="teal"
          variant="ghost"
          color="white"
          onClick={() => navigate(ROUTER.ABOUT)}
          as="li"
          color={isActive(ROUTER.ABOUT)}
        >
          About
        </Button>

        <Button
          colorScheme="teal"
          variant="ghost"
          color="white"
          onClick={() => navigate(ROUTER.FAV)}
          as="li"
          color={isActive(ROUTER.FAV)}
        >
          Favorites
          {!!favCount && (
            <Badge variant="solid" colorScheme="green">
              {favCount}
            </Badge>
          )}
        </Button>
        <Button
          colorScheme="teal"
          variant="ghost"
          color="white"
          onClick={() => navigate(ROUTER.FAQ)}
          as="li"
          color={isActive(ROUTER.FAQ)}
        >
          FAQ
        </Button>

        <Button
          colorScheme="teal"
          variant="ghost"
          color="white"
          onClick={() => navigate(ROUTER.ARTICLES)}
          as="li"
          color={isActive(ROUTER.ARTICLES)}
        >
          Articles
          {!!articles?.length && (
            <Badge variant="solid" colorScheme="orange">
              {articles?.length}
            </Badge>
          )}
        </Button>
      </Stack>

      <ButtonGroup display="Flex" alignItems="Center">
        <Button onClick={() => navigate(ROUTER.ARTICLE_CREATE)} as="button">
          Create
        </Button>
        <Button onClick={() => navigate(ROUTER.SETTING)} as="button">
          Setting
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default Header;
