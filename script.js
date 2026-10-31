/* CITYRIDE WEBSITE CONFIGURATION
   Replace sample business details, phone numbers, prices, vehicles and policies before publishing.
*/
const CONFIG = {
  businessName: "CityRide",
  phoneDisplay: "+91 00000 00000",
  phone: "910000000000", // digits only, country code included; replace with the real WhatsApp number
  email: "hello@example.com",
  address: "Pune, Maharashtra, India",
  social: { instagram: "#", facebook: "#" },
  policies: { securityDeposit: "As confirmed by the rental team", minimumDuration: "As per selected vehicle", fuel: "Confirm with the rental team" }
};

const CARS = [
  {id:"swift",name:"Maruti Suzuki Swift",short:"Swift",category:"Hatchback",transmission:"Manual",fuel:"Petrol",seats:5,mileage:"20 km/l*",price:1499,popularity:98,deposit:"Configurable",image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85",features:["Air conditioning","Power steering","Music system","5 seats"],description:"A compact and practical city companion, ideal for everyday drives and quick getaways."},
  {id:"i20",name:"Hyundai i20",short:"i20",category:"Hatchback",transmission:"Automatic",fuel:"Petrol",seats:5,mileage:"As per variant",price:1899,popularity:92,deposit:"Configurable",image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85",features:["Automatic transmission","Touchscreen infotainment","Air conditioning","5 seats"],description:"A comfortable premium hatchback with a refined cabin and easy city manners."},
  {id:"dzire",name:"Maruti Suzuki Dzire",short:"Dzire",category:"Sedan",transmission:"Manual",fuel:"Petrol",seats:5,mileage:"As per variant",price:1799,popularity:88,deposit:"Configurable",image:"https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=85",features:["Spacious boot","Air conditioning","Power windows","5 seats"],description:"A sensible sedan for comfortable commutes, airport runs and small-family trips."},
  {id:"city",name:"Honda City",short:"City",category:"Premium",transmission:"Automatic",fuel:"Petrol",seats:5,mileage:"As per variant",price:2799,popularity:95,deposit:"Configurable",image:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=85",features:["Automatic transmission","Premium cabin","Rear AC vents","5 seats"],description:"A spacious, polished sedan for business travel and relaxed highway journeys."},
  {id:"creta",name:"Hyundai Creta",short:"Creta",category:"SUV",transmission:"Automatic",fuel:"Petrol",seats:5,mileage:"As per variant",price:3299,popularity:99,deposit:"Configurable",image:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",features:["Elevated seating","Automatic transmission","Large cabin","5 seats"],description:"A versatile SUV with a commanding driving position and room for a weekend away."},
  {id:"thar",name:"Mahindra Thar",short:"Thar",category:"SUV",transmission:"Manual",fuel:"Diesel",seats:4,mileage:"As per variant",price:3999,popularity:90,deposit:"Configurable",image:"https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&w=900&q=85",features:["SUV styling","Air conditioning","Adventure-ready feel","4 seats"],description:"A bold SUV option for customers looking for a distinctive drive. Confirm permitted routes."}
];

const REVIEWS = [
  {name:"Aarav K.",city:"Pune",text:"The enquiry process was simple and the team explained the rental details clearly. It made planning our weekend drive much easier.",initials:"AK"},
  {name:"Riya S.",city:"Pune",text:"Loved being able to compare different car options in one place. The team was helpful when I had questions about the pickup.",initials:"RS"},
  {name:"Kabir M.",city:"Pune",text:"A convenient way to explore self-drive options. Clear communication makes all the difference when planning a trip.",initials:"KM"}
];
// The vehicles, rates and testimonials above are demonstration content. Replace with verified business data.

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
let activeFilter = "All";
let searchCriteria = null;
let reviewIndex = 0;

function formatPrice(value){return "₹" + Number(value).toLocaleString("en-IN");}
function whatsappUrl(message){return `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(message)}`;}
function setWhatsAppLinks(){
  const message = `Hello ${CONFIG.businessName}, I would like to enquire about self-drive car rentals in Pune.`;
  ["#floatingWhatsapp","#contactWhatsapp"].forEach(sel=>{const el=$(sel); if(el) el.href=whatsappUrl(message);});
}
function renderCars(){
  let list = CARS.filter(car => activeFilter==="All" || car.category===activeFilter || (activeFilter==="Automatic" && car.transmission==="Automatic"));
  if(searchCriteria && searchCriteria.plan){
    // Search captures the user's dates/location and carries them into the enquiry; availability is not asserted by this demo.
  }
  const sort = $("#sortSelect").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  if(sort==="popular") list.sort((a,b)=>b.popularity-a.popularity);
  const grid=$("#carGrid");
  if(!list.length){grid.innerHTML='<div class="empty-state">No cars match this filter. Try another category or contact us for help.</div>';return;}
  grid.innerHTML=list.map(car=>`
    <article class="car-card">
      <div class="car-image"><img src="${car.image}" alt="${car.name}" loading="lazy"><span class="car-tag">${car.category.toUpperCase()}</span><span class="availability">Enquire for availability</span></div>
      <div class="car-info"><div class="car-title-row"><div><h3>${car.name}</h3><p>${car.category} · ${car.short}</p></div><div class="price"><strong>${formatPrice(car.price)}</strong><small>per day*</small></div></div>
      <div class="car-specs"><span><i class="fa-solid fa-user-group"></i>${car.seats} seats</span><span><i class="fa-solid fa-gears"></i>${car.transmission}</span><span><i class="fa-solid fa-gas-pump"></i>${car.fuel}</span></div>
      <div class="car-actions"><button class="btn btn-outline-dark" data-details="${car.id}">View details</button><button class="btn btn-primary" data-book="${car.id}">Book now <i class="fa-solid fa-arrow-right"></i></button></div></div>
    </article>`).join("");
}
function populateCarSelect(){
  $("#selectedCar").innerHTML='<option value="">Any available car</option>'+CARS.map(c=>`<option value="${c.id}">${c.name}</option>`).join("");
}
function openDetails(id){
  const car=CARS.find(c=>c.id===id); if(!car)return;
  $("#modalContent").innerHTML=`<div class="modal-layout"><img src="${car.image}" alt="${car.name}"><div class="modal-copy"><span class="eyebrow">${car.category} · ${car.transmission}</span><h2 id="modalTitle">${car.name}</h2><p>${car.description}</p><div class="modal-specs"><div><strong>${car.seats} seats</strong>Seating capacity</div><div><strong>${car.fuel}</strong>Fuel type</div><div><strong>${car.transmission}</strong>Transmission</div><div><strong>${car.mileage}</strong>Efficiency info</div></div><h4>Features</h4><ul>${car.features.map(f=>`<li>${f}</li>`).join("")}</ul><p class="modal-price">${formatPrice(car.price)} <small>/ day* · sample rate</small></p><p>Security deposit: ${car.deposit}<br>Minimum duration: ${CONFIG.policies.minimumDuration}</p><button class="btn btn-primary" id="modalBook">Enquire about this car <i class="fa-solid fa-arrow-right"></i></button></div></div>`;
  $("#carModal").classList.add("open");$("#carModal").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  $("#modalBook").addEventListener("click",()=>{closeModal();selectCarForEnquiry(id);});
}
function closeModal(){$("#carModal").classList.remove("open");$("#carModal").setAttribute("aria-hidden","true");document.body.style.overflow="";}
function selectCarForEnquiry(id){
  $("#selectedCar").value=id;$("#cars").scrollIntoView({behavior:"smooth"});$("#formPickup").value=$("#pickupDate").value;$("#formReturn").value=$("#returnDate").value;$("#formLocation").value=$("#pickupLocation").value;
  setTimeout(()=>$("#contact").scrollIntoView({behavior:"smooth"}),250);
}
function dateLocal(d=new Date()){const local=new Date(d.getTime()-d.getTimezoneOffset()*60000);return local.toISOString().slice(0,10);}
function setDateMinimums(){
  const today=dateLocal();["#pickupDate","#returnDate","#formPickup","#formReturn"].forEach(s=>$(s).min=today);
}
function validateDateRange(pickup,ret){
  if(!pickup||!ret)return "Please select both pickup and return dates.";
  if(pickup<dateLocal())return "Pickup date cannot be in the past.";
  if(ret<pickup)return "Return date cannot be earlier than pickup date.";
  return "";
}
function showSearch(e){
  e.preventDefault();
  const pickup=$("#pickupDate").value,ret=$("#returnDate").value;
  const error=validateDateRange(pickup,ret);
  if(error){$("#searchFeedback").textContent=error;return;}
  searchCriteria={location:$("#pickupLocation").value,pickup,ret,pickupTime:$("#pickupTime").value,returnTime:$("#returnTime").value,plan:$("#rentalPlan").value};
  $("#searchFeedback").textContent="Search details saved. Choose a car below and send an enquiry to check availability.";
  $("#searchSummary").hidden=false;
  $("#searchSummary").textContent=`Your search: ${searchCriteria.location} · ${pickup} ${searchCriteria.pickupTime} to ${ret} ${searchCriteria.returnTime} · ${searchCriteria.plan} plan. Availability is confirmed by the rental team.`;
  $("#formPickup").value=pickup;$("#formReturn").value=ret;$("#formLocation").value=searchCriteria.location;
  $("#cars").scrollIntoView({behavior:"smooth"});
}
function submitEnquiry(e){
  e.preventDefault();
  const name=$("#customerName").value.trim(),phone=$("#customerPhone").value.trim(),email=$("#customerEmail").value.trim(),carId=$("#selectedCar").value,pickup=$("#formPickup").value,ret=$("#formReturn").value,location=$("#formLocation").value.trim();
  const error=validateDateRange(pickup,ret);
  if(error){$("#enquiryFeedback").textContent=error;return;}
  if(!/^[0-9+ ()-]{10,16}$/.test(phone)){ $("#enquiryFeedback").textContent="Please enter a valid contact number.";return;}
  const car=CARS.find(c=>c.id===carId);
  const message=[
    `Hello ${CONFIG.businessName}, I would like to enquire about a self-drive rental.`,
    `Name: ${name}`,`Phone: ${phone}`,`Email: ${email||"Not provided"}`,`Car: ${car?car.name:"Any available car"}`,
    `Pickup: ${pickup}`,`Return: ${ret}`,`Pickup location: ${location}`,`Message: ${$("#customerMessage").value.trim()||"None"}`,
    "Please confirm availability, final pricing, deposit and rental terms. I understand this is an enquiry and not a confirmed reservation."
  ].join("\n");
  $("#enquiryFeedback").textContent="Your WhatsApp enquiry is ready. Send the pre-filled message to contact the rental team.";
  window.open(whatsappUrl(message),"_blank","noopener,noreferrer");
}
function renderReview(){
  const r=REVIEWS[reviewIndex];
  $("#testimonialCard").innerHTML=`<div class="quote-mark">“</div><div class="review-stars">★★★★★</div><p class="review-text">${r.text}</p><div class="review-person"><div class="review-avatar">${r.initials}</div><span><strong>${r.name}</strong><small>${r.city} · Sample review</small></span></div><span class="sample-note">DEMO CONTENT — REPLACE BEFORE PUBLISHING</span>`;
}
function initFAQ(){
  $$(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{
    const item=btn.closest(".faq-item"),open=item.classList.contains("open");
    $$(".faq-item").forEach(other=>{other.classList.remove("open");$(".faq-question",other).setAttribute("aria-expanded","false");});
    if(!open){item.classList.add("open");btn.setAttribute("aria-expanded","true");}
  }));
}
function initNavigation(){
  const toggle=$("#menuToggle"),nav=$("#mainNav");
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
  $$("#mainNav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.innerHTML='<i class="fa-solid fa-bars"></i>';}));
}
function initScrollEffects(){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");observer.unobserve(entry.target);}}),{threshold:.08});
  $$(".section-top,.package-card,.step,.about-copy,.requirement-list,.faq-item").forEach(el=>{el.classList.add("reveal");observer.observe(el);});
  const top=$("#backToTop");
  window.addEventListener("scroll",()=>top.classList.toggle("visible",window.scrollY>500),{passive:true});
  top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
}
document.addEventListener("DOMContentLoaded",()=>{
  setDateMinimums();populateCarSelect();renderCars();renderReview();setWhatsAppLinks();initFAQ();initNavigation();initScrollEffects();
  $("#year").textContent=new Date().getFullYear();
  $("#filterList").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;$$(".filter-chip").forEach(x=>x.classList.toggle("selected",x===b));renderCars();});
  $("#sortSelect").addEventListener("change",renderCars);
  $("#carGrid").addEventListener("click",e=>{const details=e.target.closest("[data-details]"),book=e.target.closest("[data-book]");if(details)openDetails(details.dataset.details);if(book)selectCarForEnquiry(book.dataset.book);});
  $("#searchForm").addEventListener("submit",showSearch);
  $("#enquiryForm").addEventListener("submit",submitEnquiry);
  $("#modalClose").addEventListener("click",closeModal);
  $("#carModal").addEventListener("click",e=>{if(e.target===$("#carModal"))closeModal();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
  $("#prevReview").addEventListener("click",()=>{reviewIndex=(reviewIndex+REVIEWS.length-1)%REVIEWS.length;renderReview();});
  $("#nextReview").addEventListener("click",()=>{reviewIndex=(reviewIndex+1)%REVIEWS.length;renderReview();});
  $$(".package-link").forEach(a=>a.addEventListener("click",()=>{const plan=a.dataset.package;$("#rentalPlan").value=plan.startsWith("Weekly")?"Weekly":plan.startsWith("Monthly")?"Monthly":"Daily";}));
  ["#pickupDate","#returnDate"].forEach(sel=>$(sel).addEventListener("change",()=>{if(sel==="#pickupDate")$("#returnDate").min=$(sel).value||dateLocal();}));
  $("#formPickup").addEventListener("change",()=>$("#formReturn").min=$("#formPickup").value||dateLocal());
});