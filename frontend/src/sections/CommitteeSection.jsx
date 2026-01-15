import "./CommitteeSection.css";
import { committeeData } from "../data/committeeData";

export default function CommitteeSection() {
  return (
    <section className="committee-section" id="committee" aria-label="Organizing Committee">
      <div className="committee-container">
        <div className="committee-header">
          <h2 className="committee-title">{committeeData.title}</h2>
          <p className="committee-subtitle">{committeeData.subtitle}</p>
        </div>

        <div className="committee-grid">
          {committeeData.members.map((member, index) => (
            <div key={index} className="committee-card">
              <div className="member-avatar">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div className="avatar-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
