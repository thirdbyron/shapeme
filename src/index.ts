import { RectangleTypesTranslated } from './const';
import {
    IRectangleData,
    InfoMode,
    RectangleType,
    ICircleData,
    Point,
    IRectanglePointsOptions,
    ITriangleData,
} from './types';

/**
 * Создает экземпляр четырехугольника по заданным параметрам
 * ширины - @param data.w и длины - @param data.h
 * Если задан только один из параметров, то создает квадрат.
 */

export class Rectangle {
    protected _width: number = 0;
    protected _length: number = 0;
    protected _type: RectangleType = 'square';

    constructor(data: IRectangleData) {
        if ((data.w && data.w < 0) || (data.l && data.l < 0)) {
            throw new Error('Width and length must be positive integer');
        }
        if (data.w && data.l) {
            this._width = data.w;
            this._length = data.l;
            this._type = data.w === data.l ? 'square' : 'rectangle';
        } else if (data.w) {
            this._width = data.w;
            this._length = data.w;
        } else if (data.l) {
            this._width = data.l;
            this._length = data.l;
        }
    }

    get width() {
        return this._width;
    }

    set width(width) {
        if (width <= 0) {
            throw new Error('Width must be positive integer and not zero');
        }
        if (this._width === 0) {
            this.length = width;
        }
        this._width = width;
        this.setRightType();
    }

    get length() {
        return this._length;
    }

    set length(length) {
        if (length <= 0) {
            throw new Error('Length must be positive integer and not zero');
        }
        if (this._length === 0) {
            this.width = length;
        }
        this._length = length;
        this.setRightType();
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get translatedType() {
        return RectangleTypesTranslated[this._type];
    }

    get perimeter() {
        return (this._width + this._length) * 2;
    }

    get area() {
        return this._width * this._length;
    }

    protected setRightType() {
        if (this._width !== this._length) {
            this.type = 'rectangle';
        } else {
            this.type = 'square';
        }
    }

    public getPoints(
        start: Point,
        options: IRectanglePointsOptions = {
            vertical: 'top',
            horizontal: 'right',
        }
    ) {
        if (this._width === 0) {
            throw new Error('With and length of rectangle must be provided');
        }
        let x2 =
            options.horizontal === 'left'
                ? start.x - this._width
                : start.x + this._width;
        let y2 =
            options.vertical === 'down'
                ? start.y - this._length
                : start.y + this._length;

        return {
            x1: start.x,
            x2,
            y1: start.y,
            y2,
        };
    }

    public getInfo(mode: InfoMode = 'obj') {
        if (mode === 'str') {
            return `${this.translatedType} с шириной и длиной ${this._width}x${this._length}. 
            Периметр равен ${this.perimeter}. 
            Площадь равна ${this.area}`;
        }
        return {
            type: this.type,
            width: this.width,
            length: this.length,
            square: this.area,
            perimeter: this.perimeter,
        };
    }
}

/**
 * Создает экземпляр круга по заданным параметрам
 * радиуса - @param data.r с центром - @param data.c
 */

export class Circle {
    protected _radius: number = 0;
    protected _center: Point = { x: 0, y: 0 };

    constructor(data: ICircleData) {
        if (data.r) {
            if (data.r < 0) {
                throw new Error('Radius must be positive integer');
            }
            this._radius = data.r;
        }
        if (data.c) {
            this._center = { x: data.c.x, y: data.c.y };
        }
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        if (radius < 0) {
            throw new Error('Radius must be positive integer');
        }
        this._radius = radius;
    }

    get center() {
        return this._center;
    }

    set center(center) {
        this._center = center;
    }

    get diameter() {
        return this._radius * 2;
    }

    get area() {
        return this._radius ** 2 * Math.PI;
    }

    get length() {
        return this._radius * 2 * Math.PI;
    }

    public getInfo(mode: InfoMode = 'obj') {
        if (mode === 'str') {
            return `Окружность с радиусом ${this._radius}. 
            Диаметр равен ${this.diameter}. 
            Площадь равна ${this.area}. 
            Длина окружности равна ${this.length}`;
        }
        return {
            type: 'Окружность',
            radius: this._radius,
            length: this.length,
            square: this.area,
            diameter: this.diameter,
        };
    }
}

/**
 * Создает экземпляр треугольника по заданным параметрам
 * радиуса - @param data.r с центром - @param data.c
 */

export class Triangle {
    protected _a: number = 0;
    protected _b: number = 0;
    protected _c: number = 0;

    constructor(data: ITriangleData) {
        const { a, b, c } = data;
        this._a = a;
        this._b = b;
        this._c = c;
    }

    get area() {
        const s = (this._a + this._b + this._c) / 2;
        const area = Math.sqrt(
            s * (s - this._a) * (s - this._b) * (s - this._c)
        );
        return area;
    }

    get sides() {
        return {
            a: this._a,
            b: this._b,
            c: this._c,
        };
    }

    public getInfo(mode: InfoMode = 'obj') {
        if (mode === 'str') {
            return `Треугольник со сторонами ${this._a}, ${this._b}, ${this._c}.
            Площадь равна ${this.area}.`;
        }
        return {
            type: 'Треугольник',
            sides: this.sides,
            area: this.area,
        };
    }
}
