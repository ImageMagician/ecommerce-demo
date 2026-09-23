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
            <div id="qty" className={`flex gap-1 p-2 rounded-md bg-gray-200 ${ product.countInStock === 0 && 'hidden' }`}>
                <div className="leading-9 text-sm uppercase mr-2 text-gray-600">
                    QTY:
                </div>
                <button type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded px-2 py-1 disabled:bg-gray-300 cursor-pointer"
                        disabled={ qty === 1 }
                        onClick={subtractQty}
                >
                    –
                </button>
                <input type="text"
                       value={qty}
                       className="border border-gray-200 bg-white px-2 py-1 w-10 text-center rounded"
                       onChange={(e) => changeQty(e)}
                />
                <button type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white uppercase text-sm font-semibold rounded px-2 py-1 disabled:bg-gray-300 cursor-pointer"
                        onClick={addQty}
                        disabled={ qty >= product.countInStock }
                >
                    +
                </button>
            </div>
    )
}

export default QtyPicker;