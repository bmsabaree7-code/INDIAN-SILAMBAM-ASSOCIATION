# Indian Silambam Association - Registration Website

A professional registration website for the Indian Silambam Association with identity card generation functionality.

## Features

- **Registration Form** with all required fields:
  - First Name and Second Name
  - Date of Birth
  - Address
  - District, State, and Country (dropdowns)
  - Team Name (with uniqueness validation)
  - Passport Size Photo Upload

- **Identity Card Generation**:
  - Automatic ID card display after registration
  - Downloadable PDF identity card
  - Includes all registration details and photo

## Setup Instructions

### 1. Create Images Directory

Create a folder named `images` in the same directory as `index.html` and add the following images:

```
images/
├── silambam-logo.png          (Small Silambam logo - 80x80px recommended)
├── martial-arts-bg1.png       (Background martial arts image 1)
├── martial-arts-bg2.png       (Background martial arts image 2)
├── martial-arts-bg3.png       (Background martial arts image 3)
├── founder.jpg                (Founder's photo - 200x250px recommended)
└── founder-signature.png      (Founder's signature image - 200px width recommended)
```

### 2. Image Requirements

- **silambam-logo.png**: Small logo for header (transparent background recommended)
- **martial-arts-bg1.png, bg2.png, bg3.png**: Background martial arts images (will be displayed with low opacity)
- **founder.jpg**: Photo of Master C.Arumugam D.M.E
- **founder-signature.png**: Signature image for ID card (transparent background recommended)

### 3. Running the Website

1. Simply open `index.html` in a modern web browser
2. No server required - works locally
3. For best results, use Chrome, Firefox, or Edge

## How to Use

1. **Fill in the Registration Form**:
   - Enter all required information
   - Select district, state, and country from dropdowns
   - Enter a unique team name (system will check if it's already registered)
   - Upload a passport-size photo (max 2MB)

2. **Submit Registration**:
   - Click "Register" button
   - If team name is already taken, you'll be notified

3. **View Identity Card**:
   - After successful registration, the identity card page will appear
   - Review your details

4. **Download PDF**:
   - Click "Download Identity Card (PDF)" to save your ID card
   - PDF will be saved to your Downloads folder

## Technical Details

- **HTML5** for structure
- **CSS3** for styling with modern design
- **JavaScript** for form validation and PDF generation
- **jsPDF** library for PDF generation (loaded via CDN)
- **localStorage** for storing registrations and team names

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Notes

- Team names are stored in browser's localStorage
- All registrations are saved locally in the browser
- To clear all registrations, clear browser's localStorage
- Images should be in PNG or JPG format

## Customization

You can customize:
- Colors in `styles.css` (search for color codes like `#ffd700`, `#1a1a2e`)
- Fonts in the `<head>` section of `index.html`
- District/State lists in `script.js` (function `initializeDropdowns()`)

