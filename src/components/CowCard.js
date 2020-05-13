import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ReactDNDContext from '../context/ReactDNDContext';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

export default function CowCard({ cow, index, groupIndex }) {
  const ref = useRef();
  const { moveCowCard } = useContext(ReactDNDContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'COW-CARD', index, groupIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: 'COW-CARD',
    hover(item) {
      const draggedGroupIndex = item.groupIndex;
      const targetGroupIndex = groupIndex;
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedGroupIndex === targetGroupIndex)
        return;

      moveCowCard(draggedGroupIndex, targetGroupIndex, draggedIndex, targetIndex);
      
      item.index = targetIndex;
      item.groupIndex = targetGroupIndex;
    }
  });

  dragRef(dropRef(ref));
  
  function onClickHandler() {
    alert('mata a vaca')
  }

  return (
    <div
      ref={ref}
      className="cow-card"
      style={{
        border: isDragging ? '1px dashed rgba(0, 0, 0, 0.2)' : '',
        background: isDragging ? 'transparent' : '',
        boxShadow: isDragging ? 'none' : '',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <span style={{opacity: isDragging ? '0' : ''}}>{cow.name}</span>
      <DeleteOutlineSharpIcon 
        onClick={onClickHandler}
        color="error"
        style={{
          visibility: isDragging ? 'hidden' : ''
        }}
      />
    </div>
  );
}