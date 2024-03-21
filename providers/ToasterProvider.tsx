"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#171717",
          color: "#a3a3a3",
        },
      }}
    />
  );
};

export default ToasterProvider;
