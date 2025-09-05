function confetti({ scalar = 10 } = {}) {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");

	const origin = {
		x: 0.5,
		y: 0.5,
	};

	const startX = canvas.width * origin.x;
	const startY = canvas.height * origin.y;

	ctx.fillStyle = "#FF0000";

	ctx.beginPath();

	ctx.moveTo(startX, startY);

	ctx.lineTo(startX, startY + scalar);
	ctx.lineTo(startX + scalar, startY + scalar);
	ctx.lineTo(startX + scalar, startY);

	ctx.closePath();
	ctx.fill();
}

confetti();
