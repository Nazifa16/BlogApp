import React from "react";
import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { shortText } from "../../utils/shortText";
import { categories } from "../../constant/categories";

function BlogCard({ title, cover_url, desc, onReadMore, category }) {
  const blogCategory = categories?.find((item) => item.id == category);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      // color="xususisari.700"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={cover_url}
        alt={title}
      />

      <Stack>
        <CardBody>
          <Heading size="sm" color="teal">
            Category: {blogCategory?.title}
          </Heading>
          <Heading size="md" py="2">
            {title}
          </Heading>
          <Text>{shortText(desc, 80)}</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="teal" onClick={onReadMore}>
            Read more
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default BlogCard;
