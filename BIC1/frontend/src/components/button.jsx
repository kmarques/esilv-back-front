export default function MyButton({
    color,
    content,
    handleClick,
    component: ButtonComponent = "button",
    ...otherProps
}) {
    return <ButtonComponent
        onClick={handleClick}
        style={{ color }}
        {...otherProps}
        className="button"
    >
        {content}
    </ButtonComponent>
}