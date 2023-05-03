import { useState, useEffect } from "react";
import { service } from "../../service/api";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";
import moment from 'moment';

import './home.css'

function Home() {

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        async function getProdutos() {
            const response = await service.getProdutos();
            const produtoData = response.data
            produtoData.forEach((element, key) => {
                produtoData[key].dias_restantes = calculaDiasRestantes(produtoData[key].data_cadastro, produtoData[key].data_validade)
            });
            console.log(produtoData)
            setProdutos(produtoData)
            return
        }

        getProdutos()
    }, [])

    function calculaDiasRestantes(data_cadastro, data_validade) {
        const dataCadastro = moment(data_cadastro);
        const dataValidade = moment(data_validade);
        const diasRestantes = dataValidade.diff(dataCadastro, 'days');
        return diasRestantes
    }

    if (produtos.status === 'erro') {
        return (
            <h1>{produtos.mensagem}</h1>
        )
    }

    return (
        <div className="produto-container">
            <Row>
                <Col lg={12}>
                    <h1>Produtos Cadastrados</h1>
                </Col>
                {produtos.map((item) => (
                    <Col lg={4} className="card-produto" key={item.id}>
                        <Card>
                            <Card.Img variant="top" src={`http://localhost:5000/imagens/${item.imagem}`} />
                            <Card.Body>
                                <Card.Title>{item.nome}</Card.Title>
                                <Card.Text>
                                    {item.descricao}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default Home