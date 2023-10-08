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
  const radius = centerX * .4;
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

  const drawOpposite = (radians) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY
    );
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();
  }

  const drawAdjacent = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY
    );
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'green';
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

    drawRadius(radians);
    drawOpposite(radians);
    drawAdjacent(radians);
    
    drawDot(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    drawDot(
      centerX + radius * Math.cos(radians),
      centerY
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

    // window.requestAnimationFrame(() => update(angle + step));
  }

  setup();
  update(45);
})();