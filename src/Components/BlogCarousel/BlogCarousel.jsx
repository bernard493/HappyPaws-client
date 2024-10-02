import React from "react";
import Slider from "react-slick"; // import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../const/constant";
import BlogCard from "../BlogCard/BlogCard";

const BlogCarousel = ({ blogs }) => {
  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}  >
      {blogs.map((blog, index) => {
        return <BlogCard blog={blog} />;
      })}
    </Slider>
  );
};

export default BlogCarousel;
