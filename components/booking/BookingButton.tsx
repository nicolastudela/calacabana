import { FlexProps, Flex, Button, Text } from "@chakra-ui/react"


export interface BookingButtonProps extends FlexProps{
  onBookingAction: () => void;
  enabled?: boolean;
  isLoading?: boolean;
}

const BookingButton = ({onBookingAction, enabled = true, isLoading = false, ...props}: BookingButtonProps) => (
  <Flex alignItems={"center"} direction="column" {...props} m="auto">
    <Button variant="action" disabled={!enabled} isLoading={isLoading} onClick={onBookingAction} mb={2}>Reservar</Button>
    <Text fontSize="xs">{enabled ? "No vamos a cobrarte ningún cargo por el momento" : "Seleccione alguna fecha"}</Text>
  </Flex>
)

export default BookingButton;