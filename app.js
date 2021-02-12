const searchSong = () => {
    const query = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${query}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => console.log(error));
    
};

const displaySongs = songs =>{
    const searchResult = document.getElementById("search-result");
    searchResult.innerHTML = '';
    console.log(songs);
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.classList = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        searchResult.appendChild(songDiv);
    });
};

const getLyric = async (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data);
    }catch(error){
        console.log(error);
        
    }
    
    
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayLyric(data))
    // .catch(error => console.log(error));
    window.location = await `#lyric-display`;
};

const displayLyric = lyric => {
    console.log(lyric);
    const lyricDisplay = document.getElementById("lyric-display");
    lyricDisplay.innerText = `${lyric.lyrics}`;
};