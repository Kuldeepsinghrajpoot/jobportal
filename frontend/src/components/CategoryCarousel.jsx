import React from 'react';
import Slider from 'react-slick';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  {
    name: 'Frontend Developer',
    image: 'https://via.placeholder.com/150?text=Frontend', // Replace with actual images
  },
  {
    name: 'Backend Developer',
    image: 'https://via.placeholder.com/150?text=Backend',
  },
  {
    name: 'Data Science',
    image: 'https://via.placeholder.com/150?text=Data+Science',
  },
  {
    name: 'Graphic Designer',
    image: 'https://via.placeholder.com/150?text=Graphic+Design',
  },
  {
    name: 'FullStack Developer',
    image: 'https://via.placeholder.com/150?text=FullStack',
  },
];

const CategoryGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full py-12">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-primary">Job Categories</h2>
        <p className="text-muted-foreground mt-2">
          Discover your ideal role by browsing through our curated job categories.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-4 slider-container">
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <div key={index} className="p-4">
              <div className="relative bg-card flex flex-col items-center text-center border rounded p-6 group hover:shadow-xl transition-all duration-300 cursor-pointer">
                

                {/* Content */}
                <h3 className="text-xl font-semibold text-primary z-10">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 z-10">
                  Explore opportunities in {category.name}.
                </p>

                {/* Search Button */}
                <Button
                  onClick={() => searchJobHandler(category.name)}
                  className="mt-4 rounded px-5 py-2 z-10 hover:transition-transform transform group-hover:scale-105"
                >
                  Explore Jobs
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoryGrid;
