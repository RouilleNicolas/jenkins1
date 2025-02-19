import { MeasuresTagI18nMap } from "./measures-tag-i18n.map";
import { MeasuresTag } from "./measures-tag.enum";

describe('[Farming Suite - Animal Sheet] MeasuresTagI18nMap', () => {
    const testCases = [
        {
            enumValue: MeasuresTag.Pregnant,
            expected: "pregnant",
            titleSuffix: "when enum key is simple"
        },
        {
            enumValue: MeasuresTag.MaternityEntry,
            expected: "maternity-entry",
            titleSuffix: "with dash when enum key is multiple words"
        }
    ]

    for (const test of testCases) {
        it(`It should return kebab-cased MeasuresTag enum key as value ${test.titleSuffix}`, () => {
            expect(MeasuresTagI18nMap.get(test.enumValue)).toBe(test.expected);
        })
    }
});