import{a as f,i as h,S as b}from"./assets/vendor-D73Uttp0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();f.defaults.baseURL="https://pixabay.com";const v=(t,s,o)=>{const a={params:{key:"47019110-2ca5c662ec937047bff385c25",q:t,orientation:"horizontal",page:s,per_page:o,safesearch:!0}};return f.get("/api/",a)},S=t=>`<li class="gallery-item">
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
        </li>`,L=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),i=document.querySelector(".loader"),n=document.querySelector(".js-load-more"),g=document.querySelector(".text");let d=1,y="",P=0,m=0,p=15;i.style.display="none";const k=async t=>{try{t.preventDefault(),d=1,g.style.display="none",y=L.elements.user_query.value,i.style.display="block";const s=await v(y,d,p);if((l=>!l.replace(/\s/g,"").length)(y)){h.error({message:"Please fill out the form!",position:"bottomRight"}),i.style.display="none";return}s.data.totalHits<=p?(n.style.visibility="hidden",g.style.display="block"):n.style.visibility="visible",i.style.display="none",m=Math.floor(s.data.totalHits/p),console.log(m),s.data.hits.length===0&&(n.style.visibility="hidden",h.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}));let a=s.data.hits.map(l=>S(l)).join("");u.innerHTML=a,new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),P=u.querySelector("li").getBoundingClientRect().height}catch{i.style.display="none",console.log(err)}},c=async t=>{if(!c.cantClick){c.cantClick=!0;try{d++;let o=(await v(y,d,p)).data.hits.map(e=>S(e)).join("");u.insertAdjacentHTML("beforeend",o),new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),d===m&&(n.style.visibility="hidden",g.style.display="block",c.cantClick=!1),scrollBy({top:P*2,behavior:"smooth"}),setTimeout(()=>{c.cantClick=!1},200)}catch{h.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"})}}};L.addEventListener("submit",k);n.addEventListener("click",c);
//# sourceMappingURL=index.js.map
