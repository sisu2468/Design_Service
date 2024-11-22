import { useState } from 'react';
import { BiPackage } from 'react-icons/bi';
import { AiOutlineStar, AiOutlinePicture } from 'react-icons/ai';
import { BiLayer } from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs';
import Product from '../functions/product';
import LeftImages from '../functions/images';

const LeftBar = () => {
    const [selected, setSelected] = useState('product');

    return (
        <div>
            <div className="flex">
                <div className="bg-[#272c33] w-14 min-h-screen">
                    <ul className="flex flex-col gap-2">
                        <li 
                            onClick={() => setSelected('product')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200 rounded-md
                                ${selected === 'product' ? 'bg-[#3f4652] text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-[#3ead23]">
                                <BiPackage size={18} />
                            </div>
                            <span className='text-[9px] font-semibold group-hover:text-[#3ead23]'>Product</span>
                        </li>
                        <li 
                            onClick={() => setSelected('templates')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200  rounded-md
                                ${selected === 'templates' ? 'bg-[#3f4652] text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-[#3ead23]">
                                <AiOutlineStar size={18} />
                            </div>
                            <span className='text-[9px] font-semibold group-hover:text-[#3ead23]'>Templates</span>
                        </li>
                        <li 
                            onClick={() => setSelected('images')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200  rounded-md
                                ${selected === 'images' ? 'bg-[#3f4652] text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-[#3ead23]">
                                <AiOutlinePicture size={18} />
                            </div>
                            <span className='text-[9px] font-semibold group-hover:text-[#3ead23]'>Images</span>
                        </li>
                        <li 
                            onClick={() => setSelected('layers')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200  rounded-md
                                ${selected === 'layers' ? 'bg-[#3f4652] text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-[#3ead23]">
                                <BiLayer size={18} />
                            </div>
                            <span className='text-[9px] font-semibold group-hover:text-[#3ead23]'>Layers</span>
                        </li>
                        <li 
                            onClick={() => setSelected('drawing')}
                            className={`text-xs uppercase flex flex-col items-center p-2 cursor-pointer
                                group transition-colors duration-200  rounded-md
                                ${selected === 'drawing' ? 'bg-[#3f4652] text-white' : 'text-gray-400'}`}
                        >
                            <div className="mb-1 w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-[#3ead23]">
                                <BsPencil size={18} />
                            </div>
                            <span className='text-[9px] font-semibold group-hover:text-[#3ead23]'>Drawing</span>
                        </li>
                    </ul>
                </div>
                <div className='bg-[#3f4652]'>
                    {selected === 'product' && (
                        <Product />
                    )}
                    {selected === 'images' && (
                        <LeftImages />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftBar;