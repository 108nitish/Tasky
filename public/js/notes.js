document.getElementById('saveNote').addEventListener('click', async () => {
    const noteText = document.getElementById('noteText').value;

    if (noteText) {
        try {
            const response = await fetch('/notes-provider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: noteText })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);    
                document.getElementById('noteText').value = '';   
                window.location.href = '/notes';
            } else {
                console.error('Failed to save note.');
                alert('Failed to save note. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);  
        }
    }
});


async function loadNotes() {
    const response = await fetch('/notes-provider');
    const notes = await response.json();

    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';   

    notes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('notes-card');
        noteItem.innerHTML = `
                            <div class="card-1">
                                <p>${note.content}</p>
                            </div>
                            <div class="card-2">
                                <a href="/delete-note/${note._id}"><i class="fas fa-trash-can" id="notes-del"></i></a>
                                <small>${new Date(note.createdAt).toLocaleString()}</small>
                            </div>`;

        notesList.appendChild(noteItem);
    });
}

loadNotes(); 
