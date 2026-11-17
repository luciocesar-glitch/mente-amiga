import { FormEvent, ReactNode, useEffect, useId, useState } from "react";

type Mode = "login" | "signup";
type Role = "caregiver" | "patient";
type Category = "medicine" | "food" | "study" | "other";
type Filter = "all" | Category;

type Reminder = {
  id: number;
  time: string;
  title: string;
  description: string;
  category: Category;
  done: boolean;
};

type IconProps = {
  className?: string;
};

function HeartHands({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 38.2S8.8 30.3 8.8 18.5c0-5 3.7-8.7 8.6-8.7 3.2 0 5.5 1.7 6.6 3.6 1.1-1.9 3.4-3.6 6.6-3.6 4.9 0 8.6 3.7 8.6 8.7C39.2 30.3 24 38.2 24 38.2Z"
        fill="currentColor"
      />
      <path d="M17.5 23.6h13M24 17.1v13" stroke="white" strokeWidth="3.6" strokeLinecap="round" />
    </svg>
  );
}

function VolumeIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 5 6.8 8.5H3.5v7h3.3L11 19V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M15 8.3a5 5 0 0 1 0 7.4M17.7 5.6a8.7 8.7 0 0 1 0 12.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 4 16 16M10.7 10.8a2 2 0 0 0 2.5 2.5M9.4 5.4A10.8 10.8 0 0 1 12 5c5.4 0 8.7 5 8.7 5s-.8 1.2-2.1 2.5M6.2 6.3C4.3 7.7 3.3 10 3.3 10s3.3 5 8.7 5c1 0 2-.2 2.8-.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.3 12s3.3-5 8.7-5 8.7 5 8.7 5-3.3 5-8.7 5-8.7-5-8.7-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PersonIcon({ caregiver = false }: { caregiver?: boolean }) {
  return caregiver ? (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2.3" />
      <path
        d="M4.5 24.5c.4-5 3.1-7.5 7.5-7.5 2.2 0 4 .6 5.2 1.8"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path
        d="M23.5 17.7c-1.9-2.2-5.6-1-5.6 1.9 0 3.6 5.6 6.4 5.6 6.4s5.6-2.8 5.6-6.4c0-2.9-3.7-4.1-5.6-1.9Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="10" r="4.5" stroke="currentColor" strokeWidth="2.3" />
      <path
        d="M7.5 26c.5-5.8 3.5-8.7 8.5-8.7s8 2.9 8.5 8.7"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path d="M16 5.5v9M11.5 10h9" stroke="currentColor" strokeWidth="1.4" opacity=".35" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4.3 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M14 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UiIcon({
  name,
  className = "",
}: {
  name:
    | "home"
    | "pin"
    | "calendar"
    | "phone"
    | "pill"
    | "food"
    | "study"
    | "other"
    | "plus"
    | "close"
    | "bell"
    | "settings";
  className?: string;
}) {
  const paths = {
    home: <path d="m3 11 9-7 9 7v9H6v-9M9 20v-6h6v6" />,
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
    phone: (
      <path d="M7.5 3H5.2C4 3 3 4 3.1 5.2 3.8 13.4 10.6 20.1 18.8 21c1.2.1 2.2-.9 2.2-2.1v-2.3l-4.2-1-1 2.1c-3.9-1.7-7-4.8-8.6-8.7l2-1.1L7.5 3Z" />
    ),
    pill: (
      <>
        <path d="M8.2 19.8a4.2 4.2 0 0 1-6-6L12.8 3.2a4.2 4.2 0 1 1 6 6L8.2 19.8Z" />
        <path d="m8 8 8 8" />
      </>
    ),
    food: (
      <>
        <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 1 4 4 4 7h-4" />
      </>
    ),
    study: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23V5.5Z" />
      </>
    ),
    other: (
      <>
        <path d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3Z" />
        <path d="M9 22h6M9 12h6M12 9v6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
        <path d="M10 21h4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  );
}

const initialReminders: Reminder[] = [
  {
    id: 1,
    time: "08:00",
    title: "Tomar remédio da manhã",
    description: "Dona Maria, tome um comprimido azul com um copo de água.",
    category: "medicine",
    done: true,
  },
  {
    id: 2,
    time: "09:30",
    title: "Café da manhã",
    description: "Seu café está na mesa da cozinha. Coma a fruta e o pão.",
    category: "food",
    done: true,
  },
  {
    id: 3,
    time: "12:00",
    title: "Almoço",
    description: "Está na hora do almoço. A comida está pronta na geladeira.",
    category: "food",
    done: false,
  },
  {
    id: 4,
    time: "14:30",
    title: "Ligação com a filha",
    description: "Às duas e meia, sua filha Ana vai ligar para conversar com você.",
    category: "other",
    done: false,
  },
  {
    id: 5,
    time: "16:00",
    title: "Atividade de leitura",
    description: "Vamos ler duas páginas do livro de histórias que está sobre a mesa.",
    category: "study",
    done: false,
  },
  {
    id: 6,
    time: "17:00",
    title: "Exercício de matemática",
    description: "Faça a atividade de números na primeira página do caderno azul.",
    category: "study",
    done: false,
  },
  {
    id: 7,
    time: "18:00",
    title: "Remédio da noite",
    description: "Tome o comprimido branco depois do jantar.",
    category: "medicine",
    done: false,
  },
];

const categoryInfo = {
  medicine: { label: "Remédios", icon: "pill" as const },
  food: { label: "Alimentação", icon: "food" as const },
  study: { label: "Estudos", icon: "study" as const },
  other: { label: "Outros", icon: "other" as const },
};

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.84;
  window.speechSynthesis.speak(utterance);
}

function ReminderModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (reminder: Omit<Reminder, "id" | "done">) => void;
}) {
  const [category, setCategory] = useState<Category>("medicine");

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSave({
      title: String(data.get("title")),
      time: String(data.get("time")),
      description: String(data.get("description")),
      category,
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="reminder-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <p>Novo aviso</p>
            <h2 id="modal-title">Adicionar lembrete</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar janela">
            <UiIcon name="close" />
          </button>
        </header>
        <form className="reminder-form" onSubmit={save}>
          <div className="modal-field">
            <label htmlFor="reminder-title">Título do lembrete</label>
            <input
              id="reminder-title"
              name="title"
              placeholder="Ex: Tomar remédio da tarde"
              required
            />
          </div>
          <fieldset className="category-picker">
            <legend>Escolha uma categoria</legend>
            <div>
              {(Object.keys(categoryInfo) as Category[]).map((item) => (
                <label key={item} className={`${item} ${category === item ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => setCategory(item)}
                  />
                  <span>
                    <UiIcon name={categoryInfo[item].icon} />
                  </span>
                  {categoryInfo[item].label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="modal-field time-field">
            <label htmlFor="reminder-time">Horário</label>
            <input id="reminder-time" name="time" type="time" defaultValue="15:00" required />
          </div>
          <div className="modal-field">
            <label htmlFor="reminder-description">Descrição para leitura em voz alta</label>
            <textarea
              id="reminder-description"
              name="description"
              placeholder="Escreva uma orientação curta, clara e acolhedora."
              rows={4}
              required
            />
            <small>Esta mensagem será lida quando Dona Maria tocar no alto-falante.</small>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-button">
              <CheckIcon /> Salvar lembrete
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function NotificationSettings({
  enabled,
  onChange,
  onClose,
  onTest,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  onClose: () => void;
  onTest: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="settings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <p>Preferências</p>
            <h2 id="settings-title">Notificações</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar configurações">
            <UiIcon name="close" />
          </button>
        </header>
        <div className="settings-content">
          <div className="settings-hero">
            <span>
              <UiIcon name="bell" />
            </span>
            <div>
              <h3>Lembretes a cada 30 minutos</h3>
              <p>Receba um aviso frequente para conferir as próximas atividades do dia.</p>
            </div>
          </div>
          <label className="notification-switch">
            <span>
              <strong>Ativar notificações</strong>
              <small>{enabled ? "Os avisos estão ativados" : "Os avisos estão desativados"}</small>
            </span>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => onChange(event.target.checked)}
            />
            <i aria-hidden="true" />
          </label>
          <div className="frequency-row">
            <span>Frequência</span>
            <strong>A cada 30 minutos</strong>
          </div>
          <p className="settings-note">
            Os avisos aparecem enquanto o Cuidar+ estiver aberto. Permita notificações no navegador
            para também receber o alerta do sistema.
          </p>
          <button className="test-notification" type="button" onClick={onTest}>
            <UiIcon name="bell" /> Enviar notificação de teste
          </button>
        </div>
      </section>
    </div>
  );
}

function Dashboard({ role, onExit }: { role: Role; onExit: () => void }) {
  const [now, setNow] = useState(new Date());
  const [filter, setFilter] = useState<Filter>("all");
  const [reminders, setReminders] = useState(initialReminders);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(
    () => localStorage.getItem("cuidar-notifications") === "enabled",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const sendNotification = (isTest = false) => {
    const nextReminder = reminders.find((item) => !item.done);
    const title = isTest ? "Notificação de teste" : "Hora de conferir sua rotina";
    const body = nextReminder
      ? `Próxima atividade: ${nextReminder.title}, às ${nextReminder.time}.`
      : "Todas as atividades de hoje foram concluídas.";

    setNotificationMessage(`${title}. ${body}`);
    window.setTimeout(() => setNotificationMessage(""), 7000);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`Cuidar+ — ${title}`, {
        body,
        icon: "/favicon.png",
      });
    }
  };

  useEffect(() => {
    if (!notificationEnabled) return;
    const interval = window.setInterval(() => sendNotification(), 30 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [notificationEnabled, reminders]);

  const changeNotifications = async (enabled: boolean) => {
    if (enabled && "Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    setNotificationEnabled(enabled);
    localStorage.setItem("cuidar-notifications", enabled ? "enabled" : "disabled");
    if (enabled) sendNotification(true);
  };

  const hour = now.getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const date = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const visibleReminders = reminders.filter((item) => filter === "all" || item.category === filter);
  const countFor = (category: Filter) =>
    category === "all"
      ? reminders.length
      : reminders.filter((item) => item.category === category).length;

  const addReminder = (reminder: Omit<Reminder, "id" | "done">) => {
    setReminders((items) =>
      [...items, { ...reminder, id: Date.now(), done: false }].sort((a, b) =>
        a.time.localeCompare(b.time),
      ),
    );
    setShowModal(false);
  };

  return (
    <main className="dashboard">
      <header className="dashboard-topbar">
        <div className="dashboard-brand">
          <span className="brand-mark">
            <HeartHands />
          </span>
          <span>
            Cuidar<span>+</span>
          </span>
        </div>
        <div className="topbar-actions">
          <span className="profile-mode">{role === "caregiver" ? "Modo cuidador" : "Meu dia"}</span>
          <button
            className={`settings-button ${notificationEnabled ? "enabled" : ""}`}
            type="button"
            onClick={() => setShowSettings(true)}
            aria-label="Abrir configurações de notificações"
          >
            <UiIcon name="settings" />
            {notificationEnabled && <i aria-hidden="true" />}
          </button>
          <button
            className="profile-button"
            type="button"
            onClick={onExit}
            aria-label="Sair e voltar ao acesso"
          >
            <span>{role === "caregiver" ? "C" : "M"}</span>
            <span>
              <strong>{role === "caregiver" ? "Cláudia" : "Maria"}</strong>
              <small>Sair</small>
            </span>
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="day-header">
          <div>
            {role === "caregiver" && (
              <p className="care-context">Acompanhando a rotina de Dona Maria</p>
            )}
            <h1>{greeting}, Dona Maria</h1>
            <p className="full-date">{date}</p>
          </div>
          <div className="digital-clock" aria-label={`Agora são ${time}`}>
            <small>Agora são</small>
            <strong>{time}</strong>
          </div>
        </section>

        <section className="orientation-card">
          <div className="orientation-main">
            <span className="orientation-icon">
              <UiIcon name="home" />
            </span>
            <div>
              <p>Onde você está agora</p>
              <h2>Você está em casa</h2>
              <span>
                <UiIcon name="pin" /> Rua das Flores, 123
              </span>
            </div>
          </div>
          <div className="visit-info">
            <span>
              <UiIcon name="calendar" />
            </span>
            <div>
              <small>Próxima visita</small>
              <strong>Cláudia chega às 14:00</strong>
            </div>
          </div>
          <button
            className="orientation-listen"
            type="button"
            onClick={() =>
              speak(
                "Você está em casa, na Rua das Flores, número 123. Cláudia chega para visitar você às duas da tarde.",
              )
            }
          >
            <VolumeIcon />
            <span>Ouvir informações</span>
          </button>
        </section>

        <a className="emergency-card" href="tel:+5511999999999">
          <img
            src="https://images.unsplash.com/photo-1605801427192-e7711f5ce8fb?crop=faces&fit=crop&w=160&h=160&q=85"
            alt="Cláudia, sua cuidadora"
          />
          <span>
            <small>Precisa de ajuda?</small>
            <strong>Ligar para Cláudia</strong>
            <em>Sua cuidadora</em>
          </span>
          <span className="phone-circle">
            <UiIcon name="phone" />
          </span>
        </a>

        <section className="routine-section">
          <div className="routine-heading">
            <div>
              <p>Sua rotina</p>
              <h2>O que temos para hoje</h2>
            </div>
            {role === "caregiver" && (
              <button
                className="add-reminder-button"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <UiIcon name="plus" /> Adicionar lembrete
              </button>
            )}
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filtrar lembretes por categoria">
            {(
              [
                ["all", "Todos", "calendar"],
                ["medicine", "Remédios", "pill"],
                ["food", "Alimentação", "food"],
                ["study", "Estudos", "study"],
                ["other", "Outros", "other"],
              ] as const
            ).map(([value, label, icon]) => (
              <button
                key={value}
                className={`${value} ${filter === value ? "active" : ""}`}
                type="button"
                role="tab"
                aria-selected={filter === value}
                onClick={() => setFilter(value)}
              >
                <span>
                  <UiIcon name={icon} />
                </span>
                <strong>{label}</strong>
                <small>{countFor(value)}</small>
              </button>
            ))}
          </div>

          <div className="reminder-list">
            {visibleReminders.map((reminder) => (
              <article
                className={`reminder-card ${reminder.category} ${reminder.done ? "done" : ""}`}
                key={reminder.id}
              >
                <time>{reminder.time}</time>
                <span className="category-icon">
                  <UiIcon name={categoryInfo[reminder.category].icon} />
                </span>
                <div className="reminder-copy">
                  <small>{categoryInfo[reminder.category].label}</small>
                  <h3>{reminder.title}</h3>
                  <p>{reminder.description}</p>
                </div>
                <button
                  className="card-listen"
                  type="button"
                  onClick={() =>
                    speak(`${reminder.time}. ${reminder.title}. ${reminder.description}`)
                  }
                  aria-label={`Ouvir lembrete: ${reminder.title}`}
                >
                  <VolumeIcon />
                  <span>Ouvir</span>
                </button>
                <button
                  className="complete-button"
                  type="button"
                  onClick={() =>
                    setReminders((items) =>
                      items.map((item) =>
                        item.id === reminder.id ? { ...item, done: !item.done } : item,
                      ),
                    )
                  }
                  aria-pressed={reminder.done}
                >
                  <span>
                    <CheckIcon />
                  </span>
                  {reminder.done ? "Concluído" : "Marcar como feito"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
      {role === "caregiver" && (
        <button className="mobile-add" type="button" onClick={() => setShowModal(true)}>
          <UiIcon name="plus" /> Novo lembrete
        </button>
      )}
      {notificationMessage && (
        <div className="notification-toast" role="status">
          <span>
            <UiIcon name="bell" />
          </span>
          <div>
            <strong>Cuidar+</strong>
            <p>{notificationMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setNotificationMessage("")}
            aria-label="Fechar notificação"
          >
            <UiIcon name="close" />
          </button>
        </div>
      )}
      {showModal && <ReminderModal onClose={() => setShowModal(false)} onSave={addReminder} />}
      {showSettings && (
        <NotificationSettings
          enabled={notificationEnabled}
          onChange={changeNotifications}
          onClose={() => setShowSettings(false)}
          onTest={() => sendNotification(true)}
        />
      )}
    </main>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  action,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  action?: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
        {action}
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>("caregiver");
  const [showPassword, setShowPassword] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [complete, setComplete] = useState(false);
  const [screen, setScreen] = useState<"auth" | "dashboard">("auth");
  const baseId = useId();

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setComplete(false);
  };

  const speakInstructions = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text =
      mode === "login"
        ? "Para entrar, informe seu e-mail e sua senha. Depois, escolha quem você é e toque no botão Entrar com segurança."
        : "Para criar sua conta, informe seu nome, e-mail e crie uma senha. Depois, escolha quem vai usar e gerenciar os lembretes.";
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";
    speech.rate = 0.86;
    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setComplete(true);
  };

  if (screen === "dashboard") {
    return (
      <Dashboard
        role={role}
        onExit={() => {
          setScreen("auth");
          setComplete(false);
        }}
      />
    );
  }

  return (
    <main className="app-shell">
      <section className="brand-panel" aria-label="Sobre o Cuidar+">
        <div className="brand-content">
          <div className="brand">
            <span className="brand-mark">
              <HeartHands />
            </span>
            <span>
              Cuidar<span>+</span>
            </span>
          </div>
          <div className="brand-message">
            <p className="eyebrow">Cuidado que aproxima</p>
            <h1>Mais tranquilidade para cada momento do dia.</h1>
            <p>
              Uma rotina simples, acolhedora e segura para quem cuida e para quem recebe cuidado.
            </p>
          </div>
          <div className="trust-list">
            <div>
              <span>
                <CheckIcon />
              </span>
              Lembretes fáceis de acompanhar
            </div>
            <div>
              <span>
                <CheckIcon />
              </span>
              Informações importantes em um só lugar
            </div>
            <div>
              <span>
                <CheckIcon />
              </span>
              Apoio para toda a rede de cuidado
            </div>
          </div>
        </div>
        <div className="soft-shape shape-one" />
        <div className="soft-shape shape-two" />
      </section>

      <section className="form-panel">
        <div className="mobile-brand">
          <span className="brand-mark">
            <HeartHands />
          </span>
          <span>
            Cuidar<span>+</span>
          </span>
        </div>

        <div className="form-card">
          {!complete ? (
            <>
              <header className="form-header">
                <p className="welcome">Bem-vindo ao Cuidar+</p>
                <h2>{mode === "login" ? "Que bom ter você aqui" : "Vamos começar juntos"}</h2>
                <p>
                  {mode === "login"
                    ? "Entre para acompanhar sua rotina de cuidado."
                    : "Crie uma conta para organizar o cuidado com calma e segurança."}
                </p>
              </header>

              <button
                className={`listen-button ${isSpeaking ? "speaking" : ""}`}
                type="button"
                onClick={speakInstructions}
                aria-pressed={isSpeaking}
              >
                <span className="listen-icon">
                  <VolumeIcon />
                </span>
                <span>
                  <strong>
                    {isSpeaking ? "Lendo as instruções..." : "Ouvir instruções desta tela"}
                  </strong>
                  <small>
                    {isSpeaking ? "Toque novamente para reiniciar" : "Leitura em voz alta"}
                  </small>
                </span>
                {isSpeaking && (
                  <span className="audio-bars" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </button>

              <div
                className="mode-tabs"
                role="tablist"
                aria-label="Escolha entre entrar ou criar conta"
              >
                <button
                  role="tab"
                  aria-selected={mode === "login"}
                  onClick={() => switchMode("login")}
                >
                  Entrar
                </button>
                <button
                  role="tab"
                  aria-selected={mode === "signup"}
                  onClick={() => switchMode("signup")}
                >
                  Criar conta
                </button>
              </div>

              <form onSubmit={submit}>
                {mode === "signup" && (
                  <Field
                    id={`${baseId}-name`}
                    label="Seu nome"
                    placeholder="Como podemos chamar você?"
                    autoComplete="name"
                  />
                )}
                <Field
                  id={`${baseId}-email`}
                  label="E-mail"
                  type="email"
                  placeholder="nome@exemplo.com"
                  autoComplete="email"
                />
                <Field
                  id={`${baseId}-password`}
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "login" ? "Digite sua senha" : "Crie uma senha segura"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  action={
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      <EyeIcon hidden={showPassword} />
                    </button>
                  }
                />

                {mode === "login" && (
                  <div className="form-options">
                    <label className="remember">
                      <input type="checkbox" /> <span>Lembrar de mim</span>
                    </label>
                    <button className="text-link" type="button">
                      Esqueci minha senha
                    </button>
                  </div>
                )}

                <fieldset className="role-picker">
                  <legend>
                    {mode === "login" ? "Quem está entrando?" : "Como você usará o Cuidar+?"}
                  </legend>
                  <p>Isso nos ajuda a mostrar as informações certas.</p>
                  <div className="role-options">
                    <label className={role === "caregiver" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="role"
                        value="caregiver"
                        checked={role === "caregiver"}
                        onChange={() => setRole("caregiver")}
                      />
                      <span className="role-icon">
                        <PersonIcon caregiver />
                      </span>
                      <span>
                        <strong>Sou cuidador</strong>
                        <small>Organizo e acompanho lembretes</small>
                      </span>
                      <span className="radio-check">
                        <CheckIcon />
                      </span>
                    </label>
                    <label className={role === "patient" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="role"
                        value="patient"
                        checked={role === "patient"}
                        onChange={() => setRole("patient")}
                      />
                      <span className="role-icon">
                        <PersonIcon />
                      </span>
                      <span>
                        <strong>Recebo cuidado</strong>
                        <small>Acompanho minha rotina diária</small>
                      </span>
                      <span className="radio-check">
                        <CheckIcon />
                      </span>
                    </label>
                  </div>
                </fieldset>

                <button className="primary-button" type="submit">
                  {mode === "login" ? "Entrar com segurança" : "Criar minha conta"}
                  <span>
                    <ArrowIcon />
                  </span>
                </button>
              </form>

              <p className="switch-prompt">
                {mode === "login" ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                >
                  {mode === "login" ? "Criar conta" : "Entrar"}
                </button>
              </p>
            </>
          ) : (
            <div className="success-state" role="status">
              <div className="success-icon">
                <CheckIcon />
              </div>
              <p className="eyebrow">Tudo certo</p>
              <h2>{mode === "login" ? "Acesso realizado!" : "Sua conta foi criada!"}</h2>
              <p>
                O perfil <strong>{role === "caregiver" ? "Cuidador" : "Recebo cuidado"}</strong>{" "}
                está selecionado. Você já pode continuar para sua rotina.
              </p>
              <div className="next-card">
                <span>
                  <VolumeIcon />
                </span>
                <div>
                  <strong>Próximo passo</strong>
                  <p>
                    {role === "caregiver"
                      ? "Vamos configurar os primeiros lembretes."
                      : "Vamos conhecer sua rotina de hoje."}
                  </p>
                </div>
              </div>
              <button
                className="primary-button"
                type="button"
                onClick={() => setScreen("dashboard")}
              >
                Continuar
                <span>
                  <ArrowIcon />
                </span>
              </button>
              <button
                className="text-link back-link"
                type="button"
                onClick={() => setComplete(false)}
              >
                Voltar para o acesso
              </button>
            </div>
          )}

          <footer>
            <span className="shield" aria-hidden="true">
              ✓
            </span>
            Seus dados estão protegidos e seguros.
          </footer>
        </div>
      </section>
    </main>
  );
}
