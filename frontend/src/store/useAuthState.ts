import { useEffect, useRef } from "react";
import { authActions, useAppDispatch } from ".";
import User from "../types/User";

export default function useAuthState(user: User) {
  const dispatch = useAppDispatch();
  const logoutRef = useRef(0);

  useEffect(() => {
    const autoLogout = () => {
      if (user.token) {
        const tokenExpirationDuration =
          new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
        logoutRef.current = setTimeout(() => {
          dispatch(authActions.logout());
        }, tokenExpirationDuration);
      } else {
        clearTimeout(logoutRef.current);
      }
    };

    autoLogout();
  }, [user]);
}
