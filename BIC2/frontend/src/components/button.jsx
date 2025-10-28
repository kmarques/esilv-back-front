export default function Button({
  onClick,
  title,
  style,
  variant,
  component: Component = "button",
  children,
  ...otherProps
}) {
  function handleClick(e) {
    onClick?.(e);
  }

  const defaultStyle = {
    backgroundColor: "blue",
    color: "red",
    borderRadius: 30,
    padding: 10,
    border: "1px green dashed",
    ...(style ?? {}),
  };

  switch (variant) {
    case "icon":
      defaultStyle.borderRadius = "50%";
      defaultStyle.width = 50;
      defaultStyle.height = 50;
      defaultStyle.overflow = "hidden";
      title = title.slice(0, 1);
  }

  if (Component !== "input") {
    otherProps.children = title ?? children;
  } else {
    otherProps.value = title ?? children;
  }

  return (
    <Component onClick={handleClick} style={defaultStyle} {...otherProps} />
  );
}
