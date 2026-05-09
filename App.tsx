import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import {
  Shield,
  Zap,
  Globe,
  Lock,
  Copy,
  Check,
  ChevronDown,
  Server as ServerIcon,
  Menu,
  X,
  QrCode,
  Layers,
  FileText,
  HelpCircle
} from 'lucide-react';

/* ─────────── Safe Base64 Encoder for UTF-8 ─────────── */
function utf8ToBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    console.error("Base64 encoding error", e);
    return "";
  }
}

/* ─────────── Servers Data with KAISERXWIN VPN Remarks ─────────── */
const SERVERS = [
  {
    id: 1,
    country: 'Россия',
    flag: '🇷🇺',
    ip: '46.182.24.141',
    port: '443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'ads.x5.ru',
    remark: '🇷🇺 KAISERXWIN VPN - Lexa Vercel 1',
    rawBase: 'vless://23fee6e7-43e8-40e5-b467-474d76678a98@46.182.24.141:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=ads.x5.ru&fp=chrome&pbk=-3KqEvD5M3nJTrTO2kvmrTn1WpLxn6k_ckjh6XsKqTc&sid=b2a6e3d42f05c3d1&spx=%2F',
  },
  {
    id: 2,
    country: 'Россия',
    flag: '🇷🇺',
    ip: '46.182.24.141',
    port: '443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'ads.x5.ru',
    remark: '🇷🇺 KAISERXWIN VPN - Lexa Vercel 2',
    rawBase: 'vless://fc3efe8c-abdb-45a2-8387-1d683a1512f3@46.182.24.141:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=ads.x5.ru&fp=chrome&pbk=-3KqEvD5M3nJTrTO2kvmrTn1WpLxn6k_ckjh6XsKqTc&sid=b2a6e3d42f05c3d1&spx=%2F',
  },
  {
    id: 3,
    country: 'Россия',
    flag: '🇷🇺',
    ip: '195.209.90.178',
    port: '443',
    security: 'TLS',
    transport: 'WebSocket',
    sni: 's28233.cdn.ngenix.net',
    remark: '🇷🇺 KAISERXWIN VPN - Lexa Vercel 3',
    rawBase: 'vless://d471e982-4237-fade-94df-c0d11029282a@195.209.90.178:443?encryption=none&security=tls&type=ws&sni=s28233.cdn.ngenix.net&fp=qq&alpn=h2%2Chttp%2F1.1&host=s28233.cdn.ngenix.net',
  },
  {
    id: 4,
    country: 'Россия',
    flag: '🇷🇺',
    ip: '81.94.148.168',
    port: '443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'x5.ru',
    remark: '🇷🇺 KAISERXWIN VPN - Lexa Vercel 4',
    rawBase: 'vless://a4fec05a-6539-444a-973f-7fd779be2ea3@81.94.148.168:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=x5.ru&fp=chrome&pbk=b9uDzZP2udvoExtbm7nwraBaAbg0QowtY-ALDNZ__xg&sid=f4e2b8971d5c3a9f',
  },
  {
    id: 5,
    country: 'Россия',
    flag: '🇷🇺',
    ip: '37.18.15.174',
    port: '443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'x5.ru',
    remark: '🇷🇺 KAISERXWIN VPN - Lexa Vercel 5',
    rawBase: 'vless://a4fec05a-6539-444a-973f-7fd779be2ea3@37.18.15.174:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=x5.ru&fp=chrome&pbk=b9uDzZP2udvoExtbm7nwraBaAbg0QowtY-ALDNZ__xg&sid=f4e2b8971d5c3a9f',
  },
  {
    id: 6,
    country: 'Австрия',
    flag: '🇦🇹',
    ip: '195.209.90.178',
    port: '443',
    security: 'TLS',
    transport: 'WebSocket',
    sni: 's28233.cdn.ngenix.net',
    remark: '🇦🇹 KAISERXWIN VPN - Lexa Vercel 6',
    rawBase: 'vless://31df9217-b7d0-fade-946c-ac50d556aeff@195.209.90.178:443?encryption=none&security=tls&type=ws&sni=s28233.cdn.ngenix.net&fp=qq&alpn=h2%2Chttp%2F1.1&host=s28233.cdn.ngenix.net',
  },
  {
    id: 7,
    country: 'Германия',
    flag: '🇩🇪',
    ip: '79.174.95.200',
    port: '5443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'ads.x5.ru',
    remark: '🇩🇪 KAISERXWIN VPN - Lexa Vercel 7',
    rawBase: 'vless://e8a67795-ca80-498f-bab0-34989a8f4a1d@79.174.95.200:5443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=ads.x5.ru&fp=random&pbk=OtGux0Ty5TSzfIvlHVd4q_TdYbRUHKbS8WCxmpHJx18&sid=6030cf49b50590e8&spx=%2F',
  },
  {
    id: 8,
    country: 'Германия',
    flag: '🇩🇪',
    ip: '79.174.95.200',
    port: '5443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'ads.x5.ru',
    remark: '🇩🇪 KAISERXWIN VPN - Lexa Vercel 8',
    rawBase: 'vless://3b6ed23e-7ddc-4a86-9637-c07001805670@79.174.95.200:5443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=ads.x5.ru&fp=random&pbk=OtGux0Ty5TSzfIvlHVd4q_TdYbRUHKbS8WCxmpHJx18&sid=e4d6a0fcf32883ab&spx=%2F%22%2C',
  },
  {
    id: 9,
    country: 'Германия',
    flag: '🇩🇪',
    ip: '78.159.246.239',
    port: '443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'x5.ru',
    remark: '🇩🇪 KAISERXWIN VPN - Lexa Vercel 9',
    rawBase: 'vless://1132a937-5410-4f28-9f4d-b54430c2e71e@78.159.246.239:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=x5.ru&fp=chrome&pbk=VEQ1aFtLMHgfLcZ2yIugry8JzVXPE5ZXz72L10RUXVs&sid=f4e2b8971d5c3a9f',
  },
  {
    id: 10,
    country: 'Германия',
    flag: '🇩🇪',
    ip: '62.152.59.102',
    port: '443',
    security: 'REALITY',
    transport: 'TCP / Vision',
    sni: 'x5.ru',
    remark: '🇩🇪 KAISERXWIN VPN - Lexa Vercel 10',
    rawBase: 'vless://1579780a-ee55-4b2d-aef0-468cdf5dc887@62.152.59.102:443?encryption=none&security=reality&type=tcp&flow=xtls-rprx-vision&sni=x5.ru&pbk=dIGnZ6HRkh_W5K4i00JOsT_F1Ez96Lm1PjEr0TkJPWo&sid=6ba85179e30d4fc2',
  }
];

/* ─────────── Client apps data ─────────── */
const CLIENTS = [
  {
    name: 'Happ',
    icon: '📱',
    platforms: ['iOS', 'Android'],
    description: 'Идеально поддерживает вставку Base64-подписок или ссылок из буфера обмена',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
  },
  {
    name: 'V2RayTun',
    icon: '🔒',
    platforms: ['Android', 'iOS'],
    description: 'Мгновенный импорт через QR-код или текстовую подписку',
    color: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
  },
  {
    name: 'v2rayNG',
    icon: '🚀',
    platforms: ['Android'],
    description: 'Популярный клиент. Поддерживает импорт списка из буфера обмена',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
  },
  {
    name: 'Shadowrocket',
    icon: '⚡',
    platforms: ['iOS'],
    description: 'Распознает VLESS ссылки и Base64 подписки автоматически',
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
  },
  {
    name: 'Nekoray',
    icon: '🖥️',
    platforms: ['Windows', 'Linux'],
    description: 'Удобен для десктопа: просто скопируйте подписку и нажмите Ctrl+V',
    color: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-500/30',
  },
  {
    name: 'V2RayN',
    icon: '💻',
    platforms: ['Windows'],
    description: 'Классический клиент с полной поддержкой протоколов REALITY/Vision',
    color: 'from-sky-500/20 to-indigo-500/20',
    border: 'border-sky-500/30',
  },
];

/* ─────────── Features data ─────────── */
const FEATURES = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'XTLS Vision & REALITY',
    description: 'Передовые технологии маскировки трафика. Невозможно заблокировать стандартными методами DPI.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: '10 Выделенных серверов',
    description: 'Моментальный отклик и высокая пропускная способность в РФ, Австрии и Германии.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Автоматический импорт',
    description: 'Все серверы уже содержат настроенные SNI, fingerprint (chrome/random) и ключи шифрования.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Удобный формат',
    description: 'Копируйте в формате единой Base64-подписки или обычным списком ссылок на выбор.',
  },
];

/* ─────────── Animated counter ─────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

/* ─────────── Header ─────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-md shadow-accent-primary/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight block leading-none">
                KAISERXWIN <span className="gradient-text">VPN</span>
              </span>
              <span className="text-[10px] text-accent-secondary font-medium tracking-wider uppercase block mt-1">
                VLESS Subscription Hub
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Подписка', 'Список серверов', 'Клиенты', 'Инструкция'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg bg-bg-card text-text-secondary hover:text-text-primary border border-border"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {['Подписка', 'Список серверов', 'Клиенты', 'Инструкция'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block text-base font-medium text-text-secondary hover:text-text-primary transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────── Hero & Main Subscription Control ─────────── */
function Hero({
  customPrefix,
  setCustomPrefix
}: {
  customPrefix: string;
  setCustomPrefix: (val: string) => void;
}) {
  const [copiedMode, setCopiedMode] = useState<'base64' | 'raw' | null>(null);
  const [isEditingPrefix, setIsEditingPrefix] = useState(false);

  // Dynamically generate multiline URLs
  const getMultilineUrls = () => {
    return SERVERS.map(s => {
      const currentRemark = `${s.flag} ${customPrefix.trim() || 'VPN'} - ${s.remark.split('-').slice(1).join('-').trim()}`;
      return `${s.rawBase}#${encodeURIComponent(currentRemark)}`;
    }).join('\n');
  };

  // Generate Base64 subscription string
  const getBase64Subscription = () => {
    return utf8ToBase64(getMultilineUrls());
  };

  const handleCopy = async (mode: 'base64' | 'raw') => {
    const textToCopy = mode === 'base64' ? getBase64Subscription() : getMultilineUrls();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedMode(mode);
      setTimeout(() => setCopiedMode(null), 3500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedMode(mode);
      setTimeout(() => setCopiedMode(null), 3500);
    }
  };

  return (
    <section id="Подписка" className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden px-4 sm:px-6">
      {/* Background radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-accent-primary/10 rounded-full blur-[130px] animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6 border-accent-primary/30"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-secondary font-medium">10 серверов настроены и готовы к импорту</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
        >
          KAISERXWIN <span className="gradient-text">VPN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Мини-сайт для подключения подписки к клиентам <span className="text-white font-semibold">Happ</span>, <span className="text-white font-semibold">V2RayTun</span>, <span className="text-white font-semibold">v2rayNG</span> и другим. Все конфигурации содержат передовые настройки VLESS.
        </motion.p>

        {/* Customization panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-md mx-auto mb-8 bg-bg-card/40 p-3 rounded-xl border border-border flex items-center justify-between gap-2 text-left"
        >
          <div className="flex-1 overflow-hidden">
            <span className="text-[10px] text-text-muted block uppercase font-semibold">Имя в приложении (Префикс)</span>
            {isEditingPrefix ? (
              <input
                type="text"
                value={customPrefix}
                onChange={(e) => setCustomPrefix(e.target.value)}
                className="w-full bg-bg-secondary text-xs text-white px-2 py-1 rounded border border-accent-primary/50 focus:outline-none mt-0.5 font-mono"
                placeholder="KAISERXWIN VPN"
                autoFocus
                onBlur={() => setIsEditingPrefix(false)}
              />
            ) : (
              <span className="text-xs text-white font-semibold block truncate mt-0.5 cursor-pointer hover:text-accent-primary transition-colors" onClick={() => setIsEditingPrefix(true)} title="Нажмите, чтобы изменить">
                {customPrefix || 'Без префикса'} ✏️
              </span>
            )}
          </div>
          <button
            onClick={() => setIsEditingPrefix(!isEditingPrefix)}
            className="text-xs bg-bg-secondary hover:bg-bg-primary px-2.5 py-1 rounded text-text-secondary border border-border whitespace-nowrap"
          >
            {isEditingPrefix ? 'Готово' : 'Изменить'}
          </button>
        </motion.div>

        {/* Main interactive copy box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto gradient-border relative shadow-2xl shadow-accent-primary/10"
        >
          {/* CRITICAL USER REQUIREMENT: Label strictly above the button */}
          <div className="mb-4">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-secondary bg-accent-secondary/10 px-3 py-1 rounded-md border border-accent-secondary/20">
              ⚡ подключить подписку VLESS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Option 1: Base64 Subscription string */}
            <button
              onClick={() => handleCopy('base64')}
              className={`group relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border transition-all duration-300 ${
                copiedMode === 'base64'
                  ? 'bg-success/20 border-success text-white'
                  : 'bg-gradient-to-br from-accent-primary hover:from-accent-primary/90 to-accent-secondary hover:to-accent-secondary/90 text-white border-transparent shadow-lg shadow-accent-primary/30 hover:scale-[1.02]'
              }`}
            >
              {copiedMode === 'base64' ? (
                <>
                  <Check className="w-7 h-7 text-success animate-bounce" />
                  <span className="font-bold text-sm">Подписка скопирована!</span>
                  <span className="text-[10px] opacity-90 text-center">Вставьте в приложение</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span className="font-bold text-sm">Скопировать Base64</span>
                  <span className="text-[10px] opacity-80 text-center leading-tight block">
                    Рекомендуется для Happ, V2RayTun, Shadowrocket
                  </span>
                </>
              )}
            </button>

            {/* Option 2: Multiline raw links */}
            <button
              onClick={() => handleCopy('raw')}
              className={`group relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border transition-all duration-300 ${
                copiedMode === 'raw'
                  ? 'bg-success/20 border-success text-white'
                  : 'bg-bg-secondary hover:bg-bg-card text-text-primary border-border hover:border-accent-primary/50 hover:scale-[1.02]'
              }`}
            >
              {copiedMode === 'raw' ? (
                <>
                  <Check className="w-7 h-7 text-success animate-bounce" />
                  <span className="font-bold text-sm">Ссылки скопированы!</span>
                  <span className="text-[10px] text-text-muted text-center">Все 10 серверов в буфере</span>
                </>
              ) : (
                <>
                  <FileText className="w-6 h-6 text-accent-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm">Скопировать списком</span>
                  <span className="text-[10px] text-text-muted text-center leading-tight block">
                    Прямой список из 10 ссылок (v2rayNG, Nekoray)
                  </span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1.5 font-mono">
              <ServerIcon className="w-3.5 h-3.5 text-accent-primary" />
              Всего серверов: <strong className="text-white">10</strong>
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Lock className="w-3.5 h-3.5 text-success" />
              Шифрование: <strong className="text-white">REALITY / TLS</strong>
            </span>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {[
            { value: 5, label: 'Серверов в РФ 🇷🇺', desc: 'ads.x5.ru / x5.ru' },
            { value: 4, label: 'Серверов в ФРГ 🇩🇪', desc: 'xtls-rprx-vision' },
            { value: 1, label: 'Сервер в Австрии 🇦🇹', desc: 'WebSocket TLS' },
            { value: 100, suffix: '%', label: 'Готовность', desc: 'Без логов' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl border border-border text-center">
              <div className="text-xl sm:text-2xl font-black gradient-text">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold text-text-primary mt-1">{stat.label}</div>
              <div className="text-[10px] text-text-muted mt-0.5 truncate">{stat.desc}</div>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 animate-bounce">
          <a href="#Список серверов" className="inline-block p-2 text-text-muted hover:text-white transition-colors">
            <ChevronDown className="w-6 h-6 mx-auto" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Interactive Config & QR Code Manager ─────────── */
function ServerList({ customPrefix }: { customPrefix: string }) {
  const [selectedQrServer, setSelectedQrServer] = useState<typeof SERVERS[0] | null>(null);
  const [showOverallQr, setShowOverallQr] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Recompute single link with live prefix
  const getSingleServerUrl = (s: typeof SERVERS[0]) => {
    const customRemark = `${s.flag} ${customPrefix.trim() || 'VPN'} - ${s.remark.split('-').slice(1).join('-').trim()}`;
    return `${s.rawBase}#${encodeURIComponent(customRemark)}`;
  };

  const getFullBase64 = () => {
    const urls = SERVERS.map(s => getSingleServerUrl(s)).join('\n');
    return utf8ToBase64(urls);
  };

  const copySingleLink = async (s: typeof SERVERS[0]) => {
    const link = getSingleServerUrl(s);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(s.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(s.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="Список серверов" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Интерактивный список <span className="gradient-text">конфигураций</span>
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base">
          Здесь представлены все 10 серверов, входящих в вашу подписку. Вы можете скопировать любой сервер отдельно или сгенерировать для него QR-код.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowOverallQr(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bg-card border border-accent-secondary/40 text-accent-secondary hover:bg-accent-secondary/10 font-medium text-xs transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Показать QR-код всей подписки (Base64)</span>
          </button>
        </div>
      </motion.div>

      {/* Grid of 10 Servers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVERS.map((server, idx) => {
          const customRemarkDisplay = `${server.flag} ${customPrefix.trim() || 'VPN'} - ${server.remark.split('-').slice(1).join('-').trim()}`;

          return (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-5 border border-border hover:border-accent-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" title={server.country}>{server.flag}</span>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">
                        Сервер #{server.id}
                      </span>
                      <span className="text-[11px] text-text-muted font-medium block">
                        {server.country}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    server.security === 'REALITY' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {server.security}
                  </span>
                </div>

                {/* Live Name Preview */}
                <div className="mb-3 bg-bg-primary/60 p-2 rounded border border-border">
                  <span className="text-[9px] text-text-muted uppercase block font-semibold">Имя в клиенте:</span>
                  <span className="text-xs font-mono font-bold text-accent-secondary truncate block mt-0.5" title={customRemarkDisplay}>
                    {customRemarkDisplay}
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-1.5 text-xs font-mono text-text-secondary mb-4">
                  <div className="flex justify-between">
                    <span className="text-text-muted">IP / Хост:</span>
                    <span className="text-white select-all">{server.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Порт:</span>
                    <span className="text-white">{server.port}</span>
                  </div>
                  <div className="flex justify-between truncate">
                    <span className="text-text-muted mr-2">SNI:</span>
                    <span className="text-accent-primary truncate" title={server.sni}>{server.sni}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Транспорт:</span>
                    <span className="text-white">{server.transport}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                <button
                  onClick={() => copySingleLink(server)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-medium text-xs transition-all ${
                    copiedId === server.id
                      ? 'bg-success text-white'
                      : 'bg-bg-secondary hover:bg-accent-primary hover:text-white text-text-primary border border-border hover:border-transparent'
                  }`}
                >
                  {copiedId === server.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-text-muted group-hover:text-inherit" />
                      <span>Скопировать</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedQrServer(server)}
                  className="p-2 rounded-xl bg-bg-secondary hover:bg-accent-secondary hover:text-white text-text-secondary border border-border transition-colors"
                  title="Показать QR-код этого сервера"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL: Single Server QR Code */}
      <AnimatePresence>
        {selectedQrServer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-bg-card border border-border p-6 rounded-3xl max-w-sm w-full text-center relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedQrServer(null)}
                className="absolute top-4 right-4 p-1 rounded-lg bg-bg-secondary text-text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">{selectedQrServer.flag}</span>
                <h3 className="text-base font-bold text-white">Сервер #{selectedQrServer.id}</h3>
              </div>

              <p className="text-xs text-accent-secondary font-mono mb-4 bg-bg-primary p-2 rounded truncate border border-border">
                {selectedQrServer.flag} {customPrefix.trim() || 'VPN'} - {selectedQrServer.remark.split('-').slice(1).join('-').trim()}
              </p>

              {/* Render vibrant QR Code */}
              <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mb-4">
                <QRCode
                  value={getSingleServerUrl(selectedQrServer)}
                  size={200}
                  level="M"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>

              <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                Откройте приложение <strong className="text-white">Happ</strong>, <strong className="text-white">V2RayTun</strong> или <strong className="text-white">Shadowrocket</strong> и отсканируйте этот QR-код через встроенную камеру.
              </p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(getSingleServerUrl(selectedQrServer));
                  setSelectedQrServer(null);
                }}
                className="w-full py-2.5 rounded-xl bg-accent-primary hover:bg-accent-primary/80 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Скопировать ссылку и закрыть</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Full Base64 Subscription QR Code */}
      <AnimatePresence>
        {showOverallQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-bg-card border border-border p-6 rounded-3xl max-w-sm w-full text-center relative shadow-2xl"
            >
              <button
                onClick={() => setShowOverallQr(false)}
                className="absolute top-4 right-4 p-1 rounded-lg bg-bg-secondary text-text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-accent-secondary/20 text-accent-secondary flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white mb-1">QR-код всей подписки</h3>
              <p className="text-xs text-text-muted mb-4">Содержит сразу все 10 серверов (Base64)</p>

              {/* Render vibrant Base64 QR Code */}
              <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mb-4">
                <QRCode
                  value={getFullBase64()}
                  size={200}
                  level="L"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>

              <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                Некоторые клиенты поддерживают импорт Base64-подписки прямо через сканирование QR-кода.
              </p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(getFullBase64());
                  setShowOverallQr(false);
                }}
                className="w-full py-2.5 rounded-xl bg-accent-secondary hover:bg-accent-secondary/80 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Скопировать Base64 и закрыть</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────── Technical advantages ─────────── */
function Features() {
  return (
    <section className="py-20 relative bg-bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Преимущества конфигураций <span className="gradient-text">VLESS</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base">
            Ваша подписка настроена по последним стандартам безопасности для работы в условиях активных блокировок
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:bg-bg-card/80 transition-colors group border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-accent-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Supported Clients ─────────── */
function Clients() {
  return (
    <section id="Клиенты" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Совместимые <span className="gradient-text">приложения</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base">
            Подписка прекрасно импортируется во все популярные клиенты с поддержкой VLESS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-6 border ${client.border} hover:border-accent-primary/40 transition-all duration-300 hover:-translate-y-1 bg-bg-card/40`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center text-2xl shadow-inner`}>
                  {client.icon}
                </div>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {client.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-md bg-bg-primary text-[10px] font-bold text-text-secondary border border-border"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{client.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{client.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Detailed Connection Instructions ─────────── */
function HowToConnect() {
  return (
    <section id="Инструкция" className="py-20 relative bg-bg-secondary/20 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Пошаговая <span className="gradient-text">инструкция</span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Как правильно подключить подписку в несколько касаний
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              step: '01',
              title: 'Скопируйте подписку на этом сайте',
              desc: 'Поднимитесь к началу страницы и нажмите кнопку «Скопировать Base64». Все 10 серверов автоматически упакуются в одну защищенную строку с вашим префиксом.',
              badge: 'Буфер обмена',
              color: 'text-accent-primary'
            },
            {
              step: '02',
              title: 'Откройте приложение Happ или V2RayTun',
              desc: 'Если у вас еще не установлено приложение, скачайте его из App Store или Google Play. Это бесплатные клиенты без рекламы.',
              badge: 'Установка',
              color: 'text-accent-secondary'
            },
            {
              step: '03',
              title: 'Импортируйте из буфера обмена',
              desc: 'В приложении нажмите кнопку «+» (Добавить) или перейдите в раздел «Подписки» (Subscriptions). Выберите пункт «Импорт из буфера обмена» (Import from Clipboard).',
              badge: 'Импорт',
              color: 'text-success'
            },
            {
              step: '04',
              title: 'Обновите и подключайтесь',
              desc: 'В списке сразу появятся 10 серверов с флагами 🇷🇺, 🇦🇹, 🇩🇪 и названием KAISERXWIN VPN. Выберите сервер с наименьшим пингом и нажмите большую кнопку включения.',
              badge: 'Готово!',
              color: 'text-amber-400'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-border flex flex-col sm:flex-row gap-5 items-start"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-bg-primary font-black text-lg border border-border shrink-0">
                <span className={item.color}>{item.step}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <span className="text-[10px] bg-bg-primary px-2 py-0.5 rounded font-mono text-text-muted border border-border">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ box */}
        <div className="mt-12 bg-bg-card/60 border border-border rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-accent-secondary" />
            <span>Часто задаваемые вопросы</span>
          </h3>
          <div className="space-y-4 text-xs text-text-secondary">
            <div>
              <strong className="text-text-primary block mb-0.5">Что делать, если ссылки не импортируются?</strong>
              <span>Попробуйте скопировать не Base64, а второй вариант — «Скопировать списком». Некоторые старые версии клиентов лучше понимают прямые многострочные ссылки.</span>
            </div>
            <div>
              <strong className="text-text-primary block mb-0.5">Нужно ли обновлять подписку?</strong>
              <span>Эти 10 серверов являются статичными выделенными узлами. Если настройки изменятся, вы сможете заново скопировать актуальную подписку на этом мини-сайте.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-bg-primary relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center font-bold text-white text-xs">
              K
            </div>
            <div>
              <span className="text-sm font-bold block leading-none">
                KAISERXWIN <span className="gradient-text">VPN</span>
              </span>
              <span className="text-[10px] text-text-muted block mt-1">
                Безопасные подписки VLESS
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-text-muted font-mono">
            <span>🇷🇺 5 серверов</span>
            <span>🇩🇪 4 сервера</span>
            <span>🇦🇹 1 сервер</span>
            <span className="text-success font-bold">● VLESS-Reality-Vision</span>
          </div>

          <p className="text-xs text-text-muted text-center sm:text-right">
            © {new Date().getFullYear()} KAISERXWIN VPN. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── App ─────────── */
export default function App() {
  const [customPrefix, setCustomPrefix] = useState('KAISERXWIN VPN');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-primary selection:text-white">
      <Header />
      <Hero customPrefix={customPrefix} setCustomPrefix={setCustomPrefix} />
      <ServerList customPrefix={customPrefix} />
      <Features />
      <Clients />
      <HowToConnect />
      <Footer />
    </div>
  );
}
