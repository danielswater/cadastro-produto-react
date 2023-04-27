import { useState, useEffect } from "react";
import { service } from "../../service/api";

import Col from 'react-bootstrap/Col';

import './home.css'

function Home() {

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        async function getProdutos() {
            const response = await service.getProdutos();
            const produtoData = response.data
            console.log('data', produtoData)
            setProdutos(produtoData)
            return
        }

        getProdutos()
    }, [])

    if (produtos.status == 'erro') {
        return (
            <h1>{produtos.mensagem}</h1>
        )
    }

    return (
        <Col className="produto-container" lg={12}>COL 1</Col>
    )
}
export default Home