/**
 * Интерфейс используется для создания точки на гипотетический плоскости
 */

export interface Point {
    x: number;
    y: number;
}

/**
 * Интерфейс используется для создания четырехугольника
 */

export interface IRectangleData {
    w?: number;
    l?: number;
}

/**
 * Интерфейс параметров функции @function getPoints(), где
 * @param vertical - в какую сторону брать отсчет по вертикали,
 * @param horizontal - в какую сторону брать отсчет по горизонтали
 */

export interface IRectanglePointsOptions {
    vertical: 'top' | 'down';
    horizontal: 'right' | 'left';
}

/**
 * Описывает, к какому типу принадлежит четырехугольник
 */

export type RectangleType = 'square' | 'rectangle';

/**
 * Перевод названий типов четырехугольника на русский
 */

export type RectangleTypeTranslated = 'Квадрат' | 'Прямоугольник';

/**
 * Типизированный словарь для названий типов четырехугольников
 */

export type RectangleTypesDictionary = Record<
    RectangleType,
    RectangleTypeTranslated
>;

/**
 * Типизирует модификатор, который выявляет,
 * как выводить информацию о фигуре
 */

export type InfoMode = 'str' | 'obj';

/**
 * Интерфейс используется для создания круга с радиусом
 * и гипотетическим центром
 */

export interface ICircleData {
    r?: number;
    c?: Point;
}

export interface ITriangleData {
    a: number;
    b: number;
    c: number;
}
