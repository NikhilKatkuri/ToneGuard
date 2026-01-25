"use client";

import DialogBox from "@/components/DialogBox";
import HistoryDialog from "@/components/HistoryDialog";
import SettingDialog from "@/components/SettingDialog";
import useDialogHook, { UseDialogReturn } from "@/hooks/useDialog";
import { createContext, useContext, ReactNode } from "react";

interface DialogContextType {
    setting: UseDialogReturn;
    history: UseDialogReturn;
}

type DialogKey = "setting" | "history";
const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const dialogs: Record<DialogKey, { control: UseDialogReturn; children: ReactNode }> = {
        setting: {
            control: useDialogHook({ defaultOpen: false }),
            children: <SettingDialog />,
        },
        history: {
            control: useDialogHook({ defaultOpen: false }),
            children: <HistoryDialog />,
        },
    };

    return (
        <DialogContext.Provider
            value={{ setting: dialogs.setting.control, history: dialogs.history.control }}
        >
            {children}
            {Object.values(dialogs).map((item, index) => {
                return (
                    <DialogBox
                        isOpen={item.control.isOpen}
                        onClose={item.control.close}
                        key={index}
                    >
                        {item.children}
                    </DialogBox>
                );
            })}
        </DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) throw new Error("useDialog must be used within DialogProvider");
    return context;
};
