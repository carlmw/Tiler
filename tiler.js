const available = '0123456789abcdefghijklmn'
.split('')
.reduce((memo, char, i) => {
  memo[char] = [Math.floor(i / 6), i % 6];
  return memo;
}, {});

function toImages(str) {
  const base24 = str.toString(24).toLowerCase().split('');

  return base24.map((char) => {
    const src = `${available[char][0]}.png`;
    const className = `char-${available[char][1]}`;

    return `<img src="${src}" class="${className}" />`;
  }).join('');
}

document.querySelector('#input').addEventListener('input', (e) => {
  const ascii = (e.target.value || '').split('').map((char) => char.charCodeAt(0)).join('');
  const base10 = parseInt(ascii, 10);

  let images = '';

  if (!isNaN(base10)) {
    images = toImages(base10);
  }

  document.querySelector('#canvas').innerHTML = images;
});
