import { State } from '@/zustandStore/store';
import { transform_0_4_x_to_0_4_5 } from '../transform_0_4_x_to_0_4_5';

let data : unknown;

describe('<ThroughEdge />', () => {
  describe("transform_0_4_x_to_0_4_5 function", () => {
   
    it('adds superclassId attributes to tables if the version of data is not up-to-date ', () => {
      data = {
        version: "0.4.0",
        tables: {
          "1": {},
          "2": {},
        }
      } 

      expect(transform_0_4_x_to_0_4_5(data as State)).toStrictEqual({
        version: "0.4.5",
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
        version: "0.4.5",
        tables: {
          "1": {
            superclassId: ""
          },
          "2": {
            superclassId: ""
          },
        }
      } 
      
      expect(transform_0_4_x_to_0_4_5(data as State)).toStrictEqual( data );
      
    });
    
  })
  
});