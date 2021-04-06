
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      console.log('\n >> RESPONSE OK \n');
      alert('Refresh the page to unlock user features!');

      document.getElementById( 'signup_success' ).classList.remove( 'd-none' );
      document.getElementById( 'signup_success' ).classList.add( 'show' );
    } else {
      alert('Failed to sign up.');
    }
  }
};


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
