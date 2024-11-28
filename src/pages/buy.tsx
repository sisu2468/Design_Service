import Header from "../components/common/header"

export default function FlagBuy() {
    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-col justify-center items-center relative h-full">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="flex flex-col gap-4 items-center justify-center py-5 border-[1px] border-black">
                        <span className="text-black text-4xl font-extrabold">今注文すると <span className="text-[#FF0000] text-5xl font-bold">X</span> 月<span className="text-[#FF0000] text-5xl font-bold">X</span> 日 に発送予定</span>
                        <span className="text-black font-medium text-base">お届け予定日 (納期)の目安は、<a href="/delivery"><span className="text-blue-600">こちらのページ</span></a>をご確認ください。</span>
                    </div>
                    <div className="grid grid-cols-5 items-center text-right px-10">
                        <div className="w-36"></div>
                        <span>商品</span>
                        <span>金額</span>
                        <span>量</span>
                        <span>小計</span>
                    </div>
                    <div className="flex flex-col gap-4 items-center justify-center py-5 border-[1px] border-black"></div>
                </div>

            </div>

        </div>
    )
}