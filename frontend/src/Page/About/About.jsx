import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function About() {
  const slides = [
    {
      image: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg",
      title: "Our Story",
      subtitle: "A journey of passion for pet care",
    },
    {
      image:
        "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg",
      title: "Our Mission",
      subtitle: "Providing exceptional care for your pets",
    },
    {
      image:
        "https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg",
      title: "Our Vision",
      subtitle: "Setting new standards in pet care",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Veterinarian",
      image:
        "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg",
      description: "15+ years of experience in pet care",
    },
    {
      name: "Mike Thompson",
      role: "Head Trainer",
      image:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
      description: "Certified professional dog trainer",
    },
    {
      name: "Emily Davis",
      role: "Grooming Specialist",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      description: "Expert in breed-specific grooming",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="relative h-[60vh]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          effect="fade"
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex flex-col items-center justify-center text-center px-4">
                  <h2 className="text-white text-5xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-white text-xl md:text-2xl">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              With over 15 years of experience in professional pet care, we're
              dedicated to providing the highest quality services for your
              beloved companions. Our state-of-the-art facility and expert team
              ensure your pets receive the best care possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg"
                alt="Pet Care Facility"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <div className="w-6 h-6 text-blue-600">✓</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Expert Care</h4>
                    <p className="text-gray-600">
                      Our team of certified professionals provides the highest
                      standard of care for your pets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <div className="w-6 h-6 text-blue-600">✓</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">
                      Modern Facility
                    </h4>
                    <p className="text-gray-600">
                      State-of-the-art equipment and comfortable spaces designed
                      for your pet's comfort.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <div className="w-6 h-6 text-blue-600">✓</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">24/7 Care</h4>
                    <p className="text-gray-600">
                      Round-the-clock supervision and care for your beloved
                      pets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Expert Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
              Meet our dedicated team of professionals who are passionate about
              providing the best care for your pets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
