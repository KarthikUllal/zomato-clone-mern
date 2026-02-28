import "./Tabs.css";
export default function DetailsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-wrapper">
      <div className="tabs">

        <span
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </span>

        <span
          className={activeTab === "order" ? "active" : ""}
          onClick={() => setActiveTab("order")}
        >
          Order Online
        </span>

        <span
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </span>

        <span
          className={activeTab === "photos" ? "active" : ""}
          onClick={() => setActiveTab("photos")}
        >
          Photos
        </span>

        <span
          className={activeTab === "menu" ? "active" : ""}
          onClick={() => setActiveTab("menu")}
        >
          Menu
        </span>

        <span
          className={activeTab === "book" ? "active" : ""}
          onClick={() => setActiveTab("book")}
        >
          Book a Table
        </span>

      </div>
    </div>
  );
}