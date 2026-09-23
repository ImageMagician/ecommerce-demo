import type { Product } from "../types";

interface QtyProps {
    product: Product,
    qty: number,
    addQty: () => void,
    subtractQty: () => void,
    changeQty: (e: any) => void,
}

const QtyPicker = ( { product, qty, addQty, subtractQty, changeQty  }: QtyProps ) => {
    return (
            <div id="qty" className={`flex items-center rounded-md ${ product.countInStock === 0 && 'hidden' }`}>
                <div className="leading-9 text-sm uppercase mr-2 text-gray-600">
                    QTY:
                </div>
                <button type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded-l-lg px-1.5 py-0.5 disabled:bg-gray-300 cursor-pointer"
                        disabled={ qty === 1 }
                        onClick={subtractQty}
                >
                    –
                </button>
                <input type="text"
                       value={qty}
                       className="border border-gray-200 bg-white  py-1 w-10 text-center text-xs"
                       onChange={ e => changeQty( parseInt( e.currentTarget.value, 10 ) ) }
                />
                <button type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded-r-lg px-1.5 py-0.5 disabled:bg-gray-300 cursor-pointer"
                        onClick={addQty}
                        disabled={ qty >= product.countInStock }
                >
                    +
                </button>
            </div>
    )
}

export default QtyPicker;