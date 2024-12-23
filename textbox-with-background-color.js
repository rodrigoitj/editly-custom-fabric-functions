async function func(options) {
  const { width, height, duration, params, fabric } = options;
  const {
    text,
    textColor = "#ffffff",
    backgroundColor = "#000000",
    fontFamily = "sans-serif",
    position = "center",
    fontSize = 0.05,
    textWidth = 0.9,
    padding = 5,
    margin = {
      x: 0.05,
      y: 0.05,
    },
    angle = -2,
    opacity = 1,
    // delay = 0,
    speed = 1,
  } = params;

  const min = Math.min(width, height);
  function calculateGoalValue(
    progress,
    goalValue,
    progressionLength,
    totalLength
  ) {
    // Convert progress percentage to elapsed time in seconds.
    const elapsedTime = (progress / 100) * totalLength;

    // Determine the scaled time within the progressionLength.
    const scaledTime = Math.min(elapsedTime, progressionLength);

    // Calculate the progression value.
    const value = (scaledTime / progressionLength) * goalValue;

    // Cap the value to the goalValue.
    return Math.min(value, goalValue);
  }
  function getPositionProps({ position, width, height }) {
    let originY = "center";
    let originX = "center";
    let top = height / 2;
    let left = width / 2;
    if (position === "top") {
      originY = "top";
      top = height * margin.x;
    } else if (position === "bottom") {
      originY = "bottom";
      top = height * (1 - margin.y);
    } else if (position === "center") {
      originY = "center";
      top = height / 2;
    } else if (position === "top-left") {
      originX = "left";
      originY = "top";
      left = width * margin.x;
      top = height * margin.y;
    } else if (position === "top-right") {
      originX = "right";
      originY = "top";
      left = width * (1 - margin.x);
      top = height * margin.y;
    } else if (position === "center-left") {
      originX = "left";
      originY = "center";
      left = width * margin.x;
      top = height / 2;
    } else if (position === "center-right") {
      originX = "right";
      originY = "center";
      left = width * (1 - margin.x);
      top = height / 2;
    } else if (position === "bottom-left") {
      originX = "left";
      originY = "bottom";
      left = width * margin.x;
      top = height * (1 - margin.y);
    } else if (position === "bottom-right") {
      originX = "right";
      originY = "bottom";
      left = width * (1 - margin.x);
      top = height * (1 - margin.y);
    }

    if (position && position.x != null) {
      originX = position.originX || "left";
      left = width * position.x;
    }
    if (position && position.y != null) {
      originY = position.originY || "top";
      top = height * position.y;
    }

    return { originX, originY, top, left };
  }

  function drawTextWithBackground(options) {
    const {
      text,
      fontFamily = "Arial",
      fontSize = 0.1,
      textColor = "black",
      backgroundColor = "blue",
      textAlign = "center",
      padding = 10,
      angle = 0,
      lineHeight = 1,
      opacity = 1,
    } = options;

    const fontSizeAbs = Math.round(min * fontSize);
    const boxWidth = width * (textWidth - margin.x * 2);

    const props = getPositionProps({
      position,
      width,
      height,
    });
    // Create the text object
    const textObj = new fabric.Textbox(text, {
      fontFamily,
      fontSize: fontSizeAbs,
      fill: textColor,
      backgroundColor,
      padding,
      lineHeight,
      textAlign,
      originX: props.originX,
      originY: props.originY,
      top: props.top,
      left: props.left,
      width: boxWidth,
      angle,
      opacity,
    });
    return textObj;
  }

  async function onRender(progress, canvas) {
    console.log(options);
    const linear = calculateGoalValue(progress, opacity, speed, duration);
    const textBox = drawTextWithBackground({
      text,
      fontFamily,
      fontSize,
      textColor,
      backgroundColor,
      padding,
      angle,
      opacity: linear,
    });
    canvas.add(textBox);
  }

  function onClose() {
    // Cleanup if you initialized anything
  }

  return { onRender, onClose };
}
