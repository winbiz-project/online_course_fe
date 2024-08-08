import { IconButton, InputGroup, InputRightElement, Center } from "@chakra-ui/react";
import { useState } from "react";
import InputText from "./InputText";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = () => {

     const [show, setShow] = useState(false);
     const handleClick = () => setShow(!show);


     return (
          <InputGroup >
               <InputText width='65vh' height='7vh'
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    fontSize="20px"
               />
               <InputRightElement  height="100%" display="flex" alignItems="center" mr={2}>
                    <IconButton
                         variant="unstyled"
                         onClick={handleClick}
                         color="#8A8A8A"
                         fontSize="24px"
                         icon={show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    />
               </InputRightElement>
          </InputGroup>
     )
}

export default InputPassword;