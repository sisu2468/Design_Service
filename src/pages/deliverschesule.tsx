export default function DeliverySchedule() {
    const scheduleData = [
        { orderPeriod: "1月1日～31日までの場合", deliveryDate: "3月末頃" },
        { orderPeriod: "2月1日～28日までの場合", deliveryDate: "4月末頃" },
        { orderPeriod: "3月1日～31日までの場合", deliveryDate: "5月末頃" },
        { orderPeriod: "4月1日～30日までの場合", deliveryDate: "6月末頃" },
        { orderPeriod: "5月1日～31日までの場合", deliveryDate: "7月末頃" },
        { orderPeriod: "6月1日～30日までの場合", deliveryDate: "8月末頃" },
        { orderPeriod: "7月1日～31日までの場合", deliveryDate: "9月末頃" },
        { orderPeriod: "8月1日～15日までの場合", deliveryDate: "10月15日頃" },
        { orderPeriod: "8月16日～31日までの場合", deliveryDate: "10月末頃" },
        { orderPeriod: "9月1日～15日までの場合", deliveryDate: "11月15日頃" },
        { orderPeriod: "9月16日～30日までの場合", deliveryDate: "11月末頃" },
        { orderPeriod: "10月1日～31日までの場合", deliveryDate: "12月末頃" },
        { orderPeriod: "11月1日～30日までの場合", deliveryDate: "1月末頃" },
        { orderPeriod: "12月1日～31日までの場合", deliveryDate: "2月末頃" },
    ]

    return (
        <div className="max-w-3xl mx-auto py-7">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="bg-gray-200 p-4 text-left border border-gray-300 font-normal">
                            正式発注日
                        </th>
                        <th className="bg-gray-200 p-4 text-left border border-gray-300 font-normal">
                            納品予定日
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.map((row, index) => (
                        <tr key={index}>
                            <td className="p-4 border border-gray-300 relative">
                                {row.orderPeriod}
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                    →
                                </span>
                            </td>
                            <td className="p-4 border border-gray-300">{row.deliveryDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

