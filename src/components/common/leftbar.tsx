import { AiOutlinePicture } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { FaFlag, FaUserCircle } from 'react-icons/fa';
import LeftImages from '../functions/freeimages';
import UploadImage from '../functions/image';
import Layers from '../functions/Layers';
import Product from '../functions/product';
import NumberCount from './numbercount';
import { useContext } from 'react';
import { CanvasContext } from '../../provider/CanvasProvider';

type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;  // Define the type of setProductNumber function
    barname: string;
    setBarName: (barname: string) => void;
};

const LeftBar = ({ productnumber, setProductNumber, barname, setBarName }: NumberCountProps) => {

    const { maskIndex } = useContext(CanvasContext);

    return (
        <div className='w-[320px] flex flex-col bg-[#3f4652] border-r border-gray-400'>
            <div className='h-28 border-b border-gray-400 p-3'>
                <div className='flex justify-between mb-2'>
                    <div className='flex flex-col'>
                        <span className='text-white font-semibold'>{maskIndex == 0 ? 'レギュラーフラッグ' : 'スイングフラッグ'}</span>
                        <span className='text-white text-xs'>{maskIndex == 0 ? '90cm x 136cm' : '109cm x 135cm x 252cm'}</span>
                    </div>
                    <div className='flex items-center px-2 bg-[#FF0000] rounded-md h-8'>
                        <span className='text-white text-base'>¥{maskIndex == 0 ? '5,390 ' : '9,790 '}/{' 1'}枚</span>
                    </div>
                </div>
                <NumberCount productnumber={productnumber} setProductNumber={setProductNumber} />
            </div>
            <div className="flex-[1_1_0] flex">
                <div className="flex-none w-20 bg-[#3f4652] border-r border-gray-400">
                    <ul className="flex flex-col gap-2">
                        <li
                            onClick={() => setBarName('items')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${barname === 'items' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <FaFlag size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>アイテム</span>
                        </li>
                        <li
                            onClick={() => setBarName('images')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${barname === 'images' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <FaUserCircle size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>画像</span>
                        </li>
                        <li
                            onClick={() => setBarName('freeimages')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${barname === 'freeimages' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <AiOutlinePicture size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>フリー画像</span>
                        </li>
                        <li
                            onClick={() => setBarName('layers')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200
                                ${barname === 'layers' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-8 h-8 flex items-center justify-center text-white group-hover:text-gray-400">
                                <BiLayer size={32} />
                            </div>
                            <span className='text-xs font-semibold text-white group-hover:text-gray-400'>レイヤー</span>
                        </li>
                    </ul>
                </div>
                <div className='flex-grow h-full bg-[#3f4652]'>
                    {barname === 'items' && (
                        <Product />
                    )}
                    {barname === 'images' && (
                        <UploadImage />
                    )}
                    {barname === 'freeimages' && (
                        <LeftImages />
                    )}
                    {barname === 'layers' && (
                        <Layers />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftBar;
