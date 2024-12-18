import _ from "lodash";
import { useContext, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { RiCropLine } from "react-icons/ri";
import { TfiPencil } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { MASK_IMAGES } from "../../constants/constants";
import { CanvasContext } from "../../provider/CanvasProvider";
import { OrderContext } from "../../provider/OrderProvider";
import { formatNumber } from "../../utils";
import ImageAdjustModal from "../ImageAdjustModal";
import ImageCropModal from "../ImageCropModal";

type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;
};

export default function BodyHeader({ productnumber }: NumberCountProps) {
    const navigate = useNavigate();
    const { canvasRef, maskIndex, layers, selectedLayerId } = useContext(CanvasContext);
    const { goods, setGoods } = useContext(OrderContext);
    const [showImageCropModal, setShowImageCropModal] = useState(false);
    const [showImageAdjustModal, setShowImageAdjustModal] = useState(false);
    const totalPrice = MASK_IMAGES[maskIndex].price * productnumber;

    const flagtype = maskIndex == 0 ? 'レギュラーフラッグ' : 'スイングフラッグ';
    const handleAdd = async () => {
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;

            const imageURL = canvasRef.current.toDataURL('image/png');
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                const rate = Math.min(600 / canvas.width, 600 / canvas.height);

                const width = canvas.width * rate;
                const height = canvas.height * rate;
                tempCanvas.width = width;
                tempCanvas.height = height;

                tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);

                const prevImageURL = tempCanvas.toDataURL('image/png');
                setGoods([...goods, { index: maskIndex, image: imageURL, prevImage: prevImageURL, amount: productnumber, flagtype: flagtype, layers: _.cloneDeep(layers) }]);
            }
        }
    }

    return (
        <div className="w-full flex justify-between gap-3 bg-[#3f4652] border-b-[1px] border-gray-400 p-2">
            <div className="flex justify-between items-center gap-2">
                {selectedLayerId && (
                    <>
                        <div className="p-1.5 bg-gray-200 cursor-pointer" onClick={() => setShowImageCropModal(true)} >
                            <RiCropLine size={20} />
                        </div>
                        <div className="p-1.5 bg-gray-200 cursor-pointer" onClick={() => setShowImageAdjustModal(true)}>
                            <TfiPencil size={20} />
                        </div>
                    </>
                )}
                <div>
                    <span className="text-white font-medium">フラッグ画像には透かしが入っておりますが、実際の商品には印刷されません。</span>
                </div>
            </div>
            <ImageCropModal isOpen={showImageCropModal} onClose={() => setShowImageCropModal(false)} />
            <ImageAdjustModal isOpen={showImageAdjustModal} onClose={() => setShowImageAdjustModal(false)} />
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
                    <button className="p-2 bg-gray-100 rounded" onClick={handleAdd}>
                        <p className="text-xs font-medium text-black">カートに追加</p>
                    </button>
                    <button className="p-2 bg-gray-100 rounded" onClick={() => navigate('/checkout')}>
                        <p className="text-xs font-medium text-black" >カートを見る</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
