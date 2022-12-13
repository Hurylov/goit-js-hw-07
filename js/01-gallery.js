import { galleryItems } from "./gallery-items.js";
// Change code below this line

const instanceSettingsObject = {
  onShow: (instance) => {
    refs.body.addEventListener("keydown", onEscModalClose);
    refs.modal.addEventListener("click", onClickModalClose);
  },
  onClose: (instance) => {
    refs.body.removeEventListener("keydown", onEscModalClose);
    refs.modal.removeEventListener("click", onClickModalClose);
  },
};

const instance = basicLightbox.create("", instanceSettingsObject);

const refs = {
  galleryList: document.querySelector(".gallery"),
  body: document.querySelector("body"),
  modal: instance.element(),
};

const makeGalleryMarkup = () => {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></div>`;
    })
    .join("");
};

const render = () => {
  refs.galleryList.innerHTML = makeGalleryMarkup();
};

const onEscModalClose = (e) => {
  if (e.key === "Escape") {
    instance.close();
  }
};

const onClickModalClose = (e) => {
  instance.close();
};

const handleClick = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  refs.modal.innerHTML = `<img
        src="${e.target.dataset.source}"
        alt="${e.target.alt}"/>`;

  instance.show();
};

render();

refs.galleryList.addEventListener("click", handleClick);
// refs.galleryList.addEventListener("keydown", onEscmodalClose);