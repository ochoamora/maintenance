document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
    fetch('get_posts.php')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = ''; // Limpiar los posts existentes

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <img src="${post.image_path}" alt="User Post">
                    <h3>${post.username} - ${post.date}</h3>
                    <p>${post.comment}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        });
}

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');

    if (fileInput.files[0] && commentInput.value) {
        addPost(fileInput, commentInput.value);
    } else {
        alert('Please provide an image and a comment.');
    }
});

function addPost(fileInput, comment) {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('username', 'user1'); // Example user
    formData.append('comment', comment);
    formData.append('image', file);

    fetch('save_post.php', {
        method: 'POST',
        body: formData,
    }).then(response => response.json())
      .then(result => {
          if (result.success) {
              loadPosts();
          } else {
              alert('Failed to save post.');
          }
      });
}
