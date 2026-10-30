"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#FAF7F2] group-[.toaster]:text-[#1C2421] group-[.toaster]:border-[#1C2421]/12 group-[.toaster]:shadow-lg group-[.toast]:rounded-md",
          description: "group-[.toast]:text-[#4E5653]",
          actionButton:
            "group-[.toast]:bg-[#1E4D3B] group-[.toast]:text-[#FAF7F2]",
          cancelButton:
            "group-[.toast]:bg-[#F1ECE1] group-[.toast]:text-[#1C2421]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
