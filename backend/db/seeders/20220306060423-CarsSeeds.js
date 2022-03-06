'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Collections', [
      {
        ownerId: 10,
        description: "Times are tough (lost my snazzy lawyer gig) and I need to rent out my baby to pay the bills. The interior is quite snug. Inside are high-quality materials, a hushed cabin, and a refined-sounding engine. Acceleration is quick, and fuel economy is commendable.",
        brand: "Lexus",
        model: "IS 300",
        price: 50,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_2000,q_auto,f_auto/prod/cars/chrome/white/2012LEX006b_640_01"
      },
      {
        ownerId: 11,
        description: "With a serene ride, high-tech features that cater to every whim, thoughtful touches in a comfortable and beyond-impeccable cabin, and impenetrable interior silence, the new BMW 7 Series delivers a first-class travel experience. After years of trailing the Mercedes-Benz S-Class, the 7 Series has outscored the big Benz in our tests. With weight-saving carbon construction, the BMW is not only quick but also fuel efficient.",
        brand: "BMW",
        model: "7 Series",
        price: 70,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_1110,q_auto,f_auto/prod/cars/chrome/white/2022BMC080001_1280_01"
      },
      {
        ownerId: 15,
        description: "This all-new, third-generation luxury coach provides significant powertrain and chassis advances. It features a 626-hp, 6.0-liter twin-turbocharged W12 engine with a 48-volt mild-hybrid assist, mated to an eight-speed automatic transmission.",
        brand: "Bentley",
        model: "Flying Spur",
        price: 3000,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_1110,q_auto,f_auto/prod/cars/cr/model-years/13973-2022-bentley-flying-spur"
      },
      {
        ownerId: 12,
        description: "Maserati. The name conjures images of jet-setting celebrities and racing thrills. The Ghibli allows everyone to share in the storied brand's glamour.",
        brand: "Maserati",
        model: "Ghibli",
        price: 100,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_1110,q_auto,f_auto/prod/cars/cr/car-versions/2834-2014-maserati-ghibli-sq4"
      },
      {
        ownerId: 13,
        description: "The C-Class is redesigned for 2022. A new 2.0-liter turbocharged four-cylinder engine gets a 48-volt mild-hybrid setup that promises better fuel economy and quicker acceleration. An interior upgrade puts the latest version of Mercedes-Benz's MBUX infotainment system front and center on a screen that's almost a foot wide.",
        brand: "Mercedes",
        model: "C-Class",
        price: 150,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_1110,q_auto,f_auto/prod/cars/cr/model-years/13633-2022-mercedes-benz-c-class"
      },
      {
        ownerId: 14,
        description: "The redesigned 2 Series coupe incorporates BMW's latest performance, safety, and infotainment technology. Not to be confused with the 2 Series Gran Coupe, this car comes either as the rear-wheel-drive 230i powered by a 255-hp, 2.0-liter turbo four-cylinder or the all-wheel-drive M240i xDrive powered by a 382-hp turbo inline-six.",
        brand: "BMW",
        model: "2 Series",
        price: 200,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_1110,q_auto,f_auto/prod/cars/cr/model-years/14160-2022-bmw-2-series"
      },
      {
        ownerId: 15,
        description: "The Z4 is engaging right from the first press of the gas pedal. The roadster accelerates quickly and delivers steady power, no matter where the engine is in the rpm range.",
        brand: "BMW",
        model: "Z4",
        price: 250,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_1110,q_auto,f_auto/prod/cars/chrome/white/2022BMC240016_1280_01"
      },
      {
        ownerId: 16,
        description: "The large four-door Panamera luxury car hides beneath a coupe silhouette and retains its versatile hatchback configuration. New turbocharged V6 and V8 engines provide plenty of motivation, and three hybrid powertrains with varying degrees of power are offered. An optional air suspension and active safety features are also available. The Panamera delivers performance and agility, along with enough room for four adults to ride comfortably.",
        brand: "Porsche",
        model: "Panamera",
        price: 300,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_940,q_auto,f_auto/prod/cars/cr/model-years/14274-2022-porsche-panamera"
      },
      {
        ownerId: 17,
        description: "Porsche's low-slung four-door EV is quick, agile, and very enjoyable to drive, and rides comfortably. There's a decently sized rear trunk and a small frunk, or front trunk. The front seats are very comfortable; the rear is a bit tight.",
        brand: "Porsche",
        model: "Taycan",
        price: 200,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_940,q_auto,f_auto/prod/cars/cr/car-versions/15843-2020-porsche-taycan-4s"
      },
      {
        ownerId: 18,
        description: "The Model 3 has swift acceleration and remarkably agile handling. Though the front seats are comfortable, the ride is very stiff and choppy, and the rear seat is too low and uncomfortable. The Long Range version is rated at 358 miles of range. It takes 12 hours to charge on a 32-amp, 240-volt connector. The controls are very distracting because even simple tasks, such as adjusting the mirrors, must be performed using the large center-mounted touch screen.",
        brand: "Tesla",
        model: "Model 3",
        price: 150,
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_940,q_auto,f_auto/prod/cars/cr/car-versions/12630-2018-tesla-model-3-long-range"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Cars', null, {});
  }
};
