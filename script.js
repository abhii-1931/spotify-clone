let currentPlayingSong = new Audio()
let songlist
let currentSong
let folder
let songlistnew = []


async function loadalbums(){
    let songs = await fetch(`http://127.0.0.1:3001/songs/albums/`)
    let songhtml = await songs.text()
    let madeelem = document.createElement('div')
    madeelem.innerHTML = songhtml
    let findSong = madeelem.getElementsByTagName("a")
    let alllocalsongs = []
    for (const song of findSong) {
        let newsong = song.getAttribute('href').split("\\").slice(-1,)
        if (newsong[0].endsWith('.mp3')) {
            alllocalsongs.push(newsong)
        }
    }
    for (let i = 0; i < alllocalsongs.length; i++) {
        let photo = alllocalsongs[i][0].replace('.mp3', '.png')
        let name = alllocalsongs[i][0].replace('.mp3', '')
        html = `<div class="albumcard">
                    <img src="http://127.0.0.1:3001/songs/albums/thumbs/${photo}" alt="abhishek" class="albumsong">
                    <p class="albumsongs">
                    ${name}
                    </p>
                    <small>Unknown</small>
                </div>`
        document.querySelector(".albumcards").insertAdjacentHTML('beforeend', html)
    }
}


async function settingartist(){
    let artists = ['arijit singh', 'diljit', 'sidhu']
    for (const artist of artists) {
        let photo = `http://127.0.0.1:3001/songs/popular artist/${artist}/${artist}.png`
        html = `<div class="card" id="local">
                    <img src="${photo}" alt="abhishek" class="${artist.trim()}">
                    <h3 class="artistname">
                    ${artist}
                    </h3>
                    <p>artist</p>
                </div>`
        document.querySelector(".cards").insertAdjacentHTML('beforeend', html)
    }

    folder = `http://127.0.0.1:3001/songs/popular artist/${artists[0]}/`
    songlist = await getsong(folder)
    songlist = songlist.slice(1,)
    for (const songs of songlist) {
            songlistnew.push(songs[0]) 
    }
    addsong(songlist)
    playMusic(folder, songlist[0][0], true)
}

async function settingmovies(){
    let artists = ['dabang', 'shershah', 'shiddat']
    for (const artist of artists) {
        let photo = `http://127.0.0.1:3001/songs/popular movies/${artist}/${artist}.png`
        html = `<div class="moviecard">
                    <img src="${photo}" alt="abhishek" class="${artist.trim()}">
                    <h3 class="artistname">
                    ${artist}
                    </h3>
                    <p>Movie</p>
                </div>`
        document.querySelector(".moviecards").insertAdjacentHTML('beforeend', html)
    }
}



async function getsong(folder = 'songs') {
    let songs = await fetch(`${folder}`)
    let songhtml = await songs.text()
    let madeelem = document.createElement('div')
    madeelem.innerHTML = songhtml
    let findSong = madeelem.getElementsByTagName("a")
    let alllocalsongs = []
    for (const song of findSong) {
        let newsong = song.getAttribute('href').split("\\").slice(-1,)
        if (newsong[0].endsWith('.mp3')) {
            alllocalsongs.push(newsong)
        }
    }
    return alllocalsongs
} 


function addsong(songlist) {
    let localplaylistouter = document.getElementById("localplaylistouter1")
    for (const song of songlist) {
        let localplaylist = document.createElement("div")
        localplaylist.className = "localplaylist"
        localplaylist.innerHTML = `
            <img class="musiclogo" src="svg images/music.svg" alt="song">
            <div class="localsongdetails">
                <p class="localsongname">${song}</p>
                <p class="localartistname">Abhishek Choudhary</p>
            </div>
            <div class="playlogo">
                <span>play</span>
                <img src="svg images/play.svg" alt="play">
            </div>`
        localplaylistouter.appendChild(localplaylist)
    }
}


function playMusic(folder, song, pause = false) {
    currentSong = song
    currentPlayingSong.src = `${folder}/${song}`
    if (pause) {
        currentPlayingSong.pause()
        document.querySelector(".seeksongname").innerHTML = song
        updateSeekTime(0, song.duration)
    }
    else {
        currentPlayingSong.play()
        document.querySelector(".playpausesong").src = 'svg images/pause.svg'
        document.querySelector(".seeksongname").innerHTML = song
    }
}


function timeintosec(totalduretion) {
    return Math.floor(totalduretion / 60) + ":" + Math.round(totalduretion % 60)
}


function updateSeekTime(currenttime, totalduretion) {
    let seektimeplace = document.querySelector(".timeduretion")
    seektimeplace.innerHTML = (timeintosec(currenttime) + " / " + timeintosec(totalduretion))

}


async function main() {
    settingartist()
    settingmovies()
    loadalbums()
    Array.from(document.querySelector('.cards').children).forEach(e =>{
        e.addEventListener('click', async ()=>{
            document.querySelector(".localplaylistouter").innerHTML = "" 
            let ruffolder = e.getElementsByTagName('img')[0].className
            folder = `http://127.0.0.1:3001/songs/popular artist/${ruffolder}/`
            songlist = await getsong(folder)
            songlist = songlist.slice(1,)
            songlistnew = []
            for (const songs of songlist) {
                    songlistnew.push(songs[0]) 
            }
            addsong(songlist)
            playMusic(folder, songlist[0][0])
        })
    })  
    Array.from(document.querySelector('.moviecards').children).forEach(e =>{
        e.addEventListener('click', async ()=>{
            document.querySelector(".localplaylistouter").innerHTML = "" 
            let ruffolder = e.getElementsByTagName('img')[0].className
            folder = `http://127.0.0.1:3001/songs/popular movies/${ruffolder}/`
            songlist = await getsong(folder)
            songlist = songlist.slice(1,)
            songlistnew = []
            for (const songs of songlist) {
                    songlistnew.push(songs[0]) 
            }
            addsong(songlist)
            playMusic(folder, songlist[0][0])
        })
    })  

    Array.from(document.querySelector('.albumcards').children).forEach(e =>{
        e.addEventListener('click', async ()=>{
            console.log('abhisehk')
            folder = `http://127.0.0.1:3001/songs/albums/`
            songlist = await getsong(folder)
            songlist = songlist.slice(1,)
            songlistnew = []
            for (const songs of songlist) {
                    songlistnew.push(songs[0]) 
            }
            addsong(songlist)
            playMusic(folder, songlist[0][0])
        })
    })  


  // Array.from(document.querySelector('.localplaylistouter').children).forEach(e=>{
    //     e.querySelector(".playlogo").addEventListener('click', ()=>{
    //         console.log('herry')
    //     })
    // })
    
    document.querySelector('.nextsong').addEventListener('click', ()=>{
        currentSong = currentPlayingSong.src.split("/").slice(-1, ) [0]
        let index = songlistnew.indexOf(decodeURI(currentSong))
        index = index+1
        if (index == songlist.length) {
                index = 0
        }
        playMusic(folder, songlist[index])
    })
        
    document.querySelector('.previussong').addEventListener('click', ()=>{
        currentSong = currentPlayingSong.src.split("/").slice(-1, ) [0]
        let index = songlistnew.indexOf(decodeURI(currentSong))
        index = index-1
        if (index == -1) {
            index = (songlist.length - 1) 
        }
        playMusic(folder, songlist[index])
    })
    document.querySelector(".playpausesong").addEventListener('click', () => {
        if (currentPlayingSong.paused) {
            document.querySelector(".playpausesong").src = 'svg images/pause.svg'
            currentPlayingSong.play()
        } else {
            currentPlayingSong.pause()
            document.querySelector(".playpausesong").src = 'svg images/play.svg'
        }
    })
        
        
    currentPlayingSong.addEventListener('timeupdate', () => {
        updateSeekTime(currentPlayingSong.currentTime, currentPlayingSong.duration)
        document.querySelector(".circle").style.left = (currentPlayingSong.currentTime / currentPlayingSong.duration) * 90 + 4 + "%"
        if (currentPlayingSong.paused) {
            document.querySelector(".playpausesong").src = 'svg images/play.svg'
        }
    })
        
        
    document.querySelector('.seekbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentPlayingSong.currentTime = ((currentPlayingSong.duration) * percent) / 100
    })
        
        
    document.querySelector('.volumerange').addEventListener('change', (e)=>{
        let setvolume = (e.target.value)/100
        currentPlayingSong.volume = setvolume
        if (setvolume==0) {
            document.querySelector('.volumelogo').src = 'svg images/mutevolume.svg'
        } 
        else if (setvolume<=0.5) {
            document.querySelector('.volumelogo').src = 'svg images/midvolume.svg'
        }
        else{
            document.querySelector('.volumelogo').src = 'svg images/volume.svg'
        }
    })
}
main()
    
    
    
    
    
    
    
    
