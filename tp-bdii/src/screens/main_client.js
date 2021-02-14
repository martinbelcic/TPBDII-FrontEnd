import React, { useState, useEffect } from 'react';
import CustomSideBar from '../components/sidebar';

import { Container, Col, Row } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Workspace from '../components/workspace';

import useToken from '../functions/useToken';
import useWorkspace from '../functions/useWorkspace';
import useResults from '../functions/useResults';

const methods = require('../functions/server');

const getCounter = async(user) => {
    return await methods.counter(user);
}

export default function MainClient() {
    const {token, setToken} = useToken();
    const [workspace, setWorkspace] = useState([]);
    const {results, setResults} = useResults();

    const [isLoading, setLoading] = useState(true);
    const [command, setCommand] = useState();
    const [count, setCount] = useState();
    
    useEffect(async () => {
        if(workspace){
            let response = await methods.workspaces(token.user);
            setWorkspace(prev => [...prev, response]);
        }
        setLoading(false);
    }, []);

    const logOut = () => {
        localStorage.clear();
    }

    if (isLoading){
        return <div> Loading... </div>
    }
    else
        return (
            <div style={{ height: '100%' }} className={'bg-secondary'}>
                <Container style={{ height: '100%' }} className={'mx-0 px-0'}>
                    <Row  style={{ height: '100%' }}>
                        <Col>
                            <CustomSideBar className='fill-window'
                                workspaces={ workspace }
                                onClick={ logOut }
                            />
                        </Col>
                        <Col md={8}>
                            <Workspace />
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
}