import { useEffect, useState } from "react";
import BodyHeader from "../components/common/body-header";
import LeftBar from "../components/common/leftbar";
import FlagImage from '../assets/images/flag.png'
import Header from "../components/common/header";

export default function Home() {
    const [productnumber, setProductNumber] = useState<number>(1);
    const [barstatus, setBarStatus] = useState(false);
    const [barname, setBarName] = useState('items');
    useEffect(() => {
        if (barname == 'images' || barname === 'freeimages') {
            setBarStatus(true);
        }
        else {
            setBarStatus(false);
        }
    }, [barname])
    return (
        <>
            <Header />
            <div className="flex">
                <LeftBar productnumber={productnumber} setProductNumber={setProductNumber} barname={barname} setBarName={setBarName} />
                <div className="w-full bg-gray-200">
                    <BodyHeader productnumber={productnumber} barstatus={barstatus} setProductNumber={setProductNumber} />
                    <div className="bg-white ml-[304px] flex justify-center items-center">
                        <img src={FlagImage} className="" />
                    </div>
                </div>
            </div>
        </>
    )
}