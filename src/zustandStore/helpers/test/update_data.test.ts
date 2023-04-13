import { State } from '@/zustandStore/store';
import { update_data } from '../update_data';

let data : unknown;

describe("update_data function", () => {
  
  it('adds superclassId attributes to tables if the version of data is not up-to-date ', () => {
    data = {
      version: "0.4.0",
      tables: {
        "1": {},
        "2": {},
      }
    } 

    expect(update_data(data as State)).toStrictEqual({
      version: "0.4.6",
      tables: {
        "1": {
          "superclassId": "",
        },
        "2": {
          "superclassId": "",
        },
      }
    });
    
  });
  
  it('doesn"t make any change if the version of data is up-to-date ', () => {

    data = {
      version: "0.4.6",
      tables: {
        "1": {
          superclassId: ""
        },
        "2": {
          superclassId: ""
        },
      }
    } 
    
    expect(update_data(data as State)).toStrictEqual( data );
    
  });
  
})
  