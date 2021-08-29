const timer = document.querySelector('.timer')
const timeBtns = document.querySelectorAll('.mins')
const soundBtns = document.querySelectorAll('.background button')
const video = document.querySelector('.bg-video video')
const music = document.querySelector('.music')
const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const playBreath = document.querySelector('.play-breath')
const pauseBreath = document.querySelector('.pause-breath')
const movingOutline = document.querySelector('.moving-outline circle')
const trackOutline = document.querySelector('.track-outline-breath circle')
const text = document.querySelector('.text')
let duration = 600;

function resetChoice(){
  play.classList.remove('hide')
  pause.classList.remove('show')
  video.pause()
  music.pause()
  music.currentTime = 0
}

soundBtns.forEach(button => {
  button.addEventListener('click', function (){ 
    resetChoice();
    video.src=this.dataset.video
    music.src=this.dataset.sound
  })
})

play.addEventListener('click', function (){
  video.play()
  music.play()
  play.classList.add('hide')
  pause.classList.add('show')
})
pause.addEventListener('click', function (){
  video.pause()
  music.pause()
  play.classList.remove('hide')
  pause.classList.remove('show')
})

const movingOutlineLength = movingOutline.getTotalLength();
movingOutline.style.strokeDasharray = movingOutlineLength;

timeBtns.forEach(button => {
  button.addEventListener('click', () => {
    resetChoice()
    music.currentTime = 0
    duration = button.dataset.time
  })
})

music.ontimeupdate = function (){
  let currentTime = music.currentTime
  let elapsed = duration - currentTime
  let seconds = Math.floor(elapsed % 60)
  let minutes = Math.floor(elapsed / 60)
  let progress = movingOutlineLength - (currentTime / duration) * movingOutlineLength
  movingOutline.style.strokeDashoffset = progress;

  if (seconds < 10) {
    seconds = '0' + seconds
  }
  if (minutes <= 0 && seconds <= 0) {
    resetChoice()
    timer.textContent = '0.00'
  }
  timer.textContent = `${minutes}:${seconds}`
}
