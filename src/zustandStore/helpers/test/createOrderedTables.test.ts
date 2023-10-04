import { State, TablesType } from '@/zustandStore';
import { createOrderedTables } from '../createOrderedTables';

let data : unknown;

describe("createOrderedTables function", () => {
  
  it('adds superclassId attributes to tables', () => {
    const tables: TablesType = {
      "1": {
        name: "mockName",
        attributes: {},
        superclassId: ""
      },
      "2": {
        name: "mockName2",
        attributes: {},
        superclassId: ""
      },
    };

    expect(createOrderedTables(tables)).toStrictEqual(["1", "2"]);
    
  })
  
})
  