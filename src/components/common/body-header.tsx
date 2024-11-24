type NumberCountProps = {
    productnumber: number;
    setProductNumber: (num: number) => void;  // Define the type of setProductNumber function
};

export default function BodyHeader({ productnumber }: NumberCountProps) {

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div className="flex mt-12 justify-end gap-3 bg-[#3f4652] w-full border-b-[1px] border-gray-400 p-2">
            <div className="flex gap-2 items-center">
                <p className="text-white text-xl font-bold">¥{formatNumber(productnumber * 5390)}</p>
                <div className="w-6 h-6">
                    <img
                        src="https://designstudio.dshowcase.com/wp-content/plugins/lumise/assets/images/cart.svg"
                        alt="Cart"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 bg-gray-100 rounded">
                    <p className="text-xs font-medium text-black">カートに追加</p>
                </button>
                <button className="p-2 bg-gray-100 rounded">
                    <p className="text-xs font-medium text-black">チェックアウト</p>
                </button>
            </div>
        </div>
    )
}

