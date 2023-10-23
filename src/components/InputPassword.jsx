import { IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import InputText from "./InputText";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = () => {
     const [show, setShow] = useState(false);
     const handleClick = () => setShow(!show);

     return (
          <InputGroup>
               <InputText
                    type={show ? "text" : "password"}
                    placeholder="Password"
               />

               <InputRightElement>
                    <IconButton
                         size="lg"
                         variant="unstyled"
                         onClick={handleClick}
                         color="#8A8A8A"
                         icon={show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    />
               </InputRightElement>
          </InputGroup>
     )
}

export default InputPassword;