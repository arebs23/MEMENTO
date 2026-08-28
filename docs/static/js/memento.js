/* =========================================================
   CONTENTS ACTIVE SECTION
   ========================================================= */

const contentsLinks =
  document.querySelectorAll(".page-contents a");


const contentsSections =
  Array.from(contentsLinks)
    .map((link) => {

      const id =
        link.getAttribute("href");

      return document.querySelector(id);

    })
    .filter(Boolean);


if (
  contentsLinks.length > 0 &&
  contentsSections.length > 0
) {

  const contentsObserver =
    new IntersectionObserver(

      (entries) => {

        const visibleEntries =
          entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );


        if (visibleEntries.length === 0) {
          return;
        }


        const activeId =
          `#${visibleEntries[0].target.id}`;


        contentsLinks.forEach((link) => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === activeId
          );

        });

      },

      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [
          0,
          0.1,
          0.25,
          0.5
        ]
      }

    );


  contentsSections.forEach((section) => {
    contentsObserver.observe(section);
  });

}