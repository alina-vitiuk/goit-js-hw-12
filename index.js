import{a as m,i as y,S}from"./assets/vendor-D73Uttp0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();m.defaults.baseURL="https://pixabay.com";const f=(t,s,l)=>{const a={params:{key:"47019110-2ca5c662ec937047bff385c25",q:t,orientation:"horizontal",page:s,per_page:l,safesearch:!0}};return m.get("/api/",a)},b=t=>`<li class="gallery-item">
          <a class="gallery-link" href="${t.largeImageURL}">
            <img
              class="gallery-image"
              src="${t.webformatURL}"
              alt="${t.tags}"
              width="360"
            />
          </a>
          <div class="main-block">
            <div class="block">
              <h2 class="tittle">Likes</h2>
              <p class="info-titel">${t.likes}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Views</h2>
              <p class="info-titel">${t.views}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Comments</h2>
              <p class="info-titel">${t.comments}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Downloads</h2>
              <p class="info-titel">${t.downloads}</p>
            </div>
          </div>
        </li>`,v=document.querySelector(".js-search-form"),h=document.querySelector(".js-gallery"),c=document.querySelector(".loader"),u=document.querySelector(".js-load-more"),w=document.querySelector(".text");let i=1,n="",L=0,p=0,g=15;c.style.display="none";const P=async t=>{try{t.preventDefault(),i=1,n=v.elements.user_query.value,c.style.display="block";const s=await f(n,i,g);if((o=>!o.replace(/\s/g,"").length)(n)){y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),c.style.display="none";return}c.style.display="none",p=s.data.totalHits/g,s.data.hits.length===0&&(u.classList.add("is-hidden"),y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}));let a=s.data.hits.map(o=>b(o)).join("");h.innerHTML=a,new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),L=h.querySelector("li").getBoundingClientRect().height,u.classList.remove("is-hidden")}catch{c.style.display="none",console.log(err)}},d=async t=>{if(!d.cantClick){d.cantClick=!0;try{if(i++,console.log(i),console.log(p),i===p)u.classList.add("is-hidden"),w.style.display="block",console.log("alllllll done");else{console.log("ddadadadwdwdwd");let l=(await f(n,i,g)).data.hits.map(a=>b(a)).join("");h.insertAdjacentHTML("beforeend",l),scrollBy({top:L*2,behavior:"smooth"}),setTimeout(()=>{d.cantClick=!1},200)}}catch{y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"})}}};v.addEventListener("submit",P);u.addEventListener("click",d);
//# sourceMappingURL=index.js.map
