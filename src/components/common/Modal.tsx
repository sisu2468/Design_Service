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
            "fixed inset-0 z-[1020] bg-[#0008] overflow-auto",
            isOpen ? "" : "hidden"
        )} onClick={onClose}>
            {isOpen && (
                <div className="absolute left-1/2 translate-x-[-50%] w-fit flex-none p-4">
                    <div className="p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal;
