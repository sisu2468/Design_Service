import { ILayer, IPoint } from "../constants/interfaces";

export class Icon {
    private image: HTMLImageElement;

    constructor(src: string) {
        const image = new Image();
        this.image = image;
        image.src = src;
    }

    render(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.drawImage(this.image, x, y);
    }
}

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = src;
});

const isLeft = (p1: IPoint, p2: IPoint, p: IPoint) => {
    return (p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x) > 0;
}


const isContain = (points: IPoint[], point: IPoint) => {
    for (let i = 0; i < points.length; i++) {
        if (!isLeft(points[i], points[i == points.length - 1 ? 0 : i + 1], point))
            return false;
    }
    return true;
}

const getTransformedPoint = (point: IPoint, position: IPoint, scale: IPoint, rotation: number) => {
    const scaledX = point.x * scale.x;
    const scaledY = point.y * scale.y;

    const rotatedX = scaledX * Math.cos(rotation) - scaledY * Math.sin(rotation);
    const rotatedY = scaledX * Math.sin(rotation) + scaledY * Math.cos(rotation);

    const transformedX = rotatedX + position.x;
    const transformedY = rotatedY + position.y;

    return { x: transformedX, y: transformedY };
}

const getLayerTransformedPoints = (layer: ILayer) => {
    const points: IPoint[] = [
        { x: -layer.width / 2, y: -layer.height / 2 },
        { x: layer.width / 2, y: -layer.height / 2 },
        { x: layer.width / 2, y: layer.height / 2 },
        { x: -layer.width / 2, y: layer.height / 2 },
    ];
    const transformedPoints = points.map(point => getTransformedPoint(point, layer.position, layer.scale, layer.rotation));
    return transformedPoints;
}

const isInBox = (lt: IPoint, size: number, point: IPoint) => {
    return point.x >= lt.x - size / 2 && point.x <= lt.x + size / 2 && point.y >= lt.y - size / 2 && point.y <= lt.y + size / 2;
}

const calculateRotationAngle = (center: IPoint, topRight: IPoint, p: IPoint) => {
    const p1 = { x: topRight.x - center.x, y: topRight.y - center.y };
    const p2 = { x: p.x - center.x, y: p.y - center.y };
    return Math.atan2(p2.y, p2.x) - Math.atan2(p1.y, p1.x);
}

const calculateScale = (center: IPoint, bottomRight: IPoint, p: IPoint) => {
    const p2 = { x: p.x - center.x, y: p.y - center.y };
    return { x: p2.x / bottomRight.x, y: p2.y / bottomRight.y };
}

export { calculateRotationAngle, calculateScale, getLayerTransformedPoints, getTransformedPoint, isContain, isInBox, isLeft, loadImage };
