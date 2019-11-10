
export class Skill {

  category: string;
  name: string;
  
  uiSelected: boolean = false;

  public toString(): string {

    return this.category + ': ' + this.name;
  }

  constructor(category: string, name: string) {

    this.category = category;
    this.name = name; 
  }
}