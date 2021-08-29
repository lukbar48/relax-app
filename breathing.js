const breathBtns = document.querySelectorAll('.mins')
const soundBtns = document.querySelectorAll('.background button')
const video = document.querySelector('.bg-video video')
const music = document.querySelector('.music')
const playBreath = document.querySelector('.play-breath')
const pauseBreath = document.querySelector('.pause-breath')
const movingOutline = document.querySelector('.moving-outline circle')
const trackOutline = document.querySelector('.track-outline-breath circle')
const breathContainer = document.querySelector('.breath-cycle-container')
const pointer = document.querySelector('.pointer-container')
const text = document.querySelector('.text')
const textBottom = document.querySelector('.text-bottom')

let cycleTime = 7000;
let number = 0;
let timeouts = [];

function resetChoice() {
  playBreath.classList.remove('hide')
  video.pause()
  music.pause()
  text.textContent = ''
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  if (typeof interval !== 'undefined') {
    clearInterval(interval)
  }
  breathContainer.classList = 'breath-cycle-container';
  pointer.classList = 'pointer-container';
}

soundBtns.forEach(button => {
  button.addEventListener('click', function () {
    resetChoice();
    video.src = this.dataset.video
    music.src = this.dataset.sound
  })
})

breathBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    for (i = 0; i < breathBtns.length; i++) {
      breathBtns[i].classList.remove('active-breath')
    }
    resetChoice()
    btn.classList.add('active-breath')
    if (this.dataset.breath === 'calming') {
      cycleTime = 7000;
    } else if (this.dataset.breath === 'wim') {
      cycleTime = 1800;
    } else if (this.dataset.breath === 'box') {
      cycleTime = 10000;
    }
  })
})

function startCycle() {
  if (cycleTime == 7000) {
    breathContainer.classList.add('breath-cycle-expand-calming')
    pointer.classList.add('pointer-rotate-calming')
    text.textContent = 'Breathe in!'
    timeouts.push(setTimeout(() => {
      text.textContent = 'Hold!'
    }, 2500))
    timeouts.push(setTimeout(() => {
      text.textContent = 'Breathe out!'
    }, 4000))

  } else if (cycleTime == 1800) {
    breathContainer.classList.add('breath-cycle-expand-wim')
    pointer.classList.add('pointer-rotate-wim')
    number++;
    if (number === 30) {
      textBottom.textContent = 'Hold breath for as long as you can and repeat the cycle';
      number = 0
      return resetChoice()
    }
    text.textContent = `Breathe in!`
    timeouts.push(setTimeout(() => {
      text.textContent = 'Breathe out!'
    }, 900))
  } else if (cycleTime == 10000) {
    breathContainer.classList.add('breath-cycle-expand-box')
    pointer.classList.add('pointer-rotate-box')
    text.textContent = 'Breathe in!'
    timeouts.push(setTimeout(() => {
      text.textContent = 'Hold!'
    }, 2500))
    timeouts.push(setTimeout(() => {
      text.textContent = 'Breathe out!'
    }, 5000))
    timeouts.push(setTimeout(() => {
      text.textContent = 'Hold!'
    }, 7500))
  }
}

playBreath.addEventListener('click', function () {
  video.play()
  music.play()
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  if (typeof interval !== 'undefined') {
    clearInterval(interval)
  }
  playBreath.classList.add('hide')
  breathContainer.classList.add('breath-cycle-expand')
  pointer.classList.add('pointer-rotate')
  textBottom.textContent = ''
  startCycle()
  interval = setInterval(startCycle, cycleTime)
})