"use client";

import { FormEvent, useMemo, useState } from "react";

type PageName = "home" | "about" | "reserve" | "inquiry";
type ServiceKey = "kimono" | "furisode" | "yukata" | "kids" | "hakama" | "graduation" | "beginner" | "point" | "travel-beginner" | "travel-point";

const services: Record<ServiceKey, { name: string; price: number; note: string }> = {
  kimono: { name: "訪問着・留袖・付け下げ", price: 9000, note: "約45分｜早朝対応可" },
  furisode: { name: "振袖", price: 12000, note: "約60分｜帯結びアレンジ込み" },
  yukata: { name: "浴衣", price: 4500, note: "約30分｜お二人目から500円引き" },
  kids: { name: "七五三", price: 12000, note: "約40分｜お子さまのペースで" },
  hakama: { name: "袴", price: 10000, note: "凛と美しい袴姿に" },
  graduation: { name: "卒業袴", price: 10000, note: "卒業式の特別なお支度" },
  beginner: { name: "初心者着付け教室", price: 8000, note: "二時間半｜月2回｜10時〜12時半｜平日のみ" },
  point: { name: "経験者向けポイントレッスン", price: 5000, note: "二時間｜気になるポイントを集中練習" },
  "travel-beginner": { name: "出張初心者着付け教室", price: 9000, note: "二時間半｜月2回｜10時〜12時半｜平日のみ" },
  "travel-point": { name: "出張 経験者向けポイントレッスン", price: 6000, note: "二時間｜気になるポイントを集中練習" },
};

const nav: { href: string; label: string; page: PageName }[] = [
  { href: "/", label: "ホーム", page: "home" },
  { href: "/about", label: "ひろ着付けについて", page: "about" },
  { href: "/reserve", label: "ご予約", page: "reserve" },
  { href: "/inquiry", label: "お問い合わせ", page: "inquiry" },
];

function Header({ page }: { page: PageName }) {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <a className="brand" href="/" aria-label="ひろ着付け ホーム"><img src="/hiro-kitsuke-logo.png" alt="ひろ着付け HIRO KITSUKE" /></a>
    <button className="menu" aria-label="メニュー" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
    <nav className={open ? "nav open" : "nav"} aria-label="メインナビゲーション">
      {nav.map(item => <a className={page === item.page ? "active" : ""} key={item.page} href={item.href}>{item.label}</a>)}
      <a className="nav-cta" href="/reserve#form">空き状況をみる</a>
    </nav>
  </header>;
}

function Footer() {
  return <footer><img className="footer-logo" src="/hiro-kitsuke-logo.png" alt="ひろ着付け HIRO KITSUKE" /><p>装う時間も、思い出に。</p><div className="footer-links"><a href="/about">私たちについて</a><a href="/reserve">料金・ご予約</a><a href="/inquiry">お問い合わせ</a></div><small>© 2026 HIRO KITSUKE</small></footer>;
}

function ReserveForm({ inquiry = false }: { inquiry?: boolean }) {
  const [service, setService] = useState<ServiceKey>("kimono");
  const [sent, setSent] = useState(false);
  const price = useMemo(() => services[service].price.toLocaleString("ja-JP"), [service]);
  function submit(e: FormEvent) { e.preventDefault(); setSent(true); }
  if (sent) return <div className="success" role="status"><span>✓</span><h3>送信ありがとうございます</h3><p>内容を確認し、24時間以内に折り返しご連絡いたします。</p><a href="/">ホームへ戻る</a></div>;
  return <form className="reserve-form" onSubmit={submit} id="form">
    <div className="form-heading"><span>REQUEST FORM</span><h2>{inquiry ? "お問い合わせ" : "ご予約リクエスト"}</h2><p>{inquiry ? "ご不明な点は、どんな小さなことでもお気軽にどうぞ。" : "下記をご入力ください。確認後、空き状況と訪問時間をご案内します。"}</p></div>
    <div className="field-row"><label>お名前<input required name="name" autoComplete="name" placeholder="山田 花子" /></label><label>メールアドレス<input required type="email" name="email" autoComplete="email" placeholder="hello@example.jp" /></label></div>
    <div className="field-row"><label>電話番号<input required type="tel" name="tel" autoComplete="tel" placeholder="090-0000-0000" /></label><label>ご希望のサービス<select value={service} onChange={e => setService(e.target.value as ServiceKey)}>{Object.entries(services).map(([key, value]) => <option value={key} key={key}>{value.name}</option>)}</select></label></div>
    {!inquiry && <><div className="field-row"><label>ご希望日<input required type="date" name="date" /></label><label>仕上がり希望時刻<input required type="time" name="time" /></label></div><label>訪問先の市区町村<input required name="area" placeholder="例：鎌倉市 長谷" /></label></>}
    <label>{inquiry ? "お問い合わせ内容" : "ご要望・人数・お着物について"}<textarea required name="message" rows={4} placeholder="ご希望やご不安な点をお聞かせください" /></label>
    {!inquiry && <div className="estimate"><div><small>選択中のメニュー</small><b>{services[service].name}</b><em>{services[service].note}</em></div><p><small>料金目安</small>¥{price}<span>（税込）</span></p></div>}
    <label className="consent"><input required type="checkbox" /> 個人情報の取り扱いに同意します</label>
    <button className="submit" type="submit">{inquiry ? "問い合わせを送信する" : "この内容で空き状況を確認する"}<span>→</span></button>
    <p className="form-note">※ 送信時点では予約確定ではありません。出張費は地域により別途頂戴する場合があります。</p>
  </form>;
}

function HomeContent() {
  return <>
    <section className="hero"><div className="hero-image" /><div className="hero-copy"><span className="eyebrow">MOBILE KIMONO DRESSING</span><h1>いつもの場所で、<br /><em>いちばん美しい私へ。</em></h1><p>ご自宅や会場へ伺う、心づくしの出張着付け。<br />晴れの日も、夏の夕べも、装う時間から特別に。</p><div className="hero-actions"><a className="primary" href="/reserve#form">着付けを予約する <span>→</span></a><a className="text-link" href="#services">サービス・料金を見る</a></div></div><div className="vertical">一日を結ぶ、<br />美しい支度。</div><div className="scroll">SCROLL <i /></div></section>
    <section className="intro"><span>AT YOUR PLACE</span><h2>移動の負担なく、<br />凛と美しいお支度を。</h2><p>慣れ親しんだご自宅で、リラックスしながら。着崩れにくく、苦しくない、ひとりひとりの身体に寄り添う着付けを大切にしています。</p><a href="/about">ひろ着付けについて <b>→</b></a></section>
    <section className="services" id="services"><div className="section-title"><span>SERVICES</span><h2>お仕度とお稽古</h2><p>すべて税込価格です。ヘアセット・早朝料金はご相談ください。</p></div><div className="service-grid">{Object.entries(services).map(([key, s], i) => <a href={`/reserve?service=${key}#form`} className="service-card" key={key}><small>{String(i + 1).padStart(2, "0")}</small><div className={`service-art art-${i + 1}`}><b>{["訪", "振", "浴", "祝", "袴", "卒", "初", "技", "出", "技"][i]}</b></div><h3>{s.name}</h3><p>{s.note}</p><strong>¥{s.price.toLocaleString("ja-JP")}</strong><span>詳しく・予約する →</span></a>)}</div><p className="pricing-notice">※ 交通費別途　当日キャンセルは全額お客様負担</p></section>
    <section className="promise"><div><span>OUR PROMISE</span><h2>締めつけず、<br />着崩れず、<br />一日を心地よく。</h2></div><ol><li><b>01</b><h3>ご自宅まで訪問</h3><p>お荷物を運ぶ必要はありません。ご希望の場所へ伺います。</p></li><li><b>02</b><h3>安心の事前確認</h3><p>必要な小物や当日の流れを、事前に丁寧にご案内します。</p></li><li><b>03</b><h3>美しい着姿が長持ち</h3><p>お出かけの最後まで心地よい、体に沿った着付けです。</p></li></ol></section>
    <section className="home-cta"><span>RESERVATION</span><h2>大切な日のお支度を、<br />どうぞお任せください。</h2><a className="primary light" href="/reserve#form">空き状況を確認する <span>→</span></a></section>
  </>;
}

function AboutContent() {
  return <><section className="page-hero about-hero"><span>ABOUT HIRO KITSUKE</span><h1>着物をもっと、<br />あなたの日常のそばに。</h1><p>ひろ着付けが大切にしていること</p></section><section className="story"><div className="story-art">結</div><div><span>OUR STORY</span><h2>装う人の心まで、<br />そっと整える。</h2><p>着物を着る日は、少し特別な日。だからこそ、お支度の時間から穏やかに過ごしていただきたいと考えています。</p><p>ひろ着付けは、ご自宅や宿泊先、式場へお伺いする出張着付けです。体型やお出かけの目的に合わせ、苦しさの少ない美しい着姿に仕上げます。</p><p>「自分でも着られるようになりたい」という方には、一人ひとりのペースに合わせたマスタークラスもご用意しています。</p><a className="primary dark" href="/reserve#form">相談・予約する <span>→</span></a></div></section><section className="credentials"><span>PROFILE</span><h2>確かな技術を、丁寧な手仕事で。</h2><div><p><b>着付け師　ひろ</b>着付け講師資格保有<br />出張着付け・教室歴 10年以上<br />成人式、婚礼、七五三、撮影など多数</p><p>対応エリア<br /><b>佐倉市、八千代市、習志野市、船橋市、千葉市、江戸川区、江東区</b><br />その他応相談、まずはご相談ください。</p></div></section></>;
}

function ReserveContent() { return <><section className="page-hero reserve-hero"><span>RESERVATION</span><h1>ご予約・料金</h1><p>ご希望を伺い、最適なお支度をご提案します。</p></section><section className="price-list"><div className="section-title"><span>PRICE</span><h2>サービス料金</h2></div>{Object.entries(services).map(([key, s]) => <a href={`#form`} onClick={() => {}} key={key}><div><h3>{s.name}</h3><p>{s.note}</p></div><b>¥{s.price.toLocaleString("ja-JP")}</b><span>選択する →</span></a>)}<p className="pricing-notice">※ 交通費別途　当日キャンセルは全額お客様負担</p></section><section className="form-wrap"><ReserveForm /></section></>; }
function InquiryContent() { return <><section className="page-hero inquiry-hero"><span>CONTACT</span><h1>お問い合わせ</h1><p>着物や小物のこと、対応エリアなど、お気軽にご相談ください。</p></section><section className="contact-options"><div><span>メールでのご連絡</span><h2>メールでのご相談</h2><a href="mailto:hirokitsuke@gmail.com">hirokitsuke@gmail.com</a><p>ご相談内容を添えてお気軽にご連絡ください。</p></div><div><span>よくあるご質問</span><h2>何を用意すればよいですか？</h2><p>ご予約確定後、着物の種類に合わせた持ち物リストをお送りします。足りない小物も事前にご相談いただけます。</p></div></section><section className="form-wrap"><ReserveForm inquiry /></section></>; }

export function SitePage({ page }: { page: PageName }) {
  return <><Header page={page} /><main>{page === "home" ? <HomeContent /> : page === "about" ? <AboutContent /> : page === "reserve" ? <ReserveContent /> : <InquiryContent />}</main><Footer /><a className="floating" href="/reserve#form"><span>ご予約</span><b>→</b></a></>;
}
