import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../store/global/GlobalProvider";
import { useTitle } from "../../hooks/useTitle";

function Favorites() {
  // const [data, setData] = useState();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();   customhooka cixardildi
  useTitle("Favorites");

  const navigate = useNavigate();

  const {
    state: { favorites },
  } = useGlobalStore();

  return (
    <>
      <Header />
      {/* <Box px={50}>
        <NavigationShow routes={["Favorites"]} />
      </Box> */}
      <SimpleGrid columns={{ sm: 2 }} p="20" spacing="10">
        {favorites
          ?.filter((item) => item.id > 100)
          ?.map((item) => (
            <BlogCard
              key={"blog-id" + item.id}
              {...item}
              onReadMore={() => navigate("/articles/" + item.id)}
            />
          ))}
        {/* <BlogCard />
          <BlogCard /> */}
      </SimpleGrid>
    </>
  );
}

export default Favorites;
