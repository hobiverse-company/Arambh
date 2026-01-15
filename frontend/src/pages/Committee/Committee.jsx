import "./Committee.css";
import { committeeData } from "../../data/committeeData";
import Footer from "../../components/Footer";

function getInitials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0]?.[0] ?? "";
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : "") ?? "";
  return (first + last).toUpperCase();
}

function CommitteeCard({ member }) {
  const initials = getInitials(member.name);

  return (
    <div className="committeeCard">
      <div className="cardAvatar">
        {member.image ? (
          <img src={member.image} alt={member.name} />
        ) : (
          <div className="avatarFallback">{initials}</div>
        )}
      </div>
      <div className="cardInfo">
        <h3 className="cardName">{member.name}</h3>
        <p className="cardRole">{member.role}</p>
        <p className="cardDepartment">{member.department}</p>
      </div>
    </div>
  );
}

function CommitteeGroup({ title, members, className = "" }) {
  return (
    <div className={`committeeGroup ${className}`}>
      <h2 className="groupTitle">{title}</h2>
      <div className="committeeCards">
        {members.map((member, index) => (
          <CommitteeCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

export default function Committee() {
  return (
    <main className="committeePage">
      <section className="committeeSection" aria-label="Committee">
        <header className="committeeHeader">
          <h1 className="committeeTitle">{committeeData.title}</h1>
          <p className="committeeSubtitle">{committeeData.subtitle}</p>
        </header>

        <CommitteeGroup
          title={committeeData.coreCommittee.title}
          members={committeeData.coreCommittee.members}
          className="coreGroup"
        />

        <CommitteeGroup
          title={committeeData.webTeam.title}
          members={committeeData.webTeam.members}
          className="webGroup"
        />

        <CommitteeGroup
          title={committeeData.executiveCommittee.title}
          members={committeeData.executiveCommittee.members}
          className="executiveGroup"
        />

        <CommitteeGroup
          title={committeeData.trainingTeam.title}
          members={committeeData.trainingTeam.members}
          className="trainingGroup"
        />
      </section>
      <Footer />
    </main>
  );
}
