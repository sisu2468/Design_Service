import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
    return (
        <div className={clsx(
            "p-4 fixed inset-0 z-[1020] bg-[#0008]",
            isOpen ? "flex justify-center items-center" : "hidden"
        )} onClick={onClose}>
            {isOpen && (
                <div className="p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default Modal;
