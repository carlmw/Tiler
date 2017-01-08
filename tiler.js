function seed(alphabet) {
  return alphabet.split('')
  .reduce((memo, char, i) => {
    memo[char] = [Math.floor(i / 6), i % 6];
    return memo;
  }, {});
}

let available = seed('abcdefghijklmnopqrtuvxyz');

function toBase24(str) {
  return str.toLowerCase().replace(/s/g, 'z').replace(/w/g, 'vv').split('');
}

function toImages(base24) {
  return base24.map((char) => {
    const src = `${available[char][0]}.png`;
    const className = `char-${available[char][1]}`;

    return `<img src="${src}" class="${className}" />`;
  }).join('');
}

function render() {
  const value = document.querySelector('#input').value;
  const base24 = toBase24(value);

  let images = '', counts = { 0: 0, 1: 0, 2: 0, 3: 0 };

  if (base24.length) {
    try {
      counts = base24.reduce((memo, char) => {
        memo[available[char][0]]++;
        return memo;
      }, counts);
      images = toImages(base24);
    } catch (e) {
      images = '<span style="color:red">Invalid characters entered — only a-z is supported</span>';
    }
  }

  let totalBoxes = 0;

  Object.keys(counts).forEach(tile => {
    const count = counts[tile];
    let html = '';
    if (count) {
      const boxes = Math.ceil(count / 44);
      totalBoxes += boxes;
      html = `
        <span>Number: ${count}</span>
        <span>Boxes: ${boxes}</span>
        <span>Extra: ${(boxes * 44) - count}</span>
      `;
    }
    document.querySelector(`#count-${tile}`).innerHTML = html;
  });

  document.querySelector('#cost').innerHTML = `£${totalBoxes * 91.5}`;
  document.querySelector('#area').innerHTML = `${totalBoxes * 0.51}m2`;
  document.querySelector('#canvas').innerHTML = images;
}

document.querySelector('#randomise').addEventListener('click', () => {
  const domSeed = document.querySelector('#seed');
  domSeed.value = domSeed.value.split('').sort(() => .5 - Math.random()).join('');
  available = seed(domSeed.value);
  render();
});

document.querySelector('#input').addEventListener('input', () => {
  render();
});

render();