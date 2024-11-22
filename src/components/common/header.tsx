const Header = ({ COST: designcost }: { COST: number }) => {
    return (
        <div className="bg-[#7cb342] h-11 flex w-full items-center justify-between p-2">
            <h1 className="font-bold ">DESIGN SERVICE</h1>
            <div className="flex gap-2 items-center">
                <p className="text-white">${designcost}</p> {/* Display cost here */}
                <div className="w-4 h-4">
                    <img src="https://designstudio.dshowcase.com/wp-content/plugins/lumise/assets/images/cart.svg" alt="Cart" />
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-slate-700 rounded"><p className="text-xs font-semibold text-white">ADD TO CART</p></button>
                    <button className="p-2 bg-slate-700 rounded"><p className="text-xs font-semibold text-white">BACK TO SHOP</p></button>
                </div>
            </div>
        </div>
    )
}

export default Header;
