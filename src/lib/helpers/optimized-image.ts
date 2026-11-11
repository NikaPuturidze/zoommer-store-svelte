const widths = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export function optimizedImage(source: string, width: number) {
	const url = `https://zoommer.ge/_next/image?url=${encodeURIComponent(source)}`;
	const size = (target: number) =>
		widths.find((value) => value >= target) ?? widths[widths.length - 1];
	const small = `${url}&w=${size(width)}&q=50`;
	const large = `${url}&w=${size(width * 2)}&q=50`;

	return { src: large, srcset: `${small} 1x, ${large} 2x` };
}
