import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef } from 'react';
import { allCocktails } from '../../constants';

const Menu = () => {
  const contentRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, { opacity: 1, xPercent: 0, duration: 1, ease: 'power1.inOut' });
    gsap.fromTo('.details h2', { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, ease: 'power1.inOut' });
    gsap.fromTo('.details p', { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, ease: 'power1.inOut' });
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;
  const handleSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails ;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
  };
  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

      <h2 id="menu-heading" className="sr-only">
        Cocktail menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
              onClick={() => handleSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button className="text-left" onClick={() => handleSlide(currentIndex - 1)}>
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" arria-hidden="true" />
          </button>
          <button className="text-left" onClick={() => handleSlide(currentIndex + 1)}>
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" arria-hidden="true" />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCocktail.image} alt={currentCocktail.name } className="object-contain" />
        </div>
  
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
