const documents = [
  // Apne PDFs yahan add karein:
  // {title:"Bhagavad Gita", category:"religions", description:"Example description", file:"pdfs/bhagavad-gita.pdf"},
  // {title:"Future Predictions Vol. 1", category:"predictions", description:"Example description", file:"pdfs/future-predictions-1.pdf"},
];

const religionList = document.getElementById("religionList");
const predictionList = document.getElementById("predictionList");
const search = document.getElementById("search");
const reader = document.getElementById("reader");
const readerTitle = document.getElementById("readerTitle");
const pdfFrame = document.getElementById("pdfFrame");
const downloadBtn = document.getElementById("downloadBtn");

function card(doc){
  const el=document.createElement("article");
  el.className="card";
  el.innerHTML=`
    <h3>${escapeHtml(doc.title)}</h3>
    <p>${escapeHtml(doc.description || "PDF document")}</p>
    <div class="actions">
      <button class="btn read">Read</button>
      <a class="btn dl" href="${encodeURI(doc.file)}" download>Download</a>
    </div>`;
  el.querySelector(".read").onclick=()=>openPdf(doc);
  return el;
}

function render(){
  const q=search.value.toLowerCase().trim();
  religionList.innerHTML="";
  predictionList.innerHTML="";
  const filtered=documents.filter(d=>
    !q || `${d.title} ${d.description||""}`.toLowerCase().includes(q)
  );
  filtered.filter(d=>d.category==="religions").forEach(d=>religionList.appendChild(card(d)));
  filtered.filter(d=>d.category==="predictions").forEach(d=>predictionList.appendChild(card(d)));
  if(!filtered.length){
    religionList.innerHTML='<p style="color:#8e96a8">No documents added yet. Add your PDFs in script.js.</p>';
  }
}

function openPdf(doc){
  readerTitle.textContent=doc.title;
  pdfFrame.src=doc.file;
  downloadBtn.href=doc.file;
  downloadBtn.setAttribute("download","");
  reader.scrollIntoView({behavior:"smooth"});
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

search.addEventListener("input",render);
render();
