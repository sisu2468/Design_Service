import Header from "../components/common/header"
import Flag1 from "../assets/images/flag1.png"
import Flag2 from "../assets/images/flag2.png"
import { useState } from "react"
import BuyNumberCount from "../components/common/buynumbercount";
import { GiShoppingCart } from "react-icons/gi";

export default function FlagBuy() {
    const [productnumber, setProductNumber] = useState<number>(1);
    const [flag2productnumber, setFlag2ProductNumber] = useState<number>(1);
    const formatnumber = (num: number) => {
        return num.toLocaleString();
    };
    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-col justify-center items-center relative h-full">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="flex flex-col gap-4 items-center justify-center py-5 border-[1px] border-black mb-3">
                        <span className="text-black text-4xl font-extrabold">今注文すると <span className="text-[#FF0000] text-5xl font-bold">X</span> 月<span className="text-[#FF0000] text-5xl font-bold">X</span> 日 に発送予定</span>
                        <span className="text-black font-medium text-base">お届け予定日 (納期)の目安は、<a href="/delivery"><span className="text-blue-600">こちらのページ</span></a>をご確認ください。</span>
                    </div>
                    <div className="grid grid-cols-5 items-center text-center px-10">
                        <div className="w-36"></div>
                        <span>商品</span>
                        <span>金額</span>
                        <span>量</span>
                        <span>小計</span>
                    </div>
                    <div className="grid grid-cols-5 items-center justify-center px-10 py-5 border-[1px] border-black mb-5">
                        <img src={Flag1} className="w-36 h-32" alt="Flag1" />
                        <div className="flex flex-col gap-2 items-center">
                            <span className="font-normal">レギュラーフラッグ</span>
                            <button className="px-1.5 py-2 bg-blue-600 text-white font-semibold">デザインを編集</button>
                        </div>
                        <div className="flex items-center justify-center">
                            <span>¥5,930</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <BuyNumberCount productnumber={productnumber} setProductNumber={setProductNumber} />
                        </div>
                        <div className="flex items-center justify-center">
                            <span>¥{formatnumber(5930 * productnumber)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 items-center justify-center px-10 py-5 border-[1px] border-black mb-9">
                        <img src={Flag2} className="w-36 h-32" alt="Flag2" />
                        <div className="flex flex-col gap-2 items-center">
                            <span className="font-normal">スイングフラッグ</span>
                            <button className="px-1.5 py-2 bg-blue-600 text-white font-semibold">デザインを編集</button>
                        </div>
                        <div className="flex items-center justify-center">
                            <span>¥9,790</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <BuyNumberCount productnumber={flag2productnumber} setProductNumber={setFlag2ProductNumber} />
                        </div>
                        <div className="flex items-center justify-center">
                            <span>¥{formatnumber(9790 * flag2productnumber)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <span className="flex items-center text-lg">合計金額</span>
                            <span className="font-extrabold text-3xl">¥{formatnumber(9790 * flag2productnumber + 5930 * productnumber)}</span>
                            <span className="flex items-center text-lg">(税込)</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button className="bg-blue-800 p-2.5 text-white font-semibold">
                                新しいフラッグを作成
                            </button>
                            <button className="bg-orange-500 p-2.5 text-white font-semibold flex gap-3">
                                <GiShoppingCart size={22} />
                                チェックアウト
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}