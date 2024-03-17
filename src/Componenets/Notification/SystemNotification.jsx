import React from "react";

const SystemNotification = () => {
  const handleNotificationClick = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      showNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
  };

  const showNotification = () => {
    new Notification("System Notification", {
      body: "This is a system notification!",
      icon: "/path/to/icon.png", // Path to your notification icon
    });
  };

  return (
    <>
    </>
  );
};

export default SystemNotification;
