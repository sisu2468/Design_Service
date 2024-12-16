import { useState } from "react";
import Canvas from "../components/Canvas";
import BodyHeader from "../components/common/body-header";
import Header from "../components/common/header";
import LeftBar from "../components/common/leftbar";
import ZoomControl from "../components/ZoomControl";

export default function Home() {
    const [productnumber, setProductNumber] = useState<number>(1);
    const [barname, setBarName] = useState('items');

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-[1_1_0] flex">
                <LeftBar productnumber={productnumber} setProductNumber={setProductNumber} barname={barname} setBarName={setBarName} />
                <div className="relative w-[calc(100%-320px)] flex flex-col">
                    <BodyHeader productnumber={productnumber} setProductNumber={setProductNumber} />
                    <div className="relative flex-[1_1_0] bg-white overflow-auto">
                        <Canvas />
                    </div>
                    <ZoomControl />
                </div>
            </div>
        </div>
    )
}