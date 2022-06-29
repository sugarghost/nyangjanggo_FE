export const reveal = () => {
  const reveals: NodeListOf<Element> = document.querySelectorAll(".reveal");

  const revalesLen = Array.from(reveals).length;
  for (let i = 0; i < revalesLen; i++) {
    let windowHeight = window.innerHeight;

    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i]?.classList.add("active");
    } else {
      reveals[i]?.classList.remove("active");
    }
  }
};
