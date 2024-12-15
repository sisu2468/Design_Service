import { useContext, useMemo } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { RiCropLine } from "react-icons/ri";
import { TfiPencil } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { MASK_IMAGES } from "../../constants/constants";
import { CanvasContext } from "../../provider/CanvasProvider";
import { OrderContext } from "../../provider/OrderProvider";
import { formatNumber } from "../../utils";

type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;
    barstatus: boolean;
};

export default function BodyHeader({ productnumber, barstatus }: NumberCountProps) {
    const navigate = useNavigate();
    const { canvasRef, maskIndex } = useContext(CanvasContext);
    const { goods, setGoods } = useContext(OrderContext);
    const totalPrice = useMemo(() => goods.reduce((prev, good) => prev + MASK_IMAGES[good.index].price * good.amount, 0), [goods]);
    const flagtype = maskIndex == 0 ? 'レギュラーフラッグ' : 'スイングフラッグ';
    const handleAdd = async () => {
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;

            const imageURL = canvasRef.current.toDataURL('image/png');
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                const rate = Math.min(128 / canvas.width, 128 / canvas.height);

                tempCanvas.width = canvas.width * rate;
                tempCanvas.height = canvas.height * rate;

                tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 128, 128);

                const prevImageURL = tempCanvas.toDataURL('image/png');
                setGoods([...goods, { index: maskIndex, image: imageURL, prevImage: prevImageURL, amount: productnumber, flagtype: flagtype }]);
            }
        }
    }

    return (
        <div className="flex justify-between gap-3 bg-[#3f4652] w-full border-b-[1px] border-gray-400 p-2">
            {barstatus ? (
                <div className="pl-80 gap-2 flex justify-between items-center">
                    <div className="p-1.5 bg-gray-200 cursor-pointer">
                        <RiCropLine size={20} />
                    </div>
                    <div className="p-1.5 bg-gray-200 cursor-pointer">
                        <TfiPencil size={20} />

                    </div>
                </div>
            ) : (
                <div className="pl-80 gap-2 flex justify-between items-center"></div>
            )}
            <div className="flex justify-end gap-3">
                <div className="flex gap-2 items-center relative">
                    <p className="text-white text-xl font-bold">¥{formatNumber(totalPrice)}</p>
                    <div className="w-6 h-6 relative flex items-center">
                        <FaCartShopping color="white" />
                        {productnumber > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {goods.length}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded">
                        <p className="text-xs font-medium text-black" onClick={handleAdd}>カートに追加</p>
                    </button>
                    <button className="p-2 bg-gray-100 rounded">
                        <p className="text-xs font-medium text-black" onClick={() => navigate('/checkout')}>チェックアウト</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
