let pdfjsLib=null;
async function getPdfJs(){
  if(pdfjsLib)return pdfjsLib;
  try{
    pdfjsLib=await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
    pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
    return pdfjsLib;
  }catch(error){
    console.error("PDF library could not be loaded.",error);
    throw new Error("PDF import is unavailable. Check your internet connection and try again.");
  }
}

const byId=id=>{
  const element=document.getElementById(id);
  if(!element)throw new Error(`BalanceIQ startup error: missing #${id}`);
  return element;
};
const {
  addAssetBtn,
  addRuleBtn,
  addTransactionBtn,
  applyReviewsBtn,
  assetFilter,
  assetList,
  assetListData,
  assetSummary,
  autoRate,
  backupInput,
  cashflowChart,
  categoryBars,
  categoryFilter,
  categoryList,
  clearBtn,
  cloudAnonKey,
  cloudEmail,
  cloudPassphrase,
  cloudSaveConfigBtn,
  cloudSignInBtn,
  cloudSignOutBtn,
  cloudStatus,
  cloudSyncBtn,
  cloudUrl,
  confirmPdfImportBtn,
  csvInput,
  currencySetting,
  dashFrom,
  dashTo,
  dashboard,
  enhanceScan,
  exportBtn,
  exportCsvBtn,
  finishOnboardingBtn,
  fyExpense,
  fyIncome,
  fySelect,
  fyTax,
  greeting,
  heroScanBtn,
  importSummary,
  installBtn,
  kpiExpense,
  kpiIncome,
  kpiNet,
  kpiReceiptMatch,
  kpiReview,
  largestExpenses,
  loadSampleDataBtn,
  newAssetName,
  ocrStatus,
  onboardingAsset,
  onboardingCurrency,
  onboardingDialog,
  onboardingForm,
  onboardingSample,
  onboardingTheme,
  onboardingUsage,
  pdfInput,
  periodExpense,
  periodIncome,
  periodNet,
  previewBody,
  previewDialog,
  previewMeta,
  receiptAccount,
  receiptAmount,
  receiptAwaiting,
  receiptCategory,
  receiptDate,
  receiptDialog,
  receiptForm,
  receiptGst,
  receiptImageInput,
  receiptList,
  receiptMatched,
  receiptMerchant,
  receiptMoreInput,
  receiptNotes,
  receiptNumber,
  receiptPaymentMethod,
  receiptPreview,
  receiptPreviewEmpty,
  receiptSubcategory,
  receiptSuggested,
  receipts,
  removeScanBtn,
  reports,
  review,
  reviewList,
  rotateScanBtn,
  ruleAsset,
  ruleCategory,
  ruleCount,
  ruleDialog,
  ruleForm,
  rulePattern,
  ruleSubcategory,
  rules,
  rulesBody,
  runOcrBtn,
  runSetupBtn,
  savePreferencesBtn,
  saveReceiptBtn,
  saveRuleBtn,
  saveTransactionBtn,
  scanPageStrip,
  settings,
  themeBtn,
  transactionCount,
  transactionDialog,
  transactionDialogTitle,
  transactionForm,
  transactionSearch,
  transactions,
  transactionsBody,
  txAmount,
  txAsset,
  txCategory,
  txDate,
  txDescription,
  txIndex,
  txNotes,
  txSubcategory,
  txTag,
  txTax,
  usageMode
}=Object.fromEntries(
  ["addAssetBtn","addRuleBtn","addTransactionBtn","applyReviewsBtn","assetFilter","assetList","assetListData","assetSummary","autoRate","backupInput","cashflowChart","categoryBars","categoryFilter","categoryList","clearBtn","cloudAnonKey","cloudEmail","cloudPassphrase","cloudSaveConfigBtn","cloudSignInBtn","cloudSignOutBtn","cloudStatus","cloudSyncBtn","cloudUrl","confirmPdfImportBtn","csvInput","currencySetting","dashFrom","dashTo","dashboard","enhanceScan","exportBtn","exportCsvBtn","finishOnboardingBtn","fyExpense","fyIncome","fySelect","fyTax","greeting","heroScanBtn","importSummary","installBtn","kpiExpense","kpiIncome","kpiNet","kpiReceiptMatch","kpiReview","largestExpenses","loadSampleDataBtn","newAssetName","ocrStatus","onboardingAsset","onboardingCurrency","onboardingDialog","onboardingForm","onboardingSample","onboardingTheme","onboardingUsage","pdfInput","periodExpense","periodIncome","periodNet","previewBody","previewDialog","previewMeta","receiptAccount","receiptAmount","receiptAwaiting","receiptCategory","receiptDate","receiptDialog","receiptForm","receiptGst","receiptImageInput","receiptList","receiptMatched","receiptMerchant","receiptMoreInput","receiptNotes","receiptNumber","receiptPaymentMethod","receiptPreview","receiptPreviewEmpty","receiptSubcategory","receiptSuggested","receipts","removeScanBtn","reports","review","reviewList","rotateScanBtn","ruleAsset","ruleCategory","ruleCount","ruleDialog","ruleForm","rulePattern","ruleSubcategory","rules","rulesBody","runOcrBtn","runSetupBtn","savePreferencesBtn","saveReceiptBtn","saveRuleBtn","saveTransactionBtn","scanPageStrip","settings","themeBtn","transactionCount","transactionDialog","transactionDialogTitle","transactionForm","transactionSearch","transactions","transactionsBody","txAmount","txAsset","txCategory","txDate","txDescription","txIndex","txNotes","txSubcategory","txTag","txTax","usageMode"].map(id=>[id,byId(id)])
);

const STORAGE_KEY="balanceIQV5";
const APP_VERSION="6.2";
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
function allCategories(){
  return [...new Set([...defaultCategories,...state.rules.map(r=>r.category),...Object.keys(subcategoriesByCategory)])].filter(Boolean).sort();
}
function fillSubcategorySelect(categoryEl,subcategoryEl,selected=""){
  const options=getSubcategories(categoryEl.value||"Uncategorised",selected);
  if(!options.length)options.push("Other");
  subcategoryEl.innerHTML=options.map(s=>`<option value="${esc(s)}"${s===selected?" selected":""}>${esc(s)}</option>`).join("");
}
function fillCategorySelect(categoryEl,subcategoryEl,selected="Uncategorised",selectedSub=""){
  const categories=allCategories();
  if(selected&&!categories.includes(selected))categories.unshift(selected);
  categoryEl.innerHTML=categories.map(c=>`<option value="${esc(c)}"${c===selected?" selected":""}>${esc(c)}</option>`).join("");
  categoryEl.value=categories.includes(selected)?selected:"Uncategorised";
  fillSubcategorySelect(categoryEl,subcategoryEl,selectedSub);
}
function fillAssetSelect(el,selected=""){
  const assets=[...state.assets];
  if(selected&&!assets.includes(selected))assets.unshift(selected);
  el.innerHTML=`<option value="">Unassigned</option>`+assets.map(a=>`<option value="${esc(a)}"${a===selected?" selected":""}>${esc(a)}</option>`).join("");
}
function sampleTransactions(){
  const day=n=>{const d=new Date();d.setDate(d.getDate()-n);return localDateValue(d)};
  return[
    {date:day(1),description:"Sample Salary",amount:2500,category:"Income",subcategory:"Salary / Wages",asset:"",reviewed:true,auto:false,source:"Sample",taxDeductible:false,tag:"",notes:""},
    {date:day(2),description:"Sample Supermarket",amount:-142.35,category:"Groceries",subcategory:"Supermarket",asset:"",reviewed:true,auto:false,source:"Sample",taxDeductible:false,tag:"",notes:""},
    {date:day(4),description:"Sample Fuel",amount:-86.20,category:"Fuel",subcategory:"Fuel & Convenience",asset:"",reviewed:true,auto:false,source:"Sample",taxDeductible:false,tag:"",notes:""}
  ];
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

function localDateValue(date=new Date()){
  const local=new Date(date.getTime()-date.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}
function updateGreeting(){
  const hour=new Date().getHours();
  greeting.textContent=hour<12?"Good morning":hour<18?"Good afternoon":"Good evening";
}

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
async function extractPdfText(file){const pdfjsLib=await getPdfJs();const pdf=await pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise,pages=[];for(let p=1;p<=pdf.numPages;p++){const page=await pdf.getPage(p),content=await page.getTextContent(),items=content.items.map(x=>({str:x.str,x:x.transform[4],y:x.transform[5]})).filter(x=>x.str.trim()).sort((a,b)=>Math.abs(b.y-a.y)>2?b.y-a.y:a.x-b.x),lines=[];let cur=[],y=null;for(const item of items){if(y===null||Math.abs(item.y-y)<=2)cur.push(item);else{lines.push(cur.sort((a,b)=>a.x-b.x).map(x=>x.str).join(" ").replace(/\s+/g," ").trim());cur=[item]}y=item.y}if(cur.length)lines.push(cur.sort((a,b)=>a.x-b.x).map(x=>x.str).join(" ").replace(/\s+/g," ").trim());pages.push(lines)}return pages}
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
function openTransaction(i=null){const t=i===null?{date:localDateValue(),amount:"",description:"",category:"Uncategorised",subcategory:"Review Required",asset:"",taxDeductible:false,tag:"",notes:""}:state.transactions[i];txIndex.value=i===null?"":i;transactionDialogTitle.textContent=i===null?"Add Transaction":"Edit Transaction";txDate.value=t.date;txAmount.value=t.amount;txDescription.value=t.description;fillCategorySelect(txCategory,txSubcategory,t.category,t.subcategory||"");fillAssetSelect(txAsset,t.asset||"");txTax.value=String(!!t.taxDeductible);txTag.value=t.tag||"";txNotes.value=t.notes||"";transactionDialog.showModal()}
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
function renderCategoriesAssets(){const cats=allCategories();categoryList.innerHTML=cats.map(c=>`<option value="${esc(c)}">`).join("");const cv=categoryFilter.value;categoryFilter.innerHTML=`<option value="">All categories</option>`+cats.map(c=>`<option value="${esc(c)}"${c===cv?" selected":""}>${esc(c)}</option>`).join("");assetListData.innerHTML=state.assets.map(a=>`<option value="${esc(a)}">`).join("");const av=assetFilter.value;assetFilter.innerHTML=`<option value="">All assets</option>`+state.assets.map(a=>`<option value="${esc(a)}"${a===av?" selected":""}>${esc(a)}</option>`).join("")}
function renderAssetSettings(){
  assetList.innerHTML=state.assets.length
    ? state.assets.map((a,i)=>`<span class="chip">${esc(a)} <button class="link-btn danger-link del-asset" data-i="${i}">×</button></span>`).join("")
    : `<div class="empty-assets"><strong>No assets yet</strong><span>Add one when you are ready.</span></div>`;
  document.querySelectorAll(".del-asset").forEach(button=>{
    button.onclick=()=>{
      state.assets.splice(+button.dataset.i,1);
      saveState();
      renderAll();
    };
  });
}
function showNotice(t){importSummary.textContent=t;importSummary.classList.remove("hidden");setTimeout(()=>importSummary.classList.add("hidden"),9000)}

document.querySelectorAll(".tab").forEach(button=>{
  button.addEventListener("click",()=>{
    const target=document.getElementById(button.dataset.view);
    if(!target){
      console.error(`Navigation target not found: ${button.dataset.view}`);
      return;
    }
    document.querySelectorAll(".tab").forEach(item=>{
      item.classList.remove("active");
      item.setAttribute("aria-selected","false");
    });
    document.querySelectorAll(".view").forEach(view=>view.classList.remove("active"));
    button.classList.add("active");
    button.setAttribute("aria-selected","true");
    target.classList.add("active");
    if(button.dataset.view==="dashboard")drawCashflow();
  });
});
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

async function cropScanRegion(dataUrl,startRatio,endRatio,{threshold=false}={}){
  const img=await loadImage(dataUrl);
  const y=Math.floor(img.height*startRatio);
  const h=Math.max(1,Math.floor(img.height*(endRatio-startRatio)));
  const canvas=document.createElement("canvas");
  canvas.width=img.width;canvas.height=h;
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  ctx.drawImage(img,0,y,img.width,h,0,0,img.width,h);
  const image=ctx.getImageData(0,0,canvas.width,canvas.height),data=image.data;
  let sum=0;
  for(let i=0;i<data.length;i+=4)sum+=.299*data[i]+.587*data[i+1]+.114*data[i+2];
  const mean=sum/(data.length/4);
  for(let i=0;i<data.length;i+=4){
    const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2];
    let value=(gray-mean)*1.9+158;
    if(threshold)value=value>Math.max(138,mean*.9)?255:0;
    value=Math.max(0,Math.min(255,value));
    data[i]=data[i+1]=data[i+2]=value;
  }
  ctx.putImageData(image,0,0);
  return canvas.toDataURL("image/png");
}
async function recogniseScanPass(image,label,section,logger){
  const result=await Tesseract.recognize(image,"eng",{logger});
  return {
    section,pass:label,
    confidence:Math.round(Number(result.data.confidence)||0),
    characters:(result.data.text||"").length,
    text:result.data.text||"",
    image
  };
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
  clearOcrDiagnostic();receiptDate.value="";receiptMerchant.value="";receiptAmount.value="";fillCategorySelect(receiptCategory,receiptSubcategory,"Uncategorised","Review Required");receiptAccount.value="";receiptPaymentMethod.value="Card";receiptNumber.value="";receiptGst.value="";receiptNotes.value="";ocrStatus.textContent=`${pendingReceiptPages.length} section${pendingReceiptPages.length===1?'':'s'} ready`;receiptDialog.showModal();
}
receiptImageInput.onchange=e=>{if(e.target.files.length)openReceiptCapture(e.target.files);e.target.value=""};heroScanBtn.onclick=()=>receiptImageInput.click();
receiptMoreInput.onchange=async e=>{if(e.target.files.length){await addReceiptFiles(e.target.files);ocrStatus.textContent=`${pendingReceiptPages.length} sections ready`}e.target.value=''};
rotateScanBtn.onclick=async()=>{if(!pendingReceiptPages.length)return;const p=pendingReceiptPages.at(-1);p.rotation=((p.rotation||0)+90)%360;await rebuildReceiptPreview()};
removeScanBtn.onclick=async()=>{pendingReceiptPages.pop();await rebuildReceiptPreview();ocrStatus.textContent=pendingReceiptPages.length?`${pendingReceiptPages.length} sections ready`:'Add a receipt section'};
enhanceScan.onchange=rebuildReceiptPreview;
receiptCategory.onchange=()=>fillSubcategorySelect(receiptCategory,receiptSubcategory,"");
txCategory.onchange=()=>fillSubcategorySelect(txCategory,txSubcategory,"");
ruleCategory.onchange=()=>fillSubcategorySelect(ruleCategory,ruleSubcategory,"");

function normaliseOcrText(text){
  return String(text||"")
    .replace(/[|]/g,"I")
    .replace(/\r/g,"")
    .replace(/[ \t]+/g," ")
    .replace(/\b(?:PUVERFASS|POYERPASS|POWERTASS|PWERPASS)\b/gi,"PowerPass")
    .replace(/\bFOTAL\b/gi,"Total")
    .replace(/\bTHCLUDED\b/gi,"INCLUDED")
    .replace(/\bDETADLS\b/gi,"Details")
    .replace(/\bDGT[E]?ILE\b/gi,"Details")
    .replace(/\bNUNBER\b/gi,"Number")
    .replace(/\bBUNNTNGS\b/gi,"BUNNINGS")
    .trim();
}
function ocrLines(text){
  return normaliseOcrText(text).split("\n").map(line=>line.trim()).filter(Boolean);
}
function firstCaptured(text,patterns){
  for(const pattern of patterns){
    const match=text.match(pattern);
    if(match?.[1])return match[1].trim();
  }
  return "";
}
function cleanReceiptIdentifier(value){
  return String(value||"")
    .replace(/^[#:\s]+|[#:\s]+$/g,"")
    .replace(/\s+/g,"")
    .replace(/[^\w\/.-]/g,"");
}
function parseMoneyToken(value){
  const cleaned=String(value||"").replace(/[^\d.,-]/g,"").replace(/,/g,"");
  const number=Number(cleaned);
  return Number.isFinite(number)?Math.abs(number):0;
}
function moneyValues(line){
  return [...String(line||"").matchAll(/\$?\s*([0-9]{1,5}(?:,[0-9]{3})*\.\d{2})\b/g)]
    .map(match=>parseMoneyToken(match[1]))
    .filter(value=>value>0&&value<100000);
}

const merchantProfiles=[
  {
    id:"bunnings",
    merchant:"Bunnings Warehouse",
    tests:[/BUNNINGS/,/BUNNINGS\s+GROUP/,/BUNNTNGS/,/\bON\s+NING\b/,/WAREHOUSE/],
    category:"Home & Maintenance",
    subcategory:"Hardware",
    parser:"bunnings"
  },
  {
    id:"woolworths",
    merchant:"Woolworths",
    tests:[/WOOLWORTHS?/],
    category:"Groceries",
    subcategory:"Supermarket",
    parser:"supermarket"
  },
  {
    id:"coles",
    merchant:"Coles",
    tests:[/\bCOLES\b/],
    category:"Groceries",
    subcategory:"Supermarket",
    parser:"supermarket"
  },
  {
    id:"aldi",
    merchant:"ALDI",
    tests:[/\bALDI\b/],
    category:"Groceries",
    subcategory:"Supermarket",
    parser:"supermarket"
  },
  {
    id:"officeworks",
    merchant:"Officeworks",
    tests:[/OFFICEWORKS/],
    category:"Shopping",
    subcategory:"Retail",
    parser:"retail"
  },
  {
    id:"jb-hifi",
    merchant:"JB Hi-Fi",
    tests:[/JB\s*HI[- ]?FI/],
    category:"Shopping",
    subcategory:"Electronics",
    parser:"retail"
  },
  {
    id:"supercheap-auto",
    merchant:"Supercheap Auto",
    tests:[/SUPERCHEAP\s*AUTO/],
    category:"Vehicles",
    subcategory:"Parts / Accessories",
    parser:"automotive"
  },
  {
    id:"repco",
    merchant:"Repco",
    tests:[/\bREPCO\b/],
    category:"Vehicles",
    subcategory:"Parts / Accessories",
    parser:"automotive"
  },
  {
    id:"bcf",
    merchant:"BCF",
    tests:[/\bBCF\b/,/BOATING CAMPING FISHING/],
    category:"Shopping",
    subcategory:"Retail",
    parser:"retail"
  },
  {
    id:"kmart",
    merchant:"Kmart",
    tests:[/\bKMART\b/],
    category:"Shopping",
    subcategory:"Retail",
    parser:"retail"
  },
  {
    id:"target",
    merchant:"Target",
    tests:[/\bTARGET\b/],
    category:"Shopping",
    subcategory:"Retail",
    parser:"retail"
  },
  {
    id:"ampol",
    merchant:"Ampol",
    tests:[/\bAMPOL\b/],
    category:"Fuel",
    subcategory:"Fuel & Convenience",
    parser:"fuel"
  },
  {
    id:"shell",
    merchant:"Shell",
    tests:[/\bSHELL\b/],
    category:"Fuel",
    subcategory:"Fuel & Convenience",
    parser:"fuel"
  },
  {
    id:"bp",
    merchant:"BP",
    tests:[/\bBP\b/,/BRITISH PETROLEUM/],
    category:"Fuel",
    subcategory:"Fuel & Convenience",
    parser:"fuel"
  }
];
function getMerchantProfile(text){
  const upperText=upper(text);
  return merchantProfiles.find(profile=>profile.tests.some(test=>test.test(upperText)))||null;
}

function detectKnownMerchant(text,lines){
  const profile=getMerchantProfile(text);
  if(profile)return profile;
  const ignore=/^(tax invoice|invoice|receipt|welcome|thank you|abn\b|date\b|time\b|total\b|subtotal\b|returns|customer|account|order|job|card|change|gst\b)/i;
  const candidate=lines.find(line=>
    /[A-Za-z]{3}/.test(line)&&!ignore.test(line)&&line.length>=3&&line.length<70&&!/^\d/.test(line)
  );
  return {merchant:candidate||"",parser:"generic",category:"",subcategory:""};
}
function validReceiptIdentifier(value,{bunnings=false}={}){
  const cleaned=cleanReceiptIdentifier(value);
  if(!cleaned||!/\d/.test(cleaned))return "";
  if(/^(?:DETAILS?|NUMBER|NO|INVOICE|RECEIPT|TRANSACTION)$/i.test(cleaned))return "";
  if(bunnings){
    const exact=cleaned.match(/\b\d{4}\/\d{7,8}\b/);
    return exact?exact[0]:"";
  }
  return cleaned.length>=4?cleaned:"";
}
function identifierAfterLabel(lines,labelPattern,{bunnings=false}={}){
  for(let i=0;i<lines.length;i++){
    if(!labelPattern.test(lines[i]))continue;
    const candidates=[];
    candidates.push(...((lines[i].replace(labelPattern,"").match(/[A-Z0-9][A-Z0-9\/.-]{3,}/ig))||[]));
    candidates.push(...(((lines[i+1]||"").match(/[A-Z0-9][A-Z0-9\/.-]{3,}/ig))||[]));
    candidates.push(...(((lines[i+2]||"").match(/[A-Z0-9][A-Z0-9\/.-]{3,}/ig))||[]));
    for(const candidate of candidates){
      const valid=validReceiptIdentifier(candidate,{bunnings});
      if(valid)return valid;
    }
  }
  return "";
}
function extractReceiptNumber(text,merchant=""){
  const lines=ocrLines(text);
  const bunnings=merchant==="Bunnings Warehouse";
  if(bunnings){
    const near=text.match(/invoice\s*(?:number|no\.?|#)?\s*(?:details)?[\s:#;-]*([0-9]{4}\/[0-9]{7,8})/i);
    if(near)return near[1];
    const anywhere=text.match(/\b[0-9]{4}\/[0-9]{7,8}\b/);
    if(anywhere)return anywhere[0];
  }
  const labels=[
    /invoice\s*(?:number|no\.?|#)\s*(?:details)?/i,
    /tax\s*invoice\s*(?:number|no\.?|#)?\s*(?:details)?/i,
    /receipt\s*(?:number|no\.?|#)/i,
    /docket\s*(?:number|no\.?|#)/i,
    /transaction\s*(?:id|number|no\.?|#)/i
  ];
  for(const label of labels){
    const value=identifierAfterLabel(lines,label,{bunnings});
    if(value)return value;
  }
  return "";
}
function isoAustralianDate(day,month,year){
  day=Number(day);month=Number(month);year=Number(year);
  if(year<100)year+=2000;
  if(day<1||day>31||month<1||month>12||year<2000||year>2099)return "";
  return `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
}
function extractFooterDate(text){
  const matches=[...text.matchAll(/\b(20\d{2})[-\/](0?[1-9]|1[0-2])[-\/](0?[1-9]|[12]\d|3[01])\b/g)];
  if(!matches.length)return "";
  const m=matches[matches.length-1];
  return `${m[1]}-${String(m[2]).padStart(2,"0")}-${String(m[3]).padStart(2,"0")}`;
}
function extractReceiptDateTime(text){
  const numeric=[...text.matchAll(/\b([0-3]?\d)[\/-]([01]?\d)[\/-](20\d{2}|\d{2})\b/g)];
  const footer=extractFooterDate(text);
  let date="";
  if(numeric.length){
    const header=numeric.find(m=>{
      const context=text.slice(Math.max(0,m.index-14),m.index+m[0].length+14);
      return /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun|Hed)\b/i.test(context);
    })||numeric[0];
    date=isoAustralianDate(header[1],header[2],header[3]);
    if(footer&&date){
      const [fy,fm,fd]=footer.split("-").map(Number);
      const [dy,dm,dd]=date.split("-").map(Number);
      if(fm===dm&&fd===dd&&Math.abs(fy-dy)>=10)date=footer;
    }
  }
  if(!date&&footer)date=footer;
  const timeMatch=text.match(/\b(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|PH)?)\b/i);
  let time=timeMatch?timeMatch[1].replace(/\s+/g," ").toUpperCase():"";
  time=time.replace(/\bPH\b/,"PM");
  return {date,time,footerDate:footer};
}
function amountConsensus(lines,{merchant=""}={}){
  const scores=new Map();
  const counts=new Map();
  const add=(value,score)=>{
    if(!(value>0&&value<100000))return;
    const key=value.toFixed(2);
    scores.set(key,(scores.get(key)||0)+score);
    counts.set(key,(counts.get(key)||0)+1);
  };

  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    const values=moneyValues(line);
    if(!values.length)continue;
    const upperLine=upper(line);
    const previous=upper(lines[i-1]||"");
    const next=upper(lines[i+1]||"");
    const context=`${previous} ${upperLine} ${next}`;

    for(const value of values){
      let score=1;
      if(/\bGRAND\s*TOTAL\b|\bAMOUNT\s*PAID\b|\bTOTAL\s*PAID\b|\bBALANCE\s*DUE\b/.test(upperLine))score+=100;
      else if(/^\s*TOTAL\b/.test(upperLine)||/\bTOTAL\s*\$/.test(upperLine))score+=85;
      else if(/\bSUB\s*TOTAL\b|\bSUBTOTAL\b/.test(upperLine))score+=48;
      else if(/\bPOWERPASS\b|\bEFTPOS\b|\bVISA\b|\bMASTERCARD\b|\bCARD\b/.test(upperLine))score+=82;

      if(/\bGST\b|\bTAX\s*AMOUNT\b/.test(upperLine))score-=80;
      if(/\bSAVINGS?\b|\bDISCOUNT\b|\bDISC\b|\bCHANGE\b|\bROUNDING\b/.test(upperLine))score-=70;
      if(/@\s*\$?\s*[0-9]+\.\d{2}/.test(line)||/\bEACH\b|\bUNIT\b/.test(upperLine))score-=25;

      if(merchant==="Bunnings Warehouse"){
        if(/\bPOWERPASS\b/.test(context)&&!/\bSAVINGS?\b/.test(upperLine))score+=12;
        if(/\bGST INCLUDED IN THE TOTAL\b/.test(context)&&value<10)score-=70;
      }
      add(value,score);
    }
  }

  // Repetition is a powerful correction signal when OCR misreads one labelled total.
  for(const [key,count] of counts){
    if(count>=2)scores.set(key,(scores.get(key)||0)+count*28);
    if(count>=3)scores.set(key,(scores.get(key)||0)+30);
  }

  const ranked=[...scores.entries()]
    .map(([key,score])=>({value:Number(key),score,count:counts.get(key)||0}))
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score||b.count-a.count||b.value-a.value);

  return {value:ranked[0]?.value||0,candidates:ranked.slice(0,6)};
}
function extractReceiptTotal(text,merchant=""){
  return amountConsensus(ocrLines(text),{merchant}).value;
}
function extractReceiptGst(text,total=0){
  const lines=ocrLines(text);
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(!/\bGST\b|\bTAX\s*AMOUNT\b/i.test(line))continue;
    const same=moneyValues(line);
    if(same.length){
      const plausible=same.find(value=>!total||value<total*.35);
      if(plausible)return plausible;
    }
    const next=moneyValues(lines[i+1]||"");
    if(next.length){
      const plausible=next.find(value=>!total||value<total*.35);
      if(plausible)return plausible;
    }
  }
  if(total>0&&/GST\s+INCLUDED(?:\s+IN\s+THE\s+TOTAL)?/i.test(text)){
    return Number((total/11).toFixed(2));
  }
  return 0;
}
function detectReceiptPaymentMethod(text){
  if(/\bCASH\b/i.test(text)&&!/CASHIER/i.test(text))return "Cash";
  if(/\b(POWERPASS|EFTPOS|VISA|MASTERCARD|CARD NO|CARD)\b/i.test(text))return "Card";
  return "";
}
function parseBunningsReceipt(text,base){
  const lines=ocrLines(text);
  const consensus=amountConsensus(lines,{merchant:"Bunnings Warehouse"});
  const branch=firstCaptured(text,[
    /BUNNINGS\s+WAREHOUSE\s*\n\s*([A-Z][A-Z'’ -]{2,})/i,
    /\b(O['’]?CONNOR|CANNINGTON|BALCATTA|MIDLAND|ARMADALE|MORLEY|JOONDALUP)\b/i
  ]);
  return {
    ...base,
    branch,
    total:consensus.value,
    gst:extractReceiptGst(text,consensus.value),
    receiptNumber:extractReceiptNumber(text,base.merchant),
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:"Bunnings",
    amountCandidates:consensus.candidates
  };
}
function parseGenericReceipt(text,base){
  const total=extractReceiptTotal(text,base.merchant);
  return {
    ...base,
    total,
    gst:extractReceiptGst(text,total),
    receiptNumber:extractReceiptNumber(text,base.merchant),
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:"Generic"
  };
}
function receiptFieldConfidence(parsed,rawText){
  const text=normaliseOcrText(rawText);
  const repeatedTop=parsed.amountCandidates?.[0]?.count>=2;
  const scores={
    merchant:parsed.merchant?(/BUNNINGS|WOOLWORTHS|COLES|OFFICEWORKS|JB\s*HI|SUPERCHEAP|REPCO|BCF|KMART|TARGET|ALDI|AMPOL|SHELL/i.test(text)?98:72):0,
    date:parsed.date?92:0,
    total:parsed.total?(repeatedTop?98:88):0,
    gst:parsed.gst?92:0,
    receiptNumber:parsed.receiptNumber
      ? (/^\d{4}\/\d{7,8}$/.test(parsed.receiptNumber)?98:
         /invoice\s*(?:number|no\.?|#)/i.test(text)?88:68)
      : 0,
    paymentMethod:parsed.paymentMethod?88:0
  };
  const present=Object.values(scores).filter(Boolean);
  const overall=present.length?Math.round(present.reduce((a,b)=>a+b,0)/present.length):0;
  return {overall,fields:scores};
}
function receiptImageQuality(text){
  const lines=ocrLines(text);
  const alphaNumeric=String(text||"").replace(/[^A-Za-z0-9]/g,"").length;
  const replacementNoise=(String(text||"").match(/[�]/g)||[]).length;
  let score=30;
  if(lines.length>=8)score+=20;
  if(lines.length>=16)score+=15;
  if(alphaNumeric>=120)score+=20;
  if(alphaNumeric>=250)score+=10;
  score-=Math.min(20,replacementNoise*4);
  return Math.max(0,Math.min(100,score));
}

function parseSupermarketReceipt(text,base){
  const total=extractReceiptTotal(text,base.merchant);
  return {
    ...base,
    total,
    gst:extractReceiptGst(text,total),
    receiptNumber:extractReceiptNumber(text,base.merchant),
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:"Supermarket"
  };
}
function parseRetailReceipt(text,base){
  const total=extractReceiptTotal(text,base.merchant);
  return {
    ...base,
    total,
    gst:extractReceiptGst(text,total),
    receiptNumber:extractReceiptNumber(text,base.merchant),
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:"Retail"
  };
}
function parseAutomotiveReceipt(text,base){
  const total=extractReceiptTotal(text,base.merchant);
  return {
    ...base,
    total,
    gst:extractReceiptGst(text,total),
    receiptNumber:extractReceiptNumber(text,base.merchant),
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:"Automotive"
  };
}
function parseFuelReceipt(text,base){
  const total=extractReceiptTotal(text,base.merchant);
  return {
    ...base,
    total,
    gst:extractReceiptGst(text,total),
    receiptNumber:extractReceiptNumber(text,base.merchant),
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:"Fuel"
  };
}
function runMerchantParser(profile,text,base){
  switch(profile?.parser){
    case "bunnings": return parseBunningsReceipt(text,base);
    case "supermarket": return parseSupermarketReceipt(text,base);
    case "retail": return parseRetailReceipt(text,base);
    case "automotive": return parseAutomotiveReceipt(text,base);
    case "fuel": return parseFuelReceipt(text,base);
    default: return parseGenericReceipt(text,base);
  }
}

function parseAustralianReceipt(rawText){
  const text=normaliseOcrText(rawText);
  const lines=ocrLines(text);
  const merchantInfo=detectKnownMerchant(text,lines);
  const dateTime=extractReceiptDateTime(text);
  const base={
    merchant:merchantInfo.merchant,
    branch:"",
    category:merchantInfo.category,
    subcategory:merchantInfo.subcategory,
    date:dateTime.date,
    time:dateTime.time,
    total:0,
    gst:0,
    receiptNumber:"",
    paymentMethod:"",
    parser:"Generic"
  };

  let parsed=runMerchantParser(merchantInfo,text,base);
  parsed.merchantProfile=merchantInfo.id||"generic";

  parsed.confidence=receiptFieldConfidence(parsed,text);
  parsed.imageQuality=receiptImageQuality(text);
  return parsed;
}


let lastOcrDiagnostic=null;
const ocrDiagnosticPanel=document.getElementById("ocrDiagnosticPanel");
const ocrDiagnosticSummary=document.getElementById("ocrDiagnosticSummary");
const ocrFieldDecisions=document.getElementById("ocrFieldDecisions");
const ocrAmountCandidates=document.getElementById("ocrAmountCandidates");
const ocrRawText=document.getElementById("ocrRawText");
const ocrSectionResults=document.getElementById("ocrSectionResults");
const copyOcrDebugBtn=document.getElementById("copyOcrDebugBtn");
const downloadOcrDebugBtn=document.getElementById("downloadOcrDebugBtn");
const clearOcrDebugBtn=document.getElementById("clearOcrDebugBtn");

function diagnosticFieldRows(parsed){
  const confidence=parsed.confidence?.fields||{};
  return [
    ["Merchant",parsed.merchant||"(blank)",confidence.merchant||0],
    ["Date",parsed.date||"(blank)",confidence.date||0],
    ["Total",parsed.total?`$${parsed.total.toFixed(2)}`:"(blank)",confidence.total||0],
    ["GST",parsed.gst?`$${parsed.gst.toFixed(2)}`:"(blank)",confidence.gst||0],
    ["Receipt number",parsed.receiptNumber||"(blank)",confidence.receiptNumber||0],
    ["Payment method",parsed.paymentMethod||"(blank)",confidence.paymentMethod||0],
    ["Parser",parsed.parser||"Generic",100],
    ["Merchant profile",parsed.merchantProfile||"generic",100]
  ];
}
function renderOcrDiagnostic(report){
  lastOcrDiagnostic=report;
  const parsed=report.parsed;
  const lowFields=diagnosticFieldRows(parsed).filter(row=>row[2]<70&&row[2]!==0).map(row=>row[0]);
  ocrDiagnosticSummary.textContent=
    `Overall extraction confidence: ${parsed.confidence?.overall||0}% · `+
    `OCR quality: ${parsed.imageQuality||0}% · `+
    `Sections: ${report.sections.length}`+
    (lowFields.length?` · Review: ${lowFields.join(", ")}`:"");

  ocrFieldDecisions.textContent=diagnosticFieldRows(parsed)
    .map(([field,value,confidence])=>`${field}: ${value}\nConfidence: ${confidence}%`)
    .join("\n\n");

  const candidates=parsed.amountCandidates||[];
  ocrAmountCandidates.textContent=candidates.length
    ? candidates.map((item,index)=>
        `${index+1}. $${Number(item.value).toFixed(2)} · score ${item.score} · seen ${item.count} time${item.count===1?"":"s"}`
      ).join("\n")
    : "No scored amount candidates.";

  ocrRawText.value=report.rawText||"";
  ocrSectionResults.textContent=report.sections.map(section=>
    `Section ${section.section} · ${section.pass||"full"} pass\nOCR confidence: ${section.confidence}%\nCharacters: ${section.characters}\n\n${section.text}`
  ).join("\n\n==============================\n\n");
  ocrDiagnosticPanel.open=true;
}
function clearOcrDiagnostic(){
  lastOcrDiagnostic=null;
  ocrDiagnosticSummary.textContent="Run OCR to see diagnostic results.";
  ocrFieldDecisions.textContent="No data yet.";
  ocrAmountCandidates.textContent="No data yet.";
  ocrRawText.value="";
  ocrSectionResults.textContent="No data yet.";
}
function debugReportText(report){
  return [
    `BalanceIQ ${APP_VERSION} OCR diagnostic`,
    `Created: ${report.createdAt}`,
    `Sections: ${report.sections.length}`,
    "",
    "PARSED RESULT",
    JSON.stringify(report.parsed,null,2),
    "",
    "PER-SECTION OCR",
    report.sections.map(section=>
      `--- Section ${section.section} · ${section.pass||"full"} | confidence ${section.confidence}% ---\n${section.text}`
    ).join("\n\n"),
    "",
    "COMBINED RAW OCR",
    report.rawText
  ].join("\n");
}
copyOcrDebugBtn.onclick=async()=>{
  if(!lastOcrDiagnostic)return alert("Run OCR first.");
  try{
    await navigator.clipboard.writeText(debugReportText(lastOcrDiagnostic));
    showNotice("OCR diagnostic copied.");
  }catch{
    alert("Copy was blocked by the browser. Use Download JSON instead.");
  }
};
downloadOcrDebugBtn.onclick=()=>{
  if(!lastOcrDiagnostic)return alert("Run OCR first.");
  const blob=new Blob([JSON.stringify(lastOcrDiagnostic,null,2)],{type:"application/json"});
  const link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download=`balanceiq-ocr-debug-${new Date().toISOString().replace(/[:.]/g,"-")}.json`;
  link.click();
  setTimeout(()=>URL.revokeObjectURL(link.href),1000);
};
clearOcrDebugBtn.onclick=clearOcrDiagnostic;

function shouldAutofillField(confidence,minimum=70){
  return Number(confidence||0)>=minimum;
}

runOcrBtn.onclick=async()=>{
  if(!pendingReceiptPages.length)return alert("Scan or import at least one receipt section first.");
  if(!window.Tesseract)return alert("Receipt reader is unavailable while offline. You can still enter the details manually.");
  try{
    receiptPreview.parentElement.classList.add("scanning");
    let combined="";
    const sectionReports=[];
    for(let i=0;i<pendingReceiptPages.length;i++){
      const section=i+1;
      const full=await processScanPage(pendingReceiptPages[i].original,pendingReceiptPages[i].rotation||0);
      const header=await cropScanRegion(full,0,.43,{threshold:true});
      const totals=await cropScanRegion(full,.42,.78,{threshold:true});
      for(const [label,image] of [["full",full],["header",header],["totals",totals]]){
        const report=await recogniseScanPass(image,label,section,m=>{
          if(m.status==="recognizing text")ocrStatus.textContent=`Section ${section} ${label}: ${Math.round(m.progress*100)}%`;
        });
        sectionReports.push(report);
      }
      for(const label of ["header","totals","full"]){
        const text=sectionReports.find(r=>r.section===section&&r.pass===label)?.text||"";
        combined+=`\n--- ${label.toUpperCase()} PASS ---\n${text}`;
      }
    }
    const parsed=parseAustralianReceipt(combined);
    const ocrAverage=Math.round(sectionReports.reduce((s,r)=>s+r.confidence,0)/Math.max(1,sectionReports.length));
    parsed.ocrConfidence=ocrAverage;
    if(parsed.confidence){
      parsed.confidence.parserOverall=parsed.confidence.overall;
      parsed.confidence.overall=Math.round(ocrAverage*.55+parsed.confidence.overall*.45);
    }
    const fc=parsed.confidence?.fields||{};
    receiptDate.value="";
    receiptNumber.value="";
    if(parsed.merchant&&shouldAutofillField(fc.merchant,70))receiptMerchant.value=parsed.merchant;
    if(parsed.date&&shouldAutofillField(fc.date,70))receiptDate.value=parsed.date;
    if(parsed.total&&shouldAutofillField(fc.total,75))receiptAmount.value=parsed.total.toFixed(2);
    if(parsed.receiptNumber&&shouldAutofillField(fc.receiptNumber,75))receiptNumber.value=parsed.receiptNumber;
    if(parsed.gst&&shouldAutofillField(fc.gst,70))receiptGst.value=parsed.gst.toFixed(2);
    if(parsed.paymentMethod&&shouldAutofillField(fc.paymentMethod,70))receiptPaymentMethod.value=parsed.paymentMethod;
    if(parsed.category&&shouldAutofillField(fc.merchant,70))fillCategorySelect(receiptCategory,receiptSubcategory,parsed.category,parsed.subcategory||"");
    renderOcrDiagnostic({
      version:APP_VERSION,
      createdAt:new Date().toISOString(),
      sections:sectionReports.map(({image,...rest})=>rest),
      rawText:combined.trim(),
      parsed
    });
    const notes=[
      `Scanned from ${pendingReceiptPages.length} section${pendingReceiptPages.length===1?"":"s"}.`,
      parsed.time?`Receipt time: ${parsed.time}.`:"",
      parsed.parser?`Parser: ${parsed.parser}.`:"",
      parsed.merchantProfile?`Merchant profile: ${parsed.merchantProfile}.`:"",
      `OCR confidence: ${ocrAverage}%.`,
      parsed.confidence?`Combined confidence: ${parsed.confidence.overall}%.`:""
    ].filter(Boolean).join(" ");
    receiptNotes.value=(receiptNotes.value?receiptNotes.value+"\n":"")+notes;
    ocrStatus.textContent=(parsed.confidence?.overall||0)<72
      ?"Low confidence — review diagnostics"
      :"Details extracted — please verify";
  }catch(err){
    console.error(err);
    ocrStatus.textContent="Manual check needed";
    alert("The scanned receipt could not be read reliably. Open OCR diagnostics and enter missing details manually.");
  }finally{
    receiptPreview.parentElement.classList.remove("scanning");
  }
};
saveReceiptBtn.onclick=e=>{e.preventDefault();const receipt={id:crypto.randomUUID?crypto.randomUUID():`r-${Date.now()}`,merchant:norm(receiptMerchant.value),date:receiptDate.value,amount:Number(receiptAmount.value),category:receiptCategory.value||'Uncategorised',subcategory:receiptSubcategory.value,account:norm(receiptAccount.value),paymentMethod:receiptPaymentMethod.value,receiptNumber:norm(receiptNumber.value),gst:Number(receiptGst.value)||0,notes:receiptNotes.value,image:pendingReceiptImage,createdAt:new Date().toISOString(),status:receiptPaymentMethod.value==='Cash'?'cash':'awaiting'};if(!receipt.merchant||!receipt.date||!receipt.amount)return;const fingerprint=receiptFingerprint(receipt);if(state.receipts.some(r=>receiptFingerprint(r)===fingerprint))return alert('This receipt appears to have already been saved.');state.receipts.unshift(receipt);state.transactions.push(applyRule({date:receipt.date,description:receipt.merchant,merchant:receipt.merchant,amount:-Math.abs(receipt.amount),source:'Receipt',receiptId:receipt.id,reconciliationStatus:receipt.status,account:receipt.account,category:receipt.category,subcategory:receipt.subcategory,notes:receipt.notes,taxDeductible:false}));saveState();receiptDialog.close();pendingReceiptImage='';pendingReceiptPages=[];rebuildReviewQueue();renderAll();showNotice('Receipt saved. BalanceIQ will look for the matching bank transaction on future imports.')};
addTransactionBtn.onclick=()=>openTransaction();saveTransactionBtn.onclick=e=>{e.preventDefault();const t={date:txDate.value,amount:+txAmount.value,description:txDescription.value,category:txCategory.value,subcategory:txSubcategory.value,asset:txAsset.value,taxDeductible:txTax.value==="true",tag:txTag.value,notes:txNotes.value,reviewed:true,auto:false,source:"Manual"};const i=txIndex.value;if(i==="")state.transactions.push(t);else state.transactions[+i]={...state.transactions[+i],...t};rebuildReviewQueue();saveState();transactionDialog.close();renderAll()};
addRuleBtn.onclick=()=>{ruleForm.reset();fillCategorySelect(ruleCategory,ruleSubcategory,"Uncategorised","Review Required");fillAssetSelect(ruleAsset,"");ruleDialog.showModal()};saveRuleBtn.onclick=e=>{e.preventDefault();state.rules.unshift({pattern:upper(rulePattern.value),category:ruleCategory.value,subcategory:ruleSubcategory.value,asset:ruleAsset.value});ruleForm.reset();ruleDialog.close();saveState();renderAll()};
addAssetBtn.onclick=()=>{const a=norm(newAssetName.value);if(a&&!state.assets.includes(a))state.assets.push(a);newAssetName.value="";saveState();renderAll()};
exportBtn.onclick=()=>{const a=document.createElement("a"),blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});a.href=URL.createObjectURL(blob);a.download=`balanceiq-backup-${localDateValue()}.json`;a.click();URL.revokeObjectURL(a.href)};
exportCsvBtn.onclick=()=>{const cols=["date","description","amount","category","subcategory","asset","taxDeductible","tag","notes"],lines=[cols.join(",")];for(const t of state.transactions)lines.push(cols.map(c=>`"${String(t[c]??"").replaceAll('"','""')}"`).join(","));const a=document.createElement("a"),blob=new Blob([lines.join("\n")],{type:"text/csv"});a.href=URL.createObjectURL(blob);a.download="finance-transactions.csv";a.click();URL.revokeObjectURL(a.href)};
backupInput.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{state=JSON.parse(await f.text());saveState();renderAll();showNotice("Backup restored.")}catch{alert("Could not read backup.")}e.target.value=""};
clearBtn.onclick=()=>{if(confirm("Delete all local finance data?")){state={transactions:[],receipts:[],rules:[],reviewQueue:[],assets:[],theme:state.theme,currency:state.currency||"AUD",usageMode:state.usageMode||"personal",onboardingComplete:true};saveState();renderAll()}};
usageMode.value=state.usageMode||"personal";
currencySetting.value=state.currency||"AUD";
savePreferencesBtn.onclick=()=>{state.usageMode=usageMode.value;state.currency=currencySetting.value;saveState();renderAll();showNotice("Preferences saved.")};
loadSampleDataBtn.onclick=()=>{if(state.transactions.some(t=>t.source==="Sample"))return alert("Sample data is already loaded.");state.transactions.push(...sampleTransactions());saveState();renderAll();showNotice("Optional sample data loaded.")};
function openSetup(){onboardingUsage.value=state.usageMode||"personal";onboardingCurrency.value=state.currency||"AUD";onboardingTheme.value=state.theme||"light";onboardingAsset.value="";onboardingSample.checked=false;onboardingDialog.showModal()}
runSetupBtn.onclick=openSetup;
finishOnboardingBtn.onclick=()=>{state.usageMode=onboardingUsage.value;state.currency=onboardingCurrency.value;state.theme=onboardingTheme.value;const asset=norm(onboardingAsset.value);if(asset&&!state.assets.includes(asset))state.assets.push(asset);if(onboardingSample.checked&&!state.transactions.some(t=>t.source==="Sample"))state.transactions.push(...sampleTransactions());state.onboardingComplete=true;document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";updateGreeting();usageMode.value=state.usageMode;currencySetting.value=state.currency;saveState();onboardingDialog.close();renderAll()};
themeBtn.onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";updateGreeting();saveState();drawCashflow()};
document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";updateGreeting();setInterval(updateGreeting,60000);
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove("hidden")});installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js");
renderAll();
if(!state.onboardingComplete)setTimeout(openSetup,250);
