import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const registries = [
  { name: "Carbon Registry", logo: "https://envr.earth/envr/Frame.png" },
  { name: "Puro Earth", logo: "https://envr.earth/envr/puro.earth.svg" },
  { name: "Verra", logo: "https://envr.earth/envr/Verra-Logo0.png" },
  { name: "SAFC", logo: "https://envr.earth/envr/safc_image.png" },
  { name: "Gold Standard", logo: "https://envr.earth/envr/gold-standard.svg" },
  { name: "Isometric", logo: "https://envr.earth/envr/isometric.svg" },
  { name: "ACR Carbon", logo: "https://envr.earth/envr/acrcarbon.svg" },
  { name: "Climate Action Reserve", logo: "https://envr.earth/envr/climate_action_reserve.png" },
  { name: "Global Carbon Council", logo: "https://envr.earth/envr/gcc.png" },
  { name: "Plan Vivo", logo: "https://envr.earth/envr/plan_vivo.svg" },
  { name: "Social Carbon", logo: "https://envr.earth/envr/sc.png" },
  { name: "CDM", logo: "https://envr.earth/envr/cdm.png" },
  { name: "BioCarbon", logo: "https://envr.earth/envr/biocarbon-logo.svg" },
  { name: "Cercarbono", logo: "https://envr.earth/envr/new-cercarbono.png" },
  { name: "Evident", logo: "https://envr.earth/envr/evident.svg" },
];

const RegistriesSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="pb-12">
        {/* Header badge */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-4 h-4 bg-primary rounded-full" />
          <p className="font-medium text-lg text-foreground">Registries</p>
        </div>

        {/* Title + Description */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-12">
          <div className="flex-1 lg:basis-2/3">
            <h2 className="text-[40px] lg:text-[65px] font-normal text-foreground lg:leading-[75px] leading-[50px]">
              Strategic Tie-ups <br /> with{" "}
              <span className="text-primary font-semibold">Registries</span>
            </h2>
          </div>
          <div className="flex-1 lg:basis-1/3 mt-4 lg:mt-0 lg:ml-8">
            <p className="text-muted-foreground text-base leading-[35px]">
              Our strategic alliances with prominent registries provide seamless
              integration and robust management of carbon credits and I-REC.
              Together, we drive meaningful climate action and support sustainable
              practices.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {registries.map((registry) => (
              <CarouselItem
                key={registry.name}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="bg-card shadow-lg rounded-[35px] p-6 text-center lg:px-14 lg:py-10">
                  <div className="h-[160px] rounded-[15px] mx-auto bg-muted flex justify-center items-center">
                    <img
                      src={registry.logo}
                      alt={registry.name}
                      className="h-auto max-h-[100px] max-w-[160px] mx-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
                    {registry.name}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default RegistriesSection;
