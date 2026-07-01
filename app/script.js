const form = document.getElementById('privacy-form');
const outputPanel = document.getElementById('output-panel');
const outputText = document.getElementById('output-text');
const copyButton = document.getElementById('copy-button');

const requestLabel = {
  'remove-content': 'remove the content from the website',
  'remove-search': 'remove the content from search results',
  'report-privacy': 'report a privacy violation',
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const contentUrl = formData.get('contentUrl').trim();
  const platform = formData.get('platform').trim();
  const privacyIssue = formData.get('privacyIssue').trim();
  const requestType = formData.get('requestType');

  if (!contentUrl || !platform || !privacyIssue) {
    return;
  }

  const subject = `Privacy removal request for content on ${platform}`;
  const body = generateBody(contentUrl, platform, privacyIssue, requestType);

  outputText.textContent = `Subject: ${subject}\n\n${body}`;
  outputPanel.classList.remove('hidden');
});

copyButton.addEventListener('click', async () => {
  const text = outputText.textContent;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = 'Copy to clipboard'; }, 1600);
  } catch (error) {
    copyButton.textContent = 'Unable to copy';
  }
});

function generateBody(url, platform, issue, requestType) {
  const action = requestLabel[requestType] || 'review this content';

  return `Hello,

I am writing to request that you ${action} at the following address:\n${url}\n\nThis content contains the following private information:\n${issue}\n\nThe content is a privacy concern because it exposes my personal data without consent and could cause harm if it remains publicly available. Please confirm that you have received this request and tell me what steps you will take next.
\nIf ${requestType === 'remove-search' ? 'you are not the correct contact for search removal requests, please forward this to the appropriate team.' : 'you do not handle this request, please let me know who I should contact.'}
\nThank you for your help.
`;
}
