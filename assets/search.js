window.onload = function(){
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);
    console.log("search: " + search_params);
    
    if(!search_params.has('q') || search_params.get('q') == ""){
        window.location.href = './';
    }
    fetch(`https://api.unsplash.com/search/photos?per_page=25&query=${search_params.get('q')}&client_id=${API_KEY}`)
    .then(response => response.json())
    .then(function(data) {
        console.log(data.results);
        generateCards(data.results);
    })
    .catch(error => console.error('Error:', error)); 
};

// function generateCards(data) {
//     const container = document.getElementById('result_container');
//     for(let i = 0; i < data.length; i++) {
//         const single_item =data[i];
//         const card     = document.createElement('div');
//         const anchor   = document.createElement('a');
//         const img      = document.createElement('img');

//         card.classList.add('item');
//         anchor.href = `./detail.html?id=${single_item.id}`;
//         card.style.backgroundColor = single_item.color;
//         img.src = single_item.urls.thumb;

//         anchor.appendChild(img);
//         card.appendChild(anchor);
//         container.appendChild(card);

//     }
// }

function generateCards(data) {
    const container = document.getElementById('result_container');
    for(let i = 0; i < data.length; i++) {
        const single_item = data[i];
        const card     = document.createElement('div');
        const anchor   = document.createElement('a');
        const img      = document.createElement('img');

        card.classList.add('item');
        anchor.href = `./detail.html?id=${single_item.id}`;
        card.style.backgroundColor = single_item.color;
        img.src = single_item.urls.thumb;

        anchor.appendChild(img);
        card.appendChild(anchor);
        container.appendChild(card);
    }
}