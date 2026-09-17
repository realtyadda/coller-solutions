/* Service visual repair: keep the approved product/solution imagery even when the original
   assets package was not uploaded with the site. */
const serviceVisuals = {
  'assets/water-meter.jpg': 'https://cdn.prod.website-files.com/684ab66c43766be3eb25f712/6870e629e0341378e3a37491_685d4a0c359d58565f2e87c1_iDOL_LoRa_total.jpeg',
  'assets/gas-meter.jpg': 'https://image.made-in-china.com/202f0j00DLmbAOtqAGcR/High-Quality-Iot-Smart-Indsutrial-Lorawan-CNG-Gas-Meter-G10-16-25-40-65.webp',
  'assets/gateway.png': 'https://www.firstshop.co.za/cdn/shop/products/gtwy-ug65-other-accessories-42675151044772.png?v=1679917269&width=640',
  'assets/service-photo-0.jpg': 'https://www.daikin.co.uk/en_gb/about/case-studies/providing-public-buildings-with-iaq/_jcr_content/image43.coreimg.jpeg/1718367506765/daikin-central-europe-ahu-hq2409.jpeg',
  'assets/service-photo-1.jpg': 'https://images.squarespace-cdn.com/content/v1/695c40f702953468ce4ed979/d9f82f8c-b396-482c-b4eb-340c093f74bb/ChatGPT%2BImage%2BJan%2B24%2C%2B2026%2C%2B10_43_13%2BAM.png',
  'assets/service-photo-2.png': 'assets/parking-management.svg',
  'assets/service-photo-2.jpg': 'assets/parking-management.svg',
  'assets/water-pumping.avif': 'assets/scada-water-management.svg',
  'assets/service-photo-3.jpg': 'assets/scada-water-management.svg',
  'assets/service-photo-4.jpg': 'https://solartodo.com/uploads/citycase_abu_dhabi_scene_smart_streetlight_1776082655269_6f6f58d004.jpg',
  'assets/service-photo-5.jpg': 'https://cdn.tpomag.com/uploads/images/20250418_brittany_reynolds__026.jpg?v=1764769615'
};

for (const image of document.querySelectorAll('img[src]')) {
  const replacement = serviceVisuals[image.getAttribute('src')];
  if (replacement) {
    image.src = replacement;
    image.removeAttribute('referrerpolicy');
  }
}

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
