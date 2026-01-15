import { useNavigate } from "react-router-dom";
import { sportsData } from "../../data/sportsData";
import Button from "../../components/Button";
import "./AllSports.css";
import { useEffect } from "react";

export default function AllSports() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-sports-container">
      {/* Hero Section */}
      <section className="all-sports-hero">
        <div className="all-sports-hero-content">
          <h1 className="all-sports-title">ALL SPORTS & EVENTS</h1>
          <p className="all-sports-subtitle">
            Explore all available sports categories and their detailed rules & regulations
          </p>
        </div>
      </section>

      {/* Sports Categories */}
      <div className="all-sports-content">
        {sportsData.map((category) => (
          <section key={category.id} className="sport-category-section">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <div>
                <h2 className="category-name">{category.name}</h2>
                <p className="category-description">{category.description}</p>
              </div>
            </div>

            <div className="sports-list">
              {category.sports.map((sport) => (
                <div key={sport.id} className="sport-item">
                  <div className="sport-item-content">
                    <h3 className="sport-item-name">{sport.name}</h3>
                    <div className="sport-item-details">
                      <span className="sport-detail-badge">
                        {sport.type.toUpperCase().replace('_', ' ')}
                      </span>
                      <span className="sport-detail-badge">
                        {sport.teamSize} {sport.teamSize === 1 ? 'Player' : 'Players'}
                      </span>
                      <span className="sport-detail-badge fee-badge">
                        ₹{sport.fee}
                      </span>
                    </div>
                    <p className="sport-item-description">{sport.description}</p>
                    {sport.genderRestriction && (
                      <span className="gender-restriction">
                        {sport.genderRestriction === 'female' ? '👧 Girls Only' : '👦 Boys Only'}
                      </span>
                    )}
                  </div>
                  <Button
                    className="view-rules-btn"
                    onClick={() => navigate(`/sport/${sport.id}`)}
                  >
                    View Rules
                  </Button>
                </div>
              ))}

              {/* Handle sub-types (like Carrom Singles/Doubles) */}
              {category.sports.some((sport) => sport.hasSubTypes) &&
                category.sports
                  .filter((sport) => sport.hasSubTypes)
                  .map((sport) =>
                    sport.subTypes.map((subType) => (
                      <div key={subType.id} className="sport-item">
                        <div className="sport-item-content">
                          <h3 className="sport-item-name">{subType.name}</h3>
                          <div className="sport-item-details">
                            <span className="sport-detail-badge">
                              {subType.type.toUpperCase().replace('_', ' ')}
                            </span>
                            <span className="sport-detail-badge">
                              {subType.teamSize} {subType.teamSize === 1 ? 'Player' : 'Players'}
                            </span>
                            <span className="sport-detail-badge fee-badge">
                              ₹{subType.fee}
                            </span>
                          </div>
                        </div>
                        <Button
                          className="view-rules-btn"
                          onClick={() => navigate(`/sport/${subType.id}`)}
                        >
                          View Rules
                        </Button>
                      </div>
                    ))
                  )}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="all-sports-cta">
        <h2 className="cta-title">Ready to Register?</h2>
        <p className="cta-description">
          Choose your sport and register now to be part of the action!
        </p>
        <div className="cta-buttons">
          <Button className="register-btn" onClick={() => navigate("/register")}>
            Register Now
          </Button>
          <Button className="home-btn" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </section>
    </div>
  );
}
