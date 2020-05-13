// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderCows = (groups, source, destination) => {
  const current = groups.find(group => group.id === source.droppableId);
  const next = groups.find(group => group.id === destination.droppableId);
  const target = current.cows[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current.cows, source.index, destination.index);
    return groups.map(group => group.id === current.id ? {...group, cows: reordered} : group);
  }

  // moving to different list

  // remove from original
  current.cows.splice(source.index, 1);
  // insert into next
  next.cows.splice(destination.index, 0, target);

  return groups.map(group => {
    if (current.id === group.id)
      return {
        ...group,
        cows: current.cows
      }
    else if (next.id === group.id)
      return {
        ...group,
        cows: next.cows
      }

    return group;
  });
};