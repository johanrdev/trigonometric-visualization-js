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

  // x-axis
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.setLineDash([12, 10]);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // y-axis
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.setLineDash([12, 10]);
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