const services = {
  kimono: { name: '訪問着・留袖・付け下げ', price: '¥9,000', note: '約45分｜早朝対応可' },
  furisode: { name: '振袖', price: '¥12,000', note: '約60分｜帯結びアレンジ込み' },
  yukata: { name: '浴衣', price: '¥4,500', note: '約30分｜お二人目から500円引き' },
  kids: { name: '七五三', price: '¥12,000', note: '約60分｜お子さまのペースで' },
  hakama: { name: '袴', price: '¥10,000', note: '凛と美しい袴姿に' },
  graduation: { name: '卒業袴', price: '¥10,000', note: '卒業式の特別なお支度' },
  beginner: { name: '初心者着付け教室', price: '¥8,000', note: '二時間半｜月2回｜10時〜12時半｜平日のみ' },
  point: { name: '経験者向けポイントレッスン', price: '¥5,000', note: '二時間｜気になるポイントを集中練習' },
  'travel-beginner': { name: '出張初心者着付け教室', price: '¥9,000', note: '二時間半｜月2回｜10時〜12時半｜平日のみ' },
  'travel-point': { name: '出張 経験者向けポイントレッスン', price: '¥6,000', note: '二時間｜気になるポイントを集中練習' }
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
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('.submit');
    const error = form.querySelector('.form-error');
    const originalButton = button ? button.innerHTML : '';
    if (error) error.textContent = '';
    if (button) {
      button.disabled = true;
      button.textContent = '送信中…';
    }
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Formspree submission failed');
      form.innerHTML = '<div class="success" role="status"><span>✓</span><h3>送信ありがとうございます</h3><p>内容を確認し、折り返しご連絡いたします。</p><a href="index.html">ホームへ戻る</a></div>';
    } catch (_error) {
      if (error) error.textContent = '送信できませんでした。時間をおいて再度お試しいただくか、メールでお問い合わせください。';
      if (button) {
        button.disabled = false;
        button.innerHTML = originalButton;
      }
    }
  });
});
