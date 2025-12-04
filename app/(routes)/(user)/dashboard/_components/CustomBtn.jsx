import React from "react";
import Button from "@/components/Button";
import { useAlertDialog } from "@/components/AlertDialogProvider";

export default function CustomBtn({
  name,
  dialog = {
    content: "",
  },
  outLine = false,
  onClick = () => {},
}) {
  const { showDialog } = useAlertDialog();
  const handleClick = () => {
    if (outLine) {
      onClick?.();
      return;
    }

    showDialog({
      ...dialog,
    });
  };
  return (
    <Button
      onClick={handleClick}
      className={`border-primary w-fit! min-w-[70px] border px-4! py-[4.5px]!  text-sm font-bold ${outLine ? "border-primary text-primary! border bg-transparent hover:text-white! shadow-none" : ""}`}
    >
      {name}
    </Button>
  );
}
