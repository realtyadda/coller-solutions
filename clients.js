for (const name of ['client', 'brand']) {
  const control = document.getElementById(`${name}-motion`);
  const marquee = document.getElementById(`${name}-marquee`);
  if (!control || !marquee) continue;
  control.addEventListener('click', () => {
    const paused = marquee.classList.toggle('paused');
    control.setAttribute('aria-pressed', String(paused));
    control.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
  });
  for (const image of marquee.querySelectorAll('img')) {
    const hideFailed = () => { image.hidden = true; };
    image.addEventListener('error', hideFailed);
    if (image.complete && !image.naturalWidth) hideFailed();
  }
}
