
// Shineray Catalão - Modal Manager
(function() {
    const init = () => {
        if (window.__modalManagerInitialized) return;
        window.__modalManagerInitialized = true;
        
        // 1. Inject Stylesheet Link (if double check needed)
        if (!document.querySelector('link[href*="modal.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'modal.css';
            document.head.appendChild(link);
        }

        // 2. Inject Modal HTML structures
        const injectModals = () => {
            if (!document.getElementById('modalSimulation')) {
            const simHTML = `
                <div class="modal-overlay" id="modalSimulation">
                    <div class="modal-container">
                        <div class="modal-close" id="closeSimBtn">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div class="modal-header">
                            <h2>Simule seu Parcelamento</h2>
                            <p>Preencha os dados abaixo e entraremos em contato com sua simulação.</p>
                        </div>
                        <form id="modalSimulationForm" class="modal-form">
                            <div class="form-group">
                                <label>Telefone / WhatsApp</label>
                                <input type="text" id="ms-telefone" placeholder="(00) 00000-0000" maxlength="15" required>
                            </div>
                            <div class="form-group">
                                <label>CPF</label>
                                <input type="text" id="ms-cpf" placeholder="000.000.000-00" maxlength="14" required>
                            </div>
                            <div class="form-group">
                                <label>Modelo de Interesse</label>
                                <select id="ms-modelo" required>
                                    <option value="Interesse Geral">Interesse Geral</option>
                                    <option value="Phoenix 50cc">Phoenix 50cc</option>
                                    <option value="Jet 50cc">Jet 50cc</option>
                                    <option value="Jet SS 125cc">Jet SS 125cc</option>
                                    <option value="Rio 125cc">Rio 125cc</option>
                                    <option value="New Jet 125cc">New Jet 125cc</option>
                                    <option value="New JEF 150cc">New JEF 150cc</option>
                                    <option value="SHI 175cc">SHI 175cc (Carburada)</option>
                                    <option value="SHI EFI 175cc">SHI EFI 175cc</option>
                                    <option value="Urban EFI 150cc">Urban EFI 150cc</option>
                                    <option value="Storm EFI 200cc">Storm EFI 200cc</option>
                                    <option value="Flash 250cc">Flash 250cc</option>
                                    <option value="Iron 250cc">Iron 250cc</option>
                                    <option value="Denver 250cc">Denver 250cc</option>
                                    <option value="Worker 125cc">Worker 125cc</option>
                                </select>
                            </div>
                            <button type="submit" class="modal-btn-submit">
                                <i class="fa-brands fa-whatsapp"></i> QUERO SIMULAR AGORA
                            </button>
                        </form>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', simHTML);
        }

        if (!document.getElementById('modalRevisao')) {
            const revHTML = `
                <div class="modal-overlay" id="modalRevisao">
                    <div class="modal-container">
                        <div class="modal-close" id="closeRevBtn">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div class="modal-header">
                            <h2>Agendar Revisão</h2>
                            <p>Mantenha sua Shineray sempre pronta para o corre.</p>
                        </div>
                        
                        <div class="revisao-summary-box">
                            <div class="summary-info">
                                <span class="summary-label">CILINDRADA</span>
                                <span class="summary-value" id="rv-cil-display">-</span>
                            </div>
                            <div class="summary-price">
                                <span class="price-label">AGENDAMENTO</span>
                                <span class="price-value" id="rv-preco-display">Consulte</span>
                            </div>
                        </div>

                        <form id="modalRevisaoForm" class="modal-form">
                            <div class="form-group">
                                <label>Nome Completo</label>
                                <input type="text" id="rv-nome" placeholder="Seu nome completo" required>
                            </div>
                            <div class="form-group">
                                <label>Telefone / WhatsApp</label>
                                <input type="text" id="rv-telefone" placeholder="(00) 00000-0000" maxlength="15" required>
                            </div>
                            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div class="form-group">
                                    <label>Data Preferencial</label>
                                    <input type="date" id="rv-data" required>
                                </div>
                                <div class="form-group">
                                    <label>Horário</label>
                                    <input type="time" id="rv-horario" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Observações</label>
                                <textarea id="rv-obs" placeholder="Descreva o que sua moto precisa (opcional)"></textarea>
                            </div>
                            <button type="submit" class="modal-btn-submit">
                                <i class="fa-brands fa-whatsapp"></i> AGENDAR REVISÃO
                            </button>
                        </form>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', revHTML);
        }
    };

    injectModals();

    // 3. Elements & Functions
    const modalSim = document.getElementById('modalSimulation');
    const modalRev = document.getElementById('modalRevisao');

    const openSimulation = (modelo) => {
        if (modalSim) {
            modalSim.classList.add('active');
            const modelInput = document.getElementById('ms-modelo');
            if (modelInput) {
                let valToSet = modelo || "Interesse Geral";
                if (valToSet === "Garantir Shineray" || valToSet === "Qualquer Modelo") {
                    valToSet = "Interesse Geral";
                }
                
                const options = Array.from(modelInput.options);
                const hasExact = options.some(opt => opt.value === valToSet);
                
                if (hasExact) {
                    modelInput.value = valToSet;
                } else {
                    const matchedOpt = options.find(opt => 
                        opt.value.toLowerCase().includes(valToSet.toLowerCase()) || 
                        valToSet.toLowerCase().includes(opt.value.toLowerCase())
                    );
                    if (matchedOpt) {
                        modelInput.value = matchedOpt.value;
                    } else {
                        modelInput.value = "Interesse Geral";
                    }
                }
            }
            document.body.style.overflow = 'hidden';
        }
    };

    const closeSimulation = () => {
        if (modalSim) {
            modalSim.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    const openRevisao = (cilindrada) => {
        if (modalRev) {
            modalRev.classList.add('active');
            document.getElementById('rv-cil-display').innerText = cilindrada || "-";
            
            // Estimates (optional, just visual)
            const priceVal = document.getElementById('rv-preco-display');
            if (cilindrada.includes('50cc')) priceVal.innerText = 'R$ 199,00';
            else if (cilindrada.includes('125')) priceVal.innerText = 'R$ 299,00';
            else priceVal.innerText = 'Consulte';

            document.body.style.overflow = 'hidden';
        }
    };

    const closeRevisao = () => {
        if (modalRev) {
            modalRev.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // 4. Input Masks
    const applyMask = (id, type) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (type === 'phone') {
                let match = val.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
                e.target.value = !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
            } else if (type === 'cpf') {
                let match = val.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
                e.target.value = !match[2] ? match[1] : match[1] + '.' + match[2] + (match[3] ? '.' + match[3] : '') + (match[4] ? '-' + match[4] : '');
            }
        });
    };

    applyMask('ms-telefone', 'phone');
    applyMask('ms-cpf', 'cpf');
    applyMask('rv-telefone', 'phone');

    // 5. Global Access
    window.openSimulationModal = openSimulation;
    window.openRevisaoModal = openRevisao;
    window.closeSimModal = closeSimulation;
    window.closeRevisaoModal = closeRevisao;

    // 6. Event Listeners for Closing
    document.getElementById('closeSimBtn')?.addEventListener('click', closeSimulation);
    document.getElementById('closeRevBtn')?.addEventListener('click', closeRevisao);
    
    window.addEventListener('click', (e) => {
        if (e.target === modalSim) closeSimulation();
        if (e.target === modalRev) closeRevisao();
    });

    // 7. Form Submissions
    document.getElementById('modalSimulationForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const tel = document.getElementById('ms-telefone').value;
        const cpf = document.getElementById('ms-cpf').value;
        const mod = document.getElementById('ms-modelo').value;
        
        const msg = `Olá, Shineray Catalão! Gostaria de simular meu parcelamento.\n\n*Telefone:* ${tel}\n*CPF:* ${cpf}\n*Modelo:* ${mod}`;
        window.open(`https://wa.me/5564999696756?text=${encodeURIComponent(msg)}`, '_blank');
        closeSimulation();
    });

    document.getElementById('modalRevisaoForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('rv-nome').value;
        const tel = document.getElementById('rv-telefone').value;
        const data = document.getElementById('rv-data').value;
        const hora = document.getElementById('rv-horario').value;
        const obs = document.getElementById('rv-obs').value;
        const cil = document.getElementById('rv-cil-display').innerText;
        
        const msg = `Olá, Shineray Catalão! Gostaria de agendar uma revisão.\n\n*Nome:* ${nome}\n*Telefone:* ${tel}\n*Data:* ${data}\n*Horário:* ${hora}\n*Cilindrada:* ${cil}\n*Obs:* ${obs}`;
        window.open(`https://wa.me/5564999696756?text=${encodeURIComponent(msg)}`, '_blank');
        closeRevisao();
    });

    // 8. Event Delegation for Triggers
    const handleTrigger = (e) => {
        // Find the nearest trigger element
        const trigger = e.target.closest('.open-modal, .btn-simulation-trigger, .card, .swiper-slide, .card-btn, .btn-revisao, .btn-primary[data-model], .btn-primary[data-modelo]');
        
        if (!trigger) return;

        // Exceptions - Don't trigger if it's already inside a modal or it's a submission button
        if (trigger.closest('.modal-container') || trigger.id === 'btnSubmitFooter' || trigger.id === 'btnSubmitForm' || trigger.getAttribute('type') === 'submit') {
            return;
        }

        // Determine if it should actually intercept
        const isManual = trigger.classList.contains('open-modal') || trigger.classList.contains('btn-simulation-trigger') || trigger.classList.contains('btn-revisao');
        const hasModelInfo = trigger.getAttribute('data-model') || trigger.getAttribute('data-modelo');
        const isCard = trigger.classList.contains('card') || trigger.classList.contains('swiper-slide');

        if (isManual || hasModelInfo || isCard) {
            // Check if clicking a link inside a non-manual trigger (like a "Saiba mais" link in a card)
            // But if the link itself is the trigger, we DO want to catch it.
            const clickedLink = e.target.closest('a');
            if (clickedLink && clickedLink !== trigger && !clickedLink.classList.contains('open-modal')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            if (trigger.classList.contains('btn-revisao')) {
                openRevisao(trigger.getAttribute('data-cilindrada') || "Consulte");
            } else {
                let modelo = trigger.getAttribute('data-model') || trigger.getAttribute('data-modelo');
                if (!modelo && isCard) {
                    const title = trigger.querySelector('.card-title') || trigger.querySelector('h3');
                    if (title) modelo = title.innerText;
                }
                openSimulation(modelo);
            }
        }
    };

    // Use both click and touchstart for better mobile response
    document.addEventListener('click', handleTrigger, { capture: true });
    // Note: touched triggers might fire click anyway, but we handle it.

  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
