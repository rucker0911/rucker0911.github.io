import { PROFILE_NAME, PROFILE_AVATAR, PROFILE_BIO, PROFILE_TECH_STACK, PROFILE_SKILLS } from '../lib/profile'
import './AboutCard.css'

export default function AboutCard() {
  return (
    <div className="about-card">
      <h2 className="about-card__title">關於我</h2>
      <div className="about-card__avatar-screen">
        <div className="about-card__avatar-ring">
          <img
            className="about-card__avatar-img"
            src={PROFILE_AVATAR}
            alt={`${PROFILE_NAME} 頭像`}
            width={80}
            height={80}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <p className="about-card__name">{PROFILE_NAME}</p>
      <p className="about-card__bio">{PROFILE_BIO}</p>
      <div className="about-card__skill-bars">
        {PROFILE_SKILLS.map(({ name, level }) => (
          <div key={name} className="about-card__skill">
            <span className="about-card__skill-label">{name}</span>
            <div className="about-card__skill-track">
              <div className="about-card__skill-fill" style={{ width: `${level}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="about-card__techs">{PROFILE_TECH_STACK}</p>
    </div>
  )
}
