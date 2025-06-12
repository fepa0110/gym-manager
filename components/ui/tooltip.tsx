interface TooltipProps{
    text: string;
}

export const Tooltip = ({text} : TooltipProps) => {
    return(
        <span className="tooltip px-2 py-1 -translate-x-5 -translate-y-8 text-sm text-zinc-200 bg-zinc-800/90 backdrop-sm border border-zinc-800 rounded-md">{text}</span>
    )
}