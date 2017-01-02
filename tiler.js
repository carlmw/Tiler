const available = '0123456789abcdefghijklmn'
.split('')
.reduce((memo, char, i) => {
  memo[char] = [Math.floor(i / 6), i % 6];
  return memo;
}, {});

function toBase24(str) {
  return str.toString(24).toLowerCase().split('');
}

function toImages(base24) {
  console.log(base24);
  return base24.map((char) => {
    const src = `${available[char][0]}.png`;
    const className = `char-${available[char][1]}`;

    return `<img src="${src}" class="${className}" />`;
  }).join('');
}

document.querySelector('#input').addEventListener('input', (e) => {
  const ascii = (e.target.value || '').split('').map((char) => char.charCodeAt(0)).join('');
  const base10 = parseInt(ascii, 10);

  let images = '', counts = { 0: 0, 1: 0, 2: 0, 3: 0 };

  if (!isNaN(base10)) {
    const base24 = toBase24(base10);

    counts = base24.reduce((memo, char) => {
      memo[available[char][0]]++;
      return memo;
    }, counts);


    images = toImages(base24);
  }

  Object.keys(counts).forEach(tile => {
    document.querySelector(`#count-${tile}`).innerHTML = counts[tile];
  });

  document.querySelector('#canvas').innerHTML = images;
});
