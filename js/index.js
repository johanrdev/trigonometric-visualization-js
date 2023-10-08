(() => {
  const container = document.getElementById('canvas-container')
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = canvas.width;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * .8;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
})();