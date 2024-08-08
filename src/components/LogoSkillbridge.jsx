import { Link, Image } from "@chakra-ui/react";

const LogoSkillbridge = (props) => {
  return (
    <Link href="/" _hover={{ textDecoration: "none" }}>
      <Image src={'/src/assets/images/logo_SkillBridge.png'} alt='' {...props} />
    </Link>
  );
};

export default LogoSkillbridge;