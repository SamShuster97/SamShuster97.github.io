const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');
const sendButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (sendButton.disabled) return;

  const data = new FormData(contactForm);
  const fields = contactForm.querySelectorAll('input:not([name="_gotcha"]), textarea');
  sendButton.disabled = true;
  fields.forEach(field => { field.readOnly = true; });
  contactStatus.removeAttribute('data-error');
  contactStatus.textContent = 'Sending your message…';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      contactStatus.setAttribute('data-error', '');
      contactStatus.textContent = response.status === 429
        ? 'Too many messages were sent. Please wait a minute and try again.'
        : 'Your message could not be sent. Try again or reach out on LinkedIn.';
      return;
    }

    contactForm.reset();
    contactStatus.textContent = 'Thanks. Your message was sent.';
  } catch {
    contactStatus.setAttribute('data-error', '');
    contactStatus.textContent = 'Sending could not be confirmed. You can also reach out on LinkedIn.';
  } finally {
    fields.forEach(field => { field.readOnly = false; });
    sendButton.disabled = false;
  }
});
