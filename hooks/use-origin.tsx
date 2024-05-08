import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const origin = window.origin || document.location.origin || null;

  if (!isMounted) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    return "localhost";
  }

  return origin;
};
