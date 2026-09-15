const contactDialog = document.getElementById('contact-options');
if (contactDialog && typeof contactDialog.showModal === 'function') {
  const first = document.getElementById('contact-number-one');
  const second = document.getElementById('contact-number-two');
  let opener;
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || contactDialog.contains(link) || link.closest('#prepared-enquiry') || link.closest('.contact-links') || link.closest('.footer-details')) return;
    const href = link.getAttribute('href') || '';
    const isCall = href.startsWith('tel:');
    const isWhatsApp = href.startsWith('https://wa.me/');
    if (!isCall && !isWhatsApp) return;
    event.preventDefault(); opener = link;
    document.getElementById('contact-options-title').textContent = isCall ? 'Call Coller Solutions' : 'WhatsApp Coller Solutions';
    document.getElementById('contact-options-note').textContent = isCall ? 'Choose the number you would like to call.' : 'Choose a contact. To reach both numbers, send your message to each separately.';
    for (const [anchor, number] of [[first,'9540302448'],[second,'9540205941']]) {
      anchor.href = isCall ? `tel:+91${number}` : `https://wa.me/91${number}${new URL(href).search}`;
      anchor.textContent = `${isCall ? 'Call' : 'WhatsApp'}: ${number}`;
      if (isWhatsApp) { anchor.target = '_blank'; anchor.rel = 'noopener'; }
      else { anchor.removeAttribute('target'); anchor.removeAttribute('rel'); }
    }
    contactDialog.showModal();
  });
  contactDialog.querySelector('.dialog-close').addEventListener('click', () => contactDialog.close());
  contactDialog.addEventListener('click', event => {
    if (event.target !== contactDialog) return;
    const r = contactDialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) contactDialog.close();
  });
  contactDialog.addEventListener('close', () => opener?.focus());
}
