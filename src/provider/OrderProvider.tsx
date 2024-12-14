import { createContext, FC, ReactNode, useState } from "react";
import { IGood } from "../constants/interfaces";

interface IOrder {
    goods: IGood[],
    setGoods: (goods: IGood[]) => void;
}

export const OrderContext = createContext<IOrder>({
    goods: [],
    setGoods: (_: IGood[]) => { },
});

interface Props {
    children: ReactNode;
}

const OrderProvider: FC<Props> = ({ children }) => {
    const [goods, setGoods] = useState<IGood[]>([]);

    return (
        <OrderContext.Provider value={{ goods, setGoods }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;
