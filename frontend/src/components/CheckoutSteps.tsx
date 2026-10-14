import { Link } from "react-router-dom";

type CheckoutStepProps = {
    step1?: boolean;
    step2?: boolean;
    step3?: boolean;
    step4?: boolean;
}

const CheckoutSteps = ( { step1, step2, step3, step4 }: CheckoutStepProps ) => {
    return (
        <>
            <nav className="flex justify-center gap-3 mb-6">

                {
                    step1 ? (
                        <Link to="/login" className="bold-link mx-6">
                            Sign In
                        </Link>
                    ) : (
                        <div className="disabled-link mx-6">
                            Sign In
                        </div>
                    )
                }

                {
                    step2 ? (
                        <Link to="/shipping" className="bold-link mx-6">
                            Shipping
                        </Link>
                    ) : (
                        <div className="disabled-link mx-6">
                            Shipping
                        </div>
                    )
                }

                {
                    step3 ? (
                        <Link to="/payment" className="bold-link mx-6">
                            Payment
                        </Link>
                    ) : (
                        <div className="disabled-link mx-6">
                            Payment
                        </div>
                    )
                }

                {
                    step4 ? (
                        <Link to="/placeorder" className="bold-link mx-6">
                            Place Order
                        </Link>
                    ) : (
                        <div className="disabled-link mx-6">
                            Place Order
                        </div>
                    )
                }
            </nav>
        </>
    )
}

export default CheckoutSteps;