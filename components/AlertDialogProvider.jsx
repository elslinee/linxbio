"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AlertDialogContext = createContext(null);

export function AlertDialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    open: false,
    content: null, 
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: null,
    hideActions: false, 
  });

  const showDialog = useCallback((options) => {
    setDialog({
      open: true,
      content: options.content,
      confirmText: options.confirmText ?? "Confirm",
      cancelText: options.cancelText ?? "Cancel",
      hideActions: options.hideActions ?? false,
      onConfirm: options.onConfirm ?? null,
    });
  }, []);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertDialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}

      <AnimatePresence>
        {dialog.open && (
          <motion.div
            className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDialog}
          >
            <motion.div
              className="w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
   
              <div>{dialog.content}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  return useContext(AlertDialogContext);
}
