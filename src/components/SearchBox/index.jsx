import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

function SearchBox({ onSearch, onFocus }) {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    // console.log(search);
    onSearch(search);
  };
  return (
    <Box px={50} py={20} display="flex" alignItems="center" gap={4}>
      <Input
        placeholder="Search"
        px={50}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={onFocus}
      />
      <Button colorScheme="teal" onClick={handleSubmit}>
        Search
      </Button>
    </Box>
  );
}
export default SearchBox;
