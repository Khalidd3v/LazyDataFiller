// content.js
let fakeData;

chrome.storage.local.get('fakeData', function(result) {
  fakeData = result.fakeData;
});

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function isLikelyEmail(input, labelText) {
  const emailKeywords = ['email', 'e-mail', 'mail'];
  return input.type === 'email' ||
         emailKeywords.some(keyword => labelText.includes(keyword)) ||
         input.name.toLowerCase().includes('email') ||
         input.id.toLowerCase().includes('email');
}

function isLikelyTextarea(input) {
  return input.tagName.toLowerCase() === 'textarea' ||
         input.rows > 1 ||
         (input.type === 'text' && input.size > 50);
}

function generateRandomData(input, labelText) {
  labelText = labelText ? labelText.toLowerCase() : '';
  
  if (isLikelyEmail(input, labelText)) return getRandomElement(fakeData.email);
  if (isLikelyTextarea(input)) return getRandomElement(fakeData.bio);
  
  if (labelText.includes('name') || input.type === 'text') {
    if (labelText.includes('first')) return getRandomElement(fakeData.firstName);
    if (labelText.includes('last')) return getRandomElement(fakeData.lastName);
    return getRandomElement(fakeData.firstName) + ' ' + getRandomElement(fakeData.lastName);
  }
  if (labelText.includes('phone') || input.type === 'tel') return getRandomElement(fakeData.phone);
  if (labelText.includes('address')) return getRandomElement(fakeData.address);
  if (labelText.includes('city')) return getRandomElement(fakeData.city);
  if (labelText.includes('state')) return getRandomElement(fakeData.state);
  if (labelText.includes('zip') || labelText.includes('postal')) return getRandomElement(fakeData.zipCode);
  if (labelText.includes('country')) return getRandomElement(fakeData.country);
  if (labelText.includes('company')) return getRandomElement(fakeData.company);
  if (labelText.includes('job') || labelText.includes('title')) return getRandomElement(fakeData.jobTitle);
  if (labelText.includes('username')) return getRandomElement(fakeData.username);
  if (labelText.includes('password')) return getRandomElement(fakeData.password);
  if (labelText.includes('card')) return getRandomElement(fakeData.creditCard);
  if (labelText.includes('expiration')) return getRandomElement(fakeData.expirationDate);
  if (labelText.includes('cvv')) return getRandomElement(fakeData.cvv);
  if (labelText.includes('age')) return getRandomElement(fakeData.age);
  if (labelText.includes('birth') || labelText.includes('dob')) return getRandomElement(fakeData.birthDate);
  if (labelText.includes('gender')) return getRandomElement(fakeData.gender);
  if (labelText.includes('occupation')) return getRandomElement(fakeData.occupation);
  if (labelText.includes('education')) return getRandomElement(fakeData.education);
  if (labelText.includes('website')) return getRandomElement(fakeData.website);
  if (labelText.includes('interest')) return getRandomElement(fakeData.interests);
  if (labelText.includes('color')) return getRandomElement(fakeData.favoriteColor);
  if (labelText.includes('language')) return getRandomElement(fakeData.language);
  
  switch (input.type) {
    case 'number':
      return Math.floor(Math.random() * 1000).toString();
    case 'date':
      const date = new Date(+new Date() - Math.floor(Math.random() * 10000000000));
      return date.toISOString().split('T')[0];
    default:
      return 'Sample data';
  }
}

function getLabelText(input) {
  if (input.labels && input.labels.length > 0) {
    return input.labels[0].textContent;
  }
  if (input.getAttribute('aria-label')) {
    return input.getAttribute('aria-label');
  }
  if (input.placeholder) {
    return input.placeholder;
  }
  if (input.name) {
    return input.name;
  }
  return '';
}

function fillForm() {
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (input.type === 'submit' || input.type === 'button') return;
    
    const labelText = getLabelText(input);
    
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = Math.random() > 0.5;
    } else if (input.tagName === 'SELECT') {
      const options = input.options;
      const randomIndex = Math.floor(Math.random() * options.length);
      options[randomIndex].selected = true;
    } else {
      input.value = generateRandomData(input, labelText);
    }
    
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  });
}

document.addEventListener('dblclick', function(event) {
  if (event.target.tagName === 'FORM' || event.target.closest('form')) {
    showConfirmationDialog('Fill form with dummy data?', () => {
      fillForm();
    });
  }
});

function showConfirmationDialog(message, callback) {
  const dialog = document.createElement('div');
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.background = '#fff';
  dialog.style.padding = '10px';
  dialog.style.borderRadius = '5px';
  dialog.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  dialog.style.zIndex = '1000';
  dialog.style.width = '200px';

  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageElement.style.color = '#333';
  messageElement.style.fontSize = '12px';
  messageElement.style.marginBottom = '10px';

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'space-between';

  const yesButton = document.createElement('button');
  yesButton.textContent = 'Yes';
  yesButton.style.background = '#4CAF50';
  yesButton.style.color = '#fff';
  yesButton.style.border = 'none';
  yesButton.style.padding = '5px 10px';
  yesButton.style.borderRadius = '3px';
  yesButton.style.cursor = 'pointer';
  yesButton.style.width = '60px';

  const noButton = document.createElement('button');
  noButton.textContent = 'No';
  noButton.style.background = '#ff3333';
  noButton.style.color = '#fff';
  noButton.style.border = 'none';
  noButton.style.padding = '5px 10px';
  noButton.style.borderRadius = '3px';
  noButton.style.cursor = 'pointer';
  noButton.style.width = '60px';

  dialog.appendChild(messageElement);
  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  dialog.appendChild(buttonContainer);
  document.body.appendChild(dialog);

  yesButton.addEventListener('click', () => {
    callback();
    dialog.remove();
  });

  noButton.addEventListener('click', () => {
    dialog.remove();
  });
}