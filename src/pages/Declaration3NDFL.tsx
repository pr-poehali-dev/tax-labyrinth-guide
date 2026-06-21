import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    icon: 'LogIn',
    title: 'Вход в личный кабинет ФНС',
    text: 'Зайдите на сайт lkfl2.nalog.ru или в мобильное приложение «Налоги ФЛ». Авторизуйтесь через логин/пароль ФНС или подтверждённую учётную запись Госуслуг.',
    tip: 'Если входите впервые — учётная запись Госуслуг с подтверждённым статусом работает быстрее всего.',
  },
  {
    icon: 'MousePointerClick',
    title: 'Раздел «Доходы и вычеты»',
    text: 'В верхнем меню выберите раздел «Доходы и вычеты», затем «Декларации». Нажмите кнопку «Подать декларацию» и выберите «Подать декларацию 3-НДФЛ».',
    tip: 'Система предложит заполнить онлайн — это самый простой способ, без установки программы «Декларация».',
  },
  {
    icon: 'Calendar',
    title: 'Выбор года и данных',
    text: 'Укажите год, за который подаёте декларацию. Часть данных о доходах от работодателя подтянется автоматически из справок 2-НДФЛ.',
    tip: 'Справки появляются в кабинете обычно после 1 марта следующего года.',
  },
  {
    icon: 'FileText',
    title: 'Указание доходов',
    text: 'Проверьте автоматически загруженные доходы. Если декларируете продажу имущества или другой доход — добавьте его вручную через кнопку «Добавить источник дохода».',
    tip: 'Для продажи квартиры/машины укажите сумму продажи и документально подтверждённые расходы на покупку.',
  },
  {
    icon: 'BadgePercent',
    title: 'Оформление вычетов',
    text: 'Выберите тип вычета: имущественный, социальный (лечение, обучение) или инвестиционный. Внесите суммы и приложите сканы подтверждающих документов.',
    tip: 'Социальный вычет за лечение и обучение — до 150 000 ₽ расходов, это до 19 500 ₽ возврата.',
  },
  {
    icon: 'Upload',
    title: 'Документы и подпись',
    text: 'Прикрепите сканы договоров, чеков и справок. Сформируйте неквалифицированную электронную подпись прямо в кабинете (если ещё не создана) и введите пароль к ней.',
    tip: 'Подпись создаётся бесплатно в разделе «Настройки профиля» — это занимает пару минут.',
  },
  {
    icon: 'Send',
    title: 'Отправка и контроль',
    text: 'Нажмите «Подтвердить и отправить». Статус проверки отслеживайте в разделе «Сообщения». Камеральная проверка длится до 3 месяцев, возврат — ещё до 1 месяца.',
    tip: 'Не забудьте подать заявление на возврат с реквизитами счёта — без него деньги не перечислят.',
  },
];

const Declaration3NDFL = () => {
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
              <Icon name="FileText" size={15} />
              Пошаговая инструкция
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
              Декларация <span className="text-gradient-gold">3-НДФЛ</span> в личном кабинете
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-10">
              7 простых шагов от входа в кабинет ФНС до отправки декларации и возврата налога.
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
            <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-8 md:p-12 animate-fade-up" key={step}>
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 shrink-0 rounded-lg bg-accent/15 flex items-center justify-center">
                  <Icon name={current.icon} size={26} className="text-accent" />
                </div>
                <div>
                  <div className="text-accent text-sm font-semibold mb-1">Шаг {step + 1}</div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">{current.title}</h2>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">{current.text}</p>
              <div className="flex items-start gap-3 bg-accent/10 border border-accent/20 rounded-lg p-4">
                <Icon name="Lightbulb" size={20} className="text-accent shrink-0 mt-0.5" />
                <p className="text-primary-foreground/85 text-sm leading-relaxed">{current.tip}</p>
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

export default Declaration3NDFL;
