function randomPhysics(fetti) {
	const radAngle = fetti.angle * (Math.PI / 180);
	const radSpread = fetti.spread * (Math.PI / 180);

	return {
		...fetti,
		velocity: fetti.startVelocity * 0.5 + Math.random() * fetti.startVelocity,
		angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
		gravity: fetti.gravity * 3,
		drift: fetti.drift,
		decay: fetti.decay,
	};
}

function updateFetti(ctx, fetti) {
	fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
	fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
	fetti.velocity *= fetti.decay;

	const { x, y, scalar, color, totalTicks } = fetti;

	const progress = fetti.tick / totalTicks;
	const opacity = 1 - progress;
	ctx.fillStyle = `${color}${Math.floor(opacity * 255)
		.toString(16)
		.padStart(2, "0")}`;

	ctx.beginPath();

	ctx.moveTo(Math.floor(x), Math.floor(y));

	ctx.lineTo(x, y + scalar);
	ctx.lineTo(x + scalar, y + scalar);
	ctx.lineTo(x + scalar, y);

	ctx.closePath();
	ctx.fill();

	fetti.tick++;
	return fetti.tick < totalTicks;
}
