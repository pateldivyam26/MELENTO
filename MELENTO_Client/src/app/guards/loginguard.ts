import { CanActivateFn } from "@angular/router";

export function LoginGuard(): CanActivateFn {
    let role = localStorage.getItem("role")
    // let role = "admin"
    return () => {
        if (role!=null) {
            return true;
        }
        alert("Sorry No Access Without Login")
        return false;
    };
}