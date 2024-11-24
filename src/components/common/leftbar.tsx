import { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import Product from '../functions/product';
import LeftImages from '../functions/freeimages';
import NumberCount from './numbercount';
import { FaUserCircle, FaFlag } from 'react-icons/fa';
import UploadImage from '../functions/image';

type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;  // Define the type of setProductNumber function
};

const LeftBar = ({ productnumber, setProductNumber }: NumberCountProps) => {
    const [selected, setSelected] = useState('product');
    const formatnumber = (num: number) => {
        return num.toLocaleString();
    };
    return (
        <div className='fixed top-12 z-50 border-r-[1px] bg-[#3f4652] border-gray-400'>
            <div className='h-28 border-b-[1px] border-gray-400 p-3 w-[304px]'>
                <div className='flex justify-between mb-2'>
                    <div className='flex flex-col'>
                        <span className='text-white font-semibold'>レギュラーフラグ</span>
                        <span className='text-white text-xs'>90cm x 136cm</span>
                    </div>
                    <div className='flex items-center px-2 bg-[#FF0000] rounded-md h-8'>
                        <span className='text-white text-base'>¥ {formatnumber(productnumber * 5390)}/{productnumber}枚</span>
                    </div>
                </div>
                <NumberCount productnumber={productnumber} setProductNumber={setProductNumber} />
            </div>
            <div className="flex">
                <div className="bg-[#3f4652] border-r-[1px] border-gray-400 w-20 min-h-screen">
                    <ul className="flex flex-col gap-2">
                        <li 
                            onClick={() => setSelected('items')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${selected === 'items' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <FaFlag size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>アイテム</span>
                        </li>
                        <li 
                            onClick={() => setSelected('images')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${selected === 'images' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <FaUserCircle size={32}  />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>画像</span>
                        </li>
                        <li 
                            onClick={() => setSelected('freeimages')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${selected === 'freeimages' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <AiOutlinePicture size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>フリー画像</span>
                        </li>
                        <li 
                            onClick={() => setSelected('layers')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${selected === 'layers' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <BiLayer size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>レイヤー</span>
                        </li>
                    </ul>
                </div>
                <div className='bg-[#3f4652]'>
                    {selected === 'items' && (
                        <Product />
                    )}
                    {selected === 'images' && (
                        <UploadImage />
                    )}
                    {selected === 'freeimages' && (
                        <LeftImages />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftBar;