import { useContext, useEffect, useMemo, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import BuyNumberCount from "../components/common/buynumbercount";
import Header from "../components/common/header";
import { MASK_IMAGES } from "../constants/constants";
import { OrderContext } from "../provider/OrderProvider";
import { formatNumber } from "../utils";

export default function FlagBuy() {
    const { goods, setGoods } = useContext(OrderContext);
    const totalPrice = useMemo(() => goods.reduce((prev, good) => prev + MASK_IMAGES[good.index].price * good.amount, 0), [goods]);
    const [currentMonth, setCurrentMonth] = useState<number>(0)
    const [currentDay, setCurrentDay] = useState<number>(0)
    const [deliverDay, setDeliverDay] = useState<string>('');

    useEffect(() => {
        const date = new Date()
        const month = date.getMonth() + 1 // getMonth() returns 0-11, so we add 1
        const day = date.getDay() + 1 // getMonth() returns 0-11, so we add 1
        setCurrentMonth((month + 2) % 12)
        if (month == 8 || day == 9 && day <= 15) {
            setDeliverDay('日頃');
            setCurrentDay(15)
        }
        else setDeliverDay('末頃');
    }, [])

    return (
        <div className="h-screen">
            <Header />
            <div className="py-16 flex flex-col justify-center relative">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="flex flex-col gap-4 items-center justify-center py-5 border-[1px] border-black mb-3">
                        <span className="text-black text-4xl font-extrabold">今注文すると
                            <span className="text-[#FF0000] text-5xl font-bold">{currentMonth}</span> 月
                            {currentDay != 0 && <span className="text-[#FF0000] text-5xl font-bold">{currentDay}</span>}{deliverDay} に発送予定
                        </span>
                        <span className="text-black font-medium text-base">お届け予定日 (納期)の目安は、<a href="https://bremen.co.jp/digital_flag/flow/#schedule"><span className="text-blue-600">こちらのページ</span></a>をご確認ください。</span>
                    </div>
                    <div className="grid grid-cols-5 items-center text-center px-10">
                        <div className="w-36"></div>
                        <span>商品</span>
                        <span>金額</span>
                        <span>数量</span>
                        <span>小計</span>
                    </div>
                    {goods.map((good, index) => (
                        <div key={index} className="relative grid grid-cols-5 items-center justify-center px-10 py-5 border-[1px] border-black mb-5">
                            <div className="cursor-pointer ">
                                <img src={good.prevImage} className="w-[128px] h-[128px] object-scale-down" alt="レギュラーフラッグ" />
                                <IoIosClose
                                    size={20}
                                    className="absolute top-4 right-4 text-red-600 cursor-pointer"
                                    onClick={() => setGoods(goods.filter((_, i) => i !== index))} // Remove the selected item
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <span className="font-normal">{good.flagtype}</span>
                                <button className="px-1.5 py-2 bg-blue-600 text-white font-semibold">デザインを編集</button>
                            </div>
                            <div className="flex items-center justify-center">
                                <span>¥{formatNumber(MASK_IMAGES[good.index].price)}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <BuyNumberCount productnumber={good.amount} setProductNumber={(amount) => setGoods(goods.map((good, i) => index == i ? { ...good, amount } : good))} />
                            </div>
                            <div className="flex items-center justify-center">
                                <span>¥{formatNumber(MASK_IMAGES[good.index].price * good.amount)}</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <span className="flex items-center text-lg">合計金額</span>
                            <span className="font-extrabold text-3xl">¥{formatNumber(totalPrice)}</span>
                            <span className="flex items-center text-lg">(税込)</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Link to="/">
                                <button className="bg-blue-800 p-2.5 text-white font-semibold">
                                    新しいフラッグを作成
                                </button>
                            </Link>
                            <Link to="/order">
                                <button className="bg-orange-500 p-2.5 text-white font-semibold flex gap-3">
                                    <GiShoppingCart size={22} />
                                    チェックアウト
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
