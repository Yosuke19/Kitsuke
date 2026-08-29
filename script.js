const services = {
  kimono: { name: '訪問着・留袖・付け下げ', price: '¥9,000', note: '約45分｜早朝対応可' },
  furisode: { name: '振袖', price: '¥13,000', note: '約60分｜帯結びアレンジ込み' },
  yukata: { name: '浴衣', price: '¥5,500', note: '約30分｜お二人目から500円引き' },
  kids: { name: '七五三', price: '¥7,000', note: '約40分｜お子さまのペースで' },
  lesson: { name: '着付けマスタークラス', price: '¥6,500', note: '90分｜少人数・道具相談込み' }
};

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
}

const select = document.querySelector('#service-select');
function updateEstimate(key) {
  const service = services[key] || services.kimono;
  const name = document.querySelector('#estimate-name');
  const note = document.querySelector('#estimate-note');
  const price = document.querySelector('#estimate-price');
  if (name) name.textContent = service.name;
  if (note) note.textContent = service.note;
  if (price) price.textContent = service.price;
}
if (select) {
  const requested = new URLSearchParams(location.search).get('service');
  if (requested && services[requested]) select.value = requested;
  updateEstimate(select.value);
  select.addEventListener('change', () => updateEstimate(select.value));
}

const dateInput = document.querySelector('input[type="date"]');
if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

document.querySelectorAll('.reserve-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.innerHTML = '<div class="success" role="status"><span>✓</span><h3>送信ありがとうございます</h3><p>現在は画面確認用フォームです。実際の送信先は正式な連絡先決定後に接続します。</p><a href="index.html">ホームへ戻る</a></div>';
  });
});
