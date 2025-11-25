"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AlertDialogContext = createContext(null);

export function AlertDialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    open: false,
    content: null, // 🆕 custom div / JSX
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: null,
    hideActions: false, // 🆕 ability to remove buttons
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
    <AlertDialogContext.Provider value={{ showDialog }}>
      {children}

      <AnimatePresence>
        {dialog.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
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
              {/* 🆕 هنا يظهر المحتوى المخصص */}
              <div>{dialog.content}</div>

              {/* 🆕 امكانية إظهار او إخفاء الأزرار */}
              {!dialog.hideActions && (
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeDialog}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm transition hover:bg-gray-300"
                  >
                    {dialog.cancelText}
                  </button>

                  <button
                    onClick={() => {
                      dialog.onConfirm?.();
                      closeDialog();
                    }}
                    className="bg-primary hover:bg-primary/80 rounded-lg px-4 py-2 text-sm text-black transition"
                  >
                    {dialog.confirmText}
                  </button>
                </div>
              )}
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
