export const formatContactNumber = (contact_no: string): string => {
    if (!contact_no) return ''; // Handle empty input
    
    // Remove all whitespace
    const cleanedNumber = contact_no.replace(/\s+/g, '');
    
    // If starts with +91, return as is (e.g., +919876543210 → +919876543210)
    if (cleanedNumber.startsWith('+91')) {
      return cleanedNumber;
    }
    
    // If starts with 91 and has 12 digits (91 + 10 digits)
    if (cleanedNumber.startsWith('91') && cleanedNumber.length === 12) {
      return `+${cleanedNumber}`; // e.g., 919876543210 → +919876543210
    }
    
    // For plain 10 digit numbers (e.g., 9876543210 → +919876543210)
    if (/^\d{10}$/.test(cleanedNumber)) {
      return `+91${cleanedNumber}`;
    }
    
    // Return original if somehow invalid (validation should catch this)
    return contact_no;
  };