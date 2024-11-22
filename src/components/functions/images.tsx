import { useState } from "react";
import { MdSwapHoriz } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

const LeftImages = () => {
    const [modalview, setModalView] = useState(false);
    const [productnumber, setProductNumber] = useState(1);
    return (
        <div className="w-80">
            <div className="px-5 py-3.5 border-b-2 border-gray-600">
                <div className="flex items-center">
                    <h1 className="font-medium text-white text-lg">36 x 54 Standard Flag &nbsp;</h1>
                    <p className="text-white text-sm font-medium p-0.5 rounded-sm bg-gray-800">${35.75 * productnumber}</p>
                </div>
                <div className="mt-2">
                    <button className="bg-gray-300 p-1.5 px-2 text-[#3f4652] font-medium rounded-sm text-xs flex items-center gap-1 hover:bg-gray-200"
                        onClick={() => setModalView(!modalview)}
                    >
                        CHANGE PRODUCT
                        <MdSwapHoriz size={16} />
                    </button>
                </div>
                <div className="mt-2">
                    <span className="text-xs text-gray-400 font-medium">36 x 54 Standard Curved Rectangle Flag (with 36 inch pole hem)</span>
                </div>
            </div>
            <div className="flex pt-3.5 px-5 pb-2.5 items-center border-b-[1px] border-gray-600">
                <span className="text-white text-xs font-medium">Quantity:</span>
                <span className="pl-1 text-red-600 text-xs font-medium">*</span>
                <div className="flex items-center gap-2 pl-1">
                    <button 
                        className="border-2 border-gray-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100"
                        onClick={() => setProductNumber(Math.max(1, productnumber - 1))}
                        disabled={productnumber <= 1}
                    >
                        <AiOutlineMinus size={16} className={`${productnumber <= 1 ? 'text-gray-300' : 'text-gray-500'}`} />
                    </button>
                    <input 
                        type="text" 
                        value={productnumber} 
                        className="w-20 text-center"
                        readOnly
                    />
                    <button 
                        className="border-2 border-gray-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100"
                        onClick={ () => setProductNumber(productnumber + 1)}
                    >
                        <AiOutlinePlus size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
            <div className="px-5 pt-2">
                <div className="flex items-center cursor-pointer hover:text-gray-300">
                    <span className="text-gray-400 text-xs font-medium">Price calculation formula</span>
                    <IoIosArrowForward size={12} className="flex items-center text-gray-400 ml-0.5" />
                </div>
            </div>
        </div>
    )
}

export default LeftImages;