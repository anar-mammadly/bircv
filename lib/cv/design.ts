/** Mark actual layout columns so typography scales without changing column widths.
 * Single-column content follows the right/main control; split sections use their
 * physical left/right columns. Metadata rows and contact chips are excluded.
 */
export function markDesignRegions(root: HTMLElement, left: number, right: number) {
  root.querySelectorAll<HTMLElement>('[data-cv-region]').forEach(el => {
    el.removeAttribute('data-cv-region');
    el.style.removeProperty('--cv-base-font');
  });
  root.style.setProperty('--cv-region-scale', '1');
  const docWidth = root.getBoundingClientRect().width;
  const regions = new Map<HTMLElement, 'left' | 'right'>();
  for (const row of Array.from(root.querySelectorAll<HTMLElement>('*'))) {
    if (row.closest('header, svg') || row.getBoundingClientRect().width < docWidth * 0.6) continue;
    const cs = getComputedStyle(row);
    if (!(cs.display === 'grid' || (cs.display === 'flex' && cs.flexDirection === 'row'))) continue;
    const children = Array.from(row.children).filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (children.length !== 2) continue;
    const boxes = children.map(el => el.getBoundingClientRect());
    if (boxes.some(b => b.width < docWidth * 0.1 || b.height < 35)) continue;
    if (children.some(el => (el.textContent || '').length < 30)) continue;
    const overlap = boxes[0].right > boxes[1].left + 2 && boxes[1].right > boxes[0].left + 2;
    if (Math.abs(boxes[0].top - boxes[1].top) > 8 || overlap) continue;
    const ordered = children.slice().sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
    regions.set(ordered[0], 'left');
    regions.set(ordered[1], 'right');
  }
  // Read all natural font sizes before applying any scaling to ancestors.
  const sizes = Array.from(regions, ([el, side]) => ({ el, side, font: getComputedStyle(el).fontSize }));
  for (const { el, side, font } of sizes) {
    el.style.setProperty('--cv-base-font', font);
    el.setAttribute('data-cv-region', side);
  }
  root.style.setProperty('--cv-left-scale', String(left));
  root.style.setProperty('--cv-right-scale', String(right));
  root.style.setProperty('--cv-region-scale', String(right));
}

/** Keep the compact contact strip on one row whenever it remains readable. */
export function fitContactRows(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-cv-contacts]').forEach(row => {
    row.style.setProperty('--cv-contact-scale', '1');
    row.style.flexWrap = 'nowrap';
    let scale = 1;
    for (let i = 0; i < 6 && row.scrollWidth > row.clientWidth + 1; i++) {
      scale *= row.clientWidth / row.scrollWidth * 0.98;
      if (scale < 0.65) break;
      row.style.setProperty('--cv-contact-scale', String(scale));
    }
    // Unusually long user-entered URLs must remain visible rather than clip.
    if (row.scrollWidth > row.clientWidth + 1) row.style.flexWrap = 'wrap';
  });
}
