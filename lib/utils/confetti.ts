import confetti from "canvas-confetti";

export const celebrateCompletion = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const confettiColors = ["#22c55e", "#3b82f6", "#f43f5e", "#a855f7"];

  const confettiInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(confettiInterval);
      return;
    }

    // Left side burst
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: confettiColors,
      shapes: ["circle", "square"],
      scalar: 2,
    });

    // Right side burst
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: confettiColors,
      shapes: ["circle", "square"],
      scalar: 2,
    });
  }, 150);

  return () => clearInterval(confettiInterval);
};
