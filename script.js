// Store registered team names in localStorage
const registeredTeamsKey = 'registeredTeams';
const registrationsKey = 'registrations';

// Initialize dropdowns
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdowns();
    setupFormHandlers();
    checkTeamNameUniqueness();
});

// Initialize State, District, and Country dropdowns
function initializeDropdowns() {
    // Countries
    const countries = [
        'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
        'Germany', 'France', 'Japan', 'China', 'Brazil', 'Russia', 'South Korea'
    ];
    
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // States (Indian states)
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
    ];

    const stateSelect = document.getElementById('state');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Districts (Sample districts - you can expand this)
    const districts = [
        'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
        'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul',
        'Karur', 'Namakkal', 'Theni', 'Kanyakumari', 'Ariyalur',
        'Cuddalore', 'Dharmapuri', 'Kanchipuram', 'Krishnagiri', 'Nagapattinam',
        'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga', 'Thiruvallur',
        'Thiruvarur', 'Tuticorin', 'Villupuram', 'Virudhunagar', 'Aranthangi'
    ];

    const districtSelect = document.getElementById('district');
    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });

    // Update districts based on selected state
    stateSelect.addEventListener('change', function() {
        updateDistricts(this.value);
    });
}

// Update districts based on state (simplified version)
function updateDistricts(state) {
    const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    // In a real application, you would have a mapping of state to districts
    // For now, we'll keep the same districts for all states
    const districts = [
        'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
        'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul',
        'Karur', 'Namakkal', 'Theni', 'Kanyakumari', 'Ariyalur',
        'Cuddalore', 'Dharmapuri', 'Kanchipuram', 'Krishnagiri', 'Nagapattinam',
        'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga', 'Thiruvallur',
        'Thiruvarur', 'Tuticorin', 'Villupuram', 'Virudhunagar', 'Aranthangi'
    ];

    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

// Setup form handlers
function setupFormHandlers() {
    const form = document.getElementById('registrationForm');
    const photoInput = document.getElementById('photo');
    const teamNameInput = document.getElementById('teamName');

    // Photo preview
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('photoPreview');
                preview.innerHTML = `<img src="${e.target.result}" alt="Photo Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Team name uniqueness check
    teamNameInput.addEventListener('blur', checkTeamNameUniqueness);

    // Phone number validation
    const phoneNumberInput = document.getElementById('phoneNumber');
    const phoneNumberError = document.getElementById('phoneNumberError');
    phoneNumberInput.addEventListener('input', function() {
        const phone = this.value.trim();
        const phoneRegex = /^[0-9]{0,10}$/;
        
        if (phone.length > 0 && !phoneRegex.test(phone)) {
            phoneNumberError.textContent = 'Please enter only numbers';
            this.style.borderColor = '#e74c3c';
        } else if (phone.length > 0 && phone.length < 10) {
            phoneNumberError.textContent = 'Phone number must be 10 digits';
            this.style.borderColor = '#e74c3c';
        } else if (phone.length === 10) {
            phoneNumberError.textContent = '';
            this.style.borderColor = '#4caf50';
        } else {
            phoneNumberError.textContent = '';
            this.style.borderColor = '#ddd';
        }
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Check if team name is already registered
function checkTeamNameUniqueness() {
    const teamNameInput = document.getElementById('teamName');
    const errorMessage = document.getElementById('teamNameError');
    const teamName = teamNameInput.value.trim();

    if (!teamName) {
        errorMessage.textContent = '';
        return;
    }

    const registeredTeams = getRegisteredTeams();
    
    if (registeredTeams.includes(teamName.toLowerCase())) {
        errorMessage.textContent = 'This team name is already registered!';
        teamNameInput.setCustomValidity('Team name already exists');
        teamNameInput.style.borderColor = '#e74c3c';
    } else {
        errorMessage.textContent = '';
        teamNameInput.setCustomValidity('');
        teamNameInput.style.borderColor = '#ddd';
    }
}

// Get registered teams from localStorage
function getRegisteredTeams() {
    const teams = localStorage.getItem(registeredTeamsKey);
    return teams ? JSON.parse(teams) : [];
}

// Save registered team to localStorage
function saveRegisteredTeam(teamName) {
    const teams = getRegisteredTeams();
    teams.push(teamName.toLowerCase());
    localStorage.setItem(registeredTeamsKey, JSON.stringify(teams));
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const teamName = document.getElementById('teamName').value.trim();
    const registeredTeams = getRegisteredTeams();

    // Final check for team name uniqueness
    if (registeredTeams.includes(teamName.toLowerCase())) {
        alert('This team name is already registered! Please choose a different team name.');
        return;
    }

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        secondName: document.getElementById('secondName').value.trim(),
        dateOfBirth: document.getElementById('dateOfBirth').value,
        address: document.getElementById('address').value.trim(),
        district: document.getElementById('district').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        teamName: teamName,
        photo: document.getElementById('photo').files[0]
    };

    // Validate all fields
    if (!validateForm(formData)) {
        return;
    }

    // Save registration
    saveRegistration(formData);
    
    // Save team name
    saveRegisteredTeam(teamName);

    // Show identity card page
    showIdentityCard(formData);
}

// Validate form data
function validateForm(formData) {
    if (!formData.firstName || !formData.secondName || !formData.dateOfBirth ||
        !formData.address || !formData.district || !formData.state ||
        !formData.country || !formData.phoneNumber || !formData.teamName || !formData.photo) {
        alert('Please fill in all required fields!');
        return false;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
        alert('Please enter a valid 10-digit phone number!');
        document.getElementById('phoneNumber').focus();
        return false;
    }

    // Validate photo size (max 2MB)
    if (formData.photo.size > 2 * 1024 * 1024) {
        alert('Photo size should be less than 2MB!');
        return false;
    }

    return true;
}

// Save registration to localStorage
function saveRegistration(formData) {
    const registrations = getRegistrations();
    
    // Convert photo to base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const registrationData = {
            ...formData,
            photo: e.target.result,
            registrationDate: new Date().toISOString()
        };
        
        registrations.push(registrationData);
        localStorage.setItem(registrationsKey, JSON.stringify(registrations));
    };
    reader.readAsDataURL(formData.photo);
}

// Get registrations from localStorage
function getRegistrations() {
    const registrations = localStorage.getItem(registrationsKey);
    return registrations ? JSON.parse(registrations) : [];
}

// Show identity card page
function showIdentityCard(formData) {
    // Hide registration form
    document.querySelector('.container').style.display = 'none';

    // Show identity card page
    const idCardPage = document.getElementById('idCardPage');
    idCardPage.classList.remove('hidden');

    // Populate identity card
    document.getElementById('idCardName').textContent = `${formData.firstName} ${formData.secondName}`;
    document.getElementById('idCardAddress').textContent = `${formData.address}, ${formData.district}, ${formData.state}, ${formData.country}`;
    document.getElementById('idCardPhone').textContent = formData.phoneNumber;
    document.getElementById('idCardTeam').textContent = formData.teamName;

    // Set photo
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('idCardPhoto').src = e.target.result;
        // Store photo data for PDF
        window.currentRegistrationData = {
            ...formData,
            photo: e.target.result
        };
    };
    reader.readAsDataURL(formData.photo);
}

// Go back to registration page
function goBack() {
    document.getElementById('idCardPage').classList.add('hidden');
    document.querySelector('.container').style.display = 'block';
    document.getElementById('registrationForm').reset();
    document.getElementById('photoPreview').innerHTML = '';
}

// Download PDF Identity Card
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', [85.6, 53.98]); // ID card size in mm (standard credit card size)

    const data = window.currentRegistrationData;
    if (!data) {
        alert('Registration data not found!');
        return;
    }

    // Background color
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 85.6, 53.98, 'F');

    // Border
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(2);
    doc.rect(2, 2, 81.6, 49.98);

    // Logo (placeholder - you'll need to add actual logo)
    // doc.addImage(logoData, 'PNG', 5, 5, 15, 15);

    // Title
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 46);
    doc.text('INDIAN SILAMBAM ASSOCIATION', 42.8, 10, { align: 'center' });

    // Photo
    try {
        doc.addImage(data.photo, 'JPEG', 5, 15, 25, 30);
    } catch (e) {
        console.error('Error adding image:', e);
    }

    // Member details
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    let yPos = 18;
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', 32, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.firstName} ${data.secondName}`, 32, yPos + 5);

    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Address:', 32, yPos);
    doc.setFont('helvetica', 'normal');
    const addressLines = doc.splitTextToSize(`${data.address}, ${data.district}`, 50);
    doc.text(addressLines, 32, yPos + 5);
    
    yPos += addressLines.length * 5 + 2;
    const stateCountry = `${data.state}, ${data.country}`;
    doc.text(stateCountry, 32, yPos);

    yPos += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', 32, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(data.phoneNumber, 32, yPos + 5);

    yPos += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Team:', 32, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(data.teamName, 32, yPos + 5);

    // Founder signature (placeholder)
    // doc.addImage(signatureData, 'PNG', 50, 40, 30, 10);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'italic');
    doc.text('Founder\'s Signature', 42.8, 48, { align: 'center' });

    // Save PDF
    const fileName = `Silambam_ID_${data.firstName}_${data.secondName}_${Date.now()}.pdf`;
    doc.save(fileName);
}

