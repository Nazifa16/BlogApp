import React from "react";
import { Text, Box, Image, SimpleGrid, Button } from "@chakra-ui/react";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { getBlogId } from "../../../services/articles";
import Loading from "../../../components/Loading";
import { ConvertTime } from "../../../utils/ConvertTime";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useGlobalStore } from "../../../store/global/GlobalProvider";
import { TYPES } from "../../../store/global/types";
import { useTitle } from "../../../hooks/useTitle";
// import { useQuery } from "@tanstack/react-query";

function ArticleDetail() {
  const { id } = useParams(); //obyektir icinde id
  const { state, dispatch } = useGlobalStore();
  const isFav = state.favorites.find((item) => item.id == id);
  console.log("isfav", isFav);
  const handleToggleFav = () => {
    if (isFav) {
      //?remove
      const filterFav = state.favorites.filter((item) => item.id != id);
      dispatch({ type: TYPES.TOGGLE_FAV, payload: filterFav });
      console.log(filterFav);
      return;
    }
    //?add
    dispatch({ type: TYPES.TOGGLE_FAV, payload: [...state.favorites, data] });
  };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["blog", id],
  //   queryFn: getBlogId(id),
  //   refetchInterval: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: true,
  // }); //useQuery react query  get requestleri ucun,
  // const articleItem = data?.data;
  // console.log(articleItem);

  const { data, loading } = useFetchData({
    requestFunc: () => getBlogId(id),
    dependency: [id],
  });

  useTitle(`${data?.title}|Blog App`); //meqale adi sehifede gorunur
  // useTitle(`${articleItem?.title}|Blog App`); //meqale adi sehifede gorunur //react query-e gore data
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <SimpleGrid bg="gray.50" columns={{ sm: 2 }} spacing="2" p="10">
          <Box>
            <Image src={data?.cover_url} alt={data?.title} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            gap="16px"
          >
            <Text bgClip="text" fontSize="md" fontWeight="medium" color="gray">
              {ConvertTime(parseInt(data?.time || data?.created))}
            </Text>
            <Text
              bgClip="text"
              fontSize="2xl"
              fontWeight="extrabold"
              color="black"
            >
              {data?.title}
            </Text>

            <Text bgClip="text" fontSize="lg" fontWeight="medium" color="gray">
              {data?.desc}
            </Text>
            {/* <Button
            size="lg"
            colorScheme="teal"
            alignSelf="flex-start"
            onClick={() => navigate(ROUTER.ARTICLE_CREATE)}
          >
            Get started
          </Button> */}
            <Button
              alignSelf={"flex-start"}
              leftIcon={isFav ? <MinusIcon /> : <AddIcon />}
              colorScheme={isFav ? "red" : "teal"}
              onClick={handleToggleFav}
            >
              {isFav ? "Remove Favorite" : "Add Favorite"}
            </Button>
          </Box>
        </SimpleGrid>
      )}
    </>
  );
}

export default ArticleDetail;
