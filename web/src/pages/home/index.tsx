import React from 'react';
import logo from '../../assets/logo.svg';
import './style.css';
import {FiLogIn} from 'react-icons/fi';
//se a gente colocar apenas a rota '/create-point' dentro do href
//do <a>, a página toda vai renderizar por completo. Não queremos isso
//porque prejudica a perfomance do site.
import { Link } from 'react-router-dom';
//colocamos a tag Link no lugar da <a>. Assim temos SPA.

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                 <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>
                    Seu marketplace de coleta de resíduos.
                    </h1>
                    <p>
                    Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                    </p>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>
                            Cadastre um ponto de coleta
                        </strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home;