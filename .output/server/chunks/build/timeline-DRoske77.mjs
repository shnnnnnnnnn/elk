import { c as currentUser } from './server.mjs';

const maxDistance = 10;
const maxSteps = 1e3;
function areStatusesConsecutive(a, b) {
  const inReplyToId = b.inReplyToId ?? b.reblog?.inReplyToId;
  return !!inReplyToId && (inReplyToId === a.reblog?.id || inReplyToId === a.id);
}
function removeFilteredItems(items, context) {
  const isStrict = (filter) => filter.filter.filterAction === "hide" && filter.filter.context.includes(context);
  const isFiltered = (item) => item.account.id === currentUser.value?.account.id || !item.filtered?.find(isStrict);
  const isReblogFiltered = (item) => !item.reblog?.filtered?.find(isStrict);
  return [...items].filter(isFiltered).filter(isReblogFiltered);
}
function reorderedTimeline(items, context = "public") {
  let steps = 0;
  const newItems = removeFilteredItems(items, context);
  for (let i = newItems.length - 1; i > 0; i--) {
    for (let k = 1; k <= maxDistance && i - k >= 0; k++) {
      steps++;
      if (steps > maxSteps)
        return newItems;
      if (areStatusesConsecutive(newItems[i], newItems[i - k])) {
        const item = newItems.splice(i, 1)[0];
        newItems.splice(i - k, 0, item);
        k = 0;
      } else if (k > 1) {
        if (areStatusesConsecutive(newItems[i - k], newItems[i])) {
          let j = i;
          for (; j < items.length - 1; j++) {
            if (!areStatusesConsecutive(newItems[j], newItems[j + 1]))
              break;
          }
          const orderedCount = j - i + 1;
          const itemsToMove = newItems.splice(i, orderedCount);
          newItems.splice(i - k + 1, 0, ...itemsToMove);
          k = 0;
        }
      }
    }
  }
  return newItems;
}

export { reorderedTimeline as r };
