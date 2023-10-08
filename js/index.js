(() => {
  const setupCanvas = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.width;

    return {
      canvas,
      ctx
    }
  }

  const { canvas, ctx } = setupCanvas();

  const controls = {
    range: document.querySelector('input'),
    button: document.querySelector('button')
  }

  const elements = {
    deg: document.getElementById('deg'),
    rad: document.getElementById('rad'),
    sin: document.getElementById('sin'),
    cos: document.getElementById('cos'),
    tan: document.getElementById('tan'),
    csc: document.getElementById('csc'),
    sec: document.getElementById('sec'),
    cot: document.getElementById('cot')
  }

  const properties = {
    angle: 0,
    step: .6,
    radius: canvas.width / 3,
    origin: {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
    animating: true
  }

  const drawCircle = (angle) => {
    // Circle
    ctx.beginPath();
    ctx.arc(
      properties.origin.x, 
      properties.origin.y, 
      properties.radius, 
      0, 2 * Math.PI);
    ctx.fillStyle = '#e7e5e4';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Angle arc
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.arc(
      properties.origin.x, 
      properties.origin.y, 
      properties.radius * .165, 
      -degreesToRadians(angle), 0);
    ctx.lineWidth = 2;
    ctx.fillStyle = '#d6d3d1';
    ctx.fill();
    ctx.setLineDash([])
    ctx.strokeStyle = '#a8a29e';
    ctx.stroke();
    ctx.closePath();

    // Negative x-axis
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.lineTo(0, properties.origin.y);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Positive x-axis
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.lineTo(
      canvas.width, 
      properties.origin.y);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Negative y-axis
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.lineTo(
      properties.origin.x, 
      canvas.height);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();

    // Positive y-axis
    ctx.beginPath();
    ctx.moveTo(properties.origin.x, properties.origin.y);
    ctx.lineTo(properties.origin.x, 0);
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = '#78716c';
    ctx.stroke();
    ctx.closePath();
  }

  const drawRadius = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.lineTo(
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y - properties.radius * Math.sin(radians));
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawSine = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y - properties.radius * Math.sin(radians));
    ctx.lineTo(
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y);
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawCosine = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y - properties.radius * Math.sin(radians));
    ctx.lineTo(
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y - properties.radius * Math.sin(radians));
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawTangent = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y - properties.radius * Math.sin(radians));
    ctx.lineTo(
      properties.origin.x + properties.radius * (1 / Math.cos(radians)),
      properties.origin.y);
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawCosecant = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.lineTo(
      properties.origin.x, 
      properties.origin.y - properties.radius * (1 / Math.sin(radians)));
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawSecant = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x, 
      properties.origin.y);
    ctx.lineTo(
      properties.origin.x + properties.radius * (1 / Math.cos(radians)), 
      properties.origin.y);
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawCotangent = (radians, color, width) => {
    ctx.beginPath();
    ctx.moveTo(
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y - properties.radius * Math.sin(radians));
    ctx.lineTo(
      properties.origin.x,
      properties.origin.y - properties.radius * (1 / Math.sin(radians)));
    ctx.lineWidth = width;
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  const drawDot = (radius, x, y, fill, stroke, width) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.lineWidth = width;
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.setLineDash([]);
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.closePath();
  }

  const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
  const degreesToRadians = (degrees) => degrees * Math.PI / 180;

  const updateFrame = (angle) => {
    const radians = degreesToRadians(angle);
    clearCanvas();
    drawCircle(angle);

    if (angle > 359) angle = 0;

    drawSine(radians, '#14b8a6', 2);
    drawCosine(radians, '#14b8a6', 2);
    drawTangent(radians, '#f43f5e', 2);
    drawSecant(radians, '#818cf8', 4);
    drawCosecant(radians, '#818cf8', 4);
    drawCotangent(radians, '#f43f5e', 2);
    drawRadius(radians, '#14b8a6', 4);

    // (cosθ, sinθ)
    drawDot(8,
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y - properties.radius * Math.sin(radians),
      '#14b8a6', '#78716c', 1);

    // (0, sinθ)
    drawDot(8,
      properties.origin.x,
      properties.origin.y - properties.radius * Math.sin(radians),
      '#14b8a6', '#78716c', 1);

    // (cosθ, 0)
    drawDot(8,
      properties.origin.x + properties.radius * Math.cos(radians),
      properties.origin.y,
      '#14b8a6', '#78716c', 1);

    // (secθ, 0)
    drawDot(8,
      properties.origin.x + properties.radius * (1 / Math.cos(radians)),
      properties.origin.y,
      '#14b8a6', '#78716c', 1);

    // (0, cscθ)
    drawDot(8,
      properties.origin.x,
      properties.origin.y - properties.radius * (1 / Math.sin(radians)),
      '#14b8a6', '#78716c', 1);

    // (0, 0)
    drawDot(8,
      properties.origin.x,
      properties.origin.y,
      '#14b8a6', '#78716c', 1);

    elements.deg.innerHTML = angle.toFixed(0);
    elements.rad.innerHTML = radians.toFixed(4);
    elements.sin.innerHTML = Math.sin(radians).toFixed(4);
    elements.cos.innerHTML = Math.cos(radians).toFixed(4);
    elements.tan.innerHTML = Math.tan(radians).toFixed(4);
    elements.csc.innerHTML = (1 / Math.sin(radians)).toFixed(4);
    elements.sec.innerHTML = (1 / Math.cos(radians)).toFixed(4);
    elements.cot.innerHTML = (1 / Math.tan(radians)).toFixed(4);

    properties.angle = angle;
    controls.range.value = angle;

    if (properties.animating) {
      window.requestAnimationFrame(() => updateFrame(angle + properties.step));
    }
  }

  const Play = () => {
    properties.animating = true;
    controls.button.innerHTML = 'Stop'
  };

  const Stop = () => {
    properties.animating = false;
    controls.button.innerHTML = 'Play'
  };

  controls.range.addEventListener('input', (event) => {
    Stop();

    updateFrame(parseInt(event.target.value));
  })

  controls.button.addEventListener('click', () => {
    if (properties.animating) {
      Stop();
    } else {
      Play();
    }

    updateFrame(properties.angle);
  })

  drawCircle();
  updateFrame(properties.angle);
})();