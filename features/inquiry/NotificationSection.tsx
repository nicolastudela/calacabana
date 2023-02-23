import { Icon } from "@chakra-ui/icons";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { BsExclamationOctagon, BsCheckCircle } from "react-icons/bs";


export enum NOTIFICATION {
  FAILED_SELECTED_DATES_NOT_AVAILABLE = "FAILED_SELECTED_DATES_NOT_AVAILABLE",
  FAILED_INQUIRY_ACTION = "Parece que hubo un problema en el envio de tu consulta, te pedimos disculpas. Si lo deseas puedes intentar otra vez",
  SUCCESS_INQUIRY_ACTION = "Gracias! Tu consulta ha sido enviada. Te contactaremos a la brevedad."
}

const t = (key: string) => {
  switch (key) {
    case NOTIFICATION.FAILED_SELECTED_DATES_NOT_AVAILABLE:
      return "Parece que este apartamento ya esta resevado en las fechas que te interesan. Si te gustó, cambia las fechas del viaje y volve a intentarlo";
    case NOTIFICATION.FAILED_INQUIRY_ACTION:
      return "Parece que hubo un problema en el envio de tu consulta, te pedimos disculpas. Si lo deseas puedes intentar otra vez";
    case NOTIFICATION.SUCCESS_INQUIRY_ACTION:
      return "Gracias! Tu consulta ha sido enviada. Te contactaremos a la brevedad.";
    default:
      "";
  }
  return "";
};

export interface NotificationSectionProps {
  notification: NOTIFICATION;
}

const NotificationSection = ({notification, ...rest} : NotificationSectionProps & FlexProps) => (
  <Flex {...rest} direction="column" gap={4} alignItems="center" justifyContent={"center"}>
    {notification === NOTIFICATION.SUCCESS_INQUIRY_ACTION ? <Icon boxSize={12} as={BsCheckCircle}/> : <Icon boxSize={12} as={BsExclamationOctagon}/> }
    <Text textAlign={"center"}>{t(notification)}</Text>
  </Flex>
)

export default NotificationSection;