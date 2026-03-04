export const dummyRestaurants = [
  {
    _id: "1",
    name: "Seafood Palace",
    category: "Dining",
    cuisine: "Seafood",
    location: "Mangalore",
    averageCostForTwo: "₹1200 for two",

    banner:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=60",

    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=60"
    ],

    description: "Famous seafood restaurant near the beach.",
    hours: "10:00 AM - 11:00 PM",
    contact: "+91 9876543210",

    rating: 4.5,
    reviewCount: 120
  },

  {
    _id: "2",
    name: "Pizza Corner",
    category: "Delivery",
    cuisine: "Italian",
    location: "Udupi",
    averageCostForTwo: "₹800 for two",

    banner:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=60",

    gallery: [
      "https://images.unsplash.com/photo-1601924582975-7a4bce47d24a?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1548365328-8b849e17c6d0?auto=format&fit=crop&w=400&q=60"
    ],

    description: "Italian pizzas and cheesy delights.",
    hours: "11:00 AM - 11:30 PM",
    contact: "+91 9998887776",

    rating: 4.2,
    reviewCount: 80
  }
];

export const dummyFoods = [
  {
    _id: "101",
    name: "Chicken Biryani",
    price: 250,
    type: "Non-Veg",
    restaurantId: "1",
    img : "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGJpcmllbmklMjB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    _id: "102",
    name: "Paneer Biryani",
    price: 220,
    type: "Veg",
    restaurantId: "1",
    img : "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGJpcmllbmklMjB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    _id: "103",
    name: "Veg Pizza",
    price: 300,
    type: "Veg",
    restaurantId: "2",
    img : "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGJpcmllbmklMjB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];