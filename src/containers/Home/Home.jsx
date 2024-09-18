import './Home.css';
import Game_Item from '../../components/Game_Item/Game_Item';


function Home(){
    return(
        <div className='Home'>
            <Game_Item/>
            <Game_Item/>
            <Game_Item/>
        </div>
    )
}

export default Home