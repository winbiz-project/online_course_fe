import { Input } from "@chakra-ui/react";

const InputText = (props) => {
     return <Input
          _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
          borderColor="#7091F5"
          {...props}
     />
}

export default InputText;
