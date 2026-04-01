import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Spot from './models/Spot.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const spots = [
  {
    name: "Barot",
    location: "Mandi",
    description: "A hidden gem along the Uhl river, famous for its trout fish and serene wildlife sanctuary trails.",
    avgDailyCost: 1200,
    serenityScore: 10,
    tags: ["#Riverside", "#Fishing", "#Offbeat"],
    imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"
  },
  {
    name: "Jibhi",
    location: "Tirthan Valley",
    description: "Known for its wooden cottages and pine forests, this hamlet offers ultimate peace away from the crowds.",
    avgDailyCost: 1500,
    serenityScore: 9,
    tags: ["#Forest", "#Waterfall", "#SlowTravel"],
    imageUrl: "https://images.unsplash.com/photo-1590766940554-634a7ed41450"
  },
  {
    name: "Chitkul",
    location: "Kinnaur",
    description: "The last inhabited village near the Indo-China border. Stark landscapes and crystal clear river water.",
    avgDailyCost: 1800,
    serenityScore: 9,
    tags: ["#BorderVillage", "#River", "#HighAltitude"],
    imageUrl: "https://img.avianexperiences.com/attraction/00253666-839c-48a1-a94d-3609f75a3e05"
  },
  {
    name: "Shoja",
    location: "Seraj Valley",
    description: "A small village with a panoramic view of the snow-capped Himalayan peaks, located near Jalori Pass.",
    avgDailyCost: 1600,
    serenityScore: 9,
    tags: ["#MountainViews", "#Trekking", "#Quiet"],
    imageUrl: "https://blogs.innerpece.com/wp-content/uploads/2025/04/innerpece-Shoja-Village-in-Himalayan.png"
  },
  {
    name: "Langza",
    location: "Spiti Valley",
    description: "Famous for the giant Buddha statue and ancient fossils. It feels like stepping back in time.",
    avgDailyCost: 1300,
    serenityScore: 10,
    tags: ["#Fossils", "#Buddhism", "#Spiritual"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Langza_Village%2C_Himachal_Pradesh.jpg"
  },
  {
    name: "Naggar",
    location: "Kullu District",
    description: "An ancient town with a historical castle and art galleries, offering a much quieter alternative to Manali.",
    avgDailyCost: 1400,
    serenityScore: 8,
    tags: ["#Heritage", "#Art", "#Castle"],
    imageUrl: "https://i0.wp.com/shutterholictv.com/wp-content/uploads/2024/07/Naggar-Castle-near-Manali.jpg"
  },
  {
    name: "Gushaini",
    location: "Great Himalayan National Park",
    description: "The gateway to the GHNP, this riverside village is perfect for birdwatching and peaceful walks.",
    avgDailyCost: 1700,
    serenityScore: 10,
    tags: ["#NationalPark", "#RiverSide", "#BirdWatching"],
    imageUrl: "https://i0.wp.com/travelshoebum.com/wp-content/uploads/2016/05/img_7831.jpg?fit=640%2C480&ssl=1"
  },
  {
    name: "Sangla",
    location: "Kinnaur",
    description: "Located in the Baspa Valley, surrounded by giant peaks and famous for its red apple orchards.",
    avgDailyCost: 1900,
    serenityScore: 8,
    tags: ["#Orchards", "#Valley", "#Culture"],
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/d4/fc/9d/chitkul.jpg?w=1400&h=1400&s=1"
  },
  {
    name: "Prashar Lake",
    location: "Mandi",
    description: "Features a mysterious floating island and a 14th-century temple. Best for a quiet overnight camp.",
    avgDailyCost: 1100,
    serenityScore: 9,
    tags: ["#Camping", "#Lake", "#Temple"],
    imageUrl: "https://brozaadventures.com/soft/file_store/highlight/1443185045CJ.jpeg"
  },
  {
    name: "Mudh",
    location: "Pin Valley",
    description: "The last village in Pin Valley. It is a desert-mountain landscape that is incredibly isolated and serene.",
    avgDailyCost: 1200,
    serenityScore: 10,
    tags: ["#ColdDesert", "#Isolation", "#Adventure"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Mudh_Village_Pin_Spiti_Himachal_Jun18_D72_7094.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await Spot.deleteMany(); // Clears old spots so you don't have duplicates
    await Spot.insertMany(spots);
    console.log("Himachal Gems Seeded Successfully! 🏔️✨");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();