function update(ctx, fettis, onDone) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	const remainingFettis = fettis.filter((fetti) => updateFetti(ctx, fetti));

	if (remainingFettis.length === 0) {
		onDone();
	} else {
		requestAnimationFrame(() => update(ctx, remainingFettis, onDone));
	}
}

function confetti({
	scalar = 10,
	particleCount = 10,
	ticks = 200,
	spread = 70,
	startVelocity = 10,
	angle = 90,
	gravity = 1,
	drift = 0,
	decay = 0.9,
} = {}) {
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
		const fetti = randomPhysics({
			x: startX,
			y: startY - i * scalar,
			scalar,
			color: colors[Math.floor(Math.random() * colors.length)],
			tick: 0,
			totalTicks: ticks,
			decay,
			spread,
			startVelocity,
			drift,
			gravity,
			angle,
		});

		fettiArray.push(fetti);
	}

	update(ctx, fettiArray, () => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	});
}

confetti({ particleCount: 15 });
