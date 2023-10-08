(() => {
  const year = document.getElementById('year')
  const canvas = document.querySelector('canvas');
  const properties = {
    deg: document.getElementById('deg'),
    rad: document.getElementById('rad'),
    sin: document.getElementById('sin'),
    cos: document.getElementById('cos'),
    tan: document.getElementById('tan'),
    csc: document.getElementById('csc'),
    sec: document.getElementById('sec'),
    cot: document.getElementById('cot')
  }
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.width;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * .5;
  const step = .6;
  year.innerHTML = (new Date()).getFullYear();

  const setup = (angle) => {
    // Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#e7e5e4';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Angle arc
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius * .165, -degreesToRadians(angle), 0);
    ctx.lineWidth = 2;
    ctx.fillStyle = '#d6d3d1';
    ctx.fill();
    ctx.setLineDash([])
    ctx.strokeStyle = '#a8a29e';
    ctx.stroke();
    ctx.closePath();

    // Negative x-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(0, centerY);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Positive x-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Negative y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, canvas.height);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Positive y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, 0);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();
  }

  const drawRadius = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawSine = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY
    );
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawCosine = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius * Math.sin(radians));
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawTangent = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX + radius * (1 / Math.cos(radians)),
      centerY
    );
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawCosecant = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - radius * (1 / Math.sin(radians)));
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawSecant = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * (1 / Math.cos(radians)), centerY);
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawCotangent = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX,
      centerY - radius * (1 / Math.sin(radians))
    );
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawDot = (radius, x, y, fill, stroke, width) => {
    ctx.beginPath();
    ctx.arc(x, y,
      radius, 0, 2 * Math.PI
    );
    ctx.lineWidth = width;
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.setLineDash([]);
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.closePath();
  }

  const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
  const degreesToRadians = (degrees) => degrees * Math.PI / 180;
  // const radiansToDegrees = (radians) => radians * 180 / Math.PI;

  const update = (angle) => {
    const radians = degreesToRadians(angle);
    clear();
    setup(angle);

    if (angle >= 359) angle = 0;

    drawSine(radians, '#14b8a6', 2);
    drawCosine(radians, '#14b8a6', 2);
    drawTangent(radians, '#f43f5e', 2);
    drawSecant(radians, '#818cf8', 4);
    drawCosecant(radians, '#818cf8', 4);
    drawCotangent(radians, '#f43f5e', 2);
    drawRadius(radians, '#14b8a6', 4);

    // (cosθ, sinθ)
    drawDot(
      8,
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians),
      '#14b8a6',
      '#78716c',
      1
    );

    // (0, sinθ)
    drawDot(
      8,
      centerX,
      centerY - radius * Math.sin(radians),
      '#14b8a6',
      '#78716c',
      1
    );

    // (cosθ, 0)
    drawDot(
      8,
      centerX + radius * Math.cos(radians),
      centerY,
      '#14b8a6',
      '#78716c',
      1
    );

    // (secθ, 0)
    drawDot(
      8,
      centerX + radius * (1 / Math.cos(radians)),
      centerY,
      '#14b8a6',
      '#78716c',
      1
    );

    // (0, cscθ)
    drawDot(
      8,
      centerX,
      centerY - radius * (1 / Math.sin(radians)),
      '#14b8a6',
      '#78716c',
      1
    );

    // (0, 0)
    drawDot(
      8,
      centerX,
      centerY,
      '#14b8a6',
      '#78716c',
      1
    );

    properties.deg.innerHTML = angle.toFixed(0);
    properties.rad.innerHTML = radians.toFixed(4);
    properties.sin.innerHTML = Math.sin(radians).toFixed(4);
    properties.cos.innerHTML = Math.cos(radians).toFixed(4);
    properties.tan.innerHTML = Math.tan(radians).toFixed(4);
    properties.csc.innerHTML = (1 / Math.sin(radians)).toFixed(4);
    properties.sec.innerHTML = (1 / Math.cos(radians)).toFixed(4);
    properties.cot.innerHTML = (1 / Math.tan(radians)).toFixed(4);

    window.requestAnimationFrame(() => update(angle + step));
  }

  setup();
  update(0);
})();