'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const info={
sheriff:['보안관','무법자와 배신자를 모두 제거','나머지 역할은 모르는 채 시작해요. 생명과 최대 생명이 인물보다 1 많아요. 부관을 직접 제거하면 손패와 장착 카드를 모두 버려요.','부관과 함께 이겨요.'],
deputy:['부관','보안관을 지키며 같은 목표','정체는 비밀이에요. 무법자와 배신자가 모두 탈락하면 보안관과 함께 이겨요.','먼저 탈락해도 팀이 이기면 승리해요.'],
outlaw:['무법자','보안관을 제거','보안관이 죽는 순간 무법자 팀이 이겨요. 단, 배신자만 살아남은 경우는 배신자 승리예요.','이미 모든 무법자가 탈락했어도 승리할 수 있어요.'],
renegade:['배신자','마지막 한 명으로 생존','보안관이 죽으면 게임이 즉시 끝나요. 다른 사람을 먼저 제거하고 보안관과 마지막 대결을 해야 해요.','보안관을 너무 일찍 제거하면 무법자가 이겨요.'],
bang:['뱅!','사거리 안의 한 명에게 피해 1','내 무기의 사거리 안에 있는 한 명을 골라 사용해요. 상대가 빗나감!으로 회피하지 못하면 생명 1을 잃어요.','내 턴에 1장만 사용. 볼캐닉·윌리 더 키드는 예외예요.'],
missed:['빗나감!','나에게 온 총격 1회 회피','뱅! 또는 기관총의 총격을 받았을 때 즉시 사용해요. 내 턴이 아니어도 돼요. 다른 사람을 대신 지킬 수는 없어요.','인디언과 결투에는 사용할 수 없어요. 슬랩 더 킬러의 뱅!은 회피 효과 2회가 필요해요.'],
beer:['맥주','내 생명 1 회복','내 턴에 사용하거나, 치명적인 피해로 생명이 0 이하가 되는 순간 즉시 사용해요. 최대 생명을 넘길 수 없고 다른 사람에게 줄 수 없어요.','2명만 살아 있으면 효과 없음. 내 턴 밖에서는 단순한 부상을 회복할 수 없어요. 다이너마이트 피해에는 생명이 1 이상이 되도록 필요한 수만큼 써야 해요.'],
saloon:['주점','모든 생존자의 생명 1 회복','나를 포함한 모두가 생명 1을 회복해요. 각자의 최대 생명은 넘지 못해요.','내 턴에만 사용해요. 생명이 0이 되는 순간 맥주 대신 사용할 수 없어요. 2명만 남아도 효과가 있어요.'],
stagecoach:['역마차','카드 2장 추가로 뽑기','내 턴의 카드 사용 단계에 더미 위에서 2장을 손패로 가져와요.','턴 시작에 뽑는 2장과 별개예요.'],
'wells-fargo':['웰스 파고 은행','카드 3장 추가로 뽑기','내 턴의 카드 사용 단계에 더미 위에서 3장을 손패로 가져와요.','턴을 끝낼 때는 현재 생명만큼만 손패를 남겨요.'],
'general-store':['잡화점','모두 1장씩 골라 가져가기','생존자 수만큼 카드 더미 위의 카드를 펼쳐요. 나부터 시계 방향으로 한 명씩 원하는 1장을 손패로 가져가요.','나도 1장 가져가요.'],
panic:['강탈!','거리 1인 상대의 카드 1장 가져오기','상대 손패에서 보지 않고 무작위 1장을 가져오거나, 상대 앞에 공개된 카드 1장을 골라 내 손패로 가져와요.','무기의 사거리는 적용하지 않아요. 조준경·야생마·거리 관련 인물 능력은 적용해요. 가져온 장비는 다시 사용해야 장착돼요.'],
'cat-balou':['캣 벌로우','누군가의 카드 1장 버리기','거리와 관계없이 상대 손패의 무작위 1장 또는 상대 앞에 공개된 카드 1장을 골라 버려요.','손패는 미리 보고 고를 수 없어요.'],
gatling:['기관총','나를 제외한 모두에게 총격','거리와 관계없이 다른 생존자 모두에게 뱅! 효과를 1회씩 줘요. 각자 빗나감! 또는 술통으로 방어할 수 있어요.','뱅! 카드가 아니므로 뱅! 1장 제한에 포함되지 않아요. 슬랩 더 킬러의 2회 회피 능력도 적용되지 않아요.'],
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
barrel:['술통','하트 판정이면 총격 회피','뱅! 효과의 대상이 되면 더미 맨 위 1장을 뒤집어 판정해요. 하트면 회피. 판정 카드는 버려요. 실패해도 빗나감!을 사용할 수 있어요.','총격마다 1번 판정. 인디언·결투는 못 막아요. 술통 카드는 판정 후에도 앞에 남아요.'],
jail:['감옥','상대의 다음 턴을 건너뛰게 하기','보안관을 제외한 한 명의 앞에 놓아요. 거리는 무관해요. 그 사람의 턴 시작에 판정: 하트면 정상 진행, 아니면 턴을 건너뛰어요. 결과와 상관없이 감옥은 버려요.','감옥에 있어도 공격 대상이 되며 빗나감!·치명상 맥주 등으로 대응할 수 있어요.'],
dynamite:['다이너마이트','스페이드 2–9면 피해 3','내 앞에 놓아요. 다음 내 턴 시작에 판정해 스페이드 2부터 9까지면 폭발: 카드를 버리고 생명 3을 잃어요. 그 외에는 왼쪽 다음 생존자에게 넘겨요.','감옥보다 먼저 판정. 특정 플레이어가 준 피해가 아니므로 제거 보상·벌칙이 없어요.'],
'bart-cassidy':['바트 캐시디','생명 1을 잃을 때마다 카드 1장','피해로 생명을 잃을 때마다 더미에서 1장을 손패로 뽑아요.','시작 생명 4. 잃은 생명 수만큼 뽑아요.'],
'black-jack':['블랙 잭','두 번째 뽑은 카드가 빨간 무늬면 1장 더','턴 시작에 뽑는 두 번째 카드를 공개해요. 하트나 다이아몬드라면 추가로 1장을 뽑아요. 추가 카드는 공개하지 않아요.','시작 생명 4. 카드 사용 단계의 추가 뽑기에는 적용하지 않아요.'],
'calamity-janet':['캘러미티 자넷','뱅! ↔ 빗나감! 서로 바꿔 사용','뱅!을 빗나감!으로, 빗나감!을 뱅!으로 사용할 수 있어요.','시작 생명 4. 빗나감!을 뱅!으로 공격했다면 내 턴의 뱅! 1장 사용으로 세어요.'],
'el-gringo':['엘 그링고','다른 사람에게 피해를 받으면 손패 가져오기','다른 사람이 사용한 카드로 생명을 잃을 때마다 그 사람 손패에서 무작위 1장을 가져와요.','시작 생명 3. 상대 손패가 없으면 가져오지 못해요. 다이너마이트에는 적용되지 않아요.'],
'jesse-jones':['제시 존스','첫 뽑기를 상대 손패에서 할 수 있어요','턴 시작 첫 번째 카드를 더미 대신 다른 사람 손패에서 무작위로 가져올 수 있어요. 두 번째는 더미에서 뽑아요.','시작 생명 4. 거리에 관계없어요.'],
jourdonnais:['주르도네','항상 술통 능력을 가져요','뱅! 효과를 받으면 하트 판정으로 회피할 수 있어요. 실제 술통까지 장착하면 두 번 판정할 수 있어요.','시작 생명 4. 판정에 실패한 뒤 빗나감!을 써도 돼요.'],
'kit-carlson':['키트 칼슨','위에서 3장을 보고 2장 선택','턴 시작 뽑기에서 더미 위 3장을 확인해 원하는 2장을 손패로 가져와요. 나머지 1장은 더미 맨 위에 뒷면으로 돌려놔요.','시작 생명 4. 나머지 카드를 버리는 것이 아니에요.'],
'lucky-duke':['럭키 듀크','판정할 때 2장 중 결과 선택','술통·감옥·다이너마이트 등의 판정을 할 때 위에서 2장을 뒤집어 원하는 결과 1개를 선택해요. 두 장 모두 버려요.','시작 생명 4. 손패로 2장을 뽑는 능력이 아니에요.'],
'paul-regret':['폴 리그레트','다른 사람이 나를 볼 때 항상 거리 +1','항상 야생마를 가진 것처럼 취급해요. 실제 야생마를 장착하면 거리 +2가 돼요.','시작 생명 3. 내가 다른 사람을 보는 거리는 그대로예요.'],
'pedro-ramirez':['페드로 라미레즈','첫 뽑기를 버린 더미에서 할 수 있어요','턴 시작 첫 번째 카드를 뽑는 더미 대신 버린 더미 맨 위에서 가져올 수 있어요. 두 번째는 뽑는 더미에서 뽑아요.','시작 생명 4. 버린 더미가 비었으면 뽑는 더미를 사용해요.'],
'rose-doolan':['로즈 둘란','내가 다른 사람을 볼 때 항상 거리 −1','항상 조준경을 가진 것처럼 취급해요. 실제 조준경을 장착하면 −2예요. 최종 거리는 최소 1이에요.','시작 생명 4. 다른 사람이 나를 보는 거리는 그대로예요.'],
'sid-ketchum':['시드 케첨','손패 2장을 버려 생명 1 회복','언제든 손패 2장을 버려 생명 1을 회복할 수 있어요. 여러 번 써도 되지만 최대 생명은 넘길 수 없어요.','시작 생명 4. 치명상 때나 2명만 남았을 때도 능력을 사용할 수 있어요.'],
'slab-the-killer':['슬랩 더 킬러','내 뱅!은 회피 효과 2회 필요','내 뱅! 카드 공격을 막으려면 상대는 빗나감! 2장을 사용해야 해요. 술통 판정 성공은 빗나감! 1장으로 세어요.','시작 생명 4. 1회만 회피하면 여전히 피해 1. 기관총에는 적용하지 않아요.'],
'suzy-lafayette':['수지 라파예트','손패가 없으면 카드 1장','손패가 0장이 되면 카드 더미에서 1장을 뽑아요. 결투 중에는 결투가 끝난 후에 능력을 처리해요.','시작 생명 4. 마지막 손패로 잡화점을 사용했다면 잡화점 효과부터 마쳐요. 잡화점에서 받은 카드가 있으므로 추가로 뽑지 않아요.'],
'vulture-sam':['벌처 샘','탈락한 사람의 카드를 모두 가져오기','누군가 탈락하면 그 사람의 손패와 앞에 놓인 카드를 모두 내 손패로 가져와요.','시작 생명 4. 가져온 장비는 자동 장착되지 않아요.'],
'willy-the-kid':['윌리 더 키드','내 턴에 뱅!을 원하는 만큼','내 턴에 뱅! 카드를 여러 장 사용할 수 있어요.','시작 생명 4. 사거리 제한은 그대로 적용해요.']
};
const faqs=[
['뱅! / 기관총을 맞았어요','술통이 있다면 먼저 판정해 하트면 회피해요. 실패하거나 술통이 없다면 빗나감!을 1장 사용해요. 방어하지 못하면 생명 1을 잃어요. 슬랩 더 킬러의 뱅! 카드에는 회피 효과가 2회 필요해요.','missed'],
['인디언! / 결투가 나왔어요','인디언!: 사용자를 제외한 모두가 뱅! 1장을 버리거나 생명 1을 잃어요. 결투: 지목당한 사람부터 둘이 번갈아 뱅!을 버리고, 먼저 못 버리는 사람이 생명 1을 잃어요. 두 경우 모두 빗나감!과 술통은 사용할 수 없어요.','indians'],
['생명이 0이 됐어요 / 맥주를 쓰고 싶어요','치명상 직후 즉시 맥주를 써서 생명을 1 이상으로 만들면 살아남아요. 다이너마이트로 생명 2에서 피해 3을 받았다면 맥주 2장이 필요해요. 2명만 남으면 맥주는 효과가 없어요. 주점은 치명상 대응으로 사용할 수 없어요. 시드 케첨은 자신의 회복 능력을 사용할 수 있어요.','beer'],
['감옥 / 다이너마이트 판정을 해야 해요','더미 위 1장을 뒤집어 왼쪽 아래의 무늬·숫자를 보고 바로 버려요. 그 카드의 효과는 사용하지 않아요. 다이너마이트: 스페이드 2–9면 생명 −3, 그 외에는 왼쪽 다음 생존자에게 넘겨요. 감옥: 하트면 정상 턴, 아니면 턴을 건너뛰어요. 감옥은 어느 결과든 버려요. 둘 다 있으면 다이너마이트가 먼저예요.','dynamite'],
['저 사람에게 쏠 수 있나요?','생존한 자리만 양방향으로 세어 더 짧은 쪽이 기본 거리예요. 상대 야생마·폴 리그레트는 +1, 내 조준경·로즈 둘란은 −1. 최종 거리는 최소 1. 그 거리가 내 무기 사거리 이하면 뱅!으로 쏠 수 있어요. 강탈은 무기와 무관하게 최종 거리 1만 가능해요.','scope'],
['남의 카드를 빼앗거나 버리려면?','강탈은 최종 거리 1의 상대에게, 캣 벌로우는 거리와 관계없이 사용해요. 상대 손패에서는 보지 않고 무작위 1장, 앞에 공개된 카드에서는 원하는 1장을 골라요. 강탈한 카드는 내 손패로, 캣 벌로우의 대상 카드는 버린 더미로 가요.','panic'],
['무기를 바꾸거나 같은 장비를 놓으려면?','앞에 놓인 무기는 1개만 가능해요. 새 무기를 장착하면 기존 무기를 버려요. 내 앞에 같은 이름의 카드 2개를 놓을 수는 없어요. 손패에는 같은 이름의 카드가 여러 장 있어도 괜찮아요. 파란 장비는 손패 한도에 포함되지 않아요.','volcanic'],
['누가 탈락했어요 / 누가 이기나요?','탈락자는 역할을 공개하고 손패·장착 카드를 버려요. 무법자를 제거한 사람은 3장 보상, 보안관이 부관을 제거하면 손패·장착 카드를 모두 버려요. 보안관이 죽으면 즉시 종료: 배신자만 남았다면 배신자, 그 외는 무법자 승리. 무법자와 배신자가 모두 탈락하면 보안관·부관 승리예요.','sheriff'],
['카드 더미가 다 떨어졌어요','뽑는 더미가 비면 버린 카드 더미를 섞어 새 뽑는 더미로 만들어요. 카드 효과로 더 뽑았다면 사용을 마친 뒤 턴 종료 때 현재 생명 수만큼만 손패를 남겨요.','stagecoach'],
['내 턴이 아닌데 카드를 쓸 수 있나요?','일반적으로 내 턴에만 카드를 사용해요. 예외는 공격에 대한 빗나감!, 인디언·결투 대응으로 버리는 뱅!, 치명상 직후의 맥주, 그리고 해당 인물의 특수 능력이에요. 다른 사람이 다치기만 했을 때 임의로 맥주를 쓸 수는 없어요.','missed']
];
const roleDescriptions={sheriff:'평화수호를 위해 무법자와 배신자를 모두 제거해야합니다. 역할을 공개하며 생명을 추가로 하나 더 얻게 됩니다.',deputy:'무법자와 배신자를 모두 제거해야합니다.',outlaw:'보안관을 제거하세요. 무법자끼리 같은 팀을 이룹니다.',renegade:'모두를 죽이고 마지막 최후의 한명으로 생존하세요.'};
function updateRoleCounts(){const nums={sheriff:1,deputy:count===4?0:count===7?2:1,outlaw:count>=6?3:2,renegade:1};$$('#roles .role').forEach(r=>{const key=r.dataset.role;r.querySelector('h3').textContent=info[key][0]+' ('+nums[key]+'명)';});}
let cards=[],filter='전체',target=2,mode='home',count=4;
function image(c){const r=c.rect;const el=document.createElement('span');el.className='card-image';el.setAttribute('role','img');el.setAttribute('aria-label',c.name+' 한글판 카드');el.style.aspectRatio=r.width+'/'+r.height;el.style.backgroundSize=(3200/r.width*100)+'% '+(9360/r.height*100)+'%';el.style.backgroundPosition=(r.x/(3200-r.width)*100)+'% '+(r.y/(9360-r.height)*100)+'%';return el;}
function place(sel,key){const c=cards.find(c=>c.key===key);if(c&&$(sel))$(sel).replaceChildren(image(c));}
function setMode(next,scroll=true){mode=next;const home=next==='home';$('#home').hidden=!home;$('.masthead').hidden=home;$('.mode-nav').hidden=home;$('footer').hidden=home;$$('.view').forEach(v=>v.hidden=v.id!==next);$$('[data-mode]').forEach(b=>b.setAttribute('aria-selected',b.dataset.mode===(['setup','turn'].includes(next)?'learn':next)));history.replaceState(null,'','#'+next);if(scroll)window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});if(next==='cards')renderCards();}
$$('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$$('[data-jump]').forEach(b=>b.onclick=()=>setMode(b.dataset.jump));$('.brand').onclick=e=>{e.preventDefault();setMode('home');};$('#home-back').onclick=()=>setMode('home');$('#start').onclick=()=>setMode('learn');
let homeSelected=false;
function players(n,reveal=false){count=n;if(reveal)homeSelected=true;try{localStorage.setItem('bang-players',n);}catch{}$('#players').replaceChildren();$('#home-players').replaceChildren();for(let i=4;i<=7;i++){for(const id of ['players','home-players']){const b=document.createElement('button');b.textContent=i+'명';b.setAttribute('aria-pressed',i===n&&(id==='players'||homeSelected));b.onclick=()=>players(i,id==='home-players');$('#'+id).append(b);}}const dep=n===4?0:n===7?2:1,out=n>=6?3:2;updateRoleCounts();$('#home-composition').replaceChildren();for(const [name,num] of [['보안관',1],['부관',dep],['무법자',out],['배신자',1]]){const span=document.createElement('span');span.textContent=`${name} (${num})`;$('#home-composition').append(span);}$('#home-summary').hidden=!homeSelected;$('#home-summary').style.setProperty('--pointer',((n-4)*26+7)+'%');}
try{const n=Number(localStorage.getItem('bang-players'));if(n>=4&&n<=7)count=n;}catch{}players(count);
function openCard(key){const c=cards.find(x=>x.key===key);if(!c)return;const d=info[key]||[c.name,'인물의 능력을 확인해요','인물 카드에 적힌 능력을 확인하세요.',''];const wrap=document.createElement('div'),pic=image(c);pic.classList.add('dialog-card');wrap.append(pic);const label=document.createElement('p');label.className='dialog-label';label.textContent=c.group==='인물'?'CHARACTER · 인물':c.group==='역할'?'ROLE · 역할':c.group==='무기'?'WEAPON · 무기':c.group==='장비'?'EQUIPMENT · 장비':'PLAYING CARD · 일반';const h=document.createElement('h2');h.id='dialog-title';h.textContent=c.name;const brief=document.createElement('p');brief.className='dialog-summary';brief.textContent=d[1];const text=document.createElement('p');text.className='dialog-detail';text.textContent=c.group==='역할'?roleDescriptions[key]:d[2];const note=document.createElement('p');note.className='dialog-note';note.textContent=key==='renegade'?'배신자는 보안관을 마지막에 제거해야 해요. 보안관이 먼저 죽으면 즉시 끝나요. 그때 배신자 혼자 남아 있어야 배신자 승리, 그렇지 않으면 무법자 승리예요.':d[3];wrap.append(label,h,brief,text,note);$('#dialog-body').replaceChildren(wrap);$('#card-dialog').setAttribute('aria-labelledby','dialog-title');$('#card-dialog').showModal();}
$$('[data-card]').forEach(b=>b.onclick=()=>openCard(b.dataset.card));$('#close-dialog').onclick=()=>$('#card-dialog').close();$('#card-dialog').onclick=e=>{if(e.target===$('#card-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}};
for(const [question,answer,key] of faqs){const d=document.createElement('details'),s=document.createElement('summary'),p=document.createElement('p'),b=document.createElement('button');s.textContent=question;p.textContent=answer;b.className='text-button';b.textContent='관련 카드 보기 →';b.onclick=()=>openCard(key);p.append(document.createElement('br'),b);d.append(s,p);$('#faq').append(d);}
$$('[data-answer]').forEach(b=>b.onclick=()=>{$$('[data-answer]').forEach(x=>x.classList.toggle('chosen',x===b));$('#quiz-result').textContent=b.dataset.answer==='right'?'정답! 현재 생명이 3이므로 손패도 3장만 남겨요. 앞에 장착한 카드는 세지 않아요.':'턴 종료 때는 현재 생명 수만큼만 들고 있어요. 손패 5장 − 생명 3 = 2장을 버려요.';});
function distance(){const base=Math.min(target,6-target),sc=$('#scope').checked?1:0,mu=$('#mustang').checked?1:0,dist=Math.max(1,base-sc+mu),range=Number($('#weapon').value);$('#distance-result').textContent=`거리 ${dist} · 사거리 ${range} → ${dist<=range?'쏠 수 있어요!':'사거리 밖이에요.'}`;$$('#seat-map button').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.seat)===target));}
for(let i=0;i<6;i++){const a=(Math.PI/3)*i+Math.PI/2,b=document.createElement('button');b.style.setProperty('--x',Math.cos(a)*105+'px');b.style.setProperty('--y',Math.sin(a)*99+'px');b.dataset.seat=i;b.textContent=i===0?'나':String.fromCharCode(64+i);b.setAttribute('aria-label',i===0?'내 자리':String.fromCharCode(64+i)+' 자리 선택');if(i===0){b.className='me';b.disabled=true;}else b.onclick=()=>{target=i;distance();};$('#seat-map').append(b);}['weapon','scope','mustang'].forEach(id=>$('#'+id).onchange=distance);distance();
for(const f of ['전체','일반','무기','장비','인물','역할']){const b=document.createElement('button');b.textContent=f;b.setAttribute('aria-pressed',f===filter);b.onclick=()=>{filter=f;$$('#filters button').forEach(x=>x.setAttribute('aria-pressed',x.textContent===f));renderCards();};$('#filters').append(b);}
function renderCards(){const q=$('#search').value.trim().toLowerCase().replace(/\s/g,'');const list=cards.filter(c=>(filter==='전체'||c.group===filter)&&(!q||(c.name+c.key).toLowerCase().replace(/\s/g,'').includes(q)));$('#card-grid').replaceChildren();for(const c of list){const b=document.createElement('button');b.className='index-card';b.append(image(c));const name=document.createElement('b'),desc=document.createElement('small');name.textContent=c.name;desc.textContent=(info[c.key]||[])[1]||'특수 능력 보기';b.append(name,desc);b.setAttribute('aria-label',c.name+' 설명 보기');b.onclick=()=>openCard(c.key);$('#card-grid').append(b);}$('#card-count').textContent=`${list.length}종${filter==='전체'?' · 기본판 카드·인물·역할 + 콜트 45 참고':''}`;$('#no-cards').hidden=list.length>0;}
$('#search').oninput=renderCards;
$('#character-guide-link').onclick=e=>{e.preventDefault();filter='인물';$('#search').value='';$$('#filters button').forEach(b=>b.setAttribute('aria-pressed',b.textContent==='인물'));setMode('cards');};
let toastTimer;function toast(t){$('#toast').textContent=t;$('#toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').style.display='none',3000);}

async function init(){try{const res=await fetch('assets/cards.json');if(!res.ok)throw new Error('카드 정보');cards=(await res.json()).cards;const missing=cards.filter(c=>!info[c.key]);if(missing.length)console.warn('카드 설명 누락',missing.map(c=>c.key));place('#hero-card','outlaw');place('#setup-character','bart-cassidy');place('#setup-weapon','colt-45');place('#bang-example','bang');place('#missed-example','missed');for(const key of ['sheriff','deputy','outlaw','renegade']){const c=cards.find(x=>x.key===key),d=info[key],r=document.createElement('button'),h=document.createElement('h3');r.className='role';r.type='button';r.dataset.role=key;r.setAttribute('aria-label',c.name+' 역할 설명 보기');r.onclick=()=>openCard(key);h.textContent=c.name;r.append(image(c),h);$('#roles').append(r);}updateRoleCounts();renderCards();const hash=location.hash.slice(1);if(['home','learn','setup','turn','play','cards'].includes(hash))setMode(hash,false);}catch{toast('카드 이미지를 불러오지 못했어요. 새로고침해 주세요.');}}
init();
