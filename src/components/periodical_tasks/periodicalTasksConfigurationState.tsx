import { PeriodicalTaskModel } from "./periodicalTaskModel";

export interface PeriodicalTaskConfigurationState {
  
    state: 'loading' | 'idle',
    items: PeriodicalTaskModel[],
}