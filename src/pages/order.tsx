import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MASK_IMAGES } from '../constants/constants';
import { OrderContext } from '../provider/OrderProvider';
import { formatNumber } from '../utils';

const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) => {
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export default function OrderForm() {
    const [sameAsCustomer, setSameAsCustomer] = useState(false);
    const [confirm1, setConfirm1] = useState(false);
    const [confirm2, setConfirm2] = useState(false);
    const [confirm3, setConfirm3] = useState(false);
    const [confirm4, setConfirm4] = useState(false);
    const [confirm5, setConfirm5] = useState(false);
    const [username, setUserName] = useState('');
    const [emailaddress, setEmailAddress] = useState('');
    const [address, setAddress] = useState('');
    const [huriganaName, setHuriganaName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [postalnumber, setPostalNumber] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const { goods } = useContext(OrderContext);

    const [shippingName, setShippingName] = useState('');
    const [shippingPostalNumber, setShippingPostalNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingPhoneNumber, setShippingPhoneNumber] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    console.log("data", sameAsCustomer, isModalOpen);

    useEffect(() => {
        // Check if all required fields are filled
        const areAllFieldsFilled = [username, emailaddress, address, huriganaName, groupName].every(
            field => field.trim() !== ''
        );

        const areShippingFieldsValid =
            sameAsCustomer == false ||
            [shippingName, shippingPostalNumber, shippingAddress, shippingPhoneNumber].every(
                field => field && field.trim() !== ''
            );

        // Update button state
        setIsButtonActive(
            confirm1 &&
            confirm2 &&
            confirm3 &&
            confirm4 &&
            confirm5 &&
            areAllFieldsFilled &&
            areShippingFieldsValid
        );
    }, [confirm1, confirm2, confirm3, confirm4, confirm5, username, emailaddress, address, huriganaName, groupName, sameAsCustomer, shippingName, shippingPostalNumber, shippingAddress, shippingPhoneNumber]);


    const totalPrice = goods.reduce((sum, good) => {
        const price = MASK_IMAGES[good.index]?.price || 0;
        return sum + price * good.amount;
    }, 0);

    const totalCount = goods.reduce((sum, good) => {
        const count = good.amount || 0;
        return sum + count;
    }, 0);

    const [currentMonth, setCurrentMonth] = useState<number>(0)
    const [currentYear, setCurrentYear] = useState<number>(0)
    const [currentDay, setCurrentDay] = useState<number>(0)
    const [deliverDay, setDeliverDay] = useState<string>('');

    useEffect(() => {
        const date = new Date()
        const year = date.getFullYear() + 1 // getMonth() returns 0-11, so we add 1
        const month = date.getMonth() + 1 // getMonth() returns 0-11, so we add 1
        const day = date.getDay() + 1 // getMonth() returns 0-11, so we add 1
        setCurrentMonth((month + 2) % 12)
        if (month > 10) {
            setCurrentYear(year + 1);
        }
        else setCurrentYear(year)
        if (month == 8 || day == 9 && day <= 15) {
            setDeliverDay('日頃');
            setCurrentDay(15)
        }
        else setDeliverDay('末頃');
    }, [])

    const sendDeliveryData = async () => {
        const deliveryData = {
            buyername: username,
            ordernumber: '12345',
            emailaddress: emailaddress,
            postalcode: postalnumber,
            address: address,
            telnumber: phonenumber,
            orderdate: new Date().toISOString(),
            products: await Promise.all(goods.map(async good => ({
                flagtype: good.flagtype,
                amount: good.amount,
                image: await arrayBufferToBase64(good.image),
                subtotal: MASK_IMAGES[good.index].price * good.amount,
            }))),
            totalprice: totalPrice.toString(),
            deliverydate: `${currentYear}年 ${currentMonth}月 ${currentDay ? currentDay + deliverDay : deliverDay}`,
            ...(shippingName && shippingPostalNumber && shippingAddress && shippingPhoneNumber && {
                shippingInfo: {
                    name: shippingName,
                    postalNumber: shippingPostalNumber,
                    address: shippingAddress,
                    phoneNumber: shippingPhoneNumber,
                }
            }),
        };

        try {
            const response = await axios.post('http://bremen-flag.com/api/deliver', deliveryData);
            if (response.status === 200) {
                navigate('/orderconfirm');
                console.log('Success');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="border border-gray-300 rounded-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-bold mb-6">購入者情報</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">氏名</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">フリガナ</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setHuriganaName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">団体名</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">郵便番号</label>
                                <input
                                    type="text"
                                    className="w-40 border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setPostalNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">住所</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">電話番号</label>
                                <input
                                    type="tel"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">メールアドレス</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                />
                            </div>
                            <div className="mt-8">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!sameAsCustomer}
                                        onChange={() => {
                                            setSameAsCustomer(!sameAsCustomer);
                                            setIsModalOpen(!isModalOpen);
                                        }}
                                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="text-sm font-bold">発送先情報</span>
                                </label>
                                <p className="text-xs mt-1">発送先が購入者と同じ場合は、チェックを入れたままにしてください</p>
                            </div>
                            {isModalOpen && (
                                <>
                                    <div className="flex items-center">
                                        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                                            <h2 className="text-lg font-bold mb-4">発送先情報</h2>

                                            <label className="block text-sm font-medium mb-2">お名前</label>
                                            <input
                                                type="text"
                                                className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-blue-500 focus:border-blue-500"
                                                value={shippingName}
                                                onChange={(e) => setShippingName(e.target.value)}
                                            />

                                            <label className="block text-sm font-medium mb-2">郵便番号</label>
                                            <input
                                                type="text"
                                                className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-blue-500 focus:border-blue-500"
                                                value={shippingPostalNumber}
                                                onChange={(e) => setShippingPostalNumber(e.target.value)}
                                            />

                                            <label className="block text-sm font-medium mb-2">ご住所</label>
                                            <input
                                                type="text"
                                                className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-blue-500 focus:border-blue-500"
                                                value={shippingAddress}
                                                onChange={(e) => setShippingAddress(e.target.value)}
                                            />

                                            <label className="block text-sm font-medium mb-2">電話番号</label>
                                            <input
                                                type="tel"
                                                className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-blue-500 focus:border-blue-500"
                                                value={shippingPhoneNumber}
                                                onChange={(e) => setShippingPhoneNumber(e.target.value)}
                                            />
                                            <button
                                                className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600"
                                                onClick={() => setIsModalOpen(!isModalOpen)}
                                            >
                                                閉じる
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Order Details Section */}
                    <div>
                        <div className="border border-gray-300 rounded-sm p-4">
                            <h2 className="text-lg font-bold mb-4">ご注文内容</h2>

                            <div className="mb-4">
                                <div className="grid grid-cols-3 text-sm font-bold mb-2">
                                    <div>商品</div>
                                    <div className="text-center">数量</div>
                                    <div className="text-right">小計</div>
                                </div>
                                {goods.map((good, index) => (
                                    <div key={index} className="grid grid-cols-3 text-sm mb-2 border-t border-gray-300 pt-2">
                                        <div className='font-medium text-base'>{good.flagtype}</div>
                                        <div className="text-center">{good.amount}</div>
                                        <div className="text-right">¥{formatNumber(MASK_IMAGES[good.index].price)}</div>
                                    </div>
                                ))}
                                <div className="grid grid-cols-3 text-sm font-bold border-y border-gray-300 py-2">
                                    <div>合計</div>
                                    <div className="text-center">{totalCount}</div>
                                    <div className="text-right">¥{formatNumber(totalPrice)}</div>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm">
                                <h3 className="font-bold">注意事項</h3>
                                <p className="flex items-center flex-wrap text-sm">
                                    ※納期は、お支払い完了後、弊社がフラッグのデザインデータを受領し、お客様が注文デザインに同意を頂いた日から2ヶ月後です。
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm1}
                                            onChange={() => setConfirm1(!confirm1)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-1"
                                        />
                                    </label>
                                    理解しました
                                </p>
                                <p className="flex items-center flex-wrap text-sm">
                                    <span>
                                        ※印刷工程の仕組み上、表裏で印刷のズレ（3cm未満）や若干の印刷ムラが発生することがございますことご了承ください。
                                    </span>
                                    <div className="flex flex-col">
                                        <a href="https://bremen.co.jp/digital_flag/wp-content/uploads/print_zure-scaled.jpeg" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            参考画像を見る
                                        </a>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={confirm2}
                                                onChange={() => setConfirm2(!confirm2)}
                                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-2"
                                            />
                                            理解しました
                                        </label>
                                    </div>
                                </p>

                                <p className='flex items-center flex-wrap text-sm'>
                                    ※ブレーメンデジタルフラッグはチャイナシルクを使用しております。ご使用の環境下によっては、生地の破れやほつれなどがすぐに発生する可能性がありますが、商品の品質に起因するものではありません。
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm3}
                                            onChange={() => setConfirm3(!confirm3)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-1"
                                        />
                                    </label>
                                    理解しました
                                </p>
                                <p className='flex items-center flex-wrap text-sm'>
                                    ※国際情勢、自然災害、輸送事故、税関の規制などによる納期遅延が生じた場合の、二次的に発生する損害につきまして、弊社はその責任を一切負いません。
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm4}
                                            onChange={() => setConfirm4(!confirm4)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-1"
                                        />
                                    </label>
                                    理解しました
                                </p>
                                <p className='flex items-center flex-wrap text-sm'>
                                    <span>※万が一印刷不良が発生した場合、再印刷手配となるため、納期がさらに遅れる可能性があります。発注の時期によっては本番に間に合わない可能性もあります。納期には余裕をもってご発注くださいますよう、よろしくお願いいたします。<a href="https://bremen.co.jp/digital_flag/flow/#schedule" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">納期スケジュールを確認する</a></span>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm5}
                                            onChange={() => setConfirm5(!confirm5)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-1"
                                        />
                                    </label>
                                    理解しました
                                </p>
                            </div>

                            <div className="mt-8 text-left">
                                <p className="text-sm mb-2 font-bold">ご注文確定後、振込先情報が記載されたメールが届きます。</p>
                                <p className="text-sm mb-4 font-bold">ご注文内容をご確認の上、お支払い手続きをお願いいたします。</p>
                                <button
                                    className={`w-full ${isButtonActive ? 'bg-[#f15642] hover:bg-[#d64836]' : 'bg-gray-400'}  text-white py-3 rounded  transition-colors`}
                                    disabled={!isButtonActive}
                                    onClick={sendDeliveryData}
                                >
                                    注文を確定する
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

