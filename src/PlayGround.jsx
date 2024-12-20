import { Suspense, useEffect } from "react";
import { Toaster } from "sonner";

import { useLocation } from "react-router";
import Loader from "./common/Loader";
import { useAuth } from "./modules/Auth/contexts/features/useAuth";
import GuestRouter from "./router/GuestRouter";
import PrivateRouter from "./router/PrivateRouter";

const PlayGround = () => {


  const { isValidToken, AuthCheck, isGuest, loading, setLoading } = useAuth()
  const { pathname } = useLocation();


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    AuthCheck()
  }, [pathname])
  return (
    <>
      {loading ?
        <Loader /> :
        <>

          {isGuest ?
            <Suspense fallback={<Toaster>Loading...</Toaster>}>
              <GuestRouter />
            </Suspense>
            :
            <Suspense fallback={<Toaster>Loading...</Toaster>}>
              <PrivateRouter />
            </Suspense>
          }
        </>
      }

    </>
  )

}

export default PlayGround