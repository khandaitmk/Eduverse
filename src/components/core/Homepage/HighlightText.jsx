const HighlightText= (props)=>{
    return (
        <span className=" font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
            {props.text}
        </span>
    )
};
export default HighlightText;