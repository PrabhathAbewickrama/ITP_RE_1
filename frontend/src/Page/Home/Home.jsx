import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import Card from "./Card";

// Featured pet products data (you would fetch this from an API in a real app)
const featuredProducts = [
  {
    id: 1,
    name: "Premium Organic Dog Food",
    price: 39.99,
    image: "./img/premium-dog-food.jpg",
    category: "dogs",
    sale: false,
  },
  {
    id: 2,
    name: "Interactive Cat Toy Set",
    price: 24.99,
    originalPrice: 34.99,
    image: "./img/cat-toy-set.jpg",
    category: "cats",
    sale: true,
  },
  {
    id: 3,
    name: "Cozy Pet Bed",
    price: 49.99,
    image: "./img/pet-bed.jpg",
    category: "accessories",
    sale: false,
  },
  {
    id: 4,
    name: "Pet Grooming Kit",
    price: 34.99,
    originalPrice: 44.99,
    image: "./img/hero-dog.jpg",
    category: "grooming",
    sale: true,
  },
];

// Custom hero slider images for pet care
const heroImages = [
  {
    src: "./img/hero-dog.jpg",
    alt: "Happy Dogs",
    title: "Complete Care For Your Furry Friends",
    subtitle: "Quality products and professional services for your pets",
    cta: "Explore Services",
    link: "/all-services",
  },
  {
    src: "./img/hero-cat.jpg",
    alt: "Cat Care",
    title: "New Pet Care Products",
    subtitle: "Discover our range of premium pet food and accessories",
    cta: "Shop Now",
    link: "/all-products?filter=new",
  },
  {
    src: "./img/hero-vet.jpg",
    alt: "Veterinary Services",
    title: "Professional Vet Services",
    subtitle: "Schedule a check-up for your pet today",
    cta: "Book Appointment",
    link: "/services/veterinary",
  },
];

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set elements to visible after component mounts for animation
    setIsVisible(true);

    // You could add scroll event listeners here for additional animations
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll(".scroll-animate");
      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.8) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced Hero Slider Component
  const HeroSlider = () => {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <ImageSlider
          images={heroImages.map((img) => ({
            src: img.src,
            alt: img.alt,
            content: (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                  {img.title}
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-md">
                  {img.subtitle}
                </p>
                <Link
                  to={img.link}
                  className="bg-white text-green-800 hover:bg-green-500 hover:text-white transition-all duration-300 py-3 px-8 rounded-full font-semibold text-lg transform hover:scale-105"
                >
                  {img.cta}
                </Link>
              </div>
            ),
          }))}
        />
      </div>
    );
  };

  // Product Card Component
  const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.sale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full">
              SALE
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full transition duration-300">
              Add to Cart
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Category Tile Component
  const CategoryTile = ({ image, title, link }) => {
    return (
      <div className="relative w-full h-80 md:h-96 overflow-hidden group rounded-lg">
        <img
          src={image || "/api/placeholder/600/400"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-6 transform transition-transform duration-300 group-hover:scale-110">
            {title}
          </h2>
          <Link
            to={link}
            className="bg-white text-green-800 hover:bg-green-500 hover:text-white transition-all duration-300 py-2 px-6 rounded-full font-semibold transform group-hover:translate-y-1"
          >
            EXPLORE
          </Link>
        </div>
      </div>
    );
  };

  // Service Card Component
  const ServiceCard = ({ icon, title, description }) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="text-green-500 text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <HeroSlider />
      </section>

      {/* Categories Section */}
      <section
        className={`py-16 px-4 md:px-8 max-w-7xl mx-auto transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Pet Care Services
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive care for all your pets' needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <CategoryTile
            image="./img/dogs.jpg"
            title="DOGS"
            link="/all-products?category=dogs"
          />
          <CategoryTile
            image="./img/cats.jpg"
            title="CATS"
            link="/all-products?category=cats"
          />
          <CategoryTile
            image="./img/small-pets.jpg"
            title="SMALL PETS"
            link="/all-products?category=small-pets"
          />
          <CategoryTile
            image="./img/grooming.jpg"
            title="GROOMING"
            link="/services/grooming"
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Pet Products
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Trusted products for your beloved pets
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/all-products"
              className="inline-block bg-green-500 hover:bg-green-700 text-white py-3 px-8 rounded-full font-semibold transition duration-300 transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Professional care for the health and happiness of your pets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<i className="fas fa-stethoscope"></i>}
            title="Veterinary Care"
            description="Regular check-ups, vaccinations, and medical treatments for all types of pets."
          />
          <ServiceCard
            icon={<i className="fas fa-cut"></i>}
            title="Grooming Services"
            description="Professional grooming including bathing, haircuts, nail trimming, and more."
          />
          <ServiceCard
            icon={<i className="fas fa-home"></i>}
            title="Pet Boarding"
            description="Safe and comfortable accommodations for your pets while you're away."
          />
          <ServiceCard
            icon={<i className="fas fa-walking"></i>}
            title="Dog Walking"
            description="Regular exercise and outdoor activities for your canine companions."
          />
          <ServiceCard
            icon={<i className="fas fa-graduation-cap"></i>}
            title="Training Programs"
            description="Behavior training and socialization classes for pets of all ages."
          />
          <ServiceCard
            icon={<i className="fas fa-paw"></i>}
            title="Pet Adoption"
            description="Find your perfect companion with our responsible adoption services."
          />
        </div>
      </section>

      {/* Special Collection */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 h-full w-full absolute opacity-90"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Wellness Collection
              </h2>
              <p className="text-white text-lg mb-8">
                Discover our range of premium products designed to enhance your
                pet's health, comfort, and happiness.
              </p>
              <Link
                to="/all-products?collection=wellness"
                className="inline-block bg-white text-green-600 hover:bg-gray-100 py-3 px-8 rounded-full font-semibold transition duration-300"
              >
                Explore Collection
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="./img/pet-wellness.jpg"
                alt="Pet Wellness Collection"
                className="w-full h-auto md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Pet Parents Say
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Card
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              header="Sarah Johnson"
              content="My dog Max absolutely loves the grooming services! The staff is incredibly patient and caring with him, and he always comes home looking and smelling wonderful."
            />
            <Card
              image="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              header="James Wilson"
              content="The veterinary care here is exceptional. Dr. Martinez took the time to thoroughly explain my cat's condition and treatment options. I'm incredibly grateful for their expertise."
            />
            <Card
              image="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              header="Emma Davis"
              content="The premium pet food has made such a difference in my puppy's energy levels and coat quality. I appreciate the expert advice on nutrition that helped me choose the right option."
            />
          </div>
        </div>
      </section>

      {/* Newsletter & Promotions */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Pet Parent Community
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to receive pet care tips, exclusive offers, and updates on
            new services and products.
          </p>

          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition duration-300"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="#"
              className="text-white hover:text-green-200 transition duration-300"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-green-200 transition duration-300"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.06-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.37-.06 4.04 0 2.67.01 2.985.06 4.04.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.06 4.04.06 2.67 0 2.985-.01 4.04-.06.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.05-1.055.06-1.37.06-4.04 0-2.67-.01-2.986-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.05-1.37-.06-4.04-.06zm0 3.064A5.139 5.139 0 0112 12a5.139 5.139 0 01-5.134 5.134A5.139 5.139 0 011.732 12 5.139 5.139 0 016.866 6.866zm0 8.468A3.334 3.334 0 116.866 12a3.334 3.334 0 010 6.668zM16.133 5.532a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-green-200 transition duration-300"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CSS for Card Component */}
      <style jsx>{`
        .card-wrap {
          width: 280px;
          height: 320px;
          perspective: 800px;
          margin: 10px;
        }
        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(0);
          transition: transform 0.3s ease-out;
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }
        .card-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease-out;
          border-radius: 16px;
        }
        .card-info {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 20px;
          color: white;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0)
          );
          transform: translateZ(20px);
        }
        .card-info h1 {
          font-size: 22px;
          font-weight: bold;
          margin: 0 0 10px;
        }
        .card-info p {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default Home;
