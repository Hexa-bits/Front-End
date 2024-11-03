import VictoryBox from "../../VictoryBox/VictoryBox";
import Confetti from "react-confetti";

function Winner({ winnerName, onLeave }) {
    if(!winnerName) return null;

    return (
        <>
            <Confetti
            width={2500}
            height={1500}
            numberOfPieces={300}
            gravity={0.3}
            wind={0.02}
            recycle={false}
            style={{ position: "fixed", top: 0, left: 0 }}
            />
            <VictoryBox winnerName={winnerName} onLeave={onLeave} />
        </>
        );
}

export default Winner;