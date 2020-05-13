import React, {useState} from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import arrayMove from "array-move";

export default function ReactSortableHOC () {
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

  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    if (collection === 'COW') {
      console.log('movendo vaca')
    } else {
      console.log('movendo rebanho')
    }
    // const current = groups.find((group, index) => index === oldIndex);
    // const next = groups.find((group, index) => index === newIndex);
    // const target = current.cows[params.oldIndex];
    setGroups(arrayMove(groups, oldIndex, newIndex));
    // console.log(current, next);
    // setGroups(reorderCows(groups, source, destination));
  };

  const onSortOver = ({ oldIndex, newIndex, collection }) => {
    if (collection === 'COW') {
      console.log('movendo vaca')
    } else {
      console.log('movendo rebanho')
    }
  }

  // const onSortMove = (e) => {
  //   let groupId = e.target.attributes.group;
  //   if (groupId && groupId.value) {
  //     console.log(groupId.value);
  //   }
  // };

  const SortableCows = SortableContainer(({ groupId, cows }) => (
    <>
      {cows.map((cow, index) => (
        <Cow
          cow={cow}
          index={index}
          collection="COW"
          className="cow-card"
        />
      ))}
    </>
  ));

  const Cow = SortableElement(({ cow, index }) => (
    <div index={index} style={{margin: '5px'}}>{cow.name}</div>
  ));

  const SortableItem = SortableElement(({ group }) => (
    <div className="cow-group">
      <div style={{fontSize: '14px', fontWeight: 'bold'}}>{group.name}</div>
      <div style={{display: 'flex'}} group={group.id}>
        <SortableCows
          cows={group.cows}
          onSortEnd={onSortEnd}
          onSortOver={onSortOver}
          // onSortMove={onSortMove}
        />
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ groups }) => (
    <div className="sort-container">
      {groups.map((group, index) => (
        <SortableItem
          key={group.id}
          index={index}
          group={group}
          collection="GROUP"
        />
      ))}
    </div>
  ));

  return (
    <SortableList
      groups={groups}
      onSortEnd={onSortEnd}
      axis="xy"
      helperClass="SortableHelper"
    />
  );
}