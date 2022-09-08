import useStore, { initialIdCounter } from '@/zustandStore/store';
import { Connection, Edge, Node } from 'react-flow-renderer';
import {  AttributesType } from '@/zustandStore/tables';

import testNodes from './testNodes';
import testEdges from './testEdges';
import testTables from './testTables';
import { EntityNodeType } from '@/components';

let edge: Omit<Edge, "id">;

const fileReader = (uploadedFile: unknown) => (
  Object.defineProperty(global, 'FileReader', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      readAsText: function() { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        this.onload(
          uploadedFile
        )
      },
    })),
  })
)

describe('store', () => {
  it('has a "version" attribute and its value should be "0.4.2" as default', () => {
      expect(useStore.getState().version).toBe("0.4.2");
  });

  it('has a "idCounter" attribute and its value should exist as default', () => {
    
    Object.defineProperty(global, 'initialNodes', testNodes)
    
    useStore.setState({
      idCounter: initialIdCounter(testTables, testNodes, testEdges)
    })
  
    expect(useStore.getState().idCounter).toBe(10);
    expect(useStore.getState().idCounter).toBeTruthy();

  });

  it('has an "associationType" attribute and its value should be "has_one" as default', () => {
    expect(useStore.getState().associationType).toBe("has_one");
  });

  it('has a "nodes" attribute and its value should exist as default', () => {
    expect(useStore.getState().nodes).toBeTruthy();
  });

  it('has a "edges" attribute and its value should exist as default', () => {
    expect(useStore.getState().edges).toBeTruthy();
  });
  
  it('has a "tables" attribute and its value should exist as default', () => {
    expect(useStore.getState().tables).toBeTruthy();
  });

  it('has a "connectionStartNodeId" attribute and its value should be null', () => {
    expect(useStore.getState().connectionStartNodeId).toBeNull();
  });
  
  it('has an "isConnectContinue" attribute and its value should be false', () => {
    expect(useStore.getState().isConnectContinue).toBeFalsy();
  });
  
  it('has an "isMouseOnNode" attribute and its value should be false', () => {
    expect(useStore.getState().isMouseOnNode).toBeFalsy();
  });

  it('has an "isMouseOnEdge" attribute and its value should be false', () => {
    expect(useStore.getState().isMouseOnEdge).toBeFalsy();
  });

  it('has an "onConnectStart" attribute to change isConnectContinue as true', () => {
    useStore.getState().onConnectStart()
    expect(useStore.getState().isConnectContinue).toBe(true);
  });

  it('has an "onConnectEnd" attribute to change isConnectContinue as false and selectedNodeIdForThrough as null', () => {
    useStore.getState().onConnectEnd()
    expect(useStore.getState().isConnectContinue).toBe(false);
    expect(useStore.getState().selectedNodeIdForThrough).toBeNull();
  });

  it('has an "onEdgeMouseEnter" attribute to change isMouseOnEdge as true and mouseOnEdgeId as the given edge"s id', () => {

    
    useStore.setState({
      isConnectContinue: true
    });

    useStore.getState().onEdgeMouseEnter({} as React.MouseEvent, {id: "111"} as Edge)

    expect(useStore.getState().isMouseOnEdge).toBe(false);
    expect(useStore.getState().mouseOnEdgeId).toBe(null);


    useStore.setState({
      isConnectContinue: false
    });
    
    
    useStore.getState().onEdgeMouseEnter({} as React.MouseEvent, {id: "111"} as Edge)
    expect(useStore.getState().isMouseOnEdge).toBe(true);
    expect(useStore.getState().mouseOnEdgeId).toBe("111");
  });

  it('has an "onEdgeMouseLeave" attribute to change isMouseOnEdge as false and mouseOnEdgeId as null', () => {
    useStore.setState({
      isMouseOnEdge: true,
      mouseOnEdgeId: "1",
      isConnectContinue: true
    });

    useStore.getState().onEdgeMouseLeave()

    expect(useStore.getState().isMouseOnEdge).toBe(true);
    expect(useStore.getState().mouseOnEdgeId).toBe("1");
    
    useStore.setState({
      isConnectContinue: false
    });
    
    useStore.getState().onEdgeMouseLeave()

    expect(useStore.getState().isMouseOnEdge).toBe(false);
    expect(useStore.getState().mouseOnEdgeId).toBe(null);
  });

  it('has an "onNodeMouseEnter" attribute to change isMouseOnNode as true and mouseOnNodeId as the given edge"s id', () => {
    useStore.getState().onNodeMouseEnter({} as React.MouseEvent, {id: "111"} as Node)
    expect(useStore.getState().isMouseOnNode).toBe(true);
    expect(useStore.getState().mouseOnNodeId).toBe("111");
  });

  it('has an "onNodeMouseLeave" attribute to change isMouseOnNode as false and mouseOnNodeId as null', () => {
    useStore.getState().onNodeMouseLeave()
    expect(useStore.getState().isMouseOnNode).toBe(false);
    expect(useStore.getState().mouseOnNodeId).toBe(null);
  });

  describe("functions to add/update/delete a table", () => {
    beforeEach( () => {
      useStore.setState({
        idCounter: 333,
        tables: {
          "111": {
            name: "mockOldTablename",
            attributes: {
              "222": {
                name: "mockOldAttributeName",
                type: "mockOldAttributeType"
              }
            } as AttributesType
          },
        }
      })
    })

    it('has an "onTableNameChange" attribute to change a table"s name', () => {
      expect(useStore.getState().tables["111"].name).not.toBe("mockTableName");

      useStore.getState().onTableNameChange({target: {value: "mockTableName"}} as React.ChangeEvent<HTMLInputElement>, "111")
      expect(useStore.getState().tables["111"].name).toBe("mockTableName");
    });

    it('has an "onAttributeNameChange" attribute to change a attribute"s name', () => {
      expect(useStore.getState().tables["111"].name).not.toBe("mockAttributeName");

      useStore.getState().onAttributeNameChange({target: {value: "mockAttributeName"}} as React.ChangeEvent<HTMLInputElement>, "111", "222")
      expect(useStore.getState().tables["111"].attributes["222"].name).toBe("mockAttributeName");
    });

    it('has an "onAttributeTypeChange" attribute to change a attribute"s type', () => {
      expect(useStore.getState().tables["111"].name).not.toBe("mockAttributeType");

      useStore.getState().onAttributeTypeChange({target: {value: "mockAttributeType"}} as React.ChangeEvent<HTMLSelectElement>, "111", "222")
      expect(useStore.getState().tables["111"].attributes["222"].type).toBe("mockAttributeType");
    });

    it('has an "addTable" attribute to add a table', () => {
      expect(useStore.getState().tables["333"]).toBeFalsy();

      useStore.getState().addTable()
      expect(useStore.getState().tables["333"]).toBeTruthy();
      expect(useStore.getState().idCounter).toBe(334);
    });

    it('has an "addAttribute" attribute to add an attribute to the given table', () => {
      expect(useStore.getState().tables["111"].attributes["333"]).toBeFalsy();

      useStore.getState().addAttribute("111")
      expect(useStore.getState().tables["111"].attributes["333"]).toBeTruthy();
      expect(useStore.getState().idCounter).toBe(334);
    });

    it('has a "removeAttribute" attribute to remove an attribute from the given table', () => {
      expect(useStore.getState().tables["111"].attributes["222"]).toBeTruthy();

      useStore.getState().removeAttribute("111", "222")
      expect(useStore.getState().tables["111"].attributes["222"]).toBeFalsy();
    });

    it('has a "removeTable" attribute to remove a table', () => {
      useStore.setState({
        tables: testTables,
        nodes: testNodes,
        edges: testEdges,
      })
      
      expect(useStore.getState().tables["1"]).toBeTruthy();

      useStore.getState().removeTable("1")
      expect(useStore.getState().tables["1"]).toBeFalsy();
      expect(useStore.getState().nodes.length).toBe(2);
      expect(useStore.getState().edges.length).toBe(1);
    });
  })

  it('has a "increaseIdCounter" attribute to increase the "idCounter" attribute by one', () => {
    useStore.setState({
      idCounter: 333,
    })
    
    useStore.getState().increaseIdCounter()
    expect(useStore.getState().idCounter).toBe(334);
  });

  describe("functions to add/update/delete a node", () => {
    
    beforeEach( () => {
      
      useStore.setState({
        idCounter: 333,
        nodes: testNodes,
        edges: testEdges,
        tables: testTables
      })
    })

    it('has an "onNodeTableChange" attribute to change the table of the given node', () => {
    
      let nodeOnStore: EntityNodeType
      nodeOnStore = useStore.getState().nodes.find(node => node.id === "4")!
      expect(nodeOnStore.data.tableId).not.toBe("2");
      
      useStore.getState().onNodeTableChange({target: {value: "2"}} as React.ChangeEvent<HTMLSelectElement>, "4")
      
      nodeOnStore = (useStore.getState().nodes.find(node => node.id === "4"))!
      expect(nodeOnStore.data.tableId).toBe("2");
    });

    it('has an "onNodeInputChange" attribute to change the name of the given node', () => {
    
      let nodeOnStore: EntityNodeType
      nodeOnStore = useStore.getState().nodes.find(node => node.id === "4")!
      expect(nodeOnStore.data.name).not.toBe("mockNodeDataName");
      
      useStore.getState().onNodeInputChange({target: {value: "mockNodeDataName"}} as React.ChangeEvent<HTMLInputElement>, "4")
      
      nodeOnStore = (useStore.getState().nodes.find(node => node.id === "4"))!
      expect(nodeOnStore.data.name).toBe("mockNodeDataName");
    });
    
    it('has a "addNode" attribute to add a node', () => {
    
      useStore.setState({
        nodes: []
      })
     
      let nodeOnStore = (useStore.getState().nodes.find(node => node.id === "4"))
      expect(nodeOnStore).toBeFalsy();
      
      useStore.getState().addNode(testNodes[0])
      
      nodeOnStore = (useStore.getState().nodes.find(node => node.id === "4"))
      expect(nodeOnStore).toBeTruthy();
    });

    it('has a "onMouseEnterThrough" attribute to track the selected through node for the "through" association', () => {
    
      useStore.getState().onMouseEnterThrough("4")
      
      expect(useStore.getState().selectedNodeIdForThrough).toBe("4");
    });

    describe("some parts are handled by a third party", () => {
      it('has a "onNodesChange" attribute to apply changes related to a node', () => {
    
        let nodeOnStore = (useStore.getState().nodes.find(node => node.id === "4"))
        expect(nodeOnStore).toBeTruthy();
        expect(useStore.getState().edges.length).toBe(3);
  
        useStore.getState().onNodesChange([{id: "5", type: "remove"}])
        
        nodeOnStore = (useStore.getState().nodes.find(node => node.id === "5"))
        expect(nodeOnStore).toBeFalsy();
        expect(useStore.getState().edges.length).toBe(2);
  
      });  
    })
    
    
  });

  describe("functions to add/delete an edge", () => {
    beforeEach( () => {
      
      useStore.setState({
        idCounter: 333,
        nodes: testNodes,
        edges: testEdges,
        tables: testTables
      })
    })
    
    it('has an "onEdgesChange" attribute to apply changes related to an edge', () => {
  
      let edgeOnStore = (useStore.getState().edges.find(edge => edge.id === "7"))

      expect(edgeOnStore).toBeTruthy();

      useStore.getState().onEdgesChange([{id: "7", type: "remove"}])
      
      edgeOnStore = (useStore.getState().edges.find(edge => edge.id === "7"))

      expect(edgeOnStore).toBeFalsy();

    });  

    describe('has an "onConnect" attribute to add', () => {
  
      beforeEach(()=>{
        useStore.setState({
          idCounter: 333,
        })

        edge = {
          source: "111", 
          target: "222", 
          sourceHandle: "bottom", 
          targetHandle: "top"
        }
      })
      
      it('"hasOne" edge', () => {

        useStore.setState({
          associationType: "has_one",
        })
        
        expect(useStore.getState().edges.length).toBe(3);

        useStore.getState().onConnect( edge as Connection)

        expect(useStore.getState().edges.length).toBe(4);
  
        const edgeOnStore = (useStore.getState().edges.find(edge => edge.id === "333"))
  
        expect(edgeOnStore).toEqual({...edge, id:"333", label: "has one", type: "hasOne"});  

      });
      
      it('a "hasMany" edge', () => {

        useStore.setState({
          associationType: "has_many",
        })
        

        expect(useStore.getState().edges.length).toBe(3);

        useStore.getState().onConnect( edge as Connection)

        expect(useStore.getState().edges.length).toBe(4);
  
        const edgeOnStore = (useStore.getState().edges.find(edge => edge.id === "333"))
  
        expect(edgeOnStore).toEqual({...edge, id:"333", label: "has many", type: "hasMany"});  
      });

      it('a "through" edge', () => {

        global.alert = jest.fn();

        useStore.setState({
          associationType: "through",
        })

        useStore.getState().onConnect( edge as Connection)

        expect(global.alert).toBeCalledTimes(1)
        expect(global.alert).toBeCalledWith("It is necessary to select a node to define through association.")

        useStore.setState({
          selectedNodeIdForThrough: "555"
        })

        expect(useStore.getState().edges.length).toBe(3);

        useStore.getState().onConnect( edge as Connection)

        expect(useStore.getState().edges.length).toBe(4);
  
        const edgeOnStore = (useStore.getState().edges.find(edge => edge.id === "333"))
  
        expect(edgeOnStore).toEqual(
          {...edge, id:"333", label: "through", type: "through", data: {throughNodeId: "555"}}
        );  
      });
      
    });  
    
  });

  it('has an "onChangeAssociationType" attribute to change the selected association type', () => {
    
      useStore.getState().onChangeAssociationType( "mockAssociationType", "666")
    
      expect(useStore.getState().associationType).toBe("mockAssociationType");
      expect(useStore.getState().connectionStartNodeId).toBe("666");
  });

  it('has a "resetStore" attribute to reset the store completely', () => {
      window.confirm = jest.fn().mockImplementation(() => true)
    
      useStore.getState().resetStore()
    
      expect(useStore.getState().idCounter).toBe(1);
      expect(useStore.getState().tables).toEqual({});
      expect(useStore.getState().nodes).toEqual([]);
      expect(useStore.getState().edges).toEqual([]);
      
  });

  describe('has an "uploadStore" attribute to upload an EAD file', () => {
    
    it('shows a warning if a correct file is not installed', () => {

      global.alert = jest.fn();

      fileReader({target: {result: []}})
      useStore.getState().uploadStore({target: {files: {}}} as React.ChangeEvent<HTMLInputElement>)
    
      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith("An invalid file is installed. Please check your file.");

    })

    it('installs the file successfully', () => {

      fileReader({target: {result: JSON.stringify({version: "0.4.2", idCounter: 1234})}})
      useStore.getState().uploadStore({target: {files: {}}} as React.ChangeEvent<HTMLInputElement>)
    
      expect(useStore.getState().idCounter).toBe(1234);

      fileReader({target: {result: JSON.stringify({version: "0.4.0", idCounter: 5678})}})
      useStore.getState().uploadStore({target: {files: {}}} as React.ChangeEvent<HTMLInputElement>)
    
      expect(useStore.getState().idCounter).toBe(5678);
      expect(useStore.getState().version).toBe("0.4.2");
    });

    it('warns about the file version if it is not compatible with the version used', () => {
      global.alert = jest.fn();

      fileReader({target: {result: JSON.stringify({version: "0.3.1"})}})

      useStore.getState().uploadStore({target: {files: {}}} as React.ChangeEvent<HTMLInputElement>)
    
      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith("The version of your file is v0.3.1. It is not compatible with the version used(v0.4.2).");
    });
  });
  
});