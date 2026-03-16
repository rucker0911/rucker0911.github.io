import './AboutCard.css'

export default function AboutCard() {
  return (
    <div className="about-card">
      <h2 className="about-card__title">關於我</h2>
      <p className="about-card__name">曹同和</p>
      <p className="about-card__bio">
        具備兩年以上 Python 後端與 IoT Edge 應用開發經驗，參與智慧交通專案，熟悉異質通訊協定整合（UDP、HTTP、MQTT、Socket IO、TCP、RS485）、資料流處理與 PostgreSQL，以及現場建置與維運。
      </p>
      <p className="about-card__skills">
        Python · Flask · ZMQ · Asyncio · PostgreSQL · Git
      </p>
    </div>
  )
}
