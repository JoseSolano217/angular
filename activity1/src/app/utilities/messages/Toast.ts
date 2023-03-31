import { ToastrService } from "ngx-toastr";

export function showMessage(type: string, message: string, alert: string, toast: ToastrService): void {
    const params = {
        timeOut: 6000,
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: "toast-top-center"
    }

    switch(type) {
        case "success":
            toast.success(message, alert, params);
            break;
        case "info":
            toast.info(message, alert, params);
            break;
        case "error":
            toast.error(message, alert, params);
            break;
        case "warning":
            toast.warning(message, alert, params);
            break;
        default:
            toast.clear(0);
            break;
    };
};