import { TfiPencil } from "react-icons/tfi";
import { RiCropLine } from "react-icons/ri";
import { useState } from "react";

type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;  // Define the type of setProductNumber function
    barstatus: boolean;
};

export default function BodyHeader({ productnumber, barstatus }: NumberCountProps) {
    const [bracket, setBracket] = useState(false);
    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div className="flex mt-12 justify-between gap-3 bg-[#3f4652] w-full border-b-[1px] border-gray-400 p-2">
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
                    <p className="text-white text-xl font-bold">¥{formatNumber(productnumber * 5390)}</p>
                    <div className="w-6 h-6 relative">
                        <img
                            src="https://designstudio.dshowcase.com/wp-content/plugins/lumise/assets/images/cart.svg"
                            alt="Cart"
                            className="w-full h-full"
                        />
                        {productnumber > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {bracket ? productnumber : 0}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded" onClick={() => setBracket(true)}>
                        <p className="text-xs font-medium text-black">カートに追加</p>
                    </button>
                    <button className="p-2 bg-gray-100 rounded">
                        <p className="text-xs font-medium text-black">チェックアウト</p>
                    </button>
                </div>
            </div>

        </div>
    )
}

