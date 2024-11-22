import { useState } from "react";
import { MdSwapHoriz } from 'react-icons/md';

const Product = () => {
    const [modalview, setModalView] = useState(false);
    return (
        <div className="w-56 flex justify-center">
            <div className="py-3.5 mt-2 h-5">
                <button className="bg-gray-800 p-1.5 px-4 text-white font-medium rounded-sm text-xs flex items-center gap-1 hover:bg-gray-600"
                    onClick={() => setModalView(!modalview)}
                >
                    フラッグを変更する
                    <MdSwapHoriz size={16} />
                </button>
            </div>
        </div>
    )
}

export default Product;