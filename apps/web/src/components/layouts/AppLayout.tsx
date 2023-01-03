import React, { FC } from 'react'

export const AppLayout: FC<React.PropsWithChildren> = ({
    children
}) => {
    return (
    <div className="bg-black h-screen w-screen text-zinc-200 flex flex-row">
        {children}
    </div>
    )
}
