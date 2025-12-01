import './DashboardCard.css';

export default function DashboardCard({title, number, detail}){
    return(
        <div className='card'>
            <div className='card-left'>
                <span className='card-title'>{title}</span><br />
                <span className='card-nunmber'>{number}</span><br />
                <span className='card-detail'>{detail}</span><br />
            </div>
            <div className='card-right'></div>

        </div>
    )
}