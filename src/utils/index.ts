import { ILayer, IPoint } from "../constants/interfaces";

const formatNumber = (num: number) => {
    return num.toLocaleString();
};

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
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

const calculateInverseMatrix = (matrix: number[][]) => {
    const [a, b, c] = matrix[0];
    const [d, e, f] = matrix[1];
    const [g, h, i] = matrix[2];

    const determinant = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

    const inverseMatrix = [
        [
            (e * i - f * h) / determinant,
            (c * h - b * i) / determinant,
            (b * f - c * e) / determinant
        ],
        [
            (f * g - d * i) / determinant,
            (a * i - c * g) / determinant,
            (c * d - a * f) / determinant
        ],
        [
            (d * h - e * g) / determinant,
            (b * g - a * h) / determinant,
            (a * e - b * d) / determinant
        ]
    ];

    return inverseMatrix;
}

const getTransformMatrix = (position: IPoint, scale: IPoint, rotation: number) => {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    return [
        [scale.x * cos, -sin, position.x],
        [sin, scale.y * cos, position.y],
        [0, 0, 1],
    ]
}

const multiplyMatrixByVector = (matrix: number[][], vector: number[]) => {
    const result: number[] = new Array(3).fill(0);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
    }

    return result;
}

const calculateRotationAngle = (center: IPoint, topRight: IPoint, p: IPoint) => {
    const p1 = { x: topRight.x - center.x, y: topRight.y - center.y };
    const p2 = { x: p.x - center.x, y: p.y - center.y };
    return Math.atan2(p2.y, p2.x) - Math.atan2(p1.y, p1.x);
}

const calculateScale = (matrix: number[][], width: number, height: number, p: IPoint) => {
    const inverseMatrix = calculateInverseMatrix(matrix);
    const p2 = multiplyMatrixByVector(inverseMatrix, [p.x, p.y, 1]);
    return { x: p2[0] / (width / 2), y: p2[1] / (height / 2) };
}

export { calculateRotationAngle, calculateScale, formatNumber, getLayerTransformedPoints, getTransformedPoint, getTransformMatrix, isContain, isInBox, isLeft, loadImage };
