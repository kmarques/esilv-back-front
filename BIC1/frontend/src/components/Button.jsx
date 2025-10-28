export default function Button({
  component: Component = "button",
  title,
  onClick,
  style,
  variant,
  ...rest
}) {
  function handleClick(event) {
    onClick?.(event);
  }
  const defaultStyle = {
    ...(style ?? {}),
  };

  switch (variant) {
    case "delete":
      defaultStyle.backgroundColor = "red";
      break;
    case "icon":
      defaultStyle.borderRadius = "50%";
      defaultStyle.width = "50px";
      defaultStyle.minWidth = "50px";
      defaultStyle.maxWidth = "50px";
      defaultStyle.height = "50px";
      defaultStyle.minHeight = "50px";
      defaultStyle.maxHeight = "50px";
      defaultStyle.overflow = "hidden";
      title = title.slice(0, 1);
      break;
  }
  return (
    <Component
      className="button"
      onClick={handleClick}
      style={defaultStyle}
      {...rest}
      value={Component === "input" ? title : undefined}
    >
      {Component !== "input" ? title : undefined}
    </Component>
  );
}
