import { useEffect, useState } from 'react';

export default function OrderForm() {
    const [sameAsCustomer, setSameAsCustomer] = useState(false);
    const [confirm1, setConfirm1] = useState(false);
    const [confirm2, setConfirm2] = useState(false);
    const [confirm3, setConfirm3] = useState(false);
    const [confirm4, setConfirm4] = useState(false);
    const [confirm5, setConfirm5] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        setIsButtonActive(confirm1 && confirm2 && confirm3);
    }, [confirm1, confirm2, confirm3, confirm4, confirm5]);
    
    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="border border-gray-300 rounded-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Customer Information Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-6">購入者情報</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">氏名</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">フリガナ</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">団体名</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">郵便番号</label>
                                <input
                                    type="text"
                                    className="w-40 border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">住所</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">電話番号</label>
                                <input
                                    type="tel"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">メールアドレス</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 p-2 rounded-sm"
                                />
                            </div>
                            <div className="mt-8">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={sameAsCustomer}
                                        onChange={() => setSameAsCustomer(!sameAsCustomer)}
                                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="text-sm font-bold">発送先情報</span>
                                </label>
                                <p className="text-xs mt-1">発送先が購入者と同じ場合は、チェックを入れたままにしてください</p>
                            </div>
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

                                <div className="grid grid-cols-3 text-sm mb-2 border-t border-gray-300 pt-2">
                                    <div className='font-medium text-base'>レギュラーフラッグ</div>
                                    <div className="text-center">x</div>
                                    <div className="text-right">¥xxxx</div>
                                </div>

                                <div className="grid grid-cols-3 text-sm mb-2 border-t border-gray-300 pt-2">
                                    <div className='font-medium text-base'>レギュラーフラッグ</div>
                                    <div className="text-center">x</div>
                                    <div className="text-right">¥xxxx</div>
                                </div>

                                <div className="grid grid-cols-3 text-sm font-bold border-y border-gray-300 py-2">
                                    <div>合計</div>
                                    <div className="text-center">x</div>
                                    <div className="text-right">¥xxxx</div>
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
                                    ※印刷工程の仕組み上、表裏で印刷のズレ（3cm未満）や若干の印刷ムラが発生することがございますことご了承ください。（参考画像を見る）
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm2}
                                            onChange={() => setConfirm2(!confirm2)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-1"
                                        />
                                    </label>
                                    理解しました
                                </p>
                                <p className='flex items-center flex-wrap text-sm'>
                                    ※ブレーメンデジタルフラッグはチャイナシルクを使用しております。ご使用の環境下によっては、生地の破れやほつれなどがすぐに発生する可能性がありますが、商品の品質に起因するものではありません。
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm2}
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
                                            checked={confirm3}
                                            onChange={() => setConfirm4(!confirm4)}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-1"
                                        />
                                    </label>
                                    理解しました
                                </p>
                                <p className='flex items-center flex-wrap text-sm'>
                                    ※万が一印刷不良が発生した場合、再印刷手配となるため、納期がさらに遅れる可能性があります。発注の時期によっては本番に間に合わない可能性もあります。納期には余裕をもってご発注くださいますよう、よろしくお願いいたします。（納期スケジュールを確認する）
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={confirm4}
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
                                    disabled={!isButtonActive}>
                                    onClick={}
                                    {/* {isButtonActive ? '注文を確定する' :} */}
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

