import { Store } from "react-notifications-component";

export class NotificationService {
    static raise_error(title: string | null= null, body: string) {
        console.log(body);
        Store.addNotification({
            title: title,
            message: body,
            type: 'danger',
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
        });
    }
}
