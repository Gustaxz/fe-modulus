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
		wobble: Math.random() * 10,
		wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
		wobbleX: 0,
		wobbleY: 0,
		random: Math.random() + 2,
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

	fetti.wobble += fetti.wobbleSpeed;
	fetti.wobbleX = x + 10 * scalar * Math.cos(fetti.wobble);
	fetti.wobbleY = y + 10 * scalar * Math.sin(fetti.wobble);

	const x1 = fetti.x + fetti.random;
	const y1 = fetti.y + fetti.random;
	const x2 = fetti.wobbleX + fetti.random;
	const y2 = fetti.wobbleY + fetti.random;

	ctx.beginPath();

	ctx.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));

	ctx.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
	ctx.lineTo(Math.floor(x2), Math.floor(y2));
	ctx.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));

	ctx.closePath();
	ctx.fill();

	fetti.tick++;
	return fetti.tick < totalTicks;
}
