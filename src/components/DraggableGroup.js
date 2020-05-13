import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";

export const DraggableGroup = ({listId, listType, group}) => {
  return (
    <div style={{margin: '6px'}}>
      <div style={{fontSize: '14px', fontWeight: 'bold'}}>{group.name}</div>
      <Droppable
        droppableId={listId}
        type={listType}
        isCombineEnabled={false}
      >
        {(dropProvided, snapshot) => (
          <div
            {...dropProvided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? '#E5E5E5' : '#F5F5F5'
            }}
            className="cow-group"
            ref={dropProvided.innerRef}
          >
            {group.cows.map((cow, index) => (
              <Draggable
                key={cow.id}
                draggableId={cow.name}
                index={index}
              >
                {dragProvided => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                    style={{
                      ...dragProvided.draggableProps.style
                    }}
                    className="cow-card"
                  >
                    {cow.name}
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
