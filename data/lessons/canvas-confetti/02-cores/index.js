function updateFetti(ctx, x, y, scalar, color) {
	ctx.fillStyle = color;

	ctx.beginPath();

	ctx.moveTo(x, y);

	ctx.lineTo(x, y + scalar);
	ctx.lineTo(x + scalar, y + scalar);
	ctx.lineTo(x + scalar, y);

	ctx.closePath();
	ctx.fill();
}

function confetti({ scalar = 10, particleCount = 10 } = {}) {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");

	const origin = {
		x: 0.5,
		y: 0.5,
	};

	const colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];

	const startX = canvas.width * origin.x;
	const startY = canvas.height * origin.y;

	for (let i = 0; i < particleCount; i++) {
		updateFetti(
			ctx,
			startX,
			startY - i * scalar,
			scalar,
			colors[Math.floor(Math.random() * colors.length)]
		);
	}
}

confetti();
