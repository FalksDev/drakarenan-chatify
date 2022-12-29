type Props = {
    classes?: string;
}

const Divider = ({ classes } : Props) => {
    return (
        <div className={`border-t border-slate-200 w-auto opacity-10 ${classes}`}>
        </div>
    )
}

export default Divider;