export interface IRawProductData {
    title: string;
    description: string;
    category: string;
    price: number;
}

// Тип данных для задачи с id, authorId, createdAt, updatedAt
export interface IProduct extends IRawProductData {
    id: number;
    createdAt: string;
    updatedAt: string;
}

// Тип данных для массива задач
export type ArrayProductsType = IProduct[];
