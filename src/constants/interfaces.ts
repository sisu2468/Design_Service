export interface IPoint {
    x: number;
    y: number;
}

export interface ILayer {
    id: string;
    name: string;
    src: string;
    image: HTMLImageElement;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    scale: { x: number, y: number },
    position: { x: number, y: number },
    rotation: number,
    visible: boolean;
    locked: boolean;
}

export interface IGood {
    index: number;
    image: string;
    prevImage: string;
    amount: number;
}