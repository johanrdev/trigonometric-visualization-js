(() => {
  const year = document.getElementById('year')
  const canvas = document.querySelector('canvas');
  const degProperty = document.getElementById('deg');
  const radProperty = document.getElementById('rad');
  const sinProperty = document.getElementById('sin');
  const cosProperty = document.getElementById('cos');
  const tanProperty = document.getElementById('tan');
  const cscProperty = document.getElementById('csc');
  const secProperty = document.getElementById('sec');
  const cotProperty = document.getElementById('cot');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.width;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * .8;
  const step = .25;
  year.innerHTML = (new Date()).getFullYear();

  const setup = () => {
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
  const radiansToDegrees = (radians) => radians * 180 / Math.PI;

  const update = (angle) => {
    const radians = degreesToRadians(angle);
    clear();
    setup();

    if (angle >= 360) angle = 0

    drawSine(radians, '#78716c', 2);
    drawCosine(radians, '#78716c', 2);
    drawTangent(radians, '#78716c', 2);
    drawSecant(radians, '#78716c', 2);
    drawCosecant(radians, '#78716c', 2);
    drawCotangent(radians, '#78716c', 2);
    drawRadius(radians, '#0f766e', 6);

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

    degProperty.innerHTML = angle.toFixed(0);
    radProperty.innerHTML = radians.toFixed(4);
    sinProperty.innerHTML = Math.sin(radians).toFixed(4);
    cosProperty.innerHTML = Math.cos(radians).toFixed(4);
    tanProperty.innerHTML = Math.tan(radians).toFixed(4);
    cscProperty.innerHTML = (1 / Math.sin(radians)).toFixed(4);
    secProperty.innerHTML = (1 / Math.cos(radians)).toFixed(4);
    cotProperty.innerHTML = (1 / Math.tan(radians)).toFixed(4);

    window.requestAnimationFrame(() => update(angle + step));
  }

  setup();
  update(0);
})();