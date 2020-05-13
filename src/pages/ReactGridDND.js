import React, {useState} from "react";
import {GridContextProvider, GridDropZone, GridItem, move, swap} from "react-grid-dnd";

export default function ReactGridDND() {
  const [items, setItems] = React.useState({
    left: [
      { id: 1, name: "ben" },
      { id: 2, name: "joe" },
      { id: 3, name: "jason" },
      { id: 4, name: "chris" },
      { id: 5, name: "heather" },
      { id: 6, name: "Richard" }
    ],
    right: [
      { id: 7, name: "george" },
      { id: 8, name: "rupert" },
      { id: 9, name: "alice" },
      { id: 10, name: "katherine" },
      { id: 11, name: "pam" },
      { id: 12, name: "katie" }
    ]
  });


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

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result
    });
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div className="grid-container">
        <GridDropZone
          className="dropzone left"
          id="left"
          boxesPerRow={4}
          rowHeight={70}
        >
          {items.left.map(item => (
            <GridItem key={item.name}>
              <div className="grid-item">
                <div className="grid-item-content">
                  {item.name[0].toUpperCase()}
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone
          className="dropzone right"
          id="right"
          boxesPerRow={4}
          rowHeight={70}
        >
          {items.right.map(item => (
            <GridItem key={item.name}>
              <div className="grid-item">
                <div className="grid-item-content">
                  {item.name[0].toUpperCase()}
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}