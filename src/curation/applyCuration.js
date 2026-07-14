// curation/applyCuration.js
// Takes the normal fetched items array plus an artist-authored curation
// config, and returns a new structure ready for rendering: a list of
// "slots", where each slot is either one pinned item or a group of items.
// Everything not mentioned in the config just passes through as normal
// single-item slots, in original order.

// Finds one item in the items array using the configs match rule.
function findItem(items, matcher) {
  return items.find((item) => item[matcher.match] === matcher.value);
}

export function applyCuration(items, curationConfig) {
  if (!curationConfig) {
    // no config at all, every item is its own normal slot
    return items.map((item) => ({ type: 'single', item }));
  }

  const pins = curationConfig.pins ?? [];
  const groups = curationConfig.groups ?? [];

  // Track which item ids are "claimed" by a pin or group, so we don't
  // also render them again as normal single items further down.
  const claimedIds = new Set();

  const pinnedSlots = pins
    .map((pin) => {
      const item = findItem(items, pin);
      if (!item) return null; // artist referenced an item that no longer exists, skip it quietly
      claimedIds.add(item.id);
      return {
        type: 'single',
        item: { ...item, curation: { pinned: true, display: pin.display ?? 'featured' } },
        position: pin.position ?? 'top',
      };
    })
    .filter(Boolean);

  const groupSlots = groups
    .map((group) => {
      const groupItems = group.items
        .map((matcher) => findItem(items, matcher))
        .filter(Boolean);

      if (groupItems.length === 0) return null;

      groupItems.forEach((item) => claimedIds.add(item.id));

      return {
        type: 'group',
        label: group.label ?? '',
        layout: group.layout ?? 'stack',
        items: groupItems.map((item) => ({
          ...item,
          curation: { pinned: false, groupId: group.label ?? 'group' },
        })),
        position: group.position ?? 'top',
      };
    })
    .filter(Boolean);

  // Everything else, in its original fetch order.
  const remainingSlots = items
    .filter((item) => !claimedIds.has(item.id))
    .map((item) => ({ type: 'single', item }));

  // "top" position slots go first, "bottom" go last, numbers work
  // as an index to insert at within the remaining items.
  const topSlots = [...pinnedSlots, ...groupSlots].filter((s) => s.position === 'top');
  const bottomSlots = [...pinnedSlots, ...groupSlots].filter((s) => s.position === 'bottom');

  return [...topSlots, ...remainingSlots, ...bottomSlots];
}