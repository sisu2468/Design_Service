import { useEffect, useState } from "react";
import BodyHeader from "../components/common/body-header";
import LeftBar from "../components/common/leftbar";
import Header from "../components/common/header";
import Flag1 from "../assets/images/レギュラーフラッグ.png"

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
                    <div className="bg-white ml-[304px] flex justify-center items-center h-full">
                        <img src={Flag1} className="w-[680px] h-[680px]" alt="レギュラーフラッグ" />
                    </div>
                </div>
            </div>
        </>
    )
}