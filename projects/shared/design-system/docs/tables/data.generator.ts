import { Datum } from "./datum.interface";

export const generateData = (length: number): Datum[] => Array.from<unknown, Datum>({ length }, (_, index) => ({
    id: index,
    name: ['Bacon', 'Pork', 'Ham', 'Sausage', 'Chop'][Math.floor(Math.random() * 5)],
    age: Math.floor(Math.random() * 10) + 1,
    birthDate: new Date(Date.now() - Math.floor(Math.random() * 1_000_000_000_000)),
    species: ['Pig', 'Boar', 'Sow', 'Piglet'][Math.floor(Math.random() * 4)],
}));