import type {HTMLAttributes} from "react";

const FormContainer = ( { children } : HTMLAttributes<HTMLDivElement> ) => {
    return (
        <div className="max-w-4xl mx-auto border border-gray-300 rounded-md p-4">
            { children }
        </div>
    )
}

export default FormContainer;