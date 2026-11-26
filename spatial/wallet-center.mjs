import {createWalletView} from '../wallets.mjs';

export function mountWalletCenter(host,{providers=()=>({evm:window.ethereum,solana:window.phantom?.solana})}={}){
 const root=document.createElement('section');root.setAttribute('aria-label','Public wallet account view');host.append(root);
 const make=(tag,content,parent=root)=>{const el=document.createElement(tag);el.textContent=content;parent.append(el);return el;};
 make('p','Connect an existing wallet to view its public account. No signature, transfer, balance request or private key is needed.');
 const evm=make('button','Connect injected Ethereum-compatible wallet'),sol=make('button','Connect injected Phantom Solana wallet'),clear=make('button','Clear local account view');
 for(const b of [evm,sol,clear])b.type='button';
 const details=make('dl','');details.hidden=true;
 const fields={};for(const [key,label] of [['kind','Wallet family'],['address','Public address'],['chain','Network / chain ID']]){make('dt',label,details);fields[key]=make('dd','',details);}
 const status=make('p','No account connected.');status.setAttribute('role','status');
 make('p','This prototype displays one wallet at a time. Multi-wallet aggregation and balances are not enabled. Clearing the local view does not revoke permissions in your wallet.');
 let disposed=false,busy=false,adapter=null,generation=0;
 function update(value){if(disposed)return;details.hidden=!value;for(const key of Object.keys(fields))fields[key].textContent=value?.[key]||'';if(!value&&!busy)status.textContent='No public account is displayed.';}
 async function connect(kind){
  if(disposed||busy)return;busy=true;const id=++generation;evm.disabled=sol.disabled=true;status.textContent='Waiting for your wallet…';
  try{adapter?.clear();adapter=createWalletView(providers(),update);const result=await adapter.connect(kind);if(!disposed&&id===generation)status.textContent=result?'Public account connected. No transaction requested.':'Connection cleared or changed.';}
  catch{if(!disposed&&id===generation)status.textContent='Connection unavailable or declined. Open a supported wallet browser and try again.';}
  finally{if(!disposed&&id===generation){busy=false;evm.disabled=sol.disabled=false;}}
 }
 evm.addEventListener('click',()=>connect('evm'));sol.addEventListener('click',()=>connect('solana'));
 clear.addEventListener('click',()=>{generation++;adapter?.clear();busy=false;evm.disabled=sol.disabled=false;status.textContent='Local account cleared. Manage site permissions in your wallet.';});
 return ()=>{if(disposed)return;disposed=true;generation++;adapter?.clear();root.remove();};
}
