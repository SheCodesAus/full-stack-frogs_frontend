import './DashboardButton.css'


export default function DashboardButton({text="button",width='auto',isActive, onClick}){
    return(
        <button className={`dashboard-btn ${isActive ? "selected" : ""}`} style={{width}} onClick={onClick}>{text}</button>
    )
}