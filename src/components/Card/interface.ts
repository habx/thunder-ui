import * as React from "react";

export default interface CardProps {
    title?: string
    subtitle?: string,
    interactive?: boolean,
    children?: React.ReactNode
}
