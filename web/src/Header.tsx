import React from 'react';

//Interface é uma forma de definir a tipagem de um objeto
interface HeaderProps {
    title: string;  //para tornar uma prop não obrigatória escreve "title?:"
}
//parâmetro no react chama-se 'generic'

//toda função de react que vai construir um componente tem que
//começar com letra MAIÚSCULA, para não conflitar com as tags
//do HTML.

//importante tipar a function com React.FC passando a interface como
//parâmetro (na verdade, generic)
const Header: React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>Bem vindo {props.title}</h1>
        </header>
    );
}

export default Header;