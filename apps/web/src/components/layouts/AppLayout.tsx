import React, { FC } from 'react'

export const AppLayout: FC<React.PropsWithChildren> = ({
    children
}) => {
    return (
    <div className="bg-zinc-900 h-screen flex">
        {children}
    </div>
    )
}
