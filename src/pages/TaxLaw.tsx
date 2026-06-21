import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const TOPICS = [
  'Налоговые вычеты',
  'Продажа имущества',
  'Штрафы и пени',
  'Налог на наследство',
  'Самозанятость',
  'ИП и UСН',
  'Налог на дивиденды',
  'Другое',
];

const TaxLaw = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !question.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('https://functions.poehali.dev/12b0d655-9699-4fab-92e3-e515ae96af75', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), question: (topic ? `[${topic}] ` : '') + question.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Что-то пошло не так, попробуйте снова');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Нет соединения с сервером');
    }
  };

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

            {/* Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 text-accent text-sm mb-6">
              <Icon name="Scale" size={15} />
              Налоговое право простыми словами
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
              Задайте вопрос <span className="text-gradient-gold">эксперту</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-10">
              Наши эксперты — бывшие сотрудники ФНС. Ответ придёт на ваш email в течение 1–2 рабочих дней, бесплатно.
            </p>

            {/* Experts row */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { name: 'Ирина Соколова', spec: 'Проверки, 3-НДФЛ', years: '14 лет в ФНС' },
                { name: 'Дмитрий Орлов', spec: 'УСН, малый бизнес', years: '11 лет в ФНС' },
                { name: 'Елена Власова', spec: 'Вычеты, ЛК ФНС', years: '9 лет в ФНС' },
              ].map((ex) => (
                <div key={ex.name} className="flex items-center gap-3 bg-primary-foreground/[0.05] border border-primary-foreground/10 rounded-lg px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Icon name="UserRound" size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary-foreground">{ex.name}</div>
                    <div className="text-xs text-primary-foreground/50">{ex.spec} · {ex.years}</div>
                  </div>
                </div>
              ))}
            </div>

            {status === 'success' ? (
              /* Success state */
              <div className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-10 md:p-14 text-center animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-emerald-400/15 flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-emerald-400" />
                </div>
                <h2 className="font-display text-3xl font-semibold mb-3">Вопрос отправлен!</h2>
                <p className="text-primary-foreground/70 text-lg mb-8 max-w-md mx-auto">
                  Наш эксперт изучит ваш вопрос и ответит на&nbsp;<span className="text-accent font-semibold">{email}</span> в течение 1–2 рабочих дней.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => { setStatus('idle'); setQuestion(''); setTopic(''); }} variant="outline" className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/5">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Задать ещё вопрос
                  </Button>
                  <Button onClick={() => navigate('/')} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    На главную
                  </Button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-xl p-8 md:p-10 animate-fade-up">

                {/* Topic pills */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-primary-foreground/70 mb-3">Тема вопроса (необязательно)</label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(topic === t ? '' : t)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          topic === t
                            ? 'bg-accent text-accent-foreground border-accent'
                            : 'border-primary-foreground/20 text-primary-foreground/70 hover:border-accent/50 hover:text-primary-foreground'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-primary-foreground/70 mb-2">
                    Ваш вопрос <span className="text-accent">*</span>
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder="Например: продал квартиру, которой владел 2 года. Нужно ли платить налог и подавать декларацию?"
                    className="w-full bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/60 resize-none text-base transition-colors"
                  />
                  <div className="text-right text-xs text-primary-foreground/40 mt-1">{question.length}/2000</div>
                </div>

                {/* Email */}
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-primary-foreground/70 mb-2">
                    Ваш email для ответа <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@mail.ru"
                    className="w-full bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/60 text-base transition-colors"
                  />
                  <p className="text-xs text-primary-foreground/40 mt-2">Ответ придёт только на этот адрес. Не передаём email третьим лицам.</p>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 mb-5 text-red-300 text-sm">
                    <Icon name="AlertCircle" size={16} className="shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading' || !email.trim() || !question.trim()}
                  className="w-full h-13 py-4 bg-accent text-accent-foreground hover:bg-accent/90 text-base disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Icon name="Loader" size={18} className="mr-2 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить вопрос эксперту
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 mt-5 text-primary-foreground/40 text-xs">
                  <Icon name="ShieldCheck" size={14} className="shrink-0 text-accent/60" />
                  Ответ бесплатный. Эксперт отвечает в течение 1–2 рабочих дней.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-primary-foreground/10 text-primary-foreground/60 py-8 mt-12">
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

export default TaxLaw;
