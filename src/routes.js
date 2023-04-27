import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import CadastroProduto from "./Pages/Cadastro";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './app.css'


function RouteApp() {
    return (
        <BrowserRouter>
            <Header />
            <Container className='conteudo'>
                <Row>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    )
}
export default RouteApp