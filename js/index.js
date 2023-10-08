(() => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.width;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * .8;

  // Circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // Negative x-axis
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(0, centerY);
  ctx.setLineDash([15, 15]);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // Positive x-axis
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.setLineDash([15, 15]);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // Negative y-axis
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX, canvas.height);
  ctx.setLineDash([15, 15]);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // Positive y-axis
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX, 0);
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
})();