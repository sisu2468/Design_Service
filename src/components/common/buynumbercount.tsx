import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

type BuyNumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;  // Define the type of setProductNumber function
};

const BuyNumberCount = ({ productnumber, setProductNumber }: BuyNumberCountProps) => {
    return (
        <div className="flex pt-3.5 px-5 pb-2.5 gap-2 items-center justify-center border-gray-600">
            <div className="flex items-center gap-2 pl-1">
                <button
                    className="border-[1px] border-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                    onClick={() => setProductNumber(Math.max(6, productnumber - 1))}
                    disabled={productnumber <= 6}
                >
                    <AiOutlineMinus size={13} className={`${productnumber <= 1 ? 'text-black' : 'text-gray-500'}`} />
                </button>
                <input
                    type="text"
                    value={productnumber}
                    className="w-20 text-center py-1 border-[1px] border-black"
                    readOnly
                />
                <button
                    className="border-[1px] border-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                    onClick={() => setProductNumber(productnumber + 1)}
                >
                    <AiOutlinePlus size={13} className="text-black" />
                </button>
            </div>
        </div>
    );
};

export default BuyNumberCount;
