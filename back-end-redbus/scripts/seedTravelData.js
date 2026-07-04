const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
});

mongoose.pluralize(null);

const Route = require("../models/route");
const Bus = require("../models/bus");

const cityStops = {
  Delhi: ["Kashmiri Gate", "Anand Vihar", "Dhaula Kuan", "Sarai Kale Khan"],
  Jaipur: ["Sindhi Camp", "Ajmeri Gate", "Narayan Singh Circle", "Vaishali Nagar"],
  Mumbai: ["Borivali", "Dadar", "Andheri", "Sion"],
  Pune: ["Swargate", "Wakad", "Katraj", "Shivaji Nagar"],
  Bengaluru: ["Majestic", "Silk Board", "Hebbal", "Electronic City"],
  Chennai: ["CMBT", "Tambaram", "Guindy", "Porur"],
  Hyderabad: ["MGBS", "Kukatpally", "Ameerpet", "Gachibowli"],
  Kolkata: ["Esplanade", "Howrah", "Dunlop", "Karunamoyee"],
  Ahmedabad: ["Gita Mandir", "Paldi", "Iscon", "Naroda"],
  Surat: ["Adajan", "Kamrej", "Varachha", "Udhna"],
  Lucknow: ["Alambagh", "Charbagh", "Gomti Nagar", "Polytechnic"],
  Faizabad: ["Ayodhya Cantt", "Civil Lines", "Naka", "Sahadatganj"],
  Kanpur: ["Jhakarkati", "Rawatpur", "Kidwai Nagar", "Vijay Nagar"],
  Chandigarh: ["Sector 17", "Sector 43", "Zirakpur", "Manimajra"],
  Dehradun: ["ISBT", "Clock Tower", "Prem Nagar", "Rajpur Road"],
  Indore: ["Sarwate", "Vijay Nagar", "Rajendra Nagar", "Teen Imli"],
  Bhopal: ["ISBT", "Nadra", "MP Nagar", "Habibganj"],
  Nagpur: ["Ganeshpeth", "Dharampeth", "Sitabuldi", "Manish Nagar"],
  Goa: ["Panaji", "Mapusa", "Margao", "Vasco"],
  Patna: ["Mithapur", "Gandhi Maidan", "Bailey Road", "Kankarbagh"],
  Varanasi: ["Cantt", "Lanka", "Godowlia", "Sarnath"],
  Agra: ["Idgah", "ISBT", "Sanjay Place", "Sikandra"],
  Udaipur: ["City Station", "Fatehpura", "Hiran Magri", "Surajpole"],
};

const routes = [
  ["Delhi", "Jaipur", 5],
  ["Jaipur", "Delhi", 5],
  ["Mumbai", "Pune", 4],
  ["Pune", "Mumbai", 4],
  ["Bengaluru", "Chennai", 7],
  ["Chennai", "Bengaluru", 7],
  ["Hyderabad", "Bengaluru", 9],
  ["Bengaluru", "Hyderabad", 9],
  ["Kolkata", "Patna", 12],
  ["Patna", "Kolkata", 12],
  ["Ahmedabad", "Surat", 5],
  ["Surat", "Ahmedabad", 5],
  ["Lucknow", "Kanpur", 2],
  ["Kanpur", "Lucknow", 2],
  ["Lucknow", "Faizabad", 3],
  ["Faizabad", "Lucknow", 3],
  ["Chandigarh", "Dehradun", 6],
  ["Dehradun", "Chandigarh", 6],
  ["Indore", "Bhopal", 4],
  ["Bhopal", "Indore", 4],
  ["Nagpur", "Hyderabad", 10],
  ["Goa", "Mumbai", 12],
  ["Delhi", "Agra", 4],
  ["Udaipur", "Jaipur", 8],
  ["Varanasi", "Lucknow", 7],
  ["Lucknow", "Delhi", 8],
];

const busTemplates = [
  {
    operatorName: "SkyLine Express",
    busType: 1,
    departureTime: "6",
    rating: [4, 5, 4, 4, 5],
    totalSeats: 40,
    images: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
    liveTracking: 1,
    reschedulable: 1,
  },
  {
    operatorName: "Royal Roadways",
    busType: 2,
    departureTime: "11",
    rating: [5, 4, 4, 5, 4],
    totalSeats: 36,
    images: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
    liveTracking: 1,
    reschedulable: 0,
  },
  {
    operatorName: "Prime Travels",
    busType: 3,
    departureTime: "18",
    rating: [4, 4, 5, 4, 5],
    totalSeats: 42,
    images: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=900&q=80",
    liveTracking: 1,
    reschedulable: 1,
  },
  {
    operatorName: "Night Rider",
    busType: 4,
    departureTime: "22",
    rating: [4, 3, 4, 4, 5],
    totalSeats: 38,
    images: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80",
    liveTracking: 0,
    reschedulable: 1,
  },
];

const connect = () =>
  mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const seed = async () => {
  if (!process.env.DATABASE) {
    throw new Error("DATABASE is missing in back-end-redbus/.env");
  }

  await connect();

  let routeCount = 0;
  let busCount = 0;

  for (const [departure, arrival, duration] of routes) {
    const route = await Route.findOneAndUpdate(
      {
        "departureLocation.name": departure,
        "arrivalLocation.name": arrival,
      },
      {
        departureLocation: {
          name: departure,
          subLocations: cityStops[departure],
        },
        arrivalLocation: {
          name: arrival,
          subLocations: cityStops[arrival],
        },
        duration,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    await Bus.deleteMany({
      routes: route._id,
      operatorName: { $in: busTemplates.map((bus) => bus.operatorName) },
    });

    await Bus.insertMany(
      busTemplates.map((bus) => ({
        ...bus,
        routes: route._id,
      }))
    );

    routeCount += 1;
    busCount += busTemplates.length;
  }

  console.log(`Seeded ${routeCount} routes and ${busCount} buses.`);
};

seed()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
