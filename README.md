# Chrome Extension: Auto Form Filler with Fake Data

This Chrome extension allows you to automatically fill out forms with fake data by simply double-clicking on any form field. Upon double-clicking, a prompt will appear asking if you want to fill the form. If you select "Yes", the form will be automatically populated with fake data; otherwise, the form remains unchanged.

## Features
- Auto-fills forms with fake data upon confirmation.
- Simple prompt with "Yes" and "No" buttons to control form filling.
- Easily configurable for any form on any webpage.

## Installation Instructions

### Step 1: Download the Code from GitHub
1. Clone or download this repository as a ZIP file from GitHub.
   - Click the green "Code" button at the top right of this page.
   - Select "Download ZIP" to download the project files.
   - Alternatively, you can clone the repository using the command line:
     ```bash
     git clone https://github.com/khalidd3v/lazydatafiller.git
     ```

### Step 2: Unzip the Downloaded File
- If you've downloaded the ZIP file, unzip it to extract the contents.
- You should now have a folder containing all the necessary files.

### Step 3: Add the Extension to Chrome
1. Open Google Chrome.
2. In the address bar, type `chrome://extensions/` and press Enter.
3. At the top right, enable **Developer mode**.
4. Click the **Load unpacked** button.
5. Navigate to the folder where you unzipped the project files and select it.
6. The extension will now be added to Chrome, and you should see it listed on the Extensions page.

### Step 4: Test the Extension
1. Navigate to any webpage with a form.
2. Double-click on any form field.
3. A prompt will appear asking if you'd like to fill the form with fake data.
   - **Click "Yes"** to automatically fill the form with fake data.
   - **Click "No"** to leave the form unchanged.

## How It Works
- The extension listens for double-click events on form elements.
- Once a form element is double-clicked, a confirmation prompt appears.
- If "Yes" is selected, the extension automatically fills all form fields with placeholder data such as names, email addresses, phone numbers, etc.
- If "No" is selected, the form is left as-is.

## Support
If you encounter any issues, feel free to open an issue on the [GitHub repository](https://github.com/khalidd3v/lazydatafiller/issues).

---

Let me know if you need any further customization!
