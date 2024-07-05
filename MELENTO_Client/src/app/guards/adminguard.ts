import { CanActivateFn } from "@angular/router";

export function AdminGuard(): CanActivateFn {
    let role = localStorage.getItem("role")
    // let role = "admin"
    return () => {
        if (role === "admin" || role === "faculty") {
            return true;
        }
        alert("Sorry No Access For Role: " + role)
        return false;
    };
}