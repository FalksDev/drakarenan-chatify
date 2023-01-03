type Props = {
    children: React.ReactNode;
    classes?: string;
}

export const SidebarLayout = ({ children, classes } : Props) => {
    return <div 
        className={`
            h-full bg-zinc-800 flex flex-col w-60 md:w-80 bg-opacity-70 border-r border-opacity-20 border-slate-200
            ${classes}`}>{children}</div>
}