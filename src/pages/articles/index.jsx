import React from "react";

import { SimpleGrid, Box } from "@chakra-ui/react";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";

import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { getBlogs } from "../../services/articles";
import Loading from "../../components/Loading";
import SearchBox from "../../components/SearchBox";
import { useEffect, useState } from "react";

function Articles() {
  const navigate = useNavigate();
  const { data, loading, setError, setLoading, setData } = useFetchData({
    requestFunc: () => getBlogs(),
  }); //custom hook
  console.log("data", data);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getBlogs();
        console.log("res", res);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setError(false);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [searchData, setSearchData] = useState();
  useEffect(() => {
    setSearchData(data);
  }, [data]);
  console.log(data, "articles");

  const handleSearch = (text) => {
    if (!text.trim()) {
      setSearchData(data);
      return;
    }
    console.log("text", text);
    const filterData = searchData.filter((item) =>
      // item.title.toLowerCase().includes(text.toLowerCase())
      new RegExp(text, "i").test(item.title)
    );
    setSearchData(filterData);
  }; //childen gelen datani aliriq callback functionla

  return (
    <>
      <Header />
      <Box px={50}>
        <SearchBox
          onFocus={() => setSearchData(data)}
          onSearch={handleSearch}
        />
      </Box>

      {loading ? (
        <Loading />
      ) : (
        <SimpleGrid columns={{ sm: 2 }} spacing="10" p="20">
          {searchData
            ?.filter((item) => item.id > 100)
            ?.map((item) => (
              <BlogCard
                key={"blog-id" + item.id}
                {...item}
                onReadMore={() => navigate("/articles/" + item.id)}
              />
            ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default Articles;
