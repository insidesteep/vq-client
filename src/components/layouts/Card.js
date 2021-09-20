const Card = ({ title, body}) => {
    return (
        <div className="card">
            <div className="card-body">
                {title &&
                    (<div className="card-title">
                        <h4>{title}</h4>
                    </div>)}
                {
                    body && body()
                }
            </div>
        </div>
    )
}

export default Card