const generateRandomColor = () => {
  let color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

  if (color === '#ffffff' || color === '#fff') {
    color = generateRandomColor();
  }

  return color;
};

export default generateRandomColor;
