import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;  // Define the type of setProductNumber function
};

const NumberCount = ({ productnumber, setProductNumber }: NumberCountProps) => {
    return (
        <div className="flex pt-3.5 px-5 pb-2.5 gap-2 items-center justify-center border-b-[1px] border-gray-600">
            <span className="text-white text-base font-semibold">数量:</span>
            <div className="flex items-center gap-2 pl-1">
                <button
                    className="border-2 border-gray-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100"
                    onClick={() => setProductNumber(Math.max(6, productnumber - 1))}
                    disabled={productnumber <= 6}
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
                    onClick={() => setProductNumber(productnumber + 1)}
                >
                    <AiOutlinePlus size={16} className="text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default NumberCount;
