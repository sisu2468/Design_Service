export interface IPoint {
    x: number;
    y: number;
}

export interface ICrop {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export interface ILayer {
    id: string;
    name: string;
    src: string;
    image: HTMLImageElement;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    crop: ICrop;
    scale: IPoint,
    position: IPoint,
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