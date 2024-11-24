import { useState } from "react";
import BodyHeader from "../components/common/body-header";
import LeftBar from "../components/common/leftbar";
import FlagImage from '../assets/images/flag.png'

export default function Home() {
    const [productnumber, setProductNumber] = useState<number>(1);
    return (
        <div className="flex">
            <LeftBar productnumber={productnumber} setProductNumber={setProductNumber} />
            <div className="w-full bg-gray-200">
                <BodyHeader productnumber={productnumber} setProductNumber={setProductNumber} />
                <div className="bg-white ml-[304px] flex justify-center items-center">
                    <img src={FlagImage} className="" />
                </div>
            </div>
        </div>
    )
}