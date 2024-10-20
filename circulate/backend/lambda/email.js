exports.handler = async (event) => {
    // Extract email from the request
    const email = event.request.userAttributes.email;
  
    // Check if email ends with "@lehigh.edu"
    if (email && email.endsWith('@lehigh.edu')) {
      // Allow the sign-up to proceed
      event.response.autoConfirmUser = true;
      return event;
    } else {
      // Reject the sign-up
      throw new Error('Invalid email domain. Only @lehigh.edu emails are allowed.');
    }
  };