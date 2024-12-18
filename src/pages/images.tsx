import { useContext } from "react";
import { OrderContext } from "../provider/OrderProvider";

export default function Preview_Images() {
    const { goods } = useContext(OrderContext);
    console.log(goods);
    
    return (
        <div className="p-10 grid grid-cols-3">
            {goods.map((good, index) => (
                <img src={good.prevImage} className="w-[600px] h-[600px] object-scale-down" alt="レギュラーフラッグ" key={index}/>
            ))}
        </div>
    )
}

