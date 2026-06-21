import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/f2f0b9fe-b5db-436a-a380-e801bd328e79.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О школе' },
  { id: 'blog', label: 'Блог' },
  { id: 'experts', label: 'Эксперты' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  { icon: 'FileText', title: 'Декларация 3-НДФЛ', text: 'Формируем декларацию в личном кабинете ФНС за один вечер и получаем налоговый вычет.', link: '/declaration-3ndfl' },
  { icon: 'Calculator', title: 'Отчётность УСН', text: 'Разбираем упрощёнку для ИП и малого бизнеса: расчёт, сроки, подача через кабинет.', link: '/usn' },
  { icon: 'Wallet', title: 'Платежи и задолженности', text: 'Учим находить начисления, задолженности и переплаты, оплачивать налоги без ошибок.', link: '/payments' },
  { icon: 'Building2', title: 'Объекты налогообложения', text: 'Показываем, как проверить имущество, землю и транспорт в личном кабинете.' },
  { icon: 'Scale', title: 'Налоговое право простыми словами', text: 'Объясняем законы человеческим языком — без сложных формулировок и сносок.', link: '/tax-law' },
  { icon: 'MonitorSmartphone', title: 'Сервисы ФНС России', text: 'Полный гид по электронным сервисам: от регистрации до самозанятости.' },
];

const EXPERTS = [
  { name: 'Ирина Соколова', role: 'Бывший инспектор ФНС · 14 лет стажа', spec: 'Камеральные проверки, 3-НДФЛ' },
  { name: 'Дмитрий Орлов', role: 'Экс-руководитель отдела УСН · 11 лет', spec: 'Упрощёнка, малый бизнес' },
  { name: 'Елена Власова', role: 'Налоговый консультант · 9 лет в ФНС', spec: 'Вычеты, личный кабинет' },
];

const POSTS = [
  { tag: 'Вычеты', title: 'Как вернуть до 52 000 ₽ за обучение и лечение', date: '12 июня 2026', img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/747fefca-b09f-4fbe-b696-9adcfd2b4578.jpg' },
  { tag: 'Самозанятость', title: 'НПД в 2026 году: что изменилось и кому подходит', date: '5 июня 2026', img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/5f5110ad-a5cd-4836-9c8b-29f86b5a349b.jpg' },
  { tag: 'ИП', title: 'УСН «доходы» vs «доходы минус расходы»: что выбрать', date: '28 мая 2026', img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/49eebc8b-6bad-4eb6-b5f1-3f36fb13270e.jpg' },
];

const QUIZ = [
  {
    q: 'В какой срок нужно подать декларацию 3-НДФЛ при продаже имущества?',
    options: ['До 1 декабря', 'До 30 апреля следующего года', 'В течение 10 дней', 'Срока нет'],
    correct: 1,
  },
  {
    q: 'Максимальная ставка налога на УСН «Доходы» составляет:',
    options: ['6%', '13%', '15%', '20%'],
    correct: 0,
  },
  {
    q: 'Где быстрее всего проверить налоговую задолженность?',
    options: ['В отделении банка', 'В личном кабинете на сайте ФНС', 'По почте', 'Нигде нельзя'],
    correct: 1,
  },
];

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handlePick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === QUIZ[step].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= QUIZ.length) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="font-display text-7xl text-accent mb-2">{score}/{QUIZ.length}</div>
        <p className="text-primary-foreground/70 mb-6">
          {score === QUIZ.length ? 'Безупречно! Вы готовы к ФНС.' : 'Хороший результат — есть куда расти. Запишитесь на курс!'}
        </p>
        <Button onClick={restart} variant="outline" className="border-accent/40 text-primary-foreground hover:bg-accent hover:text-accent-foreground">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Пройти заново
        </Button>
      </div>
    );
  }

  const current = QUIZ[step];

  return (
    <div>
      <div className="flex items-center justify-between mb-5 text-sm text-primary-foreground/60">
        <span>Вопрос {step + 1} из {QUIZ.length}</span>
        <span className="font-mono">{Math.round(((step) / QUIZ.length) * 100)}%</span>
      </div>
      <div className="h-1 w-full bg-primary-foreground/10 rounded-full mb-7 overflow-hidden">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${((step) / QUIZ.length) * 100}%` }} />
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-6 leading-snug">{current.q}</h3>
      <div className="space-y-3">
        {current.options.map((opt, i) => {
          const isCorrect = i === current.correct;
          const isPicked = i === selected;
          let cls = 'border-primary-foreground/15 hover:border-accent/60 hover:bg-primary-foreground/5';
          if (selected !== null) {
            if (isCorrect) cls = 'border-emerald-400/60 bg-emerald-400/10';
            else if (isPicked) cls = 'border-red-400/60 bg-red-400/10';
            else cls = 'border-primary-foreground/10 opacity-50';
          }
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className={`w-full text-left px-5 py-4 rounded border transition-all flex items-center justify-between ${cls}`}
            >
              <span className="text-primary-foreground/90">{opt}</span>
              {selected !== null && isCorrect && <Icon name="Check" size={18} className="text-emerald-400" />}
              {selected !== null && isPicked && !isCorrect && <Icon name="X" size={18} className="text-red-400" />}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <Button onClick={next} className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12">
          {step + 1 >= QUIZ.length ? 'Узнать результат' : 'Следующий вопрос'}
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      )}
    </div>
  );
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-primary/90 backdrop-blur-md border-b border-accent/20">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 text-primary-foreground">
            <Icon name="Compass" size={22} className="text-accent" />
            <span className="font-display text-xl font-semibold tracking-tight">Твой гид в налоговом лабиринте</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-primary-foreground/75 hover:text-accent transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('contacts')} className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
            Записаться
          </Button>
          <button className="md:hidden text-primary-foreground" onClick={() => setMenuOpen((o) => !o)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-primary border-t border-accent/20 px-6 py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-primary-foreground/80">
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative bg-primary text-primary-foreground overflow-hidden pt-16">
        <div className="absolute inset-0 grid-lines opacity-[0.15]" />
        <div className="absolute -right-20 top-0 w-1/2 h-full hidden lg:block">
          <img src={HERO_IMG} alt="Налоговый лабиринт" className="w-full h-full object-cover opacity-70 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
        </div>
        <div className="container relative py-24 md:py-32">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 text-accent text-sm mb-7">
              <Icon name="ShieldCheck" size={15} />
              Консультируют бывшие налоговики
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
              Разберём <span className="text-gradient-gold">сервисы ФНС</span> до последней кнопки
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-9 max-w-xl leading-relaxed">
              Онлайн-школа для физлиц и малого бизнеса. Учим формировать декларации 3-НДФЛ и УСН,
              находить задолженности и пользоваться личным кабинетом — простыми словами.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollTo('quiz')} className="h-13 px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 text-base">
                <Icon name="ListChecks" size={18} className="mr-2" />
                Пройти тест по налогам
              </Button>
              <Button onClick={() => scrollTo('about')} variant="outline" className="h-13 px-8 py-6 border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/5 text-base">
                Узнать о школе
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-14">
              {[['2 800+', 'выпускников'], ['40+', 'часов практики'], ['18–60', 'лет — любой возраст']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-accent">{n}</div>
                  <div className="text-sm text-primary-foreground/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services / About */}
      <section id="about" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">О школе</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-5">Чему вы научитесь</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Никакой воды и канцелярита. Каждый модуль — это пошаговый разбор реальных действий
              в личном кабинете ФНС от тех, кто работал по другую сторону окна.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                onClick={() => s.link && navigate(s.link)}
                className={`bg-card p-8 transition-colors group ${s.link ? 'cursor-pointer hover:bg-secondary' : 'hover:bg-secondary/60'}`}
              >
                <div className="w-12 h-12 rounded bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                  <Icon name={s.icon} size={22} className="text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                {s.link && (
                  <div className="inline-flex items-center gap-1.5 mt-4 text-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Пошаговая инструкция
                    <Icon name="ArrowRight" size={15} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-10" />
        <div className="container relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Интерактивный тест</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-5">Проверьте свои знания о ФНС</h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
              Три коротких вопроса покажут, насколько вы готовы к самостоятельной работе
              с налогами. Это бесплатно и займёт меньше минуты.
            </p>
            <ul className="space-y-3">
              {['Мгновенный результат', 'Подсказки с правильными ответами', 'Без регистрации'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-primary-foreground/80">
                  <Icon name="Check" size={18} className="text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-8 md:p-10">
            <Quiz />
          </div>
        </div>
      </section>

      {/* Experts */}
      <section id="experts" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Эксперты</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-5">Вас учат бывшие налоговики</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Наши преподаватели годами работали в ФНС и знают систему изнутри —
              теперь они на вашей стороне.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {EXPERTS.map((e) => (
              <div key={e.name} className="border border-border rounded-lg p-8 bg-card hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-full bg-primary text-accent flex items-center justify-center font-display text-2xl mb-5">
                  {e.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-1">{e.name}</h3>
                <p className="text-sm text-accent mb-3">{e.role}</p>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <Icon name="Sparkles" size={14} className="text-accent" />
                  {e.spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div className="max-w-2xl">
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Блог</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold">Полезные статьи о налогах</h2>
            </div>
            <Button variant="outline" className="border-primary/20">
              Все статьи
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {POSTS.map((p) => (
              <article key={p.title} className="bg-card border border-border rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                <div className="h-48 relative overflow-hidden bg-primary">
                  {p.img && <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">{p.tag}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-3">{p.date}</p>
                  <h3 className="font-display text-2xl font-semibold leading-snug group-hover:text-accent transition-colors">{p.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 bg-primary text-primary-foreground">
        <div className="container grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Готовы выйти из налогового лабиринта?</h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-9">
              Оставьте заявку — расскажем о ближайшем потоке, программе и подберём
              формат под ваши задачи.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'Mail', text: 'info@nalog-gid.ru' },
                { icon: 'Phone', text: '8 (800) 000-00-00' },
                { icon: 'Send', text: '@nalog_gid' },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-3 text-primary-foreground/85">
                  <div className="w-10 h-10 rounded bg-primary-foreground/5 flex items-center justify-center">
                    <Icon name={c.icon} size={18} className="text-accent" />
                  </div>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
          <form className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1.5 block">Имя</label>
              <input className="w-full h-12 px-4 rounded bg-primary-foreground/5 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent" placeholder="Как к вам обращаться" />
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1.5 block">Телефон или e-mail</label>
              <input className="w-full h-12 px-4 rounded bg-primary-foreground/5 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent" placeholder="Для связи" />
            </div>
            <div>
              <label className="text-sm text-primary-foreground/70 mb-1.5 block">Комментарий</label>
              <textarea rows={3} className="w-full px-4 py-3 rounded bg-primary-foreground/5 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent resize-none" placeholder="Что хотите освоить?" />
            </div>
            <Button type="submit" className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90">
              Отправить заявку
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-primary-foreground/10 text-primary-foreground/60 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-primary-foreground">
            <Icon name="Compass" size={18} className="text-accent" />
            <span className="font-display text-lg">Твой гид в налоговом лабиринте</span>
          </div>
          <p>© 2026 · Онлайн-школа по сервисам ФНС России</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;