import{a as f,i as u,S as g}from"./assets/vendor-D73Uttp0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();f.defaults.baseURL="https://pixabay.com";const b=(t,s,i)=>{const a={params:{key:"47019110-2ca5c662ec937047bff385c25",q:t,orientation:"horizontal",page:s,per_page:i,safesearch:!0}};return f.get("/api/",a)},v=t=>`<li class="gallery-item">
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
        </li>`,S=document.querySelector(".js-search-form"),m=document.querySelector(".js-gallery"),o=document.querySelector(".loader"),c=document.querySelector(".js-load-more"),y=document.querySelector(".text");let d=1,p="",L=0,P=0,h=15;o.style.display="none";const k=async t=>{try{t.preventDefault(),d=1,y.style.display="none",p=S.elements.user_query.value,o.style.display="block";const s=await b(p,d,h);if((l=>!l.replace(/\s/g,"").length)(p)){u.error({message:"Please fill out the form!",position:"bottomRight"}),o.style.display="none";return}s.data.totalHits<=h?(c.style.visibility="hidden",y.style.display="block"):c.style.visibility="visible",o.style.display="none",P=Math.floor(s.data.totalHits/h),s.data.hits.length===0&&(c.style.visibility="hidden",y.style.display="none",u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}));let a=s.data.hits.map(l=>v(l)).join("");m.innerHTML=a,new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),L=m.querySelector("li").getBoundingClientRect().height}catch{o.style.display="none"}},n=async t=>{if(!n.cantClick){n.cantClick=!0;try{d++;let i=(await b(p,d,h)).data.hits.map(e=>v(e)).join("");m.insertAdjacentHTML("beforeend",i),new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),d===P&&(c.style.visibility="hidden",y.style.display="block",n.cantClick=!1),scrollBy({top:L*2,behavior:"smooth"}),setTimeout(()=>{n.cantClick=!1},200)}catch{u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"})}}};S.addEventListener("submit",k);c.addEventListener("click",n);
//# sourceMappingURL=index.js.map
