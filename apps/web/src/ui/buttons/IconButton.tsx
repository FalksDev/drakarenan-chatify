type Props = {
    classes?: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

const IconButton = ({ classes, icon, onClick } : Props) => {
    return (
        <div
            onClick={onClick} 
            className="text-3xl hover:text-indigo-700 transition-all 300ms cursor-pointer">
            {icon}
        </div>
    )
}

export default IconButton;