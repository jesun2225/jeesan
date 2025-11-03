// script.js — control sound and video play/unmute handling
const video = document.getElementById('bg-video');
const audio = document.getElementById('bg-audio');
const soundToggle = document.getElementById('sound-toggle');
const emojiIcon = soundToggle ? soundToggle.querySelector('.emoji-icon') : null;

console.log('🎬 Script loaded - Elements found:');
console.log('- video:', !!video);
console.log('- audio:', !!audio);
console.log('- soundToggle:', !!soundToggle);
console.log('- emojiIcon:', !!emojiIcon);

let soundPlaying = false;

function tryAutoplay() {
  if (video) {
    video.muted = true;
    video.volume = 0;
    video.play().catch(()=>{
      console.log('⚠️ Autoplay blocked');
    });
  }
}

function updateToggleIcon() {
  if (!emojiIcon) {
    console.error('❌ ERROR: emojiIcon element not found!');
    return;
  }
  
  console.log('🔄 Updating icon... soundPlaying:', soundPlaying);
  
  if (soundPlaying) {
    // Sound is playing - show 🔊
    emojiIcon.textContent = '🔊';
    soundToggle.setAttribute('aria-pressed', 'true');
    soundToggle.setAttribute('title', 'Sound ON - Click to mute (M)');
    console.log('✅ Icon changed to: 🔊 (PLAYING)');
  } else {
    // Sound is muted - show 🔈
    emojiIcon.textContent = '🔈';
    soundToggle.setAttribute('aria-pressed', 'false');
    soundToggle.setAttribute('title', 'Sound MUTED - Click to play (M)');
    console.log('✅ Icon changed to: 🔈 (MUTED)');
  }
  
  console.log('📌 Final emoji in DOM:', emojiIcon.textContent);
}

function toggleSound() {
  console.log('\n🔘 TOGGLE TRIGGERED');
  console.log('Current state - soundPlaying:', soundPlaying);
  
  if (soundPlaying) {
    // Currently playing → MUTE IT
    console.log('🔇 Muting...');
    soundPlaying = false;
    
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
    if (audio && !audio.paused) {
      audio.pause();
    }
  } else {
    // Currently muted → PLAY IT
    console.log('🔊 Playing...');
    soundPlaying = true;
    
    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(err => console.log('Video play error:', err));
    }
    if (audio) {
      audio.play().catch(err => console.log('Audio play error:', err));
    }
  }
  
  console.log('New state - soundPlaying:', soundPlaying);
  updateToggleIcon();
}

if (soundToggle) {
  soundToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleSound();
  });
}

// Start with attempting autoplay for muted video
tryAutoplay();
updateToggleIcon();

// keyboard shortcuts: 'm' or 'M' or 'p' or 'P' toggles sound
window.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M' || e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    console.log(`⌨️ ${e.key.toUpperCase()} key pressed - toggling sound`);
    toggleSound();
  }
});
