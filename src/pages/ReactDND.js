import React, { useState, useEffect } from 'react';
import produce from 'immer';
import ReactDNDContext from '../context/ReactDNDContext';
import CowGroup from '../components/CowGroup';
import TextField from '@material-ui/core/TextField';

export default function ReactDND() {
  const [groups, setGroups] = useState([
    {
      id: 'a',
      name: 'Lote A',
      cows: [{
        id: 1,
        name: 'Mimosa',
        visibility: true
      }, {
        id: 2,
        name: 'Badocha',
        visibility: true
      }]
    },{
      id: 'b',
      name: 'Lote B',
      cows: [{
        id: 3,
        name: 'Dálmata',
        visibility: true
      }]
    },{
      id: 'c',
      name: 'Lote C',
      cows: [{
        id: 4,
        name: 'Concha',
        visibility: true
      }, {
        id: 5,
        name: 'Amiga',
        visibility: true
      }]
    },{
      id: 'd',
      name: 'Lote D',
      cows: [{
        id: 6,
        name: 'Beterraba',
        visibility: true
      }, {
        id: 7,
        name: 'Francisca',
        visibility: true
      }]
    },{
      id: 'e',
      name: 'Lote E',
      cows: [{
        id: 8,
        name: 'Mumu',
        visibility: true
      }, {
        id: 9,
        name: 'Grinalda',
        visibility: true
      }]
    }
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setGroups(produce(groups, draft => {
      draft.map(group => {
        group.cows.map(cow => {
          if (!cow.name.toLowerCase().includes(filter.toLowerCase()))
            cow.visibility = false;
          else
            cow.visibility = true;
        });
      });
    }));
  }, [filter]);

  function moveCowCard(fromGroup, toGroup, fromCard, toCard) {
    setGroups(produce(groups, draft => {
      const draggedCard = draft[fromGroup].cows[fromCard];

      if (typeof(toCard) !== 'undefined') {
        draft[fromGroup].cows.splice(fromCard, 1);
        draft[toGroup].cows.splice(toCard, 0, draggedCard);
      } else {
        draft[fromGroup].cows.splice(fromCard, 1);
        draft[toGroup].cows.push(draggedCard);
      }
    }));
  }

  function moveCowGroup(fromGroup, toGroup) {
    setGroups(produce(groups, draft => {
      const draggedGroup = draft[fromGroup];

      draft.splice(fromGroup, 1);
      draft.splice(toGroup, 0, draggedGroup);
    }));
  }

  function onChangeHandler(earTag) {
    setFilter(earTag.value);
  }

  return (
    <ReactDNDContext.Provider value={{ groups, moveCowCard, moveCowGroup }}>
      <div className="dnd-top">
        <TextField
          margin="dense"
          id="searchFilter"
          onChange={(event) => onChangeHandler({ value: event.target.value })}
          label="Pesquisar"
          type="text"
        />
      </div>
      <div className="dnd-container">
        { groups.map((group, index) => (
          <CowGroup key={group.id} group={group} index={index} />
        ))}
      </div>
    </ReactDNDContext.Provider>
  );
}