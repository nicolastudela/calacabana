import { Flex, Text, Icon, FlexProps } from "@chakra-ui/react";
import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";

export interface DiscountsInformationProps {
  weeklyDiscountActivated? : boolean;
  biweeklyDiscountActivated? : boolean;
}  

const DiscountsInformation = ({weeklyDiscountActivated = false, biweeklyDiscountActivated = false, ...rest}: DiscountsInformationProps & FlexProps) => (
  <Flex flexDirection={"column"} {...rest}>
    <Flex justifyContent="space-between">
      <Text fontSize={"sm"}>Descuento Semanal</Text>
      {weeklyDiscountActivated ? <Icon as={CheckIcon} mr={1} /> : <Icon as={NotAllowedIcon} mr={1} />}
    </Flex>
    <Flex justifyContent="space-between">
      <Text fontSize={"sm"}>Descuento Quincenal</Text>
      {biweeklyDiscountActivated ? <Icon as={CheckIcon} mr={1} /> : <Icon as={NotAllowedIcon} mr={1} />}
    </Flex>
  </Flex>
);

export default DiscountsInformation;