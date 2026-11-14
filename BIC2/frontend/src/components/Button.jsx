export default function Button({
    content,
    onClick,
    component: Component = "button",
    className = "",
    ...otherProps
}) {
    return <Component onClick={onClick} className={"button " + className} {...otherProps}>
        {content}
    </Component>
}