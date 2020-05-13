import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {reorderCows} from "../reorder";
import {DraggableGroup} from "../components/DraggableGroup";

export default function ReactBeautifulDND() {
  const [groups, setGroups] = useState([
    {
      id: 'a',
      name: 'Lote A',
      cows: [{
        id: 1,
        name: 'Mimosa'
        }, {
        id: 2,
        name: 'Badocha'
      }]
    },{
      id: 'b',
      name: 'Lote B',
      cows: [{
        id: 3,
        name: 'Dálmata'
      }]
    },{
    id: 'c',
      name: 'Lote C',
      cows: [{
        id: 4,
        name: 'Concha'
      }, {
        id: 5,
        name: 'Amiga'
      }]
    },{
      id: 'd',
      name: 'Lote D',
      cows: [{
        id: 6,
        name: 'Beterraba'
      }, {
        id: 7,
        name: 'Francisca'
      }]
    },{
      id: 'e',
      name: 'Lote E',
      cows: [{
        id: 8,
        name: 'Mumu'
      }, {
        id: 9,
        name: 'Grinalda'
      }]
    }
  ]);

  return (
    <DragDropContext onDragEnd={({destination, source}) => {
      // // dropped outside the list
      if (!destination) {
        return;
      }

      setGroups(reorderCows(groups, source, destination));
    }}>
      {groups.map(group => (
        <DraggableGroup
          internalScroll
          key={group.id}
          listId={group.id}
          listType="COW"
          group={group}
        />
      ))}
    </DragDropContext>
    // <ListManager
    //   items={groups}
    //   direction="horizontal"
    //   // maxItems={3}
    //   render={group => (
    // groups.map(group => {
    //   return (
    //     <GroupContext group={group}>
    //       <ListManager
    //         items={group.cows}
    //         direction="horizontal"
    //         render={cow => cow.name}
    //         onDragEnd={(destination, source) => {
    //           if (!destination)
    //             return;
    //
    //           setGroups(reorderCows(groups, source, destination));
    //         }}
    //       />
    //     </GroupContext>)})
      // )}
      // onDragEnd={(destination, source) => {
      //   if (!destination)
      //     return;
      //   setGroups(groups);
      // }}
    // />
  );
}
