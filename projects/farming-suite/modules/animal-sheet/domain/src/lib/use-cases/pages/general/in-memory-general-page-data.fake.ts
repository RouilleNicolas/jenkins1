import { Id, Sex } from '@cooperl/utils';
import { subDays } from 'date-fns';
import { AnimalEventEnum, GeneralPageData, InseminationEvent, UltrasoundEvent } from '../../../models';

type InternalBoar = GeneralPageData['reproductions']['firstArtificialInsemination']['boar'] & GeneralPageData['currentCycle']['boar'];
const patrick: InternalBoar = {
  id: 301587,
  name: 'Patrick',
  nationalNumber: 'FR99PPL301587',
};

export const InMemoryGeneralPageDataFake: Record<Id, GeneralPageData> = {
  1: {
    informations: {
      nationalNumber: 'FR99PPL202200832',
      rfid: '24000000001900832531',
      birthDate: new Date('2022-04-28'),
      sex: Sex.Female,
    },
    reproductions: {
      entrance: {
        date: new Date('2022-04-28'),
        originSite: '99PPL',
        entranceSite: '99PPL',
        entranceParity: 1,
      },
      firstArtificialInsemination: {
        date: new Date('2023-01-29'),
        boar: patrick,
      },
      firstFarrowing: {
        date: new Date('2023-05-23'),
        pigletCount: 42,
      },
    },
    currentCycle: {
      boar: patrick,
      startDate: subDays(new Date(), 115),
      parity: 5,
      events: [
        { result: true, date: new Date('2024-09-05') } satisfies UltrasoundEvent,
        {
          batch: { id: 'b2.21', name: 'B2.21' },
          boar: patrick,
          date: new Date('2024-08-11'),
          doseCount: 3,
          isNatural: false,
          isFertile: true,
        } satisfies InseminationEvent,
      ],
      previsions: [
        { date: new Date('2024-08-11'), done: true, event: AnimalEventEnum.Insemination },
        { date: new Date('2024-09-05'), done: true, event: AnimalEventEnum.Ultrasound },
        { date: new Date('2024-12-05'), done: false, event: AnimalEventEnum.Farrowing },
        { date: new Date('2024-12-26'), done: false, event: AnimalEventEnum.Weaning },
      ],
    },
  },
};
