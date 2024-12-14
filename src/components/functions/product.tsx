import { useContext } from 'react';
import { MdSwapHoriz } from 'react-icons/md';
import { CanvasContext } from '../../provider/CanvasProvider';

const Product = () => {
    const { maskIndex, setMaskIndex } = useContext(CanvasContext);

    return (
        <div className="w-56 flex justify-center">
            <div className="py-3.5 mt-2 h-5">
                <button className="bg-gray-800 p-1.5 px-4 text-white font-medium rounded-sm text-xs flex items-center gap-1 hover:bg-gray-600"
                    onClick={() => setMaskIndex(maskIndex == 0 ? 1 : 0)}
                >
                    フラッグを変更する
                    <MdSwapHoriz size={16} />
                </button>
            </div>
        </div>
    )
}

export default Product;