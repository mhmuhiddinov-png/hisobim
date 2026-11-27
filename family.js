(function () {
  'use strict';
  const root = document.getElementById('familyRoot') || document.getElementById('familyPageRoot');
  if (!root) return;
  const main = !!window.Hisobim;
  const app = window.Hisobim;
  const config = window.HisobimFamilyConfig || {};
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words = {
    title:['Oila xarajatlari','Семейные расходы'], owner:['Egasi','Владелец'], intro:['Oila aʼzolari faqat xarajat kiritadi. Hisoblar, daromad va qoldiqlar ularga koʻrsatilmaydi.','Члены семьи вносят только расходы. Счета, доходы и остатки им не показываются.'],
    setup:['Oila bo‘limi uchun bepul maʼlumotlar xizmati hali ulanmagan.','Бесплатное хранилище для семейного раздела ещё не подключено.'],
    email:['Elektron pochta','Электронная почта'], password:['Parol','Пароль'], login:['Kirish','Войти'], signup:['Hisob yaratish','Создать аккаунт'], signout:['Chiqish','Выйти'], checkEmail:['Tasdiqlash xati yuborildi. Pochtangizni tekshiring.','Письмо для подтверждения отправлено. Проверьте почту.'],
    noRole:['Hisobingizga hali oila roli berilmagan. Egasi sizni taklif qilishi kerak.','Вашей учётной записи ещё не назначена семейная роль. Владелец должен вас пригласить.'],
    newPassword:['Yangi parol','Новый пароль'], setPassword:['Parolni saqlash','Сохранить пароль'], saved:['Saqlandi','Сохранено'],
    memberLink:['Oila uchun havola','Ссылка для семьи'], copyLink:['Havolani nusxalash','Скопировать ссылку'], copied:['Havola nusxalandi','Ссылка скопирована'],
    invite:['Oila aʼzosini taklif qilish','Пригласить члена семьи'], name:['Ism','Имя'], role:['Rol','Роль'], editor:['Xarajat kiritadi','Вносит расходы'], viewer:['Faqat oʻz yozuvlarini koʻradi','Видит только свои записи'], inviteSend:['Taklif yuborish','Отправить приглашение'], inviteDone:['Taklif xati yuborildi','Приглашение отправлено'], existingMember:['Mavjud hisob ulandi. Aʼzoga oila havolasini yuboring.','Существующий аккаунт подключён. Отправьте участнику семейную ссылку.'], members:['Aʼzolar','Участники'], disabled:['Faolsiz','Отключён'], enable:['Faollashtirish','Включить'], disable:['Kirishni toʻxtatish','Отключить доступ'],
    categories:['Xarajat guruhlari','Категории расходов'], syncCategories:['Guruhlarni yangilash','Обновить категории'], noCategories:['Egasi avval xarajat guruhlarini yangilashi kerak.','Владелец должен сначала обновить категории расходов.'],
    submit:['Xarajat kiritish','Добавить расход'], amount:['Summa (soʻm)','Сумма (сум)'], category:['Guruh','Категория'], date:['Sana','Дата'], note:['Izoh','Комментарий'], submitNow:['Yuborish','Отправить'], submitted:['Xarajat egasiga yuborildi','Расход отправлен владельцу'],
    inbox:['Kelib tushgan xarajatlar','Поступившие расходы'], myEntries:['Mening xarajatlarim','Мои расходы'], pending:['Koʻrib chiqilmoqda','На проверке'], imported:['Asosiy hisobga qoʻshildi','Добавлено в основной учёт'], rejected:['Rad etildi','Отклонено'], enteredBy:['Kiritdi','Внёс'], account:['Qaysi hisobdan','С какого счёта'], import:['Asosiy hisobga qoʻshish','Добавить в основной учёт'], markImported:['Qoʻshilgan deb belgilash','Отметить как добавленное'], reject:['Rad etish','Отклонить'], noEntries:['Hozircha yozuv yoʻq','Записей пока нет'], refresh:['Yangilash','Обновить'],
    ownerOnly:['Bu sahifa faqat xarajat kiritish uchun. Egasi asosiy Hisobim sahifasidan foydalanadi.','Эта страница предназначена только для расходов. Владелец использует основную страницу Hisobim.'],
    notConnected:['Xizmatga ulanib boʻlmadi','Не удалось подключиться к сервису']
  };
  let language = main ? app.lang() : (localStorage.getItem('hisobim-lang') === 'ru' ? 'ru' : 'uz');
  const tr = key => words[key]?.[language === 'ru' ? 1 : 0] || key;
  const today = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10); };
  const money = n => new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'uz-UZ', {maximumFractionDigits:2}).format(Number(n)) + (language === 'ru' ? ' сум' : ' soʻm');
  const categoryName = c => language === 'ru' ? c.name_ru : c.name_uz;
  const defaultNames = {food:['Oziq-ovqat','Продукты'],transport:['Transport','Транспорт'],housing:['Uy-joy','Жильё'],utilities:['Kommunal','Коммуналка'],health:['Sogʻliq','Здоровье'],fun:['Koʻngilochar','Развлечения'],other:['Boshqa','Другое'],salary:['Maosh','Зарплата'],oinc:['Boshqa daromad','Другой доход']};
  let client, session, member, members = [], categories = [], entries = [], message = '', loading = false, initialized = false;

  function roleName(role) { return tr(role === 'owner' ? 'owner' : role === 'expense_viewer' ? 'viewer' : 'editor'); }
  function statusName(status) { return tr(status === 'imported' ? 'imported' : status === 'rejected' ? 'rejected' : 'pending'); }
  function options(items, selected) { return items.map(([value,label]) => `<option value="${esc(value)}" ${value===selected?'selected':''}>${esc(label)}</option>`).join(''); }
  function authHtml() { return `<form id="familyAuthForm" class="family-form"><div class="family-grid"><label>${tr('email')}<input name="email" type="email" autocomplete="email" required></label><label>${tr('password')}<input name="password" type="password" autocomplete="current-password" minlength="8" required></label></div><div class="family-actions"><button class="primary" name="action" value="login">${tr('login')}</button><button class="ghost" name="action" value="signup">${tr('signup')}</button></div></form>`; }
  function memberHtml() { return `<div class="family-stack"><h3>${tr('members')}</h3>${members.map(m => `<div class="family-member"><div><strong>${esc(m.display_name)}</strong><small>${esc(m.email)} · ${m.active ? roleName(m.role) : tr('disabled')}</small></div>${m.role==='owner' ? '' : `<select data-member-role="${esc(m.user_id)}">${options([['expense_editor',tr('editor')],['expense_viewer',tr('viewer')]],m.role)}</select><button class="ghost" data-member-active="${esc(m.user_id)}" data-active="${m.active}">${tr(m.active?'disable':'enable')}</button>`}</div>`).join('')}</div>`; }
  function expenseHtml(item, owner) {
    const who = members.find(m => m.user_id === item.submitted_by)?.display_name || (owner ? item.submitted_by.slice(0,8) : '');
    const category = categoryName(categories.find(c => c.category_id === item.category_id) || {}) || item.category_id;
    const existing = owner && app?.getState().tx.some(x => x.id === 'family:' + item.id);
    const accounts = owner ? app.getState().accounts : [];
    return `<article class="family-entry"><strong>${esc(money(item.amount))} · ${esc(category)}</strong><small>${esc(item.expense_date)} · ${statusName(item.status)}${who ? ` · ${tr('enteredBy')}: ${esc(who)}` : ''}</small>${item.note ? `<p>${esc(item.note)}</p>` : ''}${owner && item.status==='pending' ? `<div class="family-actions"><select class="family-import-account" data-entry-id="${esc(item.id)}" aria-label="${tr('account')}">${options(accounts.map(a => [a.id,a.name]),accounts[0]?.id)}</select><button class="primary" data-import="${esc(item.id)}">${tr(existing?'markImported':'import')}</button><button class="ghost" data-reject="${esc(item.id)}">${tr('reject')}</button></div>` : ''}</article>`;
  }
  function ownerHtml() {
    const link = new URL('family.html', location.href).href;
    return `<div class="family-stack"><p>${tr('intro')}</p><div><strong>${tr('memberLink')}</strong><p><a class="family-link" href="${esc(link)}">${esc(link)}</a></p><button class="ghost" data-action="copy">${tr('copyLink')}</button></div><div class="family-divider"></div><form id="familyInviteForm" class="family-form"><h3>${tr('invite')}</h3><div class="family-grid"><label>${tr('name')}<input name="name" maxlength="80" required></label><label>${tr('email')}<input name="email" type="email" required></label></div><label>${tr('role')}<select name="role">${options([['expense_editor',tr('editor')],['expense_viewer',tr('viewer')]],'expense_editor')}</select></label><button class="primary">${tr('inviteSend')}</button></form>${memberHtml()}<div class="family-divider"></div><div><h3>${tr('categories')}</h3><button class="ghost" data-action="sync-categories">${tr('syncCategories')}</button></div><div class="family-divider"></div><div><h3>${tr('inbox')}</h3><div class="family-stack">${entries.length ? entries.map(e => expenseHtml(e,true)).join('') : `<p class="family-locked">${tr('noEntries')}</p>`}</div></div></div>`;
  }
  function contributorHtml() {
    const canSubmit = member.role === 'expense_editor';
    return `<div class="family-stack"><p>${tr('intro')}</p>${canSubmit ? `<form id="familyExpenseForm" class="family-form"><h3>${tr('submit')}</h3><div class="family-grid"><label>${tr('amount')}<input name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" required></label><label>${tr('date')}<input name="date" type="date" value="${today()}" required></label></div><label>${tr('category')}<select name="category" required>${options(categories.filter(c=>c.active).map(c=>[c.category_id,categoryName(c)]),categories[0]?.category_id)}</select></label><label>${tr('note')}<textarea name="note" maxlength="500"></textarea></label>${categories.some(c=>c.active) ? `<button class="primary">${tr('submitNow')}</button>` : `<p class="family-locked">${tr('noCategories')}</p>`}</form>` : ''}<h3>${tr('myEntries')}</h3>${entries.length ? entries.map(e=>expenseHtml(e,false)).join('') : `<p class="family-locked">${tr('noEntries')}</p>`}</div>`;
  }
  function render() {
    language = main ? app.lang() : language;
    if (!main) { document.documentElement.lang=language; document.title='Hisobim — '+tr('title'); }
    if (main && $('familyPendingBadge')) { const pending=member?.role==='owner' ? entries.filter(x=>x.status==='pending').length : 0; $('familyPendingBadge').hidden=!pending; $('familyPendingBadge').textContent=String(pending); }
    if ($('familyLang')) $('familyLang').value = language;
    let body = `<h2>${tr('title')}</h2>`;
    if (!config.url || !config.key) body += `<p class="family-locked">${tr('setup')}</p>`;
    else if (!client || loading) body += `<p class="family-locked">${tr('refresh')}…</p>`;
    else if (!session) body += authHtml();
    else if (!member?.active) body += `<p class="family-locked">${tr('noRole')}</p>`;
    else if (main && member.role === 'owner') body += ownerHtml();
    else if (!main && member.role === 'owner') body += `<p>${tr('ownerOnly')}</p>`;
    else if (!main) body += contributorHtml();
    else body += `<p><a class="family-link" href="family.html">${tr('submit')}</a></p>`;
    if (session) body += `<div class="family-divider"></div><form id="familyPasswordForm" class="family-actions"><label>${tr('newPassword')} <input name="password" type="password" minlength="8" autocomplete="new-password" required></label><button class="ghost">${tr('setPassword')}</button></form><p><button class="ghost" data-action="signout">${tr('signout')}</button></p>`;
    body += `<p class="family-status" role="status">${esc(message)}</p>`;
    root.innerHTML = body;
  }
  async function loadSdk() {
    if (window.supabase?.createClient) return;
    await new Promise((resolve,reject) => { const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'; s.onload=resolve; s.onerror=reject; document.head.appendChild(s); });
    if (!window.supabase?.createClient) throw Error(tr('notConnected'));
  }
  async function refresh(force=false) {
    if (!client || loading) return;
    loading=true;
    try {
      session = (await client.auth.getSession()).data.session;
      if (!session) { member=null; members=[]; categories=[]; entries=[]; }
      else {
        const [m,c,e] = await Promise.all([
          client.from('family_members').select('*').eq('user_id',session.user.id).maybeSingle(),
          client.from('family_categories').select('*').order(language === 'ru' ? 'name_ru' : 'name_uz'),
          client.from('family_expenses').select('*').order('created_at',{ascending:false}).limit(200),
        ]);
        if (m.error || c.error || e.error) throw Error(m.error?.message || c.error?.message || e.error?.message);
        member=m.data; categories=c.data||[]; entries=e.data||[];
        if (main && member?.role==='owner' && member.active) {
          const list=await client.from('family_members').select('*').order('created_at');
          if (list.error) throw Error(list.error.message);
          members=list.data||[];
          if (!initialized) { initialized=true; await syncCategories(false); }
        }
      }
    } catch (err) { message=err.message || tr('notConnected'); }
    finally { loading=false; if (!root.contains(document.activeElement) || !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) render(); }
  }
  async function syncCategories(showMessage=true) {
    if (!main || member?.role!=='owner') return;
    const rows=app.getState().groups.filter(g=>g.type==='expense').map(g=>({category_id:g.id,name_uz:g.name||defaultNames[g.id]?.[0]||app.groupName(g.id),name_ru:g.name||defaultNames[g.id]?.[1]||app.groupName(g.id),active:true,updated_at:new Date().toISOString()}));
    if (!rows.length) return;
    const result=await client.from('family_categories').upsert(rows,{onConflict:'category_id'});
    if (result.error) throw Error(result.error.message);
    if (showMessage) message=tr('saved');
  }
  async function act(task) {
    if (!client) return;
    message='';
    try { await task(); await refresh(true); render(); }
    catch(err) { message=err.message || tr('notConnected'); render(); }
  }
  root.addEventListener('submit',e=>{
    e.preventDefault();
    const form=e.target, fd=new FormData(form);
    if (form.id==='familyAuthForm') act(async()=>{
      const email=String(fd.get('email')||'').trim(),password=String(fd.get('password')||'');
      const signup=e.submitter?.value==='signup';
      const result=signup?await client.auth.signUp({email,password,options:{emailRedirectTo:new URL('family.html',location.href).href}}):await client.auth.signInWithPassword({email,password});
      if (result.error) throw Error(result.error.message);
      if (signup && !result.data.session) message=tr('checkEmail');
    });
    else if (form.id==='familyPasswordForm') act(async()=>{const result=await client.auth.updateUser({password:String(fd.get('password')||'')});if(result.error)throw Error(result.error.message);message=tr('saved')});
    else if (form.id==='familyExpenseForm') act(async()=>{const amount=Number(fd.get('amount'));if(!(amount>0)||!Number.isFinite(amount))return;const result=await client.from('family_expenses').insert({amount,expense_date:fd.get('date'),category_id:fd.get('category'),note:String(fd.get('note')||'').trim()});if(result.error)throw Error(result.error.message);message=tr('submitted')});
    else if (form.id==='familyInviteForm') act(async()=>{const result=await client.functions.invoke('invite-family-member',{body:{email:String(fd.get('email')||'').trim(),display_name:String(fd.get('name')||'').trim(),role:fd.get('role')}});if(result.error)throw Error(result.data?.error || result.error.message);if(result.data?.error)throw Error(result.data.error);message=tr(result.data?.existing?'existingMember':'inviteDone')});
  });
  root.addEventListener('click',e=>{
    const button=e.target.closest('button[data-action],button[data-import],button[data-reject],button[data-member-active]');
    if (!button) return;
    if (button.dataset.action==='signout') act(async()=>{const r=await client.auth.signOut();if(r.error)throw Error(r.error.message)});
    if (button.dataset.action==='copy') act(async()=>{await navigator.clipboard.writeText(new URL('family.html',location.href).href);message=tr('copied')});
    if (button.dataset.action==='sync-categories') act(async()=>syncCategories());
    if (button.dataset.memberActive) act(async()=>{const r=await client.from('family_members').update({active:button.dataset.active!=='true'}).eq('user_id',button.dataset.memberActive);if(r.error)throw Error(r.error.message)});
    if (button.dataset.reject) act(async()=>{const r=await client.from('family_expenses').update({status:'rejected',reviewed_by:session.user.id,reviewed_at:new Date().toISOString()}).eq('id',button.dataset.reject).eq('status','pending');if(r.error)throw Error(r.error.message)});
    if (button.dataset.import) act(async()=>{
      const item=entries.find(x=>x.id===button.dataset.import), account=root.querySelector(`.family-import-account[data-entry-id="${button.dataset.import}"]`)?.value;
      if (!item || !account || !app.getState().accounts.some(a=>a.id===account) || !app.getState().groups.some(g=>g.id===item.category_id&&g.type==='expense')) throw Error(tr('noCategories'));
      const id='family:'+item.id;
      if (!app.getState().tx.some(x=>x.id===id)) {
        const who=members.find(m=>m.user_id===item.submitted_by);
        app.mergeBackup({accounts:[],groups:[],plans:[],tx:[{id,type:'expense',amt:Number(item.amount),acc:account,grp:item.category_id,date:item.expense_date,note:item.note||'',enteredBy:who?.display_name||'',submittedById:item.submitted_by,u:Date.now()}]});
      }
      const r=await client.from('family_expenses').update({status:'imported',reviewed_by:session.user.id,reviewed_at:new Date().toISOString()}).eq('id',item.id).eq('status','pending');
      if (r.error) throw Error(r.error.message);
    });
  });
  root.addEventListener('change',e=>{if (!e.target.dataset.memberRole)return;act(async()=>{const r=await client.from('family_members').update({role:e.target.value}).eq('user_id',e.target.dataset.memberRole);if(r.error)throw Error(r.error.message)})});
  if ($('familyLang')) $('familyLang').onchange=()=>{language=$('familyLang').value;localStorage.setItem('hisobim-lang',language);render()};
  if (main) $('lang').addEventListener('change',()=>{language=app.lang();render()});
  render();
  if (!config.url || !config.key) return;
  loadSdk().then(async()=>{
    client=window.supabase.createClient(config.url,config.key,{auth:{storageKey:'hisobim-family-auth',detectSessionInUrl:true}});
    client.auth.onAuthStateChange(()=>setTimeout(()=>refresh(),0));
    await refresh(); render();
    window.addEventListener('focus',()=>refresh());
    setInterval(()=>{if(!document.hidden)refresh()},30000);
  }).catch(err=>{message=err.message||tr('notConnected');render()});
})();
