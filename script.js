// Play background music on first interaction
document.body.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });

// Sound effect on drag
function playSound() {
  const sound = document.getElementById("item-sound");
  sound.currentTime = 0;
  sound.play();
}

function makeDraggable(el) {
  el.addEventListener('dragstart', (e) => {
    playSound();
    e.dataTransfer.setData('text/plain', el.outerHTML);
    setTimeout(() => el.remove(), 0);
  });
}

document.querySelectorAll('.item').forEach(makeDraggable);

const dressArea = document.getElementById('dress-up-area');

dressArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dressArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const temp = document.createElement('div');
  temp.innerHTML = data;
  const newItem = temp.firstChild;

  newItem.style.left = `${e.clientX - dressArea.offsetLeft - 25}px`;
  newItem.style.top = `${e.clientY - dressArea.offsetTop - 25}px`;

  dressArea.appendChild(newItem);
  makeDraggable(newItem);
});

// Load new items from selection panel
document.querySelectorAll('.items img').forEach(img => {
  img.addEventListener('click', () => {
    playSound();
    const clone = img.cloneNode(true);
    clone.draggable = true;
    clone.classList.add('item');
    clone.style.position = 'absolute';
    clone.style.left = '250px';
    clone.style.top = '100px';

    dressArea.appendChild(clone);
    makeDraggable(clone);
  });
});
