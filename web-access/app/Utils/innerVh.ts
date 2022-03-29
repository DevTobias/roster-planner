/**
 * Calculates the inner viewport height and saves it to the root element. This means
 * that things like the mobile url bar are taken into account.
 *
 * @example min-height: calc(var(--innerVh, 1vh) * 100);
 *
 * @returns A function to unmount the added resize event listener.
 */
const innerVh = () => {
  let [lastKnownWidth, lastKnownHeight] = [0, 0];

  const updateProperty = () => {
    const [width, height] = [window.innerWidth, window.innerHeight];

    // If nothing has changed or the the height difference is less than the maximum height
    // of the collapsible ui, then do noting
    if (width === lastKnownWidth && Math.abs(height - lastKnownHeight) <= 100) {
      return;
    }

    // Calculate the real inner vh unit in pixel and safe it to the root element
    document.documentElement.style.setProperty(
      `--innerVh`,
      `${height / 100}px`
    );

    // Safe the current height, to later check, if the height was changed
    // after an resize call or not, so useless calculations can be prevented.
    [lastKnownWidth, lastKnownHeight] = [width, height];
  };

  window.addEventListener('resize', updateProperty);
  updateProperty();

  return () => window.removeEventListener('resize', updateProperty);
};

export default innerVh;
