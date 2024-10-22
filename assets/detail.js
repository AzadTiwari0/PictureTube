window.onload = function() {
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);

    if (!search_params.has('id') || search_params.get('id') === "") {
        window.location.href = './';
    }

    fetch(`https://api.unsplash.com/photos/${search_params.get('id')}?client_id=${API_KEY}`)
        .then(response => response.json())
        .then(function(data) {
            loadDetail(data);
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}

function loadDetail(data) {
    console.log(data);
    const imageElement = document.getElementById('detail_image');
    imageElement.src = data.urls.regular;
    imageElement.style.borderColor = data.color;

    // Add cursor: pointer; to show finger icon on hover
    imageElement.style.cursor = 'pointer';

    document.getElementById('description_text').innerText = data.description;
    document.getElementById('username').innerText = data.user.username;
    document.getElementById('like_count').innerText = data.likes;
    document.getElementById('view_count').innerText = data.views;
    document.getElementById('alt_description').innerText = data.alt_description;
    document.getElementById('image_color').style.backgroundColor = data.color;
    document.getElementById('color_text').innerText = data.color;

    const date = new Date(data.created_at);
    const upload_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    document.getElementById('upload_date').innerText = upload_date;

    // Set up the download button with the full image URL
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.dataset.downloadUrl = data.urls.full; // Save the download URL in a data attribute

    // Set up the open button with the full image URL
    const openBtn = document.getElementById('openBtn');
    openBtn.dataset.openUrl = data.urls.full; // Save the open URL in a data attribute
}

// Parachute Download Animation JavaScript
const downloadBtn = document.getElementById('downloadBtn');
const openBtn = document.getElementById('openBtn'); // New open button
const parachute = document.getElementById('parachute');

downloadBtn.addEventListener('click', async () => {
    // Show parachute
    parachute.style.display = 'block';

    // Trigger the download
    const imageUrl = downloadBtn.dataset.downloadUrl;

    try {
        // Fetch the image and convert it to a Blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Create a URL for the Blob and force download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `downloaded-image.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link after download

    } catch (error) {
        console.error('Error downloading the image:', error);
    }

    // Start parachute landing animation
    setTimeout(() => {
        parachute.classList.add('landing');
    }, 100);

    // Hide parachute after a short delay (e.g., after 3.5 seconds)
    setTimeout(() => {
        parachute.classList.remove('landing');
        parachute.style.display = 'none';
    }, 3500);
});

// Open Button functionality - Opens the image in a new tab
openBtn.addEventListener('click', () => {
    const imageUrl = openBtn.dataset.openUrl;
    window.open(imageUrl, '_blank'); // Open the image in a new tab
});
