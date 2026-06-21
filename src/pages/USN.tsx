import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    icon: 'Building2',
    title: 'Личный кабинет ИП',
    text: 'Войдите в личный кабинет ФНС на сайте lkip2.nalog.ru — это кабинет для индивидуальных предпринимателей. Убедитесь, что в профиле указан режим налогообложения «УСН».',
    tip: 'Кабинет ИП и кабинет физлица — разные разделы. ИП заходят через lkip2.nalog.ru, а не lkfl2.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/e213f962-435f-4eea-b389-6d617fcb822a.jpg',
    imgAlt: 'Личный кабинет ИП на сайте ФНС',
  },
  {
    icon: 'FileText',
    title: 'Раздел «Отчётность» → «Декларация по УСН»',
    text: 'В меню выберите «Отчётность», затем «Декларация по УСН». Нажмите «Заполнить новую декларацию» и укажите отчётный год.',
    tip: 'Срок подачи декларации по УСН для ИП — 25 апреля следующего года. Не путайте с уплатой налога.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/147d2f32-abc6-4f97-a90e-60fc4ab1cf5a.jpg',
    imgAlt: 'Раздел отчётности и декларация по УСН в ЛК ФНС',
  },
  {
    icon: 'Percent',
    title: 'Объект налогообложения',
    text: 'Выберите объект налогообложения: «Доходы» (ставка 6%) или «Доходы минус расходы» (ставка 15%). Он должен совпадать с тем, что указан при регистрации ИП.',
    tip: 'Изменить объект налогообложения можно только с нового календарного года, подав уведомление до 31 декабря.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/494535ce-126e-48f2-b418-72b307105193.jpg',
    imgAlt: 'Выбор объекта налогообложения УСН: доходы или доходы минус расходы',
  },
  {
    icon: 'TrendingUp',
    title: 'Ввод доходов по кварталам',
    text: 'Внесите суммы доходов нарастающим итогом за каждый квартал: 1 кв., полугодие, 9 месяцев, год. Данные берите из Книги учёта доходов и расходов (КУДиР).',
    tip: 'Суммы вводятся нарастающим итогом — это не за каждый квартал отдельно, а накопительно с начала года.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/4a2de7ab-b264-4901-961c-d71a26b7c0ff.jpg',
    imgAlt: 'Ввод доходов по кварталам в декларацию УСН',
  },
  {
    icon: 'ShieldCheck',
    title: 'Страховые взносы и вычеты',
    text: 'Укажите уплаченные страховые взносы «за себя». Для УСН «Доходы» они напрямую уменьшают налог (до 100% для ИП без сотрудников). Система рассчитает вычет автоматически.',
    tip: 'ИП без сотрудников могут уменьшить налог на всю сумму фиксированных взносов — это выгодно при небольших доходах.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/7857ba94-b6d1-44a5-9001-467e3aad65be.jpg',
    imgAlt: 'Страховые взносы и уменьшение налога по УСН',
  },
  {
    icon: 'PenLine',
    title: 'Проверка, подпись и отправка',
    text: 'Проверьте итоговую сумму налога к уплате. Введите пароль электронной подписи и нажмите «Подписать и отправить». Декларация уйдёт в ФНС мгновенно.',
    tip: 'Перед отправкой система покажет предварительный расчёт — сверьте его с вашими данными из КУДиР.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/c849fb8b-8079-4c38-b33b-8534be1fba5d.jpg',
    imgAlt: 'Подписание и отправка декларации по УСН',
  },
  {
    icon: 'CreditCard',
    title: 'Оплата налога и авансовые платежи',
    text: 'После отправки декларации оплатите налог через раздел «Единый налоговый счёт». Не забывайте про авансовые платежи: 28 апреля, 28 июля, 28 октября — они уменьшают итоговую сумму.',
    tip: 'Авансы по УСН не обязательны по закону, но при их неуплате начисляются пени — платить выгоднее вовремя.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/4badbfec-f735-4dfc-9467-9351025c4893.jpg',
    imgAlt: 'Оплата налога по УСН и авансовые платежи',
  },
];

const USN = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div className="min-h-screen bg-primary text-primary-foreground antialiased">
      <header className="fixed top-0 inset-x-0 z-50 bg-primary/90 backdrop-blur-md border-b border-accent/20">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary-foreground">
            <Icon name="Compass" size={22} className="text-accent" />
            <span className="font-display text-xl font-semibold tracking-tight">Твой гид в налоговом лабиринте</span>
          </button>
          <Button onClick={() => navigate('/')} variant="outline" className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/5">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 grid-lines opacity-[0.12]" />
        <div className="container relative py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 text-accent text-sm mb-6">
              <Icon name="Calculator" size={15} />
              Пошаговая инструкция
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
              Отчётность <span className="text-gradient-gold">УСН</span> в личном кабинете
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-10">
              7 шагов от входа в кабинет ИП до подачи декларации и оплаты налога по упрощённой системе.
            </p>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-3">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-1.5 rounded-full flex-1 transition-all ${i <= step ? 'bg-accent' : 'bg-primary-foreground/15'}`}
                  aria-label={`Шаг ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-primary-foreground/60 mb-8">
              <span>Шаг {step + 1} из {STEPS.length}</span>
              <span className="font-mono">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
            </div>

            {/* Card */}
            <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl overflow-hidden animate-fade-up" key={step}>
              {/* Screenshot */}
              <div className="relative w-full bg-primary-foreground/5 border-b border-primary-foreground/10 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <div className="absolute top-0 inset-x-0 h-7 bg-primary-foreground/10 flex items-center gap-1.5 px-3 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-3 flex-1 h-4 bg-primary-foreground/10 rounded text-[10px] text-primary-foreground/40 flex items-center justify-center tracking-wide">lkip2.nalog.ru</span>
                </div>
                <img
                  src={current.img}
                  alt={current.imgAlt}
                  className="w-full h-full object-cover object-top pt-7"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Icon name={current.icon} size={22} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-accent text-sm font-semibold mb-1">Шаг {step + 1}</div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">{current.title}</h2>
                  </div>
                </div>
                <p className="text-primary-foreground/80 text-lg leading-relaxed mb-5">{current.text}</p>
                <div className="flex items-start gap-3 bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <Icon name="Lightbulb" size={20} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-primary-foreground/85 text-sm leading-relaxed">{current.tip}</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between mt-8 gap-4">
              <Button
                onClick={() => setStep((s) => s - 1)}
                disabled={isFirst}
                variant="outline"
                className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/5 disabled:opacity-30 h-12"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              {isLast ? (
                <Button onClick={() => navigate('/')} className="bg-accent text-accent-foreground hover:bg-accent/90 h-12">
                  <Icon name="Check" size={16} className="mr-2" />
                  Готово, на главную
                </Button>
              ) : (
                <Button onClick={() => setStep((s) => s + 1)} className="bg-accent text-accent-foreground hover:bg-accent/90 h-12">
                  Следующий шаг
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary-foreground/10 text-primary-foreground/60 py-8">
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

export default USN;
