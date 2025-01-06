const OrderConfirmation = () => {
    return (
        <div className="flex h-screen justify-center items-center text-center">
            <div className="p-8 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 pb-5">
                    ご注文ありがとうございます。
                </h2>
                <p className="mt-2 text-gray-700">
                    確認メールがご登録のメールアドレス宛に送信されていますので、ご確認ください。
                </p>
                <p className="mt-2 text-gray-700">
                    送信メールアドレス：
                    <span className="text-blue-500 underline">
                        bremen.digital.flag@gmail.com
                    </span>
                </p>
            </div>
        </div>
    );
};

export default OrderConfirmation;
