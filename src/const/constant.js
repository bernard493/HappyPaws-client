
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


const heroTexts = [
  "Find Your Perfect Pet Companion! Start your journey towards finding a new furry friend today!",
  1000,
  "Adopt a Pet, Change a Life! Search through thousands of adoptable pets looking for a loving home.",
  1000,
  "Your New Best Friend is Just a Click Away! ",
  1000,
  "Bringing Pets and Families Together! Discover pets in need of loving homes.",
  1000,
  " Create Lasting Memories! Start a search for adoptable pets  today.",
  1000,
];

module.exports = {
  responsive,
  heroTexts,
};
