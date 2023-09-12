import { State } from '@/zustandStore/store';
import { update_data } from '../update_data';

let data : unknown;

describe("update_data function", () => {
  
  describe("if the version of data is not up-to-date", () => {
    it('adds superclassId attributes to tables', () => {
      data = {
        version: "0.4.0",
        tables: {
          "1": {},
          "2": {},
        },
        edges: []
      } 

      expect(update_data(data as State)).toStrictEqual({
        version: "0.4.7",
        tables: {
          "1": {
            "superclassId": "",
          },
          "2": {
            "superclassId": "",
          },
        },
        edges: []
      });
      
    })

    it('adds optional attributes to edges ', () => {
      data = {
        version: "0.4.0",
        tables: {},
        edges: [
          { "id": "1", },
          { "id": "2", }
        ]
      } 

      expect(update_data(data as State)).toStrictEqual({
        version: "0.4.7",
        tables: {},
        edges: [
          { "id": "1", data: {optional: false} },
          { "id": "2", data: {optional: false} }
        ]
      });
      
    })
  });
  
  it('doesn"t make any change if the version of data is up-to-date ', () => {

    data = {
      version: "0.4.7",
      tables: {
        "1": {
          superclassId: ""
        },
        "2": {
          superclassId: ""
        },
      },
      edges: [
        { "id": "1", data: {optional: false} },
        { "id": "2", data: {optional: false} }
      ]
    } 
    
    expect(update_data(data as State)).toStrictEqual( data );
    
  });
  
})
  