import Image from 'next/image';

const brandIcons = [
  {
    name: 'Instagram',
    src: '/technology-icons/instagram.svg',
    className: 'hero-tech-float hero-tech-float--instagram',
    size: 25,
  },
  {
    name: 'Shopify',
    src: '/technology-icons/shopify.svg',
    className: 'hero-tech-float hero-tech-float--shopify',
    size: 27,
  },
  {
    name: 'WordPress',
    src: '/technology-icons/wordpress.svg',
    className: 'hero-tech-float hero-tech-float--wordpress',
    size: 27,
  },
  {
    name: 'Facebook',
    src: '/technology-icons/facebook.svg',
    className: 'hero-tech-float hero-tech-float--facebook',
    size: 27,
  },
];

export function HeroTechFloaters() {
  return (
    <div className="hero-tech-floaters" aria-hidden="true">
      {brandIcons.map((icon) => (
        <span key={icon.name} className={icon.className}>
          <Image src={icon.src} alt="" width={icon.size} height={icon.size} />
        </span>
      ))}
    </div>
  );
}
