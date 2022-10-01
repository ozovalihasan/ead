import { State } from '@/zustandStore/store';
import { transform_0_4_x_to_0_4_5 } from '../transform_0_4_x_to_0_4_5';

const data : unknown = {
  version: "0.4.0",
  tables: {
    "1": {},
    "2": {},
  }
} 

describe('<ThroughEdge />', () => {
  describe("if the mouse hovers on the edge", () => {
   
    it('update styles ', () => {

      expect(transform_0_4_x_to_0_4_5(data as State)).toBe({
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
    
  })
  
});