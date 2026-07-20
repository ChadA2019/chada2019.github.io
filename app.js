import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

const STORAGE_KEY="chadFinanceV3";
const defaultCategories=["Alcohol","Bills & Direct Debits","Cafes","Cash","Child Support","Dining Out","Education","Entertainment","Fuel","Groceries","Health & Fitness","Home & Maintenance","Income","Insurance","Loans & Finance","Loans & Mortgages","Medical","Personal Care","Pets","Refunds","Shopping","Subscriptions","Take Away","Transfers","Transport","Travel","Uncategorised","Vehicles"];
const defaultAssets=["General","Amarok","Home","Investment Property","Holiday Home","Audi TT","Ford Ranger","PPS"];
const defaultRules=[
["WOOLWORTH","Groceries","Supermarket"],["COLES","Groceries","Supermarket"],["ALDI","Groceries","Supermarket"],["IGA","Groceries","Supermarket"],["MCDONALD","Take Away","Fast Food"],["KFC","Take Away","Fast Food"],["HUNGRY JACK","Take Away","Fast Food"],["RED ROOSTER","Take Away","Fast Food"],["UBER EATS","Take Away","Food Delivery"],["ALHGROUP","Dining Out","Restaurant"],["CAFE","Cafes","Cafe / Coffee"],["COFFEE","Cafes","Cafe / Coffee"],["DAN MURPHY","Alcohol","Bottle Shop / Winery"],["BWS","Alcohol","Bottle Shop / Winery"],["BUNNINGS","Home & Maintenance","Hardware"],["PETBARN","Pets","Pet Supplies"],["CHEMIST WAREHOUSE","Medical","Pharmacy"],["NETFLIX","Subscriptions","Digital / Phone"],["AUDIBLE","Subscriptions","Digital / Phone"],["OPENAI","Subscriptions","Digital / Phone"],["REVO FITNESS","Health & Fitness","Gym"],["AMAZON","Shopping","Online Retail"],["EBAY","Shopping","Online Retail"],["AMPOL","Fuel","Fuel & Convenience"],["SHELL","Fuel","Fuel & Convenience"],["BP ","Fuel","Fuel & Convenience"],["WILSON PARKING","Transport","Parking"],["UBER TRIP","Transport","Rideshare"]
].map(([pattern,category,subcategory])=>({pattern,category,subcategory,asset:""}));

let state=loadState(),pendingPdfRows=[],deferredPrompt=null;
function loadState(){try{const s=JSON.parse(localStorage.getItem(STORAGE_KEY));if(s)return{transactions:s.transactions||[],rules:s.rules||defaultRules,reviewQueue:s.reviewQueue||[],assets:s.assets||defaultAssets,theme:s.theme||"light"}}catch{}return{transactions:[],rules:defaultRules,reviewQueue:[],assets:defaultAssets,theme:"light"}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
const money=n=>new Intl.NumberFormat("en-AU",{style:"currency",currency:"AUD"}).format(Number(n)||0);
const pct=n=>`${Math.round((Number(n)||0)*100)}%`;const norm=s=>String(s||"").trim();const upper=s=>norm(s).toUpperCase();const idFor=t=>`${t.date}|${t.description}|${Number(t.amount).toFixed(2)}`;
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function parseNumber(v){if(v==null)return 0;const raw=String(v),s=raw.replace(/[$,\s]/g,"").replace(/[()]/g,"");const n=Number(s);return Number.isFinite(n)?(raw.includes("(")?-n:n):0}
function parseDate(v){const s=norm(v);if(!s)return"";const p=s.split(/[\/\-]/);if(p.length===3){let[a,b,c]=p.map(Number);if(c<100)c+=2000;if(a>12)return`${c}-${String(b).padStart(2,"0")}-${String(a).padStart(2,"0")}`}const d=new Date(s);return isNaN(d)?s:d.toISOString().slice(0,10)}
function parseCSV(text){const rows=[];let row=[],cell="",q=false;for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c=='"'&&q&&n=='"'){cell+='"';i++}else if(c=='"')q=!q;else if(c==","&&!q){row.push(cell);cell=""}else if((c=="\n"||c=="\r")&&!q){if(c=="\r"&&n=="\n")i++;row.push(cell);if(row.some(v=>v.trim()!=""))rows.push(row);row=[];cell=""}else cell+=c}if(cell.length||row.length){row.push(cell);rows.push(row)}return rows}
function findHeader(h,names){const up=h.map(upper);for(const n of names){const i=up.findIndex(x=>x===n||x.includes(n));if(i>=0)return i}return-1}
function suggest(t){t=upper(t);const rules=[
[["CAFE","COFFEE","BAKERY"],"Cafes","Cafe / Coffee",.82],[["HOTEL","TAVERN","PUB","BISTRO","ALHGROUP"],"Dining Out","Restaurant",.78],[["MCDONALD","KFC","RED ROOSTER","HUNGRY JACK","SUBWAY","PIZZA","BURGER","KEBAB"],"Take Away","Fast Food",.9],[["UBER EATS","MENULOG","DOORDASH"],"Take Away","Food Delivery",.94],[["WOOLWORTH","COLES","IGA","ALDI","SUPERMARKET","GROCER"],"Groceries","Supermarket",.91],[["LIQUOR","BOTTLE","DAN MURPHY","BWS","WINERY"],"Alcohol","Bottle Shop / Winery",.91],[["AMPOL","CALTEX","SHELL","PETROL","FUEL","UNITED PETROLEUM"],"Fuel","Fuel & Convenience",.89],[["BUNNINGS","HARDWARE","MITRE 10"],"Home & Maintenance","Hardware",.89],[["CHEMIST","PHARMACY"],"Medical","Pharmacy",.91],[["PETBARN","PETSTOCK","VET ","VETERINARY"],"Pets","Pet Supplies",.84],[["NETFLIX","OPENAI","AUDIBLE","SPOTIFY","DISNEY","APPLE.COM/BILL"],"Subscriptions","Digital / Phone",.82],[["WILSON PARKING","EASYPARK","PARKING"],"Transport","Parking",.9],[["UBER TRIP","DIDI","TAXI"],"Transport","Rideshare",.89],[["AMAZON","EBAY","KMART","TARGET","BIG W"],"Shopping","Retail",.74],[["REVO FITNESS","GYM","FITNESS"],"Health & Fitness","Gym",.9],[["BARBER","HAIRDRESS","SALON"],"Personal Care","Hair",.88]];
for(const [w,c,s,confidence] of rules)if(w.some(x=>t.includes(x)))return{category:c,subcategory:s,confidence};return{category:"Uncategorised",subcategory:"Review Required",confidence:.35}}
function applyRule(tx){const text=upper(`${tx.description} ${tx.merchant||""}`),r=state.rules.find(x=>text.includes(upper(x.pattern)));if(r)return{...tx,category:r.category,subcategory:r.subcategory,asset:r.asset||tx.asset||"",reviewed:true,auto:true,taxDeductible:!!tx.taxDeductible,tag:tx.tag||"",notes:tx.notes||""};const s=suggest(text);return{...tx,category:s.category,subcategory:s.subcategory,reviewed:s.confidence>=.85,auto:s.confidence>=.85,suggestion:s,taxDeductible:!!tx.taxDeductible,tag:tx.tag||"",notes:tx.notes||"",asset:tx.asset||""}}
async function importCSV(file){const rows=parseCSV(await file.text());if(rows.length<2)throw Error("No transaction rows found.");const h=rows[0],di=findHeader(h,["DATE","TRANSACTION DATE","POSTED DATE"]),de=findHeader(h,["DESCRIPTION","DETAILS","TRANSACTION DESCRIPTION","NARRATIVE"]),db=findHeader(h,["DEBIT","WITHDRAWAL"]),cr=findHeader(h,["CREDIT","DEPOSIT"]),am=findHeader(h,["AMOUNT"]),me=findHeader(h,["MERCHANT","PAYEE"]);if(di<0||de<0)throw Error("Could not detect Date and Description columns.");const txs=[];for(const r of rows.slice(1)){const date=parseDate(r[di]),description=norm(r[de]);if(!date||!description)continue;const amount=am>=0?parseNumber(r[am]):parseNumber(r[cr])-Math.abs(parseNumber(r[db]));txs.push({date,description,merchant:me>=0?norm(r[me]):"",amount,source:"CSV"})}commitTransactions(txs,"CSV")}
async function extractPdfText(file){const pdf=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise,pages=[];for(let p=1;p<=pdf.numPages;p++){const page=await pdf.getPage(p),content=await page.getTextContent(),items=content.items.map(x=>({str:x.str,x:x.transform[4],y:x.transform[5]})).filter(x=>x.str.trim()).sort((a,b)=>Math.abs(b.y-a.y)>2?b.y-a.y:a.x-b.x),lines=[];let cur=[],y=null;for(const item of items){if(y===null||Math.abs(item.y-y)<=2)cur.push(item);else{lines.push(cur.sort((a,b)=>a.x-b.x).map(x=>x.str).join(" ").replace(/\s+/g," ").trim());cur=[item]}y=item.y}if(cur.length)lines.push(cur.sort((a,b)=>a.x-b.x).map(x=>x.str).join(" ").replace(/\s+/g," ").trim());pages.push(lines)}return pages}
function parsePdfPages(pages){
  const rows=[];
  const seen=new Set();

  // Suncorp statements use dates such as "1 Feb 2025", followed by
  // transaction details, the transaction amount, the resulting balance,
  // and sometimes a reference number.
  const dateRx=/^(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})\s+(.+)$/;
  const moneyToken=String.raw`\d{1,3}(?:,\d{3})*\.\d{2}`;
  const txRx=new RegExp(`^(.+?)\\s+(${moneyToken})\\s+(${moneyToken})(?:\\s+.*)?$`);

  let currentBalance=null;
  let currentAccount="";
  let pending=null;

  function flushPending(){
    if(!pending)return;
    pending.description=pending.description.replace(/\s+/g," ").trim();
    if(pending.description.length>1 && pending.amount!==0){
      const key=idFor(pending);
      if(!seen.has(key)){
        seen.add(key);
        rows.push(pending);
      }
    }
    pending=null;
  }

  for(const page of pages){
    for(const rawLine of page){
      const line=rawLine.replace(/\s+/g," ").trim();
      if(!line)continue;

      const accountMatch=line.match(/^(?:Everyday Options Statement|Sub-Account)\s+(\d{6,})/i);
      if(accountMatch){
        currentAccount=accountMatch[1];
        continue;
      }

      const opening=line.match(/^(?:Opening Balance|BALANCE BROUGHT FORWARD)\s+(${moneyToken})$/i);
      if(opening){
        flushPending();
        currentBalance=parseNumber(opening[1]);
        continue;
      }

      const carried=line.match(/^(?:BALANCE CARRIED FORWARD|CLOSING BALANCE)\s+(${moneyToken})$/i);
      if(carried){
        flushPending();
        currentBalance=parseNumber(carried[1]);
        continue;
      }

      const dm=line.match(dateRx);
      if(dm){
        flushPending();

        const date=parseDate(dm[1]);
        const body=dm[2];
        const tm=body.match(txRx);
        if(!tm)continue;

        const description=tm[1].trim();
        const displayedAmount=parseNumber(tm[2]);
        const resultingBalance=parseNumber(tm[3]);

        let amount=-Math.abs(displayedAmount);
        let confidence=.82;

        if(currentBalance!==null){
          const delta=Number((resultingBalance-currentBalance).toFixed(2));
          if(Math.abs(Math.abs(delta)-displayedAmount)<=0.02){
            amount=delta;
            confidence=.98;
          }else{
            // Fallback to transaction wording when a page or account
            // boundary prevents balance reconciliation.
            if(/refund|credit|deposit|payment from|transfer credit|interest/i.test(description)){
              amount=Math.abs(displayedAmount);
            }
            confidence=.72;
          }
        }else if(/refund|credit|deposit|payment from|transfer credit|interest/i.test(description)){
          amount=Math.abs(displayedAmount);
          confidence=.72;
        }

        currentBalance=resultingBalance;
        pending={
          date,
          description,
          merchant:"",
          amount,
          confidence,
          source:"PDF",
          sourceAccount:currentAccount,
          selected:confidence>=.70
        };
        continue;
      }

      // Add useful continuation lines to the transaction description,
      // but skip page furniture, references and foreign-currency values.
      if(pending){
        const skip=
          /^(?:AUD|BALANCE|Date Transaction Details|Account Transactions|Everyday Options Statement|Statement No:|Details are continued|The SUNCORP brand|Suncorp Bank|Page \d+ of \d+|REFERENCE|REF NO|EFFECTIVE DATE|Opening Balance|CLOSING BALANCE)/i.test(line) ||
          /^\d+(?:\.\d{3})?\s+[A-Z]{3}$/.test(line) ||
          /^(?:VV|E|A|I-GEN|OSK|OAP|SCT|PEP)[A-Z0-9\s]+$/i.test(line);

        if(!skip){
          pending.description += " " + line;
        }
      }
    }
    flushPending();
  }

  return rows;
}

async function handlePdf(file){showNotice("Reading PDF on this device...");const pages=await extractPdfText(file),rows=parsePdfPages(pages);if(!rows.length)throw Error("No transactions could be recognised. It may be a scanned PDF or a different layout.");pendingPdfRows=rows;document.querySelector("#previewMeta").textContent=`${file.name} • ${pages.length} pages • ${rows.length} possible transactions`;document.querySelector("#previewBody").innerHTML=rows.map((r,i)=>`<tr><td><input type="checkbox" data-pdf-i="${i}" ${r.selected?"checked":""}></td><td><input data-pdf-i="${i}" data-pdf-k="date" value="${esc(r.date)}"></td><td><input data-pdf-i="${i}" data-pdf-k="description" value="${esc(r.description)}"></td><td><input data-pdf-i="${i}" data-pdf-k="amount" value="${r.amount}"></td><td>${pct(r.confidence)}</td></tr>`).join("");document.querySelectorAll("#previewBody input").forEach(el=>el.onchange=e=>{const i=+e.target.dataset.pdfI;if(e.target.type==="checkbox")pendingPdfRows[i].selected=e.target.checked;else pendingPdfRows[i][e.target.dataset.pdfK]=e.target.dataset.pdfK==="amount"?parseNumber(e.target.value):e.target.value});document.querySelector("#previewDialog").showModal()}
function commitTransactions(txs,label){const existing=new Set(state.transactions.map(idFor));let added=0,auto=0,skip=0;for(const tx of txs){if(existing.has(idFor(tx))){skip++;continue}const c=applyRule(tx);if(c.reviewed)auto++;state.transactions.push(c);existing.add(idFor(tx));added++}rebuildReviewQueue();saveState();renderAll();showNotice(`Imported ${added} ${label} transactions. ${auto} categorised automatically. ${skip} duplicates skipped.`)}
function rebuildReviewQueue(){const g=new Map();for(const t of state.transactions.filter(x=>!x.reviewed)){const pattern=upper(t.merchant||t.description),q=g.get(pattern)||{pattern,description:t.description,total:0,count:0,...suggest(t.description),chosenCategory:"",chosenSubcategory:"",asset:"",accept:false};q.total+=Math.abs(t.amount);q.count++;g.set(pattern,q)}state.reviewQueue=[...g.values()].sort((a,b)=>b.total-a.total)}
function learnAccepted(){const accepted=state.reviewQueue.filter(q=>q.accept&&(q.chosenCategory||q.category)!=="Uncategorised");for(const q of accepted){const rule={pattern:q.pattern,category:q.chosenCategory||q.category,subcategory:q.chosenSubcategory||q.subcategory,asset:q.asset||""};if(!state.rules.some(r=>upper(r.pattern)===upper(rule.pattern)))state.rules.unshift(rule);for(const t of state.transactions)if(upper(`${t.description} ${t.merchant||""}`).includes(upper(rule.pattern))){t.category=rule.category;t.subcategory=rule.subcategory;t.asset=rule.asset;t.reviewed=true}}rebuildReviewQueue();saveState();renderAll();showNotice(`Learned ${accepted.length} merchant rules.`)}
function renderAll(){renderCategoriesAssets();renderDashboard();renderTransactions();renderReview();renderRules();renderReports();renderAssetSettings()}
function dateFiltered(){const f=document.querySelector("#dashFrom").value,t=document.querySelector("#dashTo").value;return state.transactions.filter(x=>(!f||x.date>=f)&&(!t||x.date<=t))}
function renderDashboard(){const all=state.transactions,inc=all.filter(x=>x.amount>0).reduce((s,x)=>s+x.amount,0),exp=all.filter(x=>x.amount<0).reduce((s,x)=>s+Math.abs(x.amount),0);kpiIncome.textContent=money(inc);kpiExpense.textContent=money(exp);kpiNet.textContent=money(inc-exp);kpiReview.textContent=state.reviewQueue.length;transactionCount.textContent=all.length;ruleCount.textContent=state.rules.length;autoRate.textContent=all.length?pct(all.filter(x=>x.reviewed).length/all.length):"0%";const p=dateFiltered(),pi=p.filter(x=>x.amount>0).reduce((s,x)=>s+x.amount,0),pe=p.filter(x=>x.amount<0).reduce((s,x)=>s+Math.abs(x.amount),0);periodIncome.textContent=money(pi);periodExpense.textContent=money(pe);periodNet.textContent=money(pi-pe);const cats={};for(const x of p.filter(x=>x.amount<0))cats[x.category]=(cats[x.category]||0)+Math.abs(x.amount);const top=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,10),max=top[0]?.[1]||1;categoryBars.innerHTML=top.length?top.map(([c,v])=>`<div class="bar-row"><span>${esc(c)}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><strong>${money(v)}</strong></div>`).join(""):"<p>No transactions.</p>";drawCashflow()}
function drawCashflow(){const c=cashflowChart,ctx=c.getContext("2d"),dpr=devicePixelRatio||1,w=c.clientWidth||900,h=320;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);const m={};for(const t of state.transactions){const k=t.date.slice(0,7);m[k]||={income:0,expense:0};t.amount>0?m[k].income+=t.amount:m[k].expense+=Math.abs(t.amount)}const labels=Object.keys(m).sort().slice(-12);if(!labels.length)return;const max=Math.max(...labels.flatMap(k=>[m[k].income,m[k].expense]),1),pad=40,step=(w-pad*2)/Math.max(labels.length-1,1),ch=h-pad*2;ctx.strokeStyle="#94a3b8";ctx.beginPath();ctx.moveTo(pad,pad);ctx.lineTo(pad,h-pad);ctx.lineTo(w-pad,h-pad);ctx.stroke();for(const [key,color] of [["income","#16a34a"],["expense","#dc2626"]]){ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();labels.forEach((k,i)=>{const x=pad+i*step,y=h-pad-(m[k][key]/max)*ch;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()}}
function renderTransactions(){const q=upper(transactionSearch.value),cat=categoryFilter.value,asset=assetFilter.value,rows=state.transactions.map((t,i)=>({...t,_i:i})).filter(t=>(!q||upper(`${t.description} ${t.merchant} ${t.tag} ${t.notes}`).includes(q))&&(!cat||t.category===cat)&&(!asset||t.asset===asset)).sort((a,b)=>b.date.localeCompare(a.date));transactionsBody.innerHTML=rows.map(t=>`<tr><td>${esc(t.date)}</td><td>${esc(t.description)}</td><td>${money(t.amount)}</td><td>${esc(t.category)}</td><td>${esc(t.asset||"")}</td><td>${t.taxDeductible?"Yes":"No"}</td><td><span class="status ${t.reviewed?"reviewed":"pending"}">${t.reviewed?"Reviewed":"Review"}</span></td><td><button class="link-btn edit-tx" data-i="${t._i}">Edit</button></td></tr>`).join("");document.querySelectorAll(".edit-tx").forEach(b=>b.onclick=()=>openTransaction(+b.dataset.i))}
function openTransaction(i=null){const t=i===null?{date:new Date().toISOString().slice(0,10),amount:"",description:"",category:"Uncategorised",subcategory:"",asset:"",taxDeductible:false,tag:"",notes:""}:state.transactions[i];txIndex.value=i===null?"":i;transactionDialogTitle.textContent=i===null?"Add Transaction":"Edit Transaction";txDate.value=t.date;txAmount.value=t.amount;txDescription.value=t.description;txCategory.value=t.category;txSubcategory.value=t.subcategory||"";txAsset.value=t.asset||"";txTax.value=String(!!t.taxDeductible);txTag.value=t.tag||"";txNotes.value=t.notes||"";transactionDialog.showModal()}
function renderReview(){reviewList.innerHTML=state.reviewQueue.length?state.reviewQueue.map((q,i)=>`<article class="review-card"><header><div><strong>${esc(q.pattern)}</strong><div>${esc(q.description)}</div></div><div><strong>${money(q.total)}</strong><div>${q.count} transactions</div></div></header><div class="review-grid"><label>Suggested<input value="${esc(q.category)}" disabled></label><label>Confidence<input value="${pct(q.confidence)}" disabled></label><label>Chosen category<input data-i="${i}" data-k="chosenCategory" list="categoryList" value="${esc(q.chosenCategory||q.category)}"></label><label>Subcategory<input data-i="${i}" data-k="chosenSubcategory" value="${esc(q.chosenSubcategory||q.subcategory)}"></label><label>Asset<input data-i="${i}" data-k="asset" list="assetListData" value="${esc(q.asset||"")}"></label><label>Accept<select data-i="${i}" data-k="accept"><option value="false"${!q.accept?" selected":""}>No</option><option value="true"${q.accept?" selected":""}>Yes</option></select></label></div></article>`).join(""):"<div class='panel'><p>No merchants need review.</p></div>";document.querySelectorAll("#reviewList [data-i]").forEach(el=>el.onchange=e=>{const q=state.reviewQueue[+e.target.dataset.i],k=e.target.dataset.k;q[k]=k==="accept"?e.target.value==="true":e.target.value;saveState()})}
function renderRules(){rulesBody.innerHTML=state.rules.map((r,i)=>`<tr><td>${esc(r.pattern)}</td><td>${esc(r.category)}</td><td>${esc(r.subcategory||"")}</td><td>${esc(r.asset||"")}</td><td><button class="link-btn danger-link del-rule" data-i="${i}">Delete</button></td></tr>`).join("");document.querySelectorAll(".del-rule").forEach(b=>b.onclick=()=>{state.rules.splice(+b.dataset.i,1);saveState();renderAll()})}
function renderReports(){const years=[...new Set(state.transactions.map(t=>+t.date.slice(0,4)+(+(t.date.slice(5,7))>=7?1:0)))].sort((a,b)=>b-a);if(!years.length)years.push(new Date().getFullYear());const current=+fySelect.value||years[0];fySelect.innerHTML=years.map(y=>`<option value="${y}"${y===current?" selected":""}>${y-1}/${String(y).slice(-2)}</option>`).join("");const start=`${current-1}-07-01`,end=`${current}-06-30`,tx=state.transactions.filter(t=>t.date>=start&&t.date<=end),inc=tx.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),exp=tx.filter(t=>t.amount<0).reduce((s,t)=>s+Math.abs(t.amount),0),tax=tx.filter(t=>t.amount<0&&t.taxDeductible).reduce((s,t)=>s+Math.abs(t.amount),0);fyIncome.textContent=money(inc);fyExpense.textContent=money(exp);fyTax.textContent=money(tax);const assets={};for(const t of tx.filter(x=>x.amount<0)){const a=t.asset||"Unassigned";assets[a]=(assets[a]||0)+Math.abs(t.amount)}assetSummary.innerHTML=Object.entries(assets).sort((a,b)=>b[1]-a[1]).map(([a,v])=>`<div><span>${esc(a)}</span><strong>${money(v)}</strong></div>`).join("")||"<p>No asset data.</p>";const large=tx.filter(t=>t.amount<0).sort((a,b)=>a.amount-b.amount).slice(0,10);largestExpenses.innerHTML=`<table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead><tbody>${large.map(t=>`<tr><td>${t.date}</td><td>${esc(t.description)}</td><td>${esc(t.category)}</td><td>${money(Math.abs(t.amount))}</td></tr>`).join("")}</tbody></table>`}
function renderCategoriesAssets(){const cats=[...new Set([...defaultCategories,...state.rules.map(r=>r.category)])].sort();categoryList.innerHTML=cats.map(c=>`<option value="${esc(c)}">`).join("");const cv=categoryFilter.value;categoryFilter.innerHTML=`<option value="">All categories</option>`+cats.map(c=>`<option${c===cv?" selected":""}>${esc(c)}</option>`).join("");assetListData.innerHTML=state.assets.map(a=>`<option value="${esc(a)}">`).join("");const av=assetFilter.value;assetFilter.innerHTML=`<option value="">All assets</option>`+state.assets.map(a=>`<option${a===av?" selected":""}>${esc(a)}</option>`).join("")}
function renderAssetSettings(){assetList.innerHTML=state.assets.map((a,i)=>`<span class="chip">${esc(a)} <button class="link-btn danger-link del-asset" data-i="${i}">×</button></span>`).join("");document.querySelectorAll(".del-asset").forEach(b=>b.onclick=()=>{state.assets.splice(+b.dataset.i,1);saveState();renderAll()})}
function showNotice(t){importSummary.textContent=t;importSummary.classList.remove("hidden");setTimeout(()=>importSummary.classList.add("hidden"),9000)}

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector(`#${b.dataset.view}`).classList.add("active");if(b.dataset.view==="dashboard")drawCashflow()});
csvInput.onchange=e=>{const f=e.target.files[0];if(f)importCSV(f).catch(x=>alert(x.message));e.target.value=""};
pdfInput.onchange=e=>{const f=e.target.files[0];if(f)handlePdf(f).catch(x=>alert(x.message));e.target.value=""};
confirmPdfImportBtn.onclick=e=>{e.preventDefault();const rows=pendingPdfRows.filter(r=>r.selected).map(({selected,confidence,...r})=>r);previewDialog.close();commitTransactions(rows,"PDF");pendingPdfRows=[]};
applyReviewsBtn.onclick=learnAccepted;transactionSearch.oninput=renderTransactions;categoryFilter.onchange=renderTransactions;assetFilter.onchange=renderTransactions;dashFrom.onchange=renderDashboard;dashTo.onchange=renderDashboard;fySelect.onchange=renderReports;
addTransactionBtn.onclick=()=>openTransaction();saveTransactionBtn.onclick=e=>{e.preventDefault();const t={date:txDate.value,amount:+txAmount.value,description:txDescription.value,category:txCategory.value,subcategory:txSubcategory.value,asset:txAsset.value,taxDeductible:txTax.value==="true",tag:txTag.value,notes:txNotes.value,reviewed:true,auto:false,source:"Manual"};const i=txIndex.value;if(i==="")state.transactions.push(t);else state.transactions[+i]={...state.transactions[+i],...t};rebuildReviewQueue();saveState();transactionDialog.close();renderAll()};
addRuleBtn.onclick=()=>ruleDialog.showModal();saveRuleBtn.onclick=e=>{e.preventDefault();state.rules.unshift({pattern:upper(rulePattern.value),category:ruleCategory.value,subcategory:ruleSubcategory.value,asset:ruleAsset.value});ruleForm.reset();ruleDialog.close();saveState();renderAll()};
addAssetBtn.onclick=()=>{const a=norm(newAssetName.value);if(a&&!state.assets.includes(a))state.assets.push(a);newAssetName.value="";saveState();renderAll()};
exportBtn.onclick=()=>{const a=document.createElement("a"),blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});a.href=URL.createObjectURL(blob);a.download=`chad-finance-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href)};
exportCsvBtn.onclick=()=>{const cols=["date","description","amount","category","subcategory","asset","taxDeductible","tag","notes"],lines=[cols.join(",")];for(const t of state.transactions)lines.push(cols.map(c=>`"${String(t[c]??"").replaceAll('"','""')}"`).join(","));const a=document.createElement("a"),blob=new Blob([lines.join("\n")],{type:"text/csv"});a.href=URL.createObjectURL(blob);a.download="finance-transactions.csv";a.click();URL.revokeObjectURL(a.href)};
backupInput.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{state=JSON.parse(await f.text());saveState();renderAll();showNotice("Backup restored.")}catch{alert("Could not read backup.")}e.target.value=""};
clearBtn.onclick=()=>{if(confirm("Delete all local finance data?")){state={transactions:[],rules:defaultRules,reviewQueue:[],assets:defaultAssets,theme:state.theme};saveState();renderAll()}};
themeBtn.onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";saveState();drawCashflow()};
document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove("hidden")});installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js");
renderAll();
