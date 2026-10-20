'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const info={
sheriff:['보안관','무법자와 배신자를 모두 제거','나머지 역할은 모르는 채 시작해요. 생명과 최대 생명이 인물보다 1 많아요. 부관을 직접 제거하면 손패와 장착 카드를 모두 버려요.','부관과 함께 이겨요.'],
deputy:['부관','보안관을 보호하며 무법자와 배신자를 처단','정체는 비밀이에요. 무법자와 배신자가 모두 탈락하면 보안관과 함께 이겨요.','먼저 탈락해도 팀이 이기면 승리해요.'],
outlaw:['무법자','보안관을 제거','보안관이 죽는 순간 무법자 팀이 이겨요. 단, 배신자만 살아남은 경우는 배신자 승리예요.','이미 모든 무법자가 탈락했어도 승리할 수 있어요.'],
renegade:['배신자','마지막 한 명으로 생존','보안관이 죽으면 게임이 즉시 끝나요. 다른 사람을 먼저 제거하고 보안관과 마지막 대결을 해야 해요.','보안관을 너무 일찍 제거하면 무법자가 이겨요.'],
bang:['뱅!','사거리 안의 한 명에게 피해 1','내 무기의 사거리 안에 있는 한 명을 골라 사용해요. 상대가 빗나감!으로 막기하지 못하면 생명 1을 잃어요.','내 턴에 1장만 사용. 볼캐닉·윌리 더 키드는 예외예요.'],
missed:['빗나감!','나에게 온 공격 1회 막기','뱅! 또는 기관총의 공격을 받았을 때 즉시 사용해요. 내 턴이 아니어도 돼요. 다른 사람을 대신 지킬 수는 없어요.','인디언과 결투에는 사용할 수 없어요. 슬랩 더 킬러의 뱅!은 막기 효과 2회가 필요해요.'],
beer:['맥주','내 생명 1 회복','내 턴에 사용하거나, 치명적인 피해로 생명이 0 이하가 되는 순간 즉시 사용해요. 최대 생명을 넘길 수 없고 다른 사람에게 줄 수 없어요.','2명만 살아 있으면 효과 없음. 내 턴 밖에서는 단순한 부상을 회복할 수 없어요. 다이너마이트 피해에는 생명이 1 이상이 되도록 필요한 수만큼 써야 해요.'],
saloon:['주점','모든 생존자의 생명 1 회복','나를 포함한 모두가 생명 1을 회복해요. 각자의 최대 생명은 넘지 못해요.','내 턴에만 사용해요. 생명이 0이 되는 순간 맥주 대신 사용할 수 없어요. 2명만 남아도 효과가 있어요.'],
stagecoach:['역마차','카드 2장 추가로 뽑기','내 턴의 카드 사용 단계에 더미 위에서 2장을 손패로 가져와요.','턴 시작에 뽑는 2장과 별개예요.'],
'wells-fargo':['웰스 파고 은행','카드 3장 추가로 뽑기','내 턴의 카드 사용 단계에 더미 위에서 3장을 손패로 가져와요.','턴을 끝낼 때는 현재 생명만큼만 손패를 남겨요.'],
'general-store':['잡화점','모두 1장씩 골라 가져가기','생존자 수만큼 카드 더미 위의 카드를 펼쳐요. 나부터 시계 방향으로 한 명씩 원하는 1장을 손패로 가져가요.','나도 1장 가져가요.'],
panic:['강탈!','거리 1인 상대의 카드 1장 가져오기','상대 손패에서 보지 않고 무작위 1장을 가져오거나, 상대 앞에 공개된 카드 1장을 골라 내 손패로 가져와요.','무기의 사거리는 적용하지 않아요. 조준경·야생마·거리 관련 인물 능력은 적용해요. 가져온 장비는 다시 사용해야 장착돼요.'],
'cat-balou':['캣 벌로우','누군가의 카드 1장 버리기','거리와 관계없이 상대 손패의 무작위 1장 또는 상대 앞에 공개된 카드 1장을 골라 버려요.','손패는 미리 보고 고를 수 없어요.'],
gatling:['기관총','나를 제외한 모두에게 공격','거리와 관계없이 다른 생존자 모두에게 뱅! 효과를 1회씩 줘요. 각자 빗나감! 또는 술통으로 막기할 수 있어요.','뱅! 카드가 아니므로 뱅! 1장 제한에 포함되지 않아요. 슬랩 더 킬러의 2회 막기 능력도 적용되지 않아요.'],
indians:['인디언!','모두 뱅!을 버리거나 피해 1','나를 제외한 모든 생존자는 뱅! 1장을 버려야 해요. 버리지 못하거나 버리지 않으면 생명 1을 잃어요.','빗나감!과 술통으로 막을 수 없어요. 대응으로 버린 뱅!은 턴의 1장 제한에 포함되지 않아요.'],
duel:['결투','뱅!을 번갈아 버리는 대결','거리와 관계없이 한 명을 지목해요. 지목당한 사람부터 뱅!을 1장 버리고, 나와 상대가 번갈아 버려요. 먼저 버리지 못하거나 포기한 사람이 생명 1을 잃고 끝나요.','빗나감!과 술통 사용 불가. 이때 버리는 뱅!은 턴의 1장 제한에 포함되지 않아요.'],
'colt-45':['콜트 45','기본 무기 · 사거리 1','장착 무기가 없어도 언제나 사거리 1의 콜트 45를 갖고 있어요. 장착한 무기를 잃으면 다시 콜트 45로 돌아와요.','별도 플레이 카드가 아니며 강탈·버리기의 대상이 될 수 없어요.'],
volcanic:['볼캐닉','사거리 1 · 뱅! 횟수 제한 해제','내 앞에 장착해 두면 내 턴에 뱅! 카드를 원하는 만큼 사용할 수 있어요. 같은 상대 또는 여러 상대를 공격해도 돼요.','사거리는 1이에요. 거리 보정은 정상 적용해요.'],
schofield:['스코필드','무기 · 사거리 2','뱅!으로 최종 거리 2 이하인 상대를 공격할 수 있어요.','새 무기를 놓으면 기존 장착 무기를 버려요.'],
remington:['레밍턴','무기 · 사거리 3','뱅!으로 최종 거리 3 이하인 상대를 공격할 수 있어요.','무기는 거리 자체나 강탈의 거리 제한을 바꾸지 않아요.'],
'rev-carabine':['카빈','무기 · 사거리 4','뱅!으로 최종 거리 4 이하인 상대를 공격할 수 있어요.','장착 가능한 무기는 하나뿐이에요.'],
winchester:['윈체스터','무기 · 사거리 5','뱅!으로 최종 거리 5 이하인 상대를 공격할 수 있어요.','장착해도 뱅! 1장 제한은 그대로예요.'],
mustang:['야생마','다른 사람이 나를 볼 때 거리 +1','내 앞에 장착하면 다른 사람이 나까지 세는 거리에 1을 더해요. 내가 다른 사람을 보는 거리는 그대로예요.','폴 리그레트 능력과 함께 있으면 나까지 거리 +2예요.'],
scope:['조준경','내가 다른 사람을 볼 때 거리 −1','내 앞에 장착하면 내가 다른 사람까지 세는 거리에 1을 빼요. 최종 거리는 최소 1이에요.','다른 사람이 나를 보는 거리는 그대로. 로즈 둘란 능력과 함께라면 −2예요.'],
barrel:['술통','하트 판정이면 공격 막기','뱅! 효과의 대상이 되면 더미 맨 위 1장을 뒤집어 판정해요. 하트면 막기. 판정 카드는 버려요. 실패해도 빗나감!을 사용할 수 있어요.','공격마다 1번 판정. 인디언·결투는 못 막아요. 술통 카드는 판정 후에도 앞에 남아요.'],
jail:['감옥','상대의 다음 턴을 건너뛰게 하기','보안관을 제외한 한 명의 앞에 놓아요. 거리는 무관해요. 그 사람의 턴 시작에 판정: 하트면 정상 진행, 아니면 턴을 건너뛰어요. 결과와 상관없이 감옥은 버려요.','감옥에 있어도 공격 대상이 되며 빗나감!·치명상 맥주 등으로 대응할 수 있어요.'],
dynamite:['다이너마이트','스페이드 2–9면 피해 3','내 앞에 놓아요. 다음 내 턴 시작에 판정해 스페이드 2부터 9까지면 폭발: 카드를 버리고 생명 3을 잃어요. 그 외에는 왼쪽 다음 생존자에게 넘겨요.','감옥보다 먼저 판정. 특정 플레이어가 준 피해가 아니므로 제거 보상·벌칙이 없어요.'],
'bart-cassidy':['바트 캐시디','생명 1을 잃을 때마다 카드 1장','피해로 생명을 잃을 때마다 더미에서 1장을 손패로 뽑아요.','시작 생명 4. 잃은 생명 수만큼 뽑아요.'],
'black-jack':['블랙 잭','두 번째 뽑은 카드가 빨간 무늬면 1장 더','턴 시작에 뽑는 두 번째 카드를 공개해요. 하트나 다이아몬드라면 추가로 1장을 뽑아요. 추가 카드는 공개하지 않아요.','시작 생명 4. 카드 사용 단계의 추가 뽑기에는 적용하지 않아요.'],
'calamity-janet':['캘러미티 자넷','뱅! ↔ 빗나감! 서로 바꿔 사용','뱅!을 빗나감!으로, 빗나감!을 뱅!으로 사용할 수 있어요.','시작 생명 4. 빗나감!을 뱅!으로 공격했다면 내 턴의 뱅! 1장 사용으로 세어요.'],
'el-gringo':['엘 그링고','다른 사람에게 피해를 받으면 손패 가져오기','다른 사람이 사용한 카드로 생명을 잃을 때마다 그 사람 손패에서 무작위 1장을 가져와요.','시작 생명 3. 상대 손패가 없으면 가져오지 못해요. 다이너마이트에는 적용되지 않아요.'],
'jesse-jones':['제시 존스','첫 뽑기를 상대 손패에서 할 수 있어요','턴 시작 첫 번째 카드를 더미 대신 다른 사람 손패에서 무작위로 가져올 수 있어요. 두 번째는 더미에서 뽑아요.','시작 생명 4. 거리에 관계없어요.'],
jourdonnais:['주르도네','항상 술통 능력을 가져요','뱅! 효과를 받으면 하트 판정으로 막기할 수 있어요. 실제 술통까지 장착하면 두 번 판정할 수 있어요.','시작 생명 4. 판정에 실패한 뒤 빗나감!을 써도 돼요.'],
'kit-carlson':['키트 칼슨','위에서 3장을 보고 2장 선택','턴 시작 뽑기에서 더미 위 3장을 확인해 원하는 2장을 손패로 가져와요. 나머지 1장은 더미 맨 위에 뒷면으로 돌려놔요.','시작 생명 4. 나머지 카드를 버리는 것이 아니에요.'],
'lucky-duke':['럭키 듀크','판정할 때 2장 중 결과 선택','술통·감옥·다이너마이트 등의 판정을 할 때 위에서 2장을 뒤집어 원하는 결과 1개를 선택해요. 두 장 모두 버려요.','시작 생명 4. 손패로 2장을 뽑는 능력이 아니에요.'],
'paul-regret':['폴 리그레트','다른 사람이 나를 볼 때 항상 거리 +1','항상 야생마를 가진 것처럼 취급해요. 실제 야생마를 장착하면 거리 +2가 돼요.','시작 생명 3. 내가 다른 사람을 보는 거리는 그대로예요.'],
'pedro-ramirez':['페드로 라미레즈','첫 뽑기를 버린 더미에서 할 수 있어요','턴 시작 첫 번째 카드를 뽑는 더미 대신 버린 더미 맨 위에서 가져올 수 있어요. 두 번째는 뽑는 더미에서 뽑아요.','시작 생명 4. 버린 더미가 비었으면 뽑는 더미를 사용해요.'],
'rose-doolan':['로즈 둘란','내가 다른 사람을 볼 때 항상 거리 −1','항상 조준경을 가진 것처럼 취급해요. 실제 조준경을 장착하면 −2예요. 최종 거리는 최소 1이에요.','시작 생명 4. 다른 사람이 나를 보는 거리는 그대로예요.'],
'sid-ketchum':['시드 케첨','손패 2장을 버려 생명 1 회복','언제든 손패 2장을 버려 생명 1을 회복할 수 있어요. 여러 번 써도 되지만 최대 생명은 넘길 수 없어요.','시작 생명 4. 치명상 때나 2명만 남았을 때도 능력을 사용할 수 있어요.'],
'slab-the-killer':['슬랩 더 킬러','내 뱅!은 막기 효과 2회 필요','내 뱅! 카드 공격을 막으려면 상대는 빗나감! 2장을 사용해야 해요. 술통 판정 성공은 빗나감! 1장으로 세어요.','시작 생명 4. 1회만 막기하면 여전히 피해 1. 기관총에는 적용하지 않아요.'],
'suzy-lafayette':['수지 라파예트','손패가 없으면 카드 1장','손패가 0장이 되면 카드 더미에서 1장을 뽑아요. 결투 중에는 결투가 끝난 후에 능력을 처리해요.','시작 생명 4. 마지막 손패로 잡화점을 사용했다면 잡화점 효과부터 마쳐요. 잡화점에서 받은 카드가 있으므로 추가로 뽑지 않아요.'],
'vulture-sam':['벌처 샘','탈락한 사람의 카드를 모두 가져오기','누군가 탈락하면 그 사람의 손패와 앞에 놓인 카드를 모두 내 손패로 가져와요.','시작 생명 4. 가져온 장비는 자동 장착되지 않아요.'],
'willy-the-kid':['윌리 더 키드','내 턴에 뱅!을 원하는 만큼','내 턴에 뱅! 카드를 여러 장 사용할 수 있어요.','시작 생명 4. 사거리 제한은 그대로 적용해요.']
};
// Local preview uses the existing sprites. Set false for text-only card rendering.
const USE_CARD_IMAGES = true;
const englishNames={sheriff:'Sheriff',deputy:'Deputy',outlaw:'Outlaw',renegade:'Renegade',bang:'Bang!',missed:'Missed!',beer:'Beer',saloon:'Saloon',stagecoach:'Stagecoach','wells-fargo':'Wells Fargo','general-store':'General Store',panic:'Panic!','cat-balou':'Cat Balou',gatling:'Gatling',indians:'Indians!',duel:'Duel','colt-45':'Colt .45',volcanic:'Volcanic',schofield:'Schofield',remington:'Remington','rev-carabine':'Rev. Carabine',winchester:'Winchester',mustang:'Mustang',scope:'Scope',barrel:'Barrel',jail:'Jail',dynamite:'Dynamite','bart-cassidy':'Bart Cassidy','black-jack':'Black Jack','calamity-janet':'Calamity Janet','el-gringo':'El Gringo','jesse-jones':'Jesse Jones',jourdonnais:'Jourdonnais','kit-carlson':'Kit Carlson','lucky-duke':'Lucky Duke','paul-regret':'Paul Regret','pedro-ramirez':'Pedro Ramirez','rose-doolan':'Rose Doolan','sid-ketchum':'Sid Ketchum','slab-the-killer':'Slab the Killer','suzy-lafayette':'Suzy Lafayette','vulture-sam':'Vulture Sam','willy-the-kid':'Willy the Kid'};
const categories={공격:['bang','gatling','indians','duel'],막기:['missed','barrel'],'회복·뽑기':['beer','saloon','stagecoach','wells-fargo','general-store'],방해:['panic','cat-balou','jail'],'설치(무기·장비)':['colt-45','volcanic','schofield','remington','rev-carabine','winchester','mustang','scope','dynamite'],인물:Object.keys(info).slice(27),역할:['sheriff','deputy','outlaw','renegade']};
const cardCategories=Object.fromEntries(Object.entries(categories).flatMap(([category,keys])=>keys.map(key=>[key,category])));
const fullName=key=>(key==='bang'?'뱅! 카드':info[key][0])+'('+englishNames[key]+')';
const modes=['home','intro','intro-identity','learn','setup-types','setup','turn','combat','extra','end','cards'];
let cards=[],filter='전체',mode='home',count=4,homeSelected=false;
const nums=()=>({sheriff:1,deputy:count===4?0:count===7?2:1,outlaw:count>=6?3:2,renegade:1});
const roleNames={sheriff:'보안관',deputy:'부관',outlaw:'무법자',renegade:'배신자'};
function image(c){
  const el=document.createElement('span');
  if(!USE_CARD_IMAGES||!c.rect){el.className='text-card';const icon=document.createElement('span'),name=document.createElement('b'),brief=document.createElement('small');icon.textContent=c.group==='역할'?'★':c.group==='인물'?'♟':cardCategories[c.key]==='막기'?'♥':'♠';icon.setAttribute('aria-hidden','true');name.textContent=fullName(c.key);brief.textContent=info[c.key][1];el.append(icon,name,brief);return el;}
  const r=c.rect;el.className='card-image';el.setAttribute('role','img');el.setAttribute('aria-label',fullName(c.key)+' 한글판 카드');el.style.aspectRatio=r.width+'/'+r.height;el.style.backgroundSize=(3200/r.width*100)+'% '+(9360/r.height*100)+'%';el.style.backgroundPosition=(r.x/(3200-r.width)*100)+'% '+(r.y/(9360-r.height)*100)+'%';return el;
}
function place(sel,key){const c=cards.find(c=>c.key===key);if(c&&$(sel))$(sel).replaceChildren(image(c));}
let cardsReturn={mode:'learn',top:0};
try{const saved=JSON.parse(sessionStorage.getItem('bang-cards-return'));if(saved&&['learn','setup-types','setup','turn','combat','extra','end'].includes(saved.mode)&&Number.isFinite(saved.top))cardsReturn=saved;}catch{}
$('#cards-return').onclick=()=>{const destination={...cardsReturn};setMode(destination.mode,false);requestAnimationFrame(()=>window.scrollTo({top:destination.top,behavior:'instant'}));};
function setMode(next,scroll=true,push=true){
  if(next==='play')next='cards';
  if(!modes.includes(next))next='home';
  if(next==='cards'&&['learn','setup-types','setup','turn','combat','extra','end'].includes(mode)){cardsReturn={mode,top:window.scrollY};try{sessionStorage.setItem('bang-cards-return',JSON.stringify(cardsReturn));}catch{}}
  const changed=mode!==next;mode=next;const home=next==='home';const introduction=next==='intro'||next==='intro-identity';document.body.classList.toggle('intro-active',introduction);$('#home').hidden=!home;$('.masthead').hidden=home;$('.mode-nav').hidden=home||introduction;$('footer').hidden=home||introduction;$$('.view').forEach(v=>v.hidden=v.id!==next);
  const active=['learn','setup-types','setup','turn','combat','extra','end'].includes(next)?'learn':next;
  $$('.mode-nav [data-mode]').forEach(b=>{if(b.dataset.mode===active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  if(push&&changed)history.pushState({mode:next},'','#'+next);
  if(scroll)window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  updateLessonProgress(next);
  if(changed){const target=document.getElementById(next);if(target){target.classList.remove('scene-enter');void target.offsetWidth;target.classList.add('scene-enter');}if(introduction){window.scrollTo({top:0,behavior:'instant'});document.getElementById(next==='intro'?'intro-title':'intro-identity').focus({preventScroll:true});}}
  if(changed&&next!=='learn')roleIntroController?.abort();
  if(changed&&next!=='setup')setupDealController?.abort();
  if(changed&&next==='learn'&&document.querySelectorAll('#roles .role').length===4)playRoleIntro();
  if(changed&&next==='setup-types')showCardType(0,false);
  if(changed&&next==='setup')showSetupStep(0);
  if(changed&&lessonPresentationsReady&&['setup-types','setup'].includes(next))openLessonPresentation(next);
  if(next==='cards')renderCards();
}
window.addEventListener('popstate',()=>setMode(location.hash.slice(1),false,false));
window.addEventListener('hashchange',()=>setMode(location.hash.slice(1),false,false));
$$('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$$('[data-jump]').forEach(b=>b.onclick=()=>setMode(b.dataset.jump));$('.brand').onclick=e=>{e.preventDefault();setMode('home');};$('#home-back').onclick=()=>setMode('home');$('#start').onclick=()=>setMode('intro');
function updateRoleCounts(){renderWholeSetup();if(document.getElementById('setup-film-seats'))renderSetupFilm();const n=nums();$$('#roles .role').forEach(r=>{const key=r.dataset.role;r.querySelector('h3').textContent=roleNames[key]+' ('+n[key]+'명)';});$('#setup-role-count').textContent='인원에 맞는 역할 카드만 골라 섞어서 한 장씩 나눠요.';}
function players(n,reveal=false,focusId=null){count=n;if(reveal)homeSelected=true;try{localStorage.setItem('bang-players',n);}catch{}for(const id of ['players','home-players']){$('#'+id).replaceChildren();for(let i=4;i<=7;i++){const b=document.createElement('button');b.textContent=i+'명';b.dataset.players=i;b.setAttribute('aria-pressed',i===n&&(id==='players'||homeSelected));b.onclick=()=>players(i,id==='home-players',id);$('#'+id).append(b);}}
  updateRoleCounts();$('#home-composition').replaceChildren();Object.entries(nums()).forEach(([key,n],i)=>{const s=document.createElement('span');s.textContent=roleNames[key]+' '+n+'명';$('#home-composition').append(s);});$('#home-summary').hidden=!homeSelected;$('#home-summary').style.setProperty('--pointer',((n-4)*26+7)+'%');if(focusId)$('#'+focusId+' [data-players="'+n+'"]').focus();
}
function openCard(key){
  const c=cards.find(x=>x.key===key);if(!c)return;
  const d=info[key],isRole=c.group==='역할';
  const wrap=document.createElement('div'),brief=document.createElement('p'),pic=image(c),label=document.createElement('p'),h=document.createElement('h2'),text=document.createElement('div'),note=document.createElement('p');
  brief.className='dialog-summary';brief.textContent=(isRole?'목표: ':'')+d[1];
  pic.classList.add('dialog-card');label.className='dialog-label';label.textContent=c.group;
  h.id='dialog-title';h.textContent=isRole?roleNames[key]:fullName(key);
  text.className='dialog-detail';
  if(key==='sheriff'){
    const heading=document.createElement('b');heading.textContent='보안관 주요 규칙';
    const list=document.createElement('ul');
    const sheriffRules=[
      '보안관만 역할 카드를 공개해요.',
      '생명을 인물카드에 적힌 것보다 1개 더 받습니다.',
      '보안관이 탈락하면 게임이 즉시 끝나요.'
    ];
    sheriffRules.forEach((rule,i)=>{const li=document.createElement('li');if(i<3){const strong=document.createElement('strong');strong.textContent=rule;li.append(strong);li.className='essential-rule';}else li.textContent=rule;list.append(li);});
    text.append(heading,list);
  }else{text.textContent=d[2]+(d[3]?' '+d[3]:'');}
  note.className='dialog-note';note.textContent=d[3];
  if(isRole)wrap.append(label,h,pic,brief,text);else wrap.append(brief,pic,label,h,text);

  $('#dialog-body').replaceChildren(wrap);$('#card-dialog').setAttribute('aria-labelledby','dialog-title');if(!$('#card-dialog').open)$('#card-dialog').showModal();
}
$$('[data-card]').forEach(b=>b.onclick=e=>{e.stopPropagation();openCard(b.dataset.card);});$('#close-dialog').onclick=()=>$('#card-dialog').close();$('#card-dialog').onclick=e=>{if(e.target===$('#card-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}};
const normalize=s=>s.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
for(const f of ['전체',...Object.keys(categories)]){const b=document.createElement('button');b.textContent=f;b.setAttribute('aria-pressed',f===filter);b.onclick=()=>{filter=f;$$('#filters button').forEach(x=>x.setAttribute('aria-pressed',x.textContent===f));renderCards();};$('#filters').append(b);}
function renderCards(){const q=normalize($('#search').value);const list=cards.filter(c=>(filter==='전체'||cardCategories[c.key]===filter)&&(!q||normalize(info[c.key][0]+englishNames[c.key]+c.key+info[c.key][1]+(info[c.key][1].includes('뽑')?'카드 뽑기':'' )).includes(q)));$('#card-grid').replaceChildren();for(const c of list){const b=document.createElement('button'),name=document.createElement('b'),desc=document.createElement('small');b.className='index-card';b.append(image(c));name.textContent=fullName(c.key);desc.textContent=info[c.key][1];b.append(name,desc);b.setAttribute('aria-label',fullName(c.key)+' 설명 보기');b.onclick=()=>openCard(c.key);$('#card-grid').append(b);}$('#card-count').textContent=list.length+'종';$('#no-cards').hidden=list.length>0;}
$('#search').oninput=renderCards;$('#character-guide-link').onclick=e=>{e.preventDefault();filter='인물';$('#search').value='';$$('#filters button').forEach(b=>b.setAttribute('aria-pressed',b.textContent==='인물'));setMode('cards');};
let toastTimer;function toast(t){$('#toast').textContent=t;$('#toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').style.display='none',3000);}
async function init(){try{const res=await fetch('assets/cards.json');if(!res.ok)throw Error();const data=await res.json();if(!Array.isArray(data.cards)||!data.cards.length)throw Error();cards=data.cards.filter(c=>info[c.key]);}catch{cards=Object.keys(info).map(key=>({key,name:info[key][0],group:cardCategories[key]==='역할'?'역할':cardCategories[key]==='인물'?'인물':['colt-45','volcanic','schofield','remington','rev-carabine','winchester'].includes(key)?'무기':['mustang','scope','barrel','jail','dynamite'].includes(key)?'장비':'일반'}));toast('카드 이미지를 불러오지 못해 텍스트로 보여드려요.');}
  for(const [sel,key] of [['#setup-character','bart-cassidy'],['#setup-character-detail','bart-cassidy'],['#setup-weapon','colt-45'],['#bang-example','bang'],['#missed-example','missed'],['#barrel-example','barrel'],['#gatling-example','gatling'],['#indians-example','indians'],['#duel-example','duel'],['#recovery-beer','beer'],['#recovery-sid','sid-ketchum'],['#recovery-saloon','saloon'],['#range-weapon-example','schofield'],['#brown-card-example','bang'],['#blue-card-example','barrel'],['#basic-stagecoach','stagecoach'],['#basic-wells-fargo','wells-fargo'],['#basic-panic','panic'],['#basic-cat-balou','cat-balou'],['#extra-jail','jail'],['#extra-dynamite','dynamite'],['#combat-jail','jail'],['#combat-dynamite','dynamite'],['#intro-sheriff','sheriff'],['#intro-bart-cassidy','bart-cassidy'],['#intro-schofield','schofield'],['#intro-bang','bang'],['#intro-barrel','barrel']])place(sel,key);
  $('#roles').replaceChildren();for(const key of ['sheriff','deputy','outlaw','renegade']){const c=cards.find(x=>x.key===key),r=document.createElement('button'),h=document.createElement('h3'),goal=document.createElement('p');r.className='role';r.type='button';r.dataset.role=key;r.onclick=()=>openCard(key);goal.textContent=info[key][1];const picture=image(c);if(picture.classList.contains('card-image'))picture.style.aspectRatio='2 / 3';const frame=document.createElement('span'),rotor=document.createElement('span'),back=document.createElement('span');frame.className='role-flip';rotor.className='role-flip-rotor';back.className='role-flip-back';back.setAttribute('aria-hidden','true');back.textContent='★';rotor.append(back,picture);frame.append(rotor);r.append(frame,h,goal);$('#roles').append(r);}updateRoleCounts();initRoleFlips();initCardTypes();initSetupFilm();initLessonPresentations();renderCards();}
try{const n=Number(localStorage.getItem('bang-players'));if(Number.isInteger(n)&&n>=4&&n<=7)count=n;}catch{}
players(count);setMode(location.hash.slice(1),false,false);init();


// Connect the range label to the printed range symbol as the layout resizes.
function connectRangeArrow(){
  const row=$('.weapon-example'),label=$('.range-callout b'),card=$('#range-weapon-example .card-image');
  if(!row||!label||!card)return;
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
  svg.classList.add('range-pointer');svg.setAttribute('aria-hidden','true');
  svg.innerHTML='<defs><marker id="range-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="currentColor" stroke-width="1.6"/></marker></defs><line stroke="currentColor" stroke-width="2" marker-end="url(#range-tip)"/>';
  row.append(svg);const line=svg.querySelector('line');
  function update(){const r=row.getBoundingClientRect(),c=card.getBoundingClientRect(),l=label.getBoundingClientRect();if(!r.width||!c.width)return;svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);line.setAttribute('x1',l.left-r.left-4);line.setAttribute('y1',l.top-r.top+l.height/2);line.setAttribute('x2',c.left-r.left+c.width*.57);line.setAttribute('y2',c.top-r.top+c.height*.76);}
  const observer=new ResizeObserver(update);observer.observe(row);observer.observe(label);observer.observe(card);update();
}
initRangeArrow();
function initRangeArrow(){const container=$('#range-weapon-example');if(!container)return;if(container.querySelector('.card-image'))connectRangeArrow();else{const observer=new MutationObserver(()=>{if(container.querySelector('.card-image')){observer.disconnect();connectRangeArrow();}});observer.observe(container,{childList:true});}}


function updateLessonProgress(current){
  if(current==='setup-types'||current==='setup')return;
  if(current==='learn'){document.querySelector('#learn > .lesson-progress')?.remove();return;}
  const steps=[['learn','역할과 승리조건'],['setup-types','카드 종류'],['setup','기본세팅'],['turn','내 차례'],['combat','기본 규칙'],['extra','추가 규칙'],['end','게임 종료']];
  const index=steps.findIndex(([id])=>id===current);
  if(index<0)return;
  const view=document.getElementById(current);
  let panel=view.querySelector(':scope > .lesson-progress');
  if(!panel){panel=document.createElement('div');panel.className='lesson-progress';view.prepend(panel);}
  panel.replaceChildren();
  const row=document.createElement('div'),label=document.createElement('b'),remaining=document.createElement('span');
  label.textContent=(index+1)+' / '+steps.length+'단계 · '+steps[index][1];
  remaining.textContent=index===steps.length-1?'마지막 설명이에요':(steps.length-index-1)+'단계 더 읽으면 끝나요';
  row.append(label);
  const bar=document.createElement('nav');bar.className='lesson-progress-bar';
  bar.setAttribute('aria-label','설명 단계 선택');
  steps.forEach(([id,title],i)=>{const segment=document.createElement('button');segment.type='button';segment.textContent=String(i+1);segment.setAttribute('aria-label',(i+1)+'단계 · '+title);segment.title=(i+1)+'단계 · '+title;if(i<=index)segment.className='reached';if(i===index)segment.setAttribute('aria-current','step');segment.onclick=()=>setMode(id);bar.append(segment);});
  const hint=document.createElement('small');hint.className='progress-hint';hint.textContent='번호를 누르면 해당 설명으로 이동해요.';
  panel.append(row,bar,hint);
}

// Celebrate only after the final page has been read to its closing message.
const completionDialog=document.getElementById('completion-dialog');
let completionShown=false;
try{completionShown=sessionStorage.getItem('bang-completion-shown')==='yes';}catch{}
function closeCompletion(){completionDialog.close();}
document.getElementById('completion-close').onclick=closeCompletion;
document.getElementById('completion-enjoy').onclick=closeCompletion;
document.getElementById('completion-cards').onclick=()=>{closeCompletion();setMode('cards');};
completionDialog.addEventListener('click',e=>{if(e.target===completionDialog){const r=completionDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeCompletion();}});
const completionObserver=new IntersectionObserver(entries=>{if(completionShown||mode!=='end'||document.querySelector('dialog[open]'))return;if(entries.some(e=>e.isIntersecting&&e.intersectionRatio>=.6)){completionShown=true;try{sessionStorage.setItem('bang-completion-shown','yes');}catch{}completionDialog.showModal();completionObserver.disconnect();}},{threshold:[.6]});
completionObserver.observe(document.querySelector('#end .lesson-complete'));

place('#intro-bang-card','bang');place('#intro-role-card','sheriff');

var roleIntroController;
function initRoleFlips(){
 document.querySelectorAll('#roles .role-flip').forEach(f=>f.classList.add('is-revealed'));
 if(mode==='learn')playRoleIntro();
}
var roleIntroSeen=false;
async function playRoleIntro(){
 roleIntroController?.abort();
 let seen=roleIntroSeen;try{seen=seen||sessionStorage.getItem('bang-role-intro-seen')==='yes';}catch{}
 if(seen)return;
 const roles=[...document.querySelectorAll('#roles .role')];
 if(roles.length!==4||mode!=='learn'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 roleIntroSeen=true;try{sessionStorage.setItem('bang-role-intro-seen','yes');}catch{}
 const controller=new AbortController();roleIntroController=controller;
 const signal=controller.signal;
 const scene=document.createElement('div');scene.className='role-reveal-scene';scene.setAttribute('aria-label','역할 카드 소개');
 const status=document.createElement('p');status.className='sr-only';status.setAttribute('role','status');scene.append(status);
 const skip=document.createElement('button');skip.className='role-reveal-skip';skip.textContent='소개 건너뛰기';skip.onclick=()=>controller.abort();scene.append(skip);
 const layer=document.createElement('div');layer.className='role-reveal-paper';scene.append(layer);
 const guide=document.createElement('p');guide.className='role-reveal-guide';guide.textContent='카드 이미지를 눌러 자세한 역할을 확인하세요.';scene.append(guide);
 document.body.append(scene);document.body.classList.add('role-revealing');
 const content=document.querySelector('#learn .lesson-content');content.inert=true;
 window.scrollTo({top:0,behavior:'instant'});
 const animate=async(el,frames,options)=>{if(signal.aborted)throw new DOMException('Aborted','AbortError');const animation=el.animate(frames,{...options,fill:'forwards'});const stop=()=>animation.cancel();signal.addEventListener('abort',stop,{once:true});try{await animation.finished;}finally{signal.removeEventListener('abort',stop);}};
 const pause=ms=>new Promise((resolve,reject)=>{if(signal.aborted)return reject(new DOMException('Aborted','AbortError'));const stop=()=>{clearTimeout(timer);reject(new DOMException('Aborted','AbortError'));};const timer=setTimeout(()=>{signal.removeEventListener('abort',stop);resolve();},ms);signal.addEventListener('abort',stop,{once:true});});
 try{
  const bounds=layer.getBoundingClientRect();
  const cardRects=roles.map(r=>r.querySelector('.role-flip').getBoundingClientRect());
  const gridWidth=Math.min(bounds.width-36,270);
  const gap=22;
  const smallWidth=Math.min(cardRects[0].width,(gridWidth-gap)/2,(bounds.height-112)/3.3);
  const smallHeight=smallWidth*1.5;
  const rowGap=30;
  const gridLeft=bounds.left+(bounds.width-(smallWidth*2+gap))/2;
  const gridTop=bounds.top+(bounds.height-(smallHeight*2+rowGap))/2;
  for(const [index,role] of roles.entries()){
   status.textContent=roleNames[role.dataset.role]+' 카드';
   const target=role.querySelector('.role-flip').getBoundingClientRect();
   const card=document.createElement('div');card.className='role-reveal-card';
   const rotor=document.createElement('div');rotor.className='role-reveal-rotor';
   const back=document.createElement('div');back.className='role-reveal-back';back.textContent='★';
   const front=role.querySelector('.card-image,.text-card').cloneNode(true);front.classList.add('role-reveal-front');rotor.append(back,front);card.append(rotor);scene.append(card);
   const width=Math.min(247,bounds.width-44,(bounds.height-90)*2/3),height=width*1.5;
   const x=bounds.left+(bounds.width-width)/2,y=bounds.top+(bounds.height-height)/2;
   Object.assign(card.style,{left:x+'px',top:y+'px',width:width+'px',height:height+'px'});
   await animate(rotor,[{transform:'rotateY(180deg)'},{transform:'rotateY(0deg)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});
   await pause(450);
   const tx=gridLeft+(index%2)*(smallWidth+gap);
   const ty=gridTop+Math.floor(index/2)*(smallHeight+rowGap);
   await animate(card,[{transform:'translate(0,0) scale(1)'},{transform:'translate('+(tx-x)+'px,'+(ty-y)+'px) scale('+(smallWidth/width)+')'}],{duration:600,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
  scene.classList.add('has-guide');guide.classList.add('is-visible');status.textContent=guide.textContent;
  await pause(2300);
  await animate(scene,[{opacity:1},{opacity:0}],{duration:400});
 }catch(error){if(error.name!=='AbortError')console.error(error);}
 finally{scene.remove();content.inert=false;document.body.classList.remove('role-revealing');if(roleIntroController===controller)roleIntroController=null;}
}

var cardTypeStep=0;
var cardTypeFilmBusy=false;
var cardTypeFilmTimer;
function showCardType(step,focus=true){
 cardTypeStep=step;
 clearTimeout(cardTypeFilmTimer);
 const film=document.getElementById('types-film');if(!film)return;
 film.classList.remove('is-playing');
 document.querySelectorAll('[data-film-scene]').forEach(n=>n.hidden=Number(n.dataset.filmScene)!==step);
 document.getElementById('types-film-progress').textContent=(step+1)+' / 6';
 document.getElementById('types-film-hint').textContent=['화면을 터치하면 인물 카드를 살펴봐요 ›','화면을 터치하면 플레이 카드를 살펴봐요 ›','화면을 터치하면 갈색 테두리를 살펴봐요 ›','화면을 터치하면 파란 테두리를 살펴봐요 ›','화면을 터치하면 무기 카드를 살펴봐요 ›','카드 구성 설명이 끝났어요.'][step];
 document.getElementById('types-film-next').hidden=step!==5;
 film.setAttribute('role',step===5?'group':'button');
 film.tabIndex=step===5?-1:0;
 film.setAttribute('aria-label',['역할 카드 7장. 내 편과 승리 목표를 정해요.','인물 카드 16장. 나의 생명과 특수 능력을 정해요.','플레이 카드 80장. 갈색과 파란 테두리 모두 플레이 카드예요.','갈색 테두리 카드. 효과를 사용하고 버려요.','파란 테두리 카드. 앞에 놓고 효과를 유지해요.','무기 카드. 파란 테두리 플레이 카드의 한 종류예요.'][step]+(step===5?' 다음 버튼을 눌러 기본세팅 보기':' 화면을 터치하거나 Enter 키를 눌러 계속'));
 void film.offsetWidth;film.classList.add('is-playing');
 cardTypeFilmBusy=true;cardTypeFilmTimer=setTimeout(()=>{cardTypeFilmBusy=false;},matchMedia('(prefers-reduced-motion: reduce)').matches?0:1000);
 if(focus)film.focus({preventScroll:true});
}
function initCardTypes(){
 const examples={'types-film-role-one':'sheriff','types-film-role-two':'deputy','types-film-role-three':'outlaw','types-film-person-one':'bart-cassidy','types-film-person-two':'calamity-janet','types-film-person-three':'willy-the-kid','types-film-brown':'bang','types-film-blue':'barrel','types-film-brown-detail-one':'bang','types-film-brown-detail-two':'beer','types-film-blue-detail-one':'barrel','types-film-blue-detail-two':'jail','types-film-weapon-one':'schofield','types-film-weapon-two':'winchester'};
 Object.entries(examples).forEach(([id,key])=>place('#'+id,key));
 const film=document.getElementById('types-film');
 const advance=()=>{if(cardTypeFilmBusy)return;if(cardTypeStep<5)showCardType(cardTypeStep+1);};
 document.getElementById('types-film-next').onclick=e=>{e.stopPropagation();setMode('setup');};
 film.onclick=e=>{if(!e.target.closest('button'))advance();};film.onkeydown=e=>{if(e.target===film&&(e.key==='Enter'||e.key===' ')){e.preventDefault();if(!e.repeat)advance();}};
 showCardType(0,false);
}

function renderWholeSetup(){
 const host=document.getElementById('whole-table-players');if(!host)return;
 host.replaceChildren();
 for(let i=0;i<5;i++){
  const seat=document.createElement('div');seat.className='whole-seat';
  const angle=(i/5)*Math.PI*2-Math.PI/2;
  seat.style.left=(50+Math.cos(angle)*39)+'%';seat.style.top=(50+Math.sin(angle)*39)+'%';
  const label=document.createElement('b');label.textContent=i===0?'보안관':i+'번 자리';
  const mat=document.createElement('span');mat.className='whole-mini-mat';mat.setAttribute('aria-hidden','true');
  for(const name of ['역할','인물']){const card=document.createElement('i');card.textContent=name;mat.append(card);}
  const life=document.createElement('small');life.textContent='● 생명 표시';mat.append(life);
  const hand=document.createElement('span');hand.className='whole-hand';hand.textContent='손패';
  seat.append(label,mat,hand);host.append(seat);
 }
 const table=document.querySelector('.whole-table');table.setAttribute('aria-label',5+'인 전체 배치. 보안관부터 시계 방향으로 '+5+'개의 자리에 각자의 판과 손패를 놓아요. 중앙에는 뒷면이 위로 향한 뽑는 더미와 처음에는 비워 두는 버린 더미 자리가 있어요.');
}

var setupFilmStep=0;
var setupFilmBusy=false;
var setupFilmTimer;
function renderSetupFilm(){
 const host=document.getElementById('setup-film-seats');if(!host)return;host.replaceChildren();
 const characters=['bart-cassidy','black-jack','calamity-janet','jesse-jones','kit-carlson','lucky-duke','rose-doolan'];
 for(let i=0;i<5;i++){
  const seat=document.createElement('div');seat.className='setup-film-seat';seat.style.setProperty('--seat-index',i);const angle=(i/5)*Math.PI*2-Math.PI/2;seat.style.left=(50+Math.cos(angle)*38)+'%';seat.style.top=(50+Math.sin(angle)*38)+'%';seat.style.setProperty('--seat-top',(50+Math.sin(angle)*38)+'%');
  const label=document.createElement('b');label.className='setup-seat-label';label.textContent=i===0?'보안관':'자리 '+(i+1);
  const mat=document.createElement('div');mat.className='setup-real-mat';const pic=document.createElement('img');pic.src='assets/player-mat-clean.webp';pic.alt='개인 판';pic.width=1479;pic.height=1064;mat.append(pic);
  const role=document.createElement('span');role.className='setup-dealt-role';
  const card=cards.find(c=>c.key==='sheriff');if(i===0&&card)role.append(image(card));else{const back=document.createElement('span');back.className='setup-card-reverse';back.textContent='?';back.setAttribute('aria-label','비밀 역할 카드, 임시 뒷면');role.append(back);}
  const character=document.createElement('span');character.className='setup-dealt-person';const person=cards.find(c=>c.key===characters[i]);if(person)character.append(image(person));if(i===1){const ring=document.createElement('span');ring.className='setup-life-ring';ring.setAttribute('aria-hidden','true');character.append(ring);}
  const life=document.createElement('span');life.className='setup-dealt-life';for(let j=0;j<(i===0?5:4);j++){const bullet=document.createElement('img');bullet.src='assets/life-bullet.webp';bullet.alt='';life.append(bullet);}
  const weapon=document.createElement('span');weapon.className='setup-base-weapon';const colt=cards.find(c=>c.key==='colt-45');if(colt)weapon.append(image(colt));
  mat.append(role,character,life,weapon);
  const hand=document.createElement('div');hand.className='setup-dealt-hand';hand.setAttribute('aria-label','시작 생명 수만큼 받은 손패');for(let j=0;j<(i===0?5:4);j++){const back=document.createElement('span');back.className='setup-card-reverse';back.style.setProperty('--card-index',j);back.setAttribute('aria-hidden','true');hand.append(back);}
  const handLabel=document.createElement('b');handLabel.className='setup-hand-label';handLabel.textContent='손패';hand.append(handLabel);
  seat.append(label,mat,hand);host.append(seat);
 }
 document.getElementById('setup-film-board').setAttribute('aria-label',5+'인 테이블 배치 예시. 위쪽이 보안관 자리예요.');
}
function showSetupStep(step){
 setupDealController?.abort();setupDealController=null;
 setupFilmStep=step;const board=document.getElementById('setup-film-board');if(!board)return;
 const content=[['01 / 각자의 자리','판을 하나씩 놓으세요.','각자의 앞에 개인 판을 놓고, 가운데는 비워 두세요. 콜트 45는 판에 표시된 기본 무기이며 따로 나눠 주는 카드가 아니에요.'],['02 / 역할 나누기','역할 카드를 한 장씩 받아요.','여기서는 내가 무법자인 예시예요. 내 역할은 나만 확인한 뒤 판의 역할 자리에 엎어 두세요. 보안관만 역할을 공개해요.'],['03 / 인물과 생명','인물을 공개하고 생명을 놓아요.','내 인물은 블랙 잭, 시작 생명은 4인 예시예요. 인물은 앞면으로 놓고 생명 4개를 표시해요. 보안관이라면 생명을 1개 더 받아요.'],['04 / 시작 손패','시작 생명 수만큼 카드를 받아요.','플레이 카드 더미에서 내 시작 생명 수만큼 카드를 받아 손패로 들어요.'],['05 / 중앙 카드 더미','가운데에 더미를 놓으면 준비 끝!','남은 플레이 카드는 뒷면이 위로 향하게 쌓아요. 옆에는 버린 더미 자리를 비워 두세요. 보안관부터 시계 방향으로 시작해요.'],['06 / 참조표 카드','참조표를 옆에 놓고 확인하세요.','게임에 익숙하지 않다면 참조표 카드를 사용하세요. 카드에 그려진 기호의 뜻을 빠르게 확인할 수 있어요. 플레이 카드 더미에 섞지 않고 내 옆에 놓아 두세요.']][step];
 board.classList.remove('hand-received','setup-turn-ready');board.querySelectorAll('.setup-turn-highlight').forEach(n=>n.classList.remove('setup-turn-highlight'));board.querySelector('.setup-turn-cue')?.remove();board.dataset.stage=step;board.setAttribute('aria-label',(step===0||step===4)?'5인 전체 테이블 배치':'내 자리에서 바라본 개인 판. 왼쪽은 역할, 가운데는 인물, 오른쪽은 기본 무기 자리이며 아래쪽은 손패예요.');board.classList.remove('is-dealing');void board.offsetWidth;board.classList.add('is-dealing');
 document.getElementById('setup-film-progress').textContent=(step+1)+' / 6';document.getElementById('setup-film-step-label').textContent=content[0];document.getElementById('setup-film-title').textContent=content[1];document.getElementById('setup-film-description').textContent=content[2];
 document.getElementById('setup-film-back').hidden=step===0;document.getElementById('setup-film-replay').hidden=step!==5;document.getElementById('setup-film-next').hidden=step!==5;document.getElementById('setup-film-tap').hidden=step===5;document.getElementById('setup-film-reference').hidden=step!==5;board.hidden=step===5;
 const touch=document.getElementById('setup-film-touch');touch.setAttribute('role',step===5?'group':'button');touch.tabIndex=step===5?-1:0;touch.setAttribute('aria-label',content[1]+' '+content[2]+(step===5?'':' 화면을 터치하면 다음 단계로 이동해요.'));
 clearTimeout(setupFilmTimer);setupFilmBusy=true;
 board.querySelectorAll('.setup-film-seat').forEach((seat,i)=>{seat.classList.toggle('is-my-seat',i===1);const label=seat.querySelector('.setup-seat-label');if(label)label.textContent=i===1&&step>0&&step<4?'내 판 · 내가 보는 방향':i===0?'보안관':'자리 '+(i+1);});
 if(step>0&&step<5)animateSetupDeal(step);else{setupFilmBusy=false;}
}
function initSetupFilm(){
 renderSetupFilm();renderSetupReadingImages();showSetupStep(0);const touch=document.getElementById('setup-film-touch');const advance=()=>{if(!setupFilmBusy&&setupFilmStep<5)showSetupStep(setupFilmStep+1);};touch.onclick=advance;touch.onkeydown=e=>{if(e.target===touch&&(e.key==='Enter'||e.key===' ')){e.preventDefault();if(!e.repeat)advance();}};
 document.getElementById('setup-film-back').onclick=()=>showSetupStep(Math.max(0,setupFilmStep-1));document.getElementById('setup-film-replay').onclick=()=>showSetupStep(0);document.getElementById('setup-film-next').onclick=()=>setMode('turn');
}

var setupDealController;
async function animateSetupDeal(step){
 const controller=new AbortController();setupDealController=controller;const signal=controller.signal;
 const board=document.getElementById('setup-film-board'),seat=board.querySelector('.is-my-seat');if(!seat){setupFilmBusy=false;return;}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const hidden=[],actors=[];
 const next=document.getElementById('setup-film-next');if(step===4)next.hidden=true;
 const conceal=el=>{el.classList.add('setup-awaiting-card');hidden.push(el);};
 const animation=async(el,keyframes,duration)=>{if(signal.aborted)throw new DOMException('Aborted','AbortError');const a=el.animate(keyframes,{duration,fill:'forwards',easing:'cubic-bezier(.2,.7,.2,1)'});const stop=()=>a.cancel();signal.addEventListener('abort',stop,{once:true});try{await a.finished;}finally{signal.removeEventListener('abort',stop);}};
 const fly=async(target,key,back=false,order=0)=>{
  const actor=document.createElement('div');actor.className='setup-flying-card';actor.setAttribute('aria-hidden','true');
  const source=key?cards.find(c=>c.key===key):null;
  if(source){actor.append(image(source));if(key==='black-jack'){const ring=document.createElement('span');ring.className='setup-life-ring';ring.setAttribute('aria-hidden','true');ring.style.opacity='0';const label=document.createElement('span');label.className='setup-life-callout';label.style.opacity='0';label.textContent='총알 4개 = 시작 생명 4';actor.append(ring,label);}}else{const reverse=document.createElement('span');reverse.className='setup-card-reverse';reverse.textContent='BANG!';actor.append(reverse);}
  const bounds=board.getBoundingClientRect(),dest=target.getBoundingClientRect();
  const width=Math.min(220,bounds.width*.68,innerHeight*.29),height=width*1.5;
  const x=bounds.left+(bounds.width-width)/2+order*3,y=Math.max(82,bounds.top+(bounds.height-height)/2);
  Object.assign(actor.style,{left:x+'px',top:y+'px',width:width+'px',height:height+'px'});document.body.append(actor);actors.push(actor);
  await animation(actor,[{opacity:0,transform:'perspective(900px) rotateY(95deg) scale(.9)'},{opacity:1,transform:'perspective(900px) rotateY(0deg) scale(1)'},{opacity:1,transform:'perspective(900px) rotateY(0deg) scale(1)'}],step===3?500:1050);
  if(key==='black-jack'){
   const ring=actor.querySelector('.setup-life-ring'),label=actor.querySelector('.setup-life-callout');
   await Promise.all([animation(ring,[{opacity:0,transform:'scale(1.25)'},{opacity:1,transform:'rotate(5deg)'}],350),animation(label,[{opacity:0},{opacity:1}],350)]);
   await animation(actor,[{transform:'none'},{transform:'none'}],2650);

  }
  if(back&&source){await animation(actor,[{transform:'rotateY(0deg)'},{transform:'rotateY(90deg)'}],140);actor.replaceChildren();const reverse=document.createElement('span');reverse.className='setup-card-reverse';reverse.textContent='?';actor.append(reverse);await animation(actor,[{transform:'rotateY(90deg)'},{transform:'rotateY(0deg)'}],140);}
  actor.querySelector('.setup-life-callout')?.remove();
  await animation(actor,[{transform:'translate(0,0) scale(1)'},{transform:'translate('+(dest.left-x)+'px,'+(dest.top-y)+'px) scale('+(dest.width/width)+','+(dest.height/height)+')'}],600);
  target.classList.remove('setup-awaiting-card');actor.remove();
  if(key==='black-jack'){
   const life=seat.querySelector('.setup-dealt-life');
   life.classList.remove('setup-awaiting-card');
   const bullets=[...life.querySelectorAll('img')];
   for(const bullet of bullets)bullet.style.opacity='0';
   for(const bullet of bullets){await animation(bullet,[{opacity:0,transform:'translateY(-45px) scale(1.5)'},{opacity:1,transform:'none'}],230);bullet.style.opacity='';}
  }
 };
 const distribute=async(kind)=>{
  const overlay=document.createElement('div');overlay.className='setup-distribution';overlay.setAttribute('aria-hidden','true');board.append(overlay);actors.push(overlay);
  const title=document.createElement('p');title.className='setup-distribution-title';title.textContent=kind==='role'?'역할 카드를 한 장씩 나눠요':'인물 카드를 한 장씩 나눠요';overlay.append(title);
  const deck=document.createElement('div');deck.className='setup-distribution-deck';for(let i=0;i<3;i++){const back=document.createElement('span');back.className='setup-card-reverse';back.textContent=kind==='role'?'역할':'인물';back.style.transform='translate('+(i*3)+'px,'+(-i*3)+'px)';deck.append(back);}overlay.append(deck);
  const recipients=[];for(let i=0;i<5;i++){const recipient=document.createElement('div');recipient.className='setup-distribution-person';recipient.style.left=(i===4?50:12+(i/3)*76)+'%';recipient.style.top=(i===4?80:22)+'%';recipient.textContent=i===4?'나':'사람 '+(i+1);overlay.append(recipient);recipients.push(recipient);}
  const bounds=overlay.getBoundingClientRect();const deckBounds=deck.getBoundingClientRect();
  for(let i=0;i<5;i++){
   if(signal.aborted)throw new DOMException('Aborted','AbortError');
   const token=document.createElement('span');token.className='setup-distribution-card setup-card-reverse';token.textContent=kind==='role'?'역할':'인물';overlay.append(token);
   const dest=recipients[i].getBoundingClientRect();const fromX=deckBounds.left-bounds.left,fromY=deckBounds.top-bounds.top;Object.assign(token.style,{left:fromX+'px',top:fromY+'px'});
   await animation(token,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+(dest.left+dest.width/2-deckBounds.left-18)+'px,'+(dest.top-deckBounds.top-24)+'px) rotate('+(i%2===0?-8:8)+'deg)',opacity:1}],280);
   recipients[i].classList.add('has-card');
  }
  await animation(overlay,[{opacity:1},{opacity:0}],320);overlay.remove();
 };
 try{
  if(reduced)return;
  if(step===1){const target=seat.querySelector('.setup-dealt-role');conceal(target);await distribute('role');await fly(target,'outlaw',true);}
  if(step===2){const target=seat.querySelector('.setup-dealt-person'),life=seat.querySelector('.setup-dealt-life');conceal(target);conceal(life);await distribute('person');await fly(target,'black-jack');}
  if(step===3){
   const hand=seat.querySelector('.setup-dealt-hand');conceal(hand);
   const bundle=document.createElement('div');bundle.className='setup-hand-bundle';bundle.setAttribute('aria-hidden','true');
   const boardBounds=board.getBoundingClientRect(),destination=hand.getBoundingClientRect();
   const width=Math.min(120,boardBounds.width*.36),height=width*1.5;
   const x=boardBounds.left+(boardBounds.width-width)/2,y=Math.max(82,boardBounds.top+20);
   Object.assign(bundle.style,{left:x+'px',top:y+'px',width:width+'px',height:height+'px'});
   for(let i=0;i<4;i++){const back=document.createElement('span');back.className='setup-card-reverse';back.textContent=i===3?'생명 수만큼':'';back.style.transform='translate('+(i*5)+'px,'+(-i*4)+'px)';bundle.append(back);}
   document.body.append(bundle);actors.push(bundle);
   await animation(bundle,[{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'scale(1)'},{opacity:1,transform:'scale(1)'}],800);
   await animation(bundle,[{transform:'translate(0,0) scale(1)'},{transform:'translate('+(destination.left+destination.width/2-x-width*.35)+'px,'+(destination.top-y)+'px) scale(.7)',opacity:0}],700);
   hand.classList.remove('setup-awaiting-card');bundle.remove();board.classList.add('hand-received');
  }
  if(step===4){
   const draw=board.querySelector('.setup-film-draw>.setup-card-reverse');conceal(draw);await fly(draw,null);
   await animation(board,[{opacity:1},{opacity:1}],2000);
   const cue=document.createElement('div');cue.className='setup-turn-cue';cue.setAttribute('role','status');cue.textContent='보안관부터 시작해요';board.append(cue);
   const seats=[...board.querySelectorAll('.setup-film-seat')];
   for(let i=0;i<seats.length;i++){
    seats.forEach(n=>n.classList.remove('setup-turn-highlight'));seats[i].classList.add('setup-turn-highlight');
    cue.textContent=i===0?'보안관부터 시작해요':'시계 방향으로 차례가 돌아요 ↻';
    await animation(seats[i],[{filter:'drop-shadow(0 0 0px #f1cf8c)'},{filter:'drop-shadow(0 0 10px #f1cf8c)',offset:.3},{filter:'drop-shadow(0 0 0px #f1cf8c)'}],i===0?1150:550);
   }
   seats.forEach(n=>n.classList.remove('setup-turn-highlight'));seats[0].classList.add('setup-turn-highlight');
   cue.textContent='보안관부터 시계 방향으로 시작!';board.classList.add('setup-turn-ready');
  }
 }catch(error){if(error.name!=='AbortError')console.error(error);}
 finally{actors.forEach(n=>n.remove());hidden.forEach(n=>n.classList.remove('setup-awaiting-card'));seat.querySelectorAll('.setup-dealt-life img').forEach(n=>n.style.opacity='');if(setupDealController===controller){if(step>=3)board.classList.add('hand-received');setupFilmBusy=false;setupDealController=null;if(step===4){next.hidden=true;document.getElementById('setup-film-reference').hidden=true;}}}
}


var lessonPresentationsReady=false;
var seenLessonPresentations=new Set();
function setLessonReading(id,reading){
 const view=document.getElementById(id);view.classList.toggle('is-reading',reading);
 if(id==='setup-types'){view.querySelector('.lesson-reading').hidden=!reading;document.getElementById('types-film').hidden=reading;}
 else{
  document.querySelector('#setup>.setup-film').hidden=reading;
  const details=document.querySelector('#setup>.setup-film-details');details.hidden=!reading;details.open=reading;
  view.querySelector('[data-replay-lesson]').hidden=!reading;
 }
}
function openLessonPresentation(id){
 let seen=seenLessonPresentations.has(id);try{seen=seen||sessionStorage.getItem('bang-motion-seen-'+id)==='yes';}catch{}
 setLessonReading(id,seen);seenLessonPresentations.add(id);try{sessionStorage.setItem('bang-motion-seen-'+id,'yes');}catch{}
}
function initLessonPresentations(){
 lessonPresentationsReady=true;
 document.querySelectorAll('[data-replay-lesson]').forEach(button=>button.onclick=()=>{
  const id=button.dataset.replayLesson;setLessonReading(id,false);
  if(id==='setup')showSetupStep(0);else showCardType(0,false);
  window.scrollTo({top:0,behavior:'instant'});
 });
 if(['setup-types','setup'].includes(mode))openLessonPresentation(mode);
}

function renderSetupReadingImages(){
 const source=document.getElementById('setup-film-board');if(!source)return;
 for(const [id,stage] of [['setup-reading-personal',3],['setup-reading-whole',4]]){
  const host=document.getElementById(id);if(!host)continue;
  const copy=source.cloneNode(true);copy.dataset.stage=stage;copy.classList.remove('is-dealing','setup-turn-ready');copy.classList.add('hand-received');
  copy.removeAttribute('aria-label');copy.querySelector('.setup-turn-cue')?.remove();
  [copy,...copy.querySelectorAll('[id]')].forEach(n=>n.removeAttribute('id'));
  copy.querySelectorAll('.setup-film-seat').forEach((seat,i)=>{seat.classList.toggle('is-my-seat',i===1);seat.classList.remove('setup-turn-highlight');seat.querySelector('.setup-seat-label').textContent=stage===3&&i===1?'내 판 · 내가 보는 방향':i===0?'보안관':'자리 '+(i+1);});
  copy.querySelectorAll('.setup-awaiting-card').forEach(n=>n.classList.remove('setup-awaiting-card'));
  host.replaceChildren(copy);
 }
}

