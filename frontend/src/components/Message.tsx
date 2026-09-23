import type { ReactNode } from "react";

const variantStyles = {
    info: "bg-blue-100 text-blue-800 border-blue-600",
    success: "bg-green-100 text-green-800 border-green-600",
    error: "bg-red-100 text-red-800 border-red-600",
}

type MessageVariant = "info" | "success" | "error"

interface MessageProps {
    classes?: string;
    variant?: MessageVariant;
    children?: ReactNode;
}

const Message = ({ classes="", variant="info", children }:MessageProps) => {

    return (
        <div className={`p-4 rounded-md shadow mb-4 border ${variantStyles[variant]} ${classes}`}>
            { children }
        </div>
    )
}

export default Message;