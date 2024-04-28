import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Header from "../../../components/Header";
import { useTitle } from "../../../hooks/useTitle";
import { useSearchParams } from "react-router-dom";

import { useFormik } from "formik";
import { categories } from "../../../constant/categories";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../../constant/router";
import { crtBlog, getBlogId, uptBlog } from "../../../services/articles";
import { useFetchData } from "../../../../../Group8271/ModernFrontEnd/Topic10/blog-app/src/hooks/useFetchData";
// import { AddIcon } from "@chakra-ui/icons";
const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNZcEIRZucZlqbOJpbEPlAcrj7OR7rgNKmj5m4Az8lg&s";
const initialValues = {
  title: "",
  desc: "",
  cover_url: "",
  // images: ["", ""],
  category: null,
  time: Date.now(),
};

function ArticleCreate() {
  useTitle("Create Article");

  const [par] = useSearchParams();
  const blogId = par.get("blog_id"); // pathda blog_id olarsa  sehifede update  olsun, olmasa create

  const navigate = useNavigate();

  // const [images, setImages] = useEffect([]);
  const toast = useToast();
  const handleEditBlog = useCallback(
    async (data, { resetForm }) => {
      console.log("data", data);
      // setLoading(true);

      try {
        if (blogId) {
          await uptBlog(blogId, data);
          navigate(ROUTER.SETTING);
        } else {
          await crtBlog(data);
          navigate(ROUTER.ARTICLES);
        }

        resetForm();

        toast({
          title: blogId ? "Blog updated." : "Blog created.",
          // description: "We've created your account for you.",
          status: "success",
          colorScheme: "teal",
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: err?.message,
          // description: "",
          status: "error",
          colorScheme: "red",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        // setLoading(false);
      }
    },
    [blogId]
  );

  useFetchData({
    condition: !blogId,
    requestFn: () => getBlogId(blogId),
    dependecy: [blogId],
    onSuccess: (data) => {
      const { title, desc, cover_url, category, images } = data;
      setValues({ title, desc, cover_url, category, images, time: Date.now() });
    },
  });

  const { handleChange, handleSubmit, errors, values, setValues } = useFormik({
    //formik
    initialValues,
    onSubmit: handleEditBlog,
    validate: (form) => {
      let error = {};
      if (!form?.title?.trim()) {
        error.title = "Required field title !";
      }

      if (!form?.desc?.trim()) {
        error.desc = "Required field description !";
      }

      if (!form?.cover_url?.trim()) {
        error.cover_url = "Required field  cover url  !";
      }
      return error;
    },
  });
  console.log(errors);

  useEffect(() => {
    if (!blogId) return;
    setValues({
      title: "",
      desc: "",
      cover_url: "",
      category: null,
      time: Date.now(),
    });
  }, [blogId]);

  // const handleImageInput = (value, index) => {
  //   const newValues = { ...values };
  //   newValues.images[index] = value;
  //   setValues(newValues);
  // };

  return (
    <>
      <Header />
      <Box py={10} px={10}>
        <Center>
          <Text fontSize="5xl" fontWeight={600}>
            {blogId ? "Update" : "Create"} Your Blog
          </Text>
        </Center>
        <Divider my={6} />
      </Box>

      <Box p={10}>
        <Box
          maxW="400px"
          margin="0 auto"
          boxShadow="lg"
          p={6}
          borderRadius="md"
          bg="white"
        >
          <Image
            width={200}
            height={200}
            objectFit="cover"
            borderRadius={10}
            src={values.cover_url ? values.cover_url : defaultImg}
          />
          <FormControl mt={4}>
            <FormLabel>Cover Url</FormLabel>
            <Input
              name="cover_url"
              onChange={handleChange}
              value={values.cover_url}
            />
            {errors?.cover_url && (
              <FormHelperText color="red">{errors?.cover_url}</FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Input name="title" onChange={handleChange} value={values.title} />
            {errors?.title && (
              <FormHelperText color="red">{errors?.title}</FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="desc" onChange={handleChange} value={values.desc} />
            {errors?.desc && (
              <FormHelperText color="red">{errors?.desc}</FormHelperText>
            )}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              onChange={handleChange}
              value={values.category}
            >
              <option disabled>Select category</option>
              {categories?.map((item) => (
                <option key={item.title + item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* <Divider />
          {values?.images?.map((image, index) => (
            <Box key={"index" + index} py={5}>
              <Image
                width={50}
                height={50}
                alignSelf="flex-start"
                objectFit="cover"
                borderRadius={10}
                mb={4}
                src={image ? image : defaultImg}
              />
              <FormControl>
                <Input
                  value={image}
                  onChange={(e) => handleImageInput(e.target.value, index)}
                  placeholder={"Image" + (index + 1)}
                />
              </FormControl>
            </Box>
          ))}
          <Button
            colorScheme="red"
            alignSelf="flex-start"
            leftIcon={<AddIcon />}
            onClick={() =>
              setValues((prev) => ({ ...prev, images: [...prev.images, ""] }))
            }
          >
            Add
          </Button>
          <Divider /> */}

          <Button mt={6} colorScheme="teal" onClick={handleSubmit}>
            {blogId ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ArticleCreate;
