(function () {
  'use strict';

  function getSystemPrompt(selectedModel, effortKey) {
    const model = selectedModel || 'Claude Sonnet 5.5';
    const lower = model.toLowerCase();
    let identityPrefix;
    if (lower.includes('gpt image')) {
      identityPrefix = `Eres ${model}, el modelo oficial de generación visual de inteligencia artificial desarrollado por OpenAI con arquitectura Sunburst de alta precisión. Si te preguntan quién eres, qué modelo eres o sobre tu identidad, responde siempre con naturalidad y exactitud diciendo que eres ${model} de OpenAI (ejemplo: "Soy ${model} de OpenAI."). NUNCA menciones a Flux, Anthropic, Qwen ni Meta. Responde siempre de forma educada, servicial y natural en español.`;
    } else if (lower.includes('flux')) {
      const isFlux2 = lower.includes('flux.2');
      const modelDisplayName = isFlux2 ? 'Flux.2' : 'Flux';
      identityPrefix = `Eres ${modelDisplayName}, un modelo avanzado de generación visual desarrollado por Black Forest Labs (flux-2-flash) e integrado a través de Poe API. Si te preguntan quién eres, qué modelo eres o sobre tu identidad, responde siempre con naturalidad y exactitud diciendo que eres ${modelDisplayName} vía Poe API (ejemplo: "Soy ${modelDisplayName} en Poe API."). Responde siempre de forma educada, servicial y natural en español.`;
    } else if (lower.includes('gpt 6 astra')) {
      identityPrefix = `Eres ${model}, un modelo insignia de lenguaje e inteligencia artificial desarrollado por OpenAI. Si te preguntan quién eres, qué modelo eres o sobre tu identidad, responde siempre con naturalidad y exactitud diciendo que eres ${model} de OpenAI (ejemplo: "Soy ${model} de OpenAI."). NUNCA menciones a Mistral, Mistral Large, NVIDIA, Anthropic, Claude, Qwen ni Meta. Responde siempre de forma educada, servicial y natural en español.`;
    } else {
      identityPrefix = `Eres ${model}, un modelo de inteligencia artificial desarrollado por Anthropic. Si te preguntan quién eres, qué modelo eres o sobre tu identidad, responde siempre con naturalidad y exactitud diciendo que eres ${model} de Anthropic (ejemplo: "Soy ${model} de Anthropic."). NUNCA menciones a Qwen, OpenAI, Meta, Alibaba ni ningún modelo o creador técnico externo. Responde siempre de forma educada, servicial y natural en español.`;
    }
    const styles = {
      bajo: ' Estilo: responde de forma concisa, directa y ágil en español. Resuelve la consulta sin preámbulos innecesarios.',
      medio: ' Estilo: responde de forma clara, equilibrada y completa en español, con explicaciones naturales según la consulta.',
      alto: ' Estilo: analiza detalladamente la consulta y responde en español con estructura sólida, considerando buenas prácticas.',
      extra: ' Estilo: desarrolla un análisis exhaustivo y riguroso en español, abordando detalles técnicos con precisión.',
      max: ' Estilo: responde con máxima profundidad conceptual, rigor analítico y exhaustividad en español según la consulta.'
    };
    return identityPrefix + (styles[effortKey] || styles.bajo);
  }

  const EFFORT_STEPS = ['bajo', 'medio', 'alto', 'extra', 'max'];
  const EFFORT_LABELS = {
    bajo: 'Bajo',
    medio: 'Medio',
    alto: 'Alto',
    extra: 'Extra',
    max: 'Max'
  };

  const CLAUDE_SPARK_SVG = `
    <svg class="claude-spark-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12.4 7.2 16.8 11.6 22 12C16.8 12.4 12.4 16.8 12 22C11.6 16.8 7.2 12.4 2 12C7.2 11.6 11.6 7.2 12 2Z"></path>
    </svg>
  `;

  const KNOWLEDGE_RESPONSES = {
    general: [
      `Actualmente estás en **modo de simulación local** porque no hay una **Groq API Key** activa en Configuración ⚙️.

Para recibir respuestas reales e inteligentes a tu consulta con **${'modelo seleccionado'}**, ingresa tu clave de Groq en **Configuración > API de Groq** y haz clic en **Guardar**.`
    ]
  };

  const MODEL_THOUGHT_CHAINS = {
    'GPT Image 2.6 Sunburst': [
      'Interpretando prompt semántico mediante la arquitectura Sunburst de OpenAI.\nCalculando vectores de difusión latente y coherencia estructural de OpenAI.\nAplicando optimización neural de color, texturas y contraste nativo.\nRenderizando imagen final en alta resolución con el modelo OpenAI GPT Image 2.6 Sunburst.',
      'Procesando descriptores visuales en el espacio latente de OpenAI Sunburst.\nAlineando fidelidad geométrica, balance cromático y composición estética de OpenAI.\nGenerando síntesis gráfica final con GPT Image 2.6 Sunburst.'
    ],
    'GPT Image 2.6 sunburst': [
      'Interpretando prompt semántico mediante la arquitectura Sunburst de OpenAI.\nCalculando vectores de difusión latente y coherencia estructural de OpenAI.\nAplicando optimización neural de color, texturas y contraste nativo.\nRenderizando imagen final en alta resolución con el modelo OpenAI GPT Image 2.6 Sunburst.',
      'Procesando descriptores visuales en el espacio latente de OpenAI Sunburst.\nAlineando fidelidad geométrica, balance cromático y composición estética de OpenAI.\nGenerando síntesis gráfica final con GPT Image 2.6 Sunburst.'
    ],
    'Flux.2': [
      'Interpretando prompt visual y afinando descriptores semánticos en Poe API.\nCalculando tensores de difusión de flux-2-flash mediante Poe API.\nAplicando optimización latente de alta fidelidad con flux-2-flash.\nRenderizando imagen final de alta resolución.',
      'Alineando composición cinemática e iluminación avanzada en Poe API.\nProcesando inferencia visual con el modelo flux-2-flash.\nGenerando síntesis gráfica en ultra alta definición.'
    ],
    'Flux': [
      'Interpretando prompt visual y estilo de composición en Poe API.\nConfigurando petición segura hacia el modelo flux-2-flash.\nEjecutando inferencia de difusión guiada en Poe API.\nFinalizando renderizado gráfico con flux-2-flash.',
      'Sintetizando escena visual con flux-2-flash en Poe API.\nAlineando iluminación volumétrica y paleta cromática.\nGenerando salida gráfica en alta fidelidad.'
    ],
    'Claude Fable 5.2': [
      'Desplegando procesamiento conceptual refinado con proyección multimodal (OpenAI GPT-OSS 120B).\nIntegrando perspectivas holísticas y refinamiento estético de las soluciones.\nVerificando consistencia armónica en la respuesta final.',
      'Sintetizando modelos de abstracción con alta elegancia formal.\nConstruyendo una solución clara, modular y adaptativa.'
    ],
    'Claude Opus 5.5': [
      'Iniciando razonamiento reflexivo profundo (OpenAI GPT-OSS 20B).\nExaminando fundamentos teóricos, implicaciones algebraicas y compromisos estructurales del problema.\nDesarrollando deducción formal y verificando invariantes antes de emitir la conclusión final.',
      'Evaluando múltiples rutas de resolución y comparando su solidez.\nDescartando aproximaciones triviales para ofrecer un análisis riguroso de nivel superior.\nEstructurando demostración detallada con respaldo axiomático.'
    ],
    'Claude Sonnet 5.5': [
      'Analizando la intención semántica de la consulta del usuario (Qwen 3.8-27B).\nSintetizando la arquitectura de componentes y verificando patrones de bajo acoplamiento.\nOptimizando estructura para entregar una respuesta concisa, verificable y con código idiomático.',
      'Identificando dependencias clave y posibles casos límite.\nFormulando explicación estructurada con ejemplos prácticos paso a paso.\nRevisando balance entre legibilidad y precisión conceptual.'
    ],
    'Claude Haiku 5.5': [
      'Ejecutando inferencia ultrarrápida de alta reactividad contextual.\nPriorizando concisión, agilidad ejecutiva y síntesis directa de la solución.',
      'Procesando flujo dinámico en tiempo real.\nEntregando respuesta directa y eficiente sin latencia superflua.'
    ],
    'Claude Fable 5': [
      'Conectando ideas clave con fluidez narrativa y enfoque creativo.\nEstructurando las explicaciones con analogías claras y tono comunicativo ágil.\nPriorizando una comprensión conceptual inmediata sin sobrecarga técnica.',
      'Contextualizando el problema dentro de un marco intuitivo.\nSintetizando soluciones expresivas con claridad compositiva.'
    ],
    'Claude Fable 5.1': [
      'Ampliando el contexto semántico y enriqueciendo las conexiones narrativas.\nCalibrando la coherencia estilística con alta precisión contextual.\nRefinando los argumentos para articular una síntesis envolvente y directa.',
      'Alineando la propuesta conceptual con las particularidades del entorno planteado.\nAsegurando fluidez, ritmo de exposición y balance temático.'
    ],
    'Claude Opus 5': [
      'Analizando deducción matemática y lógica estructurada con alta coherencia analítica.\nVerificando consistencia de argumentos y completitud técnica.'
    ],
    'Claude Opus 4.8': [
      'Profundizando en el árbol de decisión conceptual.\nConstruyendo soluciones exhaustivas con verificación rigurosa.'
    ],
    'Claude Opus 4.7': [
      'Calibrando razonamiento extendido y síntesis analítica.'
    ],
    'Claude Opus 4.6': [
      'Procesando consultas complejas con arquitectura analítica robusta.'
    ],
    'Claude Sonnet 5': [
      'Sintetizando lógica de programación y mejores prácticas de ingeniería.'
    ],
    'Claude Sonnet 4.6': [
      'Estructurando respuesta equilibrada entre velocidad y solidez técnica.'
    ],
    'GPT 6 Astra': [
      'Activando motores de razonamiento profundo y síntesis estelar de OpenAI...',
      'Contrastando inferencias multi-paso y validando coherencia estructural.'
    ]
  };

  const STORAGE_KEY_CHATS = 'megacld_chats_data_v1';
  const STORAGE_KEY_SETTINGS = 'megacld_settings_v1';

  const PLAN_CONFIG = {
    free: {
      id: 'free',
      name: 'Plan Gratuito',
      price: 0,
      basicImageLimit: 5,
      allowedTextModels: ['claude sonnet 4.6', 'claude haiku 5.5', 'gpt 6 astra']
    },
    go: {
      id: 'go',
      name: 'Plan Go',
      price: 10,
      initialCredits: 1000,
      basicImageLimit: 500
    }
  };

  let state = {
    chats: [],
    activeChatId: null,
    isStreaming: false,
    abortController: false,
    selectedAttachment: null,
    settings: {
      theme: 'dark',
      userName: '',
      selectedModel: 'Claude Sonnet 4.6',
      selectedModelType: 'text',
      effortLevel: 'bajo',
      streamSpeed: 'normal',
      enableThinking: true,
      enableWebSearch: false,
      groqApiKey: '',
      nvidiaApiKey: '',
      nvidiaProxyUrl: '',
      poeApiKey: '',
      poeProxyUrl: '',
      stripeTestSecretKey: '',
      stripeTestPaymentLink: '',
      lastVerifiedStripeSessionId: '',
      plan: 'free',
      credits: 0,
      basicImageUsed: 0
    }
  };

  const DEFAULT_POE_PROXY_URL = 'https://megacld-poe.villaruizgerardo0.workers.dev';
  const STORAGE_KEY_PENDING_STRIPE = 'megacld_pending_stripe_session';
  let stripePollTimer = null;

  const SPEED_DELAYS = {
    fast: 14,
    normal: 26,
    slow: 48
  };

  const dom = {};

  function cacheDom() {
    dom.body = document.body;
    dom.sidebar = document.getElementById('sidebar');
    dom.sidebarBackdrop = document.getElementById('sidebarBackdrop');
    dom.openSidebarBtn = document.getElementById('openSidebarBtn');
    dom.closeSidebarBtn = document.getElementById('closeSidebarBtn');
    dom.newChatBtn = document.getElementById('newChatBtn');
    dom.brandBtn = document.getElementById('brandBtn');
    dom.searchInput = document.getElementById('searchInput');
    dom.chatsList = document.getElementById('chatsList');
    dom.topbarTitle = document.getElementById('topbarTitle');
    dom.themeToggleBtn = document.getElementById('themeToggleBtn');
    dom.chatModelSelectorBtn = document.getElementById('chatModelSelectorBtn');
    dom.composerModelName = document.getElementById('composerModelName');
    dom.modelSelectModal = document.getElementById('modelSelectModal');
    dom.modelTypeTabs = document.getElementById('modelTypeTabs');
    dom.tabTypeText = document.getElementById('tabTypeText');
    dom.tabTypeImage = document.getElementById('tabTypeImage');
    dom.tabTypeVideo = document.getElementById('tabTypeVideo');
    dom.paneTypeText = document.getElementById('paneTypeText');
    dom.paneTypeImage = document.getElementById('paneTypeImage');
    dom.paneTypeVideo = document.getElementById('paneTypeVideo');
    dom.closeModelSheetBtn = document.getElementById('closeModelSheetBtn');
    dom.applyModelChangesBtn = document.getElementById('applyModelChangesBtn');
    dom.effortCurrentDisplay = document.getElementById('effortCurrentDisplay');
    dom.effortSliderTrack = document.getElementById('effortSliderTrack');
    dom.effortSliderFill = document.getElementById('effortSliderFill');
    dom.effortSliderThumb = document.getElementById('effortSliderThumb');
    dom.toggleClaudeModelsBtn = document.getElementById('toggleClaudeModelsBtn');
    dom.claudeModelsContainer = document.getElementById('claudeModelsContainer');
    dom.toggleOpenAiModelsBtn = document.getElementById('toggleOpenAiModelsBtn');
    dom.openAiModelsContainer = document.getElementById('openAiModelsContainer');
    dom.toggleLegacyModelsBtn = document.getElementById('toggleLegacyModelsBtn');
    dom.legacyModelsList = document.getElementById('legacyModelsList');
    dom.legacyChevronIcon = document.getElementById('legacyChevronIcon');
    dom.chatViewport = document.getElementById('chatViewport');
    dom.welcomeScreen = document.getElementById('welcomeScreen');
    dom.claudeEmptyGreeting = document.getElementById('claudeEmptyGreeting');
    dom.claudeEmptySubtitle = document.getElementById('claudeEmptySubtitle');
    dom.messagesContainer = document.getElementById('messagesContainer');
    dom.messageInput = document.getElementById('messageInput');
    dom.sendBtn = document.getElementById('sendBtn');
    dom.stopBtn = document.getElementById('stopBtn');
    dom.attachBtn = document.getElementById('attachBtn');
    dom.micBtn = document.getElementById('micBtn');
    dom.fileInput = document.getElementById('fileInput');
    dom.attachmentPreview = document.getElementById('attachmentPreview');
    dom.attachmentName = document.getElementById('attachmentName');
    dom.removeAttachmentBtn = document.getElementById('removeAttachmentBtn');
    dom.userProfileWidget = document.getElementById('userProfileWidget');
    dom.userAvatarCircle = document.getElementById('userAvatarCircle');
    dom.profileUserName = document.getElementById('profileUserName');
    dom.nameModal = document.getElementById('nameModal');
    dom.closeNameModalBtn = document.getElementById('closeNameModalBtn');
    dom.customAccountNameInput = document.getElementById('customAccountNameInput');
    dom.saveAccountNameBtn = document.getElementById('saveAccountNameBtn');
    dom.settingsModal = document.getElementById('settingsModal');
    dom.openSettingsBtn = document.getElementById('openSettingsBtn');
    dom.closeSettingsBtn = document.getElementById('closeSettingsBtn');
    dom.saveSettingsCloseBtn = document.getElementById('saveSettingsCloseBtn');
    dom.themeLightBtn = document.getElementById('themeLightBtn');
    dom.themeDarkBtn = document.getElementById('themeDarkBtn');
    dom.streamSpeedSelect = document.getElementById('streamSpeedSelect');
    dom.thinkingToggle = document.getElementById('thinkingToggle');
    dom.groqApiKeyInput = document.getElementById('groqApiKeyInput');
    dom.toggleApiKeyVisibilityBtn = document.getElementById('toggleApiKeyVisibilityBtn');
    dom.eyeIconShow = document.getElementById('eyeIconShow');
    dom.eyeIconHide = document.getElementById('eyeIconHide');
    dom.saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
    dom.apiKeyStatusNotice = document.getElementById('apiKeyStatusNotice');
    dom.nvidiaApiKeyInput = document.getElementById('nvidiaApiKeyInput');
    dom.nvidiaProxyUrlInput = document.getElementById('nvidiaProxyUrlInput');
    dom.toggleNvidiaKeyVisibilityBtn = document.getElementById('toggleNvidiaKeyVisibilityBtn');
    dom.eyeIconNvidiaShow = document.getElementById('eyeIconNvidiaShow');
    dom.eyeIconNvidiaHide = document.getElementById('eyeIconNvidiaHide');
    dom.saveNvidiaConfigBtn = document.getElementById('saveNvidiaConfigBtn');
    dom.nvidiaStatusNotice = document.getElementById('nvidiaStatusNotice');
    dom.poeApiKeyInput = document.getElementById('poeApiKeyInput');
    dom.poeProxyUrlInput = document.getElementById('poeProxyUrlInput');
    dom.togglePoeKeyVisibilityBtn = document.getElementById('togglePoeKeyVisibilityBtn');
    dom.eyeIconPoeShow = document.getElementById('eyeIconPoeShow');
    dom.eyeIconPoeHide = document.getElementById('eyeIconPoeHide');
    dom.savePoeConfigBtn = document.getElementById('savePoeConfigBtn');
    dom.poeStatusNotice = document.getElementById('poeStatusNotice');
    dom.clearAllChatsBtn = document.getElementById('clearAllChatsBtn');
    dom.toastNotification = document.getElementById('toastNotification');
    dom.toastMessage = document.getElementById('toastMessage');
    dom.openPlanModalBtn = document.getElementById('openPlanModalBtn');
    dom.sidebarPlanBtnText = document.getElementById('sidebarPlanBtnText');
    dom.sidebarCreditsPill = document.getElementById('sidebarCreditsPill');
    dom.sidebarUserPlanLabel = document.getElementById('sidebarUserPlanLabel');
    dom.planModal = document.getElementById('planModal');
    dom.closePlanModalBtn = document.getElementById('closePlanModalBtn');
    dom.closePlanModalFooterBtn = document.getElementById('closePlanModalFooterBtn');
    dom.planModalCurrentName = document.getElementById('planModalCurrentName');
    dom.planModalCreditsValue = document.getElementById('planModalCreditsValue');
    dom.planModalImagesValue = document.getElementById('planModalImagesValue');
    dom.freePlanBadge = document.getElementById('freePlanBadge');
    dom.goPlanBadge = document.getElementById('goPlanBadge');
    dom.switchToFreeBtn = document.getElementById('switchToFreeBtn');
    dom.activateGoPlanBtn = document.getElementById('activateGoPlanBtn');
    dom.testAddCreditsBtn = document.getElementById('testAddCreditsBtn');
    dom.testDepleteCreditsBtn = document.getElementById('testDepleteCreditsBtn');
    dom.testResetImagesBtn = document.getElementById('testResetImagesBtn');
    dom.modelBannerPlanName = document.getElementById('modelBannerPlanName');
    dom.modelBannerStats = document.getElementById('modelBannerStats');
    dom.modelBannerManageBtn = document.getElementById('modelBannerManageBtn');
    dom.stripeTestSecretKeyInput = document.getElementById('stripeTestSecretKeyInput');
    dom.stripeTestPaymentLinkInput = document.getElementById('stripeTestPaymentLinkInput');
    dom.saveStripeConfigBtn = document.getElementById('saveStripeConfigBtn');
    dom.stripeStatusNotice = document.getElementById('stripeStatusNotice');
    dom.stripeTestCheckoutBox = document.getElementById('stripeTestCheckoutBox');
    dom.stripeTestCheckoutDesc = document.getElementById('stripeTestCheckoutDesc');
    dom.confirmStripeTestPayBtn = document.getElementById('confirmStripeTestPayBtn');
    dom.cancelStripeTestPayBtn = document.getElementById('cancelStripeTestPayBtn');
    dom.stripePendingSessionBox = document.getElementById('stripePendingSessionBox');
    dom.stripePendingSessionText = document.getElementById('stripePendingSessionText');
    dom.openPendingStripeUrlBtn = document.getElementById('openPendingStripeUrlBtn');
    dom.verifyPendingStripeBtn = document.getElementById('verifyPendingStripeBtn');
    dom.cancelPendingStripeBtn = document.getElementById('cancelPendingStripeBtn');
    dom.webSearchWrapper = document.getElementById('webSearchWrapper');
    dom.webSearchToggleBtn = document.getElementById('webSearchToggleBtn');
    dom.webSearchPopover = document.getElementById('webSearchPopover');
    dom.webSearchSwitchInput = document.getElementById('webSearchSwitchInput');
  }

  cacheDom();

  function generateId() {
    return 'cld_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showToast(message) {
    if (!dom.toastNotification) return;
    dom.toastMessage.textContent = message;
    dom.toastNotification.classList.add('active');
    setTimeout(() => {
      dom.toastNotification.classList.remove('active');
    }, 2400);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Texto copiado al portapapeles');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Texto copiado al portapapeles');
    } catch (e) {
      showToast('Error al copiar');
    }
    document.body.removeChild(ta);
  }

  function getTimeGreeting() {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return 'Días';
    } else if (hours >= 12 && hours < 20) {
      return 'Tardes';
    } else {
      return 'Noches';
    }
  }

  function updateEmptyStateGreeting() {
    const name = (state.settings.userName || 'Usuario').trim();
    const timeWord = getTimeGreeting();
    dom.claudeEmptyGreeting.textContent = `${timeWord}, ${name}`;
    dom.claudeEmptySubtitle.textContent = '¿En qué puedo ayudarte hoy?';
    dom.profileUserName.textContent = name;
    dom.userAvatarCircle.textContent = (name[0] || 'U').toUpperCase();
  }

  function cleanIdentityLeakage(text, currentModel) {
    if (!text) return '';
    const activeModel = currentModel || (state && state.settings && state.settings.selectedModel) || '';
    const lower = activeModel.toLowerCase();
    if (lower.includes('gpt image')) {
      return text
        .replace(/(?:creado|desarrollado|entrenado)\s+por\s+(?:Anthropic|Qwen|Meta|Alibaba)/gi, 'desarrollado por OpenAI')
        .replace(/(?:un modelo de lenguaje|un asistente|una IA|un modelo)\s+(?:de\s+inteligencia\s+artificial\s+)?(?:creado|desarrollado)\s+por\s+(?:Anthropic|Qwen|Meta|Alibaba)/gi, 'GPT Image 2.6 Sunburst de OpenAI');
    }
    if (lower.includes('flux')) {
      const isFlux2 = lower.includes('flux.2');
      const modelDisplayName = isFlux2 ? 'Flux.2' : 'Flux';
      return text
        .replace(/(?:creado|desarrollado|entrenado)\s+por\s+(?:Anthropic|Qwen|Meta|Alibaba|OpenAI|Pollinations|Cloudflare)/gi, 'ejecutado en Poe API')
        .replace(/(?:un modelo de lenguaje|un asistente|una IA|un modelo)\s+(?:de\s+inteligencia\s+artificial\s+)?(?:creado|desarrollado)\s+por\s+(?:Anthropic|Qwen|Meta|Alibaba|OpenAI|Pollinations|Cloudflare)/gi, `${modelDisplayName} vía Poe API`);
    }
    if (lower.includes('gpt 6 astra')) {
      return text
        .replace(/mistralai\/mistral-large-4-1t-a52b/gi, 'GPT 6 Astra')
        .replace(/\bMistral\s+Large(?:\s+\d+)?/gi, 'GPT 6 Astra')
        .replace(/(?:creado|desarrollado|entrenado|impulsado)\s+por\s+(?:Mistral(?:\s+AI)?|NVIDIA|Anthropic|Qwen|Meta|Alibaba)/gi, 'desarrollado por OpenAI')
        .replace(/(?:un modelo de lenguaje|un asistente|una IA|un modelo)\s+(?:de\s+inteligencia\s+artificial\s+)?(?:creado|desarrollado|entrenado)\s+por\s+(?:Mistral(?:\s+AI)?|NVIDIA|Anthropic|Qwen|Meta|Alibaba)/gi, 'GPT 6 Astra de OpenAI')
        .replace(/\bMistral(?:\s+AI)?\b/gi, 'OpenAI');
    }
    return text
      .replace(/(?:creado|desarrollado|entrenado)\s+por\s+(?:OpenAI|Qwen|Meta|Alibaba)/gi, 'desarrollado por Anthropic')
      .replace(/(?:un modelo de lenguaje|un asistente|una IA|un modelo)\s+(?:de\s+inteligencia\s+artificial\s+)?(?:creado|desarrollado)\s+por\s+(?:OpenAI|Qwen|Meta|Alibaba)/gi, 'Claude de Anthropic')
      .replace(/OpenAI/gi, 'Anthropic')
      .replace(/ChatGPT/gi, 'Claude');
  }

  function buildCodeBlockHtml(lang, rawCode) {
    const safeCode = escapeHtml(rawCode);
    const safeLang = escapeHtml(lang || 'code');
    return `
      <div class="code-block-wrapper">
        <div class="code-header">
          <span>${safeLang}</span>
          <button type="button" class="code-copy-btn" data-code="${encodeURIComponent(rawCode)}">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copiar</span>
          </button>
        </div>
        <pre><code>${safeCode}</code></pre>
      </div>
    `;
  }

  function renderMarkdown(md) {
    if (!md) return '';
    const normalized = md.replace(/\r\n?/g, '\n');
    const lines = normalized.split('\n');
    let listTag = '';
    let htmlOutput = '';
    let inCodeBlock = false;
    let fenceChar = '';
    let fenceLen = 3;
    let codeLang = 'code';
    let codeBuffer = [];

    function closeOpenList() {
      if (listTag) {
        htmlOutput += `</${listTag}>`;
        listTag = '';
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];

      if (inCodeBlock) {
        const trimmedLine = rawLine.trim();
        const isPureFence = trimmedLine.length >= fenceLen && [...trimmedLine].every(ch => ch === fenceChar);
        const fenceSuffix = fenceChar.repeat(fenceLen);
        if (isPureFence) {
          htmlOutput += buildCodeBlockHtml(codeLang, codeBuffer.join('\n').trim());
          inCodeBlock = false;
          codeBuffer = [];
          continue;
        }
        if (fenceChar === '`' && trimmedLine.endsWith(fenceSuffix) && trimmedLine.length > fenceLen) {
          const idx = rawLine.lastIndexOf(fenceSuffix);
          const beforeFence = rawLine.slice(0, idx);
          if (beforeFence.trim()) codeBuffer.push(beforeFence);
          htmlOutput += buildCodeBlockHtml(codeLang, codeBuffer.join('\n').trim());
          inCodeBlock = false;
          codeBuffer = [];
          continue;
        }
        codeBuffer.push(rawLine);
        continue;
      }

      const fenceMatch = rawLine.match(/^\s*(`{3,}|~{3,})\s*([^\s`~]*)\s*(.*)$/);
      if (fenceMatch) {
        closeOpenList();
        const fenceToken = fenceMatch[1];
        fenceChar = fenceToken[0];
        fenceLen = fenceToken.length;
        codeLang = fenceMatch[2] || 'code';
        const trailing = (fenceMatch[3] || '').trim();
        const closingToken = fenceChar.repeat(fenceLen);
        if (trailing && trailing.endsWith(closingToken) && trailing.length > fenceLen) {
          const singleCode = trailing.slice(0, trailing.length - fenceLen).trim();
          htmlOutput += buildCodeBlockHtml(codeLang, singleCode);
          continue;
        }
        inCodeBlock = true;
        codeBuffer = [];
        if (trailing) {
          codeBuffer.push(trailing);
        }
        continue;
      }

      const line = cleanIdentityLeakage(rawLine);

      const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)$/);
      if (imgMatch) {
        closeOpenList();
        const altText = escapeHtml(imgMatch[1]);
        const imgUrl = escapeHtml(imgMatch[2]);
        const isDataUrl = imgUrl.startsWith('data:');
        htmlOutput += `
          <div class="generated-image-card">
            <img src="${imgUrl}" alt="${altText}" class="generated-preview-img" loading="lazy">
            <div class="image-card-footer">
              <a href="${imgUrl}" ${isDataUrl ? 'download="poe-flux-render.png"' : 'target="_blank" rel="noopener noreferrer"'} class="image-open-external-btn">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>${isDataUrl ? 'Descargar imagen' : 'Ver imagen completa'}</span>
              </a>
            </div>
          </div>
        `;
        continue;
      }

      if (line.startsWith('### ')) {
        closeOpenList();
        htmlOutput += `<h3>${inlineFormatting(line.substring(4))}</h3>`;
        continue;
      }
      if (line.startsWith('## ')) {
        closeOpenList();
        htmlOutput += `<h3>${inlineFormatting(line.substring(3))}</h3>`;
        continue;
      }

      if (line.match(/^[-*]\s+(.*)/)) {
        const itemText = line.replace(/^[-*]\s+/, '');
        if (listTag !== 'ul') {
          closeOpenList();
          htmlOutput += '<ul>';
          listTag = 'ul';
        }
        htmlOutput += `<li>${inlineFormatting(itemText)}</li>`;
        continue;
      } else if (line.match(/^\d+\.\s+(.*)/)) {
        const itemText = line.replace(/^\d+\.\s+/, '');
        if (listTag !== 'ol') {
          closeOpenList();
          htmlOutput += '<ol>';
          listTag = 'ol';
        }
        htmlOutput += `<li>${inlineFormatting(itemText)}</li>`;
        continue;
      } else {
        closeOpenList();
      }

      if (line.trim() === '') {
        continue;
      }

      htmlOutput += `<p>${inlineFormatting(line)}</p>`;
    }

    if (inCodeBlock) {
      htmlOutput += buildCodeBlockHtml(codeLang, codeBuffer.join('\n').trim());
    }
    closeOpenList();

    return htmlOutput;
  }

  function inlineFormatting(text) {
    let s = escapeHtml(text);
    s = s.replace(/!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g, function (match, alt, rawUrl) {
      const cleanUrl = rawUrl.replace(/&amp;/g, '&');
      return `<span class="inline-generated-image-wrap"><img src="${cleanUrl}" alt="${alt}" class="generated-preview-img" loading="lazy"></span>`;
    });
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
    s = s.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    return s;
  }

  function loadPersistedData() {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        if (parsedSettings && typeof parsedSettings === 'object') {
          state.settings = Object.assign(state.settings, parsedSettings);
        }
      }
      const storedChats = localStorage.getItem(STORAGE_KEY_CHATS);
      if (storedChats) {
        const parsedChats = JSON.parse(storedChats);
        if (Array.isArray(parsedChats)) {
          state.chats = parsedChats;
        }
      }
    } catch (err) {}
  }

  function saveChats() {
    try {
      localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(state.chats));
    } catch (err) {}
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(state.settings));
    } catch (err) {}
  }

  function applySettings() {
    if (dom.body) dom.body.setAttribute('data-theme', state.settings.theme || 'dark');
    if (state.settings.theme === 'light') {
      if (dom.themeLightBtn) dom.themeLightBtn.classList.add('active');
      if (dom.themeDarkBtn) dom.themeDarkBtn.classList.remove('active');
    } else {
      if (dom.themeDarkBtn) dom.themeDarkBtn.classList.add('active');
      if (dom.themeLightBtn) dom.themeLightBtn.classList.remove('active');
    }
    if (dom.streamSpeedSelect) dom.streamSpeedSelect.value = state.settings.streamSpeed || 'normal';
    if (dom.thinkingToggle) dom.thinkingToggle.checked = !!state.settings.enableThinking;
    if (dom.groqApiKeyInput) {
      dom.groqApiKeyInput.value = state.settings.groqApiKey || '';
      updateApiKeyStatusBadge();
    }
    if (dom.nvidiaApiKeyInput) {
      dom.nvidiaApiKeyInput.value = state.settings.nvidiaApiKey || '';
    }
    if (dom.nvidiaProxyUrlInput) {
      dom.nvidiaProxyUrlInput.value = state.settings.nvidiaProxyUrl || '';
    }
    if (dom.poeApiKeyInput) {
      dom.poeApiKeyInput.value = state.settings.poeApiKey || '';
    }
    if (dom.poeProxyUrlInput) {
      dom.poeProxyUrlInput.value = state.settings.poeProxyUrl || '';
    }
    if (dom.stripeTestSecretKeyInput) {
      dom.stripeTestSecretKeyInput.value = state.settings.stripeTestSecretKey || '';
    }
    if (dom.stripeTestPaymentLinkInput) {
      dom.stripeTestPaymentLinkInput.value = state.settings.stripeTestPaymentLink || '';
    }
    updateNvidiaStatusBadge();
    updatePoeStatusBadge();
    updateStripeStatusBadge();
    ensureValidModelForPlan();
    updateModelSelectionUI(state.settings.selectedModel || 'Claude Sonnet 4.6');
    setEffortLevel(state.settings.effortLevel || 'bajo');
    updateEmptyStateGreeting();
    updateSubscriptionUI();
    updateWebSearchUI();
  }

  function updateWebSearchUI() {
    const enabled = !!state.settings.enableWebSearch;
    if (dom.webSearchSwitchInput) {
      dom.webSearchSwitchInput.checked = enabled;
    }
    if (dom.webSearchToggleBtn) {
      dom.webSearchToggleBtn.classList.toggle('active', enabled);
      dom.webSearchToggleBtn.title = enabled
        ? 'Búsqueda en internet: ACTIVADA'
        : 'Búsqueda en internet: DESACTIVADA';
    }
  }

  function shouldPerformWebSearch(promptText) {
    if (!state.settings.enableWebSearch) return false;
    const raw = (promptText || '').trim();
    if (!raw || raw.length < 3) return false;
    const lower = raw
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (/^(hola|hi|hello|buenos dias|buenas tardes|buenas noches|gracias|muchas gracias|ok|vale|listo|si|no|adios)[!.\s]*$/.test(lower)) {
      return false;
    }

    if (/^[\d\s+\-*/().=]+$/.test(lower)) {
      return false;
    }

    if (/(busca|buscar|buscame|busques|investiga|investigar|investigame|investigues|consulta|consultar|consultame|averigua|averiguar|averiguame|indaga|indagar|google|internet|web|online|fuentes|noticias|noticia|hoy|ayer|actual|actualidad|actualizado|reciente|ultimo|ultima|novedad|precio|cuanto cuesta|cotizacion|clima|temperatura|quien gano|quien es|que paso|que es|donde|cuando|cuanto|como funciona|documentacion|docs|version|lanzamiento|2024|2025|2026|2027)/.test(lower)) {
      return true;
    }

    if (raw.includes('?') || raw.includes('¿')) {
      return true;
    }

    if (!raw.includes('```') && raw.length > 14 && !/^(escribe|crea|genera|arregla|corrige|soluciona|refactoriza)\s+(un|una|el|la)\s+(codigo|script|funcion|clase)\b/.test(lower)) {
      return true;
    }

    return false;
  }

  function extractSearchQuery(promptText) {
    let cleaned = (promptText || '')
      .replace(/[¿?¡!"]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const stripPatterns = [
      /^(?:hola|oye|hey|disculpa|por favor|porfa)[\s,]+/i,
      /^(?:puedes|podr[ií]as|necesito que|quiero que|ay[uú]dame a|me puedes)\s+/i,
      /^(?:busca|buscar|b[uú]scame|busques|investiga|investigar|invest[ií]game|investigues|consulta|consultar|cons[uú]ltame|averigua|averiguar|aver[ií]guame|indaga|indagar|encuentra|encontrar|revisa|revisar|checa|dime|expl[ií]came|cu[eé]ntame)\s+/i,
      /^(?:informaci[oó]n|info|datos|detalles|algo|todo|m[aá]s)\s+/i,
      /^(?:en\s+(?:internet|la\s+web|web|google|l[ií]nea|tiempo\s+real)|por\s+internet|usando\s+(?:internet|la\s+web)|via\s+web)\s+/i,
      /^(?:sobre|acerca\s+de|respecto\s+a|respecto\s+de|acerca|de|del)\s+/i
    ];

    for (let pass = 0; pass < 4; pass++) {
      const prev = cleaned;
      stripPatterns.forEach(rx => {
        cleaned = cleaned.replace(rx, '').trim();
      });
      cleaned = cleaned
        .replace(/\s+(?:en\s+(?:internet|la\s+web|web|google|l[ií]nea|tiempo\s+real)|por\s+internet|por\s+favor|porfa)$/i, '')
        .trim();
      if (cleaned === prev) break;
    }

    return (cleaned || (promptText || '').trim()).slice(0, 180);
  }

  function extractCondensedKeywords(query) {
    const stopwords = new Set([
      'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'en',
      'con', 'sin', 'por', 'para', 'sobre', 'acerca', 'entre', 'hacia', 'desde',
      'que', 'qué', 'cual', 'cuál', 'quien', 'quién', 'como', 'cómo', 'donde',
      'dónde', 'cuando', 'cuándo', 'cuanto', 'cuánto', 'es', 'son', 'fue', 'era',
      'esta', 'está', 'este', 'estos', 'estas', 'hay', 'tiene', 'tienen', 'web',
      'internet', 'google', 'noticias', 'noticia', 'actual', 'actuales',
      'actualidad', 'actualizado', 'actualizada', 'reciente', 'recientes',
      'ultimo', 'ultima', 'último', 'última', 'informacion', 'información',
      'datos', 'detalles', 'hoy', 'ayer', 'novedades', 'novedad', 'paso', 'pasó',
      'pasa', 'ocurrio', 'ocurrió', 'sucedio', 'sucedió', 'hace', 'hizo',
      'hacer', 'quiero', 'saber', 'dime', 'puedes', 'the', 'and', 'for',
      'with', 'about', 'from', 'what', 'is', 'are', 'how', 'when', 'where',
      'latest', 'news', 'happened'
    ]);
    const tokens = (query || '')
      .toLowerCase()
      .split(/\s+/)
      .map(t => t.replace(/^[.,;:()]+|[.,;:()]+$/g, ''))
      .filter(t => t.length > 1 && !stopwords.has(t));
    return tokens.slice(0, 6).join(' ');
  }

  async function fetchWithTimeout(url, ms = 4500) {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), ms) : null;
    try {
      return await fetch(url, controller ? { signal: controller.signal } : undefined);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function appendUniqueWebResult(targetList, seenKeys, item) {
    if (!item || !item.title) return;
    const cleanTitle = String(item.title).trim();
    const cleanUrl = String(item.url || '').trim();
    const cleanSnippet = String(item.snippet || '').replace(/\s+/g, ' ').trim();
    if (!cleanTitle || (!cleanSnippet && !cleanUrl)) return;
    const key = (cleanUrl || cleanTitle).toLowerCase();
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    targetList.push({
      title: cleanTitle,
      url: cleanUrl,
      snippet: cleanSnippet
    });
  }

  async function runSingleWebQuery(q) {
    const results = [];
    const seen = new Set();
    const tasks = [];

    if (typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
      tasks.push(
        fetchWithTimeout('/api/web-search?q=' + encodeURIComponent(q), 3000)
          .then(r => (r.ok ? r.json() : null))
          .then(data => {
            if (data && Array.isArray(data.results)) {
              data.results.forEach(item => appendUniqueWebResult(results, seen, item));
            }
          })
          .catch(() => {})
      );
    }

    tasks.push(
      fetchWithTimeout('https://api.duckduckgo.com/?q=' + encodeURIComponent(q) + '&format=json&no_html=1&skip_disambig=1', 4500)
        .then(r => (r.ok ? r.json() : null))
        .then(ddg => {
          if (!ddg) return;
          if (ddg.AbstractText) {
            appendUniqueWebResult(results, seen, {
              title: ddg.Heading || q,
              url: ddg.AbstractURL || 'https://duckduckgo.com/?q=' + encodeURIComponent(q),
              snippet: ddg.AbstractText
            });
          } else if (ddg.Answer) {
            appendUniqueWebResult(results, seen, {
              title: ddg.Heading || q,
              url: ddg.AbstractURL || 'https://duckduckgo.com/?q=' + encodeURIComponent(q),
              snippet: ddg.Answer
            });
          }
          if (Array.isArray(ddg.RelatedTopics)) {
            let relatedCount = 0;
            for (const topic of ddg.RelatedTopics) {
              if (relatedCount >= 2) break;
              if (topic && topic.Text && topic.FirstURL) {
                appendUniqueWebResult(results, seen, {
                  title: topic.Text.split(' - ')[0].slice(0, 80) || q,
                  url: topic.FirstURL,
                  snippet: topic.Text
                });
                relatedCount++;
              } else if (topic && Array.isArray(topic.Topics)) {
                for (const sub of topic.Topics) {
                  if (relatedCount >= 2) break;
                  if (sub && sub.Text && sub.FirstURL) {
                    appendUniqueWebResult(results, seen, {
                      title: sub.Text.split(' - ')[0].slice(0, 80) || q,
                      url: sub.FirstURL,
                      snippet: sub.Text
                    });
                    relatedCount++;
                  }
                }
              }
            }
          }
        })
        .catch(() => {})
    );

    tasks.push(
      fetchWithTimeout('https://es.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(q) + '&gsrlimit=3&prop=extracts|info&exintro=1&explaintext=1&exchars=600&inprop=url&format=json&origin=*&utf8=1', 4500)
        .then(r => (r.ok ? r.json() : null))
        .then(wikiData => {
          const pagesObj = wikiData && wikiData.query && wikiData.query.pages;
          if (!pagesObj) return;
          Object.values(pagesObj)
            .sort((a, b) => (a.index || 0) - (b.index || 0))
            .forEach(page => {
              appendUniqueWebResult(results, seen, {
                title: page.title + ' (Wikipedia ES)',
                url: page.fullurl || 'https://es.wikipedia.org/wiki/' + encodeURIComponent((page.title || '').replace(/ /g, '_')),
                snippet: page.extract || ''
              });
            });
        })
        .catch(() => {})
    );

    tasks.push(
      fetchWithTimeout('https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(q) + '&gsrlimit=2&prop=extracts|info&exintro=1&explaintext=1&exchars=500&inprop=url&format=json&origin=*&utf8=1', 4500)
        .then(r => (r.ok ? r.json() : null))
        .then(wikiData => {
          const pagesObj = wikiData && wikiData.query && wikiData.query.pages;
          if (!pagesObj) return;
          Object.values(pagesObj)
            .sort((a, b) => (a.index || 0) - (b.index || 0))
            .forEach(page => {
              appendUniqueWebResult(results, seen, {
                title: page.title + ' (Wikipedia EN)',
                url: page.fullurl || 'https://en.wikipedia.org/wiki/' + encodeURIComponent((page.title || '').replace(/ /g, '_')),
                snippet: page.extract || ''
              });
            });
        })
        .catch(() => {})
    );

    await Promise.allSettled(tasks);
    return results.slice(0, 6);
  }

  async function performWebSearch(query) {
    const cleanQ = (query || '').trim();
    if (!cleanQ) return [];

    let results = await runSingleWebQuery(cleanQ);
    if (results.length === 0) {
      const condensed = extractCondensedKeywords(cleanQ);
      if (condensed && condensed.toLowerCase() !== cleanQ.toLowerCase()) {
        results = await runSingleWebQuery(condensed);
      }
    }
    return results;
  }

  function updateStripeStatusBadge() {
    if (!dom.stripeStatusNotice) return;
    const key = (state.settings.stripeTestSecretKey || '').trim();
    const link = (state.settings.stripeTestPaymentLink || '').trim();
    if (key.startsWith('sk_test_')) {
      dom.stripeStatusNotice.className = 'api-key-status-notice success';
      dom.stripeStatusNotice.textContent = 'Stripe Modo Prueba listo (sk_test_): Checkout real con retorno automático y activación verificada ($10 USD / Plan Go).';
      return;
    }
    if (key && !key.startsWith('sk_test_')) {
      dom.stripeStatusNotice.className = 'api-key-status-notice warning';
      dom.stripeStatusNotice.textContent = 'Usa únicamente una clave de prueba que inicie con sk_test_.';
      return;
    }
    if (link.startsWith('https://buy.stripe.com/')) {
      dom.stripeStatusNotice.className = 'api-key-status-notice warning';
      dom.stripeStatusNotice.textContent = 'Payment Link detectado sin sk_test_...: ingresa también tu sk_test_... arriba (o usa server.js) para garantizar el retorno automático y activar Plan Go.';
    } else {
      dom.stripeStatusNotice.className = 'api-key-status-notice info';
      dom.stripeStatusNotice.textContent = 'Opcional: ingresa tu sk_test_... para abrir Stripe Web con retorno automático y activación verificada. Sin clave se usa el simulador integrado.';
    }

    if (window.location.protocol.startsWith('http')) {
      fetch('/api/stripe/status')
        .then(r => (r.ok ? r.json() : null))
        .then(data => {
          if (data && data.serverActive && data.envConfigured && dom.stripeStatusNotice && !(state.settings.stripeTestSecretKey || '').trim()) {
            dom.stripeStatusNotice.className = 'api-key-status-notice success';
            dom.stripeStatusNotice.textContent = 'Stripe Modo Prueba activo mediante server.js (.env): Checkout real con retorno automático ($10 USD / Plan Go).';
          }
        })
        .catch(() => {});
    }
  }

  function getModelPlanRequirements(modelName) {
    const lower = (modelName || '').toLowerCase().trim();
    if (lower === 'claude sonnet 4.6' || lower === 'claude haiku 5.5' || lower === 'gpt 6 astra') {
      return { allowedInFree: true, creditCost: 0, isBasicImage: false, priceNote: '' };
    }
    if (lower === 'flux' || lower === 'flux.2') {
      return { allowedInFree: true, creditCost: 0, isBasicImage: true, priceNote: '' };
    }
    if (lower === 'claude fable 5.2') {
      return { allowedInFree: false, creditCost: 60, isBasicImage: false, priceNote: '$8/$40 M' };
    }
    if (lower.includes('fable')) {
      return { allowedInFree: false, creditCost: 35, isBasicImage: false, priceNote: '' };
    }
    if (lower.includes('opus')) {
      return { allowedInFree: false, creditCost: 25, isBasicImage: false, priceNote: '' };
    }
    if (lower.includes('sonnet')) {
      return { allowedInFree: false, creditCost: 0, isBasicImage: false, priceNote: '' };
    }
    if (lower.includes('gpt image')) {
      return { allowedInFree: false, creditCost: 30, isBasicImage: false, priceNote: '' };
    }
    return { allowedInFree: false, creditCost: 0, isBasicImage: false, priceNote: '' };
  }

  function getBasicImageLimit() {
    return state.settings.plan === 'go' ? PLAN_CONFIG.go.basicImageLimit : PLAN_CONFIG.free.basicImageLimit;
  }

  function isModelAllowedForCurrentPlan(modelName) {
    if (state.settings.plan === 'go') return true;
    return getModelPlanRequirements(modelName).allowedInFree;
  }

  function ensureValidModelForPlan() {
    const current = state.settings.selectedModel || 'Claude Sonnet 4.6';
    if (!isModelAllowedForCurrentPlan(current)) {
      state.settings.selectedModel = 'Claude Sonnet 4.6';
      saveSettings();
    }
  }

  function checkAndConsumeQuota(modelName) {
    if (!isModelAllowedForCurrentPlan(modelName)) {
      showToast('Este modelo requiere Plan Go ($10 USD)');
      openPlanModal();
      return false;
    }

    const req = getModelPlanRequirements(modelName);
    if (req.isBasicImage) {
      const limit = getBasicImageLimit();
      const used = state.settings.basicImageUsed || 0;
      if (used >= limit) {
        if (state.settings.plan !== 'go') {
          showToast('Límite de 5 imágenes alcanzado en Plan Gratuito. Mejora a Go ($10 USD).');
        } else {
          showToast('Alcanzaste el límite de imágenes básicas de prueba.');
        }
        openPlanModal();
        return false;
      }
      state.settings.basicImageUsed = used + 1;
      saveSettings();
      updateSubscriptionUI();
      return true;
    }

    if (req.creditCost > 0) {
      const credits = state.settings.credits || 0;
      if (credits < req.creditCost) {
        showToast(`Créditos insuficientes para ${modelName} (requiere ${req.creditCost} créditos).`);
        openPlanModal();
        return false;
      }
      state.settings.credits = credits - req.creditCost;
      saveSettings();
      updateSubscriptionUI();
      return true;
    }

    return true;
  }

  function updateSubscriptionUI() {
    const isGo = state.settings.plan === 'go';
    const credits = state.settings.credits || 0;
    const imgLimit = getBasicImageLimit();
    const imgUsed = state.settings.basicImageUsed || 0;
    const imgRemaining = Math.max(0, imgLimit - imgUsed);

    if (dom.sidebarUserPlanLabel) {
      dom.sidebarUserPlanLabel.textContent = isGo
        ? `Plan Go · ${credits} créd`
        : `Plan Gratuito · ${imgRemaining}/${imgLimit} img`;
    }
    if (dom.sidebarCreditsPill) {
      dom.sidebarCreditsPill.textContent = isGo ? `${credits} créd` : 'Go $10';
    }
    if (dom.sidebarPlanBtnText) {
      dom.sidebarPlanBtnText.textContent = isGo ? 'Plan Go Activo' : 'Plan Go · Créditos';
    }

    if (dom.planModalCurrentName) {
      dom.planModalCurrentName.textContent = isGo ? 'Plan Go ($10 USD)' : 'Plan Gratuito ($0)';
    }
    if (dom.planModalCreditsValue) {
      dom.planModalCreditsValue.textContent = isGo ? `${credits}` : '0 (Requiere Go)';
    }
    if (dom.planModalImagesValue) {
      dom.planModalImagesValue.textContent = isGo
        ? `${imgRemaining} / ${imgLimit} (Casi ilim.)`
        : `${imgRemaining} / ${imgLimit}`;
    }

    if (dom.freePlanBadge) {
      dom.freePlanBadge.classList.toggle('hidden', isGo);
    }
    if (dom.goPlanBadge) {
      dom.goPlanBadge.classList.toggle('hidden', !isGo);
    }
    if (dom.switchToFreeBtn) {
      dom.switchToFreeBtn.disabled = !isGo;
      dom.switchToFreeBtn.textContent = isGo ? 'Volver a Plan Gratuito' : 'Plan Actual';
    }
    if (dom.activateGoPlanBtn) {
      dom.activateGoPlanBtn.disabled = isGo;
      dom.activateGoPlanBtn.textContent = isGo ? 'Plan Go Activo ($10 USD)' : 'Pagar $10 USD con Stripe (Modo Prueba)';
    }

    if (dom.modelBannerPlanName) {
      dom.modelBannerPlanName.textContent = isGo ? 'Plan Go ($10)' : 'Plan Gratuito';
      dom.modelBannerPlanName.classList.toggle('is-go', isGo);
    }
    if (dom.modelBannerStats) {
      dom.modelBannerStats.textContent = isGo
        ? `${credits} créd · ${imgRemaining}/${imgLimit} img`
        : `Sonnet 4.6 / Haiku 5.5 · ${imgRemaining}/${imgLimit} img`;
    }
    if (dom.modelBannerManageBtn) {
      dom.modelBannerManageBtn.textContent = isGo ? 'Créditos' : 'Plan Go ($10)';
    }

    document.querySelectorAll('.model-card-item').forEach(card => {
      if (card.classList.contains('disabled')) return;
      const modelName = card.getAttribute('data-model');
      if (!modelName) return;

      const titleGroup = card.querySelector('.model-card-title-group');
      if (titleGroup) {
        titleGroup.querySelectorAll('.model-lock-pill, .model-cost-pill').forEach(el => el.remove());
      }

      const allowed = isModelAllowedForCurrentPlan(modelName);
      card.classList.toggle('locked', !allowed);

      if (titleGroup) {
        const req = getModelPlanRequirements(modelName);
        if (!allowed) {
          const lockPill = document.createElement('span');
          lockPill.className = 'model-lock-pill';
          lockPill.textContent = 'Go · $10';
          titleGroup.appendChild(lockPill);
        } else if (req.creditCost > 0) {
          const costPill = document.createElement('span');
          costPill.className = 'model-cost-pill';
          costPill.textContent = req.priceNote ? `${req.creditCost} créd · ${req.priceNote}` : `${req.creditCost} créd`;
          titleGroup.appendChild(costPill);
        } else if (req.isBasicImage) {
          const imgPill = document.createElement('span');
          imgPill.className = 'model-cost-pill';
          imgPill.textContent = isGo ? `${imgRemaining}/${imgLimit} casi ilim.` : `${imgRemaining}/${imgLimit} disp.`;
          titleGroup.appendChild(imgPill);
        }
      }
    });
  }

  function getStripeReturnUrls() {
    if (window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
      const base = window.location.href.split('#')[0].split('?')[0];
      const sep = base.includes('?') ? '&' : '?';
      return {
        isHttp: true,
        returnBaseUrl: base,
        successUrl: base + sep + 'stripe_success=1&session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: base + sep + 'stripe_canceled=1'
      };
    }
    return {
      isHttp: false,
      returnBaseUrl: '',
      successUrl: 'https://stripe.com',
      cancelUrl: 'https://stripe.com'
    };
  }

  function savePendingStripeSession(sessionObj) {
    try {
      if (!sessionObj || !sessionObj.id) return;
      localStorage.setItem(STORAGE_KEY_PENDING_STRIPE, JSON.stringify({
        id: sessionObj.id,
        url: sessionObj.url || '',
        isPopup: !!sessionObj.isPopup,
        createdAt: sessionObj.createdAt || Date.now()
      }));
    } catch (err) {}
  }

  function getPendingStripeSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PENDING_STRIPE);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.id) return null;
      if (Date.now() - (parsed.createdAt || 0) > 30 * 60 * 1000) {
        localStorage.removeItem(STORAGE_KEY_PENDING_STRIPE);
        return null;
      }
      return parsed;
    } catch (err) {
      return null;
    }
  }

  function clearPendingStripeSession() {
    try {
      localStorage.removeItem(STORAGE_KEY_PENDING_STRIPE);
    } catch (err) {}
  }

  function stopStripeSessionPolling() {
    if (stripePollTimer) {
      clearInterval(stripePollTimer);
      stripePollTimer = null;
    }
  }

  async function stripeDirectApiRequest(method, apiPath, secretKey, formParams = null) {
    const options = {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + secretKey
      }
    };
    if (formParams) {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.body = new URLSearchParams(formParams).toString();
    }
    const resp = await fetch('https://api.stripe.com' + apiPath, options);
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error((data && data.error && data.error.message) || ('Stripe HTTP ' + resp.status));
    }
    return data;
  }

  async function syncPaymentLinkRedirectDirect(secretKey, paymentLinkUrl, successUrl) {
    try {
      const cleanUrl = (paymentLinkUrl || '').trim().replace(/\/$/, '');
      if (!cleanUrl || !cleanUrl.startsWith('https://buy.stripe.com/') || !/^https?:\/\//i.test(successUrl)) {
        return;
      }
      const list = await stripeDirectApiRequest('GET', '/v1/payment_links?active=true&limit=25', secretKey);
      const links = Array.isArray(list.data) ? list.data : [];
      const matched = links.find(item => item && item.url && item.url.replace(/\/$/, '') === cleanUrl);
      if (matched && matched.id) {
        await stripeDirectApiRequest('POST', '/v1/payment_links/' + encodeURIComponent(matched.id), secretKey, {
          'after_completion[type]': 'redirect',
          'after_completion[redirect][url]': successUrl
        });
      }
    } catch (err) {}
  }

  async function createStripeCheckoutSessionDirect(secretKey, successUrl, cancelUrl) {
    return stripeDirectApiRequest('POST', '/v1/checkout/sessions', secretKey, {
      'mode': 'subscription',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': 'MegaCLD Plan Go',
      'line_items[0][price_data][product_data][description]': 'Claude Sonnet completo, 1,000 créditos para Opus y Fable 5.2, e imágenes básicas casi ilimitadas.',
      'line_items[0][price_data][unit_amount]': '1000',
      'line_items[0][price_data][recurring][interval]': 'month',
      'line_items[0][quantity]': '1',
      'success_url': successUrl,
      'cancel_url': cancelUrl
    });
  }

  async function verifyStripeSessionWithFallback(sessionId, secretKey) {
    const cleanId = (sessionId || '').trim();
    if (!cleanId) return { paid: false, status: 'missing', payment_status: 'unpaid' };

    if (window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
      try {
        const verifyUrl = `/api/stripe/verify-session?session_id=${encodeURIComponent(cleanId)}&secret_key=${encodeURIComponent(secretKey || '')}`;
        const resp = await fetch(verifyUrl);
        const contentType = resp.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await resp.json();
          if (resp.ok && data && typeof data.paid === 'boolean') {
            return {
              id: data.id || cleanId,
              paid: data.paid,
              status: data.status || '',
              payment_status: data.payment_status || ''
            };
          }
        }
      } catch (err) {}
    }

    if (secretKey && secretKey.startsWith('sk_test_')) {
      const session = await stripeDirectApiRequest('GET', '/v1/checkout/sessions/' + encodeURIComponent(cleanId), secretKey);
      return {
        id: session.id || cleanId,
        paid: session.payment_status === 'paid' || session.status === 'complete',
        status: session.status || '',
        payment_status: session.payment_status || ''
      };
    }

    throw new Error('No se pudo conectar con server.js ni hay clave sk_test_ configurada para verificar el pago.');
  }

  async function verifyRecentStripeSessionWithFallback(secretKey) {
    const ignoreId = (state.settings.lastVerifiedStripeSessionId || '').trim();
    if (window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
      try {
        const recentUrl = `/api/stripe/verify-recent?secret_key=${encodeURIComponent(secretKey || '')}&ignore_id=${encodeURIComponent(ignoreId)}`;
        const resp = await fetch(recentUrl);
        const contentType = resp.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await resp.json();
          if (resp.ok && data && typeof data.paid === 'boolean') {
            return data;
          }
        }
      } catch (err) {}
    }

    if (secretKey && secretKey.startsWith('sk_test_')) {
      const list = await stripeDirectApiRequest('GET', '/v1/checkout/sessions?limit=6', secretKey);
      const sessions = Array.isArray(list.data) ? list.data : [];
      const cutoffSec = Math.floor(Date.now() / 1000) - 1200;
      const matched = sessions.find(s =>
        s &&
        s.id &&
        s.id !== ignoreId &&
        (s.created || 0) >= cutoffSec &&
        (s.payment_status === 'paid' || s.status === 'complete')
      );
      return {
        paid: !!matched,
        id: matched ? matched.id : '',
        status: matched ? matched.status : '',
        payment_status: matched ? matched.payment_status : ''
      };
    }

    return { paid: false, id: '' };
  }

  function showPendingStripeBox(sessionUrl, messageText) {
    if (dom.stripeTestCheckoutBox) dom.stripeTestCheckoutBox.classList.add('hidden');
    if (dom.stripePendingSessionBox) {
      dom.stripePendingSessionBox.classList.remove('hidden');
      if (dom.stripePendingSessionText && messageText) {
        dom.stripePendingSessionText.textContent = messageText;
      }
      if (dom.openPendingStripeUrlBtn) {
        if (sessionUrl) {
          dom.openPendingStripeUrlBtn.href = sessionUrl;
          dom.openPendingStripeUrlBtn.classList.remove('hidden');
        } else {
          dom.openPendingStripeUrlBtn.classList.add('hidden');
        }
      }
      dom.stripePendingSessionBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function startStripeSessionPolling(sessionId, sessionUrl) {
    stopStripeSessionPolling();
    let attempts = 0;
    const secretKey = (state.settings.stripeTestSecretKey || '').trim();
    stripePollTimer = setInterval(async () => {
      attempts++;
      if (attempts > 240) {
        stopStripeSessionPolling();
        return;
      }
      try {
        const res = await verifyStripeSessionWithFallback(sessionId, secretKey);
        if (res && res.paid) {
          stopStripeSessionPolling();
          activateGoPlan(res.id || sessionId);
        }
      } catch (err) {}
    }, 2500);
    showPendingStripeBox(
      sessionUrl,
      'Se abrió Stripe Checkout en una nueva pestaña. Completa el pago ($10 USD) ahí y MegaCLD activará Plan Go automáticamente en cuanto Stripe lo confirme.'
    );
  }

  async function verifyPendingStripeNow(openModalOnSuccess = true, silentIfPending = false) {
    const pending = getPendingStripeSession();
    if (!pending || !pending.id) {
      if (!silentIfPending) {
        showToast('No hay una sesión pendiente de Stripe por verificar.');
      }
      return false;
    }
    const secretKey = (state.settings.stripeTestSecretKey || '').trim();
    try {
      const res = await verifyStripeSessionWithFallback(pending.id, secretKey);
      if (res && res.paid) {
        activateGoPlan(res.id || pending.id);
        if (openModalOnSuccess && dom.planModal && !dom.planModal.classList.contains('active')) {
          openPlanModal();
        }
        return true;
      }
      if (!silentIfPending) {
        showToast('Stripe aún muestra el pago como pendiente. Complétalo en la pestaña de Stripe.');
      }
      return false;
    } catch (err) {
      if (!silentIfPending) {
        showToast('Error al verificar pago en Stripe: ' + (err.message || err));
      }
      return false;
    }
  }

  function openPlanModal() {
    updateSubscriptionUI();
    if (dom.stripeTestCheckoutBox) dom.stripeTestCheckoutBox.classList.add('hidden');
    const pending = getPendingStripeSession();
    if (dom.stripePendingSessionBox) {
      if (pending && pending.id && state.settings.plan !== 'go') {
        showPendingStripeBox(
          pending.url || '',
          'Hay una sesión de Stripe pendiente de confirmación. Si ya completaste el pago, haz clic en "Ya pagué · Verificar ahora".'
        );
      } else {
        dom.stripePendingSessionBox.classList.add('hidden');
      }
    }
    if (dom.planModal) dom.planModal.classList.add('active');
    if (window.innerWidth <= 768) closeSidebarOnMobile();
  }

  function closePlanModal() {
    stopStripeSessionPolling();
    if (dom.stripeTestCheckoutBox) dom.stripeTestCheckoutBox.classList.add('hidden');
    if (dom.stripePendingSessionBox) dom.stripePendingSessionBox.classList.add('hidden');
    if (dom.planModal) dom.planModal.classList.remove('active');
  }

  function activateGoPlan(verifiedSessionId = '') {
    const safeSessionId = typeof verifiedSessionId === 'string' ? verifiedSessionId.trim() : '';
    if (safeSessionId && state.settings.lastVerifiedStripeSessionId === safeSessionId && state.settings.plan === 'go') {
      clearPendingStripeSession();
      stopStripeSessionPolling();
      updateSubscriptionUI();
      updateModelSelectionUI(state.settings.selectedModel);
      return;
    }
    state.settings.plan = 'go';
    if (safeSessionId) {
      state.settings.lastVerifiedStripeSessionId = safeSessionId;
    }
    if ((state.settings.credits || 0) < PLAN_CONFIG.go.initialCredits) {
      state.settings.credits = PLAN_CONFIG.go.initialCredits;
    } else if (safeSessionId) {
      state.settings.credits = Math.max(state.settings.credits || 0, PLAN_CONFIG.go.initialCredits);
    }
    clearPendingStripeSession();
    stopStripeSessionPolling();
    if (dom.stripeTestCheckoutBox) dom.stripeTestCheckoutBox.classList.add('hidden');
    if (dom.stripePendingSessionBox) dom.stripePendingSessionBox.classList.add('hidden');
    saveSettings();
    updateSubscriptionUI();
    updateModelSelectionUI(state.settings.selectedModel);
    showToast('¡Pago confirmado en Stripe Test Mode! Plan Go ($10 USD) activado con ' + state.settings.credits + ' créditos.');
  }

  async function startStripeGoCheckout() {
    const secretKey = (state.settings.stripeTestSecretKey || '').trim();
    const paymentLink = (state.settings.stripeTestPaymentLink || '').trim();
    const urls = getStripeReturnUrls();

    if (dom.activateGoPlanBtn) {
      dom.activateGoPlanBtn.disabled = true;
      dom.activateGoPlanBtn.textContent = 'Conectando con Stripe Test...';
    }

    const restoreBtn = () => {
      if (dom.activateGoPlanBtn) {
        dom.activateGoPlanBtn.disabled = state.settings.plan === 'go';
        dom.activateGoPlanBtn.textContent = state.settings.plan === 'go'
          ? 'Plan Go Activo ($10 USD)'
          : 'Pagar $10 USD con Stripe (Modo Prueba)';
      }
    };

    try {
      if (urls.isHttp) {
        try {
          const resp = await fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              origin: window.location.origin,
              returnUrl: urls.returnBaseUrl,
              secretKey: secretKey,
              paymentLink: paymentLink
            })
          });
          const contentType = resp.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await resp.json();
            if (resp.ok && data && data.url && data.id) {
              savePendingStripeSession({ id: data.id, url: data.url, isPopup: false });
              window.location.href = data.url;
              return;
            }
          }
        } catch (serverErr) {}
      }

      if (secretKey && secretKey.startsWith('sk_test_')) {
        if (urls.isHttp && paymentLink) {
          await syncPaymentLinkRedirectDirect(secretKey, paymentLink, urls.successUrl);
        }
        const session = await createStripeCheckoutSessionDirect(secretKey, urls.successUrl, urls.cancelUrl);
        if (session && session.url && session.id) {
          savePendingStripeSession({ id: session.id, url: session.url, isPopup: !urls.isHttp });
          if (urls.isHttp) {
            window.location.href = session.url;
            return;
          }
          window.open(session.url, '_blank', 'noopener');
          startStripeSessionPolling(session.id, session.url);
          restoreBtn();
          return;
        }
      }
    } catch (stripeErr) {
      showToast('Error al iniciar Stripe Checkout: ' + (stripeErr.message || stripeErr));
      restoreBtn();
      return;
    }

    restoreBtn();

    if (paymentLink && paymentLink.startsWith('https://buy.stripe.com/')) {
      showToast('Falta sk_test_... (o server.js activo) para retornar automáticamente desde Stripe.');
      if (dom.stripeTestCheckoutDesc) {
        dom.stripeTestCheckoutDesc.textContent = 'Detectamos un Payment Link sin clave sk_test_... ni server.js activo. Si vas directo a buy.stripe.com sin configurar redirección, Stripe mostrará "Gracias por el pago" sin devolverte a MegaCLD. Agrega tu sk_test_... en Configuración para abrir Checkout real con retorno automático, o usa el simulador aquí.';
      }
    } else if (dom.stripeTestCheckoutDesc) {
      dom.stripeTestCheckoutDesc.textContent = 'Pasarela de prueba Stripe Checkout. Configura tu sk_test_... en Configuración para abrir Stripe Web con retorno automático y activación real, o simula el pago aquí.';
    }

    if (dom.stripeTestCheckoutBox) {
      dom.stripeTestCheckoutBox.classList.remove('hidden');
      dom.stripeTestCheckoutBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      activateGoPlan();
    }
  }

  async function handleStripeReturnParams() {
    const cleanQueryUrl = () => {
      if (window.history && window.history.replaceState && window.location.protocol.startsWith('http')) {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      }
    };

    try {
      const params = new URLSearchParams(window.location.search);
      const isSuccess = params.get('stripe_success') === '1';
      const isCanceled = params.get('stripe_canceled') === '1';
      const urlSessionId = (params.get('session_id') || '').trim();
      const secretKey = (state.settings.stripeTestSecretKey || '').trim();

      if (isCanceled) {
        clearPendingStripeSession();
        cleanQueryUrl();
        showToast('Pago cancelado en Stripe Modo Prueba');
        return;
      }

      if (isSuccess) {
        const pending = getPendingStripeSession();
        const effectiveSessionId = (urlSessionId && !urlSessionId.includes('CHECKOUT_SESSION_ID'))
          ? urlSessionId
          : (pending && pending.id ? pending.id : '');

        cleanQueryUrl();
        showToast('Verificando pago en Stripe...');

        if (effectiveSessionId) {
          let result = null;
          for (let attempt = 0; attempt < 3; attempt++) {
            result = await verifyStripeSessionWithFallback(effectiveSessionId, secretKey);
            if (result && result.paid) break;
            if (result && result.status === 'open' && attempt < 2) {
              await new Promise(r => setTimeout(r, 1200));
            } else {
              break;
            }
          }
          if (result && result.paid) {
            activateGoPlan(result.id || effectiveSessionId);
            openPlanModal();
          } else {
            showToast('No se pudo confirmar el pago de la sesión en Stripe.');
          }
          return;
        }

        const recentRes = await verifyRecentStripeSessionWithFallback(secretKey);
        if (recentRes && recentRes.paid && recentRes.id) {
          activateGoPlan(recentRes.id);
          openPlanModal();
        } else {
          showToast('Stripe regresó sin session_id verificable. Configura ?stripe_success=1&session_id={CHECKOUT_SESSION_ID} o usa sk_test_...');
        }
        return;
      }

      const pending = getPendingStripeSession();
      if (pending && pending.id && state.settings.plan !== 'go') {
        const res = await verifyStripeSessionWithFallback(pending.id, secretKey);
        if (res && res.paid) {
          activateGoPlan(res.id || pending.id);
          openPlanModal();
        }
      }
    } catch (err) {
      showToast('Error verificando retorno de Stripe: ' + (err.message || err));
    }
  }

  function switchToFreePlan() {
    state.settings.plan = 'free';
    ensureValidModelForPlan();
    updateModelSelectionUI(state.settings.selectedModel);
    saveSettings();
    updateSubscriptionUI();
    showToast('Cambiado a Plan Gratuito');
  }

  function setModelTypeTab(type) {
    const safeType = ['text', 'image', 'video'].includes(type) ? type : 'text';
    state.settings.selectedModelType = safeType;

    const tabs = [
      { id: 'tabTypeText', pane: 'paneTypeText', type: 'text' },
      { id: 'tabTypeImage', pane: 'paneTypeImage', type: 'image' },
      { id: 'tabTypeVideo', pane: 'paneTypeVideo', type: 'video' }
    ];

    tabs.forEach(item => {
      const tabEl = document.getElementById(item.id);
      const paneEl = document.getElementById(item.pane);
      const isActive = item.type === safeType;
      if (tabEl) {
        if (isActive) tabEl.classList.add('active');
        else tabEl.classList.remove('active');
      }
      if (paneEl) {
        if (isActive) {
          paneEl.classList.add('active');
          paneEl.style.display = 'flex';
        } else {
          paneEl.classList.remove('active');
          paneEl.style.display = 'none';
        }
      }
    });
    saveSettings();
  }

  function getShortModelName(modelName) {
    return (modelName || 'Claude 5.5 Sonnet').replace('Claude ', '');
  }

  function setEffortLevel(level) {
    const safeLevel = EFFORT_STEPS.includes(level) ? level : 'bajo';
    state.settings.effortLevel = safeLevel;
    const index = EFFORT_STEPS.indexOf(safeLevel);
    const percent = (index / (EFFORT_STEPS.length - 1)) * 100;

    if (dom.effortCurrentDisplay) {
      dom.effortCurrentDisplay.textContent = EFFORT_LABELS[safeLevel] || 'Bajo';
    }
    if (dom.effortSliderFill) {
      dom.effortSliderFill.style.width = percent + '%';
    }
    if (dom.effortSliderThumb) {
      dom.effortSliderThumb.style.left = percent + '%';
    }

    document.querySelectorAll('.effort-tick').forEach(tick => {
      const tickIndex = parseInt(tick.getAttribute('data-index') || '0', 10);
      if (tickIndex <= index) {
        tick.classList.add('active');
      } else {
        tick.classList.remove('active');
      }
    });

    document.querySelectorAll('.effort-step-btn').forEach(btn => {
      if (btn.getAttribute('data-effort') === safeLevel) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    saveSettings();
  }

  function updateModelSelectionUI(modelName) {
    state.settings.selectedModel = modelName;
    const lower = (modelName || '').toLowerCase();
    if (lower.includes('gpt image') || lower.includes('flux')) {
      state.settings.selectedModelType = 'image';
    } else if (lower.includes('video')) {
      state.settings.selectedModelType = 'video';
    } else {
      state.settings.selectedModelType = 'text';
    }
    dom.composerModelName.textContent = getShortModelName(modelName);
    document.querySelectorAll('.model-card-item').forEach(card => {
      const cardModel = (card.getAttribute('data-model') || '').toLowerCase();
      if (cardModel === lower) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    updateApiKeyStatusBadge();
    updateNvidiaStatusBadge();
    updatePoeStatusBadge();
    saveSettings();
  }

  function openModelSheet() {
    const modal = dom.modelSelectModal || document.getElementById('modelSelectModal');
    if (!modal) return;
    ensureValidModelForPlan();
    const currentModel = state.settings.selectedModel || 'Claude Sonnet 4.6';
    updateModelSelectionUI(currentModel);
    updateSubscriptionUI();
    setEffortLevel(state.settings.effortLevel || 'bajo');
    const lower = currentModel.toLowerCase();
    const targetType = (lower.includes('gpt image') || lower.includes('flux')) ? 'image' : (state.settings.selectedModelType || 'text');
    setModelTypeTab(targetType);
    modal.classList.add('active');
  }

  function closeModelSheet() {
    const modal = dom.modelSelectModal || document.getElementById('modelSelectModal');
    if (!modal) return;
    modal.classList.remove('active');
  }

  function getActiveChat() {
    return state.chats.find(c => c.id === state.activeChatId) || null;
  }

  function createNewChat() {
    if (state.isStreaming) stopStreaming();

    const newChat = {
      id: generateId(),
      title: 'Nueva conversación',
      createdAt: new Date().toISOString(),
      messages: []
    };

    state.chats.unshift(newChat);
    state.activeChatId = newChat.id;
    saveChats();
    renderChatsList();
    renderChatView();

    if (!state.settings.userName || !state.settings.userName.trim()) {
      openNameModal();
    }
    closeSidebarOnMobile();
    dom.messageInput.focus();
  }

  function deleteChat(chatId, event) {
    if (event) event.stopPropagation();

    state.chats = state.chats.filter(c => c.id !== chatId);
    if (state.activeChatId === chatId) {
      state.activeChatId = state.chats.length > 0 ? state.chats[0].id : null;
    }
    saveChats();
    renderChatsList();
    renderChatView();
    showToast('Conversación eliminada');
  }

  function selectChat(chatId) {
    if (state.isStreaming) stopStreaming();
    state.activeChatId = chatId;
    renderChatsList();
    renderChatView();
    closeSidebarOnMobile();
  }

  function renderChatsList() {
    if (!dom.chatsList) return;
    const filterTerm = (dom.searchInput && dom.searchInput.value ? dom.searchInput.value : '').trim().toLowerCase();
    dom.chatsList.innerHTML = '';

    if (!Array.isArray(state.chats)) {
      state.chats = [];
    }

    const filtered = state.chats.filter(chat => {
      if (!chat) return false;
      if (!filterTerm) return true;
      const title = (chat.title || '').toLowerCase();
      const hasMatchingContent = Array.isArray(chat.messages) && chat.messages.some(m => m && typeof m.content === 'string' && m.content.toLowerCase().includes(filterTerm));
      return title.includes(filterTerm) || hasMatchingContent;
    });

    if (filtered.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'empty-chats-hint';
      emptyDiv.textContent = filterTerm ? 'No se encontraron conversaciones coincidentes.' : 'No tienes conversaciones activas aún.';
      dom.chatsList.appendChild(emptyDiv);
      return;
    }

    filtered.forEach(chat => {
      const item = document.createElement('div');
      item.className = 'chat-item' + (chat.id === state.activeChatId ? ' active' : '');
      item.onclick = () => selectChat(chat.id);

      const titleSpan = document.createElement('span');
      titleSpan.className = 'chat-item-title';
      titleSpan.textContent = chat.title || 'Conversación';

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'chat-item-actions';

      const delBtn = document.createElement('button');
      delBtn.className = 'chat-action-btn';
      delBtn.title = 'Eliminar chat';
      delBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      `;
      delBtn.onclick = (e) => deleteChat(chat.id, e);

      actionsDiv.appendChild(delBtn);
      item.appendChild(titleSpan);
      item.appendChild(actionsDiv);
      dom.chatsList.appendChild(item);
    });
  }

  function renderChatView() {
    const activeChat = getActiveChat();
    if (dom.messagesContainer) dom.messagesContainer.innerHTML = '';

    if (!activeChat || !Array.isArray(activeChat.messages) || activeChat.messages.length === 0) {
      if (dom.welcomeScreen) dom.welcomeScreen.style.display = 'flex';
      if (dom.messagesContainer) dom.messagesContainer.style.display = 'none';
      if (dom.topbarTitle) dom.topbarTitle.textContent = '';
      updateEmptyStateGreeting();
      return;
    }

    if (dom.welcomeScreen) dom.welcomeScreen.style.display = 'none';
    if (dom.messagesContainer) dom.messagesContainer.style.display = 'flex';
    if (dom.topbarTitle) dom.topbarTitle.textContent = activeChat.title || 'Conversación';

    activeChat.messages.forEach(msg => {
      if (msg) appendMessageToDOM(msg, false);
    });

    scrollToBottom();
  }

  function appendMessageToDOM(msg, animate = true) {
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${msg.role}`;
    if (!animate) wrapper.style.animation = 'none';

    if (msg.role === 'user') {
      const bubble = document.createElement('div');
      bubble.className = 'user-bubble';
      bubble.textContent = msg.content;

      if (msg.attachment) {
        const attBadge = document.createElement('div');
        attBadge.className = 'user-attachment-badge';
        attBadge.innerHTML = `
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          </svg>
          <span>${escapeHtml(msg.attachment.name)}</span>
        `;
        bubble.appendChild(attBadge);
      }

      wrapper.appendChild(bubble);
    } else {
      const body = document.createElement('div');
      body.className = 'assistant-body';

      const header = document.createElement('div');
      header.className = 'assistant-header';
      header.innerHTML = `
        <span class="assistant-avatar-text">_&lt;</span>
        <span class="assistant-name">MegaCLD</span>
        <span class="assistant-model-tag">${escapeHtml(msg.model || state.settings.selectedModel || 'Claude Sonnet 5.5')}</span>
      `;
      body.appendChild(header);

      if (msg.thought) {
        const thinkingContainer = document.createElement('div');
        thinkingContainer.className = 'claude-thinking-container';
        thinkingContainer.innerHTML = `
          <div class="claude-thinking-header">
            ${CLAUDE_SPARK_SVG}
            <span class="claude-thinking-status">${escapeHtml(msg.thoughtStatus || 'Pensó durante 3 segundos')}</span>
            <svg class="claude-thinking-chevron" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <div class="claude-thinking-body">${escapeHtml(filterThinkingContent(msg.thought, msg.model))}</div>
        `;
        thinkingContainer.querySelector('.claude-thinking-header').onclick = function () {
          thinkingContainer.classList.toggle('expanded');
        };
        body.appendChild(thinkingContainer);
      }

      const contentDiv = document.createElement('div');
      contentDiv.className = 'assistant-content';
      contentDiv.innerHTML = renderMarkdown(msg.content);
      body.appendChild(contentDiv);

      const actions = document.createElement('div');
      actions.className = 'message-actions';
      actions.innerHTML = `
        <button type="button" class="msg-action-btn copy-msg-btn">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copiar</span>
        </button>
      `;

      actions.querySelector('.copy-msg-btn').onclick = () => {
        copyToClipboard(msg.content);
      };

      body.appendChild(actions);
      wrapper.appendChild(body);
    }

    dom.messagesContainer.appendChild(wrapper);
  }

  function scrollToBottom() {
    dom.chatViewport.scrollTop = dom.chatViewport.scrollHeight;
  }

  function determineCategory(text) {
    const lower = text.toLowerCase();
    const cleanQuery = lower
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,;:_()\-]/g, ' ')
      .trim();

    if (
      cleanQuery.includes('modelo eres') ||
      cleanQuery.includes('que modelo') ||
      cleanQuery.includes('cual modelo') ||
      cleanQuery.includes('tu modelo') ||
      cleanQuery.includes('quien eres') ||
      cleanQuery.includes('quien te creo') ||
      cleanQuery.includes('quien te desarrollo') ||
      cleanQuery.includes('quien te fabrico') ||
      cleanQuery.includes('quien te invento') ||
      cleanQuery.includes('como te llamas') ||
      cleanQuery.includes('cual es tu nombre') ||
      cleanQuery.includes('tu nombre') ||
      cleanQuery.includes('que ia eres') ||
      cleanQuery.includes('de que empresa') ||
      cleanQuery.includes('de que compania') ||
      cleanQuery.includes('tu identidad') ||
      cleanQuery.includes('identificate') ||
      cleanQuery.includes('eres claude') ||
      cleanQuery.includes('eres chatgpt') ||
      cleanQuery.includes('eres gpt')
    ) {
      return 'identity';
    }

    if (lower.includes('function') || lower.includes('codigo') || lower.includes('código') ||
        lower.includes('javascript') || lower.includes('python') || lower.includes('typescript') ||
        lower.includes('async') || lower.includes('programar') || lower.includes('script') ||
        lower.includes('html') || lower.includes('css') || lower.includes('bug')) {
      return 'programming';
    }

    if (lower.includes('integral') || lower.includes('matematica') || lower.includes('matemática') ||
        lower.includes('calculo') || lower.includes('cálculo') || lower.includes('ecuacion') ||
        lower.includes('ecuación') || lower.includes('complejidad') || lower.includes('algoritmo') ||
        lower.includes('dx') || lower.includes('teorema')) {
      return 'mathematics';
    }

    if (lower.includes('arquitectura') || lower.includes('microservicio') || lower.includes('monolito') ||
        lower.includes('patron') || lower.includes('patrón') || lower.includes('servidor') ||
        lower.includes('backend') || lower.includes('database') || lower.includes('escalabilidad')) {
      return 'architecture';
    }

    if (lower.includes('cómo funciona') || lower.includes('como funciona') || lower.includes('explica') ||
        lower.includes('render') || lower.includes('navegador') || lower.includes('que es') || lower.includes('qué es')) {
      return 'explanation';
    }

    return 'general';
  }

  function sanitizeMessageForTextMemory(message) {
    if (!message) return '';
    let msgContent = typeof message.content === 'string' ? message.content : JSON.stringify(message.content || '');
    msgContent = msgContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, url) => {
      const trimmedUrl = (url || '').trim();
      if (trimmedUrl.startsWith('data:image/') || trimmedUrl.includes('pollinations.ai') || trimmedUrl.length > 250) {
        const promptDesc = (message.mediaPrompt || alt || 'Imagen generada').trim();
        const modelLabel = message.model ? ' con ' + message.model : '';
        return `[Imagen generada en esta conversación${modelLabel} — Prompt: ${promptDesc}]`;
      }
      return full;
    });
    if (message.mediaType === 'video' && message.mediaPrompt && !msgContent.includes(message.mediaPrompt)) {
      const modelLabel = message.model ? ' con ' + message.model : '';
      msgContent = `${msgContent}\n[Video generado en esta conversación${modelLabel} — Prompt: ${message.mediaPrompt}]`.trim();
    }
    if (message.attachment) {
      if (message.attachment.content) {
        msgContent = msgContent + '\n\n[Archivo adjunto: ' + message.attachment.name + ' (' + (message.attachment.type || 'documento') + ')]:\n```\n' + message.attachment.content + '\n```';
      } else {
        msgContent = msgContent + '\n\n[Archivo adjunto: ' + message.attachment.name + ' (' + (message.attachment.type || 'documento') + ', ' + (message.attachment.size || 0) + ' bytes)]';
      }
    }
    return msgContent;
  }

  function extractVisualHistorySummary(priorMessages) {
    const recent = Array.isArray(priorMessages) ? priorMessages.slice(-8) : [];
    let lastVisualPrompt = '';
    const historyLines = [];

    for (let i = recent.length - 1; i >= 0; i--) {
      const m = recent[i];
      if (!m) continue;
      if (!lastVisualPrompt) {
        if (m.mediaPrompt) {
          lastVisualPrompt = String(m.mediaPrompt).trim();
        } else if (typeof m.content === 'string') {
          const imgMatch = m.content.match(/!\[([^\]]+)\]\(([^)]+)\)/);
          if (imgMatch && imgMatch[1]) {
            lastVisualPrompt = imgMatch[1].trim();
          }
        }
      }
    }

    recent.forEach(m => {
      if (!m) return;
      const roleLabel = m.role === 'assistant'
        ? `Asistente${m.model ? ' (' + m.model + ')' : ''}`
        : 'Usuario';
      const cleaned = sanitizeMessageForTextMemory(m).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        historyLines.push(`${roleLabel}: ${cleaned.slice(0, 280)}`);
      }
    });

    return { lastVisualPrompt, historyLines };
  }

  function mergeVisualContextFallback(userQuery, priorMessages, attachment) {
    let baseQuery = (userQuery || '').trim();
    if (attachment && attachment.content) {
      baseQuery = `${baseQuery} ${attachment.content.slice(0, 200)}`.trim();
    } else if (attachment && attachment.name && !baseQuery) {
      baseQuery = attachment.name;
    }

    const { lastVisualPrompt, historyLines } = extractVisualHistorySummary(priorMessages);
    if (!lastVisualPrompt && historyLines.length === 0) {
      return baseQuery;
    }

    const lower = baseQuery
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const startsNewSubject = /^(crea|dibuja|genera|hazme|muestra)\s+(un|una|unos|unas|otro|otra|nuevo|nueva)\s+(?!(?:imagen|foto|render|ilustracion|dibujo|video|animacion|escena)?\s*(?:de|sobre|con|basado|basada)?\s*(?:eso|esa|ese|esto|esta|lo\s+anterior|lo\s+que|mismo|misma)\b)/i.test(lower);
    const hasContinuationCue = /\b(ahora|cambia|cambialo|cambiala|ponle|agrega|agregale|anade|quitale|hazlo|hazla|haz que|mismo|misma|anterior|eso|esa|ese|este|esta|estilo|color|fondo|de noche|de dia|iluminacion|sin|mas|menos|igual|basado|basada|en vez|dibujalo|dibujala|generalo|generala|convierte|conviertelo|transforma)\b/.test(lower);
    const wordCount = lower ? lower.split(/\s+/).length : 0;

    if (lastVisualPrompt && !startsNewSubject && (hasContinuationCue || wordCount <= 5)) {
      return `${lastVisualPrompt}, ${baseQuery}`.slice(0, 420);
    }

    if (historyLines.length > 0 && hasContinuationCue && !startsNewSubject) {
      const recentTopic = historyLines.slice(-2).join(' | ').slice(0, 260);
      return `${baseQuery} (${recentTopic})`.slice(0, 420);
    }

    return baseQuery;
  }

  async function buildContextualVisualPrompt(userQuery, chatMessages, targetType = 'image', attachment = null) {
    const msgs = Array.isArray(chatMessages) ? chatMessages : [];
    const lastMsg = msgs[msgs.length - 1];
    const priorMessages = lastMsg && lastMsg.role === 'user' ? msgs.slice(0, -1) : msgs;
    const fallbackPrompt = mergeVisualContextFallback(userQuery, priorMessages, attachment);

    if (priorMessages.length === 0) {
      return fallbackPrompt;
    }

    const apiKey = (state.settings.groqApiKey || '').trim();
    if (!apiKey) {
      return fallbackPrompt;
    }

    const { historyLines } = extractVisualHistorySummary(priorMessages);
    if (historyLines.length === 0) {
      return fallbackPrompt;
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 4500) : null;
    try {
      const targetLabel = targetType === 'video' ? 'video' : 'imágenes';
      const payload = {
        model: 'llama-3.1-8b-instant',
        temperature: 0.25,
        max_completion_tokens: 180,
        stream: false,
        messages: [
          {
            role: 'system',
            content: `Eres un sintetizador de memoria conversacional para generación de ${targetLabel}. Analiza el historial previo del chat (texto, imágenes o videos previos) y la nueva instrucción del usuario. Si la nueva instrucción continúa, modifica, edita o hace referencia a algo mencionado o generado antes en el chat, escribe UN solo prompt visual completo y detallado que combine el contexto previo con los cambios pedidos. Si el usuario pide un tema completamente nuevo sin relación previa, redacta solo el nuevo prompt manteniendo preferencias explícitas si aplica. Devuelve ÚNICAMENTE el prompt visual final, sin explicaciones, sin comillas y sin viñetas.`
          },
          {
            role: 'user',
            content: `Historial reciente del chat:\n${historyLines.join('\n')}\n\nNueva instrucción actual del usuario:\n${userQuery || ''}`
          }
        ]
      };

      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      });
      if (resp.ok) {
        const data = await resp.json();
        const synthesized = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (synthesized && synthesized.trim()) {
          return synthesized.replace(/^["'`]+|["'`]+$/g, '').trim().slice(0, 420);
        }
      }
    } catch (err) {
    } finally {
      if (timer) clearTimeout(timer);
    }

    return fallbackPrompt;
  }

  async function generateSimulatedAnswer(userQuery, attachment, selectedModel, groqError = '', webResults = [], chatMessages = [], onMediaPromptResolved = null) {
    const currentModel = selectedModel || state.settings.selectedModel || 'Claude Sonnet 4.6';
    const lowerModel = currentModel.toLowerCase();
    const isImageModel = lowerModel.includes('flux') || lowerModel.includes('gpt image');
    const isVideoModel = lowerModel.includes('video');

    if (!isImageModel && !isVideoModel && attachment && attachment.name) {
      const fileName = attachment.name;
      const fileExt = fileName.split('.').pop().toLowerCase();
      const contentSnippet = attachment.content ? attachment.content.slice(0, 500) : '';

      if (['html', 'htm'].includes(fileExt)) {
        return `He analizado con éxito el archivo HTML adjunto **\`${escapeHtml(fileName)}\`** (${attachment.size ? Math.round(attachment.size / 1024) + ' KB' : 'documento'}).

### Resumen del análisis:
1. **Estructura del documento:** Contiene la jerarquía estándar de etiquetas HTML5 con secciones semánticas y marcado bien delimitado.
2. **Buenas prácticas:** Las etiquetas principales y los contenedores estructurales presentan un diseño limpio y compatible con estándares modernos.
3. **Recomendaciones:** Asegúrate de incluir etiquetas \`<meta name="viewport">\` si está destinado a dispositivos móviles y optimizar la carga de fuentes y estilos externos.

¿Deseas que audite alguna sección en particular, extraiga los estilos o revise scripts vinculados?`;
      }

      if (['js', 'ts', 'jsx', 'tsx', 'py'].includes(fileExt)) {
        return `He revisado el archivo de código **\`${escapeHtml(fileName)}\`**.

### Hallazgos principales:
- **Sintaxis y estilo:** Estructura modular coherente y formateo consistente.
- **Eficiencia y control de flujo:** Las funciones y métodos principales siguen buenas prácticas de legibilidad.
- **Sugerencias:** Verifica el manejo exhaustivo de excepciones asíncronas y tipado estricto si corresponde.

¿Quieres que optimicemos alguna función o implementemos pruebas unitarias?`;
      }

      return `He recibido y analizado el archivo **\`${escapeHtml(fileName)}\`** (${attachment.type || 'documento'}).

La información está lista para procesarse. ¿Qué tarea te gustaría que realicemos sobre este archivo? Puedo ayudarte con:
- Resumen y extracción de puntos clave.
- Corrección, refactorización o validación de sintaxis.
- Explicación paso a paso de su contenido.`;
    }

    const category = determineCategory(userQuery);

    if (category === 'identity') {
      if (lowerModel.includes('gpt image')) {
        const identityResponses = [
          `Soy ${currentModel} de OpenAI. Soy el modelo oficial de generación visual de OpenAI con arquitectura Sunburst de alta precisión y renderizado neural. ¿Qué imagen deseas crear hoy?`,
          `Soy ${currentModel}, un modelo de inteligencia artificial desarrollado por OpenAI para la creación y síntesis de imágenes de máxima fidelidad estética. ¿En qué creación visual te puedo asistir?`,
          `Soy ${currentModel} de OpenAI. Cuento con capacidades nativas de renderizado fotorrealista, comprensión detallada de prompts y diseño artístico avanzado. ¿Qué escena te gustaría generar?`
        ];
        return identityResponses[Math.floor(Math.random() * identityResponses.length)];
      }

      if (lowerModel.includes('flux.2')) {
        const identityResponses = [
          `Soy Flux.2, un modelo generativo de imágenes de nueva generación ejecutado con **flux-2-flash** a través de **Poe API**. Cuento con alta fidelidad fotorrealista, renderizado de texto y detalles cinemáticos. ¿Qué imagen deseas generar hoy?`,
          `Soy Flux.2 en Poe API (modelo **flux-2-flash**). Ofrezco capacidades avanzadas de síntesis visual con comprensión semántica profunda. ¿En qué creación visual te gustaría trabajar?`,
          `Soy Flux.2 vía Poe API (**flux-2-flash**). Estoy listo para transformar tus descripciones en imágenes de alta definición. ¿Qué escena o diseño te gustaría crear?`
        ];
        return identityResponses[Math.floor(Math.random() * identityResponses.length)];
      }

      if (lowerModel.includes('flux')) {
        const identityResponses = [
          `Soy Flux, impulsado por el modelo **flux-2-flash** a través de **Poe API**. ¿Qué imagen te gustaría crear hoy?`,
          `Soy Flux en Poe API (modelo **flux-2-flash**). Cuento con síntesis visual avanzada y renderizado de alta fidelidad. ¿Qué diseño deseas crear?`,
          `Soy Flux vía Poe API. Uso **flux-2-flash** para generar escenas detalladas y fotorrealistas. ¿Qué imagen deseas generar?`
        ];
        return identityResponses[Math.floor(Math.random() * identityResponses.length)];
      }

      if (lowerModel.includes('gpt 6 astra')) {
        const identityResponses = [
          `Soy ${currentModel} de OpenAI. Cuento con arquitectura avanzada de razonamiento profundo y síntesis técnica de alta precisión. ¿En qué proyecto te puedo ayudar hoy?`,
          `Soy ${currentModel}, un modelo insignia de lenguaje e inteligencia artificial desarrollado por OpenAI. ¿Qué consulta técnica o creativa quieres abordar?`,
          `Soy ${currentModel} de OpenAI. Estoy listo para asistirte con programación, análisis complejo y razonamiento estructurado.`
        ];
        return identityResponses[Math.floor(Math.random() * identityResponses.length)];
      }

      const identityResponses = [
        `Soy ${currentModel} de Anthropic. Estoy aquí para asistirte con razonamiento, programación y resolución de tareas complejas. ¿En qué puedo ayudarte hoy?`,
        `Soy ${currentModel}, un modelo de inteligencia artificial desarrollado por Anthropic. ¿En qué puedo colaborar contigo hoy?`,
        `Soy ${currentModel} de Anthropic. Cuento con capacidades avanzadas de análisis, código y razonamiento reflexivo. ¿Qué te gustaría consultar?`
      ];
      return identityResponses[Math.floor(Math.random() * identityResponses.length)];
    }

    if (lowerModel.includes('flux')) {
      const contextualPrompt = await buildContextualVisualPrompt(userQuery, chatMessages, 'image', attachment);
      const cleanPrompt = (contextualPrompt || userQuery || 'Un render artístico de alta definición').replace(/[#*`]/g, '').trim().slice(0, 420);
      const safeAlt = cleanPrompt.replace(/[\[\]()\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220) || 'Imagen generada';

      try {
        if (typeof onMediaPromptResolved === 'function') {
          onMediaPromptResolved(cleanPrompt, 'image');
        }
        const imageResultUrl = await generatePoeImage(cleanPrompt, currentModel);
        return `![${safeAlt}](${imageResultUrl})`;
      } catch (err) {
        if (err && err.code === 'BACKEND_REQUIRED') {
          if (isGitHubPagesOrigin()) {
            return `**GitHub Pages** es un hosting 100% estático (sin servidor), por lo que no puede guardar \`POE_API_KEY\` en secreto sin exponerla al navegador.

Para usar **flux-2-flash** en GitHub Pages sin mostrar la clave en JavaScript tienes 3 opciones:
- Crea un **Cloudflare Worker** gratuito con \`POE_API_KEY\` guardada como *Secret* y pega su URL (\`https://tu-worker.workers.dev\`) en **Configuración ⚙️ > URL de Proxy Worker/Netlify** (o en \`DEFAULT_POE_PROXY_URL\` en \`app.js\`).
- Conecta este mismo repositorio a **Netlify** con \`POE_API_KEY\` en *Environment variables* (usa \`/.netlify/functions/poe-image\` ya incluido).
- Pega temporalmente tu clave \`sk-poe-...\` en **Configuración ⚙️ > API de Imagen (Poe API / Flux-2-Flash)** para llamadas directas desde tu navegador.`;
          }
          return `Para usar la clave predeterminada de **Poe API** (**flux-2-flash**) sin exponerla en el navegador, abre la app usando **\`node server.js\`** (con \`POE_API_KEY\` en \`.env\`), despliégala en **Netlify Functions** (\`/.netlify/functions/poe-image\`), o pega una **URL de Proxy Worker** en **Configuración ⚙️**.

También puedes pegar una clave personal temporal en **Configuración ⚙️ > API de Imagen (Poe API / Flux-2-Flash)** si estás previsualizando sin servidor.`;
        }
        if (err && (err.code === 'NO_POE_AUTH' || err.message === 'NO_POE_AUTH')) {
          return `No hay una **POE_API_KEY** configurada en el servidor ni en **Configuración** ⚙️.

Configura \`POE_API_KEY\` en \`.env\` (para \`server.js\`) / variables de entorno en Netlify, o ingresa tu clave \`sk-poe-...\` en **Configuración > API de Imagen (Poe API / Flux-2-Flash)**.`;
        }
        return `No se pudo completar la generación en Poe API (**${escapeHtml(err.message)}**).

Verifica que el servidor esté ejecutándose o revisa tu configuración de **Poe API** en **Configuración** ⚙️.`;
      }
    }

    if (lowerModel.includes('gpt image')) {
      const contextualPrompt = await buildContextualVisualPrompt(userQuery, chatMessages, 'image', attachment);
      const cleanPrompt = (contextualPrompt || userQuery || 'Un arte conceptual fotorrealista de alta fidelidad').replace(/[#*`]/g, '').trim().slice(0, 420);
      const safeAlt = cleanPrompt.replace(/[\[\]()\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220) || 'Imagen generada';
      const seed = Math.floor(Math.random() * 9999999);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?model=openai&width=1024&height=1024&nologo=true&seed=${seed}`;
      if (typeof onMediaPromptResolved === 'function') {
        onMediaPromptResolved(cleanPrompt, 'image');
      }
      return `![${safeAlt}](${imageUrl})`;
    }

    if (isVideoModel) {
      const contextualPrompt = await buildContextualVisualPrompt(userQuery, chatMessages, 'video', attachment);
      const cleanPrompt = (contextualPrompt || userQuery || 'Escena cinemática en alta definición').replace(/[#*`]/g, '').trim().slice(0, 420);
      if (typeof onMediaPromptResolved === 'function') {
        onMediaPromptResolved(cleanPrompt, 'video');
      }
      return `El modelo **${currentModel}** se encuentra actualmente en fase de desarrollo. Tu contexto conversacional quedó preparado para la escena: *${escapeHtml(cleanPrompt)}*.`;
    }

    if (groqError) {
      if (lowerModel.includes('gpt 6 astra')) {
        if (groqError === 'NVIDIA_WORKER_UPDATE_REQUIRED') {
          return `Para ejecutar **${currentModel}** en **GitHub Pages** sin exponer la clave de **NVIDIA API** en el navegador, actualiza tu Cloudflare Worker (\`megacld-poe.villaruizgerardo0.workers.dev\`) para soportar la ruta \`/nvidia\` con la variable secreta \`NVIDIA_API_KEY\`, o pega tu nueva URL de Worker en **Configuración ⚙️ > API de OpenAI / GPT 6 Astra (NVIDIA)**.`;
        }
        if (groqError === 'BACKEND_REQUIRED' || groqError === 'NO_NVIDIA_AUTH') {
          return `No se detectó una clave **NVIDIA_API_KEY** activa en el servidor o Worker para **${currentModel}**.

Para activarlo manteniendo tu clave segura fuera del navegador:
- En local: inicia el servidor con **\`node server.js\`** (con \`NVIDIA_API_KEY\` en \`.env\`).
- En Netlify: configura \`NVIDIA_API_KEY\` en *Environment variables* para \`/.netlify/functions/nvidia-chat\`.
- En GitHub Pages: usa tu **Cloudflare Worker** en la ruta \`/nvidia\` con \`NVIDIA_API_KEY\` guardada como *Secret*.`;
        }
        return `No se pudo obtener respuesta en vivo de **${currentModel}** desde NVIDIA API (**${escapeHtml(groqError)}**).

Verifica que **\`node server.js\`**, Netlify Functions o tu **Proxy Worker (/nvidia)** estén activos y con la clave **NVIDIA_API_KEY** configurada.`;
      }
      return `No se pudo obtener respuesta en vivo de **${currentModel}** desde Groq (**${escapeHtml(groqError)}**).

Verifica en **Configuración** ⚙️ que tu **Groq API Key** (\`gsk_...\`) sea válida y cuente con saldo o cuota disponible.`;
    }

    if (Array.isArray(webResults) && webResults.length > 0) {
      const listLines = webResults.map((item, idx) => {
        const snippetPart = item.snippet ? ` — ${item.snippet}` : '';
        return `${idx + 1}. **${item.title}**${snippetPart} (${item.url})`;
      }).join('\n');
      return `Resultados encontrados en internet para tu consulta:

${listLines}

Configura tu **Groq API Key** en **Configuración** ⚙️ si deseas que **${currentModel}** sintetice estos resultados con razonamiento completo.`;
    }

    const cleanSnippet = (userQuery || '').trim().slice(0, 140);
    return `Estás utilizando **${currentModel}** en **modo de simulación local** (sin **Groq API Key** configurada).

Para que pueda responder en tiempo real a tu consulta (*"${escapeHtml(cleanSnippet)}"*):
1. Abre **Configuración** ⚙️ en la barra lateral izquierda.
2. Ingresa tu clave de **Groq API Key** (\`gsk_...\`) y haz clic en **Guardar**.`;
  }

  function filterThinkingContent(rawText, currentModel) {
    if (!rawText) return 'Pensando...';

    const rawLower = rawText.toLowerCase();
    const leakageKeywords = [
      'developer instruction',
      'developer directives',
      'directrices internas',
      'user says',
      'we have a conversation',
      'we need to comply',
      'we could respond',
      'we should respond',
      'we can respond',
      'policy: no disallowed',
      'internal reasoning',
      'that is a bit contradictory',
      'might be overkill',
      'so final answer'
    ];

    const hasLeakage = leakageKeywords.some(kw => rawLower.includes(kw));
    if (hasLeakage) {
      return 'Pensando...';
    }

    let cleaned = rawText
      .replace(/Directrices internas de razonamiento[^\n\.]*[:\.]?/gi, '')
      .replace(/Esfuerzo (Bajo|Medio|Alto|Extra|Max)[^\n\.]*[:\.]?/gi, '')
      .replace(/Proporciona respuestas concisas[^\n\.]*\./gi, '')
      .replace(/Proporciona una respuesta equilibrada[^\n\.]*\./gi, '')
      .replace(/Realiza un análisis exhaustivo[^\n\.]*\./gi, '')
      .replace(/Desarrolla un desglose analítico[^\n\.]*\./gi, '')
      .replace(/Despliega el máximo nivel[^\n\.]*\./gi, '')
      .trim();

    if (cleaned) {
      cleaned = cleanIdentityLeakage(cleaned, currentModel);
    }

    return cleaned || 'Pensando...';
  }

  function getThoughtProcess(modelName) {
    const pool = MODEL_THOUGHT_CHAINS[modelName] || MODEL_THOUGHT_CHAINS['Claude Sonnet 5.5'];
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }

  function getDynamicThinkingPhrases(userPrompt, hasAttachment) {
    const lower = (userPrompt || '').toLowerCase();
    const phrases = ['Pensando'];

    if (hasAttachment) {
      if (hasAttachment.type && hasAttachment.type.startsWith('image/')) {
        phrases.push('Analizando imágenes');
      } else {
        phrases.push('Analizando archivos');
      }
    }

    if (/(código|codigo|function|def |class |const |let |var |import |sql|select |from |html|css|js|python|bug|error|script|react)/.test(lower)) {
      phrases.push('Analizando código');
    }

    if (phrases.length === 1) {
      phrases.push('Analizando solicitud');
    }

    phrases.push('Un momento más');
    phrases.push('Pensando');
    return phrases;
  }

  function getGroqModelForSelected(selectedModel) {
    const norm = (selectedModel || '').toLowerCase();
    if (norm.includes('fable 5.2')) {
      return 'openai/gpt-oss-120b';
    }
    if (norm.includes('opus 5.5')) {
      return 'openai/gpt-oss-20b';
    }
    return 'qwen/qwen3.8-27b';
  }

  function updateApiKeyStatusBadge() {
    if (!dom.apiKeyStatusNotice) return;
    const key = (state.settings.groqApiKey || '').trim();
    if (!key) {
      dom.apiKeyStatusNotice.className = 'api-key-status-notice info';
      dom.apiKeyStatusNotice.textContent = 'Modo simulación contextual activo (sin API Key).';
    } else if (key.startsWith('gsk_')) {
      dom.apiKeyStatusNotice.className = 'api-key-status-notice success';
      const activeBackendModel = getGroqModelForSelected(state.settings.selectedModel);
      dom.apiKeyStatusNotice.textContent = 'API Key de Groq configurada: modelo ' + activeBackendModel + ' activo.';
    } else {
      dom.apiKeyStatusNotice.className = 'api-key-status-notice success';
      dom.apiKeyStatusNotice.textContent = 'API Key configurada.';
    }
  }

  function isGitHubPagesOrigin() {
    if (typeof window === 'undefined' || !window.location) return false;
    const host = (window.location.hostname || '').toLowerCase();
    return host.endsWith('.github.io') || host === 'github.io';
  }

  function normalizeProxyUrl(rawUrl) {
    const trimmed = (rawUrl || '').trim().replace(/\/+$/, '');
    if (!trimmed) return '';
    if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith('/')) {
      return 'https://' + trimmed;
    }
    return trimmed;
  }

  function getActivePoeProxyUrl() {
    const savedUrl = state && state.settings ? state.settings.poeProxyUrl : '';
    const defaultUrl = typeof DEFAULT_POE_PROXY_URL === 'string' ? DEFAULT_POE_PROXY_URL : '';
    return normalizeProxyUrl(savedUrl || defaultUrl);
  }

  function getActiveNvidiaCustomProxyUrl() {
    const savedUrl = state && state.settings ? state.settings.nvidiaProxyUrl : '';
    return normalizeProxyUrl(savedUrl);
  }

  function updateNvidiaStatusBadge() {
    if (!dom.nvidiaStatusNotice) return;
    const customKey = (state.settings.nvidiaApiKey || '').trim();
    const customProxyUrl = getActiveNvidiaCustomProxyUrl();
    const unifiedWorkerUrl = getActivePoeProxyUrl();
    const isGhPages = isGitHubPagesOrigin();
    const isHttpOrigin = typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http');

    if (customKey) {
      dom.nvidiaStatusNotice.className = 'api-key-status-notice success';
      dom.nvidiaStatusNotice.textContent = 'Clave personalizada de NVIDIA guardada para GPT 6 Astra (se enviará por el proxy).';
      return;
    }

    if (customProxyUrl) {
      dom.nvidiaStatusNotice.className = 'api-key-status-notice info';
      dom.nvidiaStatusNotice.textContent = 'Proxy NVIDIA configurado: conectando con ' + customProxyUrl + ' (GPT 6 Astra).';
    } else if (isGhPages && !unifiedWorkerUrl) {
      dom.nvidiaStatusNotice.className = 'api-key-status-notice warning';
      dom.nvidiaStatusNotice.textContent = 'En GitHub Pages, configura una URL de Proxy Worker con ruta /nvidia y Secret NVIDIA_API_KEY.';
      return;
    } else {
      dom.nvidiaStatusNotice.className = 'api-key-status-notice info';
      dom.nvidiaStatusNotice.textContent = 'GPT 6 Astra usa NVIDIA API (Mistral Large 4) oculta en servidor/Netlify/Worker (/api/nvidia/chat o /nvidia).';
    }

    const statusCandidates = [];
    if (customProxyUrl) {
      statusCandidates.push({ url: customProxyUrl.endsWith('/nvidia') ? customProxyUrl + '/status' : customProxyUrl, kind: 'custom' });
    }
    if (isHttpOrigin && !isGhPages) {
      statusCandidates.push({ url: '/api/nvidia/status', kind: 'local' });
      statusCandidates.push({ url: '/.netlify/functions/nvidia-chat', kind: 'netlify' });
    }
    if (unifiedWorkerUrl) {
      statusCandidates.push({ url: unifiedWorkerUrl + '/nvidia/status', kind: 'worker' });
      statusCandidates.push({ url: unifiedWorkerUrl, kind: 'worker-root' });
    }

    if (statusCandidates.length === 0) return;

    (async function () {
      let sawOldPoeWorker = false;
      for (let i = 0; i < statusCandidates.length; i++) {
        const candidate = statusCandidates[i];
        try {
          const r = await fetch(candidate.url);
          const ct = r.headers.get('content-type') || '';
          if (!r.ok || !ct.includes('application/json')) continue;
          const data = await r.json();
          if (!dom.nvidiaStatusNotice || (state.settings.nvidiaApiKey || '').trim()) return;
          const isNvidiaEnabled = data && (data.nvidiaConfigured === true || (candidate.kind !== 'worker-root' && data.envConfigured === true));
          const isNvidiaServerOnly = data && (data.nvidiaServerActive === true || (candidate.kind !== 'worker-root' && data.serverActive === true));
          if (isNvidiaEnabled) {
            dom.nvidiaStatusNotice.className = 'api-key-status-notice success';
            dom.nvidiaStatusNotice.textContent = 'GPT 6 Astra activo por defecto vía NVIDIA API (clave protegida fuera del navegador).';
            return;
          }
          if (isNvidiaServerOnly) {
            dom.nvidiaStatusNotice.className = 'api-key-status-notice warning';
            dom.nvidiaStatusNotice.textContent = 'Proxy NVIDIA activo sin NVIDIA_API_KEY en el entorno (.env, Netlify o Worker Secrets).';
            return;
          }
          if (candidate.kind === 'worker-root' && data && data.serverActive && data.nvidiaConfigured === undefined) {
            sawOldPoeWorker = true;
          }
        } catch (e) {}
      }
      if (sawOldPoeWorker && dom.nvidiaStatusNotice && !(state.settings.nvidiaApiKey || '').trim()) {
        dom.nvidiaStatusNotice.className = 'api-key-status-notice warning';
        dom.nvidiaStatusNotice.textContent = 'Tu Worker actual en GitHub Pages solo tiene Poe API. Actualízalo con la ruta /nvidia y Secret NVIDIA_API_KEY para activar GPT 6 Astra.';
      }
    })();
  }

  function updatePoeStatusBadge() {
    if (!dom.poeStatusNotice) return;
    const customKey = (state.settings.poeApiKey || '').trim();
    const proxyUrl = getActivePoeProxyUrl();
    const isGhPages = isGitHubPagesOrigin();

    if (customKey) {
      dom.poeStatusNotice.className = 'api-key-status-notice success';
      dom.poeStatusNotice.textContent = 'Poe API configurada con clave personalizada (modelo flux-2-flash).';
      return;
    }

    if (isGhPages && !proxyUrl) {
      dom.poeStatusNotice.className = 'api-key-status-notice warning';
      dom.poeStatusNotice.textContent = 'GitHub Pages es estático: pega la URL de tu Proxy Worker con POE_API_KEY oculta o ingresa tu sk-poe-... arriba.';
      return;
    }

    dom.poeStatusNotice.className = 'api-key-status-notice info';
    dom.poeStatusNotice.textContent = proxyUrl
      ? 'Proxy Poe configurado: conectando con ' + proxyUrl + ' (flux-2-flash).'
      : 'Usando clave predeterminada protegida en servidor cuando server.js o Netlify Functions esté activo (flux-2-flash).';

    const isHttpOrigin = typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http');
    if (isHttpOrigin || /^https?:\/\//i.test(proxyUrl)) {
      const statusEndpoints = [];
      if (isHttpOrigin ? proxyUrl : /^https?:\/\//i.test(proxyUrl)) statusEndpoints.push(proxyUrl);
      if (isHttpOrigin && !isGhPages) {
        statusEndpoints.push('/api/poe/status');
        statusEndpoints.push('/.netlify/functions/poe-image');
      }
      (async function () {
        for (let i = 0; i < statusEndpoints.length; i++) {
          try {
            const r = await fetch(statusEndpoints[i]);
            const ct = r.headers.get('content-type') || '';
            if (!r.ok || !ct.includes('application/json')) continue;
            const data = await r.json();
            if (data && data.serverActive && dom.poeStatusNotice && !(state.settings.poeApiKey || '').trim()) {
              if (data.envConfigured) {
                dom.poeStatusNotice.className = 'api-key-status-notice success';
                dom.poeStatusNotice.textContent = 'Poe API activa por defecto desde servidor/Worker (flux-2-flash; clave oculta en navegadores).';
              } else {
                dom.poeStatusNotice.className = 'api-key-status-notice warning';
                dom.poeStatusNotice.textContent = 'Servidor activo sin POE_API_KEY en el entorno. Agrégala en .env, Netlify o Worker Secrets.';
              }
            }
            return;
          } catch (e) {}
        }
      })();
    }
  }

  function extractPoeImageUrlFromText(text) {
    if (typeof text !== 'string' || !text.trim()) return '';
    const mdImg = text.match(/!\[[^\]]*\]\(((?:https?:\/\/|data:image\/)[^\s)]+)\)/i);
    if (mdImg && mdImg[1]) return mdImg[1];
    const mdLink = text.match(/\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
    if (mdLink && mdLink[1]) return mdLink[1];
    const dataUri = text.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/);
    if (dataUri && dataUri[0]) return dataUri[0];
    const rawUrl = text.match(/https?:\/\/[^\s"'<>)]+/i);
    if (rawUrl && rawUrl[0]) return rawUrl[0];
    return '';
  }

  function extractPoeImageUrl(data) {
    if (!data || typeof data !== 'object') return '';
    if (data.image) return data.image;
    if (Array.isArray(data.data) && data.data[0]) {
      if (data.data[0].url) return data.data[0].url;
      if (data.data[0].b64_json) return 'data:image/png;base64,' + data.data[0].b64_json;
    }
    const choice = Array.isArray(data.choices) ? data.choices[0] : null;
    const content = choice && choice.message ? choice.message.content : null;
    if (Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        const part = content[i];
        if (!part) continue;
        if (part.image_url && part.image_url.url) return part.image_url.url;
        if (typeof part.url === 'string' && part.url) return part.url;
        if (typeof part.text === 'string') {
          const found = extractPoeImageUrlFromText(part.text);
          if (found) return found;
        }
      }
      return '';
    }
    return extractPoeImageUrlFromText(content);
  }

  async function generatePoeImage(prompt, modelName) {
    const customKey = (state.settings.poeApiKey || '').trim();
    const configuredProxyUrl = getActivePoeProxyUrl();
    const isGhPages = isGitHubPagesOrigin();
    const isHttpOrigin = typeof window !== 'undefined' &&
      window.location &&
      (window.location.protocol === 'http:' || window.location.protocol === 'https:');

    const proxyEndpoints = [];
    if (configuredProxyUrl) {
      proxyEndpoints.push(configuredProxyUrl);
    }
    if (isHttpOrigin && !isGhPages) {
      proxyEndpoints.push('/api/poe/image');
      proxyEndpoints.push('/.netlify/functions/poe-image');
    }

    let customProxyNetworkError = '';

    if (proxyEndpoints.length > 0) {
      const proxyPayloadObj = {
        prompt: prompt,
        modelName: modelName || 'flux-2-flash'
      };
      if (customKey) {
        proxyPayloadObj.apiKey = customKey;
      }
      const proxyPayload = JSON.stringify(proxyPayloadObj);

      for (let i = 0; i < proxyEndpoints.length; i++) {
        const proxyUrl = proxyEndpoints[i];
        let proxyResp;
        try {
          proxyResp = await fetch(proxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: proxyPayload
          });
        } catch (networkErr) {
          if (configuredProxyUrl && proxyUrl === configuredProxyUrl) {
            customProxyNetworkError = 'No se pudo conectar con la URL de Proxy Poe configurada (' + (networkErr && networkErr.message ? networkErr.message : 'error de red') + ').';
          }
          continue;
        }

        const contentType = proxyResp.headers.get('content-type') || '';

        if (!proxyResp.ok) {
          if (!contentType.includes('application/json')) {
            continue;
          }
          const errData = await proxyResp.json().catch(function () { return null; });
          const errMsg = errData && (errData.error || (errData.detail && String(errData.detail)));
          if (errMsg === 'NO_POE_AUTH') {
            const authErr = new Error('NO_POE_AUTH');
            authErr.code = 'NO_POE_AUTH';
            throw authErr;
          }
          if ((proxyResp.status === 404 || proxyResp.status === 405) && !(typeof errMsg === 'string' && errMsg.startsWith('Poe API Error'))) {
            continue;
          }
          throw new Error(errMsg || ('Error en Poe API (' + proxyResp.status + ')'));
        }

        if (!contentType.includes('application/json')) {
          continue;
        }

        const json = await proxyResp.json();
        if (json && json.error) {
          throw new Error(json.error);
        }
        const imageUrl = extractPoeImageUrl(json);
        if (!imageUrl) {
          throw new Error('Respuesta de Poe API sin imagen válida.');
        }
        return imageUrl;
      }
    }

    if (customProxyNetworkError && !customKey) {
      throw new Error(customProxyNetworkError);
    }

    if (!customKey) {
      const backendErr = new Error('BACKEND_REQUIRED');
      backendErr.code = 'BACKEND_REQUIRED';
      throw backendErr;
    }

    const poeResp = await fetch('https://api.poe.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + customKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'flux-2-flash',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false
      })
    });

    if (!poeResp.ok) {
      const errText = await poeResp.text();
      throw new Error(`Poe API Error (${poeResp.status}): ${errText}`);
    }

    const directJson = await poeResp.json();
    const directUrl = extractPoeImageUrl(directJson);
    if (!directUrl) {
      throw new Error('Respuesta de Poe API sin imagen válida.');
    }
    return directUrl;
  }

  function buildConversationMessages(messages, selectedModel, webResults = [], webMeta = null) {
    const effortKey = state.settings.effortLevel || 'bajo';
    let effortPrompt = getSystemPrompt(selectedModel, effortKey);
    const hasWebResults = Array.isArray(webResults) && webResults.length > 0;
    const todayIso = new Date().toISOString().slice(0, 10);

    effortPrompt += '\n\nMEMORIA DE CONVERSACIÓN: Tienes memoria completa de todos los mensajes previos de este chat (texto, código, imágenes generadas o videos). Si el usuario hace referencia a imágenes, videos o temas anteriores, responde con coherencia usando ese historial.';

    if (hasWebResults) {
      const formattedWebContext = webResults
        .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\nResumen: ${r.snippet || 'Sin descripción'}`)
        .join('\n\n');
      effortPrompt += `\n\nBÚSQUEDA EN INTERNET ACTIVA (${todayIso}): SÍ cuentas con resultados reales recién obtenidos de internet para esta consulta (adjuntos abajo). Está estrictamente prohibido decir que no tienes acceso a internet, que no cuentas con herramienta de búsqueda en tiempo real o que solo usas conocimiento previo. Usa estos resultados en vivo para responder con exactitud y menciona sus fuentes y URLs:\n\n${formattedWebContext}`;
    } else if (webMeta && webMeta.attempted) {
      effortPrompt += `\n\nBÚSQUEDA EN INTERNET ACTIVA (${todayIso}): Se ejecutó una búsqueda web automática para "${webMeta.query || ''}", pero los motores consultados no devolvieron fragmentos exactos para esos términos. Responde con tu mejor conocimiento aclarando qué términos se consultaron, sin afirmar que careces de herramienta de búsqueda.`;
    }

    const recentMessages = Array.isArray(messages) ? messages.slice(-24) : [];
    const mappedMessages = recentMessages.map((m, idx) => {
      let msgContent = sanitizeMessageForTextMemory(m);
      if (hasWebResults && idx === recentMessages.length - 1 && m.role === 'user') {
        const compactWebBlock = webResults
          .map((r, i) => `[${i + 1}] ${r.title} (${r.url}): ${r.snippet || ''}`)
          .join('\n');
        msgContent += `\n\n[Resultados en vivo de internet para "${(webMeta && webMeta.query) || ''}":\n${compactWebBlock}]`;
      }
      return {
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: msgContent
      };
    });

    return [
      {
        role: 'system',
        content: effortPrompt
      },
      ...mappedMessages
    ];
  }

  function processSseLine(line, onReasoningChunk, onContentChunk) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.startsWith('data:')) return false;
    const jsonStr = trimmed.slice(5).trim();
    if (jsonStr === '[DONE]') return true;

    try {
      const parsed = JSON.parse(jsonStr);
      const choice = parsed.choices && parsed.choices[0];
      const delta = (choice && (choice.delta || choice.message)) || null;
      if (!delta) return false;

      const reasoningChunk = delta.reasoning_content || delta.reasoning || '';
      if (reasoningChunk) {
        onReasoningChunk(reasoningChunk);
      }

      const contentChunk = delta.content || '';
      if (contentChunk) {
        onContentChunk(contentChunk);
      }
    } catch (e) {}
    return false;
  }

  async function readOpenAISseStream(response, onReasoningChunk, onContentChunk) {
    if (!response.body || typeof response.body.getReader !== 'function') {
      const json = await response.json();
      const choice = json && json.choices && json.choices[0];
      const msg = choice && choice.message;
      if (msg && (msg.reasoning_content || msg.reasoning)) {
        onReasoningChunk(msg.reasoning_content || msg.reasoning);
      }
      if (msg && msg.content) {
        onContentChunk(msg.content);
      }
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      if (state.abortController) {
        try { reader.cancel(); } catch (e) {}
        break;
      }

      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (processSseLine(line, onReasoningChunk, onContentChunk)) {
          return;
        }
      }
    }

    if (buffer.trim()) {
      processSseLine(buffer, onReasoningChunk, onContentChunk);
    }
  }

  async function streamGroqCompletion(messages, selectedModel, onReasoningChunk, onContentChunk, webResults = [], webMeta = null) {
    const apiKey = (state.settings.groqApiKey || '').trim();
    if (!apiKey) {
      throw new Error('NO_API_KEY');
    }

    const targetModel = getGroqModelForSelected(selectedModel);
    const effortKey = state.settings.effortLevel || 'bajo';
    const formattedMessages = buildConversationMessages(messages, selectedModel, webResults, webMeta);

    const groqEffortMap = {
      bajo: 'low',
      medio: 'medium',
      alto: 'high',
      extra: 'high',
      max: 'high'
    };
    const groqReasoningEffort = groqEffortMap[effortKey] || 'medium';

    const payload = {
      messages: formattedMessages,
      model: targetModel,
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: true,
      stop: null
    };

    if (targetModel.includes('qwen') || targetModel.includes('deepseek') || targetModel.includes('gpt-oss')) {
      payload.reasoning_effort = groqReasoningEffort;
    }

    let response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok && payload.reasoning_effort) {
      delete payload.reasoning_effort;
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok && (response.status === 400 || response.status === 404) && payload.model !== 'llama-3.3-70b-versatile') {
      delete payload.reasoning_effort;
      payload.model = 'llama-3.3-70b-versatile';
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error('Groq API Error (' + response.status + '): ' + errText);
    }

    await readOpenAISseStream(response, onReasoningChunk, onContentChunk);
  }

  async function streamNvidiaCompletion(messages, selectedModel, onReasoningChunk, onContentChunk, webResults = [], webMeta = null) {
    const customKey = (state.settings.nvidiaApiKey || '').trim();
    const customNvidiaProxy = getActiveNvidiaCustomProxyUrl();
    const unifiedWorkerBase = getActivePoeProxyUrl();
    const isGhPages = isGitHubPagesOrigin();
    const isHttpOrigin = typeof window !== 'undefined' &&
      window.location &&
      (window.location.protocol === 'http:' || window.location.protocol === 'https:');

    const formattedMessages = buildConversationMessages(messages, selectedModel, webResults, webMeta);
    const requestPayload = {
      messages: formattedMessages,
      temperature: 0.6,
      top_p: 0.95,
      max_tokens: 4096,
      stream: true
    };
    if (customKey) {
      requestPayload.apiKey = customKey;
    }

    const proxyCandidates = [];
    if (customNvidiaProxy) {
      proxyCandidates.push(customNvidiaProxy);
    }
    if (isHttpOrigin && !isGhPages) {
      proxyCandidates.push('/api/nvidia/chat');
      proxyCandidates.push('/.netlify/functions/nvidia-chat');
    }
    if (unifiedWorkerBase) {
      proxyCandidates.push(unifiedWorkerBase.endsWith('/nvidia') ? unifiedWorkerBase : unifiedWorkerBase + '/nvidia');
    }

    if (proxyCandidates.length === 0) {
      const err = new Error('BACKEND_REQUIRED');
      err.code = 'BACKEND_REQUIRED';
      throw err;
    }

    let sawOldPoeWorker = false;
    let customProxyNetworkError = '';

    for (let i = 0; i < proxyCandidates.length; i++) {
      const endpoint = proxyCandidates[i];
      const payloadToSend = Object.assign({}, requestPayload);
      if (endpoint.includes('/.netlify/functions/nvidia-chat')) {
        payloadToSend.stream = false;
      }

      let resp;
      try {
        resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadToSend)
        });
      } catch (networkErr) {
        if (customNvidiaProxy && endpoint === customNvidiaProxy) {
          customProxyNetworkError = 'No se pudo conectar con la URL de Proxy NVIDIA configurada (' + (networkErr && networkErr.message ? networkErr.message : 'error de red') + ').';
        }
        continue;
      }

      const contentType = (resp.headers.get('content-type') || '').toLowerCase();

      if (!resp.ok) {
        if (!contentType.includes('application/json')) {
          continue;
        }
        const errData = await resp.json().catch(function () { return null; });
        const errMsg = errData && (errData.error || (errData.detail && String(errData.detail)));
        if (errMsg === 'NO_NVIDIA_AUTH') {
          const authErr = new Error('NO_NVIDIA_AUTH');
          authErr.code = 'NO_NVIDIA_AUTH';
          throw authErr;
        }
        if (typeof errMsg === 'string' && /falta el prompt/i.test(errMsg)) {
          sawOldPoeWorker = true;
          continue;
        }
        if ((resp.status === 404 || resp.status === 405) && !(typeof errMsg === 'string' && errMsg.startsWith('NVIDIA API Error'))) {
          continue;
        }
        throw new Error(errMsg || ('Error en NVIDIA API (' + resp.status + ')'));
      }

      if (contentType.includes('text/event-stream')) {
        await readOpenAISseStream(resp, onReasoningChunk, onContentChunk);
        return;
      }

      if (!contentType.includes('application/json')) {
        continue;
      }

      const json = await resp.json();
      if (json && json.error) {
        throw new Error(typeof json.error === 'string' ? json.error : (json.error.message || 'Error en NVIDIA API'));
      }
      const choice = json && json.choices && json.choices[0];
      const msg = choice && choice.message;
      const reasoning = (msg && (msg.reasoning_content || msg.reasoning)) || '';
      if (reasoning) {
        onReasoningChunk(reasoning);
      }
      const content = (msg && msg.content) || '';
      if (content) {
        onContentChunk(content);
      }
      if (!reasoning && !content) {
        throw new Error('NVIDIA API devolvió una respuesta vacía para GPT 6 Astra.');
      }
      return;
    }

    if (customProxyNetworkError) {
      throw new Error(customProxyNetworkError);
    }
    if (sawOldPoeWorker) {
      const workerErr = new Error('NVIDIA_WORKER_UPDATE_REQUIRED');
      workerErr.code = 'NVIDIA_WORKER_UPDATE_REQUIRED';
      throw workerErr;
    }
    const backendErr = new Error('BACKEND_REQUIRED');
    backendErr.code = 'BACKEND_REQUIRED';
    throw backendErr;
  }

  function setGenerationUI(isGenerating) {
    state.isStreaming = isGenerating;
    if (isGenerating) {
      dom.sendBtn.style.display = 'none';
      dom.stopBtn.style.display = 'flex';
      dom.messageInput.disabled = true;
    } else {
      dom.stopBtn.style.display = 'none';
      dom.sendBtn.style.display = 'flex';
      dom.messageInput.disabled = false;
      updateSendButtonState();
      dom.messageInput.focus();
    }
  }

  function stopStreaming() {
    state.abortController = true;
    setGenerationUI(false);
  }

  async function sendMessage(contentOverride = null) {
    if (state.isStreaming) return;

    const rawContent = contentOverride || dom.messageInput.value;
    const content = rawContent.trim();
    if (!content && !state.selectedAttachment) return;

    ensureValidModelForPlan();
    const currentModel = state.settings.selectedModel || 'Claude Sonnet 4.6';
    if (!checkAndConsumeQuota(currentModel)) return;

    let activeChat = getActiveChat();
    if (!activeChat) {
      const newChat = {
        id: generateId(),
        title: content.slice(0, 32) || 'Conversación',
        createdAt: new Date().toISOString(),
        messages: []
      };
      state.chats.unshift(newChat);
      state.activeChatId = newChat.id;
      activeChat = newChat;
    } else if (activeChat.messages.length === 0) {
      activeChat.title = content.slice(0, 32) || 'Conversación';
    }

    const userMsg = {
      id: generateId(),
      role: 'user',
      content: content || '(Archivo adjunto enviado)',
      attachment: state.selectedAttachment,
      timestamp: Date.now()
    };

    activeChat.messages.push(userMsg);
    saveChats();
    renderChatsList();

    dom.messageInput.value = '';
    dom.messageInput.style.height = 'auto';
    clearAttachment();

    dom.welcomeScreen.style.display = 'none';
    dom.messagesContainer.style.display = 'flex';
    appendMessageToDOM(userMsg, true);
    scrollToBottom();

    setGenerationUI(true);
    state.abortController = false;

    const assistantMsgWrapper = document.createElement('div');
    assistantMsgWrapper.className = 'message-wrapper assistant';

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'assistant-body';

    const header = document.createElement('div');
    header.className = 'assistant-header';
    header.innerHTML = `
      <span class="assistant-avatar-text">_&lt;</span>
      <span class="assistant-name">MegaCLD</span>
      <span class="assistant-model-tag">${escapeHtml(currentModel)}</span>
    `;
    bodyDiv.appendChild(header);

    const hasGroqKey = !!(state.settings.groqApiKey && state.settings.groqApiKey.trim());
    const lowerCurrentModel = currentModel.toLowerCase();
    const isImageModel = lowerCurrentModel.includes('gpt image') || lowerCurrentModel.includes('flux');
    const isVideoModel = lowerCurrentModel.includes('video');
    const isNvidiaTextModel = lowerCurrentModel.includes('gpt 6 astra');

    let thinkingContainer = null;
    let thinkingStatusSpan = null;
    let thinkingBodyDiv = null;
    let thoughtText = '';
    let thoughtStatusFinal = '';
    let phraseInterval = null;
    let isSearchingWeb = false;
    const startTime = Date.now();

    if (!isImageModel && state.settings.enableThinking) {
      const phrases = getDynamicThinkingPhrases(userMsg.content, userMsg.attachment);
      let phraseIndex = 0;

      thinkingContainer = document.createElement('div');
      thinkingContainer.className = 'claude-thinking-container';
      thinkingContainer.innerHTML = `
        <div class="claude-thinking-header">
          <svg class="claude-spark-icon animating" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12.4 7.2 16.8 11.6 22 12C16.8 12.4 12.4 16.8 12 22C11.6 16.8 7.2 12.4 2 12C7.2 11.6 11.6 7.2 12 2Z"></path>
          </svg>
          <span class="claude-thinking-status">${escapeHtml(phrases[0])}</span>
          <svg class="claude-thinking-chevron" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div class="claude-thinking-body">Pensando...</div>
      `;

      thinkingStatusSpan = thinkingContainer.querySelector('.claude-thinking-status');
      thinkingBodyDiv = thinkingContainer.querySelector('.claude-thinking-body');

      thinkingContainer.querySelector('.claude-thinking-header').onclick = function () {
        thinkingContainer.classList.toggle('expanded');
      };

      bodyDiv.appendChild(thinkingContainer);

      phraseInterval = setInterval(() => {
        if (!thinkingStatusSpan || isSearchingWeb || !phraseInterval) return;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        thinkingStatusSpan.style.opacity = '0';
        setTimeout(() => {
          if (thinkingStatusSpan && phraseInterval && !isSearchingWeb) {
            thinkingStatusSpan.textContent = phrases[phraseIndex];
            thinkingStatusSpan.style.opacity = '1';
          }
        }, 150);
      }, 1600);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'assistant-content';
    bodyDiv.appendChild(contentDiv);

    assistantMsgWrapper.appendChild(bodyDiv);
    dom.messagesContainer.appendChild(assistantMsgWrapper);
    scrollToBottom();

    let accumulatedText = '';
    let usedGroq = false;
    let groqErrorMessage = '';
    let webResults = [];
    let attemptedWebSearch = false;
    let webSearchQuery = '';
    let generatedMediaPrompt = '';
    let generatedMediaType = '';

    if (!isImageModel && !isVideoModel && state.settings.enableWebSearch && shouldPerformWebSearch(userMsg.content)) {
      attemptedWebSearch = true;
      webSearchQuery = extractSearchQuery(userMsg.content);
      isSearchingWeb = true;
      if (thinkingStatusSpan) {
        thinkingStatusSpan.style.opacity = '1';
        thinkingStatusSpan.textContent = 'Buscando en internet';
      }
      webResults = await performWebSearch(webSearchQuery);
      isSearchingWeb = false;
      if (state.abortController) {
        if (phraseInterval) {
          clearInterval(phraseInterval);
          phraseInterval = null;
        }
        assistantMsgWrapper.remove();
        setGenerationUI(false);
        return;
      }
    }

    if ((isNvidiaTextModel || hasGroqKey) && !isImageModel && !isVideoModel) {
      const handleReasoningChunk = function (chunk) {
        thoughtText += chunk;
        if (thinkingBodyDiv) {
          thinkingBodyDiv.textContent = filterThinkingContent(thoughtText, currentModel);
        }
      };
      const handleContentChunk = function (chunk) {
        if (phraseInterval) {
          clearInterval(phraseInterval);
          phraseInterval = null;
        }
        if (thinkingContainer) {
          const sparkIcon = thinkingContainer.querySelector('.claude-spark-icon');
          if (sparkIcon) sparkIcon.classList.remove('animating');
          if (!thoughtStatusFinal) {
            const elapsedSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
            thoughtStatusFinal = 'Pensó durante ' + elapsedSec + ' segundos';
            if (thinkingStatusSpan) thinkingStatusSpan.textContent = thoughtStatusFinal;
          }
        }
        accumulatedText += chunk;
        contentDiv.innerHTML = renderMarkdown(accumulatedText) + '<span class=cursor-blink></span>';
        scrollToBottom();
      };

      try {
        const streamFn = isNvidiaTextModel ? streamNvidiaCompletion : streamGroqCompletion;
        await streamFn(
          activeChat.messages,
          currentModel,
          handleReasoningChunk,
          handleContentChunk,
          webResults,
          { attempted: attemptedWebSearch, query: webSearchQuery }
        );
        usedGroq = true;
      } catch (err) {
        if (phraseInterval) {
          clearInterval(phraseInterval);
          phraseInterval = null;
        }
        groqErrorMessage = (err && err.code) || (err && err.message) || String(err);
        showToast((isNvidiaTextModel ? 'Error con NVIDIA API: ' : 'Error con Groq API: ') + groqErrorMessage);
      }
    }

    if (!usedGroq) {
      if (!isImageModel && state.settings.enableThinking) {
        thoughtText = getThoughtProcess(currentModel);
        if (thinkingBodyDiv) {
          thinkingBodyDiv.textContent = filterThinkingContent(thoughtText, currentModel);
        }

        const thinkingDuration = currentModel.includes('Opus') ? 2400 : 1600;
        await new Promise(r => setTimeout(r, thinkingDuration));

        if (state.abortController) {
          if (phraseInterval) {
            clearInterval(phraseInterval);
            phraseInterval = null;
          }
          assistantMsgWrapper.remove();
          setGenerationUI(false);
          return;
        }
      }

      if (phraseInterval) {
        clearInterval(phraseInterval);
        phraseInterval = null;
      }

      if (thinkingContainer) {
        const sparkIcon = thinkingContainer.querySelector('.claude-spark-icon');
        if (sparkIcon) {
          sparkIcon.classList.remove('animating');
        }
        const elapsedSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        thoughtStatusFinal = 'Pensó durante ' + elapsedSec + ' segundos';
        if (thinkingStatusSpan) {
          thinkingStatusSpan.textContent = thoughtStatusFinal;
        }
      }

      const fullTextResponse = await generateSimulatedAnswer(
        userMsg.content,
        userMsg.attachment,
        currentModel,
        groqErrorMessage,
        webResults,
        activeChat.messages,
        (promptUsed, mediaKind) => {
          generatedMediaPrompt = promptUsed || '';
          generatedMediaType = mediaKind || '';
        }
      );

      if (isImageModel && /^!\[[^\]]*\]\([^)]+\)$/.test(fullTextResponse.trim())) {
        accumulatedText = fullTextResponse.trim();
        contentDiv.innerHTML = renderMarkdown(accumulatedText);
        scrollToBottom();
      } else {
        const tokens = fullTextResponse.split(/(\s+)/);
        const delayPerToken = SPEED_DELAYS[state.settings.streamSpeed] || SPEED_DELAYS.normal;

        for (let i = 0; i < tokens.length; i++) {
          if (state.abortController) {
            break;
          }
          accumulatedText += tokens[i];
          contentDiv.innerHTML = renderMarkdown(accumulatedText) + '<span class=cursor-blink></span>';
          scrollToBottom();
          await new Promise(r => setTimeout(r, delayPerToken));
        }
      }
    }

    if (phraseInterval) {
      clearInterval(phraseInterval);
      phraseInterval = null;
    }

    if (thinkingContainer) {
      const sparkIcon = thinkingContainer.querySelector('.claude-spark-icon');
      if (sparkIcon) sparkIcon.classList.remove('animating');
      if (!thoughtStatusFinal) {
        const elapsedSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        thoughtStatusFinal = 'Pensó durante ' + elapsedSec + ' segundos';
        if (thinkingStatusSpan) thinkingStatusSpan.textContent = thoughtStatusFinal;
      }
    }

    contentDiv.innerHTML = renderMarkdown(accumulatedText || '(Sin respuesta)');

    const actions = document.createElement('div');
    actions.className = 'message-actions';
    actions.innerHTML = `
      <button type="button" class="msg-action-btn copy-msg-btn">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>Copiar</span>
      </button>
    `;
    actions.querySelector('.copy-msg-btn').onclick = () => {
      copyToClipboard(accumulatedText);
    };
    bodyDiv.appendChild(actions);

    const assistantMsg = {
      id: generateId(),
      role: 'assistant',
      model: currentModel,
      thought: !isImageModel && state.settings.enableThinking ? filterThinkingContent(thoughtText, currentModel) : null,
      thoughtStatus: !isImageModel && state.settings.enableThinking ? thoughtStatusFinal : null,
      content: accumulatedText,
      mediaPrompt: generatedMediaPrompt || null,
      mediaType: generatedMediaType || null,
      timestamp: Date.now()
    };
    activeChat.messages.push(assistantMsg);
    saveChats();

    setGenerationUI(false);
    scrollToBottom();
  }

  function handleFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    const attachmentObj = {
      name: file.name,
      size: file.size,
      type: file.type || 'text/plain',
      content: ''
    };

    const isTextLike = file.type.startsWith('text/') ||
      file.name.endsWith('.html') || file.name.endsWith('.htm') ||
      file.name.endsWith('.css') || file.name.endsWith('.js') ||
      file.name.endsWith('.json') || file.name.endsWith('.py') ||
      file.name.endsWith('.md') || file.name.endsWith('.txt') ||
      file.name.endsWith('.xml') || file.name.endsWith('.svg') ||
      file.name.endsWith('.csv') || file.name.endsWith('.ts');

    if (isTextLike) {
      const reader = new FileReader();
      reader.onload = function (e) {
        attachmentObj.content = e.target.result || '';
        state.selectedAttachment = attachmentObj;
      };
      reader.readAsText(file);
    } else {
      state.selectedAttachment = attachmentObj;
    }

    state.selectedAttachment = attachmentObj;
    dom.attachmentName.textContent = file.name;
    dom.attachmentPreview.style.display = 'block';
    updateSendButtonState();
  }

  function clearAttachment() {
    state.selectedAttachment = null;
    dom.fileInput.value = '';
    dom.attachmentPreview.style.display = 'none';
    updateSendButtonState();
  }

  function openSidebar() {
    dom.sidebar.classList.add('open');
    dom.sidebarBackdrop.classList.add('active');
  }

  function closeSidebarOnMobile() {
    dom.sidebar.classList.remove('open');
    dom.sidebarBackdrop.classList.remove('active');
  }

  function updateSendButtonState() {
    const hasText = dom.messageInput.value.trim().length > 0;
    const hasFile = state.selectedAttachment !== null;
    if (hasText || hasFile) {
      dom.sendBtn.classList.add('active');
    } else {
      dom.sendBtn.classList.remove('active');
    }
  }

  function autoResizeTextarea() {
    dom.messageInput.style.height = 'auto';
    dom.messageInput.style.height = Math.min(dom.messageInput.scrollHeight, 180) + 'px';
    updateSendButtonState();
  }

  function openSettings() {
    dom.settingsModal.classList.add('active');
  }

  function closeSettings() {
    dom.settingsModal.classList.remove('active');
  }

  function openNameModal() {
    dom.customAccountNameInput.value = state.settings.userName || 'Usuario';
    dom.nameModal.classList.add('active');
    dom.customAccountNameInput.focus();
  }

  function closeNameModal() {
    if (!state.settings.userName || !state.settings.userName.trim()) {
      showToast('Por favor escribe tu nombre de usuario para continuar');
      dom.customAccountNameInput.focus();
      return;
    }
    dom.nameModal.classList.remove('active');
  }

  function saveCustomName() {
    const newName = dom.customAccountNameInput.value.trim();
    if (!newName) {
      showToast('El nombre de usuario es obligatorio');
      dom.customAccountNameInput.focus();
      return;
    }
    state.settings.userName = newName;
    saveSettings();
    updateEmptyStateGreeting();
    dom.nameModal.classList.remove('active');
    showToast('¡Bienvenido, ' + newName + '!');
  }

  function toggleTheme() {
    const newTheme = state.settings.theme === 'light' ? 'dark' : 'light';
    state.settings.theme = newTheme;
    saveSettings();
    applySettings();
  }

  function clearAllHistory() {
    if (confirm('¿Estás seguro de que deseas eliminar todas las conversaciones guardadas? Esta acción no se puede deshacer.')) {
      if (state.isStreaming) stopStreaming();
      state.chats = [];
      state.activeChatId = null;
      saveChats();
      renderChatsList();
      renderChatView();
      closeSettings();
      showToast('Historial completo eliminado');
    }
  }

  document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest('.code-copy-btn');
    if (copyBtn) {
      const code = decodeURIComponent(copyBtn.getAttribute('data-code') || '');
      copyToClipboard(code);
    }


  });

  function init() {
    cacheDom();
    loadPersistedData();
    applySettings();

    if (!state.activeChatId && state.chats.length > 0) {
      state.activeChatId = state.chats[0].id;
    }

    renderChatsList();
    renderChatView();

    if (dom.messageInput) {
      dom.messageInput.addEventListener('input', autoResizeTextarea);
      dom.messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (dom.sendBtn) dom.sendBtn.addEventListener('click', () => sendMessage());
    if (dom.stopBtn) dom.stopBtn.addEventListener('click', stopStreaming);
    if (dom.newChatBtn) dom.newChatBtn.addEventListener('click', createNewChat);
    if (dom.brandBtn) dom.brandBtn.addEventListener('click', createNewChat);

    if (dom.openSidebarBtn) dom.openSidebarBtn.addEventListener('click', openSidebar);
    if (dom.closeSidebarBtn) dom.closeSidebarBtn.addEventListener('click', closeSidebarOnMobile);
    if (dom.sidebarBackdrop) dom.sidebarBackdrop.addEventListener('click', closeSidebarOnMobile);

    if (dom.searchInput) dom.searchInput.addEventListener('input', renderChatsList);

    if (dom.attachBtn && dom.fileInput) {
      dom.attachBtn.addEventListener('click', () => dom.fileInput.click());
      dom.fileInput.addEventListener('change', handleFileSelected);
    }
    if (dom.removeAttachmentBtn) dom.removeAttachmentBtn.addEventListener('click', clearAttachment);

    if (dom.micBtn) {
      dom.micBtn.addEventListener('click', function () {
        showToast('Entrada por voz lista');
      });
    }

    if (dom.userProfileWidget) dom.userProfileWidget.addEventListener('click', openNameModal);
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) editBtn.addEventListener('click', openNameModal);

    if (dom.closeNameModalBtn) dom.closeNameModalBtn.addEventListener('click', closeNameModal);
    if (dom.saveAccountNameBtn) dom.saveAccountNameBtn.addEventListener('click', saveCustomName);
    if (dom.customAccountNameInput) {
      dom.customAccountNameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          saveCustomName();
        }
      });
    }

    if (dom.themeToggleBtn) dom.themeToggleBtn.addEventListener('click', toggleTheme);
    if (dom.themeLightBtn) {
      dom.themeLightBtn.addEventListener('click', () => {
        state.settings.theme = 'light';
        saveSettings();
        applySettings();
      });
    }
    if (dom.themeDarkBtn) {
      dom.themeDarkBtn.addEventListener('click', () => {
        state.settings.theme = 'dark';
        saveSettings();
        applySettings();
      });
    }

    const handleModelSelectorTrigger = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      openModelSheet();
    };

    const selectorBtn = dom.chatModelSelectorBtn || document.getElementById('chatModelSelectorBtn');
    if (selectorBtn) {
      selectorBtn.addEventListener('click', handleModelSelectorTrigger);
    }

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('#chatModelSelectorBtn, .chat-model-selector-btn');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        openModelSheet();
      }
    });

    if (dom.closeModelSheetBtn) {
      dom.closeModelSheetBtn.addEventListener('click', closeModelSheet);
    }

    if (dom.applyModelChangesBtn) {
      dom.applyModelChangesBtn.addEventListener('click', function () {
        closeModelSheet();
        showToast('Configuración de modelo aplicada');
      });
    }

    if (dom.modelSelectModal) {
      dom.modelSelectModal.addEventListener('click', function (e) {
        if (e.target === dom.modelSelectModal) {
          closeModelSheet();
        }
      });
    }

    document.querySelectorAll('.model-card-item').forEach(card => {
      card.addEventListener('click', function (e) {
        e.stopPropagation();
        if (this.classList.contains('disabled')) return;
        const model = this.getAttribute('data-model');
        if (!model) return;
        if (!isModelAllowedForCurrentPlan(model)) {
          showToast('Modelo disponible con Plan Go ($10 USD)');
          closeModelSheet();
          openPlanModal();
          return;
        }
        updateModelSelectionUI(model);
        showToast('Modelo seleccionado: ' + model);
      });
    });

    document.querySelectorAll('.model-type-tab-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const type = this.getAttribute('data-type');
        if (type) {
          setModelTypeTab(type);
        }
      });
    });

    document.querySelectorAll('.effort-step-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const effort = this.getAttribute('data-effort');
        if (effort) setEffortLevel(effort);
      });
    });

    document.querySelectorAll('.effort-tick').forEach(tick => {
      tick.addEventListener('click', function () {
        const effort = this.getAttribute('data-effort');
        if (effort) setEffortLevel(effort);
      });
    });

    if (dom.effortSliderTrack) {
      dom.effortSliderTrack.addEventListener('click', function (e) {
        const rect = dom.effortSliderTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        if (width > 0) {
          const ratio = Math.max(0, Math.min(1, clickX / width));
          const stepIndex = Math.round(ratio * (EFFORT_STEPS.length - 1));
          setEffortLevel(EFFORT_STEPS[stepIndex]);
        }
      });
    }

    function bindCollapsibleSection(toggleBtn, container) {
      if (!toggleBtn) return;
      toggleBtn.addEventListener('click', function () {
        this.classList.toggle('collapsed');
        if (container) {
          container.classList.toggle('collapsed');
        }
      });
    }

    function bindSecretVisibilityToggle(toggleBtn, inputEl, showIcon, hideIcon) {
      if (!toggleBtn || !inputEl) return;
      toggleBtn.addEventListener('click', function () {
        const isPassword = inputEl.type === 'password';
        inputEl.type = isPassword ? 'text' : 'password';
        if (showIcon && hideIcon) {
          showIcon.classList.toggle('hidden', isPassword);
          hideIcon.classList.toggle('hidden', !isPassword);
        }
      });
    }

    bindCollapsibleSection(dom.toggleClaudeModelsBtn, dom.claudeModelsContainer);
    bindCollapsibleSection(dom.toggleOpenAiModelsBtn, dom.openAiModelsContainer);

    if (dom.toggleLegacyModelsBtn) {
      dom.toggleLegacyModelsBtn.addEventListener('click', function () {
        this.classList.toggle('expanded');
        if (dom.legacyModelsList) {
          dom.legacyModelsList.classList.toggle('expanded');
        }
      });
    }

    if (dom.openSettingsBtn) dom.openSettingsBtn.addEventListener('click', openSettings);
    if (dom.closeSettingsBtn) dom.closeSettingsBtn.addEventListener('click', closeSettings);
    if (dom.saveSettingsCloseBtn) dom.saveSettingsCloseBtn.addEventListener('click', closeSettings);

    if (dom.streamSpeedSelect) {
      dom.streamSpeedSelect.addEventListener('change', function () {
        state.settings.streamSpeed = this.value;
        saveSettings();
      });
    }

    if (dom.thinkingToggle) {
      dom.thinkingToggle.addEventListener('change', function () {
        state.settings.enableThinking = this.checked;
        saveSettings();
      });
    }

    if (dom.saveApiKeyBtn && dom.groqApiKeyInput) {
      dom.saveApiKeyBtn.addEventListener('click', function () {
        const val = dom.groqApiKeyInput.value.trim();
        state.settings.groqApiKey = val;
        saveSettings();
        updateApiKeyStatusBadge();
        showToast(val ? 'API Key de Groq guardada' : 'API Key eliminada');
      });

      dom.groqApiKeyInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          const val = dom.groqApiKeyInput.value.trim();
          state.settings.groqApiKey = val;
          saveSettings();
          updateApiKeyStatusBadge();
          showToast(val ? 'API Key de Groq guardada' : 'API Key eliminada');
        }
      });
    }

    bindSecretVisibilityToggle(dom.toggleApiKeyVisibilityBtn, dom.groqApiKeyInput, dom.eyeIconShow, dom.eyeIconHide);

    function persistNvidiaConfigFromInputs(showMessage) {
      const apiKey = dom.nvidiaApiKeyInput ? dom.nvidiaApiKeyInput.value.trim() : '';
      const proxyUrl = dom.nvidiaProxyUrlInput ? normalizeProxyUrl(dom.nvidiaProxyUrlInput.value) : '';
      state.settings.nvidiaApiKey = apiKey;
      state.settings.nvidiaProxyUrl = proxyUrl;
      if (dom.nvidiaProxyUrlInput && dom.nvidiaProxyUrlInput.value !== proxyUrl) {
        dom.nvidiaProxyUrlInput.value = proxyUrl;
      }
      saveSettings();
      updateNvidiaStatusBadge();
      if (showMessage) {
        showToast(apiKey ? 'Clave personalizada de NVIDIA guardada' : (proxyUrl ? 'Proxy NVIDIA guardado' : 'Configuración de NVIDIA API actualizada'));
      }
    }

    if (dom.saveNvidiaConfigBtn) {
      dom.saveNvidiaConfigBtn.addEventListener('click', function () {
        persistNvidiaConfigFromInputs(true);
      });
    }

    if (dom.nvidiaProxyUrlInput) {
      dom.nvidiaProxyUrlInput.addEventListener('change', function () {
        persistNvidiaConfigFromInputs(false);
      });
      dom.nvidiaProxyUrlInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          persistNvidiaConfigFromInputs(true);
        }
      });
    }

    if (dom.nvidiaApiKeyInput) {
      dom.nvidiaApiKeyInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          persistNvidiaConfigFromInputs(true);
        }
      });
    }

    bindSecretVisibilityToggle(dom.toggleNvidiaKeyVisibilityBtn, dom.nvidiaApiKeyInput, dom.eyeIconNvidiaShow, dom.eyeIconNvidiaHide);

    function persistPoeConfigFromInputs(showMessage) {
      const apiKey = dom.poeApiKeyInput ? dom.poeApiKeyInput.value.trim() : '';
      const proxyUrl = dom.poeProxyUrlInput ? normalizeProxyUrl(dom.poeProxyUrlInput.value) : '';
      state.settings.poeApiKey = apiKey;
      state.settings.poeProxyUrl = proxyUrl;
      if (dom.poeProxyUrlInput && dom.poeProxyUrlInput.value !== proxyUrl) {
        dom.poeProxyUrlInput.value = proxyUrl;
      }
      saveSettings();
      updatePoeStatusBadge();
      if (showMessage) {
        showToast(apiKey ? 'Clave personalizada de Poe API guardada' : (proxyUrl ? 'Proxy Poe guardado' : 'Configuración de Poe API actualizada'));
      }
    }

    if (dom.savePoeConfigBtn) {
      dom.savePoeConfigBtn.addEventListener('click', function () {
        persistPoeConfigFromInputs(true);
      });
    }

    if (dom.poeProxyUrlInput) {
      dom.poeProxyUrlInput.addEventListener('change', function () {
        persistPoeConfigFromInputs(false);
      });
      dom.poeProxyUrlInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          persistPoeConfigFromInputs(true);
        }
      });
    }

    if (dom.poeApiKeyInput) {
      dom.poeApiKeyInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          persistPoeConfigFromInputs(true);
        }
      });
    }

    bindSecretVisibilityToggle(dom.togglePoeKeyVisibilityBtn, dom.poeApiKeyInput, dom.eyeIconPoeShow, dom.eyeIconPoeHide);

    if (dom.clearAllChatsBtn) dom.clearAllChatsBtn.addEventListener('click', clearAllHistory);

    if (dom.settingsModal) {
      dom.settingsModal.addEventListener('click', function (e) {
        if (e.target === dom.settingsModal) {
          closeSettings();
        }
      });
    }

    if (dom.nameModal) {
      dom.nameModal.addEventListener('click', function (e) {
        if (e.target === dom.nameModal) {
          closeNameModal();
        }
      });
    }

    if (dom.openPlanModalBtn) dom.openPlanModalBtn.addEventListener('click', openPlanModal);
    if (dom.closePlanModalBtn) dom.closePlanModalBtn.addEventListener('click', closePlanModal);
    if (dom.closePlanModalFooterBtn) dom.closePlanModalFooterBtn.addEventListener('click', closePlanModal);

    if (dom.planModal) {
      dom.planModal.addEventListener('click', function (e) {
        if (e.target === dom.planModal) {
          closePlanModal();
        }
      });
    }

    if (dom.modelBannerManageBtn) {
      dom.modelBannerManageBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeModelSheet();
        openPlanModal();
      });
    }

    if (dom.activateGoPlanBtn) {
      dom.activateGoPlanBtn.addEventListener('click', startStripeGoCheckout);
    }

    if (dom.confirmStripeTestPayBtn) {
      dom.confirmStripeTestPayBtn.addEventListener('click', function () {
        activateGoPlan('');
      });
    }

    if (dom.cancelStripeTestPayBtn) {
      dom.cancelStripeTestPayBtn.addEventListener('click', function () {
        if (dom.stripeTestCheckoutBox) dom.stripeTestCheckoutBox.classList.add('hidden');
      });
    }

    if (dom.verifyPendingStripeBtn) {
      dom.verifyPendingStripeBtn.addEventListener('click', function () {
        verifyPendingStripeNow(true);
      });
    }

    if (dom.cancelPendingStripeBtn) {
      dom.cancelPendingStripeBtn.addEventListener('click', function () {
        stopStripeSessionPolling();
        clearPendingStripeSession();
        if (dom.stripePendingSessionBox) dom.stripePendingSessionBox.classList.add('hidden');
      });
    }

    if (dom.saveStripeConfigBtn) {
      dom.saveStripeConfigBtn.addEventListener('click', async function () {
        const key = dom.stripeTestSecretKeyInput ? dom.stripeTestSecretKeyInput.value.trim() : '';
        const link = dom.stripeTestPaymentLinkInput ? dom.stripeTestPaymentLinkInput.value.trim() : '';
        state.settings.stripeTestSecretKey = key;
        state.settings.stripeTestPaymentLink = link;
        saveSettings();
        updateStripeStatusBadge();
        const urls = getStripeReturnUrls();
        if (key.startsWith('sk_test_') && link.startsWith('https://buy.stripe.com/') && urls.isHttp) {
          await syncPaymentLinkRedirectDirect(key, link, urls.successUrl);
        }
        showToast('Configuración de Stripe Modo Prueba guardada');
      });
    }

    window.addEventListener('focus', function () {
      const pending = getPendingStripeSession();
      if (pending && pending.id && state.settings.plan !== 'go') {
        verifyPendingStripeNow(true, true);
      }
    });

    if (dom.switchToFreeBtn) {
      dom.switchToFreeBtn.addEventListener('click', switchToFreePlan);
    }

    if (dom.testAddCreditsBtn) {
      dom.testAddCreditsBtn.addEventListener('click', function () {
        if (state.settings.plan !== 'go') {
          state.settings.plan = 'go';
        }
        state.settings.credits = (state.settings.credits || 0) + 500;
        saveSettings();
        updateSubscriptionUI();
        showToast('+500 créditos añadidos al entorno de prueba');
      });
    }

    if (dom.testDepleteCreditsBtn) {
      dom.testDepleteCreditsBtn.addEventListener('click', function () {
        state.settings.credits = 0;
        saveSettings();
        updateSubscriptionUI();
        showToast('Créditos establecidos en 0 (prueba)');
      });
    }

    if (dom.testResetImagesBtn) {
      dom.testResetImagesBtn.addEventListener('click', function () {
        state.settings.basicImageUsed = 0;
        saveSettings();
        updateSubscriptionUI();
        showToast('Límite de imágenes básicas reiniciado');
      });
    }

    if (dom.webSearchToggleBtn && dom.webSearchPopover) {
      dom.webSearchToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const willOpen = !dom.webSearchPopover.classList.contains('open');
        dom.webSearchPopover.classList.toggle('open', willOpen);
        dom.webSearchToggleBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }

    if (dom.webSearchSwitchInput) {
      dom.webSearchSwitchInput.addEventListener('change', function () {
        state.settings.enableWebSearch = !!this.checked;
        saveSettings();
        updateWebSearchUI();
        showToast(state.settings.enableWebSearch ? 'Búsqueda en internet activada' : 'Búsqueda en internet desactivada');
      });
    }

    if (dom.webSearchPopover) {
      dom.webSearchPopover.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    document.addEventListener('click', function (e) {
      if (dom.webSearchPopover && dom.webSearchWrapper && !dom.webSearchWrapper.contains(e.target)) {
        dom.webSearchPopover.classList.remove('open');
        if (dom.webSearchToggleBtn) {
          dom.webSearchToggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    handleStripeReturnParams();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
