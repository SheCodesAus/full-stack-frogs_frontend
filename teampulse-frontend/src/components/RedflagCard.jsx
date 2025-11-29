import "./RedflagCard.css";




function RedflagCard({ lowData = {} }) {
    const { name,type } = lowData;

    return(
        <div className="redflag-card">
            <h1>Attention:</h1>
            <h2>Extreme low mood on individual: {name}</h2>
        </div>
    )
}

export default RedflagCard;