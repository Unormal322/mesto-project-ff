(()=>{"use strict";var e=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];function t(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=r.querySelector(".card__image");r.querySelector(".card__title").textContent=e.name,c.src=e.link,c.alt=e.name,r.querySelector(".card__delete-button").addEventListener("click",(function(){return t(r)}));var p=r.querySelector(".card__like-button");return p.addEventListener("click",(function(){return n(p)})),c.addEventListener("click",(function(){o(e.name,e.link)})),r}function n(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}var r=function(e){"Escape"===e.key&&p(document.querySelector(".popup_is-opened"))};function c(e){e.classList.toggle("popup_is-opened"),document.addEventListener("keydown",r)}function p(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),600),document.removeEventListener("keydown",r)}for(var u=document.querySelector(".places__list"),i=document.querySelector(".popup_type_edit"),s=document.querySelector(".popup_type_new-card"),a=document.querySelector(".popup_type_image"),d=document.querySelector(".profile__edit-button"),l=document.querySelector(".profile__add-button"),m=document.querySelectorAll(".popup"),_=document.forms["edit-profile"],v=document.querySelector(".popup__input_type_name"),y=document.querySelector(".popup__input_type_description"),f=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),q=document.forms["new-place"],S=document.querySelector(".popup__image"),g=document.querySelector(".popup__caption"),L=0;L<e.length;L++)u.append(t(e[L],n,o,x));d.addEventListener("click",(function(){h()})),l.addEventListener("click",(function(){c(s)}));var h=function(){v.value=f.textContent,y.value=k.textContent,c(i)};function x(e,t){S.src=t,S.alt=e,g.textContent=e,c(a)}m.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&p(e),t.target.classList.contains("popup__close")&&p(e)}))})),_.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=v.value,k.textContent=y.value,p(i)})),q.addEventListener("submit",(function(e){e.preventDefault();var r={name:q.elements["place-name"].value,link:q.elements.link.value};u.prepend(t(r,n,o,x)),p(s),q.reset()}))})();