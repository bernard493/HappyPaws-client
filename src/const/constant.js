const img1 = require("../assets/demoIMGs/ai-generated-9081977_1280.jpg");
const img2 = require("../assets/demoIMGs/dog-5753302_1280.jpg");
const img3 = require("../assets/demoIMGs/woman-6687637_1280.jpg");
const img4 = require("../assets/demoIMGs/woman-6986050_1280.jpg");

// Demo Pets Imgs will be romoved later
const pet1img = require("../assets/demoIMGs/cat-8198720_1280.jpg");
const pet2img = require("../assets/demoIMGs/dog-7691238_1280.jpg");
const pet3img = require("../assets/demoIMGs/german-shorthaired-pointer-8655457_1280.jpg");
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

const successfulAdoptedPetsBlogPost = [
  {
    id: 1,
    title: "Meet Bella: From Shelter to Forever Home",
    date: "2023-08-15",
    content:
      "Bella, a 3-year-old Golden Retriever, found her forever home after being at the shelter for six months. Her new family couldn’t be happier to have her as part of their lives!",
    author: "Emily Johnson",
    image: img1, // Fill with image URL later
  },
  {
    id: 2,
    title: "Max's Journey: A Rescue Tale",
    date: "2023-07-10",
    content:
      "Max, a spirited Beagle mix, was rescued from a neglectful situation. After a lot of love and care, he was adopted by a wonderful family that adores him.",
    author: "James Smith",
    image: img2, // Fill with image URL later
  },
  {
    id: 3,
    title: "Luna's Transformation: From Stray to Beloved Pet",
    date: "2023-06-22",
    content:
      "Luna, a shy tabby cat, was found wandering the streets. After a few weeks in foster care, she blossomed and was adopted by a family who loves her quirky personality.",
    author: "Sara Lee",
    image: img3, // Fill with image URL later
  },
  // {
  //   id: 4,
  //   title: "Charlie: The Dog Who Found His Family",
  //   date: "2023-05-30",
  //   content:
  //     "Charlie, a 5-year-old Dachshund, waited patiently at the shelter for a year. His persistence paid off when he finally found a family that truly understands him.",
  //   author: "Michael Brown",
  //   image: img4, // Fill with image URL later
  // },
  // {
  //   id: 5,
  //   title: "Rocky's Happy Ending: A Success Story",
  //   date: "2023-04-12",
  //   content:
  //     "Rocky, a playful Pit Bull, was abandoned but never lost hope. After being featured on a local adoption event, he found a loving home where he’s cherished every day.",
  //   author: "Lisa White",
  //   image: img3, // Fill with image URL later
  // },
  // {
  //   id: 6,
  //   title: "Daisy's New Life: A Tale of Resilience",
  //   date: "2023-03-08",
  //   content:
  //     "Daisy, a sweet Labrador mix, spent months in the shelter. Thanks to a dedicated foster, she learned to trust again and was adopted into a family that adores her.",
  //   author: "John Green",
  //   image: img2, // Fill with image URL later
  // },
];

const heroTexts = [
  "Find Your Perfect Pet Companion! Start your journey towards finding a new furry friend today!",
  "Adopt a Pet, Change a Life! Search through thousands of adoptable pets looking for a loving home.",
  "Your New Best Friend is Just a Click Away! ",
  "Bringing Pets and Families Together! Discover pets in need of loving homes.",
  " Create Lasting Memories! Start a search for adoptable pets  today.",
];

const petsDemoDate = [
  {
    id: "13fwsqwfwf",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    gender: "Male",
    image: [pet1img, pet2img, pet2img],
    favorite: true,
    size: "Small",
    description:
      "The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease",
  },
  {
    id: "13fwwwsqwfwf",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    gender: "Male",
    image: [pet1img, pet2img, pet2img],
    favorite: true,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
  {
    id: "jhv676t17g1",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    gender: "Male",
    image: [pet1img, pet2img, pet2img],
    favorite: false,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
  {
    id: "ih7iy87",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: [pet1img, pet2img, pet2img],
    gender: "Male",
    favorite: true,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
  {
    id: "786tgu7g7g",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: [pet1img, pet2img, pet2img],
    gender: "Male",
    favorite: false,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
];

module.exports = {
  responsive,
  successfulAdoptedPetsBlogPost,
  heroTexts,
  petsDemoDate,
};
