
import { Icon, Text, Flex, Box, FlexProps, StackProps } from "@chakra-ui/react"

export const ApartmentFeatureIcon = ({ as }: { as: any}) => (
  <Icon as={as} w={6} h={6} mr={4} />
)

export interface IApartmentFeature extends FlexProps{
  title: string;
  isHighlight?: boolean;
  subtitle?: string;
}

export const ApartmentFeature = ({children, title, subtitle, isHighlight , ...rest}: IApartmentFeature) => (
  <Flex {...rest}>
      <Box>
        {children}
      </Box>
      <Box>
        <Text display="inline-block" fontWeight={isHighlight ? "bold" : "normal"}>{title}</Text>
        {subtitle && <Text fontSize={"sm"} as="cite" display={"block"}>{subtitle}</Text>}
      </Box>
    </Flex>
)

const ApartmentFeatures = ({children, ...rest}: StackProps) => {
  return (
    <Flex direction={"column"} alignItems={"flex-start"} {...rest}>
      {children}
    </Flex>
  )
}

export default ApartmentFeatures;