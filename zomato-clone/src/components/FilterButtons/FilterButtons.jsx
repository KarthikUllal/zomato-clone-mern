import "./FilterButtons.css";

export default function FilterButtons() {
  return (
    <section className="button-sections">
      <div className="buttons"><button>Filter</button></div>
      <div className="buttons"><button>Offers</button></div>
      <div className="buttons"><button>Ratings 4.5+</button></div>
      <div className="buttons"><button>Pet Friendly</button></div>
      <div className="buttons"><button>Outdoor seatings</button></div>
      <div className="buttons"><button>Serves alcohol</button></div>
      <div className="buttons"><button>Open Now</button></div>
    </section>
  );
}