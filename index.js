import{a as y,i as v,S as L}from"./assets/vendor-D73Uttp0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();y.defaults.baseURL="https://pixabay.com";const h=(s,t,a)=>{const l={params:{key:"47019110-2ca5c662ec937047bff385c25",q:s,orientation:"horizontal",page:t,per_page:a,safesearch:!0}};return y.get("/api/",l)},m=s=>`<li class="gallery-item">
          <a class="gallery-link" href="${s.largeImageURL}">
            <img
              class="gallery-image"
              src="${s.webformatURL}"
              alt="${s.tags}"
              width="360"
            />
          </a>
          <div class="main-block">
            <div class="block">
              <h2 class="tittle">Likes</h2>
              <p class="info-titel">${s.likes}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Views</h2>
              <p class="info-titel">${s.views}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Comments</h2>
              <p class="info-titel">${s.comments}</p>
            </div>
            <div class="block">
              <h2 class="tittle">Downloads</h2>
              <p class="info-titel">${s.downloads}</p>
            </div>
          </div>
        </li>`,f=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),o=document.querySelector(".loader"),u=document.querySelector(".js-load-more"),S=document.querySelector(".text");let i=1,d="",g=0,b=0,p=15;o.style.display="none";const P=async s=>{try{s.preventDefault(),d=f.elements.user_query.value,o.style.display="block";const t=await h(d,i,p);o.style.display="none",b=t.data.totalHits/p,t.data.hits.length===0&&v.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),console.log(t);let a=t.data.hits.map(r=>m(r)).join("");n.innerHTML=a,new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),g=n.querySelector("li").getBoundingClientRect().height,u.classList.remove("is-hidden")}catch{o.style.display="none",console.log(err)}},q=async s=>{try{i++,i===b&&(u.classList.add("is-hidden"),S.style.display="block");let a=(await h(d,i,p)).data.hits.map(l=>m(l)).join("");n.insertAdjacentHTML("beforeend",a),scrollBy({top:g*2,behavior:"smooth"})}catch(t){console.log(t)}};f.addEventListener("submit",P);u.addEventListener("click",q);
//# sourceMappingURL=index.js.map
