import { useEffect, useRef } from "react";
import { authActions, useAppDispatch } from ".";
import User from "../types/User";

export default function useAuthState(user: User) {
  const dispatch = useAppDispatch();
  const logoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const autoLogout = () => {
      if (user.token) {
        // Calculate the token expiration duration
        const tokenExpirationDuration =
          new Date(user.tokenExpirationDate).getTime() - new Date().getTime();

        // Set a timeout to dispatch logout action when the token expires
        logoutRef.current = setTimeout(() => {
          dispatch(authActions.logout());
        }, tokenExpirationDuration);
      } else {
        // Clear the logout timeout if the user is not authenticated
        if (logoutRef.current) {
          clearTimeout(logoutRef.current);
        }
      }
    };

    // Call autoLogout function when user object changes
    autoLogout();

    // Cleanup function to clear the timeout on unmount or when user object changes
    return () => {
      if (logoutRef.current) {
        clearTimeout(logoutRef.current);
      }
    };
  }, [user, dispatch]);
}
