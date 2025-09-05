function updateFetti(ctx, fetti) {
	const { x, y, scalar, color, totalTicks } = fetti;

	const progress = fetti.tick / totalTicks;
	const opacity = 1 - progress;
	ctx.fillStyle = `${color}${Math.floor(opacity * 255)
		.toString(16)
		.padStart(2, "0")}`;

	ctx.beginPath();

	ctx.moveTo(x, y);

	ctx.lineTo(x, y + scalar);
	ctx.lineTo(x + scalar, y + scalar);
	ctx.lineTo(x + scalar, y);

	ctx.closePath();
	ctx.fill();

	fetti.tick++;
	return fetti.tick < totalTicks;
}

function update(ctx, fettis, onDone) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	const remainingFettis = fettis.filter((fetti) => updateFetti(ctx, fetti));

	if (remainingFettis.length === 0) {
		onDone();
	} else {
		requestAnimationFrame(() => update(ctx, remainingFettis, onDone));
	}
}

function confetti({ scalar = 10, particleCount = 10, ticks = 200 } = {}) {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");

	const origin = {
		x: 0.5,
		y: 0.5,
	};

	const colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];

	const startX = canvas.width * origin.x;
	const startY = canvas.height * origin.y;

	const fettiArray = [];
	for (let i = 0; i < particleCount; i++) {
		fettiArray.push({
			x: startX,
			y: startY - i * scalar,
			scalar,
			color: colors[Math.floor(Math.random() * colors.length)],
			tick: 0,
			totalTicks: ticks,
		});
	}

	update(ctx, fettiArray, () => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	});
}

confetti();
