import React, { FC } from 'react'

export const AppLayout: FC<React.PropsWithChildren> = ({
    children
}) => {
    return (
    <div className="bg-zinc-900 h-screen text-zinc-200 flex flex-row">
        {children}
    </div>
    )
}
