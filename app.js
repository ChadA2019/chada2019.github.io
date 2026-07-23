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
  gettingStartedPanel,
  heroScanBtn,
  quickScanBtn,
  quickAddTransactionBtn,
  startImportBtn,
  startScanBtn,
  startManualBtn,
  importSummary,
  importChoiceDialog,
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
  receiptAddAssetBtn,
  receiptAddCategoryBtn,
  receiptAddSubcategoryBtn,
  receiptAsset,
  receiptEditAssetBtn,
  receiptEditCategoryBtn,
  receiptEditSubcategoryBtn,
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
  txAddAssetBtn,
  txAddCategoryBtn,
  txAddSubcategoryBtn,
  txEditAssetBtn,
  txEditCategoryBtn,
  txEditSubcategoryBtn,
  txAsset,
  txCategory,
  txDate,
  txDescription,
  txIndex,
  txNotes,
  txSubcategory,
  txTag,
  txTax,
  usageMode,
  nameManagerDialog,
  nameManagerForm,
  nameManagerTitle,
  nameManagerDescription,
  nameManagerInput,
  nameManagerLabel,
  nameManagerError,
  nameManagerSaveBtn
}=Object.fromEntries(
  ["addAssetBtn","addRuleBtn","addTransactionBtn","applyReviewsBtn","assetFilter","assetList","assetListData","assetSummary","autoRate","backupInput","cashflowChart","categoryBars","categoryFilter","categoryList","clearBtn","cloudAnonKey","cloudEmail","cloudPassphrase","cloudSaveConfigBtn","cloudSignInBtn","cloudSignOutBtn","cloudStatus","cloudSyncBtn","cloudUrl","confirmPdfImportBtn","csvInput","currencySetting","dashFrom","dashTo","dashboard","enhanceScan","exportBtn","exportCsvBtn","finishOnboardingBtn","fyExpense","fyIncome","fySelect","fyTax","greeting","gettingStartedPanel","heroScanBtn","quickScanBtn","quickAddTransactionBtn","startImportBtn","startScanBtn","startManualBtn","importSummary","importChoiceDialog","installBtn","kpiExpense","kpiIncome","kpiNet","kpiReceiptMatch","kpiReview","largestExpenses","loadSampleDataBtn","newAssetName","ocrStatus","onboardingAsset","onboardingCurrency","onboardingDialog","onboardingForm","onboardingSample","onboardingTheme","onboardingUsage","pdfInput","periodExpense","periodIncome","periodNet","previewBody","previewDialog","previewMeta","receiptAccount","receiptAddAssetBtn","receiptAddCategoryBtn","receiptAddSubcategoryBtn","receiptAmount","receiptAsset","receiptEditAssetBtn","receiptEditCategoryBtn","receiptEditSubcategoryBtn","receiptAwaiting","receiptCategory","receiptDate","receiptDialog","receiptForm","receiptGst","receiptImageInput","receiptList","receiptMatched","receiptMerchant","receiptMoreInput","receiptNotes","receiptNumber","receiptPaymentMethod","receiptPreview","receiptPreviewEmpty","receiptSubcategory","receiptSuggested","receipts","removeScanBtn","reports","review","reviewList","rotateScanBtn","ruleAsset","ruleCategory","ruleCount","ruleDialog","ruleForm","rulePattern","ruleSubcategory","rules","rulesBody","runOcrBtn","runSetupBtn","savePreferencesBtn","saveReceiptBtn","saveRuleBtn","saveTransactionBtn","scanPageStrip","settings","themeBtn","transactionCount","transactionDialog","transactionDialogTitle","transactionForm","transactionSearch","transactions","transactionsBody","txAmount","txAddAssetBtn","txAddCategoryBtn","txAddSubcategoryBtn","txAsset","txEditAssetBtn","txEditCategoryBtn","txEditSubcategoryBtn","txCategory","txDate","txDescription","txIndex","txNotes","txSubcategory","txTag","txTax","usageMode","nameManagerDialog","nameManagerForm","nameManagerTitle","nameManagerDescription","nameManagerInput","nameManagerLabel","nameManagerError","nameManagerSaveBtn"].map(id=>[id,byId(id)])
);

const STORAGE_KEY="balanceIQV5";
const APP_INFO=Object.freeze({version:"9.9.0",build:"2026.07.23.009",release:"Version 9.9 introduces local-first IndexedDB storage, automatic rolling safety snapshots, storage health information and recovery controls."});
const APP_VERSION=APP_INFO.version;
const LEGACY_STORAGE_KEYS=["chadFinanceV3","chadFinanceV4"];
function applyAppInfo(){
  document.title=`BalanceIQ v${APP_INFO.version}`;
  const badge=document.getElementById("appVersionBadge");
  const version=document.getElementById("aboutVersion");
  const build=document.getElementById("aboutBuild");
  const summary=document.getElementById("aboutReleaseSummary");
  if(badge)badge.textContent=`v${APP_INFO.version}`;
  if(version)version.textContent=APP_INFO.version;
  if(build)build.textContent=APP_INFO.build;
  if(summary)summary.textContent=APP_INFO.release;
}

const DEFAULT_CATEGORY_DEFINITIONS={
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
function freshCategoryDefinitions(){
  return Object.entries(DEFAULT_CATEGORY_DEFINITIONS).map(([name,subcategories])=>({name,subcategories:[...subcategories]}));
}
function normaliseCategoryDefinitions(value){
  const defs=Array.isArray(value)?value:[];
  const clean=[];
  for(const item of defs){
    const name=String(typeof item==="string"?item:item?.name||"").trim();
    if(!name||clean.some(x=>String(x.name).toUpperCase()===String(name).toUpperCase()))continue;
    const subs=Array.isArray(item?.subcategories)?item.subcategories.map(x=>String(x||"").trim()).filter(Boolean):[];
    clean.push({name,subcategories:[...new Set(subs)]});
  }
  if(!clean.length)return freshCategoryDefinitions();
  if(!clean.some(x=>x.name==="Uncategorised"))clean.push({name:"Uncategorised",subcategories:["Review Required"]});
  return clean;
}
function categoryDefinition(name){return state.categoryDefinitions.find(x=>String(x.name).toUpperCase()===String(name).toUpperCase());}
function getSubcategories(category,current=""){
  const list=[...(categoryDefinition(category)?.subcategories||[])];
  if(current&&!list.includes(current))list.unshift(current);
  return [...new Set(list)].sort((a,b)=>a.localeCompare(b));
}
function allCategories(){
  const used=[...state.transactions.map(t=>t.category),...state.receipts.map(r=>r.category),...state.rules.map(r=>r.category)];
  return [...new Set([...state.categoryDefinitions.map(x=>x.name),...used])].filter(Boolean).sort((a,b)=>a.localeCompare(b));
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
let pendingNameManager=null;
function openNameManager({title,description="",label="Name",value="",saveText="Save",onSave}){
  pendingNameManager=onSave;
  nameManagerTitle.textContent=title;
  nameManagerDescription.textContent=description;
  nameManagerDescription.classList.toggle("hidden",!description);
  nameManagerLabel.childNodes[0].nodeValue=`${label}`;
  nameManagerInput.value=value;
  nameManagerError.textContent="";
  nameManagerError.classList.add("hidden");
  nameManagerSaveBtn.textContent=saveText;
  nameManagerDialog.showModal();
  setTimeout(()=>{nameManagerInput.focus();nameManagerInput.select();},30);
}
function nameManagerFail(message){nameManagerError.textContent=message;nameManagerError.classList.remove("hidden");nameManagerInput.focus();}
nameManagerForm.addEventListener("submit",e=>{
  e.preventDefault();
  const value=norm(nameManagerInput.value);
  if(!value)return nameManagerFail("Enter a name.");
  try{
    const result=pendingNameManager?.(value);
    if(result===false)return;
    nameManagerDialog.close();
    pendingNameManager=null;
  }catch(error){nameManagerFail(error?.message||"This item could not be saved.");}
});
nameManagerDialog.addEventListener("close",()=>{pendingNameManager=null;nameManagerError.classList.add("hidden");});

function createCategoryInteractive(categoryEl,subcategoryEl){
  openNameManager({title:"Create category",description:"Create a category without leaving this transaction.",label:"Category name",saveText:"Create",onSave:name=>{
    const existing=state.categoryDefinitions.find(x=>upper(x.name)===upper(name));
    if(existing){fillCategorySelect(categoryEl,subcategoryEl,existing.name,"");showNotice(`Selected existing category ${existing.name}.`);return true;}
    state.categoryDefinitions.push({name,subcategories:[]});
    state.categoryDefinitions.sort((a,b)=>a.name.localeCompare(b.name));
    saveState();fillCategorySelect(categoryEl,subcategoryEl,name,"");renderCategoryManager();renderCategoriesAssets();
    showNotice(`Created category ${name}.`);return true;
  }});
}
function createSubcategoryInteractive(categoryEl,subcategoryEl){
  const category=categoryEl.value||"Uncategorised",definition=categoryDefinition(category);
  if(!definition){alert("Select or create a category first.");return;}
  openNameManager({title:"Create sub-category",description:`Add a sub-category under ${category}.`,label:"Sub-category name",saveText:"Create",onSave:name=>{
    const existing=definition.subcategories.find(x=>upper(x)===upper(name));
    if(existing){fillSubcategorySelect(categoryEl,subcategoryEl,existing);showNotice(`Selected existing sub-category ${existing}.`);return true;}
    definition.subcategories.push(name);definition.subcategories.sort((a,b)=>a.localeCompare(b));
    saveState();fillSubcategorySelect(categoryEl,subcategoryEl,name);renderCategoryManager();
    showNotice(`Created ${name} under ${category}.`);return true;
  }});
}
function updateAssetReferences(oldName,newName){
  for(const collection of [state.transactions,state.receipts,state.rules])for(const item of collection)if(item.asset===oldName)item.asset=newName;
  for(const q of state.reviewQueue)if(q.asset===oldName)q.asset=newName;
}
function createAssetInteractive(assetEl){
  openNameManager({title:"Create asset",description:"Add an asset and select it for this entry.",label:"Asset name",saveText:"Create",onSave:name=>{
    const existing=state.assets.find(x=>upper(x)===upper(name));
    if(existing){fillAssetSelect(assetEl,existing);showNotice(`Selected existing asset ${existing}.`);return true;}
    state.assets.push(name);state.assets.sort((a,b)=>a.localeCompare(b));
    saveState();renderAll();fillAssetSelect(assetEl,name);showNotice(`Created asset ${name}.`);return true;
  }});
}
function renameAssetInteractive(assetEl){
  const oldName=assetEl.value;if(!oldName)return alert("Select an asset to rename first.");
  openNameManager({title:"Rename asset",description:"Existing transactions, receipts and merchant rules will be updated.",label:"Asset name",value:oldName,saveText:"Rename",onSave:newName=>{
    if(newName===oldName)return true;
    if(state.assets.some(x=>x!==oldName&&upper(x)===upper(newName)))return nameManagerFail("That asset already exists."),false;
    state.assets[state.assets.indexOf(oldName)]=newName;state.assets.sort((a,b)=>a.localeCompare(b));updateAssetReferences(oldName,newName);
    saveState();renderAll();fillAssetSelect(assetEl,newName);showNotice(`Renamed ${oldName} to ${newName}.`);return true;
  }});
}
function renameCategoryInteractive(categoryEl,subcategoryEl){
  const oldName=categoryEl.value;if(!oldName)return alert("Select a category to rename first.");
  const definition=categoryDefinition(oldName);if(!definition)return alert("This category cannot be renamed here.");
  openNameManager({title:"Rename category",description:"Existing entries and merchant rules will be updated.",label:"Category name",value:oldName,saveText:"Rename",onSave:newName=>{
    if(newName===oldName)return true;
    if(state.categoryDefinitions.some(x=>x!==definition&&upper(x.name)===upper(newName)))return nameManagerFail("That category already exists."),false;
    definition.name=newName;updateCategoryReferences(oldName,newName);saveState();renderAll();fillCategorySelect(categoryEl,subcategoryEl,newName,subcategoryEl.value);showNotice(`Renamed ${oldName} to ${newName}.`);return true;
  }});
}
function renameSubcategoryInteractive(categoryEl,subcategoryEl){
  const category=categoryEl.value,oldName=subcategoryEl.value,definition=categoryDefinition(category);
  if(!definition||!oldName)return alert("Select a sub-category to rename first.");
  openNameManager({title:"Rename sub-category",description:`Rename ${oldName} under ${category}. Existing entries will be updated.`,label:"Sub-category name",value:oldName,saveText:"Rename",onSave:newName=>{
    if(newName===oldName)return true;
    if(definition.subcategories.some(x=>x!==oldName&&upper(x)===upper(newName)))return nameManagerFail("That sub-category already exists."),false;
    const i=definition.subcategories.indexOf(oldName);if(i<0)return nameManagerFail("This sub-category is not managed by the selected category."),false;
    definition.subcategories[i]=newName;definition.subcategories.sort((a,b)=>a.localeCompare(b));updateSubcategoryReferences(category,oldName,newName);
    saveState();renderAll();fillCategorySelect(categoryEl,subcategoryEl,category,newName);showNotice(`Renamed ${oldName} to ${newName}.`);return true;
  }});
}
function fillAssetSelect(el,selected=""){
  const assets=[...state.assets];
  if(selected&&!assets.includes(selected))assets.unshift(selected);
  el.innerHTML=`<option value="">Unassigned</option>`+assets.map(a=>`<option value="${esc(a)}"${a===selected?" selected":""}>${esc(a)}</option>`).join("");
}
function sampleTransactions(){
  const day=n=>{const d=new Date();d.setDate(d.getDate()-n);return localDateValue(d)};
  const rows=[
    [1,"Demo Salary",2850,"Income","Salary / Wages","Everyday Account"],
    [2,"Demo Supermarket",-142.35,"Groceries","Supermarket","Everyday Account"],
    [3,"Demo Electricity",-118.40,"Bills","Electricity","Everyday Account"],
    [4,"Demo Fuel",-86.20,"Fuel","Fuel & Convenience","Everyday Account"],
    [5,"Demo Coffee",-6.50,"Dining","Cafe","Everyday Account"],
    [6,"Demo Rent",-620,"Housing","Rent","Everyday Account"],
    [7,"Demo Pharmacy",-28.75,"Health","Pharmacy","Everyday Account"],
    [8,"Demo Streaming",-18.99,"Entertainment","Subscriptions","Credit Card"],
    [9,"Demo Hardware Store",-74.60,"Home","Maintenance","Credit Card"],
    [10,"Demo Restaurant",-64.80,"Dining","Restaurant","Credit Card"],
    [12,"Demo Mobile Plan",-49,"Bills","Phone / Internet","Everyday Account"],
    [14,"Demo Insurance",-132.10,"Insurance","Other","Everyday Account"],
    [16,"Demo Transfer to Savings",-300,"Transfers","Savings","Everyday Account"],
    [16,"Demo Transfer from Everyday",300,"Transfers","Savings","Savings Account"],
    [18,"Demo Public Transport",-42.00,"Transport","Public Transport","Everyday Account"],
    [21,"Demo Clothing",-95.50,"Shopping","Clothing","Credit Card"],
    [24,"Demo Interest",4.25,"Income","Interest","Savings Account"],
    [27,"Demo Groceries",-96.30,"Groceries","Supermarket","Everyday Account"]
  ];
  return rows.map(([days,description,amount,category,subcategory,asset],index)=>({id:`demo-${localDateValue()}-${index+1}`,date:day(days),description,merchant:description.replace(/^Demo /,""),amount:Number(amount),category,subcategory,asset,reviewed:true,auto:false,source:"Demo",demo:true,createdAt:new Date().toISOString(),taxDeductible:false,tag:"Demo",notes:"Demo data — safe to remove from Settings."}));
}
function demoDataLoaded(){return state.transactions.some(t=>t.demo===true||t.source==="Demo"||t.source==="Sample")}
function updateDemoDataStatus(message=""){
  const status=document.getElementById("demoDataStatus"),remove=document.getElementById("removeDemoDataBtn");
  if(!status||!remove)return;
  const loaded=demoDataLoaded();
  remove.classList.toggle("hidden",!loaded);
  loadSampleDataBtn.textContent=loaded?"Demo Data Loaded":"Load Demo Data";
  loadSampleDataBtn.disabled=loaded;
  if(message){status.innerHTML=message;status.classList.remove("hidden");}
  else if(loaded){status.innerHTML="<strong>Demo Mode is active.</strong><br>Sample transactions are included in the dashboard and reports. Use the Home or Transactions tab to see them.";status.classList.remove("hidden");}
  else status.classList.add("hidden");
}
function activateView(viewName){
  const target=document.getElementById(viewName);
  const button=document.querySelector(`.tab[data-view="${viewName}"]`);
  if(!target||!button)return false;
  document.querySelectorAll(".tab").forEach(item=>{item.classList.remove("active");item.setAttribute("aria-selected","false")});
  document.querySelectorAll(".view").forEach(view=>view.classList.remove("active"));
  button.classList.add("active");button.setAttribute("aria-selected","true");target.classList.add("active");
  if(viewName==="dashboard")requestAnimationFrame(drawCashflow);
  return true;
}
function revealDemoDashboard(){
  if(dashFrom)dashFrom.value="";
  if(dashTo)dashTo.value="";
  renderDashboard();
  activateView("dashboard");
  window.scrollTo({top:0,behavior:"smooth"});
}
function addDemoData(){
  const demoAssets=["Everyday Account","Savings Account","Credit Card"];
  demoAssets.forEach(asset=>{if(!state.assets.some(existing=>upper(existing)===upper(asset)))state.assets.push(asset)});
  state.assets.sort((x,y)=>x.localeCompare(y));
  const demoRules=[
    {pattern:"SUPERMARKET",category:"Groceries",subcategory:"Supermarket",asset:"Everyday Account",demo:true},
    {pattern:"FUEL",category:"Fuel",subcategory:"Fuel & Convenience",asset:"Everyday Account",demo:true},
    {pattern:"COFFEE",category:"Dining",subcategory:"Cafe",asset:"Everyday Account",demo:true},
    {pattern:"PHARMACY",category:"Health",subcategory:"Pharmacy",asset:"Everyday Account",demo:true}
  ];
  demoRules.forEach(rule=>{if(!state.rules.some(existing=>existing.demo&&existing.pattern===rule.pattern))state.rules.push(rule)});
  const existingIds=new Set(state.transactions.map(t=>t.id).filter(Boolean));
  const transactions=sampleTransactions().filter(t=>!existingIds.has(t.id));
  state.transactions.push(...transactions);
  return {assets:demoAssets.length,rules:demoRules.length,transactions:transactions.length};
}

const defaultAssets=[];
const defaultRules=[];

const DEVICE_DB_NAME="BalanceIQDeviceData";
const DEVICE_DB_VERSION=1;
const DEVICE_STATE_KEY="primary";
let deviceDbPromise=null,deviceSaveTimer=null,deviceStorageReady=false,lastDeviceSaveAt=null;

function emptyState(){return{
  transactions:[],receipts:[],rules:[],reviewQueue:[],assets:[],
  categoryDefinitions:freshCategoryDefinitions(),theme:"light",currency:"AUD",
  usageMode:"personal",onboardingComplete:false,
  autoBackupEnabled:true,autoBackupDays:7,autoBackupRetention:10
}}
function normaliseState(s){const base=emptyState();return{
  ...base,...(s||{}),
  transactions:s?.transactions||[],receipts:s?.receipts||[],rules:s?.rules||[],
  reviewQueue:s?.reviewQueue||[],assets:s?.assets||[],
  categoryDefinitions:normaliseCategoryDefinitions(s?.categoryDefinitions),
  theme:s?.theme||"light",currency:s?.currency||"AUD",usageMode:s?.usageMode||"personal",
  onboardingComplete:s?.onboardingComplete ?? true,
  autoBackupEnabled:s?.autoBackupEnabled ?? true,
  autoBackupDays:Number(s?.autoBackupDays)||7,
  autoBackupRetention:Number(s?.autoBackupRetention)||10
}}
function loadState(){
  let raw=localStorage.getItem(STORAGE_KEY);
  if(!raw){for(const key of LEGACY_STORAGE_KEYS){if(localStorage.getItem(key)){raw=localStorage.getItem(key);break}}}
  try{const parsed=JSON.parse(raw);if(parsed)return normaliseState(parsed)}catch{}
  return emptyState();
}
function openDeviceDb(){
  if(deviceDbPromise)return deviceDbPromise;
  deviceDbPromise=new Promise((resolve,reject)=>{
    if(!('indexedDB'in window))return reject(new Error('IndexedDB is unavailable'));
    const request=indexedDB.open(DEVICE_DB_NAME,DEVICE_DB_VERSION);
    request.onupgradeneeded=()=>{
      const db=request.result;
      if(!db.objectStoreNames.contains('appState'))db.createObjectStore('appState');
      if(!db.objectStoreNames.contains('snapshots')){
        const store=db.createObjectStore('snapshots',{keyPath:'id',autoIncrement:true});
        store.createIndex('createdAt','createdAt');
      }
    };
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error||new Error('Could not open device database'));
  });
  return deviceDbPromise;
}
async function idbGet(storeName,key){const db=await openDeviceDb();return new Promise((resolve,reject)=>{const tx=db.transaction(storeName,'readonly'),request=tx.objectStore(storeName).get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function idbPut(storeName,value,key){const db=await openDeviceDb();return new Promise((resolve,reject)=>{const tx=db.transaction(storeName,'readwrite'),store=tx.objectStore(storeName),request=key===undefined?store.put(value):store.put(value,key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function idbAll(storeName){const db=await openDeviceDb();return new Promise((resolve,reject)=>{const tx=db.transaction(storeName,'readonly'),request=tx.objectStore(storeName).getAll();request.onsuccess=()=>resolve(request.result||[]);request.onerror=()=>reject(request.error)})}
async function idbDelete(storeName,key){const db=await openDeviceDb();return new Promise((resolve,reject)=>{const tx=db.transaction(storeName,'readwrite'),request=tx.objectStore(storeName).delete(key);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)})}
function stateEnvelope(){return{savedAt:new Date().toISOString(),version:APP_VERSION,data:typeof structuredClone==="function"?structuredClone(state):JSON.parse(JSON.stringify(state))}}
async function writeDeviceState(){
  try{const envelope=stateEnvelope();await idbPut('appState',envelope,DEVICE_STATE_KEY);deviceStorageReady=true;lastDeviceSaveAt=envelope.savedAt;await maybeCreateAutomaticSnapshot(envelope);updateStoragePanel();return true}
  catch(error){console.error('BalanceIQ could not save to IndexedDB.',error);updateStoragePanel(error);return false}
}
function queueDeviceSave(){clearTimeout(deviceSaveTimer);deviceSaveTimer=setTimeout(writeDeviceState,120)}
async function createSafetySnapshot(reason='manual'){
  const envelope=stateEnvelope();
  await idbPut('snapshots',{createdAt:envelope.savedAt,reason,version:APP_VERSION,data:envelope.data});
  const snapshots=(await idbAll('snapshots')).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const keep=Math.max(1,Number(state.autoBackupRetention)||10);
  await Promise.all(snapshots.slice(keep).map(item=>idbDelete('snapshots',item.id)));
  updateStoragePanel();return envelope.savedAt;
}
async function maybeCreateAutomaticSnapshot(envelope){
  if(state.autoBackupEnabled===false)return;
  const snapshots=(await idbAll('snapshots')).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const latest=snapshots[0];
  const dueMs=Math.max(1,Number(state.autoBackupDays)||7)*86400000;
  if(!latest||Date.now()-new Date(latest.createdAt).getTime()>=dueMs)await createSafetySnapshot('automatic');
}
async function initialiseDeviceStorage(){
  try{
    const stored=await idbGet('appState',DEVICE_STATE_KEY);
    if(stored?.data){state=normaliseState(stored.data);lastDeviceSaveAt=stored.savedAt||null}
    else await writeDeviceState();
    deviceStorageReady=true;
    renderAll();updateDemoDataStatus();updateStoragePanel();
  }catch(error){console.warn('IndexedDB unavailable; using localStorage fallback.',error);updateStoragePanel(error)}
}
function saveState(){
  let mirrorSaved=true;
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
  catch(error){mirrorSaved=false;console.warn('BalanceIQ localStorage mirror could not be saved.',error)}
  queueDeviceSave();
  return mirrorSaved||('indexedDB'in window);
}

let state=loadState(),pendingPdfRows=[],pendingReceiptImage="",deferredPrompt=null;

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
function renderAll(){renderCategoriesAssets();renderDashboard();renderTransactions();renderReceipts();renderReview();renderRules();renderReports();renderAssetSettings();renderCategoryManager()}
function dateFiltered(){const f=document.querySelector("#dashFrom").value,t=document.querySelector("#dashTo").value;return state.transactions.filter(x=>(!f||x.date>=f)&&(!t||x.date<=t))}
function renderDashboard(){const all=state.transactions;if(gettingStartedPanel)gettingStartedPanel.classList.toggle("hidden",all.length>0||state.receipts.length>0);const inc=all.filter(x=>Number(x.amount)>0).reduce((s,x)=>s+Number(x.amount),0),exp=all.filter(x=>Number(x.amount)<0).reduce((s,x)=>s+Math.abs(Number(x.amount)),0);kpiIncome.textContent=money(inc);kpiExpense.textContent=money(exp);kpiNet.textContent=money(inc-exp);kpiReview.textContent=state.reviewQueue.length; kpiReceiptMatch.textContent=state.receipts.filter(r=>r.status==="awaiting").length;transactionCount.textContent=all.length;ruleCount.textContent=state.rules.length;autoRate.textContent=all.length?pct(all.filter(x=>x.reviewed).length/all.length):"0%";const p=dateFiltered(),pi=p.filter(x=>x.amount>0).reduce((s,x)=>s+x.amount,0),pe=p.filter(x=>x.amount<0).reduce((s,x)=>s+Math.abs(x.amount),0);periodIncome.textContent=money(pi);periodExpense.textContent=money(pe);periodNet.textContent=money(pi-pe);const cats={};for(const x of p.filter(x=>x.amount<0))cats[x.category]=(cats[x.category]||0)+Math.abs(x.amount);const top=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,10),max=top[0]?.[1]||1;categoryBars.innerHTML=top.length?top.map(([c,v])=>`<div class="bar-row"><span>${esc(c)}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><strong>${money(v)}</strong></div>`).join(""):"<p>No transactions.</p>";drawCashflow()}
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
  const categories=allCategories();
  reviewList.innerHTML=state.reviewQueue.length?state.reviewQueue.map((q,i)=>{
    const chosenCategory=q.chosenCategory||q.category||"Uncategorised";
    const chosenSubcategory=q.chosenSubcategory||q.subcategory||"";
    const categoryOptions=categories.map(c=>`<option value="${esc(c)}"${c===chosenCategory?" selected":""}>${esc(c)}</option>`).join("");
    const subOptions=getSubcategories(chosenCategory,chosenSubcategory).map(s=>`<option value="${esc(s)}"${s===chosenSubcategory?" selected":""}>${esc(s)}</option>`).join("");
    return `<article class="review-card">
      <header><div><strong>${esc(q.pattern)}</strong><div>${esc(q.description)}</div></div><div><strong>${money(q.total)}</strong><div>${q.count} transactions</div></div></header>
      <div class="review-grid">
        <label>Suggested<input value="${esc(q.category)}" disabled></label><label>Confidence<input value="${pct(q.confidence)}" disabled></label>
        <label>Chosen category<div class="select-create-row"><select data-i="${i}" data-k="chosenCategory">${categoryOptions}</select><button type="button" class="inline-add-btn review-add-category" data-i="${i}" aria-label="Create category">＋</button></div></label>
        <label>Subcategory<div class="select-create-row"><select data-i="${i}" data-k="chosenSubcategory">${subOptions}</select><button type="button" class="inline-add-btn review-add-subcategory" data-i="${i}" aria-label="Create sub-category">＋</button></div></label>
        <label>Asset<div class="select-manage-row"><select data-i="${i}" data-k="asset"><option value="">Unassigned</option>${state.assets.map(a=>`<option value="${esc(a)}"${a===(q.asset||"")?" selected":""}>${esc(a)}</option>`).join("")}</select><button type="button" class="inline-add-btn review-add-asset" data-i="${i}" aria-label="Create asset">＋</button><button type="button" class="inline-edit-btn review-edit-asset" data-i="${i}" aria-label="Rename selected asset">✎</button></div></label>
        <label>Accept<select data-i="${i}" data-k="accept"><option value="false"${!q.accept?" selected":""}>No</option><option value="true"${q.accept?" selected":""}>Yes</option></select></label>
      </div></article>`;
  }).join(""):"<div class='panel'><p>No merchants need review.</p></div>";
  document.querySelectorAll("#reviewList select[data-i]").forEach(el=>el.onchange=e=>{const q=state.reviewQueue[+e.target.dataset.i],k=e.target.dataset.k;q[k]=k==="accept"?e.target.value==="true":e.target.value;if(k==="chosenCategory"){const available=getSubcategories(q.chosenCategory);q.chosenSubcategory=available[0]||"";saveState();renderReview();return;}saveState();});
  document.querySelectorAll(".review-add-category").forEach(btn=>btn.onclick=()=>{const i=+btn.dataset.i,q=state.reviewQueue[i];openNameManager({title:"Create category",description:"Create and select a category for this merchant rule.",label:"Category name",saveText:"Create",onSave:name=>{let def=state.categoryDefinitions.find(x=>upper(x.name)===upper(name));if(!def){def={name,subcategories:[]};state.categoryDefinitions.push(def);state.categoryDefinitions.sort((a,b)=>a.name.localeCompare(b.name));}q.chosenCategory=def.name;q.chosenSubcategory=def.subcategories[0]||"";saveState();renderAll();return true;}});});
  document.querySelectorAll(".review-add-subcategory").forEach(btn=>btn.onclick=()=>{const i=+btn.dataset.i,q=state.reviewQueue[i],category=q.chosenCategory||q.category||"Uncategorised",def=categoryDefinition(category);if(!def)return alert("Select or create a category first.");openNameManager({title:"Create sub-category",description:`Add a sub-category under ${category}.`,label:"Sub-category name",saveText:"Create",onSave:name=>{const existing=def.subcategories.find(x=>upper(x)===upper(name));if(!existing){def.subcategories.push(name);def.subcategories.sort((a,b)=>a.localeCompare(b));}q.chosenSubcategory=existing||name;saveState();renderAll();return true;}});});
  document.querySelectorAll(".review-add-asset").forEach(btn=>btn.onclick=()=>{const i=+btn.dataset.i,q=state.reviewQueue[i];openNameManager({title:"Create asset",description:"Create and select an asset for this merchant rule.",label:"Asset name",saveText:"Create",onSave:name=>{const existing=state.assets.find(x=>upper(x)===upper(name));if(!existing){state.assets.push(name);state.assets.sort((a,b)=>a.localeCompare(b));}q.asset=existing||name;saveState();renderAll();return true;}});});
  document.querySelectorAll(".review-edit-asset").forEach(btn=>btn.onclick=()=>{const select=btn.parentElement.querySelector("select");renameAssetInteractive(select);});
}
function renderRules(){rulesBody.innerHTML=state.rules.map((r,i)=>`<tr><td>${esc(r.pattern)}</td><td>${esc(r.category)}</td><td>${esc(r.subcategory||"")}</td><td>${esc(r.asset||"")}</td><td><button class="link-btn danger-link del-rule" data-i="${i}">Delete</button></td></tr>`).join("");document.querySelectorAll(".del-rule").forEach(b=>b.onclick=()=>{state.rules.splice(+b.dataset.i,1);saveState();renderAll()})}
function renderReports(){
  const years=[...new Set(state.transactions.map(t=>+t.date.slice(0,4)+(+(t.date.slice(5,7))>=7?1:0)))].sort((a,b)=>b-a);
  if(!years.length)years.push(new Date().getFullYear());
  const current=+fySelect.value||years[0];
  fySelect.innerHTML=years.map(y=>`<option value="${y}"${y===current?" selected":""}>${y-1}/${String(y).slice(-2)}</option>`).join("");
  const start=`${current-1}-07-01`,end=`${current}-06-30`,tx=state.transactions.filter(t=>t.date>=start&&t.date<=end);
  const inc=tx.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),exp=tx.filter(t=>t.amount<0).reduce((s,t)=>s+Math.abs(t.amount),0),tax=tx.filter(t=>t.amount<0&&t.taxDeductible).reduce((s,t)=>s+Math.abs(t.amount),0);
  fyIncome.textContent=money(inc);fyExpense.textContent=money(exp);fyTax.textContent=money(tax);
  const assets={};for(const t of tx.filter(x=>x.amount<0)){const a=t.asset||"Unassigned";assets[a]=(assets[a]||0)+Math.abs(t.amount)}
  assetSummary.innerHTML=Object.entries(assets).sort((a,b)=>b[1]-a[1]).map(([a,v])=>`<div><span>${esc(a)}</span><strong>${money(v)}</strong></div>`).join("")||"<p>No asset data.</p>";
  const breakdown={};
  for(const t of tx.filter(x=>x.amount<0)){
    const category=t.category||"Uncategorised",sub=t.subcategory||"Other";
    breakdown[category]??={total:0,subs:{}};breakdown[category].total+=Math.abs(t.amount);breakdown[category].subs[sub]=(breakdown[category].subs[sub]||0)+Math.abs(t.amount);
  }
  const summary=document.getElementById("subcategorySummary");
  summary.innerHTML=Object.entries(breakdown).sort((a,b)=>b[1].total-a[1].total).map(([category,data])=>`<details class="subcategory-report-card"><summary><span>${esc(category)}</span><strong>${money(data.total)}</strong></summary><div>${Object.entries(data.subs).sort((a,b)=>b[1]-a[1]).map(([sub,value])=>`<p><span>${esc(sub)}</span><strong>${money(value)}</strong></p>`).join("")}</div></details>`).join("")||"<p>No expense data for this financial year.</p>";
  const large=tx.filter(t=>t.amount<0).sort((a,b)=>a.amount-b.amount).slice(0,10);
  largestExpenses.innerHTML=`<table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Sub-category</th><th>Amount</th></tr></thead><tbody>${large.map(t=>`<tr><td>${t.date}</td><td>${esc(t.description)}</td><td>${esc(t.category)}</td><td>${esc(t.subcategory||"")}</td><td>${money(Math.abs(t.amount))}</td></tr>`).join("")}</tbody></table>`;
}
function renderCategoriesAssets(){const cats=allCategories();categoryList.innerHTML=cats.map(c=>`<option value="${esc(c)}">`).join("");const cv=categoryFilter.value;categoryFilter.innerHTML=`<option value="">All categories</option>`+cats.map(c=>`<option value="${esc(c)}"${c===cv?" selected":""}>${esc(c)}</option>`).join("");assetListData.innerHTML=state.assets.map(a=>`<option value="${esc(a)}">`).join("");const av=assetFilter.value;assetFilter.innerHTML=`<option value="">All assets</option>`+state.assets.map(a=>`<option value="${esc(a)}"${a===av?" selected":""}>${esc(a)}</option>`).join("")}
function assetIcon(name){const value=upper(name);if(/HOME|HOUSE|PROPERTY|RENTAL|UNIT|APARTMENT/.test(value))return "🏠";if(/CAR|VEHICLE|TRUCK|VAN|MOTOR|CARAVAN|BIKE/.test(value))return "🚗";if(/BUSINESS|COMPANY|WORK|SHOP/.test(value))return "💼";if(/BOAT|MARINE/.test(value))return "⛵";return "◆";}
function categoryIcon(name){const value=upper(name);if(/HOME|MAINTENANCE/.test(value))return "🏠";if(/FUEL|VEHICLE|TRANSPORT/.test(value))return "🚗";if(/GROCERY|CAFE|DINING|TAKE AWAY|ALCOHOL/.test(value))return "🍽️";if(/BILL|SUBSCRIPTION|LOAN|FINANCE|INSURANCE/.test(value))return "🧾";if(/INCOME|REFUND/.test(value))return "💰";if(/MEDICAL|HEALTH/.test(value))return "❤";if(/TRAVEL/.test(value))return "✈️";if(/SHOPPING/.test(value))return "🛍️";if(/PETS/.test(value))return "🐾";return "▦";}
function renderAssetSettings(){
  assetList.innerHTML=state.assets.length
    ? state.assets.map((a,i)=>`<span class="chip asset-chip"><span class="asset-icon" aria-hidden="true">${assetIcon(a)}</span><span>${esc(a)}</span><button class="link-btn rename-asset" data-i="${i}" aria-label="Rename ${esc(a)}">✎</button><button class="link-btn danger-link del-asset" data-i="${i}" aria-label="Delete ${esc(a)}">×</button></span>`).join("")
    : `<div class="empty-assets"><strong>No assets yet</strong><span>Add one when you are ready.</span></div>`;
  document.querySelectorAll(".rename-asset").forEach(button=>button.onclick=()=>{const oldName=state.assets[+button.dataset.i];const temp=document.createElement("select");fillAssetSelect(temp,oldName);renameAssetInteractive(temp);});
  document.querySelectorAll(".del-asset").forEach(button=>button.onclick=()=>{const i=+button.dataset.i,name=state.assets[i];if(!confirm(`Delete “${name}”? Existing entries will become Unassigned.`))return;updateAssetReferences(name,"");state.assets.splice(i,1);saveState();renderAll();});
}
function updateCategoryReferences(oldName,newName){
  for(const collection of [state.transactions,state.receipts,state.rules])for(const item of collection)if(item.category===oldName)item.category=newName;
  for(const q of state.reviewQueue){if(q.category===oldName)q.category=newName;if(q.chosenCategory===oldName)q.chosenCategory=newName;}
}
function updateSubcategoryReferences(category,oldName,newName){
  for(const collection of [state.transactions,state.receipts,state.rules])for(const item of collection)if(item.category===category&&item.subcategory===oldName)item.subcategory=newName;
  for(const q of state.reviewQueue)if((q.chosenCategory||q.category)===category){if(q.subcategory===oldName)q.subcategory=newName;if(q.chosenSubcategory===oldName)q.chosenSubcategory=newName;}
}
let selectedCategoryManagerName="";
function categoryManagerMatches(category,query){
  const q=upper(query);if(!q)return true;
  return upper(category.name).includes(q)||category.subcategories.some(sub=>upper(sub).includes(q));
}
function selectCategoryManager(name){
  selectedCategoryManagerName=name||"";
  renderCategoryManager();
}
function renderCategoryManagerDetail(category){
  const detail=document.getElementById("categoryManagerDetail");if(!detail)return;
  if(!category){detail.innerHTML=`<div class="category-detail-empty"><div>▦</div><h3>Select a category</h3><p>Choose a category from the list to rename it or manage its sub-categories.</p></div>`;return;}
  const originalIndex=state.categoryDefinitions.indexOf(category);
  detail.innerHTML=`<div class="category-detail-header"><div><span class="eyebrow">CATEGORY</span><h3>${esc(category.name)}</h3><p>${category.subcategories.length} sub-categor${category.subcategories.length===1?"y":"ies"}</p></div><div class="category-detail-actions"><button type="button" class="secondary detail-rename-category">Rename</button>${category.name!=="Uncategorised"?`<button type="button" class="danger detail-delete-category">Delete</button>`:""}</div></div><form id="managerSubcategoryAddForm" class="manager-subcategory-add"><input id="managerNewSubcategoryName" maxlength="60" placeholder="New sub-category name" required><button type="submit">＋ Add Sub-category</button></form><div class="manager-subcategory-list">${category.subcategories.length?category.subcategories.slice().sort((a,b)=>a.localeCompare(b)).map(sub=>{const subIndex=category.subcategories.indexOf(sub);return `<div class="manager-subcategory-row"><span>${esc(sub)}</span><div><button type="button" class="secondary manager-rename-subcategory" data-s="${subIndex}" aria-label="Rename ${esc(sub)}">Rename</button><button type="button" class="link-btn danger-link manager-delete-subcategory" data-s="${subIndex}" aria-label="Delete ${esc(sub)}">Delete</button></div></div>`}).join(""):`<div class="subcategory-empty">No sub-categories yet.</div>`}</div>`;
  detail.querySelector(".detail-rename-category")?.addEventListener("click",()=>{const categoryEl=document.createElement("select"),subEl=document.createElement("select");fillCategorySelect(categoryEl,subEl,category.name,category.subcategories[0]||"");renameCategoryInteractive(categoryEl,subEl);});
  detail.querySelector(".detail-delete-category")?.addEventListener("click",()=>{if(!confirm(`Delete “${category.name}”? Existing entries will move to Uncategorised.`))return;updateCategoryReferences(category.name,"Uncategorised");state.categoryDefinitions.splice(originalIndex,1);selectedCategoryManagerName="Uncategorised";saveState();renderAll();});
  detail.querySelector("#managerSubcategoryAddForm")?.addEventListener("submit",event=>{event.preventDefault();const input=detail.querySelector("#managerNewSubcategoryName"),name=norm(input.value);if(!name)return;if(category.subcategories.some(x=>upper(x)===upper(name)))return alert("That sub-category already exists in this category.");category.subcategories.push(name);category.subcategories.sort((a,b)=>a.localeCompare(b));input.value="";saveState();renderAll();showNotice(`Added ${name} under ${category.name}.`);});
  detail.querySelectorAll(".manager-rename-subcategory").forEach(btn=>btn.onclick=()=>{const oldName=category.subcategories[+btn.dataset.s],categoryEl=document.createElement("select"),subEl=document.createElement("select");fillCategorySelect(categoryEl,subEl,category.name,oldName);renameSubcategoryInteractive(categoryEl,subEl);});
  detail.querySelectorAll(".manager-delete-subcategory").forEach(btn=>btn.onclick=()=>{const i=+btn.dataset.s,name=category.subcategories[i];if(!confirm(`Delete “${name}”? Existing entries will use Other.`))return;updateSubcategoryReferences(category.name,name,"Other");category.subcategories.splice(i,1);if(!category.subcategories.includes("Other"))category.subcategories.push("Other");saveState();renderAll();});
}
function renderCategoryManager(){
  const list=document.getElementById("categoryManagerList"),summary=document.getElementById("categoryManagerSummary");
  const totalSubs=state.categoryDefinitions.reduce((sum,item)=>sum+item.subcategories.length,0);
  if(summary)summary.textContent=`${state.categoryDefinitions.length} categories · ${totalSubs} sub-categories`;
  if(!list)return;
  const search=document.getElementById("categoryManagerSearch"),query=search?.value||"";
  const categories=state.categoryDefinitions.slice().sort((a,b)=>a.name.localeCompare(b.name)).filter(category=>categoryManagerMatches(category,query));
  if(!selectedCategoryManagerName||!state.categoryDefinitions.some(category=>category.name===selectedCategoryManagerName))selectedCategoryManagerName=categories[0]?.name||state.categoryDefinitions[0]?.name||"";
  list.innerHTML=categories.length?categories.map(category=>`<button type="button" class="category-browser-item${category.name===selectedCategoryManagerName?" active":""}" data-name="${esc(category.name)}"><span class="category-item-icon" aria-hidden="true">${categoryIcon(category.name)}</span><span><strong>${esc(category.name)}</strong><small>${category.subcategories.length} sub-categor${category.subcategories.length===1?"y":"ies"}</small></span><span aria-hidden="true">›</span></button>`).join(""):`<div class="category-search-empty"><strong>No matches</strong><span>Try a different search term.</span></div>`;
  list.querySelectorAll(".category-browser-item").forEach(button=>button.onclick=()=>selectCategoryManager(button.dataset.name));
  renderCategoryManagerDetail(state.categoryDefinitions.find(category=>category.name===selectedCategoryManagerName));
}
const categoryManagerDialog=document.getElementById("categoryManagerDialog");
document.getElementById("openCategoryManagerBtn")?.addEventListener("click",()=>{selectedCategoryManagerName=selectedCategoryManagerName||state.categoryDefinitions.slice().sort((a,b)=>a.name.localeCompare(b.name))[0]?.name||"";document.getElementById("categoryManagerSearch").value="";renderCategoryManager();categoryManagerDialog.showModal();});
document.getElementById("closeCategoryManagerBtn")?.addEventListener("click",()=>categoryManagerDialog.close());
document.getElementById("categoryManagerSearch")?.addEventListener("input",renderCategoryManager);
document.getElementById("newCategoryManagerBtn")?.addEventListener("click",async()=>{const tempCategory=document.createElement("select"),tempSub=document.createElement("select");const created=await createCategoryInteractive(tempCategory,tempSub);if(created){selectedCategoryManagerName=created;renderCategoryManager();}});

function showNotice(t){importSummary.textContent=t;importSummary.classList.remove("hidden");setTimeout(()=>importSummary.classList.add("hidden"),9000)}

document.querySelectorAll(".tab").forEach(button=>{
  button.addEventListener("click",()=>{
    if(!activateView(button.dataset.view))console.error(`Navigation target not found: ${button.dataset.view}`);
  });
});
function fileExtension(file){return String(file?.name||"").toLowerCase().split(".").pop()}
function isCsvStatement(file){return fileExtension(file)==="csv"||["text/csv","text/comma-separated-values","application/csv","application/vnd.ms-excel"].includes(String(file?.type||"").toLowerCase())}
function isPdfStatement(file){return fileExtension(file)==="pdf"||String(file?.type||"").toLowerCase()==="application/pdf"}
function openStatementChooser(){
  if(typeof importChoiceDialog.showModal==="function")importChoiceDialog.showModal();
  else if(confirm("Choose OK for a PDF statement or Cancel for a CSV statement."))pdfInput.click();
  else csvInput.click();
}
csvInput.onchange=e=>{const f=e.target.files[0];if(f){if(!isCsvStatement(f))alert("Please choose a CSV bank statement (.csv).");else importCSV(f).catch(x=>alert(x.message))}e.target.value=""};
pdfInput.onchange=e=>{const f=e.target.files[0];if(f){if(!isPdfStatement(f))alert("Please choose a PDF bank statement (.pdf).");else handlePdf(f).catch(x=>alert(x.message))}e.target.value=""};
choosePdfImportBtn.onclick=()=>{importChoiceDialog.close();setTimeout(()=>pdfInput.click(),0)};
chooseCsvImportBtn.onclick=()=>{importChoiceDialog.close();setTimeout(()=>csvInput.click(),0)};
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



async function detectReceiptGeometry(dataUrl){
  const img=await loadImage(dataUrl);
  const analysisWidth=Math.min(900,img.width);
  const scale=analysisWidth/img.width;
  const analysisHeight=Math.max(1,Math.round(img.height*scale));
  const canvas=document.createElement("canvas");
  canvas.width=analysisWidth;
  canvas.height=analysisHeight;
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  ctx.drawImage(img,0,0,analysisWidth,analysisHeight);
  const image=ctx.getImageData(0,0,analysisWidth,analysisHeight);
  const data=image.data;

  // Receipt paper is normally substantially brighter and less saturated than the background.
  const mask=new Uint8Array(analysisWidth*analysisHeight);
  for(let y=0;y<analysisHeight;y++){
    for(let x=0;x<analysisWidth;x++){
      const i=(y*analysisWidth+x)*4;
      const r=data[i],g=data[i+1],b=data[i+2];
      const max=Math.max(r,g,b),min=Math.min(r,g,b);
      const brightness=.299*r+.587*g+.114*b;
      const saturation=max-min;
      if(brightness>145&&saturation<72)mask[y*analysisWidth+x]=1;
    }
  }

  // Row/column occupancy smooths over printed text and small creases.
  const rowCounts=new Uint32Array(analysisHeight);
  const colCounts=new Uint32Array(analysisWidth);
  for(let y=0;y<analysisHeight;y++){
    for(let x=0;x<analysisWidth;x++){
      if(mask[y*analysisWidth+x]){
        rowCounts[y]++;
        colCounts[x]++;
      }
    }
  }

  const rowThreshold=Math.max(8,Math.round(analysisWidth*.12));
  const colThreshold=Math.max(8,Math.round(analysisHeight*.12));
  let top=0,bottom=analysisHeight-1,left=0,right=analysisWidth-1;

  while(top<analysisHeight-1&&rowCounts[top]<rowThreshold)top++;
  while(bottom>top&&rowCounts[bottom]<rowThreshold)bottom--;
  while(left<analysisWidth-1&&colCounts[left]<colThreshold)left++;
  while(right>left&&colCounts[right]<colThreshold)right--;

  // Guard against failed detection.
  const detectedWidth=right-left+1;
  const detectedHeight=bottom-top+1;
  const plausible=detectedWidth>analysisWidth*.22&&detectedHeight>analysisHeight*.35;
  if(!plausible){
    return {
      source:dataUrl,
      detected:false,
      bounds:{x:0,y:0,width:img.width,height:img.height},
      confidence:0
    };
  }

  const paddingX=Math.round(detectedWidth*.035);
  const paddingY=Math.round(detectedHeight*.025);
  left=Math.max(0,left-paddingX);
  right=Math.min(analysisWidth-1,right+paddingX);
  top=Math.max(0,top-paddingY);
  bottom=Math.min(analysisHeight-1,bottom+paddingY);

  const sourceX=Math.round(left/scale);
  const sourceY=Math.round(top/scale);
  const sourceW=Math.round((right-left+1)/scale);
  const sourceH=Math.round((bottom-top+1)/scale);

  const receiptCanvas=document.createElement("canvas");
  receiptCanvas.width=Math.max(1,sourceW);
  receiptCanvas.height=Math.max(1,sourceH);
  const receiptCtx=receiptCanvas.getContext("2d");
  receiptCtx.drawImage(img,sourceX,sourceY,sourceW,sourceH,0,0,sourceW,sourceH);

  const coverage=(detectedWidth*detectedHeight)/(analysisWidth*analysisHeight);
  const confidence=Math.round(Math.max(1,Math.min(99,55+coverage*65)));

  return {
    source:receiptCanvas.toDataURL("image/png"),
    detected:true,
    bounds:{x:sourceX,y:sourceY,width:sourceW,height:sourceH},
    confidence
  };
}
async function cropReceiptRegion(dataUrl,startRatio,endRatio,{threshold=false,scale=1.8}={}){
  const img=await loadImage(dataUrl);
  const y=Math.max(0,Math.floor(img.height*startRatio));
  const h=Math.max(1,Math.floor(img.height*(endRatio-startRatio)));
  const canvas=document.createElement("canvas");
  canvas.width=Math.max(1,Math.round(img.width*scale));
  canvas.height=Math.max(1,Math.round(h*scale));
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality="high";
  ctx.drawImage(img,0,y,img.width,h,0,0,canvas.width,canvas.height);

  if(threshold){
    const image=ctx.getImageData(0,0,canvas.width,canvas.height);
    const data=image.data;
    let sum=0;
    for(let i=0;i<data.length;i+=4)sum+=.299*data[i]+.587*data[i+1]+.114*data[i+2];
    const mean=sum/(data.length/4);
    for(let i=0;i<data.length;i+=4){
      const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2];
      const value=gray>Math.max(140,mean*.9)?255:0;
      data[i]=data[i+1]=data[i+2]=value;
    }
    ctx.putImageData(image,0,0);
  }
  return canvas.toDataURL("image/png");
}


async function cropReceiptBox(dataUrl,leftRatio,topRatio,rightRatio,bottomRatio,{threshold=false,scale=2.4}={}){
  const img=await loadImage(dataUrl);
  const sx=Math.max(0,Math.floor(img.width*leftRatio));
  const sy=Math.max(0,Math.floor(img.height*topRatio));
  const sw=Math.max(1,Math.floor(img.width*(rightRatio-leftRatio)));
  const sh=Math.max(1,Math.floor(img.height*(bottomRatio-topRatio)));
  const canvas=document.createElement("canvas");
  canvas.width=Math.max(1,Math.round(sw*scale));
  canvas.height=Math.max(1,Math.round(sh*scale));
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality="high";
  ctx.drawImage(img,sx,sy,sw,sh,0,0,canvas.width,canvas.height);

  if(threshold){
    const image=ctx.getImageData(0,0,canvas.width,canvas.height);
    const data=image.data;
    let sum=0;
    for(let i=0;i<data.length;i+=4)sum+=.299*data[i]+.587*data[i+1]+.114*data[i+2];
    const mean=sum/(data.length/4);
    for(let i=0;i<data.length;i+=4){
      const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2];
      const value=gray>Math.max(142,mean*.92)?255:0;
      data[i]=data[i+1]=data[i+2]=value;
    }
    ctx.putImageData(image,0,0);
  }
  return canvas.toDataURL("image/png");
}

async function makeDateStripVariants(dataUrl){
  const img=await loadImage(dataUrl);
  // Bunnings date/time is normally between the store header and invoice number.
  const y=Math.max(0,Math.floor(img.height*.10));
  const h=Math.max(1,Math.floor(img.height*.28));
  const scale=2.4;
  const width=Math.round(img.width*scale);
  const height=Math.round(h*scale);

  const drawBase=()=>{
    const canvas=document.createElement("canvas");
    canvas.width=width;
    canvas.height=height;
    const ctx=canvas.getContext("2d",{willReadFrequently:true});
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality="high";
    ctx.drawImage(img,0,y,img.width,h,0,0,width,height);
    return canvas;
  };

  const grayscale=drawBase();
  {
    const ctx=grayscale.getContext("2d",{willReadFrequently:true});
    const image=ctx.getImageData(0,0,width,height);
    const data=image.data;
    for(let i=0;i<data.length;i+=4){
      const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2];
      const value=Math.max(0,Math.min(255,(gray-128)*1.65+150));
      data[i]=data[i+1]=data[i+2]=value;
    }
    ctx.putImageData(image,0,0);
  }

  const threshold=drawBase();
  {
    const ctx=threshold.getContext("2d",{willReadFrequently:true});
    const image=ctx.getImageData(0,0,width,height);
    const data=image.data;
    let sum=0;
    for(let i=0;i<data.length;i+=4)sum+=.299*data[i]+.587*data[i+1]+.114*data[i+2];
    const mean=sum/(data.length/4);
    for(let i=0;i<data.length;i+=4){
      const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2];
      const value=gray>Math.max(142,mean*.91)?255:0;
      data[i]=data[i+1]=data[i+2]=value;
    }
    ctx.putImageData(image,0,0);
  }

  const sharpened=drawBase();
  {
    const ctx=sharpened.getContext("2d",{willReadFrequently:true});
    const source=ctx.getImageData(0,0,width,height);
    const out=ctx.createImageData(width,height);
    const s=source.data,d=out.data;
    const kernel=[0,-1,0,-1,5,-1,0,-1,0];
    for(let yy=1;yy<height-1;yy++){
      for(let xx=1;xx<width-1;xx++){
        for(let c=0;c<3;c++){
          let value=0,k=0;
          for(let ky=-1;ky<=1;ky++){
            for(let kx=-1;kx<=1;kx++){
              value+=s[((yy+ky)*width+(xx+kx))*4+c]*kernel[k++];
            }
          }
          d[(yy*width+xx)*4+c]=Math.max(0,Math.min(255,value));
        }
        d[(yy*width+xx)*4+3]=255;
      }
    }
    ctx.putImageData(out,0,0);
  }

  // Also create tightly focused single-line bands. The previous broad crop could
  // recognise the time while losing the date because surrounding header text dominated.
  const makeFocused=(start,end,thresholdMode=false)=>{
    const fy=Math.max(0,Math.floor(img.height*start));
    const fh=Math.max(1,Math.floor(img.height*(end-start)));
    const fx=Math.floor(img.width*.03),fw=Math.floor(img.width*.94);
    const focusedScale=4.2;
    const canvas=document.createElement("canvas");
    canvas.width=Math.round(fw*focusedScale);
    canvas.height=Math.round(fh*focusedScale);
    const ctx=canvas.getContext("2d",{willReadFrequently:true});
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
    ctx.drawImage(img,fx,fy,fw,fh,0,0,canvas.width,canvas.height);
    const image=ctx.getImageData(0,0,canvas.width,canvas.height),data=image.data;
    let sum=0;
    for(let i=0;i<data.length;i+=4)sum+=.299*data[i]+.587*data[i+1]+.114*data[i+2];
    const mean=sum/(data.length/4);
    for(let i=0;i<data.length;i+=4){
      const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2];
      let value=(gray-mean)*2.15+166;
      if(thresholdMode)value=value>Math.max(140,mean*.91)?255:0;
      value=Math.max(0,Math.min(255,value));
      data[i]=data[i+1]=data[i+2]=value;
    }
    ctx.putImageData(image,0,0);
    return canvas.toDataURL("image/png");
  };

  return [
    {label:"date-gray",image:grayscale.toDataURL("image/png")},
    {label:"date-threshold",image:threshold.toDataURL("image/png")},
    {label:"date-sharpen",image:sharpened.toDataURL("image/png")},
    {label:"date-line-upper",image:makeFocused(.105,.205,false)},
    {label:"date-line-upper-threshold",image:makeFocused(.105,.205,true)},
    {label:"date-line-lower",image:makeFocused(.135,.235,false)},
    {label:"date-line-lower-threshold",image:makeFocused(.135,.235,true)}
  ];
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

const PADDLE_OCR_MODULE_URL="https://cdn.jsdelivr.net/npm/@paddleocr/paddleocr-js/+esm";
let paddleOcrInstance=null;
let paddleOcrUnavailableReason="";

async function getPaddleOcr(){
  if(paddleOcrInstance)return paddleOcrInstance;
  if(paddleOcrUnavailableReason)throw new Error(paddleOcrUnavailableReason);
  try{
    const mod=await import(PADDLE_OCR_MODULE_URL);
    if(!mod?.PaddleOCR)throw new Error("PaddleOCR export was not found");
    paddleOcrInstance=await mod.PaddleOCR.create({
      lang:"en",
      ocrVersion:"PP-OCRv5",
      worker:false,
      ortOptions:{
        backend:"wasm",
        wasmPaths:"https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/",
        numThreads:1,
        simd:true
      }
    });
    return paddleOcrInstance;
  }catch(error){
    paddleOcrUnavailableReason=String(error?.message||error||"PaddleOCR failed to load");
    throw error;
  }
}

async function dataUrlToBlob(dataUrl){
  const response=await fetch(dataUrl);
  return response.blob();
}

function normalisePaddleItems(items=[]){
  return items.map((item,index)=>{
    const poly=item.poly||item.box||item.points||[];
    const points=Array.isArray(poly)?poly.flatMap(p=>Array.isArray(p)?[p]:[]):[];
    const xs=points.map(p=>Number(p?.[0])).filter(Number.isFinite);
    const ys=points.map(p=>Number(p?.[1])).filter(Number.isFinite);
    const x=xs.length?Math.min(...xs):0;
    const y=ys.length?Math.min(...ys):index*20;
    const x2=xs.length?Math.max(...xs):x;
    const y2=ys.length?Math.max(...ys):y;
    return {text:String(item.text||item.recText||"").trim(),score:Number(item.score??item.confidence??0),x,y,x2,y2,poly};
  }).filter(item=>item.text);
}

function paddleItemsToRows(items=[]){
  const sorted=[...items].sort((a,b)=>a.y-b.y||a.x-b.x);
  const rows=[];
  for(const item of sorted){
    const h=Math.max(8,item.y2-item.y);
    const cy=(item.y+item.y2)/2;
    let row=rows.find(r=>Math.abs(r.cy-cy)<=Math.max(9,Math.min(24,(r.h+h)*.45)));
    if(!row){row={cy,h,items:[]};rows.push(row)}
    row.items.push(item);
    row.cy=(row.cy*(row.items.length-1)+cy)/row.items.length;
    row.h=Math.max(row.h,h);
  }
  return rows.sort((a,b)=>a.cy-b.cy).map(row=>row.items.sort((a,b)=>a.x-b.x).map(i=>i.text).join(" ").replace(/\s+/g," ").trim()).filter(Boolean);
}

function paddleSummaryRows(items=[]){
  const rows=paddleItemsToRows(items);
  const keys=/sub\s*total|\btotal\b|gst|tax|eft|power\s*pass|card|credit|rounding|change|savings/i;
  const selected=new Set();
  rows.forEach((row,index)=>{if(keys.test(row)){for(let i=Math.max(0,index-2);i<=Math.min(rows.length-1,index+5);i++)selected.add(i)}});
  if(!selected.size){
    const start=Math.floor(rows.length*.50);
    for(let i=start;i<Math.min(rows.length,start+Math.ceil(rows.length*.30));i++)selected.add(i);
  }
  return [...selected].sort((a,b)=>a-b).map(i=>rows[i]);
}

async function recognisePaddlePass(image,label,section){
  const ocr=await getPaddleOcr();
  const blob=await dataUrlToBlob(image);
  const results=await ocr.predict(blob,{textRecScoreThresh:.35,textDetBoxThresh:.35,textDetThresh:.25});
  const result=results?.[0]||{};
  const items=normalisePaddleItems(result.items||[]);
  const rows=label.includes("summary")?paddleSummaryRows(items):paddleItemsToRows(items);
  const average=items.length?items.reduce((sum,item)=>sum+item.score,0)/items.length:0;
  return {
    section,pass:label,engine:"PaddleOCR",confidence:Math.round(average*100),characters:rows.join("\n").length,
    text:rows.join("\n"),summaryText:paddleSummaryRows(items).join("\n"),items:items.map(({text,score,x,y,x2,y2})=>({text,score,x,y,x2,y2})),
    metrics:result.metrics||null,image
  };
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

async function recogniseMoneyPass(image,label,section,logger){
  const result=await Tesseract.recognize(image,"eng",{
    logger,
    tessedit_pageseg_mode:"6",
    tessedit_char_whitelist:"0123456789.$, TOTALTotalGSTgstPOWERPASSPowerpassINCLUDED included"
  });
  return {
    section,
    pass:label,
    confidence:Math.round(Number(result.data.confidence)||0),
    characters:(result.data.text||"").length,
    text:result.data.text||"",
    image
  };
}

async function recogniseDatePass(image,label,section,logger){
  const result=await Tesseract.recognize(image,"eng",{
    logger,
    tessedit_pageseg_mode:label.includes("line")?"7":"6",
    preserve_interword_spaces:"1",
    tessedit_char_whitelist:"0123456789/-. :AMPampMonTueWedThuFriSatSun"
  });
  return {
    section,
    pass:label,
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
  receiptDate.value="";receiptMerchant.value="";receiptAmount.value="";fillCategorySelect(receiptCategory,receiptSubcategory,"Uncategorised","Review Required");fillAssetSelect(receiptAsset,"");receiptAccount.value="";receiptPaymentMethod.value="Card";receiptNumber.value="";receiptGst.value="";receiptNotes.value="";ocrStatus.textContent=`${pendingReceiptPages.length} section${pendingReceiptPages.length===1?'':'s'} ready`;receiptDialog.showModal();
}
receiptImageInput.onchange=e=>{if(e.target.files.length)openReceiptCapture(e.target.files);e.target.value=""};heroScanBtn.onclick=()=>receiptImageInput.click();quickScanBtn.onclick=()=>receiptImageInput.click();startScanBtn.onclick=()=>receiptImageInput.click();startImportBtn.onclick=openStatementChooser;
receiptMoreInput.onchange=async e=>{if(e.target.files.length){await addReceiptFiles(e.target.files);ocrStatus.textContent=`${pendingReceiptPages.length} sections ready`}e.target.value=''};
rotateScanBtn.onclick=async()=>{if(!pendingReceiptPages.length)return;const p=pendingReceiptPages.at(-1);p.rotation=((p.rotation||0)+90)%360;await rebuildReceiptPreview()};
removeScanBtn.onclick=async()=>{pendingReceiptPages.pop();await rebuildReceiptPreview();ocrStatus.textContent=pendingReceiptPages.length?`${pendingReceiptPages.length} sections ready`:'Add a receipt section'};
enhanceScan.onchange=rebuildReceiptPreview;
receiptCategory.onchange=()=>fillSubcategorySelect(receiptCategory,receiptSubcategory,"");
txCategory.onchange=()=>fillSubcategorySelect(txCategory,txSubcategory,"");
ruleCategory.onchange=()=>fillSubcategorySelect(ruleCategory,ruleSubcategory,"");
txAddCategoryBtn.onclick=()=>createCategoryInteractive(txCategory,txSubcategory);
txAddSubcategoryBtn.onclick=()=>createSubcategoryInteractive(txCategory,txSubcategory);
txAddAssetBtn.onclick=()=>createAssetInteractive(txAsset);
txEditCategoryBtn.onclick=()=>renameCategoryInteractive(txCategory,txSubcategory);
txEditSubcategoryBtn.onclick=()=>renameSubcategoryInteractive(txCategory,txSubcategory);
txEditAssetBtn.onclick=()=>renameAssetInteractive(txAsset);
receiptAddCategoryBtn.onclick=()=>createCategoryInteractive(receiptCategory,receiptSubcategory);
receiptAddSubcategoryBtn.onclick=()=>createSubcategoryInteractive(receiptCategory,receiptSubcategory);
receiptAddAssetBtn.onclick=()=>createAssetInteractive(receiptAsset);
receiptEditCategoryBtn.onclick=()=>renameCategoryInteractive(receiptCategory,receiptSubcategory);
receiptEditSubcategoryBtn.onclick=()=>renameSubcategoryInteractive(receiptCategory,receiptSubcategory);
receiptEditAssetBtn.onclick=()=>renameAssetInteractive(receiptAsset);

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
    .replace(/\bAUNNINGS\b/gi,"BUNNINGS")
    .replace(/\bBUN\s+ING\b/gi,"BUNNINGS")
    .replace(/\bP(?:U|O|OY)S?R?PASS\b/gi,"PowerPass")
    .replace(/\bPOYSRPASS\b/gi,"PowerPass")
    .replace(/\bPOVERPASE\b/gi,"PowerPass")
    .replace(/\bPOUSR?PASS\b/gi,"PowerPass")
    .replace(/\bPOVERP?ASS?E?\b/gi,"PowerPass")
    .replace(/\bPOUSRPass\b/gi,"PowerPass")
    .replace(/\bFOOTED\b/gi,"Total")
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
function moneyValues(line,{labelled=false}={}){
  const text=String(line||"");
  const values=[];

  // Standard decimal currency.
  for(const match of text.matchAll(/\$?\s*([0-9]{1,5}(?:,[0-9]{3})*\.\d{2})\b/g)){
    const value=parseMoneyToken(match[1]);
    if(value>0&&value<100000)values.push(value);
  }

  // Missing decimal repair is only safe beside a financial label.
  if(labelled){
    for(const match of text.matchAll(/\$\s*([0-9]{3,6})\b/g)){
      const digits=match[1];
      const value=Number(`${digits.slice(0,-2)}.${digits.slice(-2)}`);
      if(value>0&&value<5000)values.push(value);
    }
  }

  return [...new Set(values.map(v=>Number(v.toFixed(2))))];
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
  if(/\b(POWERPASS|EFTPOS|EFT|VISA|MASTERCARD|CARD NO|CARD)\b/i.test(text))return "Card";
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



function cleanOcrPassText(text){
  return normaliseOcrText(text)
    .split("\n")
    .filter(line=>!/^---\s*(?:HEADER|TOTALS|FULL)\s+PASS\s*---$/i.test(line.trim()))
    .join("\n")
    .trim();
}
function buildReceiptChannels(input){
  if(input&&typeof input==="object"){
    return {
      header:cleanOcrPassText(input.header||""),
      totals:cleanOcrPassText(input.totals||""),
      full:cleanOcrPassText(input.full||""),
      date:cleanOcrPassText(input.date||""),
      footer:cleanOcrPassText(input.footer||""),
      gst:cleanOcrPassText(input.gst||""),
      totalsRight:cleanOcrPassText(input.totalsRight||"")
    };
  }
  const split=splitOcrPasses(String(input||""));
  return {
    header:cleanOcrPassText(split.header),
    totals:cleanOcrPassText(split.totals),
    full:cleanOcrPassText(split.full||String(input||"")),
    date:"",
    footer:"",
    gst:"",
    totalsRight:""
  };
}
function combinedReceiptText(channels){
  return [channels.full,channels.date,channels.footer,channels.gst,channels.totalsRight,channels.header,channels.totals].filter(Boolean).join("\n");
}
function bunningsEvidenceScore(text){
  const upperText=upper(text);
  let score=0;
  if(/\bBUNNINGS\b|\bBUNNINGS\s+GROUP\b|\bWAREHOUSE\b/.test(upperText))score+=80;
  if(/\bPOWERPASS\b/.test(upperText))score+=45;
  if(/ABN\s*26\s*00[68]\s*672\s*179/.test(upperText))score+=45;
  if(/\bTAX\s+INVOICE\b/.test(upperText))score+=20;
  if(/\b\d{4}\/\d{7,8}\b/.test(upperText))score+=25;
  if(/\bCARD\s*(?:NO|NG|KO)\b/.test(upperText))score+=10;
  return score;
}
function detectMerchantAcrossChannels(channels){
  const perPass=[
    {name:"full",text:channels.full,weight:1},
    {name:"header",text:channels.header,weight:.8},
    {name:"totals",text:channels.totals,weight:.7}
  ];
  let bunnings=0;
  for(const pass of perPass)bunnings+=bunningsEvidenceScore(pass.text)*pass.weight;
  if(bunnings>=55){
    return {
      id:"bunnings",
      merchant:"Bunnings Warehouse",
      parser:"bunnings",
      category:"Home & Maintenance",
      subcategory:"Hardware",
      score:Math.round(bunnings)
    };
  }

  const combined=combinedReceiptText(channels);
  const detected=detectKnownMerchant(combined,ocrLines(combined));
  if(/^---/.test(detected.merchant||""))detected.merchant="";
  return detected;
}
function isItemOrNoiseLine(line){
  const text=upper(line);
  return (
    /(?:\bDISC\b|\bDISCOUNT\b|\bSAVINGS?\b|\bCHANGE\b|\bROUNDING\b)/.test(text) ||
    /(?:\b\d{10,14}\b|\b\d+\s*@|\bQTY\b|\bEACH\b|\bUNIT\b)/.test(text) ||
    /(?:\bMM\b|\bCM\b|\bKG\b|\bGRAM\b|\bG\b\s*(?:CLEAR|WHITE|BLACK|RED)\b)/.test(text)
  );
}
function currencyCandidates(line,{labelled=false}={}){
  const text=String(line||"");
  const candidates=[];
  const consumed=[];
  const add=(value,quality,reason,raw,start=0,end=0)=>{
    value=Number(value);
    if(!(value>0&&value<5000))return;
    candidates.push({
      value:Number(value.toFixed(2)),
      quality,
      reason,
      raw:String(raw||"")
    });
    if(end>start)consumed.push([start,end]);
  };
  const overlapsConsumed=(start,end)=>consumed.some(([a,b])=>start<b&&end>a);

  if(labelled){
    // Parse complete damaged sequences before any substring matching.
    // $236 . 9. 3 -> digits 23693 -> $236.93
    for(const match of text.matchAll(/\$\s*(\d{1,4})\s*\.\s*(\d)\s*\.\s*(\d)\b/g)){
      const digits=`${match[1]}${match[2]}${match[3]}`;
      add(Number(`${digits.slice(0,-2)}.${digits.slice(-2)}`),98,"fragmented-decimal-sequence",match[0],match.index,match.index+match[0].length);
    }

    // $236 93 -> $236.93
    for(const match of text.matchAll(/\$\s*(\d{1,4})\s+(\d{2})\b/g)){
      add(Number(`${match[1]}.${match[2]}`),96,"spaced-cents",match[0],match.index,match.index+match[0].length);
    }

    // $236 . 93 or $91. 06 -> normal decimal.
    for(const match of text.matchAll(/\$\s*(\d{1,4})\s*\.\s*(\d{2})\b/g)){
      add(Number(`${match[1]}.${match[2]}`),99,"spaced-both-sides-decimal",match[0],match.index,match.index+match[0].length);
    }

    // OCR often recognises the final digit 5 as a closing parenthesis: $21.5) -> $21.55.
    for(const match of text.matchAll(/\$\s*(\d{1,4})\.(\d)\s*\)/g)){
      add(Number(`${match[1]}.${match[2]}5`),91,"closing-paren-as-five",match[0],match.index,match.index+match[0].length);
    }

    // v8.0: thermal receipt OCR frequently reads a final 5 as g, q, S or ).
    // Examples: "$136 5g" and "$136.5g" are both $136.55. Restrict
    // this repair to labelled money lines so product text cannot create totals.
    for(const match of text.matchAll(/\$\s*(\d{1,4})\s*[., ]\s*(\d)\s*([gGqQsS)])/g)){
      const tail=/[gGqQsS)]/.test(match[3])?"5":match[3];
      add(Number(`${match[1]}.${match[2]}${tail}`),94,"damaged-final-five",match[0],match.index,match.index+match[0].length);
    }
  }

  // Clear two-decimal values.
  for(const match of text.matchAll(/\$?\s*([0-9]{1,5}(?:,[0-9]{3})*\.\d{2})\b/g)){
    const start=match.index,end=start+match[0].length;
    if(!overlapsConsumed(start,end)){
      add(parseMoneyToken(match[1]),100,"exact-decimal",match[0],start,end);
    }
  }

  if(labelled){
    // One decimal digit, only after complete sequences have been consumed.
    for(const match of text.matchAll(/\$?\s*([0-9]{1,4})\.(\d)(?![\d.\s]*\d)/g)){
      const start=match.index,end=start+match[0].length;
      if(!overlapsConsumed(start,end)){
        add(Number(`${match[1]}.${match[2]}0`),48,"one-decimal-pad",match[0],start,end);
      }
    }

    // Compact values such as 23693. Do not match a substring of a larger damaged sequence.
    for(const match of text.matchAll(/(?:\$|\b)([0-9]{3,6})\b/g)){
      const start=match.index,end=start+match[0].length;
      if(overlapsConsumed(start,end))continue;

      const before=text.slice(Math.max(0,start-3),start);
      const after=text.slice(end,Math.min(text.length,end+6));
      if(/[.\d]\s*$/.test(before)||/^\s*[.\d]/.test(after))continue;

      const digits=match[1];
      add(
        Number(`${digits.slice(0,-2)}.${digits.slice(-2)}`),
        digits.length>=5?86:58,
        "compact-currency",
        match[0],
        start,
        end
      );
    }
  }

  const best=new Map();
  for(const candidate of candidates){
    const key=candidate.value.toFixed(2);
    const existing=best.get(key);
    if(!existing||candidate.quality>existing.quality)best.set(key,candidate);
  }
  return [...best.values()];
}
function labelledMoneyValues(line){
  const labelled=/\b(?:TOTAL|FOTAL|FOOTED|SUBTOTAL|SUBTOTAR|SUBLOTAI|POWERPASS|EFTPOS|EFT|VISA|MASTERCARD|CARD|GST|TAX)\b/i.test(line);
  return currencyCandidates(line,{labelled});
}

function isReferenceOnlyLine(line){
  const text=upper(line);
  return (
    /\bCARD\s*(?:NO|NUMBER|HO|WO|NG|KO)\b/.test(text) ||
    /\bACCOUNT\s*(?:NO|NUMBER)\b/.test(text) ||
    /\bABN\b/.test(text) ||
    /\bPHONE\b|\bPH\s*:/.test(text) ||
    /\bORDER\s*(?:NO|NUMBER)\b/.test(text) ||
    /\bJOB\s*(?:NO|NUMBER)\b/.test(text) ||
    /\bAUTH(?:ORISATION|ORIZATION)?\s*(?:NO|CODE|NUMBER)?\b/.test(text) ||
    /\bINVOICE\s*(?:NO|NUMBER)\b/.test(text) ||
    /\bRECEIPT\s*(?:NO|NUMBER)\b/.test(text) ||
    /\b\d{6}[-\s]\d{3,6}\b/.test(text)
  );
}
function isCardPaymentLine(line){
  const text=upper(line);
  if(isReferenceOnlyLine(line))return false;
  const hasAmount=currencyCandidates(line,{labelled:true}).some(candidate=>candidate.value>0);
  return (
    (/\b(?:EFT|EFTPOS|ET|FT|VISA|MASTERCARD)\b/.test(text)&&hasAmount) ||
    (/\bPOWERPASS\b/.test(text)&&(hasAmount||/\b(?:PAID|PAYMENT|PURCHASE|DEBIT|CREDIT)\b/.test(text))) ||
    (/\bCARD\b/.test(text)&&/\b(?:PAID|PAYMENT|PURCHASE|DEBIT|CREDIT)\b/.test(text))
  );
}

function safeReceiptTotal(channels,merchant=""){
  const scored=new Map();
  const add=(candidate,score,source,role)=>{
    const value=candidate.value;
    if(!(value>0&&value<=5000))return;
    const key=value.toFixed(2);
    const current=scored.get(key)||{value,score:0,count:0,sources:[],roles:[],repairs:[]};
    current.score+=score+candidate.quality;
    current.count++;
    current.sources.push(source);
    current.roles.push(role);
    current.repairs.push(candidate.reason);
    scored.set(key,current);
  };

  const sources=[
    ["totals-right",channels.totalsRight||"",155],
    ["full",channels.full,100],
    ["totals",channels.totals,80],
    ["header",channels.header,15]
  ];

  for(const [source,text,baseWeight] of sources){
    const lines=ocrLines(text);
    for(const line of lines){
      const referenceOnly=isReferenceOnlyLine(line);
      const candidates=labelledMoneyValues(line);
      if(!candidates.length)continue;

      const isTotal=/^\s*(?:TOTAL|FOTAL|FOOTED)\b|\bAMOUNT\s+PAID\b/i.test(line);
      // v7.9: Bunnings often prints the tender amount on the same physical row
      // as CARD NO. The old reference-line guard discarded that amount before
      // consensus could use it. Preserve only a clear money value on CARD NO
      // rows as payment-reference evidence; all other reference-only lines are
      // still ignored so barcodes/account numbers cannot become totals.
      const isCardReferencePayment=referenceOnly&&
        /\bCARD\s*(?:NO|NUMBER|HO|WO|NG|KO)\b/i.test(line)&&
        candidates.some(candidate=>candidate.reason!=="compact-currency"&&candidate.value>0);
      if(referenceOnly&&!isCardReferencePayment)continue;
      const isPayment=isCardPaymentLine(line)||isCardReferencePayment;
      const isSubtotal=/\bSUB\s*TOTAL\b|\bSUBTOTAL\b|\bSUBTOTAR\b|\bSUBLOTAI\b/i.test(line);
      const isGst=/\bGST\b|\bBST\b|\bTAX\s*AMOUNT\b/i.test(line);
      const isIncludedTotal=fuzzyIncludedTotalEvidence(line);

      let role="other";
      if(isPayment)role="payment";
      else if(isTotal)role="total";
      else if(isIncludedTotal)role="included-total";
      else if(isSubtotal)role="subtotal";
      else if(isGst)role="gst";

      for(const candidate of candidates){
        let score=baseWeight;
        if(role==="payment")score+=isCardReferencePayment?95:165;
        else if(role==="total")score+=225;
        else if(role==="included-total")score+=105;
        else if(role==="subtotal")score+=12;
        else score-=75;

        if(role==="gst")score-=240;
        if(isItemOrNoiseLine(line)&&!["total","payment","included-total"].includes(role))score-=190;
        if(candidate.reason==="one-decimal-pad")score-=90;
        // Compact currency invents a decimal point. It is a last-resort repair,
        // never stronger than a printed two-decimal total.
        if(candidate.reason==="compact-currency"){
          score-=candidate.raw.replace(/\D/g,"").length<=3?260:145;
          if(role==="payment")score-=90;
          if(role==="total")score-=35;
        }
        if(candidate.value>1000)score-=240;

        add(candidate,score,`${source}:${line.trim()}`,role);
      }
    }
  }

  for(const item of scored.values()){
    const roles=new Set(item.roles);
    if(item.count>=2)item.score+=item.count*60;
    if(item.count>=3)item.score+=80;
    if(roles.has("payment")&&(roles.has("total")||roles.has("included-total")))item.score+=185;
    if(roles.has("payment")&&item.repairs.some(r=>r!=="compact-currency"))item.score+=70;
    if(roles.size>=2)item.score+=55;
    if(roles.has("total")&&item.repairs.some(r=>["exact-decimal","spaced-both-sides-decimal","fragmented-decimal-sequence","spaced-cents","damaged-final-five"].includes(r)))item.score+=180;
  }

  let ranked=[...scored.values()]
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);

  const paymentCandidate=ranked.find(item=>item.roles.includes("payment"));
  const exactTotalCandidate=ranked.find(item=>
    item.roles.includes("total") &&
    item.repairs.some(repair=>["exact-decimal","spaced-both-sides-decimal","fragmented-decimal-sequence"].includes(repair))
  );
  if(paymentCandidate&&exactTotalCandidate){
    const difference=Math.abs(paymentCandidate.value-exactTotalCandidate.value);
    // A labelled, two-decimal Total is stronger than a repaired payment token.
    if(paymentCandidate.repairs.every(r=>r==="compact-currency")){
      exactTotalCandidate.score+=340;
      paymentCandidate.score-=260;
    }else if(difference>0&&difference<=1){
      exactTotalCandidate.score+=260;
      paymentCandidate.score-=90;
    }
  }
  if(paymentCandidate){
    for(const item of ranked){
      if(item.roles.every(role=>role==="subtotal")&&
         Math.abs(item.value-paymentCandidate.value)>Math.max(1,paymentCandidate.value*.08)){
        item.score-=340;
      }
      // A tiny value created from the first digits of a much larger payment is implausible.
      if(item.value<paymentCandidate.value*.20&&!item.roles.includes("payment")){
        item.score-=180;
      }
    }
    ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
  }

  ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);

  // v7.4: semantic authority beats repetition. OCR often reads an item price
  // several times in overlapping crops, while the actual labelled Total may
  // appear only once. A plausible printed two-decimal value on a line explicitly
  // labelled Total is therefore authoritative and must not lose to repeated
  // unlabelled item amounts or savings values.
  const authoritativeTotal=ranked.find(item=>
    item.roles.includes("total") &&
    item.value>0 &&
    item.value<=5000 &&
    item.repairs.some(repair=>[
      "exact-decimal",
      "spaced-both-sides-decimal",
      "fragmented-decimal-sequence",
      "spaced-cents",
      "damaged-final-five"
    ].includes(repair))
  );

  if(authoritativeTotal){
    authoritativeTotal.score+=1200;
    ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
    return {value:authoritativeTotal.value,candidates:ranked.slice(0,10),trusted:true};
  }

  // v7.7: some Bunnings layouts print the word "Total" on the left and the
  // amount in a separate right-hand column. OCR can therefore preserve the
  // label but lose its amount association. When the same clear two-decimal
  // value is independently read as both SubTotal and card/EFT payment, and a
  // Total label is present anywhere in the totals area, that value is the
  // transaction total. Repeated OCR crops do not create this authority by
  // themselves; the distinct semantic roles do.
  const hasSeparatedTotalLabel=[channels.full,channels.totals,channels.totalsRight]
    .some(body=>ocrLines(body||"").some(line=>/^\s*(?:TOTAL|FOTAL|FOOTED)\s*[:.-]?\s*$/i.test(line)||/^\s*(?:TOTAL|FOTAL|FOOTED)\b/i.test(line)));
  const roleConsensusTotal=ranked.find(item=>{
    const roles=new Set(item.roles);
    const clearMoney=item.repairs.some(repair=>[
      "exact-decimal","spaced-both-sides-decimal","fragmented-decimal-sequence","spaced-cents","damaged-final-five"
    ].includes(repair));
    return hasSeparatedTotalLabel&&item.value>0&&item.value<=5000&&clearMoney&&
      roles.has("subtotal")&&roles.has("payment");
  });
  if(roleConsensusTotal){
    roleConsensusTotal.score+=1500;
    ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
    return {value:roleConsensusTotal.value,candidates:ranked.slice(0,10),trusted:true};
  }

  // v7.8: degraded Bunnings payment labels are often read as "ET", "FT",
  // "vA" or are lost entirely. When a separated Total label exists, a clear
  // SubTotal value repeated independently at least three times in the totals
  // area is accepted as the total. This is deliberately restricted to Bunnings
  // and requires both semantic subtotal evidence and repeated exact money OCR.
  const bunningsSubtotalConsensus=merchant==="Bunnings Warehouse"&&ranked.find(item=>{
    const clearMoney=item.repairs.some(repair=>[
      "exact-decimal","spaced-both-sides-decimal","fragmented-decimal-sequence","spaced-cents","damaged-final-five"
    ].includes(repair));
    const totalsAreaHits=item.sources.filter(source=>/^(?:totals-right|totals|full):/i.test(source)).length;
    return hasSeparatedTotalLabel&&item.value>0&&item.value<=5000&&clearMoney&&
      item.roles.includes("subtotal")&&item.count>=3&&totalsAreaHits>=3;
  });
  if(bunningsSubtotalConsensus){
    bunningsSubtotalConsensus.score+=1400;
    ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
    return {value:bunningsSubtotalConsensus.value,candidates:ranked.slice(0,10),trusted:true};
  }

  // v7.9: final degraded-layout recovery. Accept a clear Bunnings subtotal when
  // a damaged/separated Total label is present and the identical amount also
  // appears on a CARD NO/EFT/CREDIT tender row. This covers receipts where the
  // right-hand total column is lost by OCR but the tender amount survives.
  const bunningsTenderConsensus=merchant==="Bunnings Warehouse"&&ranked.find(item=>{
    const roles=new Set(item.roles);
    const clearMoney=item.repairs.some(repair=>[
      "exact-decimal","spaced-both-sides-decimal","fragmented-decimal-sequence","spaced-cents","damaged-final-five"
    ].includes(repair));
    return hasSeparatedTotalLabel&&item.value>0&&item.value<=5000&&clearMoney&&
      roles.has("subtotal")&&roles.has("payment");
  });
  if(bunningsTenderConsensus){
    bunningsTenderConsensus.score+=1700;
    ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
    return {value:bunningsTenderConsensus.value,candidates:ranked.slice(0,10),trusted:true};
  }

  // v8.0: tolerate a partially read tender amount. A common Bunnings failure is
  // SubTotal $136.55 plus CARD NO ... $136.5. The one-decimal tender is not the
  // final answer, but it is strong structural confirmation for the precise
  // subtotal. We allow at most six cents difference and require Total/GST-total
  // evidence in the same lower receipt area.
  if(merchant==="Bunnings Warehouse"&&(hasSeparatedTotalLabel||fuzzyIncludedTotalEvidence(combinedReceiptText(channels)))){
    const subtotalItems=ranked.filter(item=>item.roles.includes("subtotal")&&item.value>0&&item.value<=5000);
    const paymentItems=ranked.filter(item=>item.roles.includes("payment")&&item.value>0&&item.value<=5000);
    for(const subtotal of subtotalItems){
      const nearPayment=paymentItems.find(payment=>Math.abs(payment.value-subtotal.value)<=.06);
      if(nearPayment){
        subtotal.score+=1900;
        subtotal.sources.push(`v8-near-tender:${nearPayment.value.toFixed(2)}`);
        subtotal.roles.push("payment-near-match");
        ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
        return {value:subtotal.value,candidates:ranked.slice(0,10),trusted:true};
      }
    }
  }

  // v8.0: when the lower block clearly contains GST INCLUDED IN THE TOTAL, a
  // precise subtotal repeated in independent OCR passes can be promoted even if
  // the printed word Total is mangled beyond recognition. To avoid selecting an
  // item line, require at least two subtotal-role reads and ensure no individual
  // non-total candidate is larger.
  if(merchant==="Bunnings Warehouse"&&fuzzyIncludedTotalEvidence(combinedReceiptText(channels))){
    const fallbackSubtotal=ranked.find(item=>{
      const subtotalHits=item.roles.filter(role=>role==="subtotal").length;
      const clear=item.repairs.some(repair=>["exact-decimal","spaced-both-sides-decimal","fragmented-decimal-sequence","spaced-cents","damaged-final-five"].includes(repair));
      const largerItem=ranked.some(other=>other.value>item.value&&other.roles.every(role=>role==="other"));
      return subtotalHits>=2&&clear&&!largerItem;
    });
    if(fallbackSubtotal){
      fallbackSubtotal.score+=1450;
      ranked=ranked.sort((a,b)=>b.score-a.score||b.count-a.count||a.value-b.value);
      return {value:fallbackSubtotal.value,candidates:ranked.slice(0,10),trusted:true};
    }
  }

  const best=ranked[0];
  const second=ranked[1];
  const trusted=!!best &&
    best.score>=210 &&
    (
      best.roles.includes("payment") ||
      best.roles.includes("total") ||
      best.roles.includes("included-total")
    ) &&
    (!second||best.score>=second.score*1.04||best.count>=2);

  return {value:trusted?best.value:0,candidates:ranked.slice(0,10),trusted};
}

function splitOcrPasses(text){
  const sections={header:"",totals:"",full:""};
  const rx=/---\s*(HEADER|TOTALS|FULL)\s+PASS\s*---\s*([\s\S]*?)(?=---\s*(?:HEADER|TOTALS|FULL)\s+PASS\s*---|$)/gi;
  for(const match of text.matchAll(rx)){
    sections[match[1].toLowerCase()]+="\n"+match[2].trim();
  }
  return sections;
}
function dateCandidatesFromText(text,source,weight){
  const out=[];
  const cleaned=String(text||"")
    .replace(/[|Iil]/g,m=>m==="|"?"/":m)
    .replace(/\\/g,"/");

  // Standard Australian date, allowing OCR spaces or dots around separators.
  const australian=/\b([0-3]?\d)\s*[\/\-.]\s*([01]?\d)\s*[\/\-.]\s*((?:20)?\d{2})\b/g;
  for(const match of cleaned.matchAll(australian)){
    let year=Number(match[3]);
    if(year<100)year+=2000;
    // A common receipt OCR error is 2026 -> 2006. Repair only when the result is
    // implausibly old and its final digit agrees with the current year.
    const currentYear=new Date().getFullYear();
    if(year<=currentYear-10&&year%10===currentYear%10)year=currentYear;
    const value=isoAustralianDate(match[1],match[2],year);
    if(value)out.push({value,source,weight,raw:match[0]});
  }

  // Machine/footer date, also allowing spaces around separators.
  const footer=/\b(20\d{2})\s*[-\/]\s*(0?[1-9]|1[0-2])\s*[-\/]\s*(0?[1-9]|[12]\d|3[01])\b/g;
  for(const match of cleaned.matchAll(footer)){
    out.push({
      value:`${match[1]}-${String(match[2]).padStart(2,"0")}-${String(match[3]).padStart(2,"0")}`,
      source:`${source}-footer`,
      weight:weight+25,
      raw:match[0]
    });
  }
  return out;
}
function chooseReceiptDate(text){
  const passes=splitOcrPasses(text);
  const candidates=[
    ...dateCandidatesFromText(passes.full,"full",100),
    ...dateCandidatesFromText(passes.header,"header",45),
    ...dateCandidatesFromText(passes.totals,"totals",15),
    ...dateCandidatesFromText(text,"combined",30)
  ];
  const scores=new Map();
  for(const c of candidates)scores.set(c.value,(scores.get(c.value)||0)+c.weight);

  // Transfer support from likely OCR year errors when month/day match.
  const groups={};
  for(const c of candidates){
    const [year,month,day]=c.value.split("-");
    const key=`${month}-${day}`;
    (groups[key]||=[]).push({...c,year:Number(year)});
  }
  for(const group of Object.values(groups)){
    const newest=Math.max(...group.map(c=>c.year));
    const preferred=group.find(c=>c.year===newest)?.value;
    for(const c of group){
      if(preferred&&newest-c.year>=10){
        scores.set(preferred,(scores.get(preferred)||0)+Math.round(c.weight*.8));
      }
    }
  }

  const ranked=[...scores.entries()]
    .map(([value,score])=>({value,score}))
    .sort((a,b)=>b.score-a.score);
  return {value:ranked[0]?.value||"",candidates:ranked};
}
function invoiceCandidatesFromText(text,source,weight){
  return [...text.matchAll(/\b(\d{4}\/\d{7,8})\b/g)]
    .map(match=>({value:match[1],source,weight}));
}
function footerInvoiceHints(text){
  const hints=[];

  for(const match of text.matchAll(/\bR\d+\b[\s\S]{0,45}?([0-9]{3})[-\s]([0-9]{5})[-\s]([0-9]{4})[-\s](20\d{2})[-\s][0-9A-Z]{2}[-\s][0-9A-Z]{2}/gi)){
    hints.push({
      suffix:`${match[1]}${match[2]}`,
      store:match[3],
      invoice:`${match[3]}/${match[1]}${match[2]}`,
      confidence:96
    });
  }

  // Standard footer: #019-78347-2052-2026-07-07
  for(const match of text.matchAll(/[#H]?\s*([0-9]{3})[-\s]([0-9]{5})[-\s]([0-9]{4})[-\s](20\d{2})[-\s][0-9]{2}[-\s][0-9]{2}/gi)){
    hints.push({
      suffix:`${match[1]}${match[2]}`,
      store:match[3],
      invoice:`${match[3]}/${match[1]}${match[2]}`,
      confidence:100
    });
  }

  // OCR variant: H019-T8347-2052-2026-07-07, where T is a damaged 7.
  for(const match of text.matchAll(/[H#]?\s*([0-9]{3})[-\s][T7]([0-9]{4})[-\s]([0-9]{4})[-\s](20\d{2})[-\s][0-9A-Z]{2}[-\s][0-9A-Z]{2}/gi)){
    const suffix=`${match[1]}7${match[2]}`;
    hints.push({
      suffix,
      store:match[3],
      invoice:`${match[3]}/${suffix}`,
      confidence:92
    });
  }

  // v7.7: partial Bunnings footer recovery. The barcode line often preserves
  // #019-78347-2052 even when the following year/date is merged or damaged,
  // for example #019-78347-20522096 07-07. The first two groups are the
  // eight-digit invoice suffix and the third group is the four-digit store.
  for(const match of text.matchAll(/[#H§]\s*([0-9]{3})\s*[-–—]\s*([0-9]{5})\s*[-–—]\s*([0-9]{4})(?=\D|20\d{2}|\d{4})/gi)){
    hints.push({
      suffix:`${match[1]}${match[2]}`,
      store:match[3],
      invoice:`${match[3]}/${match[1]}${match[2]}`,
      confidence:98
    });
  }

  // Accept a lightly damaged prefix marker or spaces in place of the first hyphen.
  for(const match of text.matchAll(/(?:^|\s)[#H§]?\s*([0-9]{3})\s+([0-9]{5})\s*[-–—]\s*([0-9]{4})(?=\D|20\d{2}|\d{4})/gi)){
    hints.push({
      suffix:`${match[1]}${match[2]}`,
      store:match[3],
      invoice:`${match[3]}/${match[1]}${match[2]}`,
      confidence:88
    });
  }

  return hints;
}
function chooseReceiptNumber(text,merchant="",channels={}){
  if(merchant!=="Bunnings Warehouse"){
    return {value:extractReceiptNumber(text,merchant),candidates:[]};
  }

  const passes=splitOcrPasses(text);
  const isolated=buildReceiptChannels(text);
  const candidates=[
    ...invoiceCandidatesFromText(channels.footer||isolated.footer||"","footer-pass",190),
    ...invoiceCandidatesFromText(channels.date||"","focused-date",150),
    ...invoiceCandidatesFromText(channels.header||"","focused-header",110),
    ...invoiceCandidatesFromText(channels.full||"","focused-full",100),
    ...invoiceCandidatesFromText(passes.full,"full",100),
    ...invoiceCandidatesFromText(passes.header,"header",55),
    ...invoiceCandidatesFromText(passes.totals,"totals",15),
    ...invoiceCandidatesFromText(text,"combined",25)
  ];
  const hints=footerInvoiceHints(text);
  for(const hint of hints){
    candidates.push({value:hint.invoice,source:"footer",weight:160});
  }

  const scores=new Map();
  for(const candidate of candidates){
    let score=candidate.weight;
    const [store,number]=candidate.value.split("/");
    // v8.0: the native Bunnings format is exactly ####/########. A seven-digit
    // suffix is an incomplete OCR fragment and must not win a tie against a
    // complete candidate from a focused pass.
    if(/^\d{4}\/\d{8}$/.test(candidate.value))score+=320;
    else if(/^\d{4}\/\d{7}$/.test(candidate.value))score-=140;
    if(candidate.source==="focused-date")score+=80;
    if(candidate.source==="footer-pass")score+=100;

    for(const hint of hints){
      // v7.4: the encoded footer reference is more reliable than repeated
      // damaged readings of the small Invoice Number line.
      if(candidate.value===hint.invoice)score+=hint.confidence>=90?1800:900;
      if(store===hint.store)score+=45;

      const tail=number.slice(-hint.suffix.length);
      if(tail===hint.suffix)score+=120;
      else{
        let distance=0;
        for(let i=0;i<Math.min(tail.length,hint.suffix.length);i++){
          if(tail[i]!==hint.suffix[i])distance++;
        }
        if(distance===1)score+=35;
        if(distance>=3)score-=40;
      }
    }

    scores.set(candidate.value,(scores.get(candidate.value)||0)+score);
  }

  const ranked=[...scores.entries()]
    .map(([value,score])=>({value,score}))
    .sort((a,b)=>b.score-a.score);

  return {value:ranked[0]?.value||"",candidates:ranked};
}
function gstCandidatesFromText(text,channels={}){
  const sources=[
    ["gst-right",channels.gst||"",210],
    ["totals-right",channels.totalsRight||"",165],
    ["full",channels.full||text,100],
    ["totals",channels.totals||"",80],
    ["combined",text,20]
  ];
  const out=[];

  for(const [source,body,weight] of sources){
    const lines=ocrLines(body);
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      const next=lines[i+1]||"";
      const gstContext=/\bGST\b|\bBST\b|\[ST\b|INCLUDED\s+IN\s+THE\s+TOTAL|THE\s+TOTAL/i.test(line);
      if(!gstContext)continue;

      for(const candidate of currencyCandidates(line,{labelled:true})){
        out.push({value:candidate.value,source,weight:weight+candidate.quality,repair:candidate.reason,printed:true});
      }
      for(const candidate of currencyCandidates(next,{labelled:true})){
        out.push({value:candidate.value,source,weight:weight-20+candidate.quality,repair:candidate.reason,printed:true});
      }
    }
  }

  // v8.0: OCR can shift the lower Bunnings rows so the GST amount appears on a
  // line labelled EFT, while the actual tender amount is on the following CARD
  // row. Capture up to two lines after a GST-included label as contextual GST
  // candidates; mathematical validation in chooseGst decides which one is sane.
  for(const [source,body,weight] of sources){
    const lines=ocrLines(body);
    for(let i=0;i<lines.length;i++){
      if(!fuzzyIncludedTotalEvidence(lines[i]))continue;
      for(let offset=1;offset<=2;offset++){
        const nearby=lines[i+offset]||"";
        for(const candidate of currencyCandidates(nearby,{labelled:true})){
          out.push({value:candidate.value,source:`${source}-shifted-row`,weight:weight+80-offset*15+candidate.quality,repair:candidate.reason,printed:true});
        }
      }
    }
  }
  return out;
}
function repairedGstCandidates(text,channels,expected){
  if(!expected)return [];
  const bodies=[channels.full||text,channels.totals||"",channels.totalsRight||"",channels.gst||""];
  const out=[];
  for(const body of bodies){
    const lines=ocrLines(body);
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      if(!(/GST|[BG8]ST|INCLUDED\s+IN\s+THE\s+TOTAL|THE\s+TOTAL/i.test(line)))continue;
      const tokens=line.match(/[$£€¥]?\s*[0-9OISB]{2,4}(?:\s*[.,]\s*[0-9OISB]{1,2})/gi)||[];
      for(const token of tokens){
        const cleaned=token.toUpperCase().replace(/[O]/g,'0').replace(/[IS]/g,'1').replace(/B/g,'8').replace(/[^0-9.,]/g,'').replace(',','.');
        const parts=cleaned.split('.');
        if(parts.length!==2)continue;
        const whole=parts[0], cents=(parts[1]+'0').slice(0,2);
        if(whole.length<3)continue;
        for(let d=0;d<whole.length;d++){
          const repairedWhole=whole.slice(0,d)+whole.slice(d+1);
          if(!repairedWhole)continue;
          const value=Number(repairedWhole+'.'+cents);
          if(value>0&&Math.abs(value-expected)<=.12){
            out.push({value,source:'gst-digit-repair',weight:360,repair:'remove-extra-gst-digit',printed:true});
          }
        }
      }
    }
  }
  return out;
}
function chooseGst(text,total,channels={}){
  const expected=total>0?Number((total/11).toFixed(2)):0;
  const candidates=[...gstCandidatesFromText(text,channels),...repairedGstCandidates(text,channels,expected)]
    .filter(candidate=>candidate.value>0&&candidate.value<total*.20&&Math.abs(candidate.value-total)>.01);
  const scores=new Map();

  for(const candidate of candidates){
    let score=candidate.weight;
    const difference=Math.abs(candidate.value-expected);

    if(candidate.source==="gst-digit-repair")score+=220;
    else if(candidate.source==="gst-right")score+=180;
    else if(candidate.source==="totals-right")score+=120;

    if(difference<=.03)score+=180;
    else if(difference<=.08)score+=100;
    else if(difference<=.15)score+=25;
    else if(difference<=1.00)score-=140;
    else score-=260;

    const key=candidate.value.toFixed(2);
    scores.set(key,(scores.get(key)||0)+score);
  }

  if(total>0&&fuzzyIncludedTotalEvidence(text)){
    scores.set(expected.toFixed(2),(scores.get(expected.toFixed(2))||0)+260);
  }

  const ranked=[...scores.entries()]
    .map(([value,score])=>({value:Number(value),score}))
    .sort((a,b)=>b.score-a.score);

  let best=ranked[0];
  // A damaged printed GST must not override the mathematically consistent GST
  // unless it is within 15 cents of Total/11.
  if(best&&Math.abs(best.value-expected)>.15&&fuzzyIncludedTotalEvidence(text)){
    best={value:expected,score:scores.get(expected.toFixed(2))||260};
  }
  return {
    value:best&&best.value<total*.20?best.value:0,
    candidates:ranked,
    expected
  };
}


function normaliseDateOcrText(text){
  return String(text||"")
    .replace(/[OQ]/g,"0")
    .replace(/[Il|]/g,"1")
    .replace(/\bPH\b/gi,"PM")
    .replace(/[^\w\/:\-\s]/g," ")
    .replace(/\s+/g," ")
    .trim();
}
function recoverDateCandidates(channels){
  const sources=[
    ["date",channels.date||"",130],
    ["full",channels.full||"",95],
    ["header",channels.header||"",50],
    ["totals",channels.totals||"",15]
  ];
  const out=[];
  for(const [source,raw,weight] of sources){
    const text=normaliseDateOcrText(raw);

    for(const match of text.matchAll(/\b([0-3]?\d)\s*[\/\-.]\s*([01]?\d)\s*[\/\-.]\s*(20\d{2}|\d{2})\b/g)){
      let year=Number(match[3]);
      if(year<100)year+=2000;
      const currentYear=new Date().getFullYear();
      if(year<=currentYear-10&&year%10===currentYear%10)year=currentYear;
      const value=isoAustralianDate(match[1],match[2],year);
      if(value)out.push({value,source,weight,raw:match[0]});
    }

    for(const match of text.matchAll(/\b(20\d{2})\s*[\/\-]\s*(0?[1-9]|1[0-2])\s*[\/\-]\s*(0?[1-9]|[12]\d|3[01])\b/g)){
      out.push({
        value:`${match[1]}-${String(match[2]).padStart(2,"0")}-${String(match[3]).padStart(2,"0")}`,
        source:`${source}-footer`,
        weight:weight+25,
        raw:match[0]
      });
    }

    // Repair separated date tokens such as "10 07 2026".
    for(const match of text.matchAll(/\b([0-3]?\d)\s+([01]?\d)\s+(20\d{2})\b/g)){
      const value=isoAustralianDate(match[1],match[2],match[3]);
      if(value)out.push({value,source,weight:weight-15,raw:match[0]});
    }

    // Repair badly segmented patterns such as "T0/00 2026" only when footer evidence
    // can provide the missing month/day.
  }

  // Footer/barcode fragments in Bunnings commonly end with YYYY-MM-DD.
  const combined=combinedReceiptText(channels);
  for(const match of combined.matchAll(/(?:#|R\d+\s+P\d+.*?)(20\d{2})[-\/](0?[1-9]|1[0-2])[-\/](0?[1-9]|[12]\d|3[01])/g)){
    out.push({
      value:`${match[1]}-${String(match[2]).padStart(2,"0")}-${String(match[3]).padStart(2,"0")}`,
      source:"footer-reference",
      weight:170,
      raw:match[0]
    });
  }

  return out;
}

const weekdayMap={SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6};
function weekdayFromContext(text,raw){
  const index=String(text||"").indexOf(raw||"");
  const context=String(text||"").slice(Math.max(0,index-12),index+String(raw||"").length+4).toUpperCase();
  const match=context.match(/\b(SUN|MON|TUE|WED|THU|FRI|SAT)\b/);
  return match?weekdayMap[match[1]]:null;
}
function dateMatchesWeekday(iso,weekday){
  if(weekday===null||weekday===undefined)return true;
  const [year,month,day]=iso.split("-").map(Number);
  return new Date(Date.UTC(year,month-1,day)).getUTCDay()===weekday;
}
function repairDateYearByWeekday(candidate,channels){
  const weekday=weekdayFromContext(combinedReceiptText(channels),candidate.raw);
  if(weekday===null||dateMatchesWeekday(candidate.value,weekday))return candidate.value;
  const [year,month,day]=candidate.value.split("-").map(Number);
  const currentYear=new Date().getFullYear();
  const possible=[];
  for(let y=Math.max(2000,currentYear-3);y<=currentYear;y++){
    const iso=`${y}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    if(dateMatchesWeekday(iso,weekday))possible.push(iso);
  }
  if(possible.length===1)return possible[0];
  const sameEnding=possible.find(iso=>iso.slice(2,4)===String(year).slice(-2));
  return sameEnding||candidate.value;
}

function chooseRecoveredDate(channels){
  const candidates=recoverDateCandidates(channels);
  const scores=new Map();
  const now=new Date();
  const currentYear=now.getFullYear();
  const todayIso=`${currentYear}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  for(const candidate of candidates){
    const repairedValue=repairDateYearByWeekday(candidate,channels);
    const year=Number(repairedValue.slice(0,4));
    let weight=candidate.weight;
    const weekday=weekdayFromContext(combinedReceiptText(channels),candidate.raw);
    if(weekday!==null&&!dateMatchesWeekday(candidate.value,weekday)){
      weight-=80;
      if(repairedValue!==candidate.value)weight+=145;
    }

    // Reject impossible future years. Same-year future dates are allowed only within 7 days.
    if(year>currentYear)continue;
    if(repairedValue>todayIso){
      const candidateDate=new Date(`${repairedValue}T00:00:00`);
      const todayDate=new Date(`${todayIso}T00:00:00`);
      const days=(candidateDate-todayDate)/86400000;
      if(days>7)continue;
      weight-=45;
    }

    // Two-digit/truncated OCR years are substantially weaker than a clear four-digit year.
    if(candidate.raw&&/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2}\b/.test(candidate.raw)){
      weight-=70;
    }

    // Full receipt evidence is more reliable than a conflicting low-confidence date strip.
    if(candidate.source==="full")weight+=35;
    if(candidate.source==="date"&&year<currentYear-2)weight-=35;

    scores.set(repairedValue,(scores.get(repairedValue)||0)+Math.max(1,weight));
  }

  const groups={};
  for(const candidate of candidates){
    const [year,month,day]=candidate.value.split("-");
    const key=`${month}-${day}`;
    (groups[key]||=[]).push({...candidate,year:Number(year)});
  }

  for(const group of Object.values(groups)){
    const plausible=group.filter(item=>item.year<=currentYear);
    if(!plausible.length)continue;
    const sourcePreferred=plausible.find(item=>item.source==="full");
    const preferred=sourcePreferred||plausible.sort((a,b)=>b.year-a.year)[0];
    if(!preferred)continue;
    for(const item of plausible){
      if(preferred.year-item.year>=10){
        scores.set(preferred.value,(scores.get(preferred.value)||0)+Math.round(item.weight*.5));
      }
    }
  }

  const ranked=[...scores.entries()]
    .map(([value,score])=>({value,score}))
    .sort((a,b)=>b.score-a.score);

  return {value:ranked[0]?.value||"",candidates:ranked,rawCandidates:candidates};
}

function reconstructBunningsInvoice(text){
  const body=String(text||"");
  // v7.7 safety: only reconstruct from an Invoice Number-labelled context.
  // Never use arbitrary 12/13-digit runs because Bunnings product barcodes
  // (for example 9320090113802) look like invoice numbers after truncation.
  const labelled=[];
  for(const match of body.matchAll(/(?:invoice|invnice|invaice|number\s+details|details)[^\n\r]{0,45}/gi)){
    labelled.push(match[0]);
  }

  for(const fragment of labelled){
    const digits=fragment.replace(/\D/g,"");
    // A labelled line may contain the 12-digit store+invoice identifier.
    for(let i=0;i<=digits.length-12;i++){
      const run=digits.slice(i,i+12);
      if(/^\d{12}$/.test(run))return `${run.slice(0,4)}/${run.slice(4)}`;
    }
    // OCR sometimes inserts one extra digit. Remove only around the join.
    for(let i=0;i<=digits.length-13;i++){
      const run=digits.slice(i,i+13);
      for(let removeAt=4;removeAt<=6;removeAt++){
        const repaired=run.slice(0,removeAt)+run.slice(removeAt+1);
        if(/^\d{12}$/.test(repaired))return `${repaired.slice(0,4)}/${repaired.slice(4)}`;
      }
    }
  }
  return "";
}

function recoverPartialAustralianDate(channels){
  const all=[channels.date,channels.full,channels.header].filter(Boolean).join("\n");
  const footer=extractFooterDate(combinedReceiptText(channels));

  // Common OCR loss: first day digit disappears, e.g. "0/07/2026".
  for(const match of all.matchAll(/\b([0-9])[\/-]([01]\d)[\/-](20\d{2})\b/g)){
    if(footer){
      const [fy,fm,fd]=footer.split("-").map(Number);
      if(Number(match[2])===fm&&Number(match[3])===fy&&String(fd).endsWith(match[1])){
        return footer;
      }
    }
  }

  // If the full OCR contains month/year and the footer contains the complete date,
  // use the footer only when the year/month agree.
  const monthYear=all.match(/\b(?:[0-3]?\d[\/-])?([01]\d)[\/-](20\d{2})\b/);
  if(monthYear&&footer){
    const [fy,fm]=footer.split("-").map(Number);
    if(Number(monthYear[1])===fm&&Number(monthYear[2])===fy)return footer;
  }
  return "";
}
function fuzzyIncludedTotalEvidence(text){
  const compact=upper(text).replace(/[^A-Z]/g,"");
  return (
    compact.includes("GSTINCLUDEDINTHETOTAL") ||
    compact.includes("GSTTHCLUDEDINTHETOTAL") ||
    compact.includes("INCLUDEDINTHEYOTAL") ||
    compact.includes("LHCLUDEDINHEYOTAI") ||
    compact.includes("LHCLUDEDIRHEYOTAI") ||
    compact.includes("THCLUDEDINTHETOTAL") ||
    compact.includes("USTTHLLUUEDTHHKTUTHL") ||
    compact.includes("INCLUDEDIRHEYOTAI") ||
    compact.includes("GSTINCLUCEDJHTHETOTAL") ||
    compact.includes("GSTINCLUOEDJNT HETOTAL".replace(/ /g,"")) ||
    compact.includes("WSUTHUBBEFUKTUVA")
  );
}

function parseReceiptChannels(input){
  const channels=buildReceiptChannels(input);
  const text=combinedReceiptText(channels);
  const lines=ocrLines(text);
  const merchantInfo=detectMerchantAcrossChannels(channels);
  const dateChoice=chooseRecoveredDate(channels);
  const dateTime=extractReceiptDateTime(text);

  const totalChoice=safeReceiptTotal(channels,merchantInfo.merchant);
  const receiptChoice=chooseReceiptNumber(text,merchantInfo.merchant,channels);
  if(!receiptChoice.value&&merchantInfo.merchant==="Bunnings Warehouse"){
    const reconstructed=reconstructBunningsInvoice(text);
    if(reconstructed){
      receiptChoice.value=reconstructed;
      receiptChoice.candidates=[{value:reconstructed,score:72,source:"digit-reconstruction"}];
    }
  }
  if(!dateChoice.value){
    const partial=recoverPartialAustralianDate(channels);
    if(partial){
      dateChoice.value=partial;
      dateChoice.candidates=[{value:partial,score:80,source:"partial-plus-footer"}];
    }
  }
  const gstChoice=totalChoice.trusted?chooseGst(text,totalChoice.value,channels):{value:0,candidates:[],expected:0};

  const base={
    merchant:merchantInfo.merchant||"",
    branch:"",
    category:merchantInfo.category||"",
    subcategory:merchantInfo.subcategory||"",
    date:dateChoice.value||dateTime.date,
    time:dateTime.time,
    total:totalChoice.value,
    gst:gstChoice.value,
    receiptNumber:receiptChoice.value||"",
    paymentMethod:detectReceiptPaymentMethod(text),
    parser:merchantInfo.parser==="bunnings"?"Bunnings":"Generic",
    merchantProfile:merchantInfo.id||"generic",
    amountCandidates:totalChoice.candidates,
    dateCandidates:dateChoice.candidates,
    rawDateCandidates:dateChoice.rawCandidates,
    receiptNumberCandidates:receiptChoice.candidates,
    gstCandidates:gstChoice.candidates,
    expectedGst:gstChoice.expected,
    totalTrusted:totalChoice.trusted
  };

  if(merchantInfo.parser==="bunnings"){
    base.branch=firstCaptured(text,[
      /\b(MIRRABOOKA|O['’]?CONNOR|CANNINGTON|BALCATTA|MIDLAND|ARMADALE|MORLEY|JOONDALUP)\b/i
    ]);
  }

  base.confidence=receiptFieldConfidence(base,text);
  if(base.confidence){
    if(!base.totalTrusted)base.confidence.fields.total=0;
    if(!base.receiptNumber)base.confidence.fields.receiptNumber=0;
    if(!base.date)base.confidence.fields.date=0;
    if(!base.gst)base.confidence.fields.gst=0;
    const vals=Object.values(base.confidence.fields).filter(Boolean);
    base.confidence.overall=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
  }
  base.imageQuality=receiptImageQuality(text);
  return base;
}

function parseAustralianReceipt(rawText){
  if(rawText&&typeof rawText==="object")return parseReceiptChannels(rawText);
  const text=normaliseOcrText(rawText);
  const lines=ocrLines(text);
  const merchantInfo=detectKnownMerchant(text,lines);
  const dateTime=extractReceiptDateTime(text);
  const dateChoice=chooseReceiptDate(text);
  const base={
    merchant:merchantInfo.merchant,
    branch:"",
    category:merchantInfo.category,
    subcategory:merchantInfo.subcategory,
    date:dateChoice.value||dateTime.date,
    time:dateTime.time,
    total:0,
    gst:0,
    receiptNumber:"",
    paymentMethod:"",
    parser:"Generic"
  };

  let parsed=runMerchantParser(merchantInfo,text,base);
  const receiptChoice=chooseReceiptNumber(text,base.merchant);
  const gstChoice=chooseGst(text,parsed.total);
  parsed.date=base.date;
  parsed.receiptNumber=receiptChoice.value||parsed.receiptNumber;
  parsed.gst=gstChoice.value||parsed.gst;
  parsed.dateCandidates=dateChoice.candidates;
  parsed.receiptNumberCandidates=receiptChoice.candidates;
  parsed.gstCandidates=gstChoice.candidates;
  parsed.expectedGst=gstChoice.expected;
  parsed.merchantProfile=merchantInfo.id||"generic";

  parsed.confidence=receiptFieldConfidence(parsed,text);
  if(parsed.confidence){
    if(parsed.dateCandidates?.length>1&&parsed.dateCandidates[0].score<parsed.dateCandidates[1].score*1.35){
      parsed.confidence.fields.date=Math.min(parsed.confidence.fields.date,72);
    }
    if(parsed.receiptNumberCandidates?.length>1&&parsed.receiptNumberCandidates[0].score<parsed.receiptNumberCandidates[1].score*1.35){
      parsed.confidence.fields.receiptNumber=Math.min(parsed.confidence.fields.receiptNumber,74);
    }
    if(parsed.gstCandidates?.length>1&&parsed.gstCandidates[0].score<parsed.gstCandidates[1].score*1.35){
      parsed.confidence.fields.gst=Math.min(parsed.confidence.fields.gst,74);
    }
    const values=Object.values(parsed.confidence.fields).filter(Boolean);
    parsed.confidence.overall=values.length?Math.round(values.reduce((a,b)=>a+b,0)/values.length):0;
  }
  parsed.imageQuality=receiptImageQuality(text);
  return parsed;
}


function shouldAutofillField(confidence,minimum=70){
  return Number(confidence||0)>=minimum;
}

runOcrBtn.onclick=async()=>{
  if(!pendingReceiptPages.length)return alert("Scan or import at least one receipt section first.");
  if(!window.Tesseract)return alert("Quick receipt scan is unavailable while offline. Enter the details manually instead.");
  const reviewBanner=document.getElementById("receiptReviewBanner");
  const fieldMap={
    merchant:receiptMerchant,
    date:receiptDate,
    total:receiptAmount,
    gst:receiptGst,
    receiptNumber:receiptNumber,
    paymentMethod:receiptPaymentMethod
  };
  const setReviewState=(field,confidence,hasValue)=>{
    const input=fieldMap[field];
    if(!input)return;
    const label=input.closest("label");
    if(!label)return;
    label.classList.remove("scan-field-good","scan-field-check");
    if(hasValue&&Number(confidence||0)>=85)label.classList.add("scan-field-good");
    else label.classList.add("scan-field-check");
  };
  try{
    receiptPreview.parentElement.classList.add("scanning");
    runOcrBtn.disabled=true;
    ocrStatus.textContent="Quick scan…";
    reviewBanner?.classList.add("hidden");
    Object.values(fieldMap).forEach(input=>input?.closest("label")?.classList.remove("scan-field-good","scan-field-check"));

    let combined="";
    const sectionReports=[];
    for(let i=0;i<pendingReceiptPages.length;i++){
      const section=i+1;
      ocrStatus.textContent=`Quick scan ${section}/${pendingReceiptPages.length}`;
      const processed=await processScanPage(pendingReceiptPages[i].original,pendingReceiptPages[i].rotation||0);
      const geometry=await detectReceiptGeometry(processed);
      const report=await recogniseScanPass(geometry.source,"quick-full",section,m=>{
        if(m.status==="recognizing text")ocrStatus.textContent=`Quick scan ${Math.round(m.progress*100)}%`;
      });
      report.geometry={detected:geometry.detected,confidence:geometry.confidence,bounds:geometry.bounds};
      report.engine="Tesseract quick scan";
      sectionReports.push(report);
      combined+=`${combined?"\n\n":""}--- SECTION ${section} QUICK PASS ---\n${report.text}`;
    }

    const quickText=sectionReports.map(r=>r.text).join("\n");
    const channels={header:quickText,totals:quickText,full:quickText,date:quickText,footer:quickText,gst:quickText,totalsRight:quickText};
    const parsed=parseReceiptChannels(channels);
    const ocrAverage=Math.round(sectionReports.reduce((sum,r)=>sum+Number(r.confidence||0),0)/Math.max(1,sectionReports.length));
    parsed.ocrConfidence=ocrAverage;
    if(parsed.confidence){
      parsed.confidence.parserOverall=parsed.confidence.overall;
      parsed.confidence.overall=Math.round(ocrAverage*.45+parsed.confidence.overall*.55);
    }
    const fc=parsed.confidence?.fields||{};

    // A quick scan is an assistant, not an authority. Prefill any plausible result,
    // then clearly mark every field that needs a human glance.
    if(parsed.merchant)receiptMerchant.value=parsed.merchant;
    if(parsed.date)receiptDate.value=parsed.date;
    if(parsed.total>0)receiptAmount.value=parsed.total.toFixed(2);
    if(parsed.receiptNumber)receiptNumber.value=parsed.receiptNumber;
    if(parsed.gst>0)receiptGst.value=parsed.gst.toFixed(2);
    if(parsed.paymentMethod)receiptPaymentMethod.value=parsed.paymentMethod;
    if(parsed.category)fillCategorySelect(receiptCategory,receiptSubcategory,parsed.category,parsed.subcategory||"");

    setReviewState("merchant",fc.merchant,!!receiptMerchant.value);
    setReviewState("date",fc.date,!!receiptDate.value);
    setReviewState("total",fc.total,Number(receiptAmount.value)>0);
    setReviewState("gst",fc.gst,Number(receiptGst.value)>0);
    setReviewState("receiptNumber",fc.receiptNumber,!!receiptNumber.value);
    setReviewState("paymentMethod",fc.paymentMethod,!!receiptPaymentMethod.value);

    const notes=[
      `Quick-scanned from ${pendingReceiptPages.length} section${pendingReceiptPages.length===1?"":"s"}.`,
      parsed.time?`Receipt time: ${parsed.time}.`:"",
      `OCR confidence: ${ocrAverage}%.`,
      "Please verify all receipt details before saving."
    ].filter(Boolean).join(" ");
    receiptNotes.value=(receiptNotes.value?receiptNotes.value+"\n":"")+notes;
    if(reviewBanner){
      reviewBanner.innerHTML=`<strong>Please check the details before saving.</strong><span>${(parsed.confidence?.overall||0)>=80?"The quick scan filled the likely values. Amber fields need extra attention.":"The photo was difficult to read. Correct any missing or inaccurate fields manually."}</span>`;
      reviewBanner.classList.remove("hidden");
    }
    ocrStatus.textContent="Quick scan complete — please check";
    setTimeout(()=>receiptMerchant.focus(),50);
  }catch(err){
    console.error(err);
    ocrStatus.textContent="Enter details manually";
    if(reviewBanner){
      reviewBanner.innerHTML="<strong>Quick scan could not read this receipt.</strong><span>Please enter or correct the details manually. You can still save the receipt normally.</span>";
      reviewBanner.classList.remove("hidden");
    }
  }finally{
    runOcrBtn.disabled=false;
    receiptPreview.parentElement.classList.remove("scanning");
  }
};

saveReceiptBtn.onclick=e=>{e.preventDefault();const receipt={id:crypto.randomUUID?crypto.randomUUID():`r-${Date.now()}`,merchant:norm(receiptMerchant.value),date:receiptDate.value,amount:Number(receiptAmount.value),category:receiptCategory.value||'Uncategorised',subcategory:receiptSubcategory.value,asset:receiptAsset.value,account:norm(receiptAccount.value),paymentMethod:receiptPaymentMethod.value,receiptNumber:norm(receiptNumber.value),gst:Number(receiptGst.value)||0,notes:receiptNotes.value,image:pendingReceiptImage,createdAt:new Date().toISOString(),status:receiptPaymentMethod.value==='Cash'?'cash':'awaiting'};if(!receipt.merchant||!receipt.date||!receipt.amount)return;const fingerprint=receiptFingerprint(receipt);if(state.receipts.some(r=>receiptFingerprint(r)===fingerprint))return alert('This receipt appears to have already been saved.');state.receipts.unshift(receipt);state.transactions.push(applyRule({date:receipt.date,description:receipt.merchant,merchant:receipt.merchant,amount:-Math.abs(receipt.amount),source:'Receipt',receiptId:receipt.id,reconciliationStatus:receipt.status,account:receipt.account,category:receipt.category,subcategory:receipt.subcategory,asset:receipt.asset||"",notes:receipt.notes,taxDeductible:false}));saveState();receiptDialog.close();pendingReceiptImage='';pendingReceiptPages=[];rebuildReviewQueue();renderAll();showNotice('Receipt saved. BalanceIQ will look for the matching bank transaction on future imports.')};
addTransactionBtn.onclick=()=>openTransaction();quickAddTransactionBtn.onclick=()=>openTransaction();startManualBtn.onclick=()=>openTransaction();saveTransactionBtn.onclick=e=>{e.preventDefault();const t={date:txDate.value,amount:+txAmount.value,description:txDescription.value,category:txCategory.value,subcategory:txSubcategory.value,asset:txAsset.value,taxDeductible:txTax.value==="true",tag:txTag.value,notes:txNotes.value,reviewed:true,auto:false,source:"Manual"};const i=txIndex.value;if(i==="")state.transactions.push(t);else state.transactions[+i]={...state.transactions[+i],...t};rebuildReviewQueue();saveState();transactionDialog.close();renderAll()};
addRuleBtn.onclick=()=>{ruleForm.reset();fillCategorySelect(ruleCategory,ruleSubcategory,"Uncategorised","Review Required");fillAssetSelect(ruleAsset,"");ruleDialog.showModal()};saveRuleBtn.onclick=e=>{e.preventDefault();state.rules.unshift({pattern:upper(rulePattern.value),category:ruleCategory.value,subcategory:ruleSubcategory.value,asset:ruleAsset.value});ruleForm.reset();ruleDialog.close();saveState();renderAll()};
addAssetBtn.onclick=()=>{const a=norm(newAssetName.value);if(!a)return;const existing=state.assets.find(x=>upper(x)===upper(a));if(existing)return alert("That asset already exists.");state.assets.push(a);state.assets.sort((x,y)=>x.localeCompare(y));newAssetName.value="";saveState();renderAll();showNotice(`Added asset ${a}.`)};
exportBtn.onclick=()=>{const a=document.createElement("a"),blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});a.href=URL.createObjectURL(blob);a.download=`balanceiq-backup-${localDateValue()}.json`;a.click();URL.revokeObjectURL(a.href)};
exportCsvBtn.onclick=()=>{const cols=["date","description","amount","category","subcategory","asset","taxDeductible","tag","notes"],lines=[cols.join(",")];for(const t of state.transactions)lines.push(cols.map(c=>`"${String(t[c]??"").replaceAll('"','""')}"`).join(","));const a=document.createElement("a"),blob=new Blob([lines.join("\n")],{type:"text/csv"});a.href=URL.createObjectURL(blob);a.download="finance-transactions.csv";a.click();URL.revokeObjectURL(a.href)};
backupInput.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{state=JSON.parse(await f.text());state.categoryDefinitions=normaliseCategoryDefinitions(state.categoryDefinitions);state.transactions||=[];state.receipts||=[];state.rules||=[];state.reviewQueue||=[];state.assets||=[];saveState();renderAll();showNotice("Backup restored.")}catch{alert("Could not read backup.")}e.target.value=""};
clearBtn.onclick=()=>{if(confirm("Delete all local finance data?")){state={transactions:[],receipts:[],rules:[],reviewQueue:[],assets:[],categoryDefinitions:freshCategoryDefinitions(),theme:state.theme,currency:state.currency||"AUD",usageMode:state.usageMode||"personal",onboardingComplete:true};saveState();renderAll()}};
usageMode.value=state.usageMode||"personal";
currencySetting.value=state.currency||"AUD";
savePreferencesBtn.onclick=()=>{state.usageMode=usageMode.value;state.currency=currencySetting.value;saveState();renderAll();showNotice("Preferences saved.")};
loadSampleDataBtn.onclick=()=>{
  if(demoDataLoaded())return updateDemoDataStatus();
  if(!confirm("Load Demo Data?\n\nThis will add sample accounts, merchant rules and transactions. Your existing data will not be replaced."))return;
  const before=state.transactions.length;
  const added=addDemoData();
  rebuildReviewQueue();
  if(!saveState()){
    state.transactions.splice(before);
    rebuildReviewQueue();
    updateDemoDataStatus("<strong>Demo data could not be saved.</strong><br>Your browser may be out of storage. Remove large receipt images or clear some site data, then try again.");
    return;
  }
  const stored=state.transactions.filter(t=>t.demo===true||t.source==="Demo"||t.source==="Sample");
  if(!stored.length){
    updateDemoDataStatus("<strong>Demo data was not added.</strong><br>No sample transactions were found after saving. Please reload the app and try again.");
    return;
  }
  if(dashFrom)dashFrom.value="";
  if(dashTo)dashTo.value="";
  renderAll();
  updateDemoDataStatus(`<strong>Demo data loaded successfully.</strong><br>Added ${added.assets} sample accounts, ${added.rules} merchant rules and ${stored.length} transactions. Total demo income is ${money(stored.filter(t=>t.amount>0).reduce((sum,t)=>sum+t.amount,0))}; total demo expenses are ${money(stored.filter(t=>t.amount<0).reduce((sum,t)=>sum+Math.abs(t.amount),0))}.`);
  revealDemoDashboard();
  showNotice(`Demo data loaded: ${stored.length} transactions are now included in the dashboard.`);
};
document.getElementById("removeDemoDataBtn")?.addEventListener("click",()=>{
  if(!confirm("Remove all demo transactions and demo merchant rules? Your own data will stay in place."))return;
  state.transactions=state.transactions.filter(t=>t.demo!==true&&t.source!=="Demo"&&t.source!=="Sample");
  state.rules=state.rules.filter(rule=>!rule.demo);
  saveState();renderAll();updateDemoDataStatus("<strong>Demo data removed.</strong><br>Your own transactions, assets and settings were not changed.");
});
function openSetup(){onboardingUsage.value=state.usageMode||"personal";onboardingCurrency.value=state.currency||"AUD";onboardingTheme.value=state.theme||"light";onboardingAsset.value="";onboardingSample.checked=false;onboardingDialog.showModal()}
runSetupBtn.onclick=openSetup;
finishOnboardingBtn.onclick=()=>{state.usageMode=onboardingUsage.value;state.currency=onboardingCurrency.value;state.theme=onboardingTheme.value;const asset=norm(onboardingAsset.value);if(asset&&!state.assets.includes(asset))state.assets.push(asset);if(onboardingSample.checked&&!demoDataLoaded())addDemoData();state.onboardingComplete=true;document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";updateGreeting();usageMode.value=state.usageMode;currencySetting.value=state.currency;saveState();onboardingDialog.close();renderAll()};
themeBtn.onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";updateGreeting();saveState();drawCashflow()};

const storageStatus=document.getElementById('storageStatus');
const storageUsage=document.getElementById('storageUsage');
const storageLastSaved=document.getElementById('storageLastSaved');
const storageSnapshotStatus=document.getElementById('storageSnapshotStatus');
const downloadBackupBtn=document.getElementById('downloadBackupBtn');
const requestPersistentStorageBtn=document.getElementById('requestPersistentStorageBtn');
const createSnapshotBtn=document.getElementById('createSnapshotBtn');
const restoreSnapshotBtn=document.getElementById('restoreSnapshotBtn');
const autoBackupEnabled=document.getElementById('autoBackupEnabled');
const autoBackupFrequency=document.getElementById('autoBackupFrequency');
const autoBackupRetention=document.getElementById('autoBackupRetention');
function formatBytes(bytes){if(!Number.isFinite(bytes))return 'Unavailable';const units=['B','KB','MB','GB'];let value=bytes,i=0;while(value>=1024&&i<units.length-1){value/=1024;i++}return `${value.toFixed(i?1:0)} ${units[i]}`}
async function updateStoragePanel(error=null){
  if(!storageStatus)return;
  storageStatus.textContent=error?'Fallback storage active':deviceStorageReady?'Saved automatically on this device':'Preparing device storage…';
  storageStatus.classList.toggle('storage-warning',!!error);
  if(storageLastSaved)storageLastSaved.textContent=lastDeviceSaveAt?new Date(lastDeviceSaveAt).toLocaleString():'Not saved yet';
  if(autoBackupEnabled)autoBackupEnabled.checked=state.autoBackupEnabled!==false;
  if(autoBackupFrequency)autoBackupFrequency.value=String(state.autoBackupDays||7);
  if(autoBackupRetention)autoBackupRetention.value=String(state.autoBackupRetention||10);
  try{
    if(navigator.storage?.estimate){const estimate=await navigator.storage.estimate();storageUsage.textContent=`${formatBytes(estimate.usage||0)} used of approximately ${formatBytes(estimate.quota||0)}`}
    const snapshots=(await idbAll('snapshots')).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    storageSnapshotStatus.textContent=snapshots.length?`${snapshots.length} safety snapshot${snapshots.length===1?'':'s'} · latest ${new Date(snapshots[0].createdAt).toLocaleString()}`:'No safety snapshots yet';
    if(restoreSnapshotBtn)restoreSnapshotBtn.disabled=!snapshots.length;
  }catch{if(storageSnapshotStatus)storageSnapshotStatus.textContent='Safety snapshots unavailable in this browser'}
}
downloadBackupBtn?.addEventListener('click',()=>exportBtn.click());
requestPersistentStorageBtn?.addEventListener('click',async()=>{
  if(!navigator.storage?.persist)return alert('Persistent storage is not supported by this browser. BalanceIQ will still save automatically, but regular backups are recommended.');
  const granted=await navigator.storage.persist();
  showNotice(granted?'Extra storage protection was granted by your browser.':'The browser did not grant extra storage protection. Your data is still saved locally; keep regular downloaded backups.');
  updateStoragePanel();
});
createSnapshotBtn?.addEventListener('click',async()=>{try{await createSafetySnapshot('manual');showNotice('A local safety snapshot was created.')}catch(error){console.error(error);alert('Could not create a safety snapshot.')}});
restoreSnapshotBtn?.addEventListener('click',async()=>{try{const snapshots=(await idbAll('snapshots')).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));if(!snapshots.length)return;if(!confirm(`Restore the latest safety snapshot from ${new Date(snapshots[0].createdAt).toLocaleString()}? Current data will be replaced.`))return;state=normaliseState(snapshots[0].data);saveState();renderAll();showNotice('Latest safety snapshot restored.')}catch(error){console.error(error);alert('Could not restore the safety snapshot.')}});
function saveBackupSettings(){state.autoBackupEnabled=autoBackupEnabled?.checked!==false;state.autoBackupDays=Number(autoBackupFrequency?.value)||7;state.autoBackupRetention=Number(autoBackupRetention?.value)||10;saveState();updateStoragePanel()}
autoBackupEnabled?.addEventListener('change',saveBackupSettings);
autoBackupFrequency?.addEventListener('change',saveBackupSettings);
autoBackupRetention?.addEventListener('change',saveBackupSettings);

applyAppInfo();
document.body.classList.toggle("dark",state.theme==="dark");themeBtn.textContent=state.theme==="dark"?"☀️":"🌙";updateGreeting();setInterval(updateGreeting,60000);
function isStandaloneApp(){
  return window.matchMedia?.("(display-mode: standalone)").matches||window.navigator.standalone===true;
}
function updateInstallButton(){
  if(!installBtn)return;
  const installed=isStandaloneApp();
  installBtn.classList.toggle("hidden",installed);
  installBtn.textContent=deferredPrompt?"Install App":"Install App";
  installBtn.title=deferredPrompt?"Install BalanceIQ on this device":"Show installation instructions";
}
window.addEventListener("beforeinstallprompt",event=>{
  event.preventDefault();
  deferredPrompt=event;
  updateInstallButton();
});
window.addEventListener("appinstalled",()=>{
  deferredPrompt=null;
  updateInstallButton();
  showNotice("BalanceIQ was installed successfully.");
});
installBtn.onclick=async()=>{
  if(isStandaloneApp())return;
  if(deferredPrompt){
    const promptEvent=deferredPrompt;
    deferredPrompt=null;
    promptEvent.prompt();
    const choice=await promptEvent.userChoice;
    if(choice?.outcome!=="accepted")updateInstallButton();
    return;
  }
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  const message=ios
    ?"To install BalanceIQ, tap the Share button in Safari, then choose ‘Add to Home Screen’."
    :"To install BalanceIQ, open your browser menu and choose ‘Install app’ or ‘Add to Home screen’. Installation requires the app to be opened from a secure HTTPS address.";
  alert(message);
};
updateInstallButton();
if("serviceWorker"in navigator&&location.protocol.startsWith("http")){
  window.addEventListener("load",async()=>{
    try{
      const registration=await navigator.serviceWorker.register("service-worker.js",{scope:"./"});
      await registration.update();
    }catch(error){
      console.error("BalanceIQ service worker registration failed",error);
    }
  });
}
renderAll();
updateDemoDataStatus();
updateStoragePanel();
initialiseDeviceStorage();
if(!state.onboardingComplete)setTimeout(openSetup,250);
