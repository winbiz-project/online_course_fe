import { Link, Image } from "@chakra-ui/react";
import mainLogo from '@/assets/images/logo_SkillBridge.png';

const LogoSkillbridge = (props) => {
  return (
    <Link href="/" _hover={{ textDecoration: "none" }}>
      <Image src={mainLogo} alt='' {...props} />
    </Link>
  );
};

export default LogoSkillbridge;