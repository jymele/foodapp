"use client";
import { useEffect, useState } from "react";

export default function IsOnlinePopup() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div
      className={`transition duration-200 fixed bottom-0 right-0 m-4 p-2 rounded-lg text-white ${
        isOnline ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {isOnline ? "You are online" : "You are offline"}
    </div>
  );
}
