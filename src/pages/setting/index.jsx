import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Tooltip,
  Td,
  ButtonGroup,
  IconButton,
  Image,
  Tr,
  Tbody,
  Th,
  Thead,
  Table,
  TableContainer,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { useFetchData } from "../../hooks/useFetchData";
import { getBlogs, rmvBlogId } from "../../services/articles";
import { shortText } from "../../utils/shortText";
import { ROUTER } from "../../constant/router";
// import { toast } from "react-toastify"; //toastify toast

function Setting() {
  const toast = useToast(); //chakra toast
  const navigate = useNavigate();
  const { data, loading, setData } = useFetchData({
    requestFunc: () => getBlogs(),
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [currentItem, setCurrentItem] = useState();

  const handleRemove = async () => {
    try {
      await rmvBlogId(currentItem?.id);
      const newFilter = data?.filter((item) => item.id != currentItem.id);
      setData(newFilter);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        colorScheme: "teal",
        isClosable: true,
      });
      // toast.success("Success"); toastify toast

      onClose();
    } catch (err) {
      toast({
        title: err.message,

        status: "error",
        duration: 2000,
        colorScheme: "red",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={600}>{currentItem?.title}</Text> adindaki meqaleni
            silmeye eminsinizmi?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleRemove}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box py={100} px={160}>
        <Text align={"center"} fontWeight={600} fontSize="6xl">
          Setting
        </Text>

        <TableContainer>
          <Table colorScheme="whatsapp">
            <Thead>
              <Tr>
                <Th>Cover url</Th>
                <Th>Title</Th>
                <Th colSpan={2}>Desc</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ?.filter((item, index) => item.id > 100)
                ?.map((item) => (
                  <Tr key={"iteTrm-" + item?.id}>
                    <Td>
                      <Image
                        width={10}
                        height={10}
                        borderRadius={10}
                        objectFit={"cover"}
                        src={item?.cover_url}
                      />
                    </Td>
                    <Td>
                      <Tooltip label={item?.title}>
                        {shortText(item?.title, 15)}
                        {/*tooltip to display all title */}
                      </Tooltip>
                    </Td>
                    <Td>{shortText(item?.desc, 15)}</Td>
                    <Td>
                      <ButtonGroup>
                        <IconButton
                          colorScheme="teal"
                          onClick={() =>
                            navigate(
                              ROUTER.ARTICLE_CREATE + `?blog_id=${item?.id}` //sehife yaratmadan pathla deyismek
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          colorScheme="red"
                          onClick={() => {
                            setCurrentItem(item);
                            onOpen();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Setting;
