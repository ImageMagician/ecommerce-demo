import type {HTMLAttributes} from "react";

const FormContainer = ( { children } : HTMLAttributes<HTMLDivElement> ) => {
    return (
        <div className="max-w-xl mx-auto">
            { children }
        </div>
    )
}

export default FormContainer;