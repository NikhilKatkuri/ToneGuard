import { useCallback, useState } from "react";

export interface UseDialogReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

interface UseDialogProps {
    defaultOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const useDialogHook = ({
    defaultOpen = false,
    onOpen,
    onClose,
}: UseDialogProps): UseDialogReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const open = useCallback(() => {
        setIsOpen((prev) => {
            if (!prev && onOpen) {
                onOpen();
            }
            return true;
        });
    }, [onOpen]);

    const close = useCallback(() => {
        setIsOpen((prev) => {
            if (prev && onClose) {
                onClose();
            }
            return false;
        });
    }, [onClose]);

    const toggle = useCallback(() => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                onOpen?.();
            } else {
                onClose?.();
            }

            return next;
        });
    }, [onOpen, onClose]);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};

export default useDialogHook;
