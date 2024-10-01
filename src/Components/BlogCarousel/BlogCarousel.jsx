import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../const/constant";
import BlogCard from "../BlogCard/BlogCard";


const BlogCarousel = ({blogs}) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={ true }
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={7000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
    //   deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {
        blogs.map((blog, index) => {
            return (
                <BlogCard blog={blog}/>)
      })
    }
    </Carousel>
  );
};

export default BlogCarousel;
