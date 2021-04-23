/* eslint-disable no-console */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import modelData from './modelData';
import Model from './Model';

const AppModel = () => {
  const data = modelData;
  // const [data, setData] = useState(modelData);
  // const [idCount, setIdCount] = useState(0);

  // const idCountIncrease = () => {
  //   setIdCount(idCount + 1);
  // };

  const onDragStart = (start) => {
    console.warn({ start });
    // const homeIndex = data.columnOrder.indexOf(start.source.droppableId);

    // setData({
    //   ...data,
    //   homeIndex,
    // });
  };
  const onDragEnd = (result) => {
    // const {
    //   destination, source, draggableId, type,
    // } = result;
    // eslint-disable-next-line no-console
    console.warn({
      result,
    });
    // setData({
    //   ...data,
    //   homeIndex: null,
    // });
    // if (!destination) {
    //   return;
    // }

    // if (
    //   destination.droppableId === source.droppableId
    //   && destination.index === source.index
    // ) {
    //   return;
    // }

    // if (type === 'task' && destination.droppableId === 20) {
    //   return;
    // }

    // if (type === 'task' && source.droppableId === 20) {
    //   const foreign = data.columns[destination.droppableId];

    //   const finishTaskIds = Array.from(foreign.taskIds);
    //   finishTaskIds.splice(destination.index, 0, idCount);

    //   const newFinish = {
    //     ...foreign,
    //     taskIds: finishTaskIds,
    //   };

    //   const rows = [
    //     { id: 'has_many', content: 'has_many' },
    //     { id: 'has_one', content: 'has_one' },
    //     { id: 'belongs_to', content: 'belongs_to' },
    //     { id: 'entity', content: 'entity' },
    //   ];

    //   const newData = {
    //     ...data,
    //     columns: {
    //       ...data.columns,
    //       [newFinish.id]: newFinish,
    //     },
    //     tasks: {
    //       ...data.tasks,
    //       [idCount.toString()]: {
    //         ...rows[source.index],
    //         id: idCount.toString(),
    //       },
    //     },
    //   };
    //   setData(newData);
    //   idCountIncrease();
    //   return;
    // }

    // if (type === 'column') {
    //   const newColumnOrder = Array.from(data.columnOrder);
    //   newColumnOrder.splice(source.index, 1);
    //   newColumnOrder.splice(destination.index, 0, draggableId);

    //   const newData = {
    //     ...data,
    //     columnOrder: newColumnOrder,
    //   };
    //   setData(newData);
    //   return;
    // }

    // const home = data.columns[source.droppableId];
    // const foreign = data.columns[destination.droppableId];

    // if (home === foreign) {
    //   const newTaskIds = Array.from(home.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...home,
    //     taskIds: newTaskIds,
    //   };

    //   const newData = {
    //     ...data,
    //     columns: {
    //       ...data.columns,
    //       [newColumn.id]: newColumn,
    //     },
    //   };

    //   setData(newData);
    //   return;
    // }

    // const startTaskIds = Array.from(home.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...home,
    //   taskIds: startTaskIds,
    // };

    // const finishTaskIds = Array.from(foreign.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...foreign,
    //   taskIds: finishTaskIds,
    // };

    // const newData = {
    //   ...data,
    //   columns: {
    //     ...data.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
    // setData(newData);
  };

  const item = data.items[0];

  return (
    <div className="App">
      <DragDropContext
        onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >

        <Model item={item} allItems={data.items} index={0} />
      </DragDropContext>
    </div>
  );
};

export default AppModel;
