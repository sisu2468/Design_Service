import { useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import BodyHeader from "../components/common/body-header";
import Header from "../components/common/header";
import LeftBar from "../components/common/leftbar";
import CanvasProvider from "../provider/CanvasProvider";
import ZoomControl from "../components/ZoomControl";

import flag1 from "../assets/images/flag1.png";
import flag2 from "../assets/images/flag2.png";

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
        <div className="h-screen flex flex-col">
            <Header />
            <CanvasProvider>
                <div className="flex-[1_1_0] flex">
                    <LeftBar productnumber={productnumber} setProductNumber={setProductNumber} barname={barname} setBarName={setBarName} />
                    <div className="relative w-[calc(100%-320px)] flex flex-col">
                        <BodyHeader productnumber={productnumber} barstatus={barstatus} setProductNumber={setProductNumber} />
                        <div className="relative flex-[1_1_0] bg-white overflow-auto">
                            <Canvas mask={flag2} />
                        </div>
                        <ZoomControl />
                    </div>
                </div>
            </CanvasProvider>
        </div>
    )
}