const categories = [
    {
      name: "Gardening Tools",
      tools: [
        { id: 1, name: "Shovel", price: 15.99, tag: "Essential", description: "A garden shovel for digging.", rating: 4.5, availability: true, image: "" },
        { id: 2, name: "Rake", price: 12.49, tag: "Essential", description: "A rake for gathering leaves.", rating: 4.0, availability: true, image: "" },
        { id: 3, name: "Pruning Shears", price: 20.00, tag: "Specialized", description: "For trimming plants and shrubs.", rating: 4.7, availability: false, image: "" },
        { id: 4, name: "Hoe", price: 18.50, tag: "Essential", description: "Used to till soil.", rating: 4.2, availability: true, image: "" },
        { id: 5, name: "Garden Trowel", price: 9.99, tag: "Essential", description: "A small hand tool for gardening.", rating: 4.1, availability: true, image: "" },
        { id: 6, name: "Watering Can", price: 14.99, tag: "Essential", description: "Used for watering plants.", rating: 4.3, availability: true, image: "" },
        { id: 7, name: "Gloves", price: 8.99, tag: "Essential", description: "Protect your hands while gardening.", rating: 4.0, availability: true, image: "" },
        { id: 8, name: "Garden Fork", price: 22.00, tag: "Specialized", description: "Used for loosening soil.", rating: 4.5, availability: false, image: "" },
      ],
    },
    {
      name: "Irrigation Systems",
      tools: [
        { id: 1, name: "Sprinkler", price: 25.99, tag: "Essential", description: "Covers large areas for irrigation.", rating: 4.0, availability: true, image: "" },
        { id: 2, name: "Drip Irrigation Kit", price: 45.00, tag: "Specialized", description: "Ideal for watering plants directly at the root.", rating: 4.5, availability: true, image: "" },
        { id: 3, name: "Soaker Hose", price: 18.99, tag: "Specialized", description: "A hose for slow, deep watering.", rating: 4.1, availability: false, image: "" },
        { id: 4, name: "Timer", price: 20.99, tag: "Essential", description: "Controls watering schedules.", rating: 4.3, availability: true, image: "" },
        { id: 5, name: "Garden Pump", price: 75.00, tag: "Heavy Duty", description: "Used to pump water for irrigation.", rating: 4.7, availability: true, image: "" },
        { id: 6, name: "Watering Wand", price: 12.00, tag: "Essential", description: "A handheld tool for watering plants.", rating: 4.2, availability: true, image: "" },
        { id: 7, name: "Irrigation Filter", price: 15.50, tag: "Specialized", description: "Filters water to prevent clogging.", rating: 4.4, availability: false, image: "" },
        { id: 8, name: "Fertilizer Injector", price: 40.00, tag: "Specialized", description: "Injects fertilizers into irrigation systems.", rating: 4.0, availability: true, image: "" },
      ],
    },
    {
      name: "Harvesting Equipment",
      tools: [
        { id: 1, name: "Harvesting Knife", price: 18.99, tag: "Specialized", description: "Used for cutting crops.", rating: 4.5, availability: true, image: "" },
        { id: 2, name: "Fruit Picker", price: 35.00, tag: "Specialized", description: "Tool for picking fruits from tall trees.", rating: 4.8, availability: true, image: "" },
        { id: 3, name: "Pruning Saw", price: 22.50, tag: "Specialized", description: "For cutting tree branches.", rating: 4.2, availability: true, image: "" },
        { id: 4, name: "Harvest Basket", price: 14.00, tag: "Essential", description: "Basket for collecting harvested produce.", rating: 4.3, availability: true, image: "" },
        { id: 5, name: "Garden Shears", price: 19.99, tag: "Essential", description: "For harvesting and trimming.", rating: 4.1, availability: true, image: "" },
        { id: 6, name: "Scythe", price: 45.99, tag: "Heavy Duty", description: "Used for mowing or cutting grass.", rating: 4.4, availability: true, image: "" },
        { id: 7, name: "Clippers", price: 9.99, tag: "Essential", description: "For trimming plants and small branches.", rating: 4.0, availability: true, image: "" },
        { id: 8, name: "Pitchfork", price: 25.00, tag: "Heavy Duty", description: "Used to lift and move harvested crops.", rating: 4.6, availability: true, image: "" },
      ],
    },
    {
      name: "Farming Machinery",
      tools: [
        { id: 1, name: "Tractor", price: 30000.00, tag: "Heavy Duty", description: "For plowing, tilling, and harvesting.", rating: 4.9, availability: true, image: "" },
        { id: 2, name: "Plow", price: 1200.00, tag: "Heavy Duty", description: "Used for breaking up the soil.", rating: 4.4, availability: true, image: "" },
        { id: 3, name: "Seeder", price: 1500.00, tag: "Heavy Duty", description: "Used for sowing seeds.", rating: 4.6, availability: true, image: "" },
        { id: 4, name: "Cultivator", price: 2000.00, tag: "Heavy Duty", description: "For tilling soil and preparing seedbeds.", rating: 4.3, availability: true, image: "" },
        { id: 5, name: "Harvester", price: 50000.00, tag: "Heavy Duty", description: "For harvesting crops efficiently.", rating: 4.8, availability: true, image: "" },
        { id: 6, name: "Sprayer", price: 3500.00, tag: "Specialized", description: "For spraying pesticides and fertilizers.", rating: 4.5, availability: false, image: "" },
        { id: 7, name: "Baler", price: 10000.00, tag: "Heavy Duty", description: "Used to compress hay into bales.", rating: 4.6, availability: true, image: "" },
        { id: 8, name: "Mower", price: 8000.00, tag: "Heavy Duty", description: "For mowing large fields.", rating: 4.3, availability: true, image: "" },
      ],
    },
  ];
  
  export default categories;
  