export const categories=[
 {id:'international',label:'Send money internationally',tip:'Compare the amount the recipient actually receives, including local payout and currency conversion.'},
 {id:'everyday',label:'Everyday digital payments',tip:'Check whether the recipient accepts this exact asset on the same network.'},
 {id:'stable',label:'Reduce exposure to price swings',tip:'Stablecoins aim to track a reference currency, but can lose their peg and have issuer and redemption risks.'}
];
export const assets=[
 {id:'stellar-xlm',name:'Stellar (XLM)',network:'Stellar',type:'Native network asset',uses:['international','everyday'],summary:'Stellar supports low-cost settlement and cross-border payment infrastructure; XLM is its native asset.',caution:'XLM price fluctuates. Local cash-out partners, conversion fees and destination support determine actual cost.',source:'https://stellar.org/learn/cross-border-payments'},
 {id:'solana-sol',name:'Solana (SOL)',network:'Solana',type:'Native network asset',uses:['everyday','international'],summary:'Solana supports fast, low-network-fee payments and stablecoin transfers; SOL is used for network fees.',caution:'SOL price fluctuates. Priority fees, account creation and third-party charges may apply.',source:'https://solana.com/docs/payments'},
 {id:'usdc-stellar',name:'USDC on Stellar',network:'Stellar',type:'USD-referenced stablecoin',uses:['international','stable','everyday'],summary:'A dollar-referenced asset on Stellar that can be used for supported transfers and local payout routes.',caution:'Not a bank deposit or a guarantee of value. Check issuer, wallet, local ramp and redemption availability.',source:'https://stellar.org/learn/what-are-stablecoins'},
 {id:'usdc-solana',name:'USDC on Solana',network:'Solana',type:'USD-referenced stablecoin',uses:['international','stable','everyday'],summary:'A dollar-referenced asset on Solana for supported digital payments.',caution:'Not a bank deposit or a guarantee of value. Verify network, recipient support and total fees.',source:'https://www.circle.com/usdc'}
];
export function optionsFor(purpose){return assets.filter(a=>a.uses.includes(purpose));}
export function mountUtilityGuide(host,initial='international'){
 const root=document.createElement('section');root.className='utility-guide';root.setAttribute('aria-label','Crypto utility guide');host.append(root);
 const make=(tag,value,parent=root)=>{const e=document.createElement(tag);e.textContent=value;parent.append(e);return e;};
 make('h3','Find crypto by purpose');make('p','Educational examples — not a quote, asset recommendation, or enabled transfer.');
 const label=make('label','What do you want to do?');const select=make('select','',label);
 for(const c of categories)select.add(new Option(c.label,c.id));select.value=categories.some(c=>c.id===initial)?initial:categories[0].id;
 const tip=make('p','');tip.setAttribute('role','status');const results=make('div','');
 function render(){
 const c=categories.find(c=>c.id===select.value);tip.textContent=c.tip;results.replaceChildren();
 for(const a of optionsFor(c.id)){const card=make('article','',results);card.className='utility-card';make('strong',a.name,card);make('p',a.network+' · '+a.type,card);make('p',a.summary,card);make('p',a.caution,card);const source=make('a','Official explanation',card);source.href=a.source;source.target='_blank';source.rel='noopener noreferrer';}
 }
 select.addEventListener('change',render);render();
 make('p','Before sending: compare network charges, conversion spread, deposit and withdrawal charges, payout time, country availability and recipient compatibility. A conventional remittance service may cost less.');
 make('p','No live prices or fee estimates are loaded. Stellar connectivity and transfers are not enabled in this build.');
}
