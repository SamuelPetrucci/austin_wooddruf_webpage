'use client';

import { useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import AnimatedSection from '@/components/AnimatedSection';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  insuranceType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Florida",
    rating: 5,
    text: "Austin made the entire insurance process so simple and stress-free. He found me a health plan that saved me money compared to what I was paying before. His attention to detail and genuine care for my family's needs really shows.",
    avatar: "S",
    insuranceType: "Health Insurance"
  },
  {
    id: 2,
    name: "Michael R.",
    location: "Texas",
    rating: 5,
    text: "After my wife and I had our first child, we knew we needed better life insurance coverage. Austin explained everything clearly and helped us understand exactly what we were getting. We feel so much more secure now.",
    avatar: "M",
    insuranceType: "Life Insurance"
  },
  {
    id: 3,
    name: "Jennifer L.",
    location: "California",
    rating: 5,
    text: "I was overwhelmed trying to navigate health insurance options for my small business. Austin took the time to understand our needs and found us a plan that works perfectly for our team. Highly recommend his services!",
    avatar: "J",
    insuranceType: "Business Insurance"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what real clients have to say about their experience with Austin Woodruff Insurance.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden border border-gray-100">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-slate-100/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/30 to-blue-100/30 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-6 w-6 text-yellow-500"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 italic">
                  &ldquo;{currentTestimonial.text}&rdquo;
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentTestimonial.avatar}
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-600">{currentTestimonial.location}</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {currentTestimonial.insuranceType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-blue-800 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 group"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                {isAutoPlaying ? 'Pause' : 'Resume'} auto-rotation
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection delay={400}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-800 mb-2">5.0/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-800 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-800 mb-2">Free</div>
              <div className="text-gray-600">Consultations</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
