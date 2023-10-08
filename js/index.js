(() => {
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
  const radius = centerX * .6;
  const step = .5;

  const setup = () => {
    // Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Negative x-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(0, centerY);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Positive x-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Negative y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, canvas.height);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Positive y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, 0);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Origin
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * .035, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }

  const drawRadius = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineWidth = 6;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
  }

  const drawSine = (radians) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY
    );
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 5]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
  }

  const drawCosine = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius * Math.sin(radians));
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 5]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
  }

  const drawSecant = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * (1 / Math.cos(radians)), centerY);
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'purple';
    ctx.stroke();
    ctx.closePath();
  }

  const drawCosecant = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - radius * (1 / Math.sin(radians)));
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'teal';
    ctx.stroke();
    ctx.closePath();
  }

  const drawTangent = (radians) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians), 
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX + radius * (1 / Math.cos(radians)), 
      centerY
    );
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'pink';
    ctx.stroke();
    ctx.closePath();
  }

  const drawDot = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 
      6, 0, 2 * Math.PI
    );
    ctx.lineWidth = 1;
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'black';
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

    drawSine(radians);
    drawCosine(radians);
    drawTangent(radians);
    drawSecant(radians);
    drawCosecant(radians);
    drawRadius(radians);
    
    drawDot(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    drawDot(
      centerX + radius * Math.cos(radians),
      centerY
    );
    drawDot(
      centerX + radius * (1 / Math.cos(radians)), 
      centerY
    );
    drawDot(
      centerX, 
      centerY - radius * (1 / Math.sin(radians))
    );
    drawDot(centerX, centerY);

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