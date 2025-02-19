import { MeasuresTag } from "./measures-tag.enum";

const internalMeasuresTagI18nMap = new Map<MeasuresTag, string>();

const enumEntries = Object.entries(MeasuresTag).filter(([key]) => Number.isNaN(Number(key)));

for (const [key, value] of enumEntries) {
    internalMeasuresTagI18nMap.set(value as MeasuresTag, key.replace(
        /[A-Z]/g, (letter, index) => {
            return index == 0 ?
                letter.toLowerCase() : '-' + letter.toLowerCase();
        }
    ))
}

export const MeasuresTagI18nMap = internalMeasuresTagI18nMap;