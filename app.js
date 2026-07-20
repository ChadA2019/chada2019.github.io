import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

const STORAGE_KEY="balanceIQV5";
const APP_VERSION="5.2.1";
const LEGACY_STORAGE_KEYS=["chadFinanceV3","chadFinanceV4"];
const defaultCategories=["Alcohol","Bills & Direct Debits","Cafes","Cash","Child Support","Dining Out","Education","Entertainment","Fuel","Groceries","Health & Fitness","Home & Maintenance","Income","Insurance","Loans & Finance","Loans & Mortgages","Medical","Personal Care","Pets","Refunds","Shopping","Subscriptions","Take Away","Transfers","Transport","Travel","Uncategorised","Vehicles"];
const subcategoriesByCategory={
  "Alcohol":["Bottle Shop / Winery","Bar / Pub","Other Alcohol"],
  "Bills & Direct Debits":["Utilities","Phone / Internet","Council / Rates","Other Bill"],
  "Cafes":["Cafe / Coffee","Bakery","Lunch Bar"],
  "Cash":["ATM Withdrawal","Cash Deposit"],
  "Child Support":["Child Support Payment","Child Support Adjustment"],
  "Dining Out":["Restaurant","Pub / Tavern","Hotel Dining","Other Dining"],
  "Education":["Course / Training","Books / Materials","School Fees"],
  "Entertainment":["Cinema","Events","Attractions","Games"],
  "Fuel":["Fuel & Convenience","Petrol Station","Diesel","EV Charging"],
  "Groceries":["Supermarket","Fresh Food","Specialty Grocer"],
  "Health & Fitness":["Gym","Sport / Recreation","Health Club"],
  "Home & Maintenance":["Hardware","Repairs","Garden / Mowing","Cleaning","Pool"],
  "Income":["Salary / Wages","Rental Income","Business Income","Interest","Other Income"],
  "Insurance":["Vehicle Insurance","Home Insurance","Health Insurance","Other Insurance"],
  "Loans & Finance":["Loan Repayment","Bank Fee","Interest Charge","Finance Charge"],
  "Loans & Mortgages":["Mortgage","Vehicle Loan","Caravan Loan","Other Loan"],
  "Medical":["Pharmacy","Doctor","Dental","Specialist","Hospital"],
  "Personal Care":["Hair","Beauty","Clothing Care"],
  "Pets":["Pet Supplies","Veterinary","Pet Services"],
  "Refunds":["Purchase Refund","Fee Refund","Other Refund"],
  "Shopping":["Retail","Online Retail","Clothing","Electronics","Homewares"],
  "Subscriptions":["Digital / Phone","Streaming","Software","Membership"],
  "Take Away":["Fast Food","Food Delivery","Takeaway Restaurant"],
  "Transfers":["Internal Transfer","External Transfer","Osko / PayID"],
  "Transport":["Parking","Rideshare","Public Transport","Taxi","Tolls"],
  "Travel":["Accommodation","Flights","Car Hire","Tours / Attractions","Travel Booking"],
  "Uncategorised":["Review Required"],
  "Vehicles":["Registration / Insurance","Maintenance","Parts / Accessories","Loan","Fuel"]
};
function getSubcategories(category,current=""){
  const list=[...(subcategoriesByCategory[category]||[])];
  if(current && !list.includes(current)) list.unshift(current);
  return list;
}

function getAllCategories(){
  return [...new Set([
    ...defaultCategories,
    ...state.rules.map(r=>r.category),
    ...Object.keys(subcategoriesByCategory)
  ])].filter(Boolean).sort();
}
function populateReceiptSubcategories(selected=""){
  const category=receiptCategory.value||"Uncategorised";
  const options=getSubcategories(category,selected);
  if(!options.length)options.push("Other");
  receiptSubcategory.innerHTML=options
    .map(s=>`<option value="${esc(s)}"${s===selected?" selected":""}>${esc(s)}</option>`)
    .join("");
}
function populateReceiptCategories(selected="Uncategorised",subcategory=""){
  const categories=getAllCategories();
  if(selected && !categories.includes(selected))categories.unshift(selected);
  receiptCategory.innerHTML=categories
    .map(c=>`<option value="${esc(c)}"${c===selected?" selected":""}>${esc(c)}</option>`)
    .join("");
  receiptCategory.value=categories.includes(selected)?selected:"Uncategorised";
  populateReceiptSubcategories(subcategory);
}
function fillCategorySelect(categoryEl,subcategoryEl,selected="Uncategorised",selectedSub=""){
  const categories=getAllCategories();
  if(selected&&!categories.includes(selected))categories.unshift(selected);
  categoryEl.innerHTML=categories.map(c=>`<option value="${esc(c)}"${c===selected?" selected":""}>${esc(c)}</option>`).join("");
  categoryEl.value=categories.includes(selected)?selected:"Uncategorised";
  fillSubcategorySelect(categoryEl,subcategoryEl,selectedSub);
}
function fillSubcategorySelect(categoryEl,subcategoryEl,selected=""){
  const options=getSubcategories(categoryEl.value||"Uncategorised",selected);
  if(!options.length)options.push("Other");
  subcategoryEl.innerHTML=options.map(s=>`<option value="${esc(s)}"${s===selected?" selected":""}>${esc(s)}</option>`).join("");
}
function fillAssetSelect(el,selected=""){
  const assets=[...state.assets];
  if(selected&&!assets.includes(selected))assets.unshift(selected);
  el.innerHTML=`<option value="">Unassigned</option>`+assets.map(a=>`<option value="${esc(a)}"${a===selected?" selected":""}>${esc(a)}</option>`).join("");
}
function sampleTransactions(){
  const today=new Date(), iso=d=>d.toISOString().slice(0,10), day=n=>{const d=new Date(today);d.setDate(d.getDate()-n);return iso(d)};
  return [
    {date:day(1),description:"Sample Salary",amount:2500,category:"Income",subcategory:"Salary / Wages",asset:"",reviewed:true,auto:false,source:"Sample",taxDeductible:false,tag:"",notes:""},
    {date:day(2),description:"Sample Supermarket",amount:-142.35,category:"Groceries",subcategory:"Supermarket",asset:"",reviewed:true,auto:false,source:"Sample",taxDeductible:false,tag:"",notes:""},
    {date:day(4),description:"Sample Fuel",amount:-86.20,category:"Fuel",subcategory:"Fuel & Convenience",asset:"",reviewed:true,auto:false,source:"Sample",taxDeductible:false,tag:"",notes:""}
  ];
}
function addSampleData(){
  if(state.transactions.some(t=>t.source==="Sample"))return alert("Sample data is already loaded.");
  state.transactions.push(...sampleTransactions());
  saveState();renderAll();showNotice("Optional sample data loaded. You can remove it from Transactions or clear all data.");
}

const defaultAssets=[];
const defaultRules=[];

let state=loadState(),pendingPdfRows=[],pendingReceiptImage="",deferredPrompt=null;
function loadState(){
  let raw=localStorage.getItem(STORAGE_KEY);
  if(!raw){for(const key of LEGACY_STORAGE_KEYS){if(localStorage.getItem(key)){raw=localStorage.getItem(key);break}}}
  try{
    const s=JSON.parse(raw);
    if(s)return{
      transactions:s.transactions||[],
      receipts:s.receipts||[],
      rules:s.rules||[],
      reviewQueue:s.reviewQueue||[],
      assets:s.assets||[],
      theme:s.theme||"light",
      currency:s.currency||"AUD",
      usageMode:s.usageMode||"personal",
      onboardingComplete:s.onboardingComplete ?? true
    };
  }catch{}
  return{
    transactions:[],
    receipts:[],
    rules:[],
    reviewQueue:[],
    assets:[],
    theme:"light",
    currency:"AUD",
    usageMode:"personal",
    onboardingComplete:false
  };
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
const money=n=>new Intl.NumberFormat(undefined,{style:"currency",currency:state.currency||"AUD"}).format(Number(n)||0);
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

function cleanMerchant(s){return upper(s).replace(/\b(PTY|LTD|LIMITED|AUSTRALIA|AUS|STORE|SHOP|CARD|PURCHASE|VISA|MASTERCARD)\b/g," ").replace(/\d{3,}/g," ").replace(/[^A-Z ]/g," ").replace(/\s+/g," ").trim()}
function dayDifference(a,b){return Math.abs((new Date(a)-new Date(b))/86400000)}
function tokenSimilarity(a,b){const A=new Set(cleanMerchant(a).split(" ").filter(x=>x.length>2)),B=new Set(cleanMerchant(b).split(" ").filter(x=>x.length>2));if(!A.size||!B.size)return 0;const common=[...A].filter(x=>B.has(x)).length;return common/Math.max(A.size,B.size)}
function receiptMatchScore(receipt,tx){
  if(tx.amount>=0)return 0;
  const amountDiff=Math.abs(Math.abs(tx.amount)-Number(receipt.amount));
  if(amountDiff>Math.max(.05,Number(receipt.amount)*.015))return 0;
  const days=dayDifference(receipt.date,tx.date);if(days>31)return 0;
  let score=amountDiff<=.02?60:42;
  score+=days<=2?20:days<=7?14:days<=14?8:3;
  score+=Math.round(tokenSimilarity(receipt.merchant,`${tx.merchant||""} ${tx.description}`)*20);
  if(receipt.account&&tx.sourceAccount&&cleanMerchant(receipt.account)===cleanMerchant(tx.sourceAccount))score+=5;
  return Math.min(score,100);
}
function reconcileIncomingTransaction(tx){
  const candidates=state.receipts.filter(r=>["awaiting","suggested"].includes(r.status)).map(r=>({r,score:receiptMatchScore(r,tx)})).filter(x=>x.score>=55).sort((a,b)=>b.score-a.score);
  if(!candidates.length)return null;
  const best=candidates[0];
  if(best.score>=82 && (!candidates[1]||best.score-candidates[1].score>=8)){
    const r=best.r;r.status="matched";r.matchConfidence=best.score;r.bankDate=tx.date;r.bankDescription=tx.description;r.sourceAccount=tx.sourceAccount||r.account||"";
    const existing=state.transactions.find(t=>t.receiptId===r.id);
    if(existing){Object.assign(existing,{date:tx.date,bankDate:tx.date,description:r.merchant||tx.description,bankDescription:tx.description,amount:tx.amount,source:tx.source,sourceAccount:tx.sourceAccount||"",reconciliationStatus:"matched",matchConfidence:best.score});}
    return{matched:true,receipt:r};
  }
  best.r.status="suggested";best.r.suggestedBankTransaction={date:tx.date,description:tx.description,amount:tx.amount,source:tx.source,sourceAccount:tx.sourceAccount||"",score:best.score};
  return null;
}
function receiptFingerprint(r){return `${r.date}|${cleanMerchant(r.merchant)}|${Number(r.amount).toFixed(2)}|${r.receiptNumber||""}`}
function readFileDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)})}
function commitTransactions(txs,label){
  const existing=new Set(state.transactions.filter(t=>!t.receiptId||t.reconciliationStatus==="matched").map(idFor));let added=0,auto=0,skip=0,matched=0,suggested=0;
  for(const tx of txs){
    if(existing.has(idFor(tx))){skip++;continue}
    const outcome=reconcileIncomingTransaction(tx);
    if(outcome?.matched){matched++;existing.add(idFor(tx));continue}
    if(state.receipts.some(r=>r.status==="suggested"&&r.suggestedBankTransaction?.description===tx.description&&r.suggestedBankTransaction?.date===tx.date))suggested++;
    const c=applyRule(tx);if(c.reviewed)auto++;state.transactions.push(c);existing.add(idFor(tx));added++;
  }
  rebuildReviewQueue();saveState();renderAll();showNotice(`Imported ${added} new ${label} transactions. ${matched} receipts matched automatically. ${suggested} possible matches need confirmation. ${skip} duplicates skipped.`)
}
function rebuildReviewQueue(){const g=new Map();for(const t of state.transactions.filter(x=>!x.reviewed)){const pattern=upper(t.merchant||t.description),q=g.get(pattern)||{pattern,description:t.description,total:0,count:0,...suggest(t.description),chosenCategory:"",chosenSubcategory:"",asset:"",accept:false};q.total+=Math.abs(t.amount);q.count++;g.set(pattern,q)}state.reviewQueue=[...g.values()].sort((a,b)=>b.total-a.total)}
function learnAccepted(){const accepted=state.reviewQueue.filter(q=>q.accept&&(q.chosenCategory||q.category)!=="Uncategorised");for(const q of accepted){const rule={pattern:q.pattern,category:q.chosenCategory||q.category,subcategory:q.chosenSubcategory||q.subcategory,asset:q.asset||""};if(!state.rules.some(r=>upper(r.pattern)===upper(rule.pattern)))state.rules.unshift(rule);for(const t of state.transactions)if(upper(`${t.description} ${t.merchant||""}`).includes(upper(rule.pattern))){t.category=rule.category;t.subcategory=rule.subcategory;t.asset=rule.asset;t.reviewed=true}}rebuildReviewQueue();saveState();renderAll();showNotice(`Learned ${accepted.length} merchant rules.`)}
function renderAll(){renderCategoriesAssets();renderDashboard();renderTransactions();renderReceipts();renderReview();renderRules();renderReports();renderAssetSettings()}
function dateFiltered(){const f=document.querySelector("#dashFrom").value,t=document.querySelector("#dashTo").value;return state.transactions.filter(x=>(!f||x.date>=f)&&(!t||x.date<=t))}
function renderDashboard(){const all=state.transactions,inc=all.filter(x=>x.amount>0).reduce((s,x)=>s+x.amount,0),exp=all.filter(x=>x.amount<0).reduce((s,x)=>s+Math.abs(x.amount),0);kpiIncome.textContent=money(inc);kpiExpense.textContent=money(exp);kpiNet.textContent=money(inc-exp);kpiReview.textContent=state.reviewQueue.length; kpiReceiptMatch.textContent=state.receipts.filter(r=>r.status==="awaiting").length;transactionCount.textContent=all.length;ruleCount.textContent=state.rules.length;autoRate.textContent=all.length?pct(all.filter(x=>x.reviewed).length/all.length):"0%";const p=dateFiltered(),pi=p.filter(x=>x.amount>0).reduce((s,x)=>s+x.amount,0),pe=p.filter(x=>x.amount<0).reduce((s,x)=>s+Math.abs(x.amount),0);periodIncome.textContent=money(pi);periodExpense.textContent=money(pe);periodNet.textContent=money(pi-pe);const cats={};for(const x of p.filter(x=>x.amount<0))cats[x.category]=(cats[x.category]||0)+Math.abs(x.amount);const top=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,10),max=top[0]?.[1]||1;categoryBars.innerHTML=top.length?top.map(([c,v])=>`<div class="bar-row"><span>${esc(c)}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><strong>${money(v)}</strong></div>`).join(""):"<p>No transactions.</p>";drawCashflow()}
function drawCashflow(){const c=cashflowChart,ctx=c.getContext("2d"),dpr=devicePixelRatio||1,w=c.clientWidth||900,h=320;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);const m={};for(const t of state.transactions){const k=t.date.slice(0,7);m[k]||={income:0,expense:0};t.amount>0?m[k].income+=t.amount:m[k].expense+=Math.abs(t.amount)}const labels=Object.keys(m).sort().slice(-12);if(!labels.length)return;const max=Math.max(...labels.flatMap(k=>[m[k].income,m[k].expense]),1),pad=40,step=(w-pad*2)/Math.max(labels.length-1,1),ch=h-pad*2;ctx.strokeStyle="#94a3b8";ctx.beginPath();ctx.moveTo(pad,pad);ctx.lineTo(pad,h-pad);ctx.lineTo(w-pad,h-pad);ctx.stroke();for(const [key,color] of [["income","#16a34a"],["expense","#dc2626"]]){ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();labels.forEach((k,i)=>{const x=pad+i*step,y=h-pad-(m[k][key]/max)*ch;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()}}
function renderTransactions(){const q=upper(transactionSearch.value),cat=categoryFilter.value,asset=assetFilter.value,rows=state.transactions.map((t,i)=>({...t,_i:i})).filter(t=>(!q||upper(`${t.description} ${t.merchant} ${t.tag} ${t.notes}`).includes(q))&&(!cat||t.category===cat)&&(!asset||t.asset===asset)).sort((a,b)=>b.date.localeCompare(a.date));transactionsBody.innerHTML=rows.map(t=>`<tr><td>${esc(t.date)}</td><td>${esc(t.description)}</td><td>${money(t.amount)}</td><td>${esc(t.category)}</td><td>${esc(t.asset||"")}</td><td>${t.taxDeductible?"Yes":"No"}</td><td><span class="status ${t.reviewed?"reviewed":"pending"}">${t.reviewed?"Reviewed":"Review"}</span></td><td><button class="link-btn edit-tx" data-i="${t._i}">Edit</button></td></tr>`).join("");document.querySelectorAll(".edit-tx").forEach(b=>b.onclick=()=>openTransaction(+b.dataset.i))}
function openTransaction(i=null){
  const t=i===null?{date:new Date().toISOString().slice(0,10),amount:"",description:"",category:"Uncategorised",subcategory:"Review Required",asset:"",taxDeductible:false,tag:"",notes:""}:state.transactions[i];
  txIndex.value=i===null?"":i;
  transactionDialogTitle.textContent=i===null?"Add Transaction":"Edit Transaction";
  txDate.value=t.date;txAmount.value=t.amount;txDescription.value=t.description;
  fillCategorySelect(txCategory,txSubcategory,t.category,t.subcategory||"");
  fillAssetSelect(txAsset,t.asset||"");
  txTax.value=String(!!t.taxDeductible);txTag.value=t.tag||"";txNotes.value=t.notes||"";
  transactionDialog.showModal();
}:state.transactions[i];txIndex.value=i===null?"":i;transactionDialogTitle.textContent=i===null?"Add Transaction":"Edit Transaction";txDate.value=t.date;txAmount.value=t.amount;txDescription.value=t.description;txCategory.value=t.category;txSubcategory.value=t.subcategory||"";txAsset.value=t.asset||"";txTax.value=String(!!t.taxDeductible);txTag.value=t.tag||"";txNotes.value=t.notes||"";transactionDialog.showModal()}
function renderReceipts(){
  receiptAwaiting.textContent=state.receipts.filter(r=>r.status==="awaiting").length;
  receiptMatched.textContent=state.receipts.filter(r=>r.status==="matched").length;
  receiptSuggested.textContent=state.receipts.filter(r=>r.status==="suggested").length;
  const ordered=[...state.receipts].sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  receiptList.innerHTML=ordered.length?ordered.map(r=>`<article class="receipt-card">
    <div class="receipt-thumb">${r.image?`<img src="${r.image}" alt="Receipt">`:`<span>▧</span>`}</div>
    <div class="receipt-main"><div class="receipt-title"><strong>${esc(r.merchant)}</strong><strong>${money(r.amount)}</strong></div><div class="receipt-meta">${esc(r.date)} · ${esc(r.category)}${r.account?` · ${esc(r.account)}`:""}</div><span class="status ${r.status==='matched'?'reviewed':'pending'}">${r.status==='matched'?'Matched':r.status==='suggested'?'Confirm match':r.paymentMethod==='Cash'?'Cash purchase':'Awaiting bank match'}</span>
    ${r.status==='suggested'?`<div class="match-suggestion"><b>${r.suggestedBankTransaction.score}% possible match:</b> ${esc(r.suggestedBankTransaction.description)} · ${money(Math.abs(r.suggestedBankTransaction.amount))}<div><button class="link-btn confirm-match" data-id="${r.id}">Confirm</button><button class="link-btn danger-link reject-match" data-id="${r.id}">Reject</button></div></div>`:""}</div>
    <button class="link-btn delete-receipt" data-id="${r.id}">Delete</button>
  </article>`).join(""):"<section class='empty-state'><div>▧</div><h3>No receipts yet</h3><p>Scan a receipt to record the expense immediately.</p></section>";
  document.querySelectorAll('.confirm-match').forEach(b=>b.onclick=()=>confirmReceiptMatch(b.dataset.id));
  document.querySelectorAll('.reject-match').forEach(b=>b.onclick=()=>{const r=state.receipts.find(x=>x.id===b.dataset.id);if(r){r.status='awaiting';delete r.suggestedBankTransaction;saveState();renderAll()}});
  document.querySelectorAll('.delete-receipt').forEach(b=>b.onclick=()=>deleteReceipt(b.dataset.id));
}
function confirmReceiptMatch(id){const r=state.receipts.find(x=>x.id===id);if(!r?.suggestedBankTransaction)return;const tx=r.suggestedBankTransaction;r.status='matched';r.matchConfidence=tx.score;r.bankDate=tx.date;r.bankDescription=tx.description;const existing=state.transactions.find(t=>t.receiptId===r.id);if(existing)Object.assign(existing,{date:tx.date,bankDate:tx.date,amount:tx.amount,bankDescription:tx.description,source:tx.source,sourceAccount:tx.sourceAccount,reconciliationStatus:'matched',matchConfidence:tx.score});const duplicateIndex=state.transactions.findIndex(t=>!t.receiptId&&idFor(t)===idFor(tx));if(duplicateIndex>=0)state.transactions.splice(duplicateIndex,1);delete r.suggestedBankTransaction;saveState();renderAll();showNotice('Receipt and bank transaction reconciled.')}
function deleteReceipt(id){if(!confirm('Delete this receipt and its receipt-created expense?'))return;state.receipts=state.receipts.filter(r=>r.id!==id);state.transactions=state.transactions.filter(t=>t.receiptId!==id);saveState();renderAll()}
function renderReview(){
  const allCategories=[...new Set([
    ...defaultCategories,
    ...state.rules.map(r=>r.category),
    ...Object.keys(subcategoriesByCategory)
  ])].sort();

  reviewList.innerHTML=state.reviewQueue.length?state.reviewQueue.map((q,i)=>{
    const chosenCategory=q.chosenCategory||q.category||"Uncategorised";
    const chosenSubcategory=q.chosenSubcategory||q.subcategory||"";

    const categoryOptions=allCategories
      .map(c=>`<option value="${esc(c)}"${c===chosenCategory?" selected":""}>${esc(c)}</option>`)
      .join("");

    const subOptions=getSubcategories(chosenCategory,chosenSubcategory)
      .map(s=>`<option value="${esc(s)}"${s===chosenSubcategory?" selected":""}>${esc(s)}</option>`)
      .join("");

    return `<article class="review-card">
      <header>
        <div><strong>${esc(q.pattern)}</strong><div>${esc(q.description)}</div></div>
        <div><strong>${money(q.total)}</strong><div>${q.count} transactions</div></div>
      </header>
      <div class="review-grid">
        <label>Suggested<input value="${esc(q.category)}" disabled></label>
        <label>Confidence<input value="${pct(q.confidence)}" disabled></label>

        <label>Chosen category
          <select data-i="${i}" data-k="chosenCategory">
            ${categoryOptions}
          </select>
        </label>

        <label>Subcategory
          <select data-i="${i}" data-k="chosenSubcategory">
            ${subOptions}
          </select>
        </label>

        <label>Asset
          <select data-i="${i}" data-k="asset">
            <option value="">Unassigned</option>
            ${state.assets.map(a=>`<option value="${esc(a)}"${a===(q.asset||"")?" selected":""}>${esc(a)}</option>`).join("")}
          </select>
        </label>

        <label>Accept
          <select data-i="${i}" data-k="accept">
            <option value="false"${!q.accept?" selected":""}>No</option>
            <option value="true"${q.accept?" selected":""}>Yes</option>
          </select>
        </label>
      </div>
    </article>`;
  }).join(""):"<div class='panel'><p>No merchants need review.</p></div>";

  document.querySelectorAll("#reviewList [data-i]").forEach(el=>el.onchange=e=>{
    const q=state.reviewQueue[+e.target.dataset.i];
    const k=e.target.dataset.k;
    q[k]=k==="accept"?e.target.value==="true":e.target.value;

    if(k==="chosenCategory"){
      const available=getSubcategories(q.chosenCategory);
      q.chosenSubcategory=available[0]||"";
      saveState();
      renderReview();
      return;
    }

    saveState();
  });
}
function renderRules(){rulesBody.innerHTML=state.rules.map((r,i)=>`<tr><td>${esc(r.pattern)}</td><td>${esc(r.category)}</td><td>${esc(r.subcategory||"")}</td><td>${esc(r.asset||"")}</td><td><button class="link-btn danger-link del-rule" data-i="${i}">Delete</button></td></tr>`).join("");document.querySelectorAll(".del-rule").forEach(b=>b.onclick=()=>{state.rules.splice(+b.dataset.i,1);saveState();renderAll()})}
function renderReports(){const years=[...new Set(state.transactions.map(t=>+t.date.slice(0,4)+(+(t.date.slice(5,7))>=7?1:0)))].sort((a,b)=>b-a);if(!years.length)years.push(new Date().getFullYear());const current=+fySelect.value||years[0];fySelect.innerHTML=years.map(y=>`<option value="${y}"${y===current?" selected":""}>${y-1}/${String(y).slice(-2)}</option>`).join("");const start=`${current-1}-07-01`,end=`${current}-06-30`,tx=state.transactions.filter(t=>t.date>=start&&t.date<=end),inc=tx.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),exp=tx.filter(t=>t.amount<0).reduce((s,t)=>s+Math.abs(t.amount),0),tax=tx.filter(t=>t.amount<0&&t.taxDeductible).reduce((s,t)=>s+Math.abs(t.amount),0);fyIncome.textContent=money(inc);fyExpense.textContent=money(exp);fyTax.textContent=money(tax);const assets={};for(const t of tx.filter(x=>x.amount<0)){const a=t.asset||"Unassigned";assets[a]=(assets[a]||0)+Math.abs(t.amount)}assetSummary.innerHTML=Object.entries(assets).sort((a,b)=>b[1]-a[1]).map(([a,v])=>`<div><span>${esc(a)}</span><strong>${money(v)}</strong></div>`).join("")||"<p>No asset data.</p>";const large=tx.filter(t=>t.amount<0).sort((a,b)=>a.amount-b.amount).slice(0,10);largestExpenses.innerHTML=`<table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead><tbody>${large.map(t=>`<tr><td>${t.date}</td><td>${esc(t.description)}</td><td>${esc(t.category)}</td><td>${money(Math.abs(t.amount))}</td></tr>`).join("")}</tbody></table>`}
function renderCategoriesAssets(){
  const cats=getAllCategories();
  categoryList.innerHTML=cats.map(c=>`<option value="${esc(c)}">`).join("");
  const cv=categoryFilter.value;
  categoryFilter.innerHTML=`<option value="">All categories</option>`+cats.map(c=>`<option value="${esc(c)}"${c===cv?" selected":""}>${esc(c)}</option>`).join("");
  assetListData.innerHTML=state.assets.map(a=>`<option value="${esc(a)}">`).join("");
  const av=assetFilter.value;
  assetFilter.innerHTML=`<option value="">All assets</option>`+state.assets.map(a=>`<option value="${esc(a)}"${a===av?" selected":""}>${esc(a)}</option>`).join("");
  if(document.getElementById("receiptCategory")){
    populateReceiptCategories(receiptCategory.value||"Uncategorised",receiptSubcategory.value||"");
  }
}
function renderAssetSettings(){
  assetList.innerHTML=state.assets.length
    ?state.assets.map((a,i)=>`<span class="chip">${esc(a)} <button class="link-btn danger-link del-asset" data-i="${i}">×</button></span>`).join("")
    :`<div class="empty-state"><strong>No assets yet</strong><span>Add a property, vehicle, business or other asset when you are ready.</span></div>`;
  document.querySelectorAll(".del-asset").forEach(b=>b.onclick=()=>{state.assets.splice(+b.dataset.i,1);saveState();renderAll()});
} <button class="link-btn danger-link del-asset" data-i="${i}">×</button></span>`).join("");document.querySelectorAll(".del-asset").forEach(b=>b.onclick=()=>{state.assets.splice(+b.dataset.i,1);saveState();renderAll()})}
function showNotice(t){importSummary.textContent=t;importSummary.classList.remove("hidden");setTimeout(()=>importSummary.classList.add("hidden"),9000)}

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector(`#${b.dataset.view}`).classList.add("active");if(b.dataset.view==="dashboard")drawCashflow()});
csvInput.onchange=e=>{const f=e.target.files[0];if(f)importCSV(f).catch(x=>alert(x.message));e.target.value=""};
pdfInput.onchange=e=>{const f=e.target.files[0];if(f)handlePdf(f).catch(x=>alert(x.message));e.target.value=""};
confirmPdfImportBtn.onclick=e=>{e.preventDefault();const rows=pendingPdfRows.filter(r=>r.selected).map(({selected,confidence,...r})=>r);previewDialog.close();commitTransactions(rows,"PDF");pendingPdfRows=[]};
applyReviewsBtn.onclick=learnAccepted;transactionSearch.oninput=renderTransactions;categoryFilter.onchange=renderTransactions;assetFilter.onchange=renderTransactions;dashFrom.onchange=renderDashboard;dashTo.onchange=renderDashboard;fySelect.onchange=renderReports;
let pendingReceiptPages=[];
async function loadImage(dataUrl){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=dataUrl})}
async function processScanPage(dataUrl,rotation=0){
  const img=await loadImage(dataUrl),maxW=1500,scale=Math.min(1,maxW/(rotation%180?img.height:img.width));
  const cw=Math.round((rotation%180?img.height:img.width)*scale),ch=Math.round((rotation%180?img.width:img.height)*scale);
  const canvas=document.createElement('canvas');canvas.width=cw;canvas.height=ch;const ctx=canvas.getContext('2d',{willReadFrequently:true});
  ctx.save();ctx.translate(cw/2,ch/2);ctx.rotate(rotation*Math.PI/180);ctx.drawImage(img,-img.width*scale/2,-img.height*scale/2,img.width*scale,img.height*scale);ctx.restore();
  if(enhanceScan.checked){
    const im=ctx.getImageData(0,0,cw,ch),d=im.data;
    for(let i=0;i<d.length;i+=4){const g=.299*d[i]+.587*d[i+1]+.114*d[i+2];const v=Math.max(0,Math.min(255,(g-128)*1.55+148));d[i]=d[i+1]=d[i+2]=v;}
    ctx.putImageData(im,0,0);
  }
  return canvas.toDataURL('image/jpeg',.88);
}
async function rebuildReceiptPreview(){
  if(!pendingReceiptPages.length){pendingReceiptImage='';receiptPreview.style.display='none';receiptPreviewEmpty.style.display='grid';scanPageStrip.innerHTML='';return}
  const pages=[];for(const p of pendingReceiptPages)pages.push(await processScanPage(p.original,p.rotation||0));
  const imgs=await Promise.all(pages.map(loadImage)),width=Math.max(...imgs.map(i=>i.width)),gap=12;
  const heights=imgs.map(i=>Math.round(i.height*width/i.width)),canvas=document.createElement('canvas');canvas.width=width;canvas.height=heights.reduce((x,y)=>x+y,0)+gap*(imgs.length-1);
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);let y=0;imgs.forEach((im,i)=>{ctx.drawImage(im,0,y,width,heights[i]);y+=heights[i]+gap});
  pendingReceiptImage=canvas.toDataURL('image/jpeg',.88);receiptPreview.src=pendingReceiptImage;receiptPreview.style.display='block';receiptPreviewEmpty.style.display='none';
  scanPageStrip.innerHTML=pages.map((p,i)=>`<div class="scan-page"><img src="${p}" alt="Receipt section ${i+1}"><span>${i+1}</span></div>`).join('');
}
async function addReceiptFiles(files,reset=false){
  if(reset)pendingReceiptPages=[];
  for(const f of [...files])pendingReceiptPages.push({original:await readFileDataUrl(f),rotation:0});
  await rebuildReceiptPreview();
}
async function openReceiptCapture(fileOrFiles){
  const files=fileOrFiles instanceof FileList||Array.isArray(fileOrFiles)?fileOrFiles:[fileOrFiles];
  await addReceiptFiles(files,true);
  receiptDate.value=new Date().toISOString().slice(0,10);receiptMerchant.value="";receiptAmount.value="";populateReceiptCategories("Uncategorised","Review Required");receiptAccount.value="";receiptPaymentMethod.value="Card";receiptNumber.value="";receiptGst.value="";receiptNotes.value="";ocrStatus.textContent=`${pendingReceiptPages.length} section${pendingReceiptPages.length===1?'':'s'} ready`;receiptDialog.showModal();
}
receiptImageInput.onchange=e=>{if(e.target.files.length)openReceiptCapture(e.target.files);e.target.value=""};heroScanBtn.onclick=()=>receiptImageInput.click();
receiptMoreInput.onchange=async e=>{if(e.target.files.length){await addReceiptFiles(e.target.files);ocrStatus.textContent=`${pendingReceiptPages.length} sections ready`}e.target.value=''};
rotateScanBtn.onclick=async()=>{if(!pendingReceiptPages.length)return;const p=pendingReceiptPages.at(-1);p.rotation=((p.rotation||0)+90)%360;await rebuildReceiptPreview()};
removeScanBtn.onclick=async()=>{pendingReceiptPages.pop();await rebuildReceiptPreview();ocrStatus.textContent=pendingReceiptPages.length?`${pendingReceiptPages.length} sections ready`:'Add a receipt section'};
enhanceScan.onchange=rebuildReceiptPreview;
receiptCategory.onchange=()=>populateReceiptSubcategories("");
txCategory.onchange=()=>fillSubcategorySelect(txCategory,txSubcategory,"");
ruleCategory.onchange=()=>fillSubcategorySelect(ruleCategory,ruleSubcategory,"");
runOcrBtn.onclick=async()=>{
  if(!pendingReceiptPages.length)return alert('Scan or import at least one receipt section first.');
  if(!window.Tesseract)return alert('Receipt reader is unavailable while offline. You can still enter the details manually.');
  try{
    receiptPreview.parentElement.classList.add('scanning');let combined='';
    for(let i=0;i<pendingReceiptPages.length;i++){
      ocrStatus.textContent=`Reading section ${i+1} of ${pendingReceiptPages.length}…`;
      const image=await processScanPage(pendingReceiptPages[i].original,pendingReceiptPages[i].rotation||0);
      const result=await Tesseract.recognize(image,'eng',{logger:m=>{if(m.status==='recognizing text')ocrStatus.textContent=`Section ${i+1}: ${Math.round(m.progress*100)}%`}});combined+='\n'+(result.data.text||'');
    }
    const text=combined,lines=text.split(/\n/).map(x=>x.trim()).filter(Boolean);
    const ignore=/^(tax invoice|receipt|invoice|welcome|thank you|abn\b)/i;
    if(!receiptMerchant.value)receiptMerchant.value=lines.find(x=>/[A-Za-z]{3}/.test(x)&&!ignore.test(x)&&x.length<70)||'';
    const totalPatterns=[/(?:grand\s*total|amount\s*paid|total\s*(?:aud)?|balance\s*due)\s*[:$ ]+([0-9,]+\.\d{2})/ig,/\$\s*([0-9,]+\.\d{2})/g];
    let totals=[];for(const rx of totalPatterns)totals.push(...[...text.matchAll(rx)].map(m=>Number(m[1].replace(/,/g,''))));totals=totals.filter(n=>n>0&&n<100000);
    if(totals.length)receiptAmount.value=Math.max(...totals).toFixed(2);
    const date=text.match(/\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})\b|\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})\b/i);if(date)receiptDate.value=parseDate(date[1]||date[2]);
    const gst=text.match(/(?:GST|TAX)(?:\s+INCLUDED)?\s*[:$ ]+([0-9,]+\.\d{2})/i);if(gst)receiptGst.value=Number(gst[1].replace(/,/g,'')).toFixed(2);
    const rn=text.match(/(?:receipt|invoice|trans(?:action)?|order)\s*(?:no|number|#)?\s*[:#]?\s*([A-Z0-9-]{4,})/i);if(rn)receiptNumber.value=rn[1];
    receiptNotes.value=(receiptNotes.value?receiptNotes.value+'\n':'')+`Scanned from ${pendingReceiptPages.length} section${pendingReceiptPages.length===1?'':'s'}.`;
    ocrStatus.textContent='Details extracted — please check';
  }catch(err){console.error(err);ocrStatus.textContent='Manual check needed';alert('The scanned receipt could not be read reliably. Please check the image and enter any missing details manually.')}finally{receiptPreview.parentElement.classList.remove('scanning')}
};
saveReceiptBtn.onclick=e=>{e.preventDefault();const receipt={id:crypto.randomUUID?crypto.randomUUID():`r-${Date.now()}`,merchant:norm(receiptMerchant.value),date:receiptDate.value,amount:Number(receiptAmount.value),category:receiptCategory.value||'Uncategorised',subcategory:receiptSubcategory.value,account:norm(receiptAccount.value),paymentMethod:receiptPaymentMethod.value,receiptNumber:norm(receiptNumber.value),gst:Number(receiptGst.value)||0,notes:receiptNotes.value,image:pendingReceiptImage,createdAt:new Date().toISOString(),status:receiptPaymentMethod.value==='Cash'?'cash':'awaiting'};if(!receipt.merchant||!receipt.date||!receipt.amount)return;const fingerprint=receiptFingerprint(receipt);if(state.receipts.some(r=>receiptFingerprint(r)===fingerprint))return alert('This receipt appears to have already been saved.');state.receipts.unshift(receipt);state.transactions.push(applyRule({date:receipt.date,description:receipt.merchant,merchant:receipt.merchant,amount:-Math.abs(receipt.amount),source:'Receipt',receiptId:receipt.id,reconciliationStatus:receipt.status,account:receipt.account,category:receipt.category,subcategory:receipt.subcategory,notes:receipt.notes,taxDeductible:false}));saveState();receiptDialog.close();pendingReceiptImage='';pendingReceiptPages=[];rebuildReviewQueue();renderAll();showNotice('Receipt saved. BalanceIQ will look for the matching bank transaction on future imports.')};
addTransactionBtn.onclick=()=>openTransaction();saveTransactionBtn.onclick=e=>{e.preventDefault();const t={date:txDate.value,amount:+txAmount.value,description:txDescription.value,category:txCategory.value,subcategory:txSubcategory.value,asset:txAsset.value,taxDeductible:txTax.value==="true",tag:txTag.value,notes:txNotes.value,reviewed:true,auto:false,source:"Manual"};const i=txIndex.value;if(i==="")state.transactions.push(t);else state.transactions[+i]={...state.transactions[+i],...t};rebuildReviewQueue();saveState();transactionDialog.close();renderAll()};
addRuleBtn.onclick=()=>{
  ruleForm.reset();
  fillCategorySelect(ruleCategory,ruleSubcategory,"Uncategorised","Review Required");
  fillAssetSelect(ruleAsset,"");
  ruleDialog.showModal();
};saveRuleBtn.onclick=e=>{e.preventDefault();state.rules.unshift({pattern:upper(rulePattern.value),category:ruleCategory.value,subcategory:ruleSubcategory.value,asset:ruleAsset.value});ruleForm.reset();ruleDialog.close();saveState();renderAll()};
addAssetBtn.onclick=()=>{const a=norm(newAssetName.value);if(a&&!state.assets.includes(a))state.assets.push(a);newAssetName.value="";saveState();renderAll()};
exportBtn.onclick=()=>{const a=document.createElement("a"),blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});a.href=URL.createObjectURL(blob);a.download=`balanceiq-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href)};
exportCsvBtn.onclick=()=>{const cols=["date","description","amount","category","subcategory","asset","taxDeductible","tag","notes"],lines=[cols.join(",")];for(const t of state.transactions)lines.push(cols.map(c=>`"${String(t[c]??"").replaceAll('"','""')}"`).join(","));const a=document.createElement("a"),blob=new Blob([lines.join("\n")],{type:"text/csv"});a.href=URL.createObjectURL(blob);a.download="finance-transactions.csv";a.click();URL.revokeObjectURL(a.href)};
backupInput.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{state=JSON.parse(await f.text());saveState();renderAll();showNotice("Backup restored.")}catch{alert("Could not read backup.")}e.target.value=""};
clearBtn.onclick=()=>{if(confirm("Delete all local finance data?")){state={transactions:[],receipts:[],rules:[],reviewQueue:[],assets:[],theme:state.theme,currency:state.currency||"AUD",usageMode:state.usageMode||"personal",onboardingComplete:true};saveState();renderAll()}};
usageMode.value=state.usageMode||"personal";
currencySetting.value=state.currency||"AUD";
savePreferencesBtn.onclick=()=>{
  state.usageMode=usageMode.value;
  state.currency=currencySetting.value;
  saveState();renderAll();showNotice("Preferences saved.");
};
loadSampleDataBtn.onclick=addSampleData;
restartOnboardingBtn.onclick=()=>{
  onboardingUsage.value=state.usageMode||"personal";
  onboardingCurrency.value=state.currency||"AUD";
  onboardingTheme.value=state.theme||"light";
  onboardingAsset.value="";
  onboardingSample.checked=false;
  onboardingDialog.showModal();
};
finishOnboardingBtn.onclick=e=>{
  e.preventDefault();
  state.usageMode=onboardingUsage.value;
  state.currency=onboardingCurrency.value;
  state.theme=onboardingTheme.value;
  const firstAsset=norm(onboardingAsset.value);
  if(firstAsset&&!state.assets.includes(firstAsset))state.assets.push(firstAsset);
  if(onboardingSample.checked&&!state.transactions.some(t=>t.source==="Sample"))state.transactions.push(...sampleTransactions());
  state.onboardingComplete=true;
  document.body.classList.toggle("dark",state.theme==="dark");
  themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";
  usageMode.value=state.usageMode;
  currencySetting.value=state.currency;
  saveState();onboardingDialog.close();renderAll();
};
themeBtn.onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";saveState();drawCashflow()};
document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove("hidden")});installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js");
renderAll();
if(!state.onboardingComplete)setTimeout(()=>onboardingDialog.showModal(),250);


document.addEventListener("DOMContentLoaded",()=>{
  try{
    document.querySelectorAll("[data-tab]").forEach(btn=>{
      btn.onclick=(e)=>{
        const id=btn.dataset.tab;
        document.querySelectorAll("[data-tab]").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".tab-panel").forEach(p=>p.hidden=true);
        const panel=document.getElementById(id);
        if(panel) panel.hidden=false;
      };
    });
  }catch(e){console.error("Navigation initialisation failed",e);}
});
