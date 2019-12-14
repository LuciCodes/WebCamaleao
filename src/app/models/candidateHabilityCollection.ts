import { Skill } from './skill';

export class CandidateHabilityCollection {

  categories: Array<string> = [];
  items: Array<Skill> = [];

  skillsByCategory(category: string): Array<Skill> {

    return this.items ? this.items.filter(i => i.category == category) : [];
  }

  constructor(srcObj?: any) {

    if (srcObj) {

      Object.assign(this, srcObj);
    }
  }

  public static fromString(value: string, uiList: string = ''): CandidateHabilityCollection {

    let result = new CandidateHabilityCollection();

    let items = value.split(', ');

    let values;

    let uiSelected = uiList.split(', ');

    result.categories = [];

    for (let i = 0; i < items.length; i++) {
     
      values = items[i].split(': ');

      if (values.length == 2) {

        let key = values[0].trim();

        if (result.categories.findIndex(k => k == key) == -1) {

          result.categories.push(key);
        }

        let skill = new Skill(values[0].trim(), values[1].trim(), uiSelected.includes(items[i]));

        result.items.push(skill);
      }
    }

    result.categories.forEach(cat => {
      result[cat] = result.items.filter(i => i.category == cat);
    })

    return result;
  }
}