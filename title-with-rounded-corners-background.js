async function funcTitle({ width, height, fabric }) {
  // const font = new fabric.FontFace("[[fontFamily]]", "url([[fontUrl]])");
  // const loadedFont = await font.load();
  // document.fonts.add(loadedFont);
  async function onRender(progress, canvas) {
    const min = Math.min(width, height);
    function drawTextWithBackground(options) {
      const {
        text,
        fontFamily = "Arial",
        fontSize = 40,
        textColor = "black",
        backgroundColor = "blue",
        cornerRadius = 10,
        padding = 10,
        angle = 0,
        top = 0,
        lineHeight = 1,
        textWidth = canvas.width * 0.9,
      } = options;
      const fontSizeAbs = Math.round(min * fontSize);

      // Create the text object
      const textObj = new fabric.Textbox(text, {
        fontFamily,
        fontSize: fontSizeAbs,
        fill: textColor,
        // backgroundColor: 'blue',
        lineHeight,
        textAlign: "center",
        originX: "center",
        originY: "top",
        width: textWidth,
        top,
      });
      // Calculate and log the line height for each line
      const actualLineHeight = textObj.fontSize * textObj.lineHeight;
      // Optionally, log each line's top position
      const backgrounds = [];
      let currentTopOffset = 0;
      for (let i = 0; i < textObj._textLines.length; i++) {
        const lineWidth = textObj.getLineWidth(i);
        const thisLineHeight = textObj.getHeightOfLine(i);
        // const lineTop = topOffset + i * actualLineHeight;
        const backgroundObj = new fabric.Rect({
          width: lineWidth + padding * 2,
          height: actualLineHeight + padding,
          fill: backgroundColor,
          rx: cornerRadius, // Rounded corners
          ry: cornerRadius,
          originX: "center",
          originY: "top",
          left: 0,
          top: currentTopOffset + top - padding / 2, //lineTop + i,
        });
        backgrounds.push(backgroundObj);
        currentTopOffset += thisLineHeight;
      }
      const group = new fabric.Group([...backgrounds, textObj], {
        left: canvas.width / 2,
        top,
        originX: "center",
        originY: "top",
        // backgroundColor: "yellow",
        angle,
      });
      // Return group for future updates
      return group;
    }

    const textGroup = drawTextWithBackground({
      text: `[[title]]`,
      fontFamily: "[[fontFamily]]",
      fontSize: [[fontSize]],
      textColor: "[[textColor]]",
      backgroundColor: "[[backgroundColor]]",
      top: [[top]],
      cornerRadius: [[cornerRadius]],
      padding: [[padding]],
      angle: [[angle]],
    });

    canvas.add(textGroup);
  }

  function onClose() {
    // Cleanup if you initialized anything
  }

  return { onRender, onClose };
}
