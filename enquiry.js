const form = document.getElementById('quote-form');
if (form) {
  const params = new URLSearchParams(location.search);
  const service = form.elements.namedItem('service');
  const purpose = form.elements.namedItem('purpose');
  for (const [field,key] of [[service,'service'],[purpose,'purpose']]) {
    if ([...field.options].some(o => o.value === params.get(key))) field.value = params.get(key);
  }
  const messageInput = form.elements.namedItem('message');
  const phone = form.elements.namedItem('phone');
  const prepared = document.getElementById('prepared-enquiry');
  const status = document.getElementById('enquiry-status');
  function updatePurpose() {
    if (purpose.value === 'AMC enquiry') service.value = 'Annual maintenance contract';
    messageInput.placeholder = purpose.value === 'AMC enquiry'
      ? 'Equipment makes and quantities, known faults, comprehensive or non-comprehensive cover, and preferred visit frequency'
      : 'Approximate equipment quantity, existing system details and what you want to achieve';
  }
  if (service.value === 'Annual maintenance contract') purpose.value = 'AMC enquiry';
  updatePurpose();
  purpose.addEventListener('change', () => {
    if (purpose.value !== 'AMC enquiry' && service.value === 'Annual maintenance contract') service.value = '';
    updatePurpose();
  });
  service.addEventListener('change', () => {
    if (service.value === 'Annual maintenance contract') { purpose.value = 'AMC enquiry'; updatePurpose(); }
    else if (purpose.value === 'AMC enquiry') { purpose.value = 'New installation'; updatePurpose(); }
  });
  phone.addEventListener('input', () => phone.setCustomValidity(''));
  form.addEventListener('input', () => { prepared.hidden = true; status.textContent = ''; });
  form.addEventListener('change', () => { prepared.hidden = true; status.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const digits = phone.value.replace(/\D/g,'');
    phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 && /^[+\d\s().-]+$/.test(phone.value) ? '' : 'Enter a valid phone number with 10 to 15 digits.');
    if (!form.reportValidity()) return;
    for (const field of [form.elements.namedItem('name'),form.elements.namedItem('location'),messageInput]) {
      if (!field.value.trim()) { field.value = ''; field.reportValidity(); return; }
    }
    const data = new FormData(form);
    const message = ['Hello Coller Solutions,','',`Enquiry: ${purpose.value}`,`Service: ${service.value}`,
      `Name: ${String(data.get('name')).trim()}`,`Phone: ${phone.value.trim()}`,
      `Society / company: ${String(data.get('property')).trim() || 'Not specified'}`,
      `Site location: ${String(data.get('location')).trim()}`,'','Requirements:',messageInput.value.trim()].join('\n');
    document.getElementById('prepared-email').href = `mailto:sales@collersolutions.com,collersolutions@gmail.com?subject=${encodeURIComponent(purpose.value + ': ' + service.value)}&body=${encodeURIComponent(message)}`;
    document.getElementById('prepared-wa-one').href = `https://wa.me/919540302448?text=${encodeURIComponent(message)}`;
    document.getElementById('prepared-wa-two').href = `https://wa.me/919540205941?text=${encodeURIComponent(message)}`;
    document.getElementById('prepared-message').textContent = message;
    prepared.hidden = false;
    status.textContent = 'Enquiry prepared. Choose a contact option below and send your message in that app.';
    document.getElementById('prepared-email').focus();
  });
}
