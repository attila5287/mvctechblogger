document.querySelector( '.del-btn' )
.addEventListener('click', async (event) => {
    const id = event.target.id.slice( 13, event.target.id.length   );
    console.log( 'id :>> ', id );
    const response = await fetch( '/api/projects/'+id, {
      method: 'DELETE',
    });

    if ( response.ok ) {
        console.log('\n >> RESPONSE OK \n');
        alert('Deleted project.');
        location.reload()
    } else {
      alert('Failed to delete project.');
    }
    
} ) 
