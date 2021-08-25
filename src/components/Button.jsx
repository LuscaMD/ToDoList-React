// escrever "imr" para já importar automaticamente
import React from 'react';
import './Button.css';

// escrever "sfc" para criar e exportar automaticamente o componente

const Button = ({children, onClick}) => {
    return ( 
        <button onClick={onClick} className="button">
             {children}
        </button>
    );
}

/*
    Tudo que estiver dentro de um componente quando você chama ele (como no exemplo abaixo), é chamado de "children"
    <Button>
        <h1>Hello world</h1>
    </Button>
*/

export default Button;