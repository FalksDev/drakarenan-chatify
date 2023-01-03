type Props = {
    children: React.ReactNode;
}

export const ConversationChannelLayout = ({ children } : Props) => {
    return (
        <div className="h-full flex flex-col grow flex-1 p-4 pr-7 pl-7">
            {children}
        </div>
    )
}