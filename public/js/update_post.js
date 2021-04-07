const update_post = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('#post_id').value.trim();
  const user_id = document.querySelector('#user_id').value.trim();
  const category_id = document.querySelector('#category_id').value.trim();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (category_id && title  && content) {
    const response = await fetch('/post/'+post_id, {
      method: 'PUT',
      body: JSON.stringify({ user_id, category_id, title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      console.log('\n >> RESPONSE OK \n');
      document.location.replace('/');
      
      alert( 'Refresh the page to unlock user features!' );
      
      document.getElementById( 'update_success' ).classList.remove( 'd-none' );
      document.getElementById( 'update_success' ).classList.add( 'show' );

    } else {
      alert('Failed to update post.');
    }
  }
};


document
  .querySelector('.update-post')
  .addEventListener('submit', update_post);

