import React, { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import CowCard from '../components/CowCard';
import ReactDNDContext from '../context/ReactDNDContext';

export default function CowGroup({ group, index: groupIndex }) {
  const ref = useRef();
  const { groups, moveCowCard, moveCowGroup } = useContext(ReactDNDContext);

  const [{ isDragging },dragRef] = useDrag({
    item: { type: 'COW-GROUP', groupIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  // TODO: usar isDragging para mostrar apenas a borda do container do rebanho (ajustar**)

  const [{ isOver }, dropRef] = useDrop({
    accept: ['COW-CARD', 'COW-GROUP'],
    hover(item) {
      const draggedGroupIndex = item.groupIndex;
      const targetGroupIndex = groupIndex;
      const draggedIndex = item.index;

      if (draggedGroupIndex === groupIndex)
        return;

      if (item.type === 'COW-CARD')
        moveCowCard(draggedGroupIndex, targetGroupIndex, draggedIndex);
      else
        moveCowGroup(draggedGroupIndex, targetGroupIndex);

      item.groupIndex = targetGroupIndex;
      item.index = groups[groupIndex].cows.length;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  dragRef(dropRef(ref));

  return (
    <div 
      key={group.id} 
      className="cow-group" 
      ref={ref} 
      style={{ 
        backgroundColor: isDragging ? 'transparent' : (isOver ? '#E5E5E5' : ''),
        border: isDragging ? '1px dashed rgba(0, 0, 0, 0.2)' : '',
        boxShadow: isDragging ? 'none' : '',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className="group-top">
        <div className="group-title">{group.name}</div>
        <div style={{float: 'right'}}>{group.cows.length}</div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {group.cows.map((cow, index) => (
            cow.visibility ? <CowCard key={cow.id} index={index} groupIndex={groupIndex} cow={cow} /> : ''
          ))}
      </div>
    </div>
  );
}