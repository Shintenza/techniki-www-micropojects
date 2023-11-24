class appearOnScroll {
    #observer = null;
    #elements = null;
    #startingClass = "";
    #edgeThresholdClass = false;
  
    constructor(elementsName, startingClass, edgeThresholdClass=null) {
      this.#elements = document.querySelectorAll(`.${elementsName}`);
      this.#startingClass = startingClass;
      this.#edgeThresholdClass = edgeThresholdClass;
      this.#makeElementsHidden();
      this.#createObserver();
      this.#addObserverToElements();
    }
  
    #createObserver() {
      this.#observer = new IntersectionObserver((e) => this.#observerCallback(e),
        { threshold: 0.2 },
      );
    }
  
    #observerCallback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.toggle("show", entry.isIntersecting);
          this.#observer.unobserve(entry.target);
        }
      })
    }
  
    #addObserverToElements() {
      for (const element of this.#elements) {
          this.#observer.observe(element);
      }
    }
  
    #makeElementsHidden() {
      this.#elements.forEach((element) => {
        element.classList.add(this.#startingClass);
      });
    }
  }
  
const row = new appearOnScroll("section", "slide_from_left");
  