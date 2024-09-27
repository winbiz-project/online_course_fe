import { Box, AccordionButton, AccordionItem, AccordionIcon, AccordionPanel } from "@chakra-ui/react";

const FaqItem = ({ question, answer }) => {
  return (
    <AccordionItem bgColor="white" mb={2} boxShadow="base" borderRadius="10px">
      {({ isExpanded }) => (
        <>
          <AccordionButton boxShadow="base" borderTopRadius="10px" borderBottomRadius={isExpanded ? "0px" : "10px"}>
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="semibold">
              {question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} borderBottomRadius="10px" boxShadow="base">
            {answer}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default FaqItem;
