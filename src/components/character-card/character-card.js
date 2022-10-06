import './character-card.css';
import 'bootstrap';

function CharacterCard({ data }) {

    return (
        <div className="card shadow p-1 mb-5 border-0" style={{ width: "18rem" }}>
            <div className="card-image-container">
                <img className="card-img-top" src={data.img} alt={`${data.name} image`} />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{data.name}</h5>
                {data.occupation.map(occupation => (
                    <p className="card-text mb-1">{occupation}</p>
                ))}
                <a href="#" className="btn btn-success mt-auto">See more</a>
            </div>
        </div>
    );
}

export default CharacterCard;
