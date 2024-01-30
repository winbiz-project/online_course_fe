import {
    Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      my={"20"}
      p={"20"}
      mx={"auto"}
          width={"2xl"}
    className="space-y-6"
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
        Hubungi Skillbridge Untuk Diskusi Lebih Lanjut
      </Text>
      <FormControl>
        <FormLabel>Nama Lengkap</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Jabatan</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Perusahaan</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Email Resmi</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>No.HP/Whatsapp</FormLabel>
        <Input type="number" />
      </FormControl>
      <FormControl>
        <FormLabel>Pilih Layanan</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Pilih Layanan</FormLabel>
        <Textarea placeholder="Here is a sample placeholder" />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </Flex>
  );
};

export default Contact;
