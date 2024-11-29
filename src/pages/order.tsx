import React, { useState } from 'react';

export default function OrderForm() {
    const [sameAsCustomer, setSameAsCustomer] = useState(true);
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
                                <p className="text-xs mt-1">送先が購入者と同じ場合は、チェックを入れたままにしてください</p>
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
                                <p>※制作後は、お支払いのデータ後、弊社がフラッグのデザインデータを受領し、注文様のまたデザインに回答を頂いた日から2ヶ月有効です。□確認しました</p>
                                <p>※印刷工程の性質上と、若干文字抜けズレ（1cm 未満）や若干の印刷ムラが発生することがございますことをご了承ください。□確認しました</p>
                                <p>※プレーンデジタルフラッグはデザインデルが発展しております。ご使用の環境下によっては、生地の風合や色コントなどのデザインに発生する可能性がございます。製品の品質に起因するものではありません。□確認しました</p>
                                <p>※国際情勢、自然災害、輸送事情、税関の規制などによる納期遅延が生じた場合の、二次的に発生する損害につきまして、弊社はその責任を一切負いません。□確認しました</p>
                                <p>※カラー印刷ができが発生した場合、前日販売となるため、納期は5-6日遅れる可能性があります。弊社の判断によりご注文前に個にお伝えいたしません。時間には余裕をもってご検討くださいますよう、よろしくお願いいたします。□確認しました</p>
                            </div>

                            <div className="mt-8 text-left">
                                <p className="text-sm mb-2 font-bold">ご注文確定後、販売先情報が記載されたメールが届きます。</p>
                                <p className="text-sm mb-4 font-bold">ご注文内容をご確認の上、お支払い手続きをお願いいたします。</p>
                                <button className="w-full bg-[#f15642] text-white py-3 rounded hover:bg-[#d64836] transition-colors">
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

