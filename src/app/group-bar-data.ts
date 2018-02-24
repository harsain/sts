import { Series } from './series';

export class GroupBarData {
  name: string;
  series: Series[];

  constructor(name: string, series: Series[]) {
    this.name = name;
    this.series = series;
  }
}
