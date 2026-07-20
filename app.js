import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

const STORAGE_KEY = "chadFinanceV2";
const defaultCategories = ["Alcohol","Bills & Direct Debits","Cafes","Cash","Child Support","Dining Out","Education","Entertainment","Fuel","Groceries","Health & Fitness","Home & Maintenance","Income","Insurance","Loans & Finance","Loans & Mortgages","Medical","Personal Care","Pets","Refunds","Shopping","Subscriptions","Take Away","Transfers","Transport","Travel","Uncategorised","Vehicles"];
const defaultRules = [
["WOOLWORTH","Groceries","Supermarket"],["COLES","Groceries","Supermarket"],["ALDI","Groceries","Supermarket"],["IGA","Groceries","Supermarket"],["MCDONALD","Take Away","Fast Food"],["KFC","Take Away","Fast Food"],["HUNGRY JACK","Take Away","Fast Food"],["RED ROOSTER","Take Away","Fast Food"],["YEEDA ROAD PTY LTD","Take Away","Fast Food"],["UBER EATS","Take Away","Food Delivery"],["ALHGROUP","Dining Out","Restaurant"],["CAFE","Cafes","Cafe / Coffee"],["COFFEE","Cafes","Cafe / Coffee"],["DAN MURPHY","Alcohol","Bottle Shop / Winery"],["BWS","Alcohol","Bottle Shop / Winery"],["BUNNINGS","Home & Maintenance","Hardware"],["PETBARN","Pets","Pet Supplies"],["CHEMIST WAREHOUSE","Medical","Pharmacy"],["NETFLIX","Subscriptions","Digital / Phone"],["AUDIBLE","Subscriptions","Digital / Phone"],["OPENAI","Subscriptions","Digital / Phone"],["REVO FITNESS","Health & Fitness","Gym"],["AMAZON","Shopping","Online Retail"],["EBAY","Shopping","Online Retail"],["AMPOL","Fuel","Fuel & Convenience"],["SHELL","Fuel","Fuel & Convenience"],["BP ","Fuel","Fuel & Convenience"],["WILSON PARKING","Transport","Parking"],["UBER TRIP","Transport","Rideshare"]
].map(([pattern,category,subcategory])=>({pattern,category,subcategory,asset:""}));

let state=loadState(), deferredPrompt=null, pendingPdfRows=[];

function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{transactions:[],rules:defaultRules,reviewQueue:[]}}catch{return{transactions:[],rules:defaultRules,reviewQueue:[]}}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
const money=n=>new Intl.NumberFormat("en-AU",{style:"currency",currency:"AUD"}).format(Number(n)||0);
const pct=n=>`${Math.round((Number(n)||0)*100)}%`;
const normalise=s=>String(s||"").trim();
const upper=s=>normalise(s).toUpperCase();
const idFor=t=>`${t.date}|${t.description}|${t.amount}`;
const escapeHtml=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const escapeAttr=escapeHtml;

function parseNumber(v){if(v==null)return 0;const raw=String(v);const s=raw.replace(/[$,\s]/g,"").replace(/[()]/g,"");const n=Number(s);return Number.isFinite(n)?(raw.includes("(")?-n:n):0}
function parseDate(v){const s=normalise(v);if(!s)return"";const p=s.split(/[\/\-]/);if(p.length===3){let[a,b,c]=p.map(Number);if(c<100)c+=2000;if(a>12)return`${c}-${String(b).padStart(2,"0")}-${String(a).padStart(2,"0")}`}const d=new Date(s);return isNaN(d)?s:d.toISOString().slice(0,10)}
function parseCSV(text){const rows=[];let row=[],cell="",quoted=false;for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c=='"'&&quoted&&n=='"'){cell+='"';i++}else if(c=='"'){quoted=!quoted}else if(c==","&&!quoted){row.push(cell);cell=""}else if((c=="\n"||c=="\r")&&!quoted){if(c=="\r"&&n=="\n")i++;row.push(cell);if(row.some(v=>v.trim()!=""))rows.push(row);row=[];cell=""}else cell+=c}if(cell.length||row.length){row.push(cell);rows.push(row)}return rows}
function findHeader(headers,names){const up=headers.map(upper);for(const name of names){const i=up.findIndex(h=>h===name||h.includes(name));if(i>=0)return i}return-1}

function suggest(description){
 const t=upper(description),rules=[
 [["CAFE","COFFEE","BAKERY"],"Cafes","Cafe / Coffee",.82],[["HOTEL","TAVERN","PUB","BISTRO","ALHGROUP"],"Dining Out","Restaurant",.78],[["MCDONALD","KFC","RED ROOSTER","HUNGRY JACK","SUBWAY","PIZZA","BURGER","KEBAB","YEEDA ROAD"],"Take Away","Fast Food",.90],[["UBER EATS","MENULOG","DOORDASH"],"Take Away","Food Delivery",.94],[["WOOLWORTH","COLES","IGA","ALDI","SUPERMARKET","GROCER"],"Groceries","Supermarket",.91],[["LIQUOR","BOTTLE","DAN MURPHY","BWS","WINERY"],"Alcohol","Bottle Shop / Winery",.91],[["AMPOL","CALTEX","SHELL","PETROL","FUEL","UNITED PETROLEUM"],"Fuel","Fuel & Convenience",.89],[["BUNNINGS","HARDWARE","MITRE 10"],"Home & Maintenance","Hardware",.89],[["CHEMIST","PHARMACY"],"Medical","Pharmacy",.91],[["PETBARN","PETSTOCK","VET ","VETERINARY"],"Pets","Pet Supplies",.84],[["NETFLIX","OPENAI","AUDIBLE","SPOTIFY","DISNEY","APPLE.COM/BILL"],"Subscriptions","Digital / Phone",.82],[["WILSON PARKING","EASYPARK","PARKING"],"Transport","Parking",.90],[["UBER TRIP","DIDI","TAXI"],"Transport","Rideshare",.89],[["AMAZON","EBAY","KMART","TARGET","BIG W"],"Shopping","Online Retail",.74],[["REVO FITNESS","GYM","FITNESS"],"Health & Fitness","Gym",.90],[["BARBER","HAIRDRESS","SALON"],"Personal Care","Hair",.88]];
 for(const [words,category,subcategory,confidence] of rules)if(words.some(w=>t.includes(w)))return{category,subcategory,confidence};
 return{category:"Uncategorised",subcategory:"Review Required",confidence:.35}
}
function applyRule(tx){const text=upper(`${tx.description} ${tx.merchant||""}`),rule=state.rules.find(r=>text.includes(upper(r.pattern)));if(rule)return{...tx,category:rule.category,subcategory:rule.subcategory,asset:rule.asset||"",reviewed:true,auto:true};const s=suggest(text);return{...tx,category:s.category,subcategory:s.subcategory,reviewed:s.confidence>=.85,auto:s.confidence>=.85,suggestion:s}}

async function importCSV(file){
 const rows=parseCSV(await file.text());if(rows.length<2)throw new Error("No transaction rows found.");
 const h=rows[0],dateI=findHeader(h,["DATE","TRANSACTION DATE","POSTED DATE"]),descI=findHeader(h,["DESCRIPTION","DETAILS","TRANSACTION DESCRIPTION","NARRATIVE"]),debitI=findHeader(h,["DEBIT","WITHDRAWAL"]),creditI=findHeader(h,["CREDIT","DEPOSIT"]),amountI=findHeader(h,["AMOUNT"]),merchantI=findHeader(h,["MERCHANT","PAYEE"]);
 if(dateI<0||descI<0)throw new Error("Could not detect Date and Description columns.");
 const txs=[];for(const r of rows.slice(1)){const date=parseDate(r[dateI]),description=normalise(r[descI]);if(!date||!description)continue;let amount=amountI>=0?parseNumber(r[amountI]):parseNumber(r[creditI])-Math.abs(parseNumber(r[debitI]));txs.push({date,description,merchant:merchantI>=0?normalise(r[merchantI]):"",amount,source:"CSV"})}
 commitTransactions(txs,"CSV");
}

async function extractPdfText(file){
 const data=new Uint8Array(await file.arrayBuffer());
 const pdf=await pdfjsLib.getDocument({data}).promise;
 const pages=[];
 for(let p=1;p<=pdf.numPages;p++){
   const page=await pdf.getPage(p),content=await page.getTextContent();
   const items=content.items.map(x=>({str:x.str,x:x.transform[4],y:x.transform[5]})).filter(x=>x.str.trim());
   items.sort((a,b)=>Math.abs(b.y-a.y)>2?b.y-a.y:a.x-b.x);
   const lines=[];let current=[],lastY=null;
   for(const item of items){
     if(lastY===null||Math.abs(item.y-lastY)<=2){current.push(item)}
     else{lines.push(current.sort((a,b)=>a.x-b.x).map(x=>x.str).join(" ").replace(/\s+/g," ").trim());current=[item]}
     lastY=item.y;
   }
   if(current.length)lines.push(current.sort((a,b)=>a.x-b.x).map(x=>x.str).join(" ").replace(/\s+/g," ").trim());
   pages.push(lines);
 }
 return pages;
}

function parseSuncorpPdfPages(pages){
 const all=pages.flat();
 const dateRx=/^(\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?)/;
 const amountRx=/(-?\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})|\(?\$?\d+\.\d{2}\)?)/g;
 const parsed=[];let currentYear=new Date().getFullYear();

 const periodText=all.find(l=>/statement period|from .* to /i.test(l))||"";
 const years=[...periodText.matchAll(/\b(20\d{2})\b/g)].map(m=>Number(m[1]));
 if(years.length)currentYear=Math.max(...years);

 for(let i=0;i<all.length;i++){
   const line=all[i].trim();
   const dm=line.match(dateRx);
   if(!dm)continue;
   if(/opening balance|closing balance|balance brought forward/i.test(line))continue;

   let work=line,rawDate=dm[1],dateParts=rawDate.split(/[\/\-]/);
   if(dateParts.length===2)rawDate=`${rawDate}/${currentYear}`;
   const date=parseDate(rawDate);
   work=work.slice(dm[0].length).trim();

   const amounts=[...work.matchAll(amountRx)];
   if(!amounts.length)continue;

   let description=work;
   let amount=null,confidence=.70;

   // Most bank lines end with debit/credit and then running balance.
   if(amounts.length>=2){
     const transactionToken=amounts[amounts.length-2][0];
     const txIndex=amounts[amounts.length-2].index;
     amount=parseNumber(transactionToken);
     description=work.slice(0,txIndex).trim();
     confidence=.86;
   }else{
     const token=amounts[0][0],idx=amounts[0].index;
     amount=parseNumber(token);description=work.slice(0,idx).trim();confidence=.62;
   }

   // Infer debits from common debit transaction descriptions when PDF does not show a minus sign.
   if(amount>0 && /(eftpos|purchase|visa|debit|withdrawal|payment|direct debit|fee|transfer to|bp[a-z]*\s|cash withdrawal)/i.test(description)){
     amount=-Math.abs(amount);confidence-=.05;
   }
   if(/salary|interest credit|deposit|credit received|transfer from|refund/i.test(description)){
     amount=Math.abs(amount);
   }

   description=description.replace(/\s+/g," ").trim();
   if(description.length<2||Math.abs(amount)===0)continue;

   parsed.push({date,description,merchant:"",amount,confidence,source:"PDF",selected:confidence>=.60});
 }
 return dedupeParsed(parsed);
}

function dedupeParsed(rows){
 const seen=new Set();return rows.filter(r=>{const k=`${r.date}|${r.description}|${r.amount}`;if(seen.has(k))return false;seen.add(k);return true})
}

async function handlePdf(file){
 showNotice("Reading PDF statement on this device...");
 const pages=await extractPdfText(file);
 const rows=parseSuncorpPdfPages(pages);
 if(!rows.length)throw new Error("No transaction rows could be recognised. This may be a scanned PDF or a different statement layout.");
 pendingPdfRows=rows;renderPdfPreview(file.name,pages.length,rows);document.querySelector("#previewDialog").showModal();
}

function renderPdfPreview(name,pageCount,rows){
 document.querySelector("#previewMeta").textContent=`${name} • ${pageCount} page${pageCount===1?"":"s"} • ${rows.length} possible transactions`;
 document.querySelector("#previewBody").innerHTML=rows.map((r,i)=>`<tr>
 <td><input type="checkbox" data-pdf-i="${i}" ${r.selected?"checked":""}></td>
 <td><input data-pdf-i="${i}" data-pdf-k="date" value="${escapeAttr(r.date)}"></td>
 <td><input data-pdf-i="${i}" data-pdf-k="description" value="${escapeAttr(r.description)}"></td>
 <td><input data-pdf-i="${i}" data-pdf-k="amount" value="${r.amount}"></td>
 <td class="${r.confidence>=.8?"conf-high":r.confidence>=.6?"conf-med":"conf-low"}">${pct(r.confidence)}</td></tr>`).join("");
 document.querySelectorAll("#previewBody input").forEach(el=>el.addEventListener("change",e=>{
   const i=Number(e.target.dataset.pdfI);
   if(e.target.type==="checkbox")pendingPdfRows[i].selected=e.target.checked;
   else{const k=e.target.dataset.pdfK;pendingPdfRows[i][k]=k==="amount"?parseNumber(e.target.value):e.target.value}
 }));
}

function commitTransactions(txs,label){
 const existing=new Set(state.transactions.map(idFor));let added=0,auto=0,skipped=0;
 for(const tx of txs){if(existing.has(idFor(tx))){skipped++;continue}const c=applyRule(tx);if(c.reviewed)auto++;state.transactions.push(c);existing.add(idFor(tx));added++}
 rebuildReviewQueue();saveState();renderAll();showNotice(`Imported ${added} new ${label} transactions. ${auto} were auto-categorised. ${state.reviewQueue.length} merchants need review. ${skipped} duplicates were skipped.`);
}

function rebuildReviewQueue(){const groups=new Map();for(const tx of state.transactions.filter(t=>!t.reviewed)){const pattern=upper(tx.merchant||tx.description),item=groups.get(pattern)||{pattern,description:tx.description,total:0,count:0,...suggest(tx.description),chosenCategory:"",chosenSubcategory:"",asset:"",accept:false};item.total+=Math.abs(tx.amount);item.count++;groups.set(pattern,item)}state.reviewQueue=[...groups.values()].sort((a,b)=>b.total-a.total)}
function learnAccepted(){const accepted=state.reviewQueue.filter(q=>q.accept&&(q.chosenCategory||q.category)!=="Uncategorised");for(const q of accepted){const rule={pattern:q.pattern,category:q.chosenCategory||q.category,subcategory:q.chosenSubcategory||q.subcategory,asset:q.asset||""};if(!state.rules.some(r=>upper(r.pattern)===upper(rule.pattern)))state.rules.unshift(rule);for(const tx of state.transactions)if(upper(`${tx.description} ${tx.merchant||""}`).includes(upper(rule.pattern))){tx.category=rule.category;tx.subcategory=rule.subcategory;tx.asset=rule.asset;tx.reviewed=true;tx.auto=false}}rebuildReviewQueue();saveState();renderAll();showNotice(`Learned ${accepted.length} merchant rule${accepted.length===1?"":"s"}.`)}

function renderAll(){renderDashboard();renderTransactions();renderReview();renderRules();renderCategoryOptions()}
function renderDashboard(){const income=state.transactions.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),expense=state.transactions.filter(t=>t.amount<0).reduce((s,t)=>s+Math.abs(t.amount),0);document.querySelector("#kpiIncome").textContent=money(income);document.querySelector("#kpiExpense").textContent=money(expense);document.querySelector("#kpiNet").textContent=money(income-expense);document.querySelector("#kpiReview").textContent=state.reviewQueue.length;document.querySelector("#transactionCount").textContent=state.transactions.length;document.querySelector("#ruleCount").textContent=state.rules.length;document.querySelector("#autoRate").textContent=state.transactions.length?pct(state.transactions.filter(t=>t.reviewed).length/state.transactions.length):"0%";const latest=state.transactions.map(t=>t.date).sort().at(-1),month=latest?latest.slice(0,7):"",monthTx=state.transactions.filter(t=>t.date.startsWith(month)),mi=monthTx.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),me=monthTx.filter(t=>t.amount<0).reduce((s,t)=>s+Math.abs(t.amount),0);document.querySelector("#monthIncome").textContent=money(mi);document.querySelector("#monthExpense").textContent=money(me);document.querySelector("#monthNet").textContent=money(mi-me);const cats={};for(const t of state.transactions.filter(t=>t.amount<0))cats[t.category]=(cats[t.category]||0)+Math.abs(t.amount);const top=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,10),max=top[0]?.[1]||1;document.querySelector("#categoryBars").innerHTML=top.length?top.map(([c,v])=>`<div class="bar-row"><span>${escapeHtml(c)}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><strong>${money(v)}</strong></div>`).join(""):"<p>No transactions imported yet.</p>";drawCashflow()}
function drawCashflow(){const canvas=document.querySelector("#cashflowChart"),ctx=canvas.getContext("2d"),dpr=window.devicePixelRatio||1,cssW=canvas.clientWidth||900,cssH=320;canvas.width=cssW*dpr;canvas.height=cssH*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,cssW,cssH);const monthly={};for(const t of state.transactions){const m=t.date.slice(0,7);monthly[m]||={income:0,expense:0};t.amount>0?monthly[m].income+=t.amount:monthly[m].expense+=Math.abs(t.amount)}const labels=Object.keys(monthly).sort().slice(-12);if(!labels.length){ctx.fillStyle="#64748b";ctx.fillText("No data yet",20,35);return}const max=Math.max(...labels.flatMap(m=>[monthly[m].income,monthly[m].expense]),1),pad=40,chartW=cssW-pad*2,chartH=cssH-pad*2,step=chartW/Math.max(labels.length-1,1);ctx.strokeStyle="#cbd5e1";ctx.beginPath();ctx.moveTo(pad,pad);ctx.lineTo(pad,cssH-pad);ctx.lineTo(cssW-pad,cssH-pad);ctx.stroke();function series(key,color){ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();labels.forEach((m,i)=>{const x=pad+i*step,y=cssH-pad-(monthly[m][key]/max)*chartH;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()}series("income","#15803d");series("expense","#b91c1c")}
function renderTransactions(){const q=upper(document.querySelector("#transactionSearch").value),cat=document.querySelector("#categoryFilter").value,rows=state.transactions.filter(t=>(!q||upper(`${t.description} ${t.merchant}`).includes(q))&&(!cat||t.category===cat)).sort((a,b)=>b.date.localeCompare(a.date));document.querySelector("#transactionsBody").innerHTML=rows.map(t=>`<tr><td>${escapeHtml(t.date)}</td><td>${escapeHtml(t.description)}</td><td class="amount ${t.amount<0?"expense":"income"}">${money(t.amount)}</td><td>${escapeHtml(t.category)}</td><td>${escapeHtml(t.subcategory||"")}</td><td><span class="status ${t.reviewed?"reviewed":"pending"}">${t.reviewed?"Reviewed":"Review"}</span></td></tr>`).join("")}
function renderReview(){const list=document.querySelector("#reviewList");if(!state.reviewQueue.length){list.innerHTML="<div class='panel'><p>Everything is categorised. No merchants need review.</p></div>";return}list.innerHTML=state.reviewQueue.map((q,i)=>`<article class="review-card"><header><div><strong>${escapeHtml(q.pattern)}</strong><div>${escapeHtml(q.description)}</div></div><div><strong>${money(q.total)}</strong><div>${q.count} transaction${q.count===1?"":"s"}</div></div></header><div class="review-grid"><label>Suggested category<input value="${escapeAttr(q.category)}" disabled></label><label>Confidence<input value="${pct(q.confidence)}" disabled></label><label>Chosen category<input data-i="${i}" data-k="chosenCategory" list="categoryList" value="${escapeAttr(q.chosenCategory||q.category)}"></label><label>Chosen subcategory<input data-i="${i}" data-k="chosenSubcategory" value="${escapeAttr(q.chosenSubcategory||q.subcategory)}"></label><label>Asset<input data-i="${i}" data-k="asset" value="${escapeAttr(q.asset||"")}" placeholder="Optional"></label><label>Accept rule<select data-i="${i}" data-k="accept"><option value="false"${!q.accept?" selected":""}>No</option><option value="true"${q.accept?" selected":""}>Yes</option></select></label></div></article>`).join("");list.querySelectorAll("[data-i]").forEach(el=>el.addEventListener("change",e=>{const i=Number(e.target.dataset.i),k=e.target.dataset.k;state.reviewQueue[i][k]=k==="accept"?e.target.value==="true":e.target.value;saveState()}))}
function renderRules(){document.querySelector("#rulesBody").innerHTML=state.rules.map((r,i)=>`<tr><td>${escapeHtml(r.pattern)}</td><td>${escapeHtml(r.category)}</td><td>${escapeHtml(r.subcategory||"")}</td><td>${escapeHtml(r.asset||"")}</td><td><button class="danger delete-rule" data-i="${i}">Delete</button></td></tr>`).join("");document.querySelectorAll(".delete-rule").forEach(b=>b.onclick=()=>{state.rules.splice(Number(b.dataset.i),1);saveState();renderAll()})}
function renderCategoryOptions(){const categories=[...new Set([...defaultCategories,...state.rules.map(r=>r.category)])].sort();document.querySelector("#categoryList").innerHTML=categories.map(c=>`<option value="${escapeAttr(c)}">`).join("");const filter=document.querySelector("#categoryFilter"),current=filter.value;filter.innerHTML=`<option value="">All categories</option>`+categories.map(c=>`<option${c===current?" selected":""}>${escapeHtml(c)}</option>`).join("")}
function showNotice(text){const el=document.querySelector("#importSummary");el.textContent=text;el.classList.remove("hidden");setTimeout(()=>el.classList.add("hidden"),9000)}

document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.querySelector(`#${btn.dataset.view}`).classList.add("active");if(btn.dataset.view==="dashboard")drawCashflow()});
document.querySelector("#csvInput").onchange=e=>{const f=e.target.files[0];if(f)importCSV(f).catch(err=>alert(err.message));e.target.value=""};
document.querySelector("#pdfInput").onchange=e=>{const f=e.target.files[0];if(f)handlePdf(f).catch(err=>alert(err.message));e.target.value=""};
document.querySelector("#confirmPdfImportBtn").onclick=e=>{e.preventDefault();const selected=pendingPdfRows.filter(r=>r.selected).map(({selected,confidence,...r})=>r);document.querySelector("#previewDialog").close();commitTransactions(selected,"PDF");pendingPdfRows=[]};
document.querySelector("#transactionSearch").oninput=renderTransactions;document.querySelector("#categoryFilter").onchange=renderTransactions;document.querySelector("#applyReviewsBtn").onclick=learnAccepted;
document.querySelector("#addRuleBtn").onclick=()=>document.querySelector("#ruleDialog").showModal();
document.querySelector("#saveRuleBtn").onclick=e=>{e.preventDefault();const pattern=normalise(document.querySelector("#rulePattern").value),category=normalise(document.querySelector("#ruleCategory").value);if(!pattern||!category)return;state.rules.unshift({pattern:upper(pattern),category,subcategory:normalise(document.querySelector("#ruleSubcategory").value),asset:normalise(document.querySelector("#ruleAsset").value)});document.querySelector("#ruleForm").reset();document.querySelector("#ruleDialog").close();saveState();renderAll()};
document.querySelector("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`chad-finance-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href)};
document.querySelector("#backupInput").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{state=JSON.parse(await f.text());saveState();renderAll();showNotice("Backup restored.")}catch{alert("That backup file could not be read.")}e.target.value=""};
document.querySelector("#clearBtn").onclick=()=>{if(confirm("Delete all transactions, review items and custom rules from this device?")){state={transactions:[],rules:defaultRules,reviewQueue:[]};saveState();renderAll()}};
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.querySelector("#installBtn").classList.remove("hidden")});
document.querySelector("#installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js");
renderAll();
