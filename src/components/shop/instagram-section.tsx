import Image from "next/image";

const instagramGallery = [
  {
    id: 1,
    isTall: false,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    alt: "Man in camel overcoat",
  },
  {
    id: 2,
    isTall: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    alt: "Woman in light blue knitwear looking over shoulder",
  },
  {
    id: 3,
    isTall: false,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
    alt: "Fashion model with sunglasses on turquoise backdrop",
  },
  {
    id: 4,
    isTall: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    alt: "Man in plaid button-up shirt and red trousers",
  },
  {
    id: 5,
    isTall: false,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    alt: "Woman in royal blue dress against warm wall",
  },
  {
    id: 6,
    isTall: true,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    alt: "Man in blazer and sunglasses against white brick",
  },
  {
    id: 7,
    isTall: false,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    alt: "Woman in blush ruffled cocktail dress dancing",
  },
];

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-10">
      <div className="text-center space-y-3 mb-12">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#222222]">
          Follow Us On Instagram
        </h2>
        <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-[#777777]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
          ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
        </p>
      </div>

      {/* Alternating tall and short rhythmic arrangement matching Figma */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2.5 lg:gap-3.5 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
        {instagramGallery.map((item) => (
          <div
            key={item.id}
            className={`group relative min-w-[130px] sm:min-w-[150px] flex-1 overflow-hidden rounded-[4px] bg-[#f0f0f0] transition-all duration-300 ${
              item.isTall
                ? "h-[260px] sm:h-[320px] lg:h-[380px]"
                : "h-[200px] sm:h-[240px] lg:h-[280px]"
            }`}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-108"
              sizes="(max-width: 640px) 160px, 15vw"
            />
            {/* Subtle interactive hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-black shadow-sm">
                @fasco
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
