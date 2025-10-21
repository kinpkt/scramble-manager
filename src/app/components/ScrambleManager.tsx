'use client';

import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';

interface WCIF {
    id: string;
    name: string;
    [key: string]: any;
}

interface APIResult {
    success?: boolean;
    message?: string;
    [key: string]: any;
}

const ScrambleManager = () => 
{
    const [competitionID, setCompetitionID] = useState<String>('');
    const [wcif, setWCIF] = useState<WCIF|null>(null);
    const [scrambleZip, setScrambleZip] = useState<File|null>(null);
    const [apiResult, setAPIResult] = useState<APIResult|null>(null);

    const onFetchWCIFClick = async () =>
    {
        if (competitionID == '')
        {
            alert('Please type in the competition ID!');
            return;
        }

        try 
        {
            const response = await axios.get(
                `https://www.worldcubeassociation.org/api/v0/competitions/${competitionID}/wcif/public`
            );

            setWCIF(response.data);
            console.log('WCIF:', response.data);

            alert(`Fetched WCIF for ${response.data.name}`);
        } catch (error) {
            console.error('Error fetching WCIF:', error);
            alert('Failed to fetch WCIF');
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setScrambleZip(file);
    };


    const onSubmitZipClick = async () =>
    {
        if (!wcif || !scrambleZip)
        {
            alert('Please input the competition ID and upload the scramble zip file before submit.')
            return;
        }

        try 
        {
            const formData = new FormData();
            formData.append('wcif', JSON.stringify(wcif));
            formData.append('file', scrambleZip);

            const response = await axios.post('/api/scramble-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAPIResult(response.data);
            console.log('Result:', response.data);
        } catch (error) {
            console.error('Error calling API:', error);
            alert('Failed to process the result');
        }
    }

    return (
        <Container>
            <h1 className='my-3'>Scramble Manager</h1>

            <Container className='p-3'>
                <InputGroup className='mx-auto w-50 mb-3'>
                    <Form.Control
                        placeholder='Competition ID (For WCIF)'
                        aria-label='Competition ID (For WCIF)'
                        onChange={(e) => setCompetitionID(e.target.value)}
                    />
                    <Button variant='dark' onClick={onFetchWCIFClick}>Fetch WCIF</Button>
                </InputGroup>
                <InputGroup className='mx-auto w-50'>
                    <Form.Control
                        type='file'
                        accept='.zip'
                        placeholder='Scrambles .zip File'
                        aria-label='Scrambles .zip File'
                        onChange={handleFileChange}
                    />
                    <Button variant='dark' onClick={onSubmitZipClick}>Submit</Button>
                </InputGroup>
            </Container>
        </Container>
    );
}

export default ScrambleManager;