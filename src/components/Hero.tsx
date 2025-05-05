const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center py-8 md:py-16 min-h-[80vh] z-10 relative">
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl font-black">
              Hi<span className="text-red-500">,</span> I'm
            </h1>
            <p className="text-3xl md:text-5xl">
              Renold Dickson<span className="text-blue-500">.</span>
            </p>
            <p className="text-3xl font-bold">
              Software Developer
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="group relative px-6 py-2 border border-black bg-black text-white rounded-full transition duration-300 overflow-hidden cursor-pointer">
                <div className="transition-transform duration-300 group-hover:-translate-y-8">
                  HIRE ME
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-8 group-hover:translate-y-0">
                  HIRE ME
                </div>
              </button>

              <button className="px-6 py-2 border border-black text-black rounded-full transition duration-300 cursor-pointer hover:bg-gray-200">
                GET CV
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-full bg-gray-100 p-4 md:p-8">
                <img
                  src="/assets/hero-image.png"
                  alt="Hero"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;