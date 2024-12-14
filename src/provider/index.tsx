import { FC, ReactNode } from "react";
import CanvasProvider from "./CanvasProvider";
import OrderProvider from "./OrderProvider";

interface Props {
    children: ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
    return (
        <OrderProvider>
            <CanvasProvider>
                {children}
            </CanvasProvider>
        </OrderProvider>
    )
}

export default Provider;
