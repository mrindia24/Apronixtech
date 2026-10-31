const heroPhrases = ['Social that connects.', 'Stores that sell.', 'Websites that work.'];

export function HeroTextRotator() {
  return (
    <span className="hero-text-rotator">
      <span className="sr-only">Social media, Shopify, and WordPress solutions.</span>
      <span className="hero-text-rotator__track" aria-hidden="true">
        {heroPhrases.map((phrase) => (
          <span key={phrase} className="hero-text-rotator__phrase">
            {phrase}
          </span>
        ))}
        <span className="hero-text-rotator__phrase">{heroPhrases[0]}</span>
      </span>
    </span>
  );
}
