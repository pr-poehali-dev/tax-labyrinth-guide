import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    icon: 'Wallet',
    title: 'Единый налоговый счёт',
    text: 'Войдите в личный кабинет на lkfl2.nalog.ru. На главной странице найдите блок «Единый налоговый счёт» (ЕНС) — здесь отображается ваш текущий баланс: переплата, нулевое сальдо или задолженность.',
    tip: 'С 2023 года все налоги платятся через ЕНС — один счёт для всех начислений. Проверяйте баланс регулярно.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/f3db5346-6181-453d-9a02-782452a4f83e.jpg',
    imgAlt: 'Единый налоговый счёт в личном кабинете ФНС',
  },
  {
    icon: 'AlertCircle',
    title: 'Проверка задолженностей',
    text: 'Перейдите в раздел «Налоги и платежи» → «Задолженность». Здесь видны все налоги с просрочкой по оплате с разбивкой по видам: НДФЛ, имущество, транспорт, земля. Красные суммы — к немедленной оплате.',
    tip: 'Задолженность можно также быстро проверить через Госуслуги или приложение «Налоги ФЛ» без входа в полный кабинет.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/b6bbd0a3-ea65-4068-9666-2e893f65d3d6.jpg',
    imgAlt: 'Проверка налоговой задолженности в личном кабинете ФНС',
  },
  {
    icon: 'ReceiptText',
    title: 'Просмотр начислений',
    text: 'Раздел «Начисления» показывает все предстоящие платежи с суммами и сроками уплаты: имущественные налоги, НДФЛ к доплате и другие. Здесь же можно выбрать отдельные налоги для оплаты или оплатить всё сразу.',
    tip: 'Налоговые уведомления приходят в августе–сентябре. Срок уплаты имущественных налогов — 1 декабря.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/17ba76fa-126a-438c-aa92-3b095ede66aa.jpg',
    imgAlt: 'Начисления по налогам в личном кабинете ФНС',
  },
  {
    icon: 'CreditCard',
    title: 'Оплата налогов онлайн',
    text: 'Нажмите «Оплатить» рядом с нужным налогом или «Оплатить всё». Выберите способ: банковская карта, СБП (по QR-коду), через Госуслуги. Подтвердите платёж — деньги поступят на ЕНС и спишутся в счёт налога.',
    tip: 'Оплата через СБП (Систему быстрых платежей) — самый быстрый способ: деньги зачисляются мгновенно и без комиссии.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/a8491662-b584-4b99-a3ee-ea0cedb7609e.jpg',
    imgAlt: 'Онлайн-оплата налогов через личный кабинет ФНС',
  },
  {
    icon: 'History',
    title: 'История платежей',
    text: 'Раздел «История платежей» хранит все операции по ЕНС: пополнения, списания, зачёты. Можно фильтровать по году и виду налога, а также скачать выписку — она пригодится для бухгалтерии или подтверждения оплаты.',
    tip: 'Выписку об отсутствии задолженности можно заказать прямо здесь — документ формируется автоматически и имеет юридическую силу.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/bc426877-4251-44fe-abe9-068b1f3f9838.jpg',
    imgAlt: 'История платежей по налогам в личном кабинете ФНС',
  },
  {
    icon: 'ArrowDownToLine',
    title: 'Переплата: зачесть или вернуть',
    text: 'Если на ЕНС образовалась переплата — её можно зачесть в счёт будущих налогов или вернуть на банковский счёт. Подайте заявление прямо в кабинете, указав реквизиты счёта. Возврат — до 10 рабочих дней.',
    tip: 'Переплату выгоднее зачесть, если скоро предстоит платёж — тогда деньги не уйдут и не придётся ждать возврата.',
    img: 'https://cdn.poehali.dev/projects/afb1ddd3-0189-4d02-b1ef-9335878bb213/files/3be71912-a872-4a0c-8ee5-341bddb40dae.jpg',
    imgAlt: 'Возврат или зачёт переплаты по налогам в ФНС',
  },
];

const Payments = () => {
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
              <Icon name="Wallet" size={15} />
              Пошаговая инструкция
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
              Платежи и <span className="text-gradient-gold">задолженности</span> в личном кабинете
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-10">
              6 шагов: как проверить задолженность, оплатить налоги онлайн и вернуть переплату через ФНС.
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
                  <span className="ml-3 flex-1 h-4 bg-primary-foreground/10 rounded text-[10px] text-primary-foreground/40 flex items-center justify-center tracking-wide">lkfl2.nalog.ru</span>
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

export default Payments;
