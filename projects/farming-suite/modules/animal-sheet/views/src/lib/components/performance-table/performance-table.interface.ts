export interface RankTableElement {
  id: number;
  rank_type_id: number;
  mating_number: number;
  doses_number: number;
  iss1: number;
  issf: number;
  gestation_duration: number;
  nt: number;
  nv: number;
  mn: number;
  mo: number;
  eld_input: number;
  eld_output: number;
  adopted: number;
  removed: number;
  observation?: string;
}
